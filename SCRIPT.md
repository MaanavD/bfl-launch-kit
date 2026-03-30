# FluxBot: Discord AI Image Bot - YouTube Video Script

> **Video Title Options (pick one):**
> 1. "This Bot Makes Better Art Than Me in 5 Seconds"
> 2. "We Gave Our Discord Server an AI Artist"
> 3. "The Discord Bot That Replaced Our Designer"
>
> **Thumbnail Direction:**
> A split screen - left side: a Discord chat window with a `/generate` command visible.
> Right side: a jaw-dropping FLUX-generated image (the output). Your face in the corner,
> expression = genuine surprise/excitement. Bold text overlay: "5 SECONDS."
>
> **Generate the thumbnail image with FLUX using this prompt:**
> `A hyper-detailed cinematic photograph of a fantasy knight standing on a cliff overlooking a glowing city at sunset, volumetric lighting, 8k, dramatic clouds, ultra wide angle`
> Use the output as the "result" side of the thumbnail.

---

## PRE-PRODUCTION NOTES

**Runtime target:** 6-7 minutes (tight, high-energy - no dead air, no code on screen)

**Pacing philosophy:** This is NOT a coding tutorial. It's a product demo with just enough "under the hood" to make people feel like they could build it. Think Apple keynote energy meets casual Discord hang.

**Visual language:**
- Discord UI = always dark mode
- No code on screen - this is a product demo, not a coding tutorial. The written tutorial covers implementation.
- FLUX outputs = always fullscreen for 2-3 seconds so viewers absorb the quality
- Transitions = hard cuts (no fades, no dissolves - keeps energy up)

**Music:** Lo-fi electronic or light synthwave. Not distracting, but gives forward momentum. Drops out during code sections so it doesn't compete with VO. Suggested: Epidemic Sound search "tech minimal beat" or "futuristic ambient."

**Screen recording setup:** 1920x1080. Discord scaled to ~90% so the text is readable. Browser zoom 125% for API docs shots.

---

## SECTION 1: THE HOOK

**[0:00 - 0:50]**

---

**VISUAL:** Black screen. A single cursor blinks in a Discord message box.

**SFX:** Subtle keyboard click sounds.

**ON-SCREEN TEXT** (typed out in real time, monospace font, centered):
```
/generate a cyberpunk samurai standing in the rain, neon reflections on wet pavement, cinematic
```

*Beat. 1 second of silence.*

**VISUAL:** SMASH CUT to the generated image - fullscreen, no UI chrome. Hold for 3 full seconds. The image is stunning.

> **FLUX PROMPT (generate this in advance):**
> `A cyberpunk samurai standing motionless in heavy rain on a Tokyo street at night, neon signs reflecting off wet pavement in pink and blue, cinematic depth of field, hyper-detailed armor with glowing accents, volumetric fog, 8k photograph`

**VO (energetic, almost disbelief):**
> "That - was made in a group chat. No Photoshop. No expensive AI tool. No monthly subscription. A Discord bot and one sentence."

**VISUAL:** Cut to FACE CAM - medium shot, casual setting (desk, monitor visible behind you). You're leaning slightly forward, direct to camera.

**VO:**
> "This is FLUX.2 - the latest image model from Black Forest Labs, the research team behind Stable Diffusion. I built a Discord bot that puts it right in your server. Type a prompt. Get this back."

> **ON-CAMERA NOTE:** The BFL name-drop matters for credibility. Don't rush it - land the line, let the audience register it.

**VISUAL:** Quick montage - 4-5 FLUX-generated images appearing in a Discord chat, each one landing with a satisfying *pop* animation (just a subtle scale-up, 95% → 100% over 0.2s in editing). Each image is a different style:

> **PRE-GENERATE THESE IMAGES:**
> 1. `Oil painting of a golden retriever wearing a tiny crown, sitting on a velvet throne, renaissance lighting, gallery quality`
> 2. `Music festival poster for "NEON GARDEN 2026" with abstract geometric shapes, holographic gradients, bold sans-serif typography, dark background`
> 3. `Isometric pixel art of a cozy coffee shop interior with warm lighting, tiny characters, and a cat sleeping on the counter`
> 4. `Professional product photograph of a matte black wireless headphone floating against a clean white background, studio lighting, commercial quality`
> 5. `Anime-style portrait of a female space pilot in a cockpit, stars visible through the windshield, dramatic side lighting, detailed mechanical controls`

