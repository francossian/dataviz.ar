import { getCollection } from "astro:content";
import { langFromPostId, type Lang } from "@/blogs";
import { getSortedPosts } from "./getSortedPosts";

/**
 * Published posts of ONE blog, newest first. Every post goes through
 * langFromPostId, so a post filed outside es/ or en/ fails the build here.
 */
export async function getBlogPosts(lang: Lang) {
  const posts = await getCollection("posts");
  return getSortedPosts(posts.filter(post => langFromPostId(post.id) === lang));
}
