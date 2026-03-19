import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();

const readJson = async (relativePath) => {
  const fullPath = path.join(root, relativePath);
  const raw = await fs.readFile(fullPath, 'utf8');
  return JSON.parse(raw);
};

const validatePosts = (posts) => {
  const seen = new Set();

  posts.forEach((post) => {
    if (seen.has(post.slug)) {
      throw new Error(`Duplicate post slug: ${post.slug}`);
    }

    seen.add(post.slug);

    ['en', 'es'].forEach((lang) => {
      if (!post[lang]?.title || !post[lang]?.excerpt || !Array.isArray(post[lang]?.content)) {
        throw new Error(`Post ${post.slug} is missing required ${lang} fields`);
      }
    });
  });
};

const validateCases = (cases) => {
  const seen = new Set();

  Object.entries(cases).forEach(([slug, item]) => {
    if (seen.has(slug)) {
      throw new Error(`Duplicate case slug: ${slug}`);
    }

    seen.add(slug);

    ['en', 'es'].forEach((lang) => {
      if (!item[lang]?.label || !item[lang]?.title || !item[lang]?.subtitle) {
        throw new Error(`Case ${slug} is missing required ${lang} hero fields`);
      }
    });
  });
};

const main = async () => {
  const [posts, cases] = await Promise.all([
    readJson('src/data/posts.json'),
    readJson('src/data/cases.json'),
  ]);

  validatePosts(posts);
  validateCases(cases);

  console.log(`Content check passed: ${posts.length} posts, ${Object.keys(cases).length} cases.`);
};

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
