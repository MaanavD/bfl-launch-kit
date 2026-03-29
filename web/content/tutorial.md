<!--
EDITING CONVENTIONS
- Plain markdown (headings, paragraphs, bold, inline code, fenced code blocks, lists) is parsed and styled automatically.
- Raw HTML blocks are used for layout elements that need specific CSS classes. Preserve them as-is unless you're intentionally restructuring.
- Key HTML patterns:
    <header class="article-header">  — page title block (label + h1 + lead paragraph)
    <figure class="article-figure">  — images, single or wide (add article-figure--wide for full-bleed)
    <div class="thumbnail-grid">     — 3-column image grid for thumbnail comparisons
    <div class="info-table"><table>  — styled data table
    <div class="cta-block">          — centered CTA button
- Inline code uses backticks. Code blocks use triple backticks with optional language tag.
- All image paths are relative to /public (e.g. /tutorial/cli-cinematic.jpg).
-->

<header class="article-header">
  <p class="article-label">Written Tutorial</p>
  <h1>Build AI YouTube Thumbnails<br/>with FLUX.2 in Under 15 Minutes</h1>
  <p class="article-lead">Turn a manual thumbnail workflow into a single CLI command using the BFL API.</p>
</header>

<figure class="article-figure article-figure--wide">
  <img src="/tutorial/cli-comparison.jpg" alt="Generated comparison grid showing three thumbnail directions" loading="lazy" />
</figure>

Most thumbnail workflows are still slow: collect references, open a design tool, make a few variants, export them, compare them, and repeat for every video.

This tutorial replaces that with a small Node.js project that takes a real video description and generates three thumbnail directions in seconds.

## What You'll Build

A CLI tool (`thumbnail-generator/`) that turns a description into 3 thumbnails. It teaches the BFL FLUX.2 API, async polling, prompt templating, and image compositing with sharp.

---

## Who This Is For

Developers who are already comfortable with Node.js and API-based workflows.

**Prerequisites:**

