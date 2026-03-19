export const splitLines = (value = '') => value.split('\n');

export const titleCase = (value = '') =>
  value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

export const toLocaleDate = (date, lang) =>
  new Date(date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
