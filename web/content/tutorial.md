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

FLUX.2 is the latest image generation model from Black Forest Labs (the team behind Stable Diffusion) - and the BFL API is the fastest path from zero to a high fidelity generated image.

## 0 → generating in 60 seconds

Skip the explanation. Clone, set your key, run one command:

```bash
git clone https://github.com/MaanavD/bfl-launch-kit.git
cd bfl-launch-kit/thumbnail-generator
npm install
echo "BFL_API_KEY=your_key_here" > .env
node src/index.js "How to write a short story that actually gets finished, from first idea to final draft"
```

> **Don't have a key yet?** [dashboard.bfl.ai](https://dashboard.bfl.ai/) → create account → API → Keys → create key.

When the CLI finishes, your thumbnails are saved to `output/` and the viewer opens automatically in your browser. Total cost: ~$0.04. Keep reading for the how and why.

---

## What you'll build

A CLI tool that turns a video description into 3 thumbnails. Along the way, you'll learn the FLUX.2 API, prompt templating, model selection, and how to add subjects to images.

**You'll need:** Node.js 20+ and a BFL API key - grab one at [dashboard.bfl.ai](https://dashboard.bfl.ai/).

## How it works
At a high level:
> Description in → three style templates → concurrent FLUX.2 calls → comparison grid out.

If you pass a headshot, FLUX.2's reference-based generation keeps your face consistent across all variants (it supports up to 10 reference images - we use one here). If you pass `--text`, the tool auto-upgrades to `flux-2-pro-preview` and renders your title directly into the image.

We're using templates instead of an LLM for simplicity, but you can wire in your favorite for richer prompt generation, and even use video summaries in your pipeline - the architecture makes that a one-line swap.

The tool defaults to `klein` (fastest, cheapest) and auto-upgrades to `pro-preview` when you use `--text`. Here's the full lineup:

<div class="info-table"><table>
<tr><th>Model</th><th>Speed</th><th>Cost</th><th>Best for</th></tr>
<tr><td><strong>klein-4b</strong></td><td>Sub-second</td><td>~$0.014/img</td><td>Fast iteration, text-free</td></tr>
<tr><td><strong>pro-preview</strong></td><td>~5s</td><td>$0.03/MP</td><td>Production at scale</td></tr>
<tr><td><strong>flex</strong></td><td>~8s</td><td>$0.06/MP</td><td>Typography, adjustable steps & guidance</td></tr>
<tr><td><strong>max</strong></td><td>~10s</td><td>$0.06/MP</td><td>Maximum quality, grounding search</td></tr>
</table></div>

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

> **Get your API key:** [dashboard.bfl.ai](https://dashboard.bfl.ai/) → create account → API → Keys → create key. Copy it immediately - you only see the full key once.

### Step 2: The prompt builder

Easy start. A few styles that wrap your description. Here's the core of `src/promptGenerator.js`:

```js
const STYLE_TEMPLATES = [
  {
    name: "Cinematic",
    wrap: (desc, hasFace) =>
      `A photorealistic, cinematic scene shot on 35mm film.
       ${hasFace ? "The person from the reference image is the main subject. " : ""}
       The scene visually represents: ${desc}. Dramatic side lighting
       with shallow depth of field, rich warm color grading.`,
  },
  // ... Graphic (pop-art) and Abstract (surreal) templates follow the same pattern
];

export function buildPrompts(description, hasFace = false, titleText = null) {
  if (titleText) {
    // Text-enabled templates tell pro/max exactly what to render and where
    return TEXT_STYLE_TEMPLATES.map((s) => s.wrap(description, titleText, hasFace));
  }
  const cleaned = sanitizeForImageGen(description);
  return STYLE_TEMPLATES.map((style) => style.wrap(cleaned, hasFace));
}
```

Three styles (Cinematic, Graphic, Abstract), each wrapping the description differently. When you pass `--text`, the templates tell the model what title to render and where. The `sanitizeForImageGen` function converts brand names, instructional phrasing, and text-adjacent terms into visual equivalents for simplicity.

### Step 3: Calling the FLUX.2 API

```js
const MODELS = {
  klein: "flux-2-klein-4b",     // Fast, cheap, text-free
  pro: "flux-2-pro-preview",    // Text rendering, higher quality
  max: "flux-2-max",            // Maximum quality
};

const endpoint = `https://api.bfl.ai/v1/${MODELS[model]}`;

const payload = {
  prompt,
  width: 1344,   // 16:9 YouTube thumbnail ratio — any aspect ratio works,
  height: 768,   // up to 4MP total (e.g. 2048x2048, 1440x2048, etc.)
};

// If a face reference is provided, activate character consistency
if (faceBase64) {
  payload.input_image = faceBase64;
}

const response = await fetch(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-key": BFL_API_KEY,
  },
  body: JSON.stringify(payload),
});

