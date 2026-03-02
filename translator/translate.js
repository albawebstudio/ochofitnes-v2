#!/usr/bin/env node

'use strict';

require('dotenv').config();

const { Translate } = require('@google-cloud/translate').v2;
const fs = require('fs');
const path = require('path');

// Frontmatter fields to translate — all others are preserved as-is
const TRANSLATABLE_FIELDS = ['title', 'description'];

// ─── Frontmatter parsing ────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: content };
  }

  const meta = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;

    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    // Strip surrounding quotes
    if (value.length >= 2 && value[0] === '"' && value.endsWith('"')) {
      value = value.slice(1, -1);
    } else if (value.length >= 2 && value[0] === "'" && value.endsWith("'")) {
      value = value.slice(1, -1);
    }

    meta[key] = value;
  }

  return { meta, body: match[2] };
}

function serializeFrontmatter(meta) {
  const lines = Object.entries(meta).map(([key, value]) => {
    // Re-quote the value
    const escaped = value.replace(/"/g, '\\"');
    return `${key}: "${escaped}"`;
  });
  return `---\n${lines.join('\n')}\n---\n`;
}

// ─── Translation helpers ─────────────────────────────────────────────────────

async function translateText(client, text, targetLang) {
  if (!text || !text.trim()) return text;

  // The API's 'html' format treats newlines as insignificant whitespace and
  // collapses them, breaking markdown structure. Encoding every newline as a
  // <br> tag forces the API to preserve line breaks, and we restore them after.
  const encoded = text.replace(/\n/g, '<br>');

  const [result] = await client.translate(encoded, {
    to: targetLang,
    format: 'html',
  });

  // Restore newlines from any <br> variant the API may return (<br>, <br/>, <br />)
  return result.replace(/<br\s*\/?>/gi, '\n');
}

// ─── Path resolution ─────────────────────────────────────────────────────────

function resolveOutputPath(absInputPath, fromLang, toLang) {
  // Replace the language segment in the path, e.g. /content/en/ → /content/es/
  const segment = `${path.sep}content${path.sep}${fromLang}${path.sep}`;
  const replacement = `${path.sep}content${path.sep}${toLang}${path.sep}`;

  if (!absInputPath.includes(segment)) {
    throw new Error(
      `Could not find language segment "content/${fromLang}/" in path:\n  ${absInputPath}`
    );
  }

  return absInputPath.replace(segment, replacement);
}

// ─── CLI argument parsing ─────────────────────────────────────────────────────

function parseArgs(argv) {
  const args = argv.slice(2);
  const opts = { file: null, from: 'en', to: 'es' };

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--file':
      case '-f':
        opts.file = args[++i];
        break;
      case '--from':
        opts.from = args[++i];
        break;
      case '--to':
        opts.to = args[++i];
        break;
      case '--help':
      case '-h':
        printHelp();
        process.exit(0);
        break;
      default:
        // Treat a bare positional argument as the file path
        if (!args[i].startsWith('-')) {
          opts.file = args[i];
        } else {
          console.error(`Unknown option: ${args[i]}`);
          process.exit(1);
        }
    }
  }

  return opts;
}

function printHelp() {
  console.log(`
Usage:
  node translate.js --file <path> [--from <lang>] [--to <lang>]

Options:
  --file, -f    Path to the source file, relative to the project root
                (ochofitness-v2) or absolute.
  --from        Source language code (default: en)
  --to          Target language code (default: es)
  --help, -h    Show this help message

Examples:
  node translate.js --file app/content/en/newsletter/2026/3.md
  node translate.js -f app/content/en/newsletter/2026/3.md --to es

Environment variables (set in .env):
  GOOGLE_CLOUD_PROJECT_ID          Your Google Cloud project ID
  GOOGLE_APPLICATION_CREDENTIALS   Path to your service account key JSON
`);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const { file, from, to } = parseArgs(process.argv);

  if (!file) {
    console.error('Error: --file argument is required.\nRun with --help for usage.');
    process.exit(1);
  }

  if (!process.env.GOOGLE_CLOUD_PROJECT_ID) {
    console.error(
      'Error: GOOGLE_CLOUD_PROJECT_ID is not set.\n' +
      'Copy .env.example to .env and fill in your credentials.'
    );
    process.exit(1);
  }

  // Resolve the input path — support both absolute paths and paths relative to
  // the ochofitness-v2 project root (one level up from this translator/ folder).
  const projectRoot = path.resolve(__dirname, '..');
  const absInput = path.isAbsolute(file) ? file : path.resolve(projectRoot, file);

  if (!fs.existsSync(absInput)) {
    console.error(`Error: File not found: ${absInput}`);
    process.exit(1);
  }

  let absOutput;
  try {
    absOutput = resolveOutputPath(absInput, from, to);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }

  const relInput = path.relative(projectRoot, absInput);
  const relOutput = path.relative(projectRoot, absOutput);

  console.log(`Source  : ${relInput}`);
  console.log(`Output  : ${relOutput}`);
  console.log(`From    : ${from}  →  To: ${to}`);
  console.log('');

  const client = new Translate({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  });

  const raw = fs.readFileSync(absInput, 'utf-8');
  const { meta, body } = parseFrontmatter(raw);

  // Translate selected frontmatter fields
  for (const field of TRANSLATABLE_FIELDS) {
    if (meta[field]) {
      process.stdout.write(`Translating frontmatter field: ${field} ... `);
      meta[field] = await translateText(client, meta[field], to);
      console.log('done');
    }
  }

  // Translate body
  process.stdout.write('Translating body ... ');
  const translatedBody = await translateText(client, body, to);
  console.log('done');

  // Reconstruct the file
  const output = Object.keys(meta).length > 0
    ? serializeFrontmatter(meta) + '\n' + translatedBody
    : translatedBody;

  // Write output (create directories as needed)
  fs.mkdirSync(path.dirname(absOutput), { recursive: true });
  fs.writeFileSync(absOutput, output, 'utf-8');

  console.log(`\nSaved: ${relOutput}`);
}

main().catch((err) => {
  console.error('\nTranslation failed:', err.message);
  process.exit(1);
});