"""
FluxBot Video - Pre-generate all demo images.

Usage:
    export BFL_API_KEY="your_key_here"
    python generate_assets.py

Images are saved to ./assets/ with numbered filenames.
Estimated cost: ~$3-5 total.
"""

import os
import sys
import time
import json
import requests
from pathlib import Path

API_BASE = "https://api.bfl.ai/v1"
API_KEY = os.getenv("BFL_API_KEY")

if not API_KEY:
    print("ERROR: Set BFL_API_KEY environment variable first.")
    print("  export BFL_API_KEY='your_key_here'")
    sys.exit(1)

ASSETS_DIR = Path("assets")
ASSETS_DIR.mkdir(exist_ok=True)

# ─── Image definitions ───────────────────────────────────────────────
# (number, model, width, height, prompt, filename)
IMAGES = [
    # HOOK - Hero images (max for quality)
    (1, "flux-2-max", 1440, 1024,
     "A cyberpunk samurai standing motionless in heavy rain on a Tokyo street at night, neon signs reflecting off wet pavement in pink and blue, cinematic depth of field, hyper-detailed armor with glowing accents, volumetric fog, 8k photograph",
     "01_hook_hero_samurai"),

    # HOOK - Montage (pro for speed, shown briefly)
    (2, "flux-2-pro-preview", 1024, 1024,
     "Oil painting of a golden retriever wearing a tiny crown, sitting on a velvet throne, renaissance lighting, gallery quality",
     "02_montage_dog_throne"),

    (3, "flux-2-pro-preview", 1024, 1440,
     'Music festival poster for "NEON GARDEN 2026" with abstract geometric shapes, holographic gradients, bold sans-serif typography, dark background',
     "03_montage_festival_poster"),

    (4, "flux-2-pro-preview", 1024, 1024,
     "Isometric pixel art of a cozy coffee shop interior with warm lighting, tiny characters, and a cat sleeping on the counter",
     "04_montage_pixel_coffee"),

    (5, "flux-2-pro-preview", 1440, 1024,
     "Professional product photograph of a matte black wireless headphone floating against a clean white background, studio lighting, commercial quality",
     "05_montage_headphone_product"),

    (6, "flux-2-pro-preview", 1024, 1440,
     "Anime-style portrait of a female space pilot in a cockpit, stars visible through the windshield, dramatic side lighting, detailed mechanical controls",
     "06_montage_anime_pilot"),

    # WORKFLOW - /generate demo (max - held fullscreen 3s)
    (7, "flux-2-max", 1440, 1024,
     "A massive dragon perched on top of a modern glass skyscraper during a violent thunderstorm, a bolt of lightning illuminating its iridescent scales, rain streaking past, cinematic ultra wide angle shot from below, dramatic clouds, photorealistic, 8k",
     "07_generate_dragon"),

    # WORKFLOW - Style comparison (max - shown side-by-side, key demo)
    (8, "flux-2-max", 1024, 1024,
     "A lone knight in heavy armor crossing an ancient crumbling stone bridge over a deep misty chasm, dark fantasy oil painting style, dramatic chiaroscuro lighting, muted earth tones, textured brushstrokes visible, atmospheric perspective, moody and cinematic",
     "08_style_knight_fantasy"),

    (9, "flux-2-max", 1024, 1024,
     "A lone knight crossing a simple stone bridge over a chasm, clean vector illustration style, flat design, pastel color palette, minimal shapes, geometric, modern graphic design aesthetic",
     "09_style_knight_vector"),

    # WORKFLOW - Restyle hero (max - held fullscreen 3s)
    # NOTE: #10-14 are IMAGE-TO-IMAGE - you need source photos.
    # Run these separately with your own photos using the restyle endpoint.
    # Prompts listed here for reference.

    # 10: Desk/room photo → Dutch Golden Age
    # INPUT: Your actual desk photo
    # PROMPT: "A detailed oil painting in the style of the Dutch Golden Age masters, dramatic candlelight illumination, rich warm colors, visible brushstrokes, gallery quality, museum piece"

    # 11: Cosplay photo → Anime
    # INPUT: A casual cosplay photo
    # PROMPT: "High-quality anime cel illustration, vibrant colors, sharp linework, studio quality anime key visual"

    # 12: Band rehearsal → Tour poster
    # INPUT: A grainy rehearsal photo of a band
    # PROMPT: 'Concert tour poster, bold typography reading "WORLD TOUR 2026", dramatic stage lighting, graphic design aesthetic'

    # 13: Game screenshot → Concept art
    # INPUT: A screenshot from a game
    # PROMPT: "Epic cinematic concept art, dramatic volumetric lighting, matte painting quality, 8k, movie poster composition"

    # 14: Kitchen product photo → E-commerce
    # INPUT: A flat lay product photo on a kitchen table
    # PROMPT: "Professional product photograph, clean white background, studio lighting, commercial e-commerce quality"

    # SETUP - Architecture diagram (pro)
    (15, "flux-2-pro-preview", 1440, 810,
     'Minimal technical architecture diagram on a dark navy background, three rounded rectangles connected by glowing arrows, clean sans-serif labels reading "Discord", "Bot", "FLUX API", modern tech aesthetic, flat design, subtle grid pattern in background',
     "15_architecture_diagram"),

    # SETUP - Klein speed demo (klein - that's the point)
    (16, "flux-2-klein-9b-preview", 1024, 1024,
     "A lighthouse standing on a rocky cliff in a violent storm, massive waves crashing, lightning splitting the sky, dramatic moody atmosphere, rain, cinematic",
     "16_klein_lighthouse"),

    # THUMBNAIL (max - this gets millions of impressions)
    (17, "flux-2-max", 1920, 1080,
     "A hyper-detailed cinematic photograph of a fantasy knight standing on a cliff overlooking a glowing city at sunset, volumetric lighting, 8k, dramatic clouds, ultra wide angle",
     "17_thumbnail_knight"),

    # COMMUNITY MONTAGE (pro - shown briefly)
    (18, "flux-2-pro-preview", 1024, 1024,
     "Portrait of an elf ranger in a dark enchanted forest, dramatic rim lighting, detailed leather armor with intricate leaf motifs, cinematic fantasy art, D&D character art style",
     "18_community_dnd_elf"),

    (19, "flux-2-pro-preview", 1024, 1024,
     "A orange tabby cat wearing a tiny black business suit and red tie, standing at a podium giving a TED talk to an audience of cats, conference stage lighting, funny and detailed, photorealistic",
     "19_community_cat_ted"),

    (20, "flux-2-pro-preview", 1920, 1080,
     "Breathtaking anime-style mountain landscape at golden hour, snow-capped peaks reflected in a crystal clear lake, cherry blossom trees in foreground, Studio Ghibli inspired, wallpaper quality, ultra wide",
     "20_community_anime_landscape"),

    (21, "flux-2-pro-preview", 1024, 1024,
     "Minimalist wolf head logo for an esports team, geometric angular design, black and gold color scheme, clean vector style, professional branding, dark background",
     "21_community_wolf_logo"),

    (22, "flux-2-pro-preview", 1024, 1024,
     "Whimsical birthday cake with five tiers, pastel rainbow frosting, confetti and sparkles floating around it, kawaii style, cute face on the cake, soft studio lighting, celebration",
     "22_community_birthday"),
]


