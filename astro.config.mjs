import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

export default defineConfig({
  site: 'https://mrncstt.github.io',
  prefetch: {
    defaultStrategy: 'hover',
  },
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark-dimmed',
      },
      defaultColor: false,
    },
  },
});
