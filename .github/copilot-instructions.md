# BFL FLUX.2 Launch Kit - Project Context

This workspace contains all deliverables for the **Developer Relations Engineer take-home case study at Black Forest Labs**. Every piece of content, code, and documentation here serves a single goal: producing launch-day material that maximizes FLUX adoption across the entire ecosystem.

## The Brief

A new FLUX model drops in 2 weeks. The last launch drove tens of thousands of sign-ups day one, but many never made their first API call. Most FLUX usage today runs through third-party providers (Replicate, Fal, etc.) or self-hosted open weights - platform capture on BFL's own API is small.

The job: produce content that's ready for launch day and maximizes adoption across BFL's API, partners, open-source community, and beyond.

## Deliverables

All three are required, plus a strategy note:

1. **Written tutorial** - Build something with the [FLUX API](https://docs.bfl.ai/). Zero to working result in under 15 min. Code must work, writing must be publish-ready.
2. **Video tutorial (5-10 min)** - Walk through a real use case of FLUX. Screen share, talk through it, make it something BFL would actually publish on their YouTube.
3. **Launch blog post** - Announce the new model to a developer audience. What matters, what's new, how to get started. Must convert readers into sign-ups.
4. **Strategy note (~one page)** - How these pieces fit into a broader launch-week plan, what else you'd want ready on day zero with more time, and how to think about the launch beyond BFL's own channels.

## Evaluation Criteria

BFL is looking for:
- **Clarity** - Easy to follow, well-structured, no ambiguity
- **Creativity** - Fresh angles, not generic developer content
- **Taste** - Production quality; work they'd actually ship tomorrow
- Content that makes developers stop scrolling and converts readers into sign-ups
- Tutorials that get developers from zero to a working result

## Workspace Structure

| Folder | What it is |
|--------|-----------|
| `web/` | Next.js site presenting all four deliverables |
| `thumbnail-generator/` | CLI tool built in the written tutorial |
| `pipeline/` | Express server for automated thumbnail + YouTube publishing |
| `bot/` | FluxBot - Discord bot from the video tutorial |
| `assets/` | FLUX.2-generated images for video B-roll |
| `examples/` | Sample headshot and outputs for the thumbnail generator |

Content lives in `web/content/` as markdown files: `tutorial.md`, `blog.md`, `strategy.md`. The video tab is a React component at `web/app/components/VideoTab.tsx`.

## Key Conventions

- **Audience**: Developers - speak technically but accessibly. No hand-holding, no jargon walls.
- **Product**: FLUX.2 by Black Forest Labs (the team behind Stable Diffusion). API docs at https://docs.bfl.ai/. API keys from https://dashboard.bfl.ai.
- **Tone**: Confident, direct, slightly opinionated. Think "senior engineer who's genuinely excited" - not corporate, not try-hard.
- **Code**: Must actually work. Use real API calls, real outputs. No placeholder images or fake responses.
- **Ecosystem framing**: FLUX is bigger than BFL's API alone. Acknowledge Replicate, Fal, ComfyUI, open weights. But make BFL's API the obvious first choice by demonstrating its strengths (quality, speed, simplicity).
- **Conversion focus**: Every piece should naturally funnel toward getting an API key and making a first API call. Reduce friction, don't hard-sell.
