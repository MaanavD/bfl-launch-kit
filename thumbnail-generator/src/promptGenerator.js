/**
 * Strips brand names, acronyms, and tech jargon that image models try to
 * render as visible (garbled) text. Replaces them with visual equivalents.
 * Only used in text-free mode - when --text is provided, the pro/max models
 * can handle text rendering properly.
 */
function sanitizeForImageGen(description) {
  const replacements = [
    [/\bReact\b/gi, "web application"],
    [/\bNext\.?js\b/gi, "web framework"],
    [/\bNode\.?js\b/gi, "server runtime"],
    [/\bAWS\b/g, "cloud infrastructure"],
    [/\bGCP\b/g, "cloud infrastructure"],
    [/\bAzure\b/gi, "cloud infrastructure"],
    [/\bStripe\b/gi, "payment processing"],
    [/\bSaaS\b/gi, "software service"],
    [/\bAPI\b/g, "programming interface"],
    [/\bSDK\b/g, "developer toolkit"],
    [/\bCI\/CD\b/gi, "deployment pipeline"],
    [/\bDocker\b/gi, "containerized deployment"],
    [/\bKubernetes\b/gi, "orchestration system"],
    [/\bRust\b/gi, "systems programming"],
    [/\bPython\b/gi, "scripting language"],
    [/\bTypeScript\b/gi, "typed scripting"],
    [/\bJavaScript\b/gi, "scripting language"],
    [/\bGitHub\b/gi, "code repository"],
    [/\bVercel\b/gi, "deployment platform"],
    [/\bTED\b/g, "conference"],
    // Writing/literary terms that cue text rendering
    [/\bwrit(e|ing|ten)\b/gi, "creat$1"],
    [/\bshort stor(y|ies)\b/gi, "creative journey"],
    [/\bstor(y|ies)\b/gi, "narrative"],
    [/\b(first|final|rough)\s+draft\b/gi, "$1 iteration"],
    [/\bdraft\b/gi, "iteration"],
    [/\bediting\b/gi, "refining"],
    [/\beditor\b/gi, "craftsperson"],
    [/\bmanuscript\b/gi, "creative work"],
    [/\bpublish(ing|ed)?\b/gi, "releas$1"],
    [/\bblog\s*post\b/gi, "creative piece"],
    [/\bnewsletter\b/gi, "publication"],
    [/\bheadline\b/gi, "hook"],
    [/\bcopywriting\b/gi, "persuasion craft"],
    [/\bfiction\b/gi, "imaginative work"],
    [/\bnovel\b/gi, "long-form creation"],
    [/\bchapter\b/gi, "section"],
    [/\bsentence\b/gi, "expression"],
    [/\bparagraph\b/gi, "passage"],
    [/\bword(s)?\b/gi, "element$1"],
    [/\breading\b/gi, "absorbing"],
    [/\breader(s)?\b/gi, "audience"],
  ];
  let cleaned = description;
  for (const [pattern, replacement] of replacements) {
    cleaned = cleaned.replace(pattern, replacement);
  }
  // Strip instructional phrasing that reads like a title/headline
  cleaned = cleaned
    .replace(/^how to\b/i, "The process of")
    .replace(/\bhow to\b/gi, "the process of")
    .replace(/^\d+\s+(ways?|tips?|steps?|reasons?|things?)\b/gi, "a collection of ideas about")
    .replace(/^(the )?(ultimate |complete |definitive )?(guide|tutorial|walkthrough)\b/gi, "an exploration")
    .replace(/\bstep[- ]by[- ]step\b/gi, "methodical");
  return cleaned;
}

// --- Text-free templates (for klein) ---
// Per the BFL prompting guide: write like a novelist, lead with subject,
// describe lighting explicitly. Never mention "text" or "writing" — even
// negatively — as it primes the model to render text artifacts.

const STYLE_TEMPLATES = [
  {
    name: "Cinematic",
    wrap: (desc, hasFace) =>
      `A photorealistic, cinematic scene shot on 35mm film. ${hasFace ? "The person from the reference image is the main subject, positioned in the right third of the frame. " : ""}The scene visually represents: ${desc}. Dramatic side lighting with shallow depth of field, rich warm color grading, high contrast. Bold composition with clean negative space. Smooth gradients and soft bokeh in the background.`,
  },
  {
    name: "Graphic",
    wrap: (desc, hasFace) =>
      `A vibrant pop-art scene with bold saturated colors and strong graphic contrast. ${hasFace ? "The person from the reference image is the main subject, rendered in a stylized pop-art portrait style, centered and filling the frame. " : ""}The concept shown is: ${desc}. Thick outlines, halftone dot patterns, duotone color blocking. Punchy complementary colors like orange and teal. Clean composition with a single focal point and large areas of flat color.`,
  },
  {
    name: "Abstract",
    wrap: (desc, hasFace) =>
      `A surreal, dreamlike scene using metaphorical imagery and symbolic objects. ${hasFace ? "The person from the reference image floats in a dreamlike environment. " : ""}A visual metaphor for: ${desc}. Wide-angle composition, glowing ethereal lighting, flowing organic shapes, striking warm-to-cool color gradient. Painterly and atmospheric with soft focus throughout.`,
  },
];

// --- Text-enabled templates (for pro/max) ---

const TEXT_STYLE_TEMPLATES = [
  {
    name: "Cinematic",
    wrap: (desc, title, hasFace) =>
      `A photorealistic, cinematic YouTube thumbnail. Dramatic side lighting, shallow depth of field. ${hasFace ? "The person from the reference image is the main subject, positioned in the right third of the frame. " : ""}The scene visually represents: ${desc}. The title text "${title}" is displayed prominently in large, bold white letters with a subtle dark shadow, positioned in the upper-left area. Rich color grading, high contrast, bold composition.`,
  },
  {
    name: "Graphic",
    wrap: (desc, title, hasFace) =>
      `A bold, flat-design YouTube thumbnail with strong geometric shapes and vibrant saturated colors. ${hasFace ? "The person from the reference image is featured as a stylized illustration on the right side. " : ""}The concept shown is: ${desc}. The title "${title}" is rendered in large, blocky, uppercase sans-serif typography in a contrasting color on the left side. Clean lines, high contrast color blocks.`,
  },
  {
    name: "Abstract",
    wrap: (desc, title, hasFace) =>
      `A surreal, conceptual YouTube thumbnail using metaphorical imagery. ${hasFace ? "The person from the reference image appears in a dreamlike environment. " : ""}A visual metaphor for: ${desc}. The title "${title}" is integrated into the composition in elegant, large serif typography with a subtle glow effect, centered at the top. Dreamlike composition, glowing ethereal lighting, striking color gradient.`,
  },
];

/**
 * Builds 3 distinct image prompts from a video description using style templates.
 * When titleText is provided, uses text-enabled templates for pro/max models.
 * When titleText is null, sanitizes the description and uses text-free templates for klein.
 * @param {string} description - Rich video description or script excerpt.
 * @param {boolean} hasFace - Whether a face reference image is being used.
 * @param {string|null} titleText - Title text to render on the thumbnail, or null for text-free.
 * @returns {string[]} Array of 3 image prompt strings.
 */
export function buildPrompts(description, hasFace = false, titleText = null) {
  if (titleText) {
    return TEXT_STYLE_TEMPLATES.map((style) =>
      style.wrap(description, titleText, hasFace)
    );
  }
  const cleaned = sanitizeForImageGen(description);
  return STYLE_TEMPLATES.map((style) => style.wrap(cleaned, hasFace));
}
