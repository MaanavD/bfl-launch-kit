"use client";

import { useMemo } from "react";
import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import rawContent from "../../content/video.md";

const YOUTUBE_VIDEO_ID =
  process.env.NEXT_PUBLIC_YOUTUBE_VIDEO_ID ?? "YOUR_VIDEO_ID";

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
