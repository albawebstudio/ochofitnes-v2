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

// Return the value of a named attribute from an HTML tag string, or undefined.
function parseAttr(tagStr, name) {
  const m = tagStr.match(new RegExp(`\\b${name}="([^"]*)"`));
  return m ? m[1] : undefined;
}

async function translateText(client, text, targetLang) {
  if (!text || !text.trim()) return text;

  let encoded = text;

  // ── Step 1: Protect list-marker spaces ────────────────────────────────────
  // Replace the space after a line-leading "* " or "- " with a non-breaking
  // space so the API cannot strip it. This must be done before newline encoding
  // so the multiline anchors work correctly.
  encoded = encoded.replace(/^([ \t]*[-*]) /gm, '$1\u00A0');

  // ── Step 2: Convert markdown structures to HTML ───────────────────────────
  // We tag every conversion with data-md so we can identify them during the
  // restore step and avoid accidentally converting raw HTML <img>/<a> tags
  // that were already in the source.
  // All & in URLs are encoded as &amp; — bare & in an HTML-mode payload is
  // treated as a malformed entity reference and can cause the parser to corrupt
  // or drop the surrounding structure entirely.

  // Linked images: [![alt](img "title")](link)
  encoded = encoded.replace(
    /\[!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)\]\(([^)]+)\)/g,
    (_, alt, imgSrc, imgTitle, linkHref) => {
      const safeHref = linkHref.replace(/&(?!amp;)/g, '&amp;');
      const titleAttr = imgTitle ? ` title="${imgTitle}"` : '';
      return `<a href="${safeHref}" data-md="img-link"><img src="${imgSrc}" alt="${alt}"${titleAttr}></a>`;
    }
  );

  // Plain images: ![alt](url "title")
  encoded = encoded.replace(
    /!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)/g,
    (_, alt, src, title) => {
      const titleAttr = title ? ` title="${title}"` : '';
      return `<img src="${src}" alt="${alt}"${titleAttr} data-md="img">`;
    }
  );

  // Markdown links: [text](url)
  encoded = encoded.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    (_, linkText, href) => {
      const safeHref = href.replace(/&(?!amp;)/g, '&amp;');
      return `<a href="${safeHref}" data-md="link">${linkText}</a>`;
    }
  );

  // Bold (**) before italic (*) to avoid partial matches.
  // Using [^*\n]+? for italic so the pattern never crosses a line boundary —
  // this prevents list markers on adjacent lines from being consumed as a pair.
  encoded = encoded
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+?)\*/g, '<em>$1</em>');

  // ── Step 3: Encode newlines ───────────────────────────────────────────────
  // Must come after markdown conversion so patterns above don't cross lines.
  encoded = encoded.replace(/\n/g, '<br>');

  // ── Step 4: Translate ─────────────────────────────────────────────────────
  const [result] = await client.translate(encoded, {
    to: targetLang,
    format: 'html',
  });

  // ── Step 5: Restore markdown from HTML ────────────────────────────────────

  let decoded = result
    // Newlines
    .replace(/<br\s*\/?>/gi, '\n')
    // List-marker non-breaking spaces back to regular spaces
    .replace(/^([ \t]*[-*])\u00A0/gm, '$1 ');

  // Linked images: <a data-md="img-link" href="..."><img ...></a>
  decoded = decoded.replace(
    /<a\b(?=[^>]*\bdata-md="img-link")[^>]*>\s*<img\b([^>]*)>\s*<\/a>/gi,
    (match, imgAttrs) => {
      const aHref = (match.match(/\bhref="([^"]*)"/) || [])[1] || '';
      const href = aHref.replace(/&amp;/g, '&');
      const src = parseAttr(imgAttrs, 'src') || '';
      const alt = parseAttr(imgAttrs, 'alt') || '';
      const title = parseAttr(imgAttrs, 'title');
      const titlePart = title ? ` "${title}"` : '';
      return `[![${alt}](${src}${titlePart})](${href})`;
    }
  );

  // Plain images: <img data-md="img" ...>
  decoded = decoded.replace(
    /<img\b(?=[^>]*\bdata-md="img")[^>]*>/gi,
    (imgTag) => {
      const src = parseAttr(imgTag, 'src') || '';
      const alt = parseAttr(imgTag, 'alt') || '';
      const title = parseAttr(imgTag, 'title');
      const titlePart = title ? ` "${title}"` : '';
      return `![${alt}](${src}${titlePart})`;
    }
  );

  // Markdown links: <a data-md="link" href="...">text</a>
  decoded = decoded.replace(
    /<a\b(?=[^>]*\bdata-md="link")[^>]*\bhref="([^"]*)"[^>]*>([^<]*)<\/a>/gi,
    (_, href, text) => `[${text}](${href.replace(/&amp;/g, '&')})`
  );

  // Bold and italic
  decoded = decoded
    .replace(/<strong[^>]*>([\s\S]*?)<\/strong>/gi, '**$1**')
    .replace(/<em[^>]*>([\s\S]*?)<\/em>/gi, '*$1*');

  return decoded;
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