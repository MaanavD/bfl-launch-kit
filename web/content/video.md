<!--
EDITING CONVENTIONS
- Plain markdown (headings, paragraphs, bold, inline code, links) is parsed and styled automatically.
- Raw HTML blocks are used for layout elements that need specific CSS classes. Preserve them as-is unless you're intentionally restructuring.
- Key HTML patterns:
    <section class="hero video-hero"> - hero banner with CTA buttons
    <div class="image-grid image-grid--N"> - N-column image grid with figures
    <div class="feature-list">        - feature card grid
    <dl class="command-list">         - styled definition list for bot commands
    <ol class="steps">                - numbered setup steps
    <div class="script-timeline">     - video script beat timeline
    <p class="section-desc">          - subtitle paragraph under a heading
- %%DISCORD_INVITE%% and %%GITHUB_REPO%% are interpolated at render time.
-->

<section class="hero video-hero">
<div class="hero-text">
<p class="hero-label">Open-source Discord bot &middot; Powered by FLUX.2</p>
<h1>AI image generation,<br/>right in Discord</h1>
<p class="hero-body">
FluxBot puts FLUX.2 image generation directly in your server.
Type a prompt, get a stunning image back in seconds. Personal
styles, multiple models, full control. Open source, ready to
fork.
</p>
<div class="hero-actions">
<a href="%%DISCORD_INVITE%%" target="_blank" rel="noopener noreferrer" class="btn-primary">Add to Discord</a>
<a href="%%GITHUB_REPO%%" target="_blank" rel="noopener noreferrer" class="btn-secondary">View source</a>
</div>
</div>
<div class="hero-visual">
<img src="/assets/17_thumbnail_knight.jpg" alt="FLUX-generated fantasy knight overlooking a glowing city" class="hero-image" />
</div>
</section>

<section class="section" id="styles">

## Same prompt. Different users. Different art.

<p class="section-desc">
Each user saves a personal style. The bot merges it with every prompt
automatically — so the same words produce completely different images
depending on who types them.
</p>

<div class="image-grid image-grid--2">
<figure>
<img src="/assets/08_style_knight_fantasy.jpg" alt="Dark fantasy oil painting style" loading="lazy" />
<figcaption>"a lone knight crossing a stone bridge" — dark fantasy oil painting style</figcaption>
</figure>
<figure>
<img src="/assets/09_style_knight_vector.jpg" alt="Clean vector pastel style" loading="lazy" />
<figcaption>Same prompt — clean vector, pastel minimal style</figcaption>
</figure>
</div>

</section>

<section class="section" id="features">

## What FluxBot does

<div class="feature-list">
<div class="feature">

### Text to image

Describe what you want. FLUX.2 handles photorealism, illustrations, concept art — whatever the prompt calls for.

</div>
<div class="feature">

### Restyle existing images

Upload a photo and transform it. A phone selfie becomes anime. A desk snapshot becomes a Vermeer painting. You get the idea.

</div>
<div class="feature">

### Personal style presets

Each user saves their own style. Same prompt, different people, totally different outputs.

</div>
<div class="feature">

### Multiple models

Switch between Pro, Max, Klein, or Flex per generation. Trade off speed vs. quality depending on what you need.

</div>
<div class="feature">

### Bring your own key

Each server sets its own BFL API key. You control usage and costs. Users can also set personal keys if they prefer.

</div>
<div class="feature">

### Fully open source

Fork it, modify it, self-host it. MIT licensed and designed to be extended.

</div>
</div>

</section>

<section class="section" id="commands">

## Commands

<dl class="command-list">
<div class="command-entry">
<dt>/generate</dt>
<dd>Create an image from a text prompt. Optionally choose a model.</dd>
</div>
<div class="command-entry">
<dt>/restyle</dt>
<dd>Upload an image and transform it with a new style.</dd>
</div>
<div class="command-entry">
<dt>/setstyle</dt>
<dd>Save a personal style applied to all your generations.</dd>
</div>
<div class="command-entry">
<dt>/mystyle</dt>
<dd>View your currently saved style.</dd>
</div>
<div class="command-entry">
<dt>/clearstyle</dt>
<dd>Reset to default.</dd>
</div>
<div class="command-entry">
<dt>/setkey</dt>
<dd>Admin only. Set a shared BFL API key for the whole server.</dd>
</div>
<div class="command-entry">
<dt>/mykey</dt>
<dd>Set your own personal BFL API key (overrides the server key for you).</dd>
</div>
</dl>

</section>

<section class="section" id="setup">

## Get started

<ol class="steps">
<li>
<div>

**Add the bot** — Click "Add to Discord" above and select your server.

</div>
</li>
<li>
<div>