- Node.js 20+
- A BFL API key ([dashboard.bfl.ai](https://dashboard.bfl.ai/) — $10 in credits is plenty)

---

## The Architecture

At its core, this is a small Node.js pipeline: take a description, wrap it in three style templates, send those prompts to FLUX.2, then save both individual outputs and a comparison grid. If you pass a headshot, FLUX.2's multi-reference editing can keep the subject consistent across all variants.

```
                                     +----------------------------+
+----------------+    +-----------+  |   BFL FLUX.2 API           |
| CLI Input      |    | Prompt    |  |   flux-2-klein-4b          |
|                |--->| Builder   |->|                            |
| description    |    |           |  |   3 concurrent requests    |
| + [headshot]   |    | 3 style   |  |   (+ face if provided)     |
+----------------+    | templates |  +-----------+----------------+
                      +-----------+              |
                                    +------------v---------------+
                                    |   sharp (compositing)      |
                                    |   3 individual JPGs        |
                                    |   + comparison grid        |
                                    +------------+---------------+
                                                 |
                                    +------------v---------------+
                                    |   HTML Viewer (local file) |
                                    |   Compare all 3 - Copy     |
                                    +----------------------------+
```

### Why No LLM for Prompts?

1. **The source material is already good.** A real description of the video is stronger input than a title-only prompt expansion.
2. **Templates are predictable.** The same input always produces the same three style directions.
3. **The system stays simpler.** One fewer dependency, one fewer bill, one fewer failure point.

### Why FLUX.2?

YouTube thumbnails need prompt adherence more than raw image quality. FLUX.2 is what makes this viable: it follows composition instructions well enough that style templates become useful instead of aspirational. The `flux-2-klein-4b` endpoint is also fast enough and cheap enough to generate three options per run without friction.

### Cost Per Run

<div class="info-table">
  <table>
    <thead>
      <tr><th>Component</th><th>Cost</th></tr>
    </thead>
    <tbody>
      <tr><td>FLUX.2 × 3 images (1344×768)</td><td>~$0.04</td></tr>
      <tr><td><strong>Total per run</strong></td><td><strong>~$0.04</strong></td></tr>
    </tbody>
  </table>
</div>

Three thumbnail concepts for roughly four cents.

---

## Let's Build It

### Step 1: Clone and Configure

```bash
git clone https://github.com/MaanavD/bfl-thumbnail-generator.git
cd bfl-thumbnail-generator/thumbnail-generator
npm install
```

Create a `.env` file:

```
BFL_API_KEY=your_bfl_api_key_here
```

> **Get your BFL API key:** Go to [dashboard.bfl.ai](https://dashboard.bfl.ai/), create an account, add credits ($5 minimum), navigate to API → Keys, and create a key. You only see the full key once — copy it immediately.

### Step 2: The Prompt Builder — No LLM Required

Instead of calling an LLM, we use style templates that wrap your description. Here's the core of `src/promptGenerator.js`:

```js
const STYLE_TEMPLATES = [
  {
    name: "Cinematic",
    wrap: (desc, hasFace) =>
      `A photorealistic, cinematic YouTube thumbnail with dramatic lighting
       and shallow depth of field. ${hasFace ? "The person from the reference
       image is the main subject, " : ""}The scene depicts: ${desc}. Shot on
       35mm film, rich color grading, high contrast, bold composition optimized
       for small-size readability.`,
  },
  // ... Graphic and Abstract templates follow the same pattern
];

export function buildPrompts(description, hasFace = false) {
  return STYLE_TEMPLATES.map((style) => style.wrap(description, hasFace));
}
```

Each template targets a distinct visual style — Cinematic, Graphic, Abstract — and when a face reference is provided, the templates instruct FLUX.2 to feature "the person from the reference image" as the subject. You write the description. The templates handle the visual direction. FLUX.2 handles the rest.

### Step 3: Hitting the FLUX.2 Endpoint

```js
const FLUX_ENDPOINT = "https://api.bfl.ai/v1/flux-2-klein-4b";

const payload = {
  prompt,
  width: 1344,
  height: 768,
};

// If a face reference is provided, use multi-reference editing
if (faceBase64) {
  payload.input_image = faceBase64;
}

const response = await fetch(FLUX_ENDPOINT, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-key": BFL_API_KEY,
  },
  body: JSON.stringify(payload),
});

const { polling_url } = await response.json();
```

The *same endpoint* handles both text-to-image and multi-reference editing. When `input_image` is present, FLUX.2 activates character consistency automatically. No endpoint switching, no separate API calls.

### Step 4: The Polling Pattern

```js
for (let poll = 0; poll < MAX_POLLS; poll++) {
  await sleep(1000);

  const pollResponse = await fetch(polling_url, {
    headers: { "x-key": BFL_API_KEY },
  });
  const result = await pollResponse.json();

  if (result.status === "Ready") {
    const image = await fetch(result.result.sample);
    return Buffer.from(await image.arrayBuffer());
  }
}
```

We run all 3 generations concurrently with `Promise.all`, so the total wait is the time for the *slowest* image — not three sequential waits.

### Step 5: Run It

**Basic — text-to-image from a description:**

```bash
node src/index.js "A deep dive into building SaaS products in 2025. We cover the full stack — React frontend, serverless backend on AWS, Stripe billing integration, and why most indie hackers fail at distribution not engineering."
```

**With a face — put yourself in the thumbnails:**

```bash
node src/index.js "A deep dive into building SaaS products in 2025" --face headshot.jpg
```

<figure class="article-figure" style="margin: 2rem 0">
  <img
    src="/tutorial/headshot.jpg"
    alt="Example headshot used as a face reference for character consistency"
    style="max-width: 280px; border-radius: 6px; border: 1px solid var(--border)"
    loading="lazy"
  />
  <figcaption style="font-size: 0.8125rem; color: var(--text-secondary); margin-top: 0.5rem">
    Example headshot passed via <code>--face</code>. FLUX.2 keeps this person consistent across all three thumbnail directions.
  </figcaption>
</figure>

**From a file — for longer descriptions:**

```bash
node src/index.js --file video-description.txt --face headshot.jpg
```

You'll see:

```
Generating thumbnails for:
   "A deep dive into building SaaS products in 2025..."

Face reference: headshot.jpg

Built 3 prompts from templates (0.0s)
Sending 3 prompts to FLUX.2 API...
   (with face reference for character consistency)
Polling for results...

Image 1 ready — downloading...
Image 2 ready — downloading...
Image 3 ready — downloading...

All 3 images generated (8.2s)
Building comparison grid...

Done in 8.4s! Output saved to output/
```

Open `viewer.html` in your browser. Three distinct thumbnails — and if you used `--face`, *you're in all of them*.

<div class="thumbnail-grid">
  <img src="/tutorial/cli-cinematic.jpg" alt="Cinematic style thumbnail" loading="lazy" />
  <img src="/tutorial/cli-graphic.jpg" alt="Graphic style thumbnail" loading="lazy" />
  <img src="/tutorial/cli-abstract.jpg" alt="Abstract style thumbnail" loading="lazy" />
</div>

### Step 6: Iterate

```bash
# Different content, same face
node src/index.js "Why Rust is eating Python's lunch in systems programming" --face headshot.jpg

# No face, pure concept art
node src/index.js "The hidden costs of microservices — why monoliths are making a comeback"

# Long-form description from a file
node src/index.js --file script-excerpt.txt
```

Each run overwrites `output/` with fresh results. Total turnaround: under 10 seconds.

---

## Beyond the Tutorial

This tutorial stops at the point where you have a working thumbnail generator you can run locally in a few seconds. If you want to take it further, the GitHub repo includes a separate `pipeline/` artifact that turns the same core logic into an automated YouTube workflow.

The important part is that the generator you built here is already the reusable core:

```
description -> prompt templates -> FLUX.2 -> thumbnails
```

Once that exists, you can wire it into whatever environment you want: BFL's API directly, a webhook-driven publishing pipeline, a human approval flow, or whatever else your heart desires.

---

## Make Your First API Call

If you read this far, don't stop at the walkthrough. Take five more minutes and generate a real thumbnail set.

1. Create a BFL API key at [dashboard.bfl.ai](https://dashboard.bfl.ai).
2. Run the sample command from `thumbnail-generator/`:

```bash
node src/index.js "A deep dive into building SaaS products in 2025, covering React frontends, serverless backends on AWS, and Stripe billing integration"
```

3. Open `viewer.html` and compare the three directions.
4. Replace the sample description with your own video summary, transcript, or script excerpt.
5. Run it again with `--face headshot.jpg` if you want yourself in the frame.

That's the real goal of this tutorial: not to read about FLUX.2, but to make one successful API call and get a usable result on your machine.
