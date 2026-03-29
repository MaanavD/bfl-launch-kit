import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/strategy.md";

export default function StrategyTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="The launch playbook">
        <p>
          A one-page plan for how all the launch-day content fits together.
          Each deliverable targets a different moment: the <strong>blog post</strong> gets
          attention (HN, Twitter/X, subreddits), the <strong>tutorial</strong> drives the first
          API call, and the <strong>video</strong> shows-don't-tells for the audience that won't
          clone a repo. The strategy below covers sequencing, conversion mechanics, and distribution.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}