**VO (over montage):**
> "Event flyers. Gaming thumbnails. Product mockups. Your D&D party's character art. Whatever your community needs - this thing makes it right where everyone already hangs out."

---

### The Story [0:40 - 1:05]

**VISUAL:** Cut to face cam. Shift to a slightly more personal, storytelling tone.

**VO:**
> "Quick story. My buddy runs a D&D server - about fifty people. Every campaign, he needs character art for new NPCs, scene illustrations for boss fights, maps. He was cobbling stuff together in Canva, sometimes even MS Paint - or burning credits on some AI image generator he found online that charged a dollar per image. Then downloading everything and re-uploading it to Discord threads. A whole workflow just to get art into the server."

*[Beat]*

**VO:**
> "I told him: give me five minutes. I dropped this bot in his server, set a dark fantasy style, and typed one prompt. His reaction was…"

**VISUAL:** Cut to a Discord screenshot or screen recording - the friend's actual reaction message. Something like:

> **Friend:** "dude WHAT"
> **Friend:** "that's FROM THE BOT??"
> **🔥 🔥 🔥 😱** (emoji reactions)

> **PRODUCTION NOTE:** This needs to be real. Get your friend to actually react in Discord when you demonstrate the bot for them. Screen-record the whole thing. The genuine surprise is what makes this moment land. If you can get 2-3 friends reacting in a channel, even better.

**VO:**
> "Now the whole server generates their own character art, scene illustrations, maps - without ever leaving the chat. That's the point of this bot. Let me show you."

**ON-SCREEN TEXT** (lower third, clean sans-serif):
```
FluxBot - Open Source Discord Image Bot
Powered by Black Forest Labs FLUX.2 API
```

*[Music fades up slightly as transition hits]*

---

## SECTION 2: THE WORKFLOW - "What Can This Bot Actually Do?"

**[0:50 - 4:00]**

---

### 2A: Text-to-Image Generation [0:50 - 2:00]

**VISUAL:** Screen recording - a Discord server. The server has a channel called `#image-lab`. A few users are chatting casually.

**VO:**
> "Here's the bot in a real server. Nothing fancy - just a Discord server with FluxBot added."

**VISUAL:** You type in the Discord message box:
```
/generate prompt: a massive dragon perched on a skyscraper in a thunderstorm, lightning illuminating its scales, cinematic wide shot
```

**VO:**
> "You call `/generate`, describe what you want, and..."

**VISUAL:** As you type, Discord's autocomplete shows the `model` parameter dropdown with four choices: **Pro (best balance)**, **Max (highest quality)**, **Klein (fastest)**, **Flex (most control)**. Select "Pro" (the default).

> **ON-CAMERA NOTE:** Don't linger on the model picker - just let the viewer see it exists. The point is "wow, it even lets you pick models" not a breakdown of each one. We'll mention models again briefly in the code section.

**VISUAL:** The bot shows Discord's native "thinking..." state (deferred response). Then - a purple embed appears with the user's avatar, their name as author, the prompt as description text, and the image below. Hold the image fullscreen for 3 seconds.

> **FLUX PROMPT (pre-generate):**
> `A massive dragon perched on top of a modern glass skyscraper during a violent thunderstorm, a bolt of lightning illuminating its iridescent scales, rain streaking past, cinematic ultra wide angle shot from below, dramatic clouds, photorealistic, 8k`

**VO (genuine reaction):**
> "Every time. The detail on this is wild - look at the lighting on the scales. This is from one sentence typed into a chat app."

**VISUAL:** Cut to face cam briefly.

**VO:**
> "But here's what makes it actually useful. What if you want everything you generate to have a certain look?"

---

### 2B: Personal Style Presets [2:00 - 2:50]

**VISUAL:** Back to screen recording. You type:
```
/setstyle style: dark fantasy oil painting, dramatic chiaroscuro lighting, muted earth tones, textured brushstrokes
```

