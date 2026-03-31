"""
Generate CUT 13 restyle images for FluxBot video.

Creates source photos via text-to-image, then restyles each one.
Saves both source and restyled versions to ./assets/.

Usage:
    export BFL_API_KEY="your_key_here"
    python generate_restyles.py
"""

import os
import sys
import time
import requests
from pathlib import Path

API_BASE = "https://api.bfl.ai/v1"
API_KEY = os.getenv("BFL_API_KEY")

if not API_KEY:
    print("ERROR: Set BFL_API_KEY environment variable first.")
    print('  export BFL_API_KEY="your_key_here"')
    sys.exit(1)

ASSETS_DIR = Path("assets")
ASSETS_DIR.mkdir(exist_ok=True)

# Source photo prompts (realistic photos to use as restyle inputs)
# Then the restyle prompt that transforms each one
RESTYLE_PAIRS = [
    {
        "num": 11,
        "name": "cosplay_anime",
        "source_prompt": "Casual photograph of a young woman in a simple cosplay costume at a convention, candid pose, natural indoor lighting, slightly blurry background with other attendees, shot on phone camera",
        "restyle_prompt": "High-quality anime cel illustration, vibrant colors, sharp linework, studio quality anime key visual",
        "source_model": "flux-2-pro-preview",
        "restyle_model": "flux-2-max",
    },
    {
        "num": 12,
        "name": "band_poster",
        "source_prompt": "Grainy candid photo of a rock band rehearsing in a small garage, drummer and guitarist visible, dim overhead lighting, cluttered equipment, amateur photography look",
        "restyle_prompt": 'Concert tour poster, bold typography reading "WORLD TOUR 2026", dramatic stage lighting, graphic design aesthetic',
        "source_model": "flux-2-pro-preview",
        "restyle_model": "flux-2-max",
    },
    {
        "num": 13,
        "name": "game_conceptart",
        "source_prompt": "Screenshot from a third-person fantasy RPG video game, knight character standing in a medieval courtyard, visible UI elements and health bar, in-engine graphics, 1080p gameplay capture",
        "restyle_prompt": "Epic cinematic concept art, dramatic volumetric lighting, matte painting quality, 8k, movie poster composition",
        "source_model": "flux-2-pro-preview",
        "restyle_model": "flux-2-max",
    },
    {
        "num": 14,
        "name": "kitchen_ecommerce",
        "source_prompt": "Amateur product photo of a ceramic mug and a small potted succulent on a wooden kitchen table, natural window light, slightly cluttered background with kitchen items, shot on phone",
        "restyle_prompt": "Professional product photograph, clean white background, studio lighting, commercial e-commerce quality",
        "source_model": "flux-2-pro-preview",
        "restyle_model": "flux-2-max",
    },
]


def submit_text_to_image(model, prompt, width=1024, height=1024):
    """Submit a text-to-image request."""
    url = f"{API_BASE}/{model}"
    resp = requests.post(
        url,
        headers={"x-key": API_KEY, "Content-Type": "application/json"},
        json={"prompt": prompt, "width": width, "height": height},
    )
    if resp.status_code != 200:
        raise Exception(f"Submit failed ({resp.status_code}): {resp.text}")
    return resp.json()


def submit_restyle(model, prompt, input_image_url):
    """Submit an image-to-image restyle request."""
    url = f"{API_BASE}/{model}"
    resp = requests.post(
        url,
        headers={"x-key": API_KEY, "Content-Type": "application/json"},
        json={"prompt": prompt, "input_image": input_image_url},
    )
    if resp.status_code != 200:
        raise Exception(f"Submit failed ({resp.status_code}): {resp.text}")
    return resp.json()


def poll_for_result(polling_url, timeout=600):
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


def download_image(url, filepath):
    """Download image from signed URL."""
    resp = requests.get(url)
    if resp.status_code != 200:
        raise Exception(f"Download failed: {resp.status_code}")
    filepath.write_bytes(resp.content)


def main():
    print(f"🎬 Generating {len(RESTYLE_PAIRS)} restyle pairs for CUT 13")
    print(f"   Each pair: source photo → restyled version")
    print(f"   Saving to: {ASSETS_DIR.resolve()}\n")

    for pair in RESTYLE_PAIRS:
        num = pair["num"]
        name = pair["name"]
        source_path = ASSETS_DIR / f"{num:02d}_source_{name}.jpg"
        restyle_path = ASSETS_DIR / f"{num:02d}_restyle_{name}.jpg"

        # --- Step 1: Generate source photo ---
        source_exists = source_path.exists()
        restyle_exists = restyle_path.exists()

        if source_exists and restyle_exists:
            print(f"  [{num:02d}] SKIP (both exist): {source_path.name}, {restyle_path.name}\n")
            continue

        if source_exists:
            print(f"  [{num:02d}] Source exists, re-generating to get URL for restyle...")
        else:
            print(f"  [{num:02d}] Generating source: {source_path.name}")

        print(f"       Model: {pair['source_model']}")
        print(f"       Prompt: {pair['source_prompt'][:80]}...")

        try:
            data = submit_text_to_image(
                pair["source_model"], pair["source_prompt"]
            )
            source_image_url = poll_for_result(data["polling_url"])
            print(f"       ✅ Source ready (cost: {data.get('cost', '?')} credits)")

            if not source_exists:
                download_image(source_image_url, source_path)
                print(f"       Saved: {source_path.name}")

        except Exception as e:
            print(f"       ❌ Source FAILED: {e}\n")
            continue

        # --- Step 2: Restyle using the source URL ---
        if restyle_path.exists():
            print(f"  [{num:02d}] Restyle SKIP (exists): {restyle_path.name}\n")
            continue

        print(f"  [{num:02d}] Restyling: {restyle_path.name}")
        print(f"       Model: {pair['restyle_model']}")
        print(f"       Prompt: {pair['restyle_prompt'][:80]}...")

        try:
            data = submit_restyle(
                pair["restyle_model"],
                pair["restyle_prompt"],
                source_image_url,
            )
            restyle_image_url = poll_for_result(data["polling_url"])
            download_image(restyle_image_url, restyle_path)
            print(f"       ✅ Restyle saved! (cost: {data.get('cost', '?')} credits)")
        except Exception as e:
            print(f"       ❌ Restyle FAILED: {e}")

        print()

    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")
    print("  Done! Check ./assets/ for results.")
    print("  Source files:  11-14_source_*.jpg")
    print("  Restyled files: 11-14_restyle_*.jpg")
    print("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━")


if __name__ == "__main__":
    main()
