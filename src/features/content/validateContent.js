import { cases } from './cases';
import { posts } from './posts';

const validateLocalizedFields = (scope, localizedObject, requiredKeys) => {
  ['en', 'es'].forEach((lang) => {
    requiredKeys.forEach((key) => {
      if (!localizedObject[lang]?.[key]) {
        throw new Error(`${scope}: missing ${lang}.${key}`);
      }
    });
  });
};

export const validateContent = () => {
  const postSlugs = new Set();
  const caseSlugs = new Set();

  posts.forEach((post) => {
    if (postSlugs.has(post.slug)) {
      throw new Error(`Duplicate post slug: ${post.slug}`);
    }

    postSlugs.add(post.slug);
    validateLocalizedFields(`post:${post.slug}`, post, ['title', 'excerpt']);

    if (!Array.isArray(post.en.content) || !Array.isArray(post.es.content)) {
      throw new Error(`post:${post.slug}: content must be present in both languages`);
    }
  });

  cases.forEach((item) => {
    if (caseSlugs.has(item.slug)) {
      throw new Error(`Duplicate case slug: ${item.slug}`);
    }

    caseSlugs.add(item.slug);
    validateLocalizedFields(`case:${item.slug}`, item.hero, ['label', 'title', 'subtitle']);

    if (!item.sections.en.length || !item.sections.es.length) {
      throw new Error(`case:${item.slug}: sections missing`);
    }
  });

  return true;
};
