<p align="center">
  <img src="https://img.shields.io/badge/FLUX.2-Powered-7C3AED?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=&labelColor=1a1a2e" alt="FLUX.2 Powered" />
  <img src="https://img.shields.io/badge/discord.py-2.3+-5865F2?style=for-the-badge&logo=discord&logoColor=white&labelColor=1a1a2e" alt="discord.py" />
  <img src="https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white&labelColor=1a1a2e" alt="Python" />
  <img src="https://img.shields.io/badge/Deploy-Railway-0B0D0E?style=for-the-badge&logo=railway&logoColor=white&labelColor=1a1a2e" alt="Railway" />
</p>

# ⚡ FluxBot

**AI image generation for Discord — powered by [FLUX.2](https://docs.bfl.ai/) from Black Forest Labs.**

Type a prompt in your server. Get a stunning image back. Every user gets their own personal style.

```
/generate a cyberpunk samurai in the rain, neon reflections, cinematic
```

<br>

## ✨ What It Does

| Command | Description |
|:--------|:------------|
| `/generate` | Create an image from a text prompt. Pick between **Pro**, **Max**, **Klein**, or **Flex** models. |
| `/restyle` | Upload a photo and transform it — turn a selfie into anime, a desk photo into a Vermeer painting. |
| `/setstyle` | Save a personal style that applies to all your future generations automatically. |
| `/mystyle` | Check your current active style. |
| `/clearstyle` | Reset back to default. |
| `/setkey` | *(Admin)* Set a shared BFL API key that covers the whole server. |
| `/mykey` | Set your own personal API key — billed to you instead of the server. |
| `/keyinfo` | See which key FluxBot is using for your generations. |

<br>

## 🎨 Personal Styles

Every user saves their own style. Two people can type the same prompt and get completely different art:

```
User A:  /setstyle dark fantasy oil painting, chiaroscuro lighting, muted earth tones
User B:  /setstyle Studio Ghibli watercolor, soft golden hour light, warm pastels

Both:    /generate a knight crossing a stone bridge over a chasm
```

> User A gets a moody, textured oil painting. User B gets a luminous, hand-painted watercolor.
> Same prompt. Same bot. Different art.

<br>

## 🚀 Quick Start

### 1. Create a Discord Bot

Head to the [Discord Developer Portal](https://discord.com/developers/applications), create a new application, and grab your **bot token**.

Under **OAuth2 → URL Generator**, select the `bot` and `applications.commands` scopes, then the `Send Messages` and `Attach Files` permissions. Use the generated URL to invite the bot to your server.

### 2. Get a FLUX API Key

Sign up at **[dashboard.bfl.ai](https://dashboard.bfl.ai)** — free tier, no credit card required.

### 3. Run It

```bash
# Clone
git clone https://github.com/black-forest-labs/flux-discord-bot.git
cd flux-discord-bot/bot

# Install dependencies
pip install -r requirements.txt

# Set your bot token
echo "DISCORD_TOKEN=your_bot_token_here" > .env

# Start
python main.py
```

Once the bot is online, run `/setkey` in your server to set the shared API key — or have users run `/mykey` to use their own.

<br>

## 🏗️ Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Discord   │ ──────▶ │   FluxBot    │ ──────▶ │  BFL FLUX API   │
│   (users)   │ ◀────── │   (Python)   │ ◀────── │  (image gen)    │
└─────────────┘         └──────────────┘         └─────────────────┘
```

Three steps. That's it.

- **`main.py`** — Bot startup, cog loading, event handlers
- **`flux_api.py`** — FLUX API client (submit → poll → download)
- **`storage.py`** — SQLite via aiosqlite with in-memory caching for keys & styles
- **`cogs/`** — Slash commands, cleanly separated by feature

<br>

## 🔑 API Key System

FluxBot supports two tiers of API keys:

| Key Type | Set By | Scope | Command |
|:---------|:-------|:------|:--------|
| **Server key** | Admin | Covers all members | `/setkey` |
| **Personal key** | Any user | Overrides server key for that user | `/mykey` |

Personal keys always take priority. This means a server admin can fund casual usage for everyone, while power users can bring their own key.

<br>

## 🤖 FLUX Models

| Model | Speed | Quality | Cost | Best For |
|:------|:------|:--------|:-----|:---------|
| **Pro** | ~3s | ★★★★ | $0.03/img | Default — great balance of speed & quality |
| **Max** | ~10s | ★★★★★ | $0.06/img | When you need the absolute best output |
| **Klein** | <1s | ★★★ | $0.014/img | Real-time vibes — near-instant results |
| **Flex** | ~5s | ★★★★ | $0.03/img | Most control over generation parameters |

<br>

## 🚢 Deploy to Railway

This bot is ready for Railway out of the box.

1. Push this repo to GitHub
2. Connect it to [Railway](https://railway.app)
3. Add environment variable: `DISCORD_TOKEN`
4. Attach a **Volume** mounted at `/data` (so the SQLite DB persists across deploys)
5. Deploy — Railway auto-detects the `Dockerfile`

```toml
# railway.toml (already included)
[build]
builder = "RAILPACK"

[deploy]
startCommand = "python main.py"
```

<br>

## 📁 Project Structure

```
bot/
├── main.py              # Entry point — bot startup & cog loading
├── flux_api.py          # FLUX API client (generate + restyle)
├── storage.py           # SQLite storage with in-memory cache
├── requirements.txt     # 4 dependencies
├── Dockerfile           # Production container
├── railway.toml         # Railway deployment config
└── cogs/
    ├── generate.py      # /generate command
    ├── restyle.py       # /restyle command
    ├── styles.py        # /setstyle, /mystyle, /clearstyle
    └── apikey.py        # /setkey, /removekey, /mykey, /removemykey, /keyinfo
```

<br>

## 💰 What It Costs

This bot generated **47 images** during a single video shoot.

**Total cost: $1.41.** That's **$0.03 per image.**

For comparison:
- Shutterstock: $4+ per download
- Canva Pro: $13/month for templates
- A freelance designer: $50–200 per graphic

<br>

---

<p align="center">
  Built with <a href="https://docs.bfl.ai">FLUX.2</a> by <a href="https://blackforestlabs.ai">Black Forest Labs</a>
  <br>
  The research team behind Stable Diffusion.
</p>