**VISUAL:** Bot responds with an ephemeral message (only visible to the user who typed it):
```
✅ Style saved! Your generations will now use:
> "dark fantasy oil painting, dramatic chiaroscuro lighting, muted earth tones, textured brushstrokes"

Use /clearstyle to reset.
```

> **ON-CAMERA NOTE:** Point out that the response says "Only you can see this message" - styles are private. Other users don't see your style config.

**VO:**
> "With `/setstyle`, you save a personal style that gets baked into every image you generate. Watch what happens."

**VISUAL:** You type:
```
/generate prompt: a lone knight crossing a stone bridge over a chasm
```

**VISUAL:** Image appears - and it's clearly in the dark fantasy oil painting style. Hold fullscreen 3 seconds.

> **FLUX PROMPT (pre-generate - combine the style + prompt):**
> `A lone knight in heavy armor crossing an ancient crumbling stone bridge over a deep misty chasm, dark fantasy oil painting style, dramatic chiaroscuro lighting, muted earth tones, textured brushstrokes visible, atmospheric perspective, moody and cinematic`

**VO:**
> "See that? I didn't describe the style. The bot remembered it. And look at the footer of the embed - it shows my style right there so I always know what's active. Now every image I generate has that DNA - until I change it."

**VISUAL:** Quick cut - now a DIFFERENT user in the same server types:
```
/setstyle style: clean vector illustration, flat design, pastel color palette, minimal
```
Then generates the same subject:
```
/generate prompt: a lone knight crossing a stone bridge over a chasm
```

**VISUAL:** Totally different result - clean, flat, modern illustration style. Show both images side-by-side (split screen).

> **FLUX PROMPT (pre-generate):**
> `A lone knight crossing a simple stone bridge over a chasm, clean vector illustration style, flat design, pastel color palette, minimal shapes, geometric, modern graphic design aesthetic`

**VO:**
> "Same prompt. Same bot. Same server. Two completely different images - because each user has their own style. It's not one-size-fits-all. It's your image engine, configured the way you want it."

**ON-SCREEN TEXT** (centered, bold):
```
Same prompt. Different users. Different art.
```
*Hold 2 seconds.*

---

### 2C: Image-to-Image / Restyle [2:50 - 4:00]

**VISUAL:** Screen recording. The `/restyle` command has an `image` parameter - when you start typing the command, Discord shows a file picker for the attachment.

**VO:**
> "Now, text-to-image is great. But what about starting from a photo you already have?"

**VISUAL:** You type the slash command, attach a **very recognizable mundane image** - an ordinary iPhone photo of your desk, or a basic phone selfie - via the `image:` parameter, then fill in the prompt:
```
/restyle prompt: a detailed oil painting in the style of the Dutch Golden Age, dramatic candlelight, rich colors  image: [desk-photo.jpg]
```

**VISUAL:** Bot processes. Image appears. It's the same composition - your messy desk - but now it looks like a 17th century Vermeer painting. The contrast between "mundane input" and "stunning output" is the whole point. Hold fullscreen 3 seconds.

> **FLUX PROMPT (pre-generate - use the FLUX image editing endpoint with an input_image):**
> Attach a real, boring desk/room photo as `input_image`, prompt: `A detailed oil painting in the style of the Dutch Golden Age masters, dramatic candlelight illumination, rich warm colors, visible brushstrokes, gallery quality, museum piece`

**VO (genuine reaction):**
> "That's my actual desk. Same mess, same angle - but FLUX turned it into something you'd hang on a wall. Five seconds."

**VISUAL:** Cut to face cam.

**VO:**
> "Now think about what that means for different communities."

**VISUAL:** Rapid montage - 4 restyle examples, each 1.5 seconds, targeting different audiences:

> **PRE-GENERATE THESE (use image editing with source photos):**
> 1. **Cosplay/anime community:** A casual cosplay photo → `High-quality anime cel illustration, vibrant colors, sharp linework, studio quality anime key visual`
> 2. **Band/music community:** A grainy rehearsal photo of a band → `Concert tour poster, bold typography reading "WORLD TOUR 2026", dramatic stage lighting, graphic design aesthetic`
> 3. **Gaming clan:** A screenshot from a game → `Epic cinematic concept art, dramatic volumetric lighting, matte painting quality, 8k, movie poster composition`
> 4. **Small business/DTC:** A flat lay product photo on a kitchen table → `Professional product photograph, clean white background, studio lighting, commercial e-commerce quality`

