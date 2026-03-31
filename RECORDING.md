# FluxBot Video — Recording Script

> Stripped-down version of SCRIPT.md. Each cut is isolated — read the VO, record the visual, move on.
> Pre-generated assets referenced by number match the table in SCRIPT.md.

---

## CUT 1 — Cold Open (0:00)

**Record:** Screen recording of Discord. Type this command in real time:

```
/generate prompt: a cyberpunk samurai standing in the rain, neon reflections on wet pavement, cinematic
```

Show the bot thinking, then smash cut to asset #1 fullscreen (3 seconds).

**VO:**
"That — was made in a group chat. No Photoshop. No expensive AI tool. No monthly subscription. A Discord bot and one sentence."

---

## CUT 2 — Face Cam Intro (0:15)

**Record:** Face cam, medium shot. Direct to camera.

**VO:**
"This is FLUX.2 — the latest image model from Black Forest Labs, the research team behind Stable Diffusion. I built a Discord bot that puts it right in your server. Type a prompt. Get this back."

---

## CUT 3 — Hook Montage (0:30)

**Record:** Screen recording — these 5 pre-generated images appearing in Discord chat, fast cuts:

1. Golden retriever on velvet throne, renaissance lighting
2. "NEON GARDEN 2026" festival poster, holographic gradients
3. Isometric pixel art cozy coffee shop
4. Product photo: matte black headphones, white background
5. Anime space pilot in cockpit, dramatic side lighting

**VO:**
"Event flyers. Gaming thumbnails. Product mockups. Your D&D party's character art. Whatever your community needs — this thing makes it right where everyone already hangs out."

---

## CUT 4 — Story: The D&D Server (0:40)

**Record:** Face cam. Storytelling tone, slightly leaning in.

**VO:**
"Quick story. My buddy runs a D&D server — about fifty people. Every campaign, he needs character art, scene illustrations, maps. He was cobbling stuff together in Canva, sometimes even MS Paint — or burning credits on some AI image generator that charged a dollar per image. Then downloading everything and re-uploading it to Discord threads."

*(beat)*

"I told him: give me five minutes. I dropped this bot in his server, set a dark fantasy style, and typed one prompt. His reaction was…"

---

## CUT 5 — Friend Reaction (1:00)

**Record:** Screen recording of a real Discord reaction — friend saying something like "dude WHAT" with emoji reactions. Then cut back to face cam.

**VO:**
"Now the whole server generates their own character art, scene illustrations, maps — without ever leaving the chat. That's the point of this bot. Let me show you."

> Lower third: "FluxBot — Open Source Discord Image Bot / Powered by Black Forest Labs FLUX.2 API"

---

## CUT 6 — /generate Demo (1:05)

**Record:** Screen recording — type this command, briefly show the model picker (select Pro), then let the bot generate:

```
/generate prompt: a massive dragon perched on a skyscraper in a thunderstorm, lightning illuminating its scales, cinematic wide shot
```

Bot thinks → image appears. Hold fullscreen 3 seconds.

**VO:**
"Here's the bot in a real server. You call `/generate`, describe what you want, and…"

*(image lands)*

"Every time. The detail on this is wild — look at the lighting on the scales. This is from one sentence typed into a chat app."

---

## CUT 7 — Transition to Styles (2:00)

**Record:** Brief face cam.

**VO:**
"But here's what makes it actually useful. What if you want everything you generate to have a certain look?"

---

## CUT 8 — /setstyle Demo (2:05)

**Record:** Screen recording — type this command:

```
/setstyle style: luminous Studio Ghibli watercolor, soft golden hour light, warm pastel skies, hand-painted textures, whimsical and serene
```

Bot responds with ephemeral message ("✅ Style saved!"). Make sure "Only you can see this message" is visible.

**VO:**
"With `/setstyle`, you save a personal style that gets baked into every image you generate. Watch what happens."

---

## CUT 9 — Styled Generate (2:20)

**Record:** Screen recording — type this command (no style in the prompt — the bot applies it automatically):

```
/generate prompt: a lone knight crossing a stone bridge over a chasm
```

