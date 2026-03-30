import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/tutorial.md";

export default function TutorialTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Closing the activation gap">
        <p>
          This tutorial exists to turn a sign-up who hasn't generated anything yet into an activated user.
          They need a working result on their machine in under
          15 minutes - not a concept explainer, not a docs walkthrough, but a real use case
          that makes them think "I should build something with this."
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}