**VO (over montage):**
> "Cosplay photo into anime key art. A rehearsal shot into a tour poster. A game screenshot into concept art. A kitchen-table product photo into an e-commerce hero image. Same bot. Different communities."

**VISUAL:** Cut to face cam. Slight lean back, casual.

**VO:**
> "Now - you're probably wondering what's actually going on behind the scenes. Let me show you. I promise it's simpler than you'd expect."

---

## SECTION 3: THE SETUP - "How Does This Work?"

**[4:00 - 7:30]**

---

> **PRODUCTION NOTE:** This section needs to move FAST. The audience isn't here for a Python lesson - they're here to see that the code is simple enough that they could set it up with copy-paste and an afternoon. Energy = "look how little code this is" not "let me walk you through the implementation."

---

### 3A: The Architecture (30 seconds) [4:00 - 4:30]

**VISUAL:** Simple animated diagram (white lines on dark background). Three boxes connected by arrows:

```
┌─────────────┐         ┌──────────────┐         ┌─────────────────┐
│   Discord   │ ──────► │   FluxBot    │ ──────► │  BFL FLUX API   │
│   (users)   │ ◄────── │  (your bot)  │ ◄────── │  (generates AI  │
│             │         │              │         │    images)       │
└─────────────┘         └──────────────┘         └─────────────────┘
     type                   catches               sends prompt,
    /generate              the command,            gets image back
                          forwards it
```

> **PRODUCTION TIP:** Generate this diagram as a clean image with FLUX or build it in Figma/Canva. Keep it minimal. Three boxes, two arrows.
>
> **FLUX PROMPT for diagram B-roll:**
> `Minimal technical architecture diagram on a dark navy background, three rounded rectangles connected by glowing arrows, clean sans-serif labels reading "Discord", "Bot", "FLUX API", modern tech aesthetic, flat design, subtle grid pattern in background`

**VO:**
> "Here's the whole thing. User types a command in Discord. The bot catches it, sends the prompt to the FLUX API, gets the image back, posts it in chat. Three steps. That's the entire architecture."

**ON-SCREEN TEXT** (lower third):
```
Discord → FluxBot → FLUX.2 API → Image in chat
That's it. Three steps.
```

---

### 3B: Getting Your API Key (30 seconds) [4:30 - 5:00]

**VISUAL:** Screen recording - browser. Navigate to `api.bfl.ai`.

**VO:**
> "Step one: get a FLUX API key. Head to api.bfl.ai, sign up - takes about thirty seconds…"

**VISUAL:** Show the sign-up / dashboard briefly. Blur or cover the actual API key, but show the "Copy" button being clicked.

**ON-SCREEN TEXT** (clickable card / end-screen-style annotation, bottom-right, stays 5 seconds):
```
Ready to try it yourself?
api.bfl.ai - free tier, no credit card
```

**VO:**
> "…grab your API key, and you're set. Now let me put some numbers on this - because the pricing is kind of wild."

**VISUAL:** Screen recording - show the BFL API dashboard with actual usage stats (or a staged version). Highlight the cost column.

**ON-SCREEN TEXT** (pop up, stays for 5 seconds - make this a clean, designed graphic):
```
💰 What this video cost to make:

47 images generated while filming
Total API cost: $1.41

That's $0.03 per image.
```

**VO:**
> "I generated forty-seven images making this video. Total cost: a dollar forty-one. Three cents per image. For context - one stock photo on Shutterstock starts at four bucks. Canva Pro is thirteen a month. Forty-seven images for a dollar forty-one."

**ON-SCREEN TEXT** (comparison graphic - clean split):
```
FluxBot: 400+ images for $12/month
vs.
Canva Pro: $13/month (templates, not custom)
vs.
Shutterstock: $29/month for 10 downloads
vs.
Hiring a designer: $50-200 per graphic
```
*Hold 3 seconds.*

**VO:**
> "And that's Pro pricing. Klein is a fraction of a cent - sub-second generation at $0.014 per image. Basically free."

---