Image appears in the Ghibli watercolor style — warm, painterly, serene. Hold fullscreen. Point out the style footer in the embed.

**VO:**
"See that? I didn't describe the style. The bot remembered it. And look at the footer of the embed — it shows my style right there so I always know what's active. Now every image I generate has that DNA — until I change it."

---

## CUT 10 — Style Comparison (2:40)

**Record:** Screen recording — switch to a different user account. Type:

```
/setstyle style: brutalist monochrome ink sketch, heavy black linework, stark white negative space, graphic novel crosshatching, high contrast
```

Then generate the same prompt:

```
/generate prompt: a lone knight crossing a stone bridge over a chasm
```

Totally different result — black-and-white, harsh ink strokes, graphic novel energy. Composite both images side-by-side in editing (warm watercolor vs. stark ink — instantly legible contrast).

**VO:**
"Same prompt. Same bot. Same server. Two completely different images — because each user has their own style. It's not one-size-fits-all. It's your image engine, configured the way you want it."

> On-screen text: "Same prompt. Different users. Different art." — hold 2 seconds.

---

## CUT 11 — /restyle Intro (2:55)

**Record:** Screen recording — start typing `/restyle`, show the file picker. Attach a boring desk/selfie photo.

**VO:**
"Now, text-to-image is great. But what about starting from a photo you already have?"

---

## CUT 12 — /restyle Demo (3:05)

**Record:** Screen recording — complete the `/restyle` command:

```
/restyle prompt: a detailed oil painting in the style of the Dutch Golden Age, dramatic candlelight, rich colors  image: [your-desk-photo.jpg]
```

Image appears — same composition, Vermeer painting style. Hold fullscreen 3 seconds.

**VO:**
"That's my actual desk. Same mess, same angle — but FLUX turned it into something you'd hang on a wall. Five seconds."

---

## CUT 13 — Restyle Montage (3:15)

**Record:** Face cam intro, then screen recording — rapid cuts of these 4 pre-generated restyle examples, 1.5s each:

1. Cosplay photo → "High-quality anime cel illustration, vibrant colors, sharp linework, studio quality anime key visual"
2. Band rehearsal photo → "Concert tour poster, bold typography reading 'WORLD TOUR 2026', dramatic stage lighting"
3. Game screenshot → "Epic cinematic concept art, dramatic volumetric lighting, matte painting quality, 8k"
4. Kitchen product photo → "Professional product photograph, clean white background, studio lighting, commercial e-commerce quality"

**VO (face cam):**
"Now think about what that means for different communities."

**VO (over montage):**
"Cosplay photo into anime key art. A rehearsal shot into a tour poster. A game screenshot into concept art. A kitchen-table product photo into an e-commerce hero image. Same bot. Different communities."

---

## CUT 14 — Transition to Setup (3:50)

**Record:** Face cam. Slight lean back, casual.

**VO:**
"Now — you're probably wondering what's actually going on behind the scenes. Let me show you. I promise it's simpler than you'd expect."

---

## CUT 15 — Architecture (4:00)

