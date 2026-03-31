# FluxBot Video — CapCut Editing Guide

> This guide maps every clip, asset, overlay, and transition to a timeline. Import everything, follow cut-by-cut.

---

## PROJECT SETUP

### CapCut Settings

- **Resolution:** 1920×1080 (16:9)
- **Frame rate:** 30fps (match your screen recordings; if you filmed face cam at 24fps, that's fine — CapCut handles mixed framerates)
- **Background color:** `#000000` (pure black — used between cuts and for cold open)

### Track Layout (bottom to top)

| Track | Purpose |
|-------|---------|
| **Video 1** | Primary footage (screen recordings, face cam) |
| **Video 2** | Asset overlays (fullscreen FLUX images, side-by-side composites) |
| **Video 3** | Text overlays, lower thirds, on-screen graphics |
| **Video 4** | Timer overlay (Cut 18 only) |
| **Audio 1** | Voiceover |
| **Audio 2** | Background music |
| **Audio 3** | SFX (keyboard clicks, image reveal whoosh) |

### Import & Organize

Create these folders in CapCut's media panel:

| Folder | Contents |
|--------|----------|
| `01 Face Cam` | All talking-head clips (Cuts 2, 4, 7, 13-intro, 14, 17-facecam, 20, 22-facecam) |
| `02 Screen Recs` | All Discord + browser screen recordings (Cuts 1, 3, 5, 6, 8, 9, 10, 11, 12, 13-montage, 16, 18, 19, 21, 22-github) |
| `03 FLUX Assets` | All 17 pre-generated images from `assets/` |
| `04 Graphics` | Cost breakdown graphic, comparison graphic, any designed lower thirds |
| `05 Audio` | VO recordings, music track, SFX |

---

## ASSET REFERENCE

These are your pre-generated FLUX images in `assets/`. Each maps to a specific cut.

| File | Cut | How It's Used |
|------|-----|---------------|
| `01_hook_hero_samurai.jpg` | 1 | Fullscreen smash cut after Discord typing |
| `02_montage_dog_throne.jpg` | 3 | Montage image 1 — fast cut |
| `03_montage_festival_poster.jpg` | 3 | Montage image 2 — fast cut |
| `04_montage_pixel_coffee.jpg` | 3 | Montage image 3 — fast cut |
| `05_montage_headphone_product.jpg` | 3 | Montage image 4 — fast cut |
| `06_montage_anime_pilot.jpg` | 3 | Montage image 5 — fast cut |
| `07_generate_dragon.jpg` | 6 | Fullscreen hero — hold 3 seconds |
| `08_style_knight_fantasy.jpg` | 9 | Left side of style comparison composite |
| `09_style_knight_vector.jpg` | 10 | Right side of style comparison composite |
| `15_architecture_diagram.jpg` | 15 | Fullscreen diagram — hold duration of VO |
| `16_klein_lighthouse.jpg` | 18 | Fullscreen reveal after timer — hold 2 seconds |
| `17_thumbnail_knight.jpg` | — | YouTube thumbnail only (don't use in edit) |
| `18_community_dnd_elf.jpg` | 19 | Community montage image 1 |
| `19_community_cat_ted.jpg` | 19 | Community montage image 2 |
| `20_community_anime_landscape.jpg` | 19 | Community montage image 3 |
| `21_community_wolf_logo.jpg` | 19 | Community montage image 4 |
| `22_community_birthday.jpg` | 19 | Community montage image 5 |

### Missing Assets (should come from your filming)

These weren't pre-generated — they come from your screen recordings or source photos:

| # | What | Source |
|---|------|--------|
| 10 | Desk photo → Dutch Golden Age restyle | Your screen recording of `/restyle` command (Cut 12) |
| 11 | Cosplay → anime restyle | Your screen recording or separate restyle output |
| 12 | Band rehearsal → tour poster restyle | Your screen recording or separate restyle output |
| 13 | Game screenshot → concept art restyle | Your screen recording or separate restyle output |
| 14 | Kitchen product → e-commerce restyle | Your screen recording or separate restyle output |

If you generated restyle outputs as separate files during filming, add them to `03 FLUX Assets`. If they only exist inside your screen recordings, you'll grab stills from those clips in the timeline (right-click frame → "Extract frame" in CapCut).

---

## CUT-BY-CUT TIMELINE

### CUT 1 — Cold Open `[0:00–0:14]`

| Element | Track | Details |
|---------|-------|---------|
| Black screen | V1 | 1 second of pure black |
| Discord screen rec | V1 | Recording of typing the `/generate` command in real time. Trim to just the typing — no waiting. |
| `01_hook_hero_samurai.jpg` | V2 | **Smash cut.** Hard cut to fullscreen. Hold **3 seconds.** |
| VO: "That — was made in a group chat..." | A1 | Starts on the smash cut to the image. |
| Keyboard SFX | A3 | 2-3 subtle mechanical clicks during the typing portion. Don't do every keystroke. |

**CapCut notes:**
- Add a **Scale** keyframe animation to the samurai image: start at **97%**, ease to **100%** over 0.3s. This gives the "image landing" feel. *(Right-click clip → Animation → In → select "Zoom In", then adjust duration to 0.3s and scale range to 97-100%.)*
- No transition effect between the typing and the image. **Hard cut only.**

---

### CUT 2 — Face Cam Intro `[0:15–0:29]`

| Element | Track | Details |
|---------|-------|---------|
| Face cam clip | V1 | Medium shot, direct to camera. |
| VO: "This is FLUX.2..." | A1 | Lands the BFL name-drop — don't rush it. |

**CapCut notes:**
- Trim any dead air at the start/end. First frame should be you already in position and talking.
- No text overlays here — let the face carry it.

---

### CUT 3 — Hook Montage `[0:30–0:39]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord chat | V1 | Optional: show them "appearing" in chat. Or skip V1 and just do fullscreen assets. |
| `02_montage_dog_throne.jpg` | V2 | **1.5 seconds** |
| `03_montage_festival_poster.jpg` | V2 | **1.5 seconds** |
| `04_montage_pixel_coffee.jpg` | V2 | **1.5 seconds** |
| `05_montage_headphone_product.jpg` | V2 | **1.5 seconds** |
| `06_montage_anime_pilot.jpg` | V2 | **1.5 seconds** |
| VO: "Event flyers. Gaming thumbnails..." | A1 | Runs across the montage. Each phrase roughly aligns with one image. |
| Image reveal SFX | A3 | Soft whoosh/click on each image transition (5 total). Use the same sound each time. |

**CapCut notes:**
- Each image gets the same **97% → 100% scale** animation (0.2s this time — faster for montage energy).
- **Hard cuts** between images. No crossfades.
- Music should be at **~60% volume** here — montage energy.

---

### CUT 4 — Story: The D&D Server `[0:40–0:59]`

| Element | Track | Details |
|---------|-------|---------|
| Face cam clip | V1 | Storytelling tone, leaning in. |
| VO: "Quick story. My buddy runs a D&D server..." | A1 | This is all one continuous face-cam take. Let it breathe — the beat/pause before "I told him" matters. |

**CapCut notes:**
- Drop music to **~20% volume** for this section. Storytelling needs space.
- If the take is long, you can do a **jump cut** mid-sentence (cut 5-10 frames out where you paused) to tighten pacing. CapCut's "Smart Cut" / "Remove Silence" can help here.

---

### CUT 5 — Friend Reaction `[1:00–1:04]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord reaction | V1 | The "dude WHAT" moment with emoji reactions. Hold for 3-4 seconds. |
| Face cam clip | V1 | Cut back for "Now the whole server generates..." |
| VO: continues from Cut 4 | A1 | — |
| Lower third text | V3 | "FluxBot — Open Source Discord Image Bot / Powered by Black Forest Labs FLUX.2 API" |

**CapCut lower third:**
- Use CapCut's **Text → Add Text**. Font: clean sans-serif (Inter, Roboto, or CapCut's built-in "Montserrat").
- Position: bottom-left, ~80px from edges.
- Background: semi-transparent dark bar (`#000000` at 60% opacity).
- Text color: white. Size: ~32pt for title, ~22pt for subtitle.
- **Animate in:** slide from left (0.3s). **Hold** for 4 seconds. **Animate out:** fade (0.3s).

---

### CUT 6 — /generate Demo `[1:05–1:59]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Typing `/generate`, showing model picker (select Pro), bot thinking. |
| `07_generate_dragon.jpg` | V2 | When the image appears in Discord, **smash cut to fullscreen version.** Hold **3 seconds.** |
| VO: "Here's the bot in a real server..." | A1 | Runs over the typing. Pause at "and..." — then the image lands. |
| VO: "Every time. The detail on this..." | A1 | Runs over the fullscreen image hold. |
| Image reveal SFX | A3 | One whoosh when cutting to fullscreen. |

**CapCut notes:**
- The screen recording plays until the image appears in the Discord embed. At that exact frame, hard cut to `07_generate_dragon.jpg` fullscreen on V2.
- Same 97% → 100% scale animation on the fullscreen image.
- After the 3-second hold, hard cut back to the screen recording or to face cam for the transition line.

---

### CUT 7 — Transition to Styles `[2:00–2:04]`

| Element | Track | Details |
|---------|-------|---------|
| Face cam clip | V1 | Brief — just the transition line. |
| VO: "But here's what makes it actually useful..." | A1 | — |

---

### CUT 8 — /setstyle Demo `[2:05–2:19]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Typing `/setstyle` command. Bot responds with ephemeral message. |
| VO: "With /setstyle, you save a personal style..." | A1 | — |

**CapCut notes:**
- Make sure the "Only you can see this message" text in Discord is visible. If it's small, add a subtle **zoom callout**: duplicate the clip on V2, crop to just that text area, scale up 200%, position it center-screen for 1.5 seconds, then cut back. Or use CapCut's built-in zoom effect.

---

### CUT 9 — Styled Generate `[2:20–2:39]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Typing `/generate prompt: a lone knight crossing a stone bridge over a chasm`. Bot generates. |
| `08_style_knight_fantasy.jpg` | V2 | Fullscreen when image appears. Hold **3 seconds.** |
| VO: "See that? I didn't describe the style..." | A1 | Point out the style footer — if it's not visible in the fullscreen asset, cut back to the Discord embed briefly to show it. |

---

### CUT 10 — Style Comparison `[2:40–2:54]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Different user account sets ink sketch style, generates same prompt. |
| Side-by-side composite | V2 | `08_style_knight_fantasy.jpg` (left) and `09_style_knight_vector.jpg` (right). |
| On-screen text | V3 | "Same prompt. Different users. Different art." — centered, bold. |
| VO: "Same prompt. Same bot. Same server..." | A1 | — |

**CapCut side-by-side composite:**
1. Place `08_style_knight_fantasy.jpg` on V1. Scale to **50%**. Position X: **-25%** (left half).
2. Place `09_style_knight_vector.jpg` on V2. Scale to **50%**. Position X: **+25%** (right half).
3. Add a **2px white vertical line** down the center (use a shape element or a thin white rectangle on V3).
4. Both images should appear simultaneously with the 97% → 100% scale animation.
5. Hold for **4 seconds** — 2 seconds with VO, then 2 seconds with the text overlay.

**On-screen text:** Large, centered, white, bold sans-serif. Animate in with a snap (0.1s scale from 95% → 100%). Hold 2 seconds.

---

### CUT 11 — /restyle Intro `[2:55–3:04]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Start typing `/restyle`, show the file picker / attachment UI. |
| VO: "Now, text-to-image is great. But what about..." | A1 | — |

---

### CUT 12 — /restyle Demo `[3:05–3:14]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Completing `/restyle` with attached desk photo. Bot processes. |
| Restyle output (fullscreen) | V2 | The Dutch Golden Age output — grab a still from the screen recording if you don't have it as a separate file. Hold **3 seconds.** |
| VO: "That's my actual desk..." | A1 | — |
| Image reveal SFX | A3 | Whoosh on the fullscreen cut. |

---

### CUT 13 — Restyle Montage `[3:15–3:49]`

| Element | Track | Details |
|---------|-------|---------|
| Face cam clip | V1 | "Now think about what that means for different communities." — 3 seconds. |
| Restyle before/after pairs | V2 | 4 pairs, **1.5 seconds each** (6 seconds total). Show source → result as a quick cut or split-screen. |
| VO: "Cosplay photo into anime key art..." | A1 | Each phrase aligns with one restyle pair. |

**Restyle montage options (pick one approach):**

**Option A — Quick cuts:** Show source photo for 0.5s, hard cut to the restyle output for 1.0s. Repeat ×4.

**Option B — Wipe transition:** Place source on V1 and output on V2. Use CapCut's **"Slide Left" transition** (0.3s) so the output wipes over the source. More dynamic but risks looking gimmicky — keep it fast.

**Option C — Split-screen:** Source on left (50%), output on right (50%), with a thin white divider. Hold 1.5s per pair. Cleanest option.

I recommend **Option C** — it's the clearest way to show the transformation and matches the style comparison in Cut 10.

---

### CUT 14 — Transition to Setup `[3:50–3:59]`

| Element | Track | Details |
|---------|-------|---------|
| Face cam clip | V1 | Lean back, casual. |
| VO: "Now — you're probably wondering..." | A1 | — |

---

### CUT 15 — Architecture `[4:00–4:29]`

| Element | Track | Details |
|---------|-------|---------|
| `15_architecture_diagram.jpg` | V1 | Fullscreen. Hold for full VO duration. |
| Lower third text | V3 | "Discord → FluxBot → FLUX.2 API → Image in chat / That's it. Three steps." |
| VO: "Here's the whole thing..." | A1 | — |

**CapCut notes:**
- If the diagram feels static for 30 seconds, add a **slow Ken Burns** effect: start slightly zoomed out (98%), slowly push in to 102% over the duration. Barely noticeable but prevents it feeling like a slide.
- Lower third appears about halfway through the VO. Same style as Cut 5's lower third.

---

### CUT 16 — API Key + Pricing `[4:30–4:59]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec — browser at dashboard.bfl.ai | V1 | Show sign-up page briefly, dashboard, "Copy" button for API key. |
| **KEY BLUR** | V2 | **Critical:** Place a blurred rectangle over your actual API key. In CapCut: Effects → Video Effects → Blur. Position/keyframe it to follow the key if you scroll. |
| Cost breakdown graphic | V2 | Your designed graphic: "47 images / $1.41 / $0.03 per image". Overlay fullscreen when VO reaches the numbers. |
| Comparison graphic | V2 | "FluxBot vs. Canva vs. Shutterstock vs. designer" graphic. Appears after cost breakdown. |
| CTA card | V3 | Bottom-right: "Ready to try it yourself? dashboard.bfl.ai - create a key". Hold 5 seconds. |
| VO: "Step one: get a FLUX API key..." | A1 | — |

**Graphics you need to design (Canva/Figma, then import):**

1. **Cost graphic** — Dark background, large white text:
   ```
   47 images generated
   Total: $1.41
   $0.03 per image
   ```
   Keep it minimal. Maybe a subtle grid or dot pattern background.

2. **Comparison graphic** — Simple table or bar chart:
   ```
   FluxBot:           400+ images / ~$12
   Canva Pro:         Templates only / $13/mo
   Shutterstock:      10 downloads / $29/mo
   Hiring a designer: 1 graphic / $50-200
   ```

3. **CTA card** — Small card, bottom-right corner. White text on semi-transparent dark background with a subtle border.

---

### CUT 17 — Under the Hood `[5:00–5:44]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Show `/setstyle` ephemeral response and a generated image with the style footer visible. |
| Face cam clip | V1 | Cuts in for "And because it's open source..." |
| VO: "Under the hood: clean Python..." | A1 | — |

**CapCut notes:**
- No code on screen. The script is explicit about this — this is a product demo, not a tutorial.
- The transition to face cam should be a hard cut when the tone shifts to "you can customize."

---

### CUT 18 — Klein Speed Demo `[5:45–6:14]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Model picker → Klein. Type the lighthouse prompt. Press enter. |
| `16_klein_lighthouse.jpg` | V2 | Fullscreen when the image appears. |
| **Timer overlay** | V4 | Starts on enter, freezes when image appears. |
| On-screen text | V3 | Large centered "0.8 seconds." after timer freezes. Hold 2 seconds. |
| VO: "Under one second..." | A1 | — |

**CapCut timer overlay — how to build it:**

CapCut doesn't have a native stopwatch widget, so here's the best approach:

1. **Pre-render a timer video** — use a screen-recorded stopwatch app (phone or web), crop it to just the digits. Or use a free countdown timer video from a stock site. White digits on transparent/black background.
2. **Place on V4**, top-right corner. Scale to ~15% of frame. Add a semi-transparent dark rounded-rectangle behind it on V3 for readability.
3. **Sync the start:** Align the timer's 0:00 with the frame where you press Enter in the Discord recording.
4. **Freeze frame:** At the frame where the image appears in Discord, split the timer clip. Replace everything after the split with a **freeze frame** of the final number (e.g., "0.8s").
5. **Pulse effect on freeze:** Add a quick scale keyframe — 100% → 110% → 100% over 0.3s — so the number "pops" when it freezes.

**Alternative (simpler):** Skip the live timer. Just hard cut to the image and add a text element that says **"0.8s"** with a snap animation. Less flashy but saves time. Add it as a large centered text on V3 for 2 seconds after the image appears.

---

### CUT 19 — Community Montage `[6:15–6:44]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec of Discord | V1 | Multiple users generating images, emoji reactions, casual messages. |
| Community asset overlays | V2 | If your screen recording doesn't show good images, overlay these fullscreen for variety: `18_community_dnd_elf.jpg`, `19_community_cat_ted.jpg`, `20_community_anime_landscape.jpg`, `21_community_wolf_logo.jpg`, `22_community_birthday.jpg`. |
| VO: "Every user gets their own style..." | A1 | — |

**CapCut notes:**
- This should feel fast and alive. If you have a good screen recording with multiple people generating, use that primarily — the authenticity matters. Use the pre-generated assets as **brief fullscreen cuts** between moments (1-1.5 seconds each) to show image quality.
- Music back up to **~60% volume** — montage energy.
- Allow the fun Discord messages/reactions to be visible and readable.

---

### CUT 20 — CTA: Face Cam `[6:45–6:54]`

| Element | Track | Details |
|---------|-------|---------|
| Face cam clip | V1 | Direct to camera, calm, confident. |
| VO: "The full bot is open source..." | A1 | — |

---

### CUT 21 — Landing Page Flow `[6:55–7:14]`

> **This is the most important recording. Must be one clean, unbroken take.**

| Element | Track | Details |
|---------|-------|---------|
| Screen rec — landing page flow | V1 | ONE continuous take: landing page → scroll features → Add to Discord → OAuth → pick server → authorize → Discord → FluxBot appears → `/setkey` → `/generate` → image appears. |
| VO: "Landing page. Click 'Add to Discord.'..." | A1 | Rapid, confident narration synced to each click. |

**CapCut notes:**
- Do **NOT** cut this recording. The continuous flow IS the point.
- If certain parts are slow (page loading, OAuth processing), use CapCut's **Speed → Custom Speed Curve** to speed up just those sections to 2-3×. Keep the actual actions at 1× speed.
- You can add subtle **zoom callouts** to draw attention to specific buttons being clicked (CapCut → Keyframe → Scale/Position), but keep them subtle — 110% zoom, centered on the click target, for 1 second.

---

### CUT 22 — GitHub + Close `[7:15–end]`

| Element | Track | Details |
|---------|-------|---------|
| Screen rec — GitHub repo page | V1 | Show README briefly. |
| On-screen text | V3 | "github.com/MaanavD/bfl-launch-kit / Link in description ↓" |
| Face cam clip | V1 | Final lines — "If you build something cool..." through "Go make something." |
| Black screen | V1 | Hard cut to black after "Go make something." |
| End card | V3 | Subscribe button area, video suggestions. Hold 5 seconds. |

**End card text (V3):**
```
FluxBot — Open Source
github.com/MaanavD/bfl-launch-kit
Add to Discord → fluxbot.vercel.app
Get API key → dashboard.bfl.ai
```

**CapCut end card:**
- Use CapCut's **End Screen template** or build manually:
  - Black background
  - Text elements centered, white, clean sans-serif
  - Leave space for YouTube's auto-generated subscribe button and video cards (the center-bottom and right-side areas)
  - Hold for **5 seconds** minimum (YouTube needs this for interactive end elements)

---

## GLOBAL EDITING RULES

### Transitions
- **Hard cuts only.** No dissolves, no fades, no wipes — except the final fade to black.
- In CapCut: make sure "Transitions" are **not** auto-applied. If you drag clips together and CapCut adds a default transition, delete it.

### Text Animations
- All text appears with a **snap**: 0.1s ease-out, scale from 95% → 100%.
- In CapCut: Text → Animation → In → "Scale Up". Set duration to 0.1s.
- **No bouncing, no spinning, no typewriter effect.** Professional.

### Image Reveal Animation
- Every time a FLUX-generated image appears fullscreen: **97% → 100% scale over 0.3 seconds.**
- In CapCut: Select the image clip → Keyframe → add a Scale keyframe at 97% on frame 1, then 100% at 0.3s. Set easing to "Ease Out."

### Pacing Rule
- **No single shot holds longer than 8 seconds** without a visual change (text overlay, zoom, cut, or picture-in-picture change).
- If a face-cam take runs long, add a **jump cut** or overlay a relevant image/screenshot.

### Music
- Consistent lo-fi electronic / minimal synthwave throughout.
- **~20% volume** during face cam / VO-heavy sections.
- **~60% volume** during montages and transitions.
- **No music** during the last 2 seconds before the final "Go make something" line. Let it land in silence.
- In CapCut: Use volume keyframes (Audio → Volume → add keyframes) to fade between 20% and 60%. Don't hard-switch — use 0.5s fades.

### SFX
- **Keyboard clicks:** 2-3 per typing moment. Not every keystroke. Use a mechanical keyboard sound.
- **Image reveal:** Soft click/whoosh when each generated image appears fullscreen. Same sound every time for consistency.
- **No SFX during face-cam VO sections.**
- CapCut has built-in SFX: Audio → Sound Effects → search "keyboard" and "whoosh". Or import your own.

### Color / Look
- Discord screen recordings: leave as-is (dark mode looks good).
- Face cam: Light color grade if needed. Slightly boost contrast, slightly warm the highlights. Don't overdo it — should look natural, not Instagram-filtered.
- FLUX images fullscreen: **no color grading.** Show them exactly as generated.
- In CapCut: Filters → Adjust → tweak selectively on face cam clips only.

---

## GRAPHICS TO CREATE BEFORE EDITING

You need these designed outside CapCut (Canva or Figma recommended), exported as PNG with transparent backgrounds where noted:

| # | Graphic | Specs |
|---|---------|-------|
| G1 | **Lower third: FluxBot intro** | "FluxBot — Open Source Discord Image Bot" / "Powered by Black Forest Labs FLUX.2 API". Dark semi-transparent bar. 1920×200px. PNG with transparency. |
| G2 | **Cost breakdown** | "47 images / $1.41 / $0.03 per image". Full 1920×1080. Dark background. |
| G3 | **Pricing comparison** | FluxBot vs Canva vs Shutterstock vs Designer. Full 1920×1080. Dark background. |
| G4 | **CTA card** | "Ready to try it yourself? dashboard.bfl.ai". ~400×120px. PNG with transparency. |
| G5 | **"Same prompt" text card** | "Same prompt. Different users. Different art." Full 1920×1080. Transparent background, white bold text centered. |
| G6 | **"0.8 seconds" text card** | Large centered text. Full 1920×1080. Transparent background. *(Or just use CapCut text — this one's simple enough.)* |
| G7 | **End card** | The four links + "FluxBot — Open Source". Full 1920×1080. Black background. Leave space for YouTube end screen elements. |

---

## THUMBNAIL

Use `17_thumbnail_knight.jpg` as the "result" side.

**Thumbnail layout (design in Canva at 1280×720):**
- **Left half:** Screenshot of Discord with `/generate` command visible (crop from your screen recordings)
- **Right half:** `17_thumbnail_knight.jpg`
- **Your face:** Bottom-right corner, cutout with drop shadow, expression = genuine surprise
- **Text overlay:** Bold "5 SECONDS." in large yellow/white text, top area
- **Divider:** Thin white or glowing line between the two halves, or a diagonal split

---

## EXPORT SETTINGS

When you're done in CapCut:

- **Resolution:** 1080p (1920×1080)
- **Frame rate:** 30fps
- **Codec:** H.264
- **Quality:** High (or set bitrate to ~20 Mbps for YouTube)
- **Audio:** AAC, 320kbps

YouTube will re-encode anyway, so don't go higher than 1080p unless you filmed in 4K and want to upload in 4K.

---

## FINAL CHECKLIST

Before exporting, scrub through the entire timeline and verify:

- [ ] API key is blurred in every frame of Cut 16
- [ ] All 17 FLUX asset images have the 97% → 100% scale animation
- [ ] No transition effects — hard cuts everywhere except final fade to black
- [ ] No single shot exceeds 8 seconds without visual change
- [ ] Music volume dips during face cam, rises during montages
- [ ] The landing page flow (Cut 21) is one unbroken take
- [ ] Timer overlay syncs with Enter key press in Cut 18
- [ ] End card holds for 5+ seconds (for YouTube end screen elements)
- [ ] Lower thirds have the correct URLs
- [ ] All text is readable at both fullscreen and mobile (preview at 50% zoom)
