import type { CollectionEntry } from 'astro:content';

export function getRelatedPosts(
  current: CollectionEntry<'posts'>,
  allPosts: CollectionEntry<'posts'>[],
  limit = 3,
) {
  const currentTags = new Set(current.data.tags);

  return allPosts
    .filter(p => p.slug !== current.slug && p.data.listed !== false)
    .map(p => ({
      slug: p.slug,
      title: p.data.title,
      score: p.data.tags.filter(t => currentTags.has(t)).length,
    }))
    .filter(p => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
