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
  <li><strong>T-0: Blog + token grant go live.</strong> HN, Twitter/X, r/MachineLearning, r/StableDiffusion. Every signup lands with <strong>10 pro-tier generations</strong> on the house, <strong>25</strong> if they come in through a promo code. Influencers informed 1 week prior with codes and bonus token grants to publish simultaneously.</li>
  <li><strong>T+2h: Video drops.</strong> Rides the discussion wave. Short clips (style comparison, Klein speed demo, restyle) cut for standalone social posts throughout the day.</li>
  <li><strong>T+4h: Tutorial published.</strong> Where curious readers land once they're ready to build on the platform. We pin a <a href="#launch-challenge">48 hour challenge</a> to this, getting people building.</li>
</ol>

---

## Conversion mechanics

We denominate launch grants in **pro-tier generations**, not dollars. "Here's $5" reads like a coupon; "here's 25 pro generations" reads like a runway to build something. Same cost to us, better framing for the developer deciding whether to try FLUX.2 tonight or next month - and a cleaner story as per-model pricing evolves.

**10 pro generations on signup** — no payment method required. **25 with a promo code** through tracked channels. Scarcity framing: the grant is tied to launch week.

**Per-channel promo codes** for attribution (e.g., `FIRE-FLUX` (Fireship), `FLUX-T3` (Theo), `FLUX-PRIME` (ThePrimeagen)). One code per channel and partner so the growth team knows where we're converting.

**"First API call" bonus:** +10 pro generations after a successful first generation. Rewards action, not only interest.

**Referral grants:** +10 pro generations per referred signup that makes a first (paid) API call. Turns evangelists into activation on our APIs - this would be mostly unique to our platform.

---

## Measuring success

Three numbers that matter, tracked weekly:

- **Signup → first API call rate.** The last launch had high signups but low activation. This is the metric that tells us if the tutorial and credit grant are working. Target: 30%+ (industry baseline for dev tools is ~20-35%).
- **Day-7 retention.** What percentage of users who make a first call are still generating a week later. If this is low, the onboarding works but the product isn't sticking - different problem, and we can cross that bridge when we get there.
- **Cost per activated user.** Total credit spend (grants + bonuses + referrals) divided by users who make at least one API call. Promo code attribution tells us which channels are cheapest. For future releases, we can pull underperformers, double down on what converts.

Secondary signals: promo code redemption by channel, GitHub stars/forks on FluxBot, partner-driven signups, social clip engagement. These inform tactics but don't define success.

---

## Given more time

- **Sizzle reel** — a 60-90 second hype cut of FLUX.2's best outputs, set to music, designed for Twitter/X and Instagram Reels. No narration, no tutorial structure — pure visual flex. This is the piece that gets non-developers sharing. The assets are already generated; it's a post-production day.
- **"Try it now" playground** on docs.bfl.ai - one image, <strong>no account</strong>, powered by the grant. Email capture comes after the "wow" moment (like FLUX on HuggingFace)
- **Partner launch kits** - pre-written announcements, model cards, integration guides with per-partner promo codes (this will help us identify where we get the most traffic). Coordinated ecosystem launch.
- **Follow-up content** - Style training, multi-style workflows, power-user guides. The natural sequel once signups are flowing.

<span id="launch-challenge"></span>

### 48-hour launch challenge

Build anything with FLUX.2 in 48 hours. Best consumer workflow wins. Costs almost nothing, generates a wave of UGC, and seeds the builder stories that feed week-2 follow-up content.

- **Prize pool: up to 10 Mac minis.** Leaning directly into the Apple Silicon dev hype already on every timeline. Top challenge builds each win a machine, and we carve out a dedicated *"Run [klein] locally"* category judged on the best fully-local workflow using the open weights. The marketing beat writes itself: FLUX.2 on your desk, entirely offline, on a box the size of a hardcover book. It reinforces that FLUX runs *everywhere* - managed API or your own silicon - and gives open-source community members a tangible reason to show up to a BFL-run event.
- **Discord on-ramp, same mechanic.** Joining the BFL Discord and linking your dashboard account unlocks a bonus round of pro generations - same "tell them what they get, not what it costs" framing. It doubles as the channel where we post challenge updates, spotlight builds, and keep the feedback loop tight with the people most likely to stick.

---

## Distribution beyond BFL

Most FLUX usage already runs through third-party providers or self-hosted weights, and we can't cut them off. The launch must meet developers where they are:

- **Partners** (Replicate, Fal, Together, Fireworks): day 1 launch with per-partner promo codes. Despite the main goal being 1P API usage, this is free reach multiplication.
- **Open source**: FluxBot repo (MIT), ComfyUI nodes, community Discord. Continue framing FLUX as a community tool, not an enterprise-focused product. **Stickiness comes from showing up.** A rotating on-call DevRel presence - triaging GitHub issues in hours not weeks, replying in r/StableDiffusion and r/MachineLearning threads, jumping into HN comment sections, answering X/Twitter replies, and staying active in Discord - turns one-off API users into people who pick BFL *because* someone answered them last time. Every responsive thread is a retention event, and it's the cheapest moat we have against partners who can only offer generic support.
- **Social**: blog formatted for HN/Reddit, video for <YouTube search, clips for Twitter/X. Natively created for each platform, not cross-posts.
