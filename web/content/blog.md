<!--
EDITING CONVENTIONS
- Plain markdown (headings, paragraphs, bold, inline code, fenced code blocks, lists) is parsed and styled automatically.
- Raw HTML blocks are used for layout elements that need specific CSS classes. Preserve them as-is unless you're intentionally restructuring.
- Key HTML patterns:
    <header class="article-header">  - page title block (label + h1 + lead paragraph)
    <p class="callout">              - highlighted callout box (centered, bordered surface)
    <div class="info-table"><table>  - styled data table
    <div class="cta-block">          - centered CTA button
- Inline code uses backticks. Code blocks use triple backticks with optional language tag.
-->

<header class="article-header">
  <p class="article-label">Launch Blog Post</p>
  <h1>FLUX.2 Is Here.<br/>Consistency Without the Infrastructure.</h1>
</header>

<p class="article-lead">Every image model can make a gorgeous one-off. That's table stakes. The hard part has always been the next step: making <em>the same character</em> look right across 50 frames, or keeping a product's exact silhouette consistent across a catalog of lifestyle shots, or rendering text that doesn't look like it was written by a toddler.</p>

Until now, solving that meant building a whole second stack. Train a LoRA. Rent GPUs. Babysit a ComfyUI pipeline. Pray nothing breaks when the base model updates.

FLUX.2 makes most of that unnecessary.

<p class="callout"><strong>FLUX.2 is live on the BFL API.</strong></p>

The architecture handles visual consistency, legible typography, and precise color control natively — no fine-tuning required. Teams that were spending weeks maintaining custom LoRA pipelines can now get equivalent consistency from a single API call with reference images attached.

---

## What You Actually Get: FLUX.2 vs. the Field

Single-image quality is close across the top models now. The real question is what else you get: can the model keep a character consistent, render readable text, run on your own hardware? Here's the full picture.

<div style="margin: 2rem 0; border: 1px solid var(--border); border-radius: 8px; overflow: hidden">
  <table style="width: 100%; border-collapse: collapse; font-size: 0.8125rem">
    <thead>
      <tr style="background: var(--surface-raised, #f0ede6)">
        <th style="padding: 0.75rem 1rem; text-align: left; font-weight: 600; border-bottom: 1px solid var(--border); width: 40%"></th>
        <th style="padding: 0.75rem 0.5rem; text-align: center; font-weight: 700; border-bottom: 1px solid var(--border); color: var(--accent); width: 20%">FLUX.2</th>
        <th style="padding: 0.75rem 0.5rem; text-align: center; font-weight: 600; border-bottom: 1px solid var(--border); color: var(--text-secondary); width: 20%">GPT Image</th>
        <th style="padding: 0.75rem 0.5rem; text-align: center; font-weight: 600; border-bottom: 1px solid var(--border); color: var(--text-secondary); width: 20%">Nano Banana</th>
      </tr>
    </thead>
    <tbody>
      <tr style="background: oklch(75% 0.1 155 / 0.04)">
        <td style="padding: 0.625rem 1rem; border-bottom: 1px solid var(--border)"><strong>Multi-reference consistency</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">Same character across scenes</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅ <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600">up to 10 refs</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
      </tr>
      <tr>
        <td style="padding: 0.625rem 1rem; border-bottom: 1px solid var(--border)"><strong>Text rendering</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">Readable multilingual typography</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 0.75rem; color: var(--text-secondary)">Partial</td>
      </tr>
      <tr style="background: oklch(75% 0.1 155 / 0.04)">
        <td style="padding: 0.625rem 1rem; border-bottom: 1px solid var(--border)"><strong>Hex color precision</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">Exact brand colors, not approximations</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
      </tr>
      <tr>
        <td style="padding: 0.625rem 1rem; border-bottom: 1px solid var(--border)"><strong>Open weights</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">Self-host, fine-tune, own your stack</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅ <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600">Apache 2.0</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
      </tr>
      <tr style="background: oklch(75% 0.1 155 / 0.04)">
        <td style="padding: 0.625rem 1rem; border-bottom: 1px solid var(--border)"><strong>Multiple model tiers</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">Pick speed vs. quality per request</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅ <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600">4 tiers</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 0.75rem; color: var(--text-secondary)">2 tiers</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
      </tr>
      <tr>
        <td style="padding: 0.625rem 1rem; border-bottom: 1px solid var(--border)"><strong>Sub-second generation</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">Real-time, interactive use cases</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem">✅ <span style="font-size: 0.75rem; color: var(--accent); font-weight: 600">[klein]</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; border-bottom: 1px solid var(--border); font-size: 1.125rem; opacity: 0.4">✗</td>
      </tr>
      <tr style="background: oklch(75% 0.1 155 / 0.04)">
        <td style="padding: 0.625rem 1rem"><strong>Runs on consumer GPUs</strong><br/><span style="font-size: 0.75rem; color: var(--text-secondary)">RTX 3090/4070 (13GB VRAM)</span></td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; font-size: 1.125rem">✅</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; font-size: 1.125rem; opacity: 0.4">✗</td>
        <td style="padding: 0.625rem 0.5rem; text-align: center; font-size: 1.125rem; opacity: 0.4">✗</td>
      </tr>
    </tbody>
  </table>
</div>

<p style="font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.5rem">Capability data from official model documentation.</p>

