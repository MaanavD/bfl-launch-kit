"use client";

import { useMemo } from "react";
import { marked } from "marked";

interface MarkdownArticleProps {
  content: string;
}

export default function MarkdownArticle({ content }: MarkdownArticleProps) {
  const html = useMemo(() => marked(content) as string, [content]);
  return (
    <article
      className="prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
