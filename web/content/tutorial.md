<!--
EDITING CONVENTIONS
- Plain markdown (headings, paragraphs, bold, inline code, fenced code blocks, lists) is parsed and styled automatically.
- Raw HTML blocks are used for layout elements that need specific CSS classes. Preserve them as-is unless you're intentionally restructuring.
- Key HTML patterns:
    <header class="article-header">  - page title block (label + h1 + lead paragraph)
    <figure class="article-figure">  - images, single or wide (add article-figure--wide for full-bleed)
    <div class="thumbnail-grid">     - 3-column image grid for thumbnail comparisons
    <div class="info-table"><table>  - styled data table
    <div class="cta-block">          - centered CTA button
- Inline code uses backticks. Code blocks use triple backticks with optional language tag.
- All image paths are relative to /public (e.g. /tutorial/cli-cinematic.jpg).
-->

<header class="article-header">
  <p class="article-label">Written Tutorial</p>
  <h1>Build AI YouTube Thumbnails<br/>with FLUX.2 in Under 15 Minutes</h1>
  <p class="article-lead">A single CLI command that turns a video description into three thumbnail options. No design tools, no templates, no back-and-forth.</p>
</header>

<figure class="article-figure article-figure--wide">
  <img src="/tutorial/cli-comparison.jpg" alt="Generated comparison grid showing three thumbnail directions" loading="lazy" />
</figure>

## 0 → generating in 60 seconds

Skip the explanation. Clone, set your key, run one command:

```bash
git clone https://github.com/MaanavD/bfl-launch-kit.git
cd bfl-launch-kit/thumbnail-generator
npm install
echo "BFL_API_KEY=your_key_here" > .env
node src/index.js "A deep dive into building SaaS products in 2025"
```

> **Don't have a key yet?** [dashboard.bfl.ai](https://dashboard.bfl.ai/) → create account → add $10 in credits → API → Keys → create key.

Open `viewer.html` in your browser. You'll see three distinct thumbnail options. Total cost: ~$0.04. Keep reading for the how and why.

---

I make thumbnails for every video I publish, and my old workflow was painful: open Figma, hunt for stock photos, try 4 compositions, export, squint at them on my phone, go back, repeat. An hour per thumbnail on a good day.

So I built a CLI tool that does it in 10 seconds. You give it a video description, it generates three distinct thumbnail directions using FLUX.2, and you pick the one you like. That's the whole thing.

## What you'll build

A CLI tool that turns a video description into 3 thumbnails. Along the way, you'll learn the FLUX.2 API (submit prompt → poll for result → download image), prompt templating, and image compositing with sharp.

---

## Prerequisites

