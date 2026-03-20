import casesData from '../../data/cases.json';
import pradoMapImage from '../../assets/prado-map.png';
import pradoUiImage from '../../assets/prado-ui.png';
import { caseOrder, caseRegistry } from '../cases/data/caseRegistry';
import { siteMeta } from '../../shared/seo/siteMeta';
import { titleCase } from '../../shared/lib/format';

const neighborhoodImages = {
  comodoro: ['/comodorokm5.png', '/comodorastra.png', '/comodorodiadema.png'],
};

const normalizeMeta = (meta) =>
  Object.entries(meta).map(([key, value], index) => ({
    label: titleCase(key),
    value,
    accent: index === 0,
  }));

const normalizePhaseBody = (phase) => [phase.body, phase.body1, phase.body2].filter(Boolean);

const normalizeCaseSections = (slug, content) => {
  const sections = [];

  sections.push({
    type: 'about',
    theme: 'tint',
    eyebrow: content.about.label,
    title: content.about.heading,
    body: [content.about.body, content.about.body1, content.about.body2].filter(Boolean),
  });

  if (content.challenge) {
    sections.push({
      type: 'split',
      theme: 'plain',
      eyebrow: content.challenge.label,
      title: content.challenge.title,
      body: [content.challenge.body],
    });
  }

  if (content.process) {
    sections.push({
      type: 'split',
      theme: 'plain',
      eyebrow: content.process.label,
      title: content.process.title,
      body: [content.process.body],
    });
  }

  if (content.phases) {
    sections.push({
      type: 'phases',
      items: content.phases.map((phase) => ({
        number: phase.number,
        title: phase.title,
        body: normalizePhaseBody(phase),
      })),
    });
  }

  if (content.concepts && content.neighborhoods) {
    sections.push({
      type: 'cards',
      theme: 'tint',
      eyebrow: content.concepts.label,
      title: content.concepts.title,
      items: content.neighborhoods.map((item, index) => ({
        number: `0${index + 1}`,
        title: item.title,
        body: item.concept,
        image: neighborhoodImages[slug]?.[index],
      })),
    });
  }

  if (content.systemMap) {
    sections.push({
      type: 'media',
      theme: 'dark',
      eyebrow: content.systemMap.label,
      title: content.systemMap.title,
      body: [content.systemMap.desc],
      media: {
        src: pradoMapImage,
        alt: content.systemMap.caption,
        caption: content.systemMap.caption,
      },
    });
  }

  if (content.uiScreens) {
    sections.push({
      type: 'ui-showcase',
      theme: 'tint',
      eyebrow: content.uiScreens.label,
      title: content.uiScreens.title,
      body: [content.uiScreens.desc],
      media: {
        src: slug === 'prado' ? pradoUiImage : null,
        alt: content.uiScreens.caption,
        caption: content.uiScreens.caption,
      },
    });
  }

  if (content.learned) {
    sections.push({
      type: 'quote',
      theme: 'plain',
      eyebrow: content.learned.label,
      title: content.learned.title,
      body: [content.learned.body],
    });
  }

  if (content.reflection) {
    sections.push({
      type: 'quote',
      theme: 'dark',
      eyebrow: content.reflection.label,
      title: content.reflection.title,
      body: [content.reflection.body],
    });
  }

  return sections;
};

export const cases = caseOrder.map((slug, index) => {
  const raw = casesData[slug];
  const config = caseRegistry[slug];
  const nextSlug = caseOrder[(index + 1) % caseOrder.length];
  const fallbackTitle = raw.en.title.replace(/\n/g, ' ');

  return {
    slug,
    route: `/cases/${slug}`,
    featured: Boolean(config.featured),
    projectType: config.projectType,
    summary: config.summary,
    hero: {
      en: {
        label: raw.en.label,
        title: raw.en.title,
        subtitle: raw.en.subtitle,
      },
      es: {
        label: raw.es.label,
        title: raw.es.title,
        subtitle: raw.es.subtitle,
      },
    },
    meta: normalizeMeta(raw.meta),
    homeMetadata: config.metadata || [],
    sections: {
      en: normalizeCaseSections(slug, raw.en),
      es: normalizeCaseSections(slug, raw.es),
    },
    seo: {
      title: fallbackTitle,
      description: raw.en.subtitle,
      path: `/cases/${slug}`,
      image: siteMeta.defaultImage,
    },
    nextCase: {
      slug: nextSlug,
      label: {
        en: casesData[nextSlug].en.title.replace(/\n/g, ' '),
        es: casesData[nextSlug].es.title.replace(/\n/g, ' '),
      },
      eyebrow: {
        en: raw.en.nextLabel,
        es: raw.es.nextLabel,
      },
    },
  };
});

export const getCaseBySlug = (slug) => cases.find((item) => item.slug === slug);
