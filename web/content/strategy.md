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

## Launch-day sequence

<ol class="launch-sequence">
  <li><strong>T-0: Blog + credit grant go live.</strong> HN, Twitter/X, r/MachineLearning, r/StableDiffusion. $5 base credits for all signups, $10 with a promo code. Influencers seeded 48h prior with credits and unique codes publish simultaneously.</li>
  <li><strong>T+2h: Video drops.</strong> Rides the discussion wave. Short clips (style comparison, Klein speed demo, restyle) cut for standalone social posts throughout the day.</li>
  <li><strong>T+4h: Tutorial published.</strong> Where curious readers land once they're ready to build.</li>
</ol>

---

## Conversion mechanics

**$5 launch-week credits** for every new signup — no payment method required. $10 with a promo code, incentivizing signups through tracked channels. Time-boxed to create urgency.

**Per-channel promo codes** for attribution (e.g., `FLUXVIDEO`, `REPLICATE-FLUX`). One code per channel and partner so the growth team knows what's actually converting.

**"First API call" bonus:** +$2 after a user's first successful generation. Rewards action, not just signup.

**Referral credits:** $2 per referred signup that makes a first API call. Turns power users into a distribution channel.

---

## Distribution beyond BFL

Most FLUX usage already runs through third-party providers or self-hosted weights. The launch must meet developers where they are:

- **Partners** (Replicate, Fal, Together, Fireworks): synchronized launch with per-partner promo codes. Free reach multiplication.
- **Open source**: FluxBot repo (MIT), ComfyUI nodes, community Discord. Frame FLUX as a community tool, not a corporate product.
- **Social**: blog formatted for HN/Reddit, video for YouTube search, clips for Twitter/X. Native on each platform, not cross-posts.

---

## With more time

- **"Try it now" playground** on docs.bfl.ml — one image, no account, powered by the credit grant. Email capture comes after the "wow" moment.
- **48-hour launch challenge** — build with FLUX.2, win credits ($10 for top 10, $50 for first place). Costs almost nothing; generates a wave of UGC.
- **Partner launch kits** — pre-written announcements, model cards, integration guides with per-partner promo codes. Coordinated ecosystem launch.
- **Follow-up content** — LoRA training, multi-style workflows, power-user guides. The natural sequel once signups are flowing.