- Node.js 20+
- A BFL API key — grab one at [dashboard.bfl.ai](https://dashboard.bfl.ai/). $10 in credits is more than enough.

---

## How it works

Description in → three style templates → three concurrent FLUX.2 calls → comparison grid out. If you pass a headshot, FLUX.2's multi-reference editing keeps your face consistent across all variants.

**Why FLUX.2 and not an LLM for prompts?** I tried GPT-4 for prompt expansion and it kept adding stuff I didn't ask for — extra characters, different compositions. Templates are deterministic: same input, same three directions. And FLUX.2 specifically because thumbnails need prompt adherence over raw fidelity. The `flux-2-klein-4b` endpoint follows layout instructions reliably, runs in a few seconds, and costs ~$0.014/image. Four cents for three thumbnails.

---

## Let's build it

### Step 1: Clone and configure

```bash
git clone https://github.com/MaanavD/bfl-launch-kit.git
cd bfl-launch-kit/thumbnail-generator
npm install
```

Create a `.env` file:

```
BFL_API_KEY=your_bfl_api_key_here
```

> **Get your API key:** [dashboard.bfl.ai](https://dashboard.bfl.ai/) → create account → add credits ($10 minimum) → API → Keys → create key. Copy it immediately — you only see the full key once.

### Step 2: The prompt builder

No LLM here — just three style templates that wrap your description. Here's the core of `src/promptGenerator.js`:

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

Three templates (Cinematic, Graphic, Abstract), each wrapping your description in a different visual direction. When a face reference is present, the templates tell FLUX.2 to keep that person as the subject.

### Step 3: Calling the FLUX.2 API

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

When `input_image` is present, FLUX.2 activates character consistency automatically — same endpoint either way.

### Step 4: The polling pattern

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

All 3 run concurrently via `Promise.all` — total wait = the slowest image, not three sequential calls.

### Step 5: Run it

**Basic:**

```bash
node src/index.js "A deep dive into building SaaS products in 2025. We cover the full stack: React frontend, serverless backend on AWS, Stripe billing integration, and why most indie hackers fail at distribution not engineering."
```

**With a face (put yourself in the thumbnails):**

<div style="display: flex; gap: 1.5rem; align-items: center; margin: 1rem 0 1.5rem">
  <img
    src="/tutorial/headshot.jpg"
    alt="Example headshot used as a face reference"
    style="width: 80px; height: 80px; object-fit: cover; border-radius: 50%; border: 2px solid var(--border); flex-shrink: 0"
    loading="lazy"
  />
  <p style="margin: 0; font-size: 0.9375rem">Pass a headshot via <code>--face</code> and FLUX.2 keeps that person consistent across all three thumbnail directions.</p>
</div>

```bash
node src/index.js "A deep dive into building SaaS products in 2025" --face headshot.jpg
```

**From a file** (for longer descriptions):

```bash
node src/index.js --file video-description.txt --face headshot.jpg
```

Output looks like this:

```
Generating thumbnails for:
   "A deep dive into building SaaS products in 2025..."

Face reference: headshot.jpg

Built 3 prompts from templates (0.0s)
Sending 3 prompts to FLUX.2 API...
   (with face reference for character consistency)
Polling for results...

Image 1 ready - downloading...
Image 2 ready - downloading...
Image 3 ready - downloading...

All 3 images generated (8.2s)
Building comparison grid...

Done in 8.4s! Output saved to output/
```

Open `viewer.html` in your browser. Three distinct thumbnails, and if you used `--face`, *you're in all of them*.

<div class="thumbnail-grid">
  <img src="/tutorial/cli-cinematic.jpg" alt="Cinematic style thumbnail" loading="lazy" />
  <img src="/tutorial/cli-graphic.jpg" alt="Graphic style thumbnail" loading="lazy" />
  <img src="/tutorial/cli-abstract.jpg" alt="Abstract style thumbnail" loading="lazy" />
</div>

### Step 6: Keep going

```bash
# Different topic, same face
node src/index.js "Why Rust is eating Python's lunch in systems programming" --face headshot.jpg

# No face, pure concept art
node src/index.js "The hidden costs of microservices: why monoliths are making a comeback"

# Long-form description from a file
node src/index.js --file script-excerpt.txt
```

Each run overwrites `output/` with fresh results. Under 10 seconds end to end.

---

## Where to go from here

The CLI tool is the building block. The repo also ships a `pipeline/` folder that wires the same generation logic into a fully automated YouTube workflow — new video goes up, thumbnails generate automatically, and one gets set as the live thumbnail via the YouTube API. Same BFL API calls, just wrapped in a webhook listener. Setup instructions are in the [pipeline README](https://github.com/MaanavD/bfl-launch-kit/tree/main/pipeline).

---

## Try it

You've read the walkthrough. Now run the actual thing — it takes 5 minutes.

1. Grab an API key at [dashboard.bfl.ai](https://dashboard.bfl.ai).
2. Run:

```bash
node src/index.js "A deep dive into building SaaS products in 2025, covering React frontends, serverless backends on AWS, and Stripe billing integration"
```

3. Open `viewer.html`. Pick your favorite.
4. Swap in your own description and run it again.
5. Add `--face headshot.jpg` to put yourself in the thumbnails.

That's the real goal of this tutorial: not to read about FLUX.2, but to make one successful API call and get a usable result on your machine.