const { polling_url } = await response.json();
```

Same API contract across all models - only the endpoint changes. When `input_image` is present, FLUX.2 activates character consistency automatically. The snippets above are simplified - see [the source](https://github.com/MaanavD/bfl-launch-kit/tree/main/thumbnail-generator/src) for full error handling.

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

All 3 calls run concurrently via `Promise.all` and we just wait for the last one to finish.

### Step 5: Run it

<div class="run-tabs">
  <input type="radio" name="run-mode" id="run-basic" checked />
  <input type="radio" name="run-mode" id="run-face" />
  <input type="radio" name="run-mode" id="run-file" />
  <div class="run-tabs-nav">
    <label for="run-basic">Basic</label>
    <label for="run-face">With a face</label>
    <label for="run-file">From a file</label>
  </div>
  <div class="run-tab-panel" id="panel-basic">
    <pre><code class="language-bash">node src/index.js "How to write a short story that actually gets finished. We break down the process from first spark to final draft: finding ideas worth exploring, building characters that feel real, structuring scenes that move, and editing without losing your voice."</code></pre>
  </div>
  <div class="run-tab-panel" id="panel-face">
    <div style="display: flex; gap: 1.5rem; align-items: center; margin: 0 0 1rem">
      <img src="/tutorial/headshot.jpg" alt="Example headshot" style="width: 64px; height: 64px; object-fit: cover; border-radius: 50%; border: 2px solid var(--border); flex-shrink: 0" loading="lazy" />
      <p style="margin: 0; font-size: 0.9375rem">Pass a headshot via <code>--face</code> and FLUX.2 keeps that person consistent across all three directions.</p>
    </div>
    <pre><code class="language-bash">node src/index.js "How to write a short story that actually gets finished" --face headshot.jpg</code></pre>
  </div>
  <div class="run-tab-panel" id="panel-file">
    <p style="margin: 0 0 0.75rem; font-size: 0.9375rem">Pipe in a longer description from a text file:</p>
    <pre><code class="language-bash">node src/index.js --file video-description.txt --face headshot.jpg</code></pre>
  </div>
</div>

The CLI saves three thumbnails to `output/` and opens the viewer automatically - three distinct directions, and if you used `--face`, *you're in all of them*.

<figure class="article-figure article-figure--wide">
  <img src="/tutorial/viewer.jpg" alt="The thumbnail viewer showing three generated directions with prompts and style badges" loading="lazy" />
</figure>

### Step 6: Add title text

The `--text` flag renders your title directly into the thumbnail. This auto-upgrades from `klein` to `pro-preview`, which handles typography cleanly:

```bash
node src/index.js "How to write a short story that actually gets finished" --face headshot.jpg --text "Write Your First Short Story"
```

<div class="thumbnail-grid">
  <img src="/tutorial/text-cinematic.jpg" alt="Cinematic thumbnail with rendered title text" loading="lazy" />
  <img src="/tutorial/text-graphic.jpg" alt="Graphic thumbnail with rendered title text" loading="lazy" />
  <img src="/tutorial/text-abstract.jpg" alt="Abstract thumbnail with rendered title text" loading="lazy" />
</div>

Same three styles, now with legible title text baked in. Three thumbnails on pro costs about $0.09 total.

FLUX.2's text rendering integrates typography into the scene - matching lighting, color, and composition naturally - so you skip the Figma overlay step entirely.

## Where to go from here

- **Automate it.** The repo ships a `pipeline/` folder that wires the same generation logic into an automated YouTube workflow - new video goes up, thumbnails generate, and one gets set as the live thumbnail via the YouTube API. [Setup instructions →](https://github.com/MaanavD/bfl-launch-kit/tree/main/pipeline)

<figure class="article-figure article-figure--wide">
  <video controls autoplay loop muted playsinline preload="metadata" poster="/tutorial/viewer.jpg" aria-label="Pipeline automation demo showing thumbnail generation and YouTube publishing">
    <source src="/tutorial/pipeline-demo.mp4" type="video/mp4" />
    Your browser does not support the video tag. <a href="/tutorial/pipeline-demo.mp4">Download the demo video</a>.
  </video>
  <figcaption>Pipeline demo: generate thumbnail concepts, review them, and push the winner live to YouTube.</figcaption>
</figure>

- **Try `--model max`** for highest quality output.
- **Read the API docs.** One endpoint covers text-to-image and editing. Parameters, model options, and advanced features are all at [docs.bfl.ai](https://docs.bfl.ai/).

Alright, enough reading - let's ship. Grab a key and let's get off to the races!

<div class="cta-block">
  <a href="https://dashboard.bfl.ai" target="_blank" rel="noopener noreferrer" class="btn-primary">
    Get Your API Key →
  </a>
</div>
