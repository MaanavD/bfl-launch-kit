# Case Study Walkthrough — Presentation Guide

> 20 minutes + Q&A. Focus on reasoning and trade-offs, not just outputs.

---

## 1. Open with the Problem (2 min)

**What to say:**

"The brief told me two things. First, the last launch drove tens of thousands of sign-ups day one. Second, most of them never made their first API call. That's a classic activation gap — you can get attention, but attention without activation is a vanity metric.

So every decision I made starts from one question: **how do you turn a sign-up into someone who actually builds on this platform?**"

**Key framing:**
- The problem isn't awareness. BFL already gets attention. The problem is *conversion* — signup → first API call → retention.
- Most FLUX usage runs through Replicate, Fal, or self-hosted weights. BFL's own platform capture is small.
- That context shaped everything: what I built, how I structured it, and what I'd prioritize with more time.

---

## 2. The Funnel — How the Pieces Fit Together (2 min)

**What to say:**

"I designed the three deliverables as a funnel, not as three independent pieces. Each one targets a different stage of adoption and a different audience."

**Walk through this mapping:**

| Piece | Funnel Stage | Audience | Job |
|-------|-------------|----------|-----|
| **Blog post** | Awareness → Signup | Developers browsing HN/Twitter/Reddit | Make the case, get the click |
| **Tutorial** | Signup → First API call | Developer who just got an API key | Working result on their machine in 15 min |
| **Video + FluxBot** | Discovery → Low-friction trial | Non-terminal users, Discord communities, YouTube audience | First generation without touching code |

"The blog converts curiosity into a sign-up. The tutorial converts a sign-up into an activated user. The video captures the audience that a tutorial can't reach — people who won't clone a repo but will watch a demo and try a Discord bot."

**Trade-off to highlight:**
- "I could have made three standalone pieces. But disconnected content means the reader who finishes the blog has no next step. Every piece I built funnels into the next one."

---

## 3. Blog Post — Reasoning & Trade-offs (3 min)

**Open the blog tab. Scroll as you talk.**

**Key decisions to walk through:**

1. **Competitor framing, not feature listing.** "Developers don't care about features in isolation — they care about how FLUX.2 compares to what they're already using. So I built a comparison table against GPT Image and Imagen across 7 dimensions. FLUX.2 checks all 7. That's the argument."

2. **Ecosystem honesty.** "I acknowledge Replicate, Fal, ComfyUI, and open weights explicitly. Developers can smell marketing — if you pretend competitors don't exist, you lose trust. Instead, I show all the options and make BFL's API the obvious first choice by demonstrating its strengths: simplicity, cost, one API contract across 4 models."

3. **Cost transparency as a conversion lever.** "I put real prices in the blog — $0.03/image on pro, $1.41 for 47 images, compared against $4 for a single stock photo. Developers respond to concrete economics, not vague 'affordable' claims."

4. **Three exit paths.** "The CTA at the bottom doesn't say 'sign up.' It gives the reader three paths based on how they like to build: follow the tutorial, try FluxBot, or go straight to the API docs. Reducing friction at the decision point matters more than funneling everyone through one door."

**Trade-off:** "I chose to write this as a developer-audience blog post, not a press release. That means I skip the CEO quote and the partnership announcements. The trade-off is it doesn't serve the business press, but it serves the audience that actually converts — developers who will go get an API key."

---

## 4. Tutorial — Reasoning & Trade-offs (4 min)

**Open the tutorial tab. Show the quick-start, then scroll to architecture.**

**Key decisions:**

1. **Result before explanation.** "The tutorial opens with a copy-paste quick-start: clone, install, run. You have thumbnails on your screen in 60 seconds. *Then* I explain how it works. Most tutorials do it backwards — three pages of setup before you see anything. That's where you lose people."

2. **Why YouTube thumbnails?** "I needed a use case that's: (a) immediately useful — not a toy, (b) visual — you can see FLUX.2's quality, (c) repeatable — you'll run this again, not once. YouTube thumbnails hit all three. Everyone with a channel needs them, and they need three variants to test. That means the user generates 3+ images every time they use it, which builds API usage habits."

3. **Real tool, not a demo.** "This isn't a script that calls the API once and prints a URL. It's a CLI with face consistency (`--face`), text rendering (`--text`), file input (`--file`), model selection, and a comparison grid output. I shipped it with a self-contained HTML viewer that works from disk. The goal is: this is something you'd actually keep using."

4. **Model auto-upgrade.** "When you pass `--text`, the tool auto-upgrades from klein to pro-preview because text rendering needs the larger model. I didn't want the user to get a bad result and blame the API — so the tool makes the right choice silently."

