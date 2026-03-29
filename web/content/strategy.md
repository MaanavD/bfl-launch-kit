<!--
EDITING CONVENTIONS
- Plain markdown (headings, paragraphs, bold, inline code, fenced code blocks, lists) is parsed and styled automatically.
- Raw HTML blocks are used for layout elements that need specific CSS classes. Preserve them as-is unless you're intentionally restructuring.
- Key HTML patterns:
    <header class="article-header">       — page title block (label + h1)
    <div class="strategy-grid">           — card grid for the three deliverables
    <div class="strategy-card">           — individual card; h3 = title, p.strategy-channel = channel tag
    <ol class="launch-sequence">          — timeline list with accent left-border styling
- Inline code uses backticks.
-->

<header class="article-header">
  <p class="article-label">Launch Strategy</p>
  <h1>How these pieces fit<br/>into launch week</h1>
</header>

## The three deliverables

Each artifact in this case study targets a different moment in a developer's adoption journey, and reaches them through a different channel.

<div class="strategy-grid">
  <div class="strategy-card">
    <h3>Blog Post</h3>
    <p class="strategy-channel">Hacker News · Dev Twitter · Subreddits</p>
    <p><strong>Job:</strong> stop the scroll. The blog post is the top-of-funnel announcement. It's written for developers who follow AI news but haven't committed to a specific provider. The framing — "kill your LoRA pipeline" — targets a real pain point (infrastructure debt from fine-tuning) and positions FLUX.2 as the API that makes that entire layer obsolete. The pricing table and CTA are designed to convert scanners into signups within one read.</p>
  </div>
  <div class="strategy-card">
    <h3>Written Tutorial</h3>
    <p class="strategy-channel">docs.bfl.ml · Dev blog · GitHub README</p>
    <p><strong>Job:</strong> first API call. The tutorial converts signup into usage. It's the artifact that prevents the "signed up but never made an API call" drop-off that plagued the last launch. The scope is deliberately narrow — one endpoint, one tool, one result in under 15 minutes. The thumbnail generator is a real use case, not a hello-world, so the reader walks away with something they'd actually use again.</p>
  </div>
  <div class="strategy-card">
    <h3>Video Tutorial</h3>
    <p class="strategy-channel">YouTube · Discord · Social clips</p>
    <p><strong>Job:</strong> show, don't tell. The video is for the larger audience that won't read a blog post or clone a repo. The FluxBot demo shows FLUX.2's quality in the most visceral way possible — typing a prompt and seeing the result appear live. It proves the API works, the outputs are good, and the integration is simple. The video also seeds the open-source ecosystem: viewers fork the bot, deploy it, and become ongoing API consumers.</p>
  </div>
</div>

---

## Launch-day sequencing

<ol class="launch-sequence">
  <li><strong>T-0: Blog post goes live.</strong> Submitted to Hacker News, shared on Twitter/X with image samples, cross-posted to relevant subreddits (r/MachineLearning, r/StableDiffusion, r/LocalLLaMA).</li>
  <li><strong>T+2h: Video drops on YouTube.</strong> Timed so the blog post has already generated initial discussion. Video is cross-promoted in the blog post CTA, Discord announcement channel, and social media.</li>
  <li><strong>T+4h: Tutorial published to docs.</strong> Linked from both blog and video descriptions. This is where engaged readers land after the announcement catches their attention.</li>
  <li><strong>Throughout day one:</strong> Social clips cut from the video (the style comparison, the 0.8s Klein demo, the restyle transformation) posted as standalone content on Twitter/X, LinkedIn, and Discord communities.</li>
</ol>

---

## What I'd want ready with more time

- **Interactive playground on docs.bfl.ml** — a browser-based "try it now" widget that lets a visitor generate one image without signing up. Frictionless first touch. Converts curiosity into a "wow" moment before asking for an email.
- **Partner launch kits** — pre-written announcement posts, model cards, and integration guides for Replicate, Fal, Together, and Fireworks so every provider publishes simultaneously. Coordinated ecosystem launch, not just a BFL announcement.
- **Community challenge** — a 48-hour launch challenge ("Build something with FLUX.2, share it, win credits") announced in the video and blog post. Creates user-generated content that extends the launch surface area beyond our own channels.
- **Changelog-style blog for ongoing updates** — not just a launch post but a living page that captures each model improvement, new endpoint, or feature drop. Gives developers a reason to come back.
- **Second video: power-user deep dive** — LoRA training with FLUX.2 [klein], multi-style management, advanced prompting techniques. Natural sequel once the first video drives initial adoption.

---

## Beyond BFL's own channels

The biggest mistake in a model launch is treating it as a single-channel event. FLUX.2 usage is distributed: most consumers run through third-party providers or self-hosted open weights. The launch content needs to meet developers where they already are:

- **Partner providers** should have updated model cards and integration examples live on launch day. A synchronized announcement across Replicate, Fal, and others multiplies reach without BFL spending additional distribution effort.
- **Open-source community** gets attention through the FluxBot repo (permissively licensed, designed to fork), ComfyUI nodes, and community Discord channels. The video's "community montage" beat is designed to show FLUX as a community tool, not just a corporate API.
- **Developer watering holes** — the blog post is formatted for HN and Reddit, the video is optimized for YouTube discovery (title/thumbnail strategy documented in the script), and social clips are cut for Twitter/X virality.
- **Influencer seeding** — reach out to AI art creators, developer YouTubers, and creative tool reviewers 48 hours before launch with early access and pre-generated assets. Their coverage on launch day creates third-party validation.

---

## Future video ideas

Captured during the video production process — natural follow-ups if the initial content performs well:

- **Multiple named style presets per user** — `/savestyle name:cyberpunk style:...`, `/usestyle cyberpunk`, `/liststyles`
- **Style sharing between users** — export/import styles across servers
- **LoRA training deep dive** — guide users through FLUX.2 [klein] fine-tuning for truly custom styles (local, open weights, Apache 2.0)
- Positioning: "FluxBot for Power Users" or "Training Your Own AI Art Style"

**Why defer these:** LoRA training is local-only (not supported via BFL API), so it doesn't fit the "zero friction, runs in Discord" narrative of the first video. Adding multi-style management complicates the script's strongest beat: the simplicity of one `/setstyle` command. Better as standalone content where complexity is expected and welcomed.
