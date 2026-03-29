<!--
EDITING CONVENTIONS
- Plain markdown (headings, paragraphs, bold, inline code, fenced code blocks, lists) is parsed and styled automatically.
- Raw HTML blocks are used for layout elements that need specific CSS classes. Preserve them as-is unless you're intentionally restructuring.
- Key HTML patterns:
    <header class="article-header">       - page title block (label + h1)
    <div class="strategy-grid">           - card grid for the three deliverables
    <div class="strategy-card">           - individual card; h3 = title, p.strategy-channel = channel tag
    <ol class="launch-sequence">          - timeline list with accent left-border styling
- Inline code uses backticks.
-->

<header class="article-header">
  <p class="article-label">Launch Strategy</p>
  <h1>How these pieces fit<br/>into launch week</h1>
</header>

## The three deliverables

Each piece targets a different moment in how a developer goes from "I've heard of this" to "I'm building with it."

<div class="strategy-grid">
  <div class="strategy-card">
    <h3>Blog Post</h3>
    <p class="strategy-channel">Hacker News · Dev Twitter · Subreddits</p>
    <p><strong>Job:</strong> get attention. Written for developers who track AI news but haven't picked a provider yet. The angle — "you probably don't need that LoRA pipeline anymore" — targets a real frustration (the infrastructure tax of fine-tuning for consistency) and positions FLUX.2 as the simpler path. The pricing table and CTA are there to convert skimmers into signups in a single read.</p>
  </div>
  <div class="strategy-card">
    <h3>Written Tutorial</h3>
    <p class="strategy-channel">docs.bfl.ml · Dev blog · GitHub README</p>
    <p><strong>Job:</strong> first API call. This is what prevents the "signed up but never made a request" drop-off from the last launch. Deliberately narrow scope: one endpoint, one tool, one tangible result in under 15 minutes. The thumbnail generator is a real project — not a hello-world — so the reader walks away with something they'd actually run again.</p>
  </div>
  <div class="strategy-card">
    <h3>Video Tutorial</h3>
    <p class="strategy-channel">YouTube · Discord · Social clips</p>
    <p><strong>Job:</strong> show, don't tell. For the much larger audience that won't read a blog post or clone a repo. Watching someone type a prompt and get a great image back in 5 seconds is more convincing than any written argument. The FluxBot demo also seeds the open-source ecosystem — viewers fork the bot, deploy it in their servers, and become ongoing API consumers.</p>
  </div>
</div>

---

## Launch-day sequence

<ol class="launch-sequence">
  <li><strong>T-0: Blog post goes live.</strong> Submitted to Hacker News, posted on Twitter/X with sample images, cross-posted to r/MachineLearning, r/StableDiffusion, r/LocalLLaMA.</li>
  <li><strong>T+2h: Video drops on YouTube.</strong> Timed to ride the initial wave of discussion. Cross-linked from the blog post CTA, Discord announcements, and social channels.</li>
  <li><strong>T+4h: Tutorial published to docs.</strong> Linked from both the blog and video descriptions. This is where curious readers land once they're ready to try it.</li>
  <li><strong>Throughout day one:</strong> Short clips cut from the video (the style comparison, the 0.8s Klein demo, the restyle transformation) posted as standalone content on Twitter/X, LinkedIn, and Discord. These are designed to work on their own — no context needed.</li>
</ol>

---

## What I'd build with more time

- **"Try it now" widget on docs.bfl.ml**: A browser-based playground that lets visitors generate one image without creating an account. Remove every possible step between curiosity and that first "wow" moment. Email capture comes after, not before.
- **Partner launch kits**: Pre-written announcements, model cards, and integration guides for Replicate, Fal, Together, and Fireworks — ready to go so every provider publishes simultaneously. A coordinated ecosystem launch, not just a BFL press release.
- **48-hour launch challenge**: "Build something with FLUX.2, post it, win API credits." Announced in the video and blog. Creates a burst of user-generated content that extends reach beyond anything BFL publishes directly.
- **Living changelog**: Not just a launch post, but an ongoing page that captures each model improvement, endpoint update, or feature drop. Gives developers a reason to come back and bookmark.
- **Follow-up video for power users**: LoRA training with FLUX.2 [klein], multi-style workflows, advanced prompting. The natural sequel once the first video has driven initial signups.

---

## Beyond BFL's own channels

The biggest risk with a model launch is treating it as a single-channel announcement. Most FLUX usage already happens through third-party providers or self-hosted open weights. The launch content needs to meet developers where they already are:

- **Partner providers** should have updated model cards and working integration examples live on launch day. A synchronized announcement across Replicate, Fal, and others multiplies reach without BFL spending extra distribution effort. This is free leverage.
- **Open-source community** gets served through the FluxBot repo (MIT licensed, designed to be forked), ComfyUI nodes, and community Discord channels. The video's community montage is intentional — it frames FLUX as a community tool, not just a corporate product.
- **Developer hangouts**: The blog post is formatted for HN and Reddit. The video is optimized for YouTube search. The social clips are cut to work on Twitter/X without context. Each piece should perform natively on its platform, not feel like a cross-post.
- **Influencer seeding**: Get the model into the hands of AI art creators, dev YouTubers, and creative tool reviewers 48 hours before launch. Their coverage on day one creates the third-party validation that no amount of first-party content can replicate.

---

## Future video ideas

These came up during production and make natural follow-ups if the initial content performs:

- **Named style presets per user**: `/savestyle name:cyberpunk style:...`, `/usestyle cyberpunk`, `/liststyles`
- **Style sharing across servers**: export/import so good styles spread
- **LoRA training walkthrough**: FLUX.2 [klein] fine-tuning for truly custom aesthetics (local, open weights, Apache 2.0)
- Positioning: "FluxBot for Power Users" or "Training Your Own AI Art Style"

**Why these are separate videos:** LoRA training is local-only (not available via the BFL API), so it breaks the "zero friction, runs in Discord" story from the first video. Multi-style management adds complexity that undercuts the first video's strongest beat — the simplicity of one `/setstyle` command. Better as standalone content where that complexity is expected.
