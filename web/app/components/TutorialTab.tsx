import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/tutorial.md";

export default function TutorialTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Closing the activation gap">
        <p>
          This tutorial exists for one reason: to turn a sign-up into an activated user.
          The target reader is someone who grabbed an API key on launch day but hasn't
          generated anything yet. They need a working result on their machine in under
          15 minutes - not a concept explainer, not a docs walkthrough, but a real tool
          that makes them think "I should build something with this."
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}