### 3C: Under the Hood (45 seconds) [5:00 - 5:45]

> **PRODUCTION NOTE:** No code on screen. The written tutorial covers implementation in depth - this video stays in demo/product territory. We're showing that the bot is simple and customizable, not teaching Python.

**VISUAL:** Cut back to the Discord UI showing a `/setstyle` response and a generated image with the style footer visible.

**VO:**
> "Under the hood: clean Python, fully open source. Your style gets saved to your user ID. When you generate, the bot merges it with your prompt automatically. The response is private - only you see your style config. A handful of functions. But to the user? It feels like the bot knows them."

**VISUAL:** Cut to face cam. Casual, confident.

**VO:**
> "And because it's open source, you can customize the whole thing for your server's workflow. Change default models. Add new commands. Swap in different aspect ratios. The code is readable enough that any developer can fork it and make it theirs in an afternoon. But let me show you the part I'm most excited about."

---

### 3D: The Speed Demo (30 seconds) [5:45 - 6:15]

**VISUAL:** Discord. You switch the model picker to **Klein** and type:
```
/generate prompt: a lighthouse in a storm  model: Klein
```

> **PRODUCTION NOTE - TIMER OVERLAY:** Add a visible stopwatch/timer overlay in the top-right corner that starts counting when you press enter and stops when the image appears. Use a clean, minimal design - just white digits on a semi-transparent dark background. Something like "0.0s" counting up. When it lands, freeze the number (e.g., "0.8s") and pulse it briefly. This single number becomes the shareable factoid.

**VISUAL:** The bot responds nearly instantly. Timer freezes. Image appears.

**ON-SCREEN TEXT** (large, centered, punchy):
```
0.8 seconds.
```
*Hold 2 seconds.*

**VO:**
> "Under one second. Klein is FLUX.2's speed model - press enter, see the image. Pro gives you more detail when you need it. Your users pick per generation."

---

### 3E: Community (30 seconds) [6:15 - 6:45]

**VISUAL:** Quick montage of the bot being used by multiple "users" - different names, different styles, images landing in the chat one after another. Show Discord emoji reactions (🔥 ❤️ 😍) on the images. 3 seconds.

> **PRODUCTION NOTE - COMMUNITY MONTAGE:** This montage should show a BUSY, alive server. Get your friends to generate a burst of images in the same channel within a few minutes. Capture:
> - At least 4-5 different usernames generating
> - A mix of styles (someone with a cyberpunk style, someone with watercolor, someone with no style)
> - Emoji reactions on the outputs (🔥 ❤️ 😍 😱)
> - At least one casual message like "wait this is insane" or "how is this free"
> - The channel should look like a creative feed, not a test environment
>
> **Images that work well for this montage** (have friends generate these or pre-generate and stage):
> - A D&D character portrait (elf ranger, dramatic lighting)
> - A meme-style image ("a cat in a business suit giving a TED talk")
> - A wallpaper/background (mountain landscape, anime style)
> - A logo concept ("minimalist wolf logo, esports team, black and gold")
> - A birthday card image ("whimsical birthday cake, confetti, kawaii style")
>
> The point of this montage: prove it's not just YOU using it. It's a community.

**VO:**
> "Every user gets their own style. Their own creative fingerprint. Their own API key if they want it. All in one shared space."

---

## SECTION 4: THE CALL TO ACTION + LANDING PAGE FLOW

**[6:45 - 7:30]**

---

**VISUAL:** Face cam. Direct to camera. Calm, confident.

**VO:**
> "The full bot is open source. Everything you just saw is on GitHub, ready to clone. But you don't even need to go that far."

**VISUAL:** Screen recording - open the landing page in a browser. Show the full flow in one continuous take:
1. The hero section loads ("Image generation for Discord")
2. Scroll slowly through the features and command reference
3. Click "Add to Discord"
4. Discord's OAuth screen appears - select a server, click Authorize
5. Switch to Discord - FluxBot appears in the server member list
6. Type `/setkey key:your_key_here` - bot responds with confirmation
7. Type `/generate prompt: a sunset over mountains` - image appears

**VO (over the screen recording):**
> "Landing page. Click 'Add to Discord.' Pick your server. Set your API key. Generate. Zero to first image in under a minute. No terminal. No code."

