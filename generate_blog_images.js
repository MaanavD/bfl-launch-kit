/**
 * Generate showcase images for the FLUX.2 launch blog post.
 * Uses [max] and [pro] models to demonstrate key capabilities.
 *
 * Usage: node generate_blog_images.js
 * Requires BFL_API_KEY env var or reads from thumbnail-generator/.env
 */

import { writeFile, readFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

// Load API key from env or .env file
let BFL_API_KEY = process.env.BFL_API_KEY;
if (!BFL_API_KEY) {
  try {
    const envContent = await readFile("thumbnail-generator/.env", "utf8");
    const match = envContent.match(/^BFL_API_KEY=(.+)$/m);
    if (match) BFL_API_KEY = match[1].trim();
  } catch {}
}
if (!BFL_API_KEY) {
  console.error("No BFL_API_KEY found");
  process.exit(1);
}

const OUTPUT_DIR = join("web", "public", "assets", "blog");
await mkdir(OUTPUT_DIR, { recursive: true });

const POLL_INTERVAL = 2000;
const MAX_POLLS = 120;

const images = [
  {
    name: "photorealism",
    endpoint: "flux-2-pro",
    prompt:
      "Close-up editorial photograph of a weathered fisherman's hands mending a net on a wooden dock at golden hour. Every rope fiber, cracked knuckle, and salt crystal is visible. Shallow depth of field, warm backlight, photojournalism style. 4K detail.",
    width: 1440,
    height: 960,
  },
  {
    name: "typography",
    endpoint: "flux-2-pro",
    prompt:
      'A clean, modern event poster on a dark navy background. Large white bold text reads "FLUX.2 DEVELOPER SUMMIT" at the top. Below in smaller golden text: "San Francisco / March 2026". At the bottom, three columns of text listing speakers: "Dr. Sarah Chen - Keynote", "Marcus Rivera - Workshop", "Yuki Tanaka - Panel". Minimalist design with subtle geometric line accents.',
    width: 1024,
    height: 1440,
  },
  {
    name: "hex-color",
    endpoint: "flux-2-pro",
    prompt:
      "A flat lay product photography scene on a pure white background. Three geometric glass bottles arranged in a triangle. The left bottle is filled with liquid colored exactly #FF6B35 (vivid orange). The center bottle is filled with liquid colored exactly #1B998B (teal green). The right bottle is filled with liquid colored exactly #7B2D8E (deep purple). Clean studio lighting, sharp reflections, commercial product photography style.",
    width: 1440,
    height: 960,
  },
  {
    name: "detail",
    endpoint: "flux-2-max",
    prompt:
      "A photorealistic macro photograph of a single dewdrop on a spider web strand at sunrise. Inside the dewdrop, a refracted image of a blooming wildflower meadow is visible. Extreme detail: individual silk fibers of the web, light prismatic effects in the water, bokeh background of soft green and gold. National Geographic quality.",
    width: 1440,
    height: 960,
  },
];

async function generateImage(img) {
  console.log(`Submitting: ${img.name} (${img.endpoint})...`);
  const url = `https://api.bfl.ai/v1/${img.endpoint}`;

  const payload = {
    prompt: img.prompt,
    width: img.width,
    height: img.height,
    output_format: "jpeg",
  };

  // Add prompt_upsampling for non-klein models
  if (!img.endpoint.includes("klein")) {
    payload.prompt_upsampling = true;
  }

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-key": BFL_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Submit failed for ${img.name} (${res.status}): ${body}`);
  }

  const { polling_url } = await res.json();
  console.log(`  Polling: ${img.name}...`);

  for (let i = 0; i < MAX_POLLS; i++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL));
    const pollRes = await fetch(polling_url, {
      headers: { "x-key": BFL_API_KEY },
    });
    if (!pollRes.ok) throw new Error(`Poll failed for ${img.name}`);
    const result = await pollRes.json();

    if (result.status === "Ready") {
      const imageUrl = result.result.sample;
      const imageRes = await fetch(imageUrl);
      const buffer = Buffer.from(await imageRes.arrayBuffer());
      const outPath = join(OUTPUT_DIR, `${img.name}.jpg`);
      await writeFile(outPath, buffer);
      console.log(`  Saved: ${outPath}`);
      return outPath;
    }
    if (result.status === "Error") {
      throw new Error(`Generation error for ${img.name}: ${JSON.stringify(result)}`);
    }
  }
  throw new Error(`Timeout for ${img.name}`);
}

// Generate all images (sequentially to avoid rate limits)
for (const img of images) {
  try {
    await generateImage(img);
  } catch (err) {
    console.error(`Failed: ${img.name}: ${err.message}`);
  }
}

console.log("Done!");