5. **Sanitization layer.** "The prompt generator has 40+ regex replacements that convert brand names, technical jargon, and instructional phrasing into visual equivalents. 'React' becomes 'glowing blue atoms,' 'Kubernetes' becomes 'connected hexagonal nodes.' This is the kind of detail that separates a working demo from a production tool."

**Trade-off:** "I chose to build a real CLI tool (200+ lines across 6 files) instead of a simpler 'call the API in 20 lines' tutorial. That's more work for the reader — but the payoff is they have something genuinely useful at the end, not a throwaway script. The risk is complexity, so I mitigated it with the copy-paste quick-start and progressive disclosure."

**Show:** Open the thumbnail viewer output or the example images to demonstrate real FLUX.2 output.

---

## 5. Video — Reasoning & Trade-offs (4 min)

**Open the video tab. Play 30 seconds of the hook if time allows.**

**Key decisions:**

1. **FluxBot, not the CLI.** "The tutorial already covers the API-first developer path. The video needed to capture a different audience — people in Discord communities, creators who won't open a terminal. FluxBot gives them FLUX.2 with zero setup: type `/generate`, get an image."

2. **Show, don't explain.** "The script opens with a cold-open generation — you see the `/generate` command and a stunning result before I say a single word about what FLUX is. The first 50 seconds are pure demonstration. I'm borrowing from the Apple keynote playbook: show the thing working, *then* explain why it matters."

3. **Production-level planning.** "I didn't just record a screen share. I wrote a full script — 450+ lines with shot-by-shot voiceover, visual directions, and exact prompts. I built a recording guide for the booth and an editing guide for CapCut with track layouts and transition specs. I pre-generated all 22 images and built 7 video overlay graphics as HTML pages. This is a shoot-ready package."

4. **The cost moment.** "There's a specific beat in the video where I show: '47 images generating this video. Total cost: $1.41. Three cents per image.' That's the conversion moment. It reframes FLUX.2 from 'cool AI thing' to 'absurdly cheap production tool.'"

5. **The speed demo.** "I dedicate a segment to the klein model doing sub-second generation — 0.8 seconds with a timer overlay. Speed is a feature that *has* to be shown, not described."

**Trade-off:** "The video is 7 minutes, not 5. I could have cut the restyle segment to hit 5, but restyle is FluxBot's most visually impressive feature — the before/after pairs are the 'wow' moment. I kept it because retention through a great segment beats a shorter video that's less compelling."

**Bonus — FluxBot itself:** "The bot is a real, deployable Discord bot — not a mockup. Python, async, Railway-ready, two-tier API key system (server admins fund casual usage, power users bring their own key). It's open-source, MIT licensed, designed to seed FLUX usage in communities where BFL has no direct presence."

---

## 6. Strategy — The Bigger Picture (3 min)

**Open the strategy tab.**

**Key points to hit:**

1. **Primary metric: signup → first API call rate.** "If I had to pick one number to own, it's this. Not total sign-ups, not impressions. The activation rate. Target: 30%+ within the first week."

2. **Launch-day sequencing matters.** "Blog and credit grant go live at T-0. Video drops at T+2 hours to ride the discussion wave. Tutorial publishes at T+4 hours with a 48-hour challenge pinned to it. This isn't arbitrary — it's designed so each piece amplifies the one before it."

3. **Grants as activation mechanics — denominated in generations, not dollars.** "Every signup gets 10 pro-tier generations on the house, 25 with a promo code, +10 after the first successful generation. I deliberately talk in generations, not dollars. '$5 in credits' reads like a coupon. '25 pro generations' reads like a runway to build something. Same cost, better framing — and it tells the developer what they *get*, not what we're spending."

4. **Distribution beyond BFL.** "Partners get launch kits with per-partner promo codes. FluxBot is MIT-licensed for community distribution. The tutorial is designed to be cross-posted. The goal is to be on every surface where developers discover tools — not just BFL's own blog."

**Trade-off:** "I prioritized conversion mechanics over brand awareness tactics. I didn't spec a sizzle reel or an influencer campaign. Those are good — but they solve a problem BFL doesn't have. BFL can get attention. What it needs is to convert that attention into platform usage."

---

## 7. What I'd Do With More Time (1 min)

"Four things, in priority order:

1. **Interactive playground** on docs.bfl.ai — generate an image without creating an account. Lowest possible friction.
2. **Partner launch kits** — per-partner landing pages, promo codes, integration guides for Replicate, Fal, Together, Fireworks.
3. **Follow-up content pipeline** — style training guide, power-user patterns, community spotlights. Launch day gets attention; week 2-4 content sustains it.
4. **48-hour launch challenge** — the centerpiece of week-1 UGC. See below."

### The 48-hour launch challenge

"This is the piece I'd spend the most energy on if I had another week. Build anything with FLUX.2 in 48 hours, best consumer workflow wins.

