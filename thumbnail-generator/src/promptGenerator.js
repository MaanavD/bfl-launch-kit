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
  ];
  let cleaned = description;
  for (const [pattern, replacement] of replacements) {
    cleaned = cleaned.replace(pattern, replacement);
  }
  return cleaned;
}

// --- Text-free templates (for klein) ---

const STYLE_TEMPLATES = [
  {
    name: "Cinematic",
    wrap: (desc, hasFace) =>
      `TEXT-FREE IMAGE. A photorealistic, cinematic YouTube thumbnail. Dramatic side lighting, shallow depth of field, shot on 35mm film. ${hasFace ? "The person from the reference image is the main subject, positioned in the right third of the frame. " : ""}The scene visually represents: ${desc}. Rich color grading, high contrast, bold composition. The image contains NO text, NO titles, NO captions, NO watermarks, NO logos, NO letters, NO numbers, NO words, NO writing of any kind anywhere in the image.`,
  },
  {
    name: "Graphic",
    wrap: (desc, hasFace) =>
      `TEXT-FREE IMAGE. A bold, flat-design YouTube thumbnail with strong geometric shapes in a split-complementary color scheme. ${hasFace ? "The person from the reference image is featured as a stylized illustration, centered and filling the frame. " : ""}The concept shown is: ${desc}. Vector-art influenced, clean lines, high contrast color blocks, top-down or isometric perspective. The image contains NO text, NO titles, NO captions, NO watermarks, NO logos, NO letters, NO numbers, NO words, NO writing of any kind anywhere in the image.`,
  },
  {
    name: "Abstract",
    wrap: (desc, hasFace) =>
      `TEXT-FREE IMAGE. A surreal, conceptual YouTube thumbnail using metaphorical imagery and symbolic objects. ${hasFace ? "The person from the reference image floats in a dreamlike environment. " : ""}A visual metaphor for: ${desc}. Dreamlike wide-angle composition, glowing ethereal lighting, flowing organic shapes, striking warm-to-cool color gradient. The image contains NO text, NO titles, NO captions, NO watermarks, NO logos, NO letters, NO numbers, NO words, NO writing of any kind anywhere in the image.`,
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
