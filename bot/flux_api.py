import os
import asyncio
import logging
from io import BytesIO

import aiohttp

log = logging.getLogger("fluxbot.flux_api")

BFL_API_BASE = "https://api.bfl.ai/v1"

# Available models — pro-preview is the default
MODELS = {
    "pro": "flux-2-pro-preview",
    "max": "flux-2-max",
    "klein": "flux-2-klein-9b-preview",
    "flex": "flux-2-flex",
}

DEFAULT_MODEL = "pro"


async def generate_image(
    api_key: str,
    prompt: str,
    *,
    model: str = DEFAULT_MODEL,
    width: int = 1440,
    height: int = 1024,
) -> bytes:
    """Generate an image from a text prompt. Returns image bytes."""
    payload = {
        "prompt": prompt,
        "width": width,
        "height": height,
    }
    return await _submit_and_download(api_key, model, payload)


async def restyle_image(
    api_key: str,
    prompt: str,
    input_image_url: str,
    *,
    model: str = DEFAULT_MODEL,
) -> bytes:
    """Edit/restyle an image using an input image + prompt. Returns image bytes."""
    payload = {
        "prompt": prompt,
        "input_image": input_image_url,
    }
    return await _submit_and_download(api_key, model, payload)


async def _submit_and_download(
    api_key: str,
    model: str,
    payload: dict,
) -> bytes:
    """Submit a generation request, poll for the result, and download the image."""
    endpoint = MODELS.get(model, MODELS[DEFAULT_MODEL])
    url = f"{BFL_API_BASE}/{endpoint}"

    async with aiohttp.ClientSession() as session:
        async with session.post(
            url,
            headers={"x-key": api_key, "Content-Type": "application/json"},
            json=payload,
        ) as resp:
            if resp.status == 402:
                raise ValueError("Out of BFL API credits. Add credits at dashboard.bfl.ai")
            if resp.status == 429:
                raise ValueError("Rate limited — too many active tasks. Wait a moment and try again.")
            if resp.status != 200:
                text = await resp.text()
                raise ValueError(f"API error ({resp.status}): {text}")
            data = await resp.json()

        task_id = data["id"]
        polling_url = data["polling_url"]
        log.info(f"Submitted task {task_id}, polling {polling_url}")

        image_url = await _poll_for_result(session, polling_url, api_key)
        return await _download_image(session, image_url)


async def _poll_for_result(
    session: aiohttp.ClientSession,
    polling_url: str,
    api_key: str,
    timeout: float = 120,
) -> str:
    """Poll until the task is ready. Returns the image sample URL."""
    elapsed = 0.0
    interval = 1.0
    while elapsed < timeout:
        await asyncio.sleep(interval)
        elapsed += interval
        async with session.get(
            polling_url, headers={"x-key": api_key}
        ) as resp:
            data = await resp.json()
        status = data.get("status")
        if status == "Ready":
            return data["result"]["sample"]
        if status in ("Error", "Failed"):
            raise ValueError(f"Generation failed: {data}")
        log.debug(f"Status: {status} ({elapsed:.0f}s)")
    raise TimeoutError("Image generation timed out")


async def _download_image(session: aiohttp.ClientSession, url: str) -> bytes:
    """Download image bytes from a signed delivery URL."""
    async with session.get(url) as resp:
        if resp.status != 200:
            raise ValueError(f"Failed to download image: HTTP {resp.status}")
        return await resp.read()
