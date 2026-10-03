import { BLOG_PATH } from "@/content.config";
import { blogUrl, langFromPostId } from "@/blogs";
import { slugifyStr } from "./slugify";

/**
 * Sub-folders of a post INSIDE its language folder, slugified.
 * src/content/posts/es/encuestas/mi-post.md → ["encuestas"]
 * Folders starting with "_" are ignored (handy for grouping drafts).
 */
function getPostPathSegments(filePath: string | undefined): string[] {
  return (
    filePath
      ?.replace(BLOG_PATH, "")
      .split("/")
      .filter(path => path !== "")
      .slice(1) // drop the language folder (es/, en/): the blog URL replaces it
      .filter(path => !path.startsWith("_"))
      .slice(0, -1) // drop the file name; the slug comes from the id
      .map(segment => slugifyStr(segment)) ?? []
  );
}

function getIdSlug(id: string): string {
  const postId = id.split("/");
  return postId.length > 0 ? String(postId[postId.length - 1]) : id;
}

function getPostSlugPath(id: string, filePath: string | undefined): string {
  return [...getPostPathSegments(filePath), getIdSlug(id)].join("/");
}

/**
 * The post's path INSIDE its blog, used as the `[...slug]` route param.
 * e.g. "encuestas/mi-post" — no blog prefix, no leading slash.
 */
export function getPostSlug(id: string, filePath: string | undefined): string {
  return getPostSlugPath(id, filePath);
}

/**
 * Full root-relative URL of a post, for `<a href>` and RSS.
 * The blog comes from the post's language folder.
 * e.g. "/datos-y-relatos/encuestas/mi-post/"
 */
export function getPostUrl(id: string, filePath: string | undefined): string {
  return blogUrl(langFromPostId(id), `${getPostSlugPath(id, filePath)}/`);
}
