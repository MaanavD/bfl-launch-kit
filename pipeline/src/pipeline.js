import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fetchVideoDetails, setThumbnail } from "./youtubeClient.js";
import { buildPrompts, STYLE_NAMES } from "./promptTemplates.js";
import { generateAllImages, encodeImageToBase64 } from "./bflClient.js";

/**
 * Runs the full thumbnail pipeline for a YouTube video:
 *   1. Fetch video description from YouTube Data API
 *   2. Build style-variant prompts
 *   3. Generate images via BFL FLUX.2
 *   4. Set the first option as the live thumbnail (configurable)
 *
 * @param {string} videoId - The YouTube video ID.
 * @param {object} options
 * @param {number} [options.pick=0] - Index of the style variant to set (0=Cinematic, 1=Graphic, 2=Abstract).
 * @param {boolean} [options.setThumbnail=true] - Whether to push the thumbnail to YouTube.
 * @param {string|null} [options.customDescription=null] - Override the YouTube description with a custom one.
 * @param {string|null} [options.facePath=null] - Path to a face reference image for character consistency.
 * @returns {Promise<{videoId: string, title: string, style: string, images: Buffer[]}>}
 */
export async function runPipeline(videoId, { pick = 0, setThumbnail: shouldSet = true, customDescription = null, facePath = null } = {}) {
  console.log(`\n🎬 Pipeline started for video: ${videoId}`);

  // 1. Fetch video details
  const { title, description: ytDescription } = await fetchVideoDetails(videoId);
  const description = customDescription || ytDescription;
  console.log(`📺 Video: "${title}"`);
  if (customDescription) {
    console.log(`📝 Using custom description: "${description.slice(0, 120)}${description.length > 120 ? "..." : ""}"`);
  } else {
    console.log(`📝 Using YouTube description: "${description.slice(0, 120)}${description.length > 120 ? "..." : ""}"`);
  }
  // 2. Build prompts
  const prompts = buildPrompts(description);
  console.log(`🎨 Built ${prompts.length} style prompts: ${STYLE_NAMES.join(", ")}`);

  // 3. Generate images via BFL
  let faceBase64 = null;
  if (facePath) {
    if (!existsSync(facePath)) {
      throw new Error(`Face image not found: ${facePath}`);
    }
    faceBase64 = await encodeImageToBase64(facePath);
    console.log(`\ud83d\udc64 Face reference: ${facePath}`);
  }
  console.log(`\u23f3 Generating ${prompts.length} images via FLUX.2...`);
  const startTime = performance.now();
  const images = await generateAllImages(prompts, faceBase64);
  const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
  console.log(`✅ ${images.length} images generated (${elapsed}s)`);

  // 4. Save images to disk
  const outputDir = join("output", videoId);
  mkdirSync(outputDir, { recursive: true });
  images.forEach((buf, i) => {
    const filePath = join(outputDir, `${STYLE_NAMES[i].toLowerCase().replace(/\s+/g, "-")}.png`);
    writeFileSync(filePath, buf);
    console.log(`💾 Saved ${filePath}`);
  });

  // 5. Set thumbnail on YouTube
  if (shouldSet) {
    const chosenStyle = STYLE_NAMES[pick] || STYLE_NAMES[0];
    console.log(`📤 Setting "${chosenStyle}" as thumbnail on YouTube...`);
    await setThumbnail(videoId, images[pick]);
    console.log(`✅ Thumbnail set for video ${videoId}`);
  }

  return { videoId, title, style: STYLE_NAMES[pick], images };
}
