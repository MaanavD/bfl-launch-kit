"use client";

import { useEffect, useMemo, useState } from "react";
import { marked } from "marked";
import type { Highlighter } from "shiki";

interface MarkdownArticleProps {
  content: string;
}

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = import("shiki").then((shiki) =>
      shiki.createHighlighter({
        themes: ["github-dark"],
        langs: ["javascript", "js", "typescript", "ts", "bash", "shell", "json", "python", "html", "css"],
      })
    );
  }
  return highlighterPromise;
}

export default function MarkdownArticle({ content }: MarkdownArticleProps) {
  const [hl, setHl] = useState<Highlighter | null>(null);

  useEffect(() => {
    getHighlighter().then(setHl);
  }, []);

  const html = useMemo(() => {
    if (!hl) return marked(content) as string;

    const renderer = new marked.Renderer();
    renderer.code = ({ text, lang }: { text: string; lang?: string }) => {
      const language = lang || "";
      const supported = hl.getLoadedLanguages();
      if (language && supported.includes(language as never)) {
        return hl.codeToHtml(text, { lang: language, theme: "github-dark" });
      }
      return `<pre><code>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
    };

    return marked(content, { renderer }) as string;
  }, [content, hl]);

  return (
    <article
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
