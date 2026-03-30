import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/strategy.md";

export default function StrategyTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Adoption is the problem. This is my plan to fix it.">
        <p>
          BFL can get attention, and the last launch proved that. The hard part is
          converting sign-ups into developers who actually build on the platform.
          That's the specific problem I'm here to solve, and every deliverable
          below is designed around it.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}
