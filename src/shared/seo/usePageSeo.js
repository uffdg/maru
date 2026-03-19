import { useEffect } from 'react';
import { siteMeta } from './siteMeta';

const ensureMetaTag = (selector, attributes) => {
  let tag = document.head.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    document.head.appendChild(tag);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    tag.setAttribute(key, value);
  });

  return tag;
};

const ensureCanonical = () => {
  let tag = document.head.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }

  return tag;
};

export const usePageSeo = ({
  title,
  description,
  path = '/',
  image = siteMeta.defaultImage,
}) => {
  useEffect(() => {
    const pageTitle = title ? `${title} · ${siteMeta.siteName}` : siteMeta.title;
    const pageDescription = description || siteMeta.description;
    const canonicalUrl = new URL(path, siteMeta.siteUrl).toString();
    const imageUrl = new URL(image, siteMeta.siteUrl).toString();

    document.title = pageTitle;

    ensureMetaTag('meta[name="description"]', {
      name: 'description',
      content: pageDescription,
    });
    ensureMetaTag('meta[property="og:title"]', {
      property: 'og:title',
      content: pageTitle,
    });
    ensureMetaTag('meta[property="og:description"]', {
      property: 'og:description',
      content: pageDescription,
    });
    ensureMetaTag('meta[property="og:type"]', {
      property: 'og:type',
      content: 'website',
    });
    ensureMetaTag('meta[property="og:url"]', {
      property: 'og:url',
      content: canonicalUrl,
    });
    ensureMetaTag('meta[property="og:image"]', {
      property: 'og:image',
      content: imageUrl,
    });
    ensureMetaTag('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    ensureMetaTag('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: pageTitle,
    });
    ensureMetaTag('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: pageDescription,
    });
    ensureMetaTag('meta[name="twitter:image"]', {
      name: 'twitter:image',
      content: imageUrl,
    });

    const canonical = ensureCanonical();
    canonical.setAttribute('href', canonicalUrl);
  }, [description, image, path, title]);
};