**Set your API key** — Grab a key at [api.bfl.ai](https://api.bfl.ai), then run `/setkey` in your server.

</div>
</li>
<li>
<div>

**Generate** — Type `/generate` and describe what you want. That's it.

</div>
</li>
</ol>

</section>

<!-- BONUS -->

<section class="section" id="gallery">

## FLUX.2 assets generated for the video

<p class="section-desc">
Every image below was generated with FLUX.2 via the BFL API. I used
these as B-roll throughout the video. Total cost: <strong>$1.41</strong> for 47 images — about 3 cents each.
</p>

### Hook Montage

<div class="image-grid image-grid--3">
<figure>
<img src="/assets/01_hook_hero_samurai.jpg" alt="Cyberpunk samurai in rain" loading="lazy" />
<figcaption>Cyberpunk samurai, the hook hero image</figcaption>
</figure>
<figure>
<img src="/assets/04_montage_pixel_coffee.jpg" alt="Pixel art coffee shop" loading="lazy" />
<figcaption>Isometric pixel art coffee shop</figcaption>
</figure>
<figure>
<img src="/assets/05_montage_headphone_product.jpg" alt="Product photo headphones" loading="lazy" />
<figcaption>Product photo: matte black headphones</figcaption>
</figure>
</div>

<div class="image-grid image-grid--3">
<figure>
<img src="/assets/06_montage_anime_pilot.jpg" alt="Anime space pilot" loading="lazy" />
<figcaption>Anime space pilot in cockpit</figcaption>
</figure>
<figure>
<img src="/assets/02_montage_dog_throne.jpg" alt="Golden retriever on throne" loading="lazy" />
<figcaption>Royal portrait: golden retriever</figcaption>
</figure>
<figure>
<img src="/assets/03_montage_festival_poster.jpg" alt="Festival poster" loading="lazy" />
<figcaption>Neon Garden 2026 festival poster</figcaption>
</figure>
</div>

### Style Comparison

<p class="section-desc">
Same prompt ("a lone knight crossing a stone bridge over a
chasm"), two different user styles. This is the key moment
in the video — proof that personal styles change everything.
</p>

<div class="image-grid image-grid--2">
<figure>
<img src="/assets/08_style_knight_fantasy.jpg" alt="Dark fantasy oil painting style" loading="lazy" />
<figcaption>User A's style: dark fantasy oil painting</figcaption>
</figure>
<figure>
<img src="/assets/09_style_knight_vector.jpg" alt="Clean vector pastel style" loading="lazy" />
<figcaption>User B's style: clean vector, pastel minimal</figcaption>
</figure>
</div>

### Workflow Demos

<div class="image-grid image-grid--3">
<figure>
<img src="/assets/07_generate_dragon.jpg" alt="Dragon on skyscraper" loading="lazy" />
<figcaption>/generate demo: dragon in thunderstorm</figcaption>
</figure>
<figure>
<img src="/assets/16_klein_lighthouse.jpg" alt="Lighthouse in storm" loading="lazy" />
<figcaption>Klein speed demo: 0.8s generation</figcaption>
</figure>
<figure>
<img src="/assets/15_architecture_diagram.jpg" alt="Architecture diagram" loading="lazy" />
<figcaption>Architecture diagram B-roll</figcaption>
</figure>
</div>

### Community Montage

Closing montage showing it's not just one person using the bot — it's a whole server generating together.

<div class="image-grid image-grid--4">
<figure>
<img src="/assets/18_community_dnd_elf.jpg" alt="D&amp;D elf ranger portrait" loading="lazy" />
<figcaption>D&amp;D elf ranger</figcaption>
</figure>
<figure>
<img src="/assets/19_community_cat_ted.jpg" alt="Cat giving TED talk" loading="lazy" />
<figcaption>Cat TED talk</figcaption>
</figure>
<figure>
<img src="/assets/20_community_anime_landscape.jpg" alt="Anime landscape" loading="lazy" />
<figcaption>Anime landscape</figcaption>
</figure>
<figure>
<img src="/assets/21_community_wolf_logo.jpg" alt="Wolf esports logo" loading="lazy" />
<figcaption>Esports wolf logo</figcaption>
</figure>
</div>

<div class="image-grid image-grid--2" style="max-width:480px">
<figure>
<img src="/assets/22_community_birthday.jpg" alt="Birthday cake kawaii" loading="lazy" />
<figcaption>Kawaii birthday cake</figcaption>
</figure>
</div>

</section>

<section class="section">

## Video script & production plan

The full script for a 7-9 minute YouTube video demoing FluxBot. Includes shot lists, voiceover lines, pre-production checklist, and post-production notes. See [SCRIPT.md](https://github.com/MaanavD/bfl-launch-kit/blob/main/SCRIPT.md) in the repo for the complete document.

<div class="script-timeline">
<div class="script-beat">
<span class="beat-time">0:00 - 0:50</span>
<div>

**The Hook** — Cold open: a `/generate` command typed in Discord, smash cut to a stunning FLUX output. Quick montage of 5 different styles landing in chat.

</div>
</div>
<div class="script-beat">
<span class="beat-time">0:50 - 4:00</span>
<div>

**The Workflow** — Live demos of `/generate`, `/setstyle`, and `/restyle`. Side-by-side style comparison. Four restyle examples targeting different communities.

</div>
</div>
<div class="script-beat">
<span class="beat-time">4:00 - 5:45</span>
<div>

**The Setup** — Architecture overview (3 boxes, 2 arrows). API key + cost breakdown ($0.03/image). "Ready to try it yourself?" CTA card on screen during sign-up walkthrough. Quick mention that the bot is fully customizable for your workflow — no code on screen, just VO over Discord UI.

</div>
</div>
<div class="script-beat">
<span class="beat-time">5:45 - 6:45</span>
<div>

**Speed Demo + Community** — Klein speed demo with timer overlay (0.8s). Community montage — multiple users generating with different styles, emoji reactions, alive server energy.

</div>
</div>
<div class="script-beat">
<span class="beat-time">6:45 - 7:30</span>
<div>

**Call to Action** — Landing page flow: Add to Discord, set key, first generation in under a minute. GitHub link + close.

</div>
</div>
</div>

</section>
