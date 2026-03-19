import postsData from '../../data/posts.json';
import { siteMeta } from '../../shared/seo/siteMeta';

export const posts = postsData
  .map((post) => ({
    ...post,
    status: 'published',
    tags: [post.label],
    seo: {
      title: post.en.title,
      description: post.en.excerpt,
      path: `/blog/${post.slug}`,
      image: siteMeta.defaultImage,
    },
  }))
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const getPostBySlug = (slug) => posts.find((post) => post.slug === slug);
