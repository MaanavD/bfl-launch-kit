"use client";

import { useMemo } from "react";
import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import rawContent from "../../content/video.md";

const FALLBACK_YOUTUBE_VIDEO_ID = "0l8u5ZjKKxA";

function resolveYouTubeVideoId(value?: string) {
  if (!value) return FALLBACK_YOUTUBE_VIDEO_ID;

  const trimmed = value.trim();
  if (/^[\w-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  try {
    const url = new URL(trimmed);
    if (url.hostname.includes("youtu.be")) {
      const shortId = url.pathname.replace(/^\/+/, "");
      return /^[\w-]{11}$/.test(shortId) ? shortId : FALLBACK_YOUTUBE_VIDEO_ID;
    }

    const candidate =
      url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).pop();
    return candidate && /^[\w-]{11}$/.test(candidate)
      ? candidate
      : FALLBACK_YOUTUBE_VIDEO_ID;
  } catch {
    return FALLBACK_YOUTUBE_VIDEO_ID;
  }
}

const YOUTUBE_VIDEO_ID = resolveYouTubeVideoId(
  process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID ?? process.env.NEXT_PUBLIC_YOUTUBE_URL
);

export default function VideoTab() {
  const content = useMemo(() => {
    return rawContent.replace(/%%YOUTUBE_VIDEO_ID%%/g, YOUTUBE_VIDEO_ID);
  }, []);

  return (
    <>
      <AuthorNote label="Author's Note" heading="Reaching the audience a tutorial can't">
        <p>
          A written tutorial converts developers who learn by reading. The video captures
          everyone else — the YouTube audience, the social scrollers, the person who
          won&apos;t clone a repo but will watch a demo and think &quot;I want that in my
          server.&quot; FluxBot gives them a zero-friction way to
          make their first generation without touching a terminal.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}
