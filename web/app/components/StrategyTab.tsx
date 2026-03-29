import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/strategy.md";

export default function StrategyTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="The launch playbook">
        <p>
          This is the strategic layer: a one-page plan for how all the launch-day content fits together
          and what I'd build next with more time. <strong>Audience:</strong> the BFL team evaluating
          how I think about developer adoption beyond individual pieces of content.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}
