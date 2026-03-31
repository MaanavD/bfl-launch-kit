"use client";

import { useMemo } from "react";
import MarkdownArticle from "./MarkdownArticle";
import rawContent from "../../content/bot.md";

const DISCORD_CLIENT_ID =
  process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID ?? "YOUR_CLIENT_ID";
const DISCORD_INVITE = `https://discord.com/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=2147534848&scope=bot%20applications.commands`;
const GITHUB_REPO = "https://github.com/MaanavD/bfl-launch-kit/tree/main/bot";

export default function BotTab() {
  const content = useMemo(() => {
    return rawContent
      .replace(/%%DISCORD_INVITE%%/g, DISCORD_INVITE)
      .replace(/%%GITHUB_REPO%%/g, GITHUB_REPO);
  }, []);

  return (
    <div className="video-tab">
      <MarkdownArticle content={content} className="video-tab-main" />
    </div>
  );
}