> **PRODUCTION NOTE:** This continuous flow is the money shot of the case study. Rehearse it. Get a clean, unbroken take. Time it - should be about 30 seconds.

**ON-SCREEN TEXT** (large, centered, stays on screen for 5+ seconds):
```
github.com/black-forest-labs/flux-discord-bot
Link in description ↓
```

**VO:**
> "If you want to self-host or customize - clone the repo, add your bot token, deploy to Railway, and you're live. If you just want to use it - the landing page is all you need."

**VISUAL:** Cut - show the GitHub repo page briefly (screen recording). Show the README.

**VO:**
> "If you build something cool with this, tag Black Forest Labs - they genuinely want to see what people make. And if you want to go deeper - custom styles, LoRA training - there are guides for that too. Links in the description."

*[Beat]*

**VO:**
> "Go make something."

**VISUAL:** Hard cut to black. End card with subscribe button, video suggestions.

**ON-SCREEN TEXT** (end card, 5 seconds):
```
FluxBot - Open Source
github.com/black-forest-labs/flux-discord-bot
Add to Discord → fluxbot.vercel.app
FLUX.2 API → api.bfl.ai
```

---

## POST-PRODUCTION CHECKLIST

### Images to Pre-Generate with FLUX (before shoot day)

| # | Type | Prompt | Used In |
|---|------|--------|---------|
| 1 | Text-to-image | Cyberpunk samurai in rain, neon reflections, cinematic | Hook - hero image |
| 2 | Text-to-image | Golden retriever on velvet throne, renaissance painting | Hook - montage |
| 3 | Text-to-image | NEON GARDEN 2026 festival poster, geometric, holographic | Hook - montage |
| 4 | Text-to-image | Isometric pixel art cozy coffee shop | Hook - montage |
| 5 | Text-to-image | Product photo matte black headphones, white background | Hook - montage |
| 6 | Text-to-image | Anime space pilot in cockpit | Hook - montage |
| 7 | Text-to-image | Dragon on skyscraper in thunderstorm | Workflow - /generate demo |
| 8 | Text-to-image (styled) | Knight on bridge, dark fantasy oil painting style | Workflow - style demo A |
| 9 | Text-to-image (styled) | Knight on bridge, clean vector pastel minimal | Workflow - style demo B |
| 10 | Image-to-image | Desk/room photo → Dutch Golden Age oil painting | Workflow - /restyle hero demo |
| 11 | Image-to-image | Cosplay photo → Anime key visual | Workflow - restyle montage |
| 12 | Image-to-image | Band rehearsal photo → Concert tour poster | Workflow - restyle montage |
| 13 | Image-to-image | Game screenshot → Cinematic concept art | Workflow - restyle montage |
| 14 | Image-to-image | Kitchen product photo → E-commerce hero image | Workflow - restyle montage |
| 15 | Text-to-image | Architecture diagram, dark navy, three boxes, glowing arrows | Setup - diagram B-roll |
| 16 | Text-to-image | Lighthouse in a storm (Klein speed demo) | Setup - live modification demo |
| 17 | Text-to-image | Thumbnail: Fantasy knight on cliff, glowing city, sunset | Thumbnail |
| 18 | Text-to-image | D&D elf ranger portrait, dramatic lighting | Community montage |
| 19 | Text-to-image | Cat in a business suit giving a TED talk | Community montage |
| 20 | Text-to-image | Anime mountain landscape wallpaper | Community montage |
| 21 | Text-to-image | Minimalist wolf esports logo, black and gold | Community montage |
| 22 | Text-to-image | Whimsical birthday cake, confetti, kawaii style | Community montage |

### Screen Recordings Needed

1. **Discord demo - /generate command** (clean take, no mistakes)
2. **Discord demo - /setstyle + /generate** (show the style being saved, then used)
3. **Discord demo - /restyle with attached image** (drag-drop photo, type command, see result)
4. **Discord demo - side-by-side style comparison** (or composite in editing)
5. **Discord demo - multiple users generating** (use friends/alt accounts - show emoji reactions on outputs)
6. **Browser - api.bfl.ai sign-up and API key copy** (blur actual key)
7. **Browser - BFL API dashboard with usage/cost stats** (show the $1.41 total or your real numbers)
8. **Discord - Klein speed demo** (show near-instant generation with model picker - ADD TIMER OVERLAY IN EDITING)
9. **Discord - community montage** (friends generating a burst of images, emoji reactions, casual messages)
10. **Browser - GitHub repo page** (show README)
11. **Browser - Landing page → Add to Discord → /setkey → first /generate** (ONE CONTINUOUS TAKE - this is the most important recording)

