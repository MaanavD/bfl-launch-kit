import AuthorNote from "./AuthorNote";

const DISCORD_CLIENT_ID =
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? "YOUR_CLIENT_ID";
const DISCORD_INVITE = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=2147534848&scope=bot%20applications.commands`;
const GITHUB_REPO = "https://github.com/MaanavD/bfl-launch-kit/tree/main/bot";

export default function VideoTab() {
  return (
    <article className="video-tab">
      <AuthorNote label="Author's Note" heading="Reaching the audience a tutorial can't">
        <p>
          A written tutorial converts developers who learn by reading. This video captures
          everyone else - the YouTube audience, the social scrollers, the developer who
          won't clone a repo but will watch a 7-minute demo and think "I want that in my
          server." It's the piece of the adoption funnel that gives FLUX.2 reach beyond
          the developer blog audience, and FluxBot gives them a zero-friction way to
          make their first generation without touching a terminal.
        </p>
      </AuthorNote>

      {/* ── FluxBot Landing ── */}
      <section className="hero video-hero">
        <div className="hero-text">
          <p className="hero-label">
            Video Tutorial &middot; Open-source Discord bot &middot; Powered by
            FLUX.2
          </p>
          <h1>
            AI image generation,
            <br />
            right in Discord
          </h1>
          <p className="hero-body">
            A 7-9 minute video where I build and demo FluxBot - a
            Discord bot that puts FLUX.2 image generation directly in your
            server. Type a prompt, get an image back in seconds. Open
            source, ready to fork.
          </p>
          <div className="hero-actions">
            <a
              href={DISCORD_INVITE}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Add to Discord
            </a>
            <a
              href={GITHUB_REPO}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View source
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="/assets/17_thumbnail_knight.jpg"
            alt="FLUX-generated fantasy knight overlooking a glowing city"
            className="hero-image"
          />
        </div>
      </section>

      {/* ── Image Gallery ── */}
      <section className="section" id="gallery">
        <h2>FLUX.2 assets generated for the video</h2>
        <p className="section-desc">
          Every image below was generated with FLUX.2 via the BFL API. I used
          these as B-roll throughout the video. Total cost:{" "}
          <strong>$1.41</strong> for 47 images - about 3 cents each.
        </p>

        <h3>Hook Montage</h3>
        <div className="image-grid image-grid--3">
          <figure>
            <img
              src="/assets/01_hook_hero_samurai.jpg"
              alt="Cyberpunk samurai in rain"
              loading="lazy"
            />
            <figcaption>Cyberpunk samurai, the hook hero image</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/04_montage_pixel_coffee.jpg"
              alt="Pixel art coffee shop"
              loading="lazy"
            />
            <figcaption>Isometric pixel art coffee shop</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/05_montage_headphone_product.jpg"
              alt="Product photo headphones"
              loading="lazy"
            />
            <figcaption>Product photo: matte black headphones</figcaption>
          </figure>
        </div>

        <div className="image-grid image-grid--3">
          <figure>
            <img
              src="/assets/06_montage_anime_pilot.jpg"
              alt="Anime space pilot"
              loading="lazy"
            />
            <figcaption>Anime space pilot in cockpit</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/02_montage_dog_throne.jpg"
              alt="Golden retriever on throne"
              loading="lazy"
            />
            <figcaption>Royal portrait: golden retriever</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/03_montage_festival_poster.jpg"
              alt="Festival poster"
              loading="lazy"
            />
            <figcaption>Neon Garden 2026 festival poster</figcaption>
          </figure>
        </div>

        <h3>Style Comparison</h3>
        <p className="section-desc">
          Same prompt (&ldquo;a lone knight crossing a stone bridge over a
          chasm&rdquo;), two different user styles. This is the key moment
          in the video - proof that personal styles change everything.
        </p>
        <div className="image-grid image-grid--2">
          <figure>
            <img
              src="/assets/08_style_knight_fantasy.jpg"
              alt="Dark fantasy oil painting style"
              loading="lazy"
            />
            <figcaption>
              User A&apos;s style: dark fantasy oil painting
            </figcaption>
          </figure>
          <figure>
            <img
              src="/assets/09_style_knight_vector.jpg"
              alt="Clean vector pastel style"
              loading="lazy"
            />
            <figcaption>
              User B&apos;s style: clean vector, pastel minimal
            </figcaption>
          </figure>
        </div>

        <h3>Workflow Demos</h3>
        <div className="image-grid image-grid--3">
          <figure>
            <img
              src="/assets/07_generate_dragon.jpg"
              alt="Dragon on skyscraper"
              loading="lazy"
            />
            <figcaption>/generate demo: dragon in thunderstorm</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/16_klein_lighthouse.jpg"
              alt="Lighthouse in storm"
              loading="lazy"
            />
            <figcaption>Klein speed demo: 0.8s generation</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/15_architecture_diagram.jpg"
              alt="Architecture diagram"
              loading="lazy"
            />
            <figcaption>Architecture diagram B-roll</figcaption>
          </figure>
        </div>

        <h3>Community Montage</h3>
        <p className="section-desc">
          Closing montage showing it&apos;s not just one person using the bot -
          it&apos;s a whole server generating together.
        </p>
        <div className="image-grid image-grid--4">
          <figure>
            <img
              src="/assets/18_community_dnd_elf.jpg"
              alt="D&D elf ranger portrait"
              loading="lazy"
            />
            <figcaption>D&amp;D elf ranger</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/19_community_cat_ted.jpg"
              alt="Cat giving TED talk"
              loading="lazy"
            />
            <figcaption>Cat TED talk</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/20_community_anime_landscape.jpg"
              alt="Anime landscape"
              loading="lazy"
            />
            <figcaption>Anime landscape</figcaption>
          </figure>
          <figure>
            <img
              src="/assets/21_community_wolf_logo.jpg"
              alt="Wolf esports logo"
              loading="lazy"
            />
            <figcaption>Esports wolf logo</figcaption>
          </figure>
        </div>
        <div className="image-grid image-grid--2" style={{ maxWidth: 480 }}>
          <figure>
            <img
              src="/assets/22_community_birthday.jpg"
              alt="Birthday cake kawaii"
              loading="lazy"
            />
            <figcaption>Kawaii birthday cake</figcaption>
          </figure>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="section" id="features">
        <h2>What FluxBot does</h2>
        <div className="feature-list">
          <div className="feature">
            <h3>Text to image</h3>
            <p>
              Describe what you want. FLUX.2 handles photorealism,
              illustrations, concept art - whatever the prompt calls for.
            </p>
          </div>
          <div className="feature">
            <h3>Restyle existing images</h3>
            <p>
              Upload a photo and transform it. A phone selfie becomes anime.
              A desk snapshot becomes a Vermeer painting. You get the idea.
            </p>
          </div>
          <div className="feature">
            <h3>Personal style presets</h3>
            <p>
              Each user saves their own style. Same prompt, different people,
              totally different outputs.
            </p>
          </div>
          <div className="feature">
            <h3>Multiple models</h3>
            <p>
              Switch between Pro, Max, Klein, or Flex per generation.
              Trade off speed vs. quality depending on what you need.
            </p>
          </div>
          <div className="feature">
            <h3>Bring your own key</h3>
            <p>
              Each server sets its own BFL API key. You control usage and
              costs. Users can also set personal keys if they prefer.
            </p>
          </div>
          <div className="feature">
            <h3>Fully open source</h3>
            <p>
              Fork it, modify it, self-host it. MIT licensed and designed to
              be extended.
            </p>
          </div>
        </div>
      </section>

      {/* ── Commands ── */}
      <section className="section" id="commands">
        <h2>Commands</h2>
        <dl className="command-list">
          <div className="command-entry">
            <dt>/generate</dt>
            <dd>Create an image from a text prompt. Optionally choose a model.</dd>
          </div>
          <div className="command-entry">
            <dt>/restyle</dt>
            <dd>Upload an image and transform it with a new style.</dd>
          </div>
          <div className="command-entry">
            <dt>/setstyle</dt>
            <dd>Save a personal style applied to all your generations.</dd>
          </div>
          <div className="command-entry">
            <dt>/mystyle</dt>
            <dd>View your currently saved style.</dd>
          </div>
          <div className="command-entry">
            <dt>/clearstyle</dt>
            <dd>Reset to default.</dd>
          </div>
          <div className="command-entry">
            <dt>/setkey</dt>
            <dd>Admin only. Set a shared BFL API key for the whole server.</dd>
          </div>
          <div className="command-entry">
            <dt>/mykey</dt>
            <dd>
              Set your own personal BFL API key (overrides the server key for
              you).
            </dd>
          </div>
        </dl>
      </section>

      {/* ── Setup ── */}
      <section className="section" id="setup">
        <h2>Get started</h2>
        <ol className="steps">
          <li>
            <div>
              <strong>Add the bot</strong>
              <p>
                Click &ldquo;Add to Discord&rdquo; above and select your
                server.
              </p>
            </div>
          </li>
          <li>
            <div>
              <strong>Set your API key</strong>
              <p>
                Grab a key at{" "}
                <a
                  href="https://api.bfl.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  api.bfl.ai
                </a>
                , then run <code>/setkey</code> in your server.
              </p>
            </div>
          </li>
          <li>
            <div>
              <strong>Generate</strong>
              <p>
                Type <code>/generate</code> and describe what you want.
                That&apos;s it.
              </p>
            </div>
          </li>
        </ol>
      </section>
    </article>
  );
}