- **Prize pool: up to 10 Mac minis.** I'm leaning into the Apple Silicon dev hype already on every timeline. Top challenge builds win a machine, plus a dedicated *'Run [klein] locally'* category judged on the best fully-offline workflow using the open weights. The marketing beat writes itself: FLUX.2 on your desk, no cloud, on a box the size of a hardcover. Reinforces that FLUX runs *everywhere* — managed API or your own silicon — and gives the open-weights community a concrete reason to show up to a BFL-run event.
- **Discord as the on-ramp, same mechanic.** Joining the BFL Discord and linking your dashboard account unlocks a bonus round of pro generations. Same 'tell them what they get, not what it costs' framing. And Discord becomes the channel where we post challenge updates, spotlight builds, and stay in the feedback loop with the people most likely to stick."

---

## 8. Close (1 min)

"To summarize: the problem isn't getting developers to hear about FLUX.2 — it's getting them to *use* it. Every piece I built is designed around that activation gap. The blog makes the case, the tutorial delivers a working result, the video reaches the audience that tutorials can't, and the strategy ties it all together with measurable conversion mechanics.

I also want to call out: everything works. The CLI tool, the Discord bot, the pipeline server, the web presentation — these all use real FLUX.2 API calls with real outputs. I think that matters for DevRel. If your content doesn't actually work, developers will find out in the first 5 minutes."

---

## Likely Q&A Topics — Prep Notes

### "Why did you choose YouTube thumbnails / a Discord bot?"
Thumbnails: immediately useful, visual, repeatable (3+ images per use = habit-forming). Discord bot: meets non-developers where they already are, zero-friction first generation, seeds community usage.

### "How would you measure success?"
Three metrics tracked weekly: (1) signup → first API call rate (target 30%+), (2) day-7 retention, (3) cost per activated user. Everything else is a vanity metric.

### "What about the open-source community?"
FluxBot is MIT-licensed. The tutorial and blog acknowledge ComfyUI, Replicate, Fal, and open weights explicitly. The strategy includes per-partner promo codes and community Discord engagement. But the real stickiness lever is **showing up** — a rotating DevRel on-call presence in r/StableDiffusion, r/MachineLearning, HN comments, X/Twitter replies, the GitHub issue tracker, and Discord. Triaging bugs in hours, not weeks. Replying to real builds. Every responsive thread is a retention event, and it's the cheapest moat we have against partners who can only offer generic support. BFL wins when the ecosystem grows — and developers stick with APIs maintained by humans who answer them.

### "Why didn't you do X?" (sizzle reel, influencer campaign, etc.)
BFL can get attention — the last launch proved that. The constraint is activation, not awareness. I'd do those things too, but they solve a problem that's already partially solved. Converting sign-ups is the bottleneck.

### "How would you handle the partner relationships?"
Per-partner promo codes for attribution. Day-1 launch coordination so partners publish simultaneously. Launch kits with pre-written integration guides. The key is making it easy for partners to participate — don't ask them to write content, give them the content.

### "What if the activation rate doesn't hit 30%?"
Diagnose where the drop-off happens. Is it signup → API key creation? API key → first call? First call → second call? Each stage has different fixes. If it's key creation, reduce friction (OAuth, GitHub login). If it's first call, the tutorial isn't good enough. If it's retention, the product needs to deliver more value in the first experience.

### "How does this scale beyond launch week?"
The tutorial and bot are evergreen — they work after launch day. The challenge creates user-generated content. The credit mechanics bring people back (referral credits, first-call bonus). The content pipeline I'd build in weeks 2-4 shifts from "what is FLUX.2" to "what can you build with it."

### "Why a full web app for the presentation?"
Two reasons: (1) I wanted BFL to see work that's ready to ship, not a Google Doc. The web app *is* the deliverable. (2) The author notes on each tab let me show strategic reasoning alongside the content — the "why" next to the "what."

### "Talk about a technical decision you're proud of."
The two-tier API key system in FluxBot. Server admins can set a shared key so anyone in the server can generate images — that seeds casual usage. Power users can set their own key for higher limits. Personal key always overrides server key. It solves the "who pays?" problem that kills most community bots.

### "What would you cut if you only had 3 days instead of 2 weeks?"
The pipeline server goes first — it's a bonus, not a deliverable. Then I'd simplify the thumbnail generator to fewer files. Blog, tutorial, and video are non-negotiable — that's the funnel. The bot is borderline, but it's the video's subject, so it stays.

### "How do you think about BFL's positioning vs. competitors?"
Be honest about the competitive landscape — developers respect that. FLUX.2's moat isn't any single feature, it's the combination: open weights + 4 model tiers + sub-second inference + one API contract. No competitor covers all of those. Frame it as "the only full-stack image generation platform" — from open-source hobbyist to enterprise API.