### Talking Head Shots

Film all VO lines that are marked "face cam" in one session. Shoot in order. Wear the same outfit. Match energy throughout - confident, casual, slightly amazed at the tech but not over-the-top.

### Music & SFX

- **Background music:** Lo-fi electronic or minimal synthwave. Drops to ~20% volume during code explanations, back to ~60% during montages and transitions.
- **SFX - keyboard clicks:** Subtle mechanical keyboard sounds when showing Discord typing. Don't overdo it - 2-3 keystrokes, not every letter.
- **SFX - image reveal:** A soft, satisfying "click" or "whoosh" when each generated image appears. Keep it consistent.
- **No SFX during face-cam VO sections.** Let the visuals and voice carry it.

### Editing Notes

- **Cuts:** Hard cuts only. No dissolves or fades except the final fade to black. This keeps energy high and matches the "modern tech" vibe.
- **Text animations:** All on-screen text should appear with a quick snap (0.1s ease-out). No bouncing, no spinning. Professional.
- **Image reveals:** When a generated image appears fullscreen, use a subtle scale animation: starts at 97% → eases to 100% over 0.3 seconds. Creates a feeling of the image "landing."
- **Pacing rule:** No single shot should last longer than 8 seconds without either a visual change, a text overlay, or a cut. This keeps retention.

---

## TOTAL RUNTIME ESTIMATE

| Section | Duration |
|---------|----------|
| Hook + image montage | 0:40 |
| Story: D&D server + friend reaction | 0:25 |
| Workflow: /generate | 1:00 |
| Workflow: /setstyle | 0:50 |
| Workflow: /restyle + communities | 1:20 |
| Setup: Architecture | 0:30 |
| Setup: API key + cost breakdown | 0:45 |
| Setup: Code walkthrough (2 snippets) | 1:30 |
| Setup: Live mod + speed demo + going live | 0:45 |
| CTA: Landing page flow + close | 0:45 |
| **TOTAL** | **~8:30** |

---

## DESCRIPTION BOX (copy-paste for YouTube)

```
I built an open-source Discord bot that generates AI images using FLUX.2 by Black Forest Labs.

Every user gets their own personal style. Type a prompt, get a stunning image - right in your group chat. Choose between four FLUX models: Pro, Max, Klein, or Flex.

🔗 Add to your server: fluxbot.vercel.app
🔗 Clone the bot: github.com/black-forest-labs/flux-discord-bot
🔗 Get your FLUX API key: api.bfl.ai
🔗 FLUX documentation: docs.bfl.ai

Commands:
/generate - Create an image from a text prompt (choose your model)
/restyle - Upload an image and transform it into a new style
/setstyle - Save your personal style for all future generations
/mystyle - View your current style
/clearstyle - Reset your style to default
/setkey - (Admin) Set a shared BFL API key for the server
/removekey - (Admin) Remove the shared key
/mykey - Set your own personal BFL API key
/removemykey - Remove your personal key

Built with Python, discord.py, aiohttp, aiosqlite, and the FLUX.2 API.
Deployed with Railway (bot) and Vercel (landing page).

#AI #DiscordBot #ImageGeneration #FLUX #BlackForestLabs #OpenSource
```

---

## PINNED COMMENT (post immediately after upload)

```
Want to set this up yourself? Two options:

EASY: Click "Add to Discord" → fluxbot.vercel.app → run /setkey (server key) or /mykey (personal key) with your BFL API key → done.

SELF-HOST:
1. Clone the repo → github.com/black-forest-labs/flux-discord-bot
2. Create a Discord app → discord.com/developers
3. Get a FLUX API key → api.bfl.ai
4. Deploy to Railway or run `python main.py`

Drop a comment if you get it running - we want to see what you build 🔥
```
