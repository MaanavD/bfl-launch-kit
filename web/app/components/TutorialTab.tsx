import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/tutorial.md";

export default function TutorialTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Closing the activation gap">
        <p>
          This tutorial exists to turn a sign-up who has not generated anything yet into
          an activated user. They need a working result on their machine immediately,
          and one they can understand in under 15 minutes - not a press release or docs,
          but a real use case that makes them think &quot;I should build something with this.&quot;
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}

