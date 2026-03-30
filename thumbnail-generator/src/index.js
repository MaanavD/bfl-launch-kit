import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { exec } from "node:child_process";

// Ensure config validates env vars on import
import "./config.js";
import { buildPrompts } from "./promptGenerator.js";
import { generateAllImages } from "./imageGenerator.js";
import { createComparisonGrid } from "./gridCompositor.js";
import { buildViewerHTML } from "./viewerTemplate.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "..", "output");

function parseArgs(args) {
  let description = null;
  let facePath = null;
  let filePath = null;
  let titleText = null;
  let model = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--face" && args[i + 1]) {
      facePath = args[++i];
    } else if (args[i] === "--file" && args[i + 1]) {
      filePath = args[++i];
    } else if (args[i] === "--text" && args[i + 1]) {
      titleText = args[++i];
    } else if (args[i] === "--model" && args[i + 1]) {
      model = args[++i];
    } else if (!description) {
      description = args[i];
    }
  }

  return { description, facePath, filePath, titleText, model };
}

async function main() {
  const { description: cliDesc, facePath, filePath, titleText, model: cliModel } = parseArgs(
    process.argv.slice(2)
  );

  // When --text is used, auto-upgrade to pro (klein can't render text)
  const model = cliModel || (titleText ? "pro" : "klein");

  // Load description from file or CLI arg
  let description;
  if (filePath) {
    description = (await readFile(filePath, "utf-8")).trim();
    console.log(`\n\ud83d\udcc4 Loaded description from: ${filePath}`);
  } else if (cliDesc) {
    description = cliDesc;
  } else {
    console.error(
      '\n\u274c Usage: node src/index.js "Your video description" [--face headshot.jpg] [--text "Title Text"]'
    );
    console.error(
      '         node src/index.js --file description.txt [--face headshot.jpg] [--text "Title Text"]\n'
    );
    process.exit(1);
  }

  const hasFace = !!facePath;
  if (hasFace && !existsSync(facePath)) {
    console.error(`\n❌ Face image not found: ${facePath}\n`);
    process.exit(1);
  }

  console.log(`\n\ud83c\udfac Generating thumbnails for:\n   "${description.slice(0, 120)}${description.length > 120 ? "..." : ""}"\n`);
  if (hasFace) console.log(`\ud83d\udc64 Face reference: ${facePath}`);
  if (titleText) console.log(`\ud83d\udcdd Title text: "${titleText}"`);
  console.log(`\ud83e\udde0 Model: ${model}${titleText && !cliModel ? " (auto-upgraded for text rendering)" : ""}\n`);

  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Step 1: Build prompts from templates (no external API needed)
  const startPrompts = performance.now();
  const prompts = buildPrompts(description, hasFace, titleText);
  const promptTime = ((performance.now() - startPrompts) / 1000).toFixed(1);
  console.log(`📝 Built 3 prompts from templates (${promptTime}s)`);

  const styles = ["Cinematic", "Graphic", "Abstract"];
  prompts.forEach((p, i) => {
    console.log(`   ${styles[i]}: ${p.slice(0, 80)}...`);
  });

  // Step 2: Generate images via BFL FLUX.2 API
  console.log(`\n\ud83c\udfa8 Sending 3 prompts to FLUX.2 API (${model})...`);
  if (hasFace) console.log(`   (with face reference for character consistency)`);
  if (titleText) console.log(`   (with title text: "${titleText}")`);
  console.log(`\u23f3 Polling for results...\n`);

  const startImages = performance.now();
  const imageBuffers = await generateAllImages(prompts, facePath, model);
  const imageTime = ((performance.now() - startImages) / 1000).toFixed(1);
  console.log(`\n🖼️  All 3 images generated (${imageTime}s)`);

  // Step 3: Save individual thumbnails
  for (let i = 0; i < imageBuffers.length; i++) {
    const outputPath = join(OUTPUT_DIR, `thumbnail_${i + 1}.jpg`);
    await writeFile(outputPath, imageBuffers[i]);
  }

  // Step 4: Create comparison grid
  console.log(`🖼️  Building comparison grid...`);
  const gridBuffer = await createComparisonGrid(imageBuffers);
  await writeFile(join(OUTPUT_DIR, "comparison.jpg"), gridBuffer);

  // Step 5: Write metadata for the HTML viewer
  const metadata = {
    description,
    titleText: titleText || null,
    model,
    face: facePath || null,
    generated_at: new Date().toISOString(),
    styles,
    prompts,
  };
  await writeFile(
    join(OUTPUT_DIR, "metadata.json"),
    JSON.stringify(metadata, null, 2)
  );

  // Step 6: Generate self-contained viewer HTML
  const viewerHTML = await buildViewerHTML(metadata);
  await writeFile(join(OUTPUT_DIR, "viewer.html"), viewerHTML);

  // Done
  const totalTime = (
    (performance.now() - startPrompts) /
    1000
  ).toFixed(1);

  console.log(`\n✅ Done in ${totalTime}s! Output saved to output/\n`);
  console.log(`   Thumbnails: output/thumbnail_1.jpg, thumbnail_2.jpg, thumbnail_3.jpg`);
  console.log(`   Viewer:     output/viewer.html\n`);

  // Auto-open the viewer in the default browser
  const viewerPath = join(OUTPUT_DIR, "viewer.html");
  const openCmd = process.platform === "win32" ? `start "" "${viewerPath}"`
    : process.platform === "darwin" ? `open "${viewerPath}"`
    : `xdg-open "${viewerPath}"`;
  exec(openCmd);
}

main().catch((err) => {
  console.error(`\n💥 Pipeline failed: ${err.message}\n`);
  if (err.cause) console.error("Cause:", err.cause);
  process.exit(1);
});
