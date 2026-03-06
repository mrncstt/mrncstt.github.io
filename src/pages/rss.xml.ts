import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts'))
    .filter(p => p.data.listed !== false)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: 'Mariana Costa',
    description: 'Blog by Mariana Costa. Data engineering, visualization, and learning.',
    site: context.site!,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description || '',
      link: `/posts/${post.slug}/`,
    })),
  });
}
