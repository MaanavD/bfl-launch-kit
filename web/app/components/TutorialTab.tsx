import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/tutorial.md";

export default function TutorialTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Zero to working CLI in 15 minutes">
        <p>
          A written tutorial that takes a developer from no FLUX experience to a working
          YouTube thumbnail generator. <strong>Audience:</strong> developers exploring the
          FLUX API for the first time. The kind of person who signed up on launch day
          but never made their first API call.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}

