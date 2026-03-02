# Ocho Fitness Translator

A Node.js CLI tool that uses the [Google Cloud Translation API](https://cloud.google.com/translate) to translate Ocho Fitness content files (Markdown with YAML frontmatter) from one language to another.

---

## Requirements

- Node.js 18 or higher
- A Google Cloud project with the **Cloud Translation API** enabled
- A Google Cloud **service account** with the `Cloud Translation API User` role

---

## Installation

### 1. Navigate to the translator directory

```bash
cd ochofitness-v2/translator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create Service Account

We recommend that you create a service account with the `Cloud Translation API User` role and download its key JSON
file to the application-credentials directory.

**Note**: The service account key JSON file should be kept secure and not committed to version control.

See the [GOOGLE-CLOUD-TRANSLATION](GOOGLE-CLOUD-TRANSLATION.md) for more details.

### 4. Configure credentials

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Edit `.env`:

```env
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_APPLICATION_CREDENTIALS=/path/to/service-account-key.json
```

| Variable | Description |
|---|---|
| `GOOGLE_CLOUD_PROJECT_ID` | Your Google Cloud project ID (found in the Cloud Console) |
| `GOOGLE_APPLICATION_CREDENTIALS` | Absolute path to the service account key JSON file |

#### Enabling the Translation API

If not already enabled, run:

```bash
gcloud services enable translate.googleapis.com --project=your-project-id
```

Or enable it in the Cloud Console under **APIs & Services** → **Library** → search for *Cloud Translation API*.

---

## Usage

Run the script from inside the `translator/` directory:

```bash
node translate.js --file <path> [--from <lang>] [--to <lang>]
```

### Options

| Option | Alias | Default | Description |
|---|---|---|---|
| `--file` | `-f` | *(required)* | Path to the source file — relative to the `ochofitness-v2` root or absolute |
| `--from` | | `en` | Source language code |
| `--to` | | `es` | Target language code |
| `--help` | `-h` | | Print usage information |

### Examples

Translate the March 2026 newsletter from English to Spanish (defaults):

```bash
node translate.js --file app/content/en/newsletter/2026/3.md
```

Specify languages explicitly:

```bash
node translate.js --file app/content/en/newsletter/2026/3.md --from en --to es
```

Use an absolute path:

```bash
node translate.js --file /Users/you/Dev/ochofitness-v2/app/content/en/newsletter/2026/3.md
```

### Output path

The output file is automatically written to the mirrored language folder. The `content/<from>/` segment in the path is replaced with `content/<to>/`:

```
app/content/en/newsletter/2026/3.md
         ↓
app/content/es/newsletter/2026/3.md
```

The output directory is created automatically if it does not exist.

---

## How it works

### Frontmatter

The script parses the YAML frontmatter block at the top of each Markdown file (between `---` delimiters).

- **Translated fields:** `title`, `description`
- **Preserved as-is:** all other fields (`image`, `published_date`, etc.)

**Input:**
```yaml
---
title: "March 2026"
image: "march-2026-hero.jpg"
description: "This month's newsletter..."
published_date: "2026-03-01"
---
```

**Output:**
```yaml
---
title: "Marzo 2026"
image: "march-2026-hero.jpg"
description: "El boletín de este mes..."
published_date: "2026-03-01"
---
```

### Body content

The Markdown body is sent to the Translation API using `format: html`. This means:

- **Inline HTML tags** (`<figure>`, `<img>`, `<figcaption>`, `<em>`) are preserved — the API does not translate tag names or attributes
- **Markdown syntax** (`##`, `**bold**`, `* list`, `[text](url)`) is preserved — the API translates the surrounding prose while leaving these patterns intact
- **URLs** are not translated

---

## npm script shorthand

You can also run the tool via the npm script defined in `package.json`:

```bash
npm run translate -- --file app/content/en/newsletter/2026/3.md
```

> Note the extra `--` before the arguments when using `npm run`.

---

## Troubleshooting

**`GOOGLE_CLOUD_PROJECT_ID is not set`**
Copy `.env.example` to `.env` and fill in your project ID.

**`File not found`**
Check that the path is relative to the `ochofitness-v2` root (not the `translator/` folder), or use an absolute path.

**`Could not find language segment`**
The source file must live under a `content/<from>/` directory (e.g. `content/en/`). Verify the file path matches the `--from` language code.

**`403 PERMISSION_DENIED`**
The service account does not have the `Cloud Translation API User` role, or the Cloud Translation API is not enabled for the project.