Image quality across the top models is competitive — they all produce great outputs. The difference is what you can do beyond a single generation. Consistent characters across a series, precise brand colors, self-hosting, real-time speed — FLUX.2 is the only model that does all of it.

---

## Multi-Reference Control (a.k.a. "Why You Might Not Need That LoRA")

Previous models had no memory. Generate a character once, and the model forgot them immediately. The only workaround was fine-tuning — training custom weights so the model learned a specific face, product, or style. That worked, but it came with real costs: GPU hours, training data curation, cold starts, and a model that drifted every time the base weights updated.

FLUX.2 takes a different approach. Pass **up to 10 reference images** alongside your prompt, and the model locks in identity, spatial layout, and design language on the fly. No training. No custom weights. No waiting.

Want a consistent character across a comic strip? Attach the face reference. Need your sneaker design in 20 different scenes? Attach the product shot. The model holds it.

That doesn't mean LoRAs are dead — they're still the right tool for deeply specialized aesthetics or styles that go beyond what reference images can capture. But for the consistency problems that drove most teams to fine-tune in the first place? Reference images handle it now, at zero training cost and zero cold-start delay.

### See it yourself: the comic strip test

The best way to test character consistency is the simplest: give three different models the same character reference and ask for three comic panels. Same person, different scenes. Here are the prompts — try them on FLUX.2 (with a reference image attached), GPT Image 1.5, and Nano Banana and compare the results:

**Panel 1:** "A woman with short red hair and round glasses sits at a messy desk covered in coffee cups, coding on a laptop. Overhead fluorescent lighting, office setting, graphic novel style."

**Panel 2:** "The same woman with short red hair and round glasses stands in a rainy street at night, holding an umbrella, neon signs reflecting in puddles. Graphic novel style."

**Panel 3:** "The same woman with short red hair and round glasses sits in a sunlit cafe booth, laughing while holding a phone. Warm morning light, graphic novel style."

With FLUX.2, you attach the character reference once and the face, glasses, and hair stay locked across all three panels. With models that don't support reference images, you're relying on prompt description alone — and the character drifts. The glasses change shape, the hair shifts color, the face becomes a different person. Run it and see.

---

## Text That Reads and Colors That Match

Two pain points that have haunted every image model since DALL-E:

**Typography.** Ask most models to put text in an image and you'll get something between "almost readable" and "alien alphabet." FLUX.2 renders multilingual text cleanly — multi-line layouts, varied font weights, even UI mockups. Infographics, brand logos, event posters with actual words on them. It works.

**Color precision.** Telling a model you want "brand red" and getting back six different shades isn't useful when a design system demands `#FF6B35`. FLUX.2 accepts hex codes directly and integrates them into lighting, materials, and reflections. The color you specify is the color you get.

For teams doing brand work, e-commerce photography, or UI prototyping, these two features alone save hours of post-processing per batch.

---

## Four Models, One API

FLUX.2 ships as four tiers. Same API, same endpoints — just pick the model that fits the job.

<div class="info-table">
  <table>
    <thead>
      <tr>
        <th>Model</th>
        <th>Scale</th>
        <th>Best For</th>
        <th>Pricing</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>FLUX.2 [max]</strong></td>
        <td>32B</td>
        <td>When you need the absolute best output — hero images, high-res product shots, anything client-facing where quality is non-negotiable.</td>
        <td>$0.08/MP</td>
      </tr>
      <tr>
        <td><strong>FLUX.2 [pro]</strong></td>
        <td>Optimized</td>
        <td>The workhorse. Production-grade quality at speeds and costs that make batch workflows practical.</td>
        <td>$0.03/MP</td>
      </tr>
      <tr>
        <td><strong>FLUX.2 [flex]</strong></td>
        <td>Adjustable</td>
        <td>Typography-heavy work, UI mockups, and cases where you want fine control over inference (up to 50 steps).</td>
        <td>$0.05/MP</td>
      </tr>
      <tr>
        <td><strong>FLUX.2 [klein]</strong></td>
        <td>4B &amp; 9B</td>
        <td>Sub-second generation. Real-time apps, interactive tools, rapid prototyping. Handles both generation and editing.</td>
        <td>From $0.014/MP</td>
      </tr>
    </tbody>
  </table>
</div>

Quick math: generating 47 images for a video project on Pro costs $1.41. Three cents each. A single Shutterstock download starts at $4.

---

## Get Started

The fastest path from "interested" to "generating images" is about 5 minutes:

1. Create an account at [dashboard.bfl.ai](https://dashboard.bfl.ai) and grab an API key.
2. Pick a starting point:
   - **Want something running now?** Clone the [thumbnail generator tutorial](https://github.com/MaanavD/bfl-launch-kit/tree/main/thumbnail-generator) — three AI-generated YouTube thumbnails from a single CLI command.
   - **Have a Discord server?** Deploy [FluxBot](https://github.com/MaanavD/bfl-launch-kit/tree/main/bot) — an open-source bot that puts FLUX.2 directly in your chat. Text-to-image, restyle, personal style presets. Zero to first image in under 60 seconds.
3. Build from there. The API is simple: POST a prompt, poll for the result, download the image. One endpoint handles text-to-image and image editing.

New accounts get free compute credits. No credit card required to start.

<div class="cta-block">
  <a href="https://dashboard.bfl.ai" target="_blank" rel="noopener noreferrer" class="btn-primary">
    Create an Account &amp; Get Your API Key →
  </a>
</div>