def submit_request(model: str, prompt: str, width: int, height: int) -> dict:
    """Submit a generation request and return the response with polling_url."""
    url = f"{API_BASE}/{model}"
    payload = {"prompt": prompt, "width": width, "height": height}
    resp = requests.post(
        url,
        headers={"x-key": API_KEY, "Content-Type": "application/json"},
        json=payload,
    )
    if resp.status_code != 200:
        raise Exception(f"Submit failed ({resp.status_code}): {resp.text}")
    return resp.json()


def poll_for_result(polling_url: str, timeout: int = 300) -> str:
    """Poll until ready. Returns the image URL."""
    elapsed = 0
    while elapsed < timeout:
        time.sleep(2)
        elapsed += 2
        resp = requests.get(polling_url, headers={"x-key": API_KEY})
        data = resp.json()
        status = data.get("status", "Unknown")
        if status == "Ready":
            return data["result"]["sample"]
        if status in ("Error", "Failed"):
            raise Exception(f"Generation failed: {data}")
        print(f"    Status: {status} ({elapsed}s)", end="\r")
    raise TimeoutError("Generation timed out")


def download_image(url: str, filepath: Path):
    """Download image from signed URL."""
    resp = requests.get(url)
    if resp.status_code != 200:
        raise Exception(f"Download failed: {resp.status_code}")
    filepath.write_bytes(resp.content)


def main():
    print(f"🎬 Generating {len(IMAGES)} images for FluxBot video")
    print(f"   Saving to: {ASSETS_DIR.resolve()}\n")

    total_cost = 0.0

    for num, model, w, h, prompt, filename in IMAGES:
        outpath = ASSETS_DIR / f"{filename}.jpg"

        if outpath.exists():
            print(f"  [{num:02d}] SKIP (already exists): {filename}")
            continue

        print(f"  [{num:02d}] Generating: {filename}")
        print(f"       Model: {model} | Size: {w}x{h}")
        print(f"       Prompt: {prompt[:80]}...")

        try:
            data = submit_request(model, prompt, w, h)
            polling_url = data["polling_url"]
            cost = data.get("cost", 0)
            total_cost += cost

            image_url = poll_for_result(polling_url)
            download_image(image_url, outpath)
            print(f"       ✅ Saved! (cost: {cost} credits)")
        except Exception as e:
            print(f"       ❌ FAILED: {e}")

        print()

    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print(f"  Done! Total estimated cost: {total_cost:.2f} credits")
    print(f"  Images saved to: {ASSETS_DIR.resolve()}")
    print()
    print("  ⚠️  REMINDER: Images #10-14 are IMAGE-TO-IMAGE restyles.")
    print("     You need to run those separately with your own source photos.")
    print("     Use the bot's /restyle command or the API directly.")
    print(f"━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")


if __name__ == "__main__":
    main()
