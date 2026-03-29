# FLUX.2 Launch Kit

Launch-day content for FLUX.2 by Black Forest Labs — written tutorial, video walkthrough, blog post, and strategy note.

## What's here

| Folder | Description |
|--------|-------------|
| `web/` | Next.js site presenting all four deliverables (run this to see everything) |
| `thumbnail-generator/` | CLI tool from the written tutorial — turn a video description into 3 AI thumbnails |
| `pipeline/` | Express server that automates thumbnail generation and YouTube publishing |
| `bot/` | FluxBot — Discord bot from the video tutorial, powered by FLUX.2 |
| `assets/` | FLUX.2-generated images used as video B-roll |
| `examples/` | Sample headshot and outputs for the thumbnail generator |

## Run the site

```bash
cd web
npm install
npm run dev
# → http://localhost:3000
```

## Run the thumbnail generator

```bash
cd thumbnail-generator
npm install
cp .env.example .env  # add your BFL_API_KEY
node src/index.js "Your video description here"
node src/index.js "Your video description here" --face ../examples/headshot.jpg
```

## Edit content

The four tabs on the site are driven by markdown files in `web/content/`:

- `web/content/tutorial.md` — Written Tutorial tab
- `web/content/blog.md` — Blog Post tab
- `web/content/strategy.md` — Strategy tab
- `web/app/components/VideoTab.tsx` — Video tab (React component, contains the image gallery)

Each markdown file has an editing conventions comment at the top explaining the HTML class patterns used for custom layout blocks.

## API key

Get a BFL API key at [dashboard.bfl.ai](https://dashboard.bfl.ai). Add to `.env` in each project that needs it.
