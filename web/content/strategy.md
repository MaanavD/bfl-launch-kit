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
  <h1>Turning launch-day attention<br/>into lasting adoption</h1>
</header>

## The problem

The last FLUX launch drove tens of thousands of sign-ups day one - front page of HN, trending on Twitter/X, and all over reddit. Most of those users never made their first API call. High sign-ups, low activation.

This plan targets one primary metric: **signup → first API call rate.** The <strong>blog</strong> gets attention, the <strong>tutorial</strong> drives the first generation on a developer's machine, and the <strong>video</strong> activates the audience that won't clone a repo. Each piece covers a different stage of the funnel.

## Launch-day sequence

<ol class="launch-sequence">
  <li><strong>T-0: Blog + credit grant go live.</strong> HN, Twitter/X, r/MachineLearning, r/StableDiffusion. $5 base credits for all signups, $10 with a promo code. Influencers informed 1 week prior with credits and unique codes to publish simultaneously.</li>
  <li><strong>T+2h: Video drops.</strong> Rides the discussion wave. Short clips (style comparison, Klein speed demo, restyle) cut for standalone social posts throughout the day.</li>
  <li><strong>T+4h: Tutorial published.</strong> Where curious readers land once they're ready to build on the platform.</li>
</ol>

---

## Conversion mechanics

**$5 launch-week credits** for every new signup - no payment method required. $10 with a promo code, incentivizing signups through tracked channels. Limited time to create urgency.

**Per-channel promo codes** for attribution (e.g., `FIRE-FLUX`, `FLUXTUTORIAL`). One code per channel and partner so the growth team knows where we're converting.

**"First API call" bonus:** +$5 after a user's first successful generation. Rewards action over interest.

**Referral credits:** $5 per referred signup that makes a first (paid) API call. Turns evangelists into activations.

---

## Measuring success

Three numbers that matter, tracked weekly:

- **Signup → first API call rate.** The last launch had high signups but low activation. This is the metric that tells us if the tutorial and credit grant are working. Target: 30%+ (industry baseline for dev tools is ~20-35%).
- **Day-7 retention.** What percentage of users who make a first call are still generating a week later. If this is low, the onboarding works but the product isn't sticking - different problem, and we can cross that bridge when we get there.
- **Cost per activated user.** Total credit spend (grants + bonuses + referrals) divided by users who make at least one API call. Promo code attribution tells us which channels are cheapest. For future releases, we can pull underperformers, double down on what converts.

Secondary signals: promo code redemption by channel, GitHub stars/forks on FluxBot, partner-driven signups, social clip engagement. These inform tactics but don't define success.

---

## Given more time

- **"Try it now" playground** on docs.bfl.ai - one image, <strong>no account</strong>, powered by the credit grant. Email capture comes after the "wow" moment (like FLUX on HuggingFace)
- **48-hour launch challenge** - build with FLUX.2, win credits ($100 for top 10, $500 for first place). Best consumer workflow wins! Costs almost nothing and generates a wave of UGC.
- **Partner launch kits** - pre-written announcements, model cards, integration guides with per-partner promo codes (this will help us identify where we get the most traffic). Coordinated ecosystem launch.
- **Follow-up content** - Style training, multi-style workflows, power-user guides. The natural sequel once signups are flowing.

---

## Distribution beyond BFL

Most FLUX usage already runs through third-party providers or self-hosted weights, and we can't cut them off. The launch must meet developers where they are:

- **Partners** (Replicate, Fal, Together, Fireworks): day 1 launch with per-partner promo codes. Despite the main goal being 1P API usage, this is free reach multiplication.
- **Open source**: FluxBot repo (MIT), ComfyUI nodes, community Discord. Continue to frame FLUX as a community tool, not an enterprise focused product.
- **Social**: blog formatted for HN/Reddit, video for <YouTube search, clips for Twitter/X. Natively created for each platform, not cross-posts.
