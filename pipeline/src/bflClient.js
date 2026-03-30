import dotenv from "dotenv";
import { readFile } from "node:fs/promises";
dotenv.config();

const BFL_API_KEY = process.env.BFL_API_KEY;
if (!BFL_API_KEY) {
  throw new Error("BFL_API_KEY environment variable is required. Get one at https://dashboard.bfl.ai");
}
const FLUX_ENDPOINT = "https://api.bfl.ai/v1/flux-2-klein-4b";
const POLL_INTERVAL_MS = 1000;
const MAX_POLLS = 120;

/**
 * Encodes a local image file to a base64 data URI.
 */
export async function encodeImageToBase64(filePath) {
  const buffer = await readFile(filePath);
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
}

/**
 * Generates an image from a prompt via the BFL FLUX.2 API.
 * @param {string} prompt - The image generation prompt.
 * @param {string|null} faceBase64 - Base64-encoded face reference image, or null.
 * @returns {Promise<Buffer>} The generated image as a Buffer.
 */
export async function generateImage(prompt, faceBase64 = null) {
  const payload = { prompt, width: 1344, height: 768 };
  if (faceBase64) {
    payload.input_image = faceBase64;
  }

  const submitRes = await fetch(FLUX_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-key": BFL_API_KEY,
    },
    body: JSON.stringify(payload),
  });

  if (!submitRes.ok) {
    const body = await submitRes.text();
    throw new Error(`BFL submission failed (${submitRes.status}): ${body}`);
  }

  const { polling_url } = await submitRes.json();
  if (!polling_url) throw new Error("BFL API did not return a polling_url");

  for (let poll = 0; poll < MAX_POLLS; poll++) {
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));

    const pollRes = await fetch(polling_url, {
      headers: { "x-key": BFL_API_KEY },
    });
    if (!pollRes.ok) throw new Error(`BFL polling failed (${pollRes.status})`);

    const result = await pollRes.json();

    if (result.status === "Ready") {
      const imgRes = await fetch(result.result.sample);
      if (!imgRes.ok) throw new Error("Failed to download generated image");
      return Buffer.from(await imgRes.arrayBuffer());
    }

    if (result.status === "Error" || result.status === "Failed") {
      throw new Error(`BFL generation failed: ${JSON.stringify(result)}`);
    }
  }

  throw new Error("BFL polling timed out");
}

/**
 * Generates multiple images concurrently.
 * @param {string[]} prompts - Array of image prompts.
 * @param {string|null} faceBase64 - Base64-encoded face reference image, or null.
 * @returns {Promise<Buffer[]>} Array of image Buffers.
 */
export async function generateAllImages(prompts, faceBase64 = null) {
  return Promise.all(prompts.map((p) => generateImage(p, faceBase64)));
}
