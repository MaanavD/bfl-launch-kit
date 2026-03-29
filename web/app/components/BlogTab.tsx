import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/blog.md";

export default function BlogTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Launch-day announcement post">
        <p>
          A blog post for the BFL website announcing the new FLUX model to a developer audience.
          Designed to convert readers into sign-ups: what's new, why it matters, and a clear
          path to getting started. <strong>Audience:</strong> the broader developer community,
          from AI-curious builders to teams already shipping with image generation.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}
