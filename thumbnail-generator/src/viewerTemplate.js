import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Generates a self-contained viewer HTML file with metadata and image paths inlined.
 * Works when opened directly from disk (no server needed).
 * @param {object} metadata - Generation metadata (description, prompts, styles, etc.)
 * @returns {Promise<string>} Complete HTML string for the viewer page.
 */
export async function buildViewerHTML(metadata) {
  // Read the template shell from viewer.html
  const template = await readFile(join(__dirname, "..", "viewer.html"), "utf-8");

  // Extract everything up to and including </style>, then the body/structure
  // We'll inject our inline data and simplified render script
  const dataScript = `
  <script>
    const DATA = ${JSON.stringify(metadata)};
  </script>`;

  // Insert the data script right before the existing <script> tag,
  // and replace the render logic to use inlined DATA instead of fetch()
  const modified = template
    .replace(
      /<script>\s*const STYLES/,
      `${dataScript}\n  <script>\n    const STYLES`
    )
    .replace(
      /async function loadMetadata\(\) \{[\s\S]*?return null;\s*\}\s*\}/,
      `async function loadMetadata() { return DATA; }`
    )
    .replace(
      /\/\*\* When metadata[\s\S]*?function probeImages[\s\S]*?\}\s*\}/,
      ``
    )
    // Fix image paths: from "output/thumbnail_X.jpg" to "thumbnail_X.jpg" (same directory)
    .replace(/src="output\/thumbnail_/g, 'src="thumbnail_')
    .replace(/src="output\/comparison/g, 'src="comparison')
    .replace(/.src = "output\/thumbnail_1.jpg"/g, '.src = "thumbnail_1.jpg"');

  return modified;
}
