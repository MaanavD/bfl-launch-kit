import AuthorNote from "./AuthorNote";
import MarkdownArticle from "./MarkdownArticle";
import content from "../../content/blog.md";

export default function BlogTab() {
  return (
    <>
      <AuthorNote label="Author's Note" heading="Top of the adoption funnel">
        <p>
          This is the top of the funnel - the piece that turns curiosity into a sign-up.
          But sign-ups alone don't matter if they don't activate. So the post is structured
          to do both: make the case for FLUX.2, then give the reader a clear next action
          (tutorial, bot, or raw API) based on how they like to build. Every section funnels
          toward that first API call.
        </p>
      </AuthorNote>
      <MarkdownArticle content={content} />
    </>
  );
}
