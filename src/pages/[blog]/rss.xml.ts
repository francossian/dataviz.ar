import type { APIContext } from "astro";
import rss from "@astrojs/rss";
import { getBlogPosts } from "@/utils/getBlogPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { BLOG_LIST, type Blog } from "@/blogs";
import config from "@/config";

// One feed per blog (/datos-y-relatos/rss.xml, /data-stories/rss.xml), so
// a reader who follows the English blog never gets Spanish posts.
export function getStaticPaths() {
  return BLOG_LIST.map(blog => ({
    params: { blog: blog.slug },
    props: { blog },
  }));
}

export async function GET({ props }: APIContext) {
  const { blog } = props as { blog: Blog };
  const posts = await getBlogPosts(blog.lang);

  return rss({
    title: `${blog.title} — ${config.site.title}`,
    description: blog.description,
    site: config.site.url,
    // RSS 2.0 <language>, so feed readers know what they're showing
    customData: `<language>${blog.lang}</language>`,
    items: posts.map(({ data, id, filePath }) => ({
      link: getPostUrl(id, filePath),
      title: data.title,
      description: data.description,
      pubDate: new Date(data.modDatetime ?? data.pubDatetime),
    })),
  });
}