**Record:** Show the architecture diagram (asset #15 or a Figma mockup). Three boxes: Discord → FluxBot → FLUX API.

**VO:**
"Here's the whole thing. User types a command in Discord. The bot catches it, sends the prompt to the FLUX API, gets the image back, posts it in chat. Three steps. That's the entire architecture."

> Lower third: "Discord → FluxBot → FLUX.2 API → Image in chat / That's it. Three steps."

---

## CUT 16 — API Key + Pricing (4:30)

**Record:** Screen recording — browser at api.bfl.ai, show sign-up briefly, show the "Copy" button for the key (blur the actual key). Then show the cost breakdown graphic.

**VO:**
"Step one: get a FLUX API key. Head to api.bfl.ai, sign up — takes about thirty seconds — grab your API key, and you're set. Now let me put some numbers on this — because the pricing is kind of wild."

*(cost graphic appears)*

"I generated forty-seven images making this video. Total cost: a dollar forty-one. Three cents per image. For context — one stock photo on Shutterstock starts at four bucks. Canva Pro is thirteen a month. Forty-seven images for a dollar forty-one."

*(comparison graphic)*

"And that's Pro pricing. Klein is a fraction of a cent — sub-second generation at $0.014 per image. Basically free."

> On-screen: cost graphic (47 images / $1.41 / $0.03 per image) then comparison graphic.
> Bottom-right card: "Ready to try it yourself? api.bfl.ai — free tier, no credit card"

---

## CUT 17 — Under the Hood (5:00)

**Record:** Screen recording — Discord UI showing a `/setstyle` response and a generated image with the style footer visible. Then face cam.

**VO (over Discord UI):**
"Under the hood: clean Python, fully open source. Your style gets saved to your user ID. When you generate, the bot merges it with your prompt automatically. The response is private — only you see your style config. A handful of functions. But to the user? It feels like the bot knows them."

**VO (face cam):**
"And because it's open source, you can customize the whole thing for your server's workflow. Change default models. Add new commands. Swap in different aspect ratios. The code is readable enough that any developer can fork it and make it theirs in an afternoon. But let me show you the part I'm most excited about."

---

## CUT 18 — Klein Speed Demo (5:45)

**Record:** Screen recording — Discord. Type this command, selecting Klein from the model dropdown:

```
/generate prompt: a lighthouse in a storm  model: Klein
```

**Add timer overlay in editing.** Timer starts on enter, freezes when image appears (~0.8s).

**VO:**
"Under one second. Klein is FLUX.2's speed model — press enter, see the image. Pro gives you more detail when you need it. Your users pick per generation."

> On-screen: large "0.8 seconds." centered after the timer freezes.

---

## CUT 19 — Community Montage (6:15)

**Record:** Screen recording — get friends to generate a burst of images in one channel. Need:

- 4–5 different usernames generating
- Emoji reactions on outputs (🔥 ❤️ 😍 😱)
- At least one casual message like "wait this is insane"

Pre-generated images to stage if needed:
1. D&D elf ranger portrait, dramatic lighting
2. Cat in a business suit giving a TED talk
3. Anime mountain landscape wallpaper
4. Minimalist wolf esports logo, black and gold
5. Whimsical birthday cake, confetti, kawaii style

**VO:**
"Every user gets their own style. Their own creative fingerprint. Their own API key if they want it. All in one shared space."

---

## CUT 20 — CTA: Face Cam (6:45)

**Record:** Face cam. Direct to camera. Calm, confident.

**VO:**
"The full bot is open source. Everything you just saw is on GitHub, ready to clone. But you don't even need to go that far."

---

## CUT 21 — Landing Page Flow (6:55)

**Record:** Screen recording — ONE CONTINUOUS TAKE, ~30 seconds. Rehearse this.

1. Browser opens landing page
2. Scroll through features
3. Click "Add to Discord"
4. Discord OAuth → pick server → authorize
5. Switch to Discord — FluxBot appears in member list
6. Type: `/setkey key:your_key_here` — bot confirms
7. Type: `/generate prompt: a sunset over mountains` — image appears

> **Most important recording. Must be clean and unbroken.**

**VO:**
"Landing page. Click 'Add to Discord.' Pick your server. Set your API key. Generate. Zero to first image in under a minute. No terminal. No code."

---

## CUT 22 — GitHub + Close (7:15)

**Record:** Screen recording — show the GitHub repo page and README briefly. Then face cam for the final lines.

> On-screen: "github.com/black-forest-labs/flux-discord-bot / Link in description ↓"

**VO (over GitHub):**
"If you want to self-host or customize — clone the repo, add your bot token, deploy to Railway, and you're live. If you just want to use it — the landing page is all you need."

**VO (face cam):**
"If you build something cool with this, tag Black Forest Labs — they genuinely want to see what people make. And if you want to go deeper — custom styles, LoRA training — there are guides for that too. Links in the description."

*(beat)*

"Go make something."

> Hard cut to black. End card with subscribe button.
> End card text: "FluxBot — Open Source / github link / Add to Discord → fluxbot.vercel.app / FLUX.2 API → api.bfl.ai"
