# FLUX.2 Launch Kit

Launch-ready developer content for the Black Forest Labs FLUX.2 case study: strategy note, launch blog post, written tutorial, video walkthrough, and two working example projects.

## Start here

- `web/` is the main submission site and the best place to review the full package.
- `thumbnail-generator/` is the CLI app from the written tutorial.
- `bot/` is FluxBot, the Discord bot featured in the video walkthrough.
- `pipeline/` is the production-style extension that automates thumbnail generation for new YouTube uploads.

## Repo map

| Path | What it contains |
|------|------------------|
| `web/` | Next.js site packaging the strategy, blog, tutorial, video, and FluxBot companion page |
| `thumbnail-generator/` | Node.js CLI that turns a video description into three FLUX.2 thumbnail directions |
| `bot/` | Python Discord bot with `/generate`, `/restyle`, per-user styles, and key management |
| `pipeline/` | Express server that hooks thumbnail generation into a YouTube publishing workflow |
| `assets/` | FLUX.2-generated images plus the HTML source for the video graphics |
| `examples/` | Sample headshot and generated outputs used in the tutorial |

## Run locally

### Submission site

```bash
cd web
npm install
npm run dev
```

Open `http://localhost:3000`.

### Thumbnail generator

```bash
cd thumbnail-generator
npm install
node src/index.js "Your video description here"
node src/index.js "Your video description here" --face ../examples/headshot.jpg
```

Copy `thumbnail-generator/.env.example` to `.env` and add `BFL_API_KEY` before running the CLI.

### FluxBot

```bash
cd bot
pip install -r requirements.txt
python main.py
```

Copy `bot/.env.example` to `.env` and add `DISCORD_TOKEN` before starting the bot.

### Pipeline

```bash
cd pipeline
npm install
npm run auth
npm start
```

Copy `pipeline/.env.example` to `.env` and fill in the required BFL and YouTube credentials.

## Site content

The main site is driven by markdown files in `web/content/`:

- `web/content/strategy.md` - strategy note
- `web/content/blog.md` - launch blog post
- `web/content/tutorial.md` - written tutorial
- `web/content/video.md` - video overview and production summary
- `web/content/bot.md` - FluxBot companion page

Each file includes an editing conventions comment at the top describing the supported HTML patterns.

## Supporting production docs

- `SCRIPT.md` - full YouTube script and publishing copy
- `RECORDING.md` - stripped-down shot-by-shot recording guide
- `EDITING_GUIDE.md` - CapCut timeline, overlays, and graphics checklist

## API access

- Dashboard and API keys: [dashboard.bfl.ai](https://dashboard.bfl.ai)
- Documentation: [docs.bfl.ai](https://docs.bfl.ai)
