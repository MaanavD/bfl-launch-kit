import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/blog.md";

export default function BlogTab() {
  return <MarkdownArticle content={content} />;
}
