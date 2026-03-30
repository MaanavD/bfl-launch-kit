"use client";

import { useMemo, useState } from "react";
import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import rawContent from "../../content/video.md";

const DISCORD_CLIENT_ID =
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? "YOUR_CLIENT_ID";
const DISCORD_INVITE = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=2147534848&scope=bot%20applications.commands`;
const GITHUB_REPO = "https://github.com/MaanavD/bfl-launch-kit/tree/main/bot";

export default function VideoTab() {
  const [bonusOpen, setBonusOpen] = useState(false);

  const [mainContent, bonusContent] = useMemo(() => {
    const interpolated = rawContent
      .replace(/%%DISCORD_INVITE%%/g, DISCORD_INVITE)
      .replace(/%%GITHUB_REPO%%/g, GITHUB_REPO);
    const parts = interpolated.split("<!-- BONUS -->");
    return [parts[0], parts[1] || ""];
  }, []);

  return (
    <div className="video-tab">
      <AuthorNote label="Author's Note" heading="Reaching the audience a tutorial can't">
        <p>
          A written tutorial converts developers who learn by reading. This video captures
          everyone else — the YouTube audience, the social scrollers, the person who
          won&apos;t clone a repo but will watch a demo and think &quot;I want that in my
          server.&quot; It&apos;s the piece of the adoption funnel that gives FLUX.2 reach beyond
          the developer audience, and FluxBot gives them a zero-friction way to
          make their first generation without touching a terminal.
        </p>
      </AuthorNote>

      <MarkdownArticle content={mainContent} className="video-tab-main" />

      <div className="bonus-dropdown">
        <button
          className="bonus-toggle"
          onClick={() => setBonusOpen(!bonusOpen)}
          aria-expanded={bonusOpen}
        >
          <span className="bonus-toggle-icon">{bonusOpen ? "\u25BC" : "\u25B6"}</span>
          <span>
            <strong>Bonus for reviewer</strong>
            <span className="bonus-toggle-sub">Video script, FLUX.2 assets, and production notes</span>
          </span>
        </button>
        {bonusOpen && (
          <MarkdownArticle content={bonusContent} className="bonus-content" />
        )}
      </div>
    </div>
  );
}
