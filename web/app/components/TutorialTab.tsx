import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/tutorial.md";

export default function TutorialTab() {
  return <MarkdownArticle content={content} />;
}

