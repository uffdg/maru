import { Link, useParams } from 'react-router-dom';
import { getCaseBySlug } from '../content/cases';
import { useLanguage } from '../content/useLanguage';
import { splitLines } from '../../shared/lib/format';
import { usePageSeo } from '../../shared/seo/usePageSeo';
import CaseNav from './components/CaseNav';
import { trackEvent } from '../../shared/analytics/trackEvent';
import Reveal from '../../shared/components/Reveal';
import AnimatedPhonesGrid from './components/AnimatedPhonesGrid';

const sectionThemes = {
  plain: 'bg-white/20 backdrop-blur-md',
  tint: 'bg-pink-50/30',
  dark: 'bg-gray-950',
};

const renderLines = (value) =>
  splitLines(value).map((line, index, lines) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));

const SectionShell = ({ theme = 'plain', children }) => (
  <section className={`px-6 md:px-20 py-24 ${sectionThemes[theme] || sectionThemes.plain}`}>{children}</section>
);

const CaseStudyPage = () => {
  const { slug } = useParams();
  const { lang } = useLanguage();
  const caseStudy = getCaseBySlug(slug);

  usePageSeo({
    title: caseStudy ? caseStudy.hero[lang].title.replace(/\n/g, ' ') : 'Case Study',
    description: caseStudy ? caseStudy.hero[lang].subtitle : 'Case study',
    path: caseStudy ? caseStudy.route : '/cases',
  });

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-transparent text-gray-900 font-sans">
        <CaseNav />
        <div className="pt-40 pb-32 px-6 md:px-20 max-w-4xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">404</p>
          <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tighter text-gray-900 mb-12">
            {lang === 'en' ? 'Case study not found' : 'Caso no encontrado'}
          </h1>
          <Link to="/" className="text-gray-400 text-lg hover:text-pink-500 transition-colors">
            {lang === 'en' ? 'Back to portfolio' : 'Volver al portfolio'}
          </Link>
        </div>
      </div>
    );
  }

  const hero = caseStudy.hero[lang];
  const sections = caseStudy.sections[lang];
  const nextCaseLabel = caseStudy.nextCase.label[lang];
  const nextCaseEyebrow = caseStudy.nextCase.eyebrow[lang];

  return (
    <div className="min-h-screen bg-transparent text-gray-900 font-sans selection:bg-pink-100">
      <CaseNav />

      <section className="pt-40 pb-24 px-6 md:px-20 bg-transparent">
        <div className="max-w-5xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-6">{hero.label}</p>
          <h1 className="text-7xl md:text-[110px] font-black leading-none tracking-tighter text-gray-900 mb-8">
            {renderLines(hero.title)}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{hero.subtitle}</p>
        </div>
      </section>

      <section className="px-6 md:px-20 pb-24">
        <div className={`max-w-5xl mx-auto grid gap-8 bg-white/40 backdrop-blur-md p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/50 ${caseStudy.meta.length > 3 ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
          {caseStudy.meta.map((item) => (
            <div
              key={`${item.label}-${item.value}`}
              className={`space-y-2 border-l-2 pl-6 ${item.accent ? 'border-pink-500' : 'border-gray-100'}`}
            >
              <p className="text-[10px] font-bold uppercase text-gray-400">{item.label}</p>
              <p className="font-bold text-gray-900 text-sm">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {sections.map((section, index) => {
        if (section.type === 'about' || section.type === 'split') {
          return (
            <SectionShell key={`${section.type}-${index}`} theme={section.theme}>
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{section.eyebrow}</p>
                  <h2 className={`text-4xl md:text-5xl font-black leading-tight ${section.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {renderLines(section.title)}
                  </h2>
                </div>
                <div className={`space-y-6 text-lg leading-relaxed pt-1 ${section.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </SectionShell>
          );
        }

        if (section.type === 'phases') {
          return section.items.map((phase, phaseIndex) => (
            <SectionShell
              key={`${phase.number}-${phaseIndex}`}
              theme={phaseIndex % 2 === 0 ? 'plain' : 'tint'}
            >
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{phase.number}</p>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
                    {phase.title}
                  </h2>
                </div>
                <div className="space-y-6 text-gray-600 text-lg leading-relaxed pt-1">
                  {phase.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </SectionShell>
          ));
        }

        if (section.type === 'cards') {
          return (
            <SectionShell key={`${section.type}-${index}`} theme={section.theme}>
              <div className="max-w-5xl mx-auto">
                <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{section.eyebrow}</p>
                <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 mb-16">
                  {section.title}
                </h2>
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                  {section.items.map((item) => (
                    <div
                      key={item.title}
                      className="group bg-white/40 backdrop-blur-md p-10 rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                    >
                      <p className="text-pink-500 font-black text-4xl mb-6 tracking-tighter">{item.number}</p>
                      <h3 className="text-xl font-black uppercase text-gray-900 mb-4 leading-tight">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.body}</p>
                      <div className="mt-8 h-1 w-8 bg-pink-100 group-hover:w-16 group-hover:bg-pink-500 rounded-full transition-all duration-500" />
                    </div>
                  ))}
                </div>

                {section.items.some((item) => item.image) ? (
                  <div className="space-y-12">
                    {section.items
                      .filter((item) => item.image)
                      .map((item) => (
                        <div key={`${item.title}-image`} className="bg-gray-950 border border-white/5 rounded-[2rem] p-8">
                          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{item.number}</p>
                          <h3 className="text-2xl font-black text-white mb-8">{item.title}</h3>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full rounded-2xl"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                ) : null}
              </div>
            </SectionShell>
          );
        }

        if (section.type === 'media') {
          return (
            <SectionShell key={`${section.type}-${index}`} theme={section.theme}>
              <div className="max-w-5xl mx-auto text-center mb-16">
                <Reveal>
                  <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{section.eyebrow}</p>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight text-white mb-8">
                    {renderLines(section.title)}
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto mb-6">
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </div>
              <Reveal delay={400} className="w-full flex justify-center">
                <div className="w-full max-w-[1600px] mx-auto rounded-[2.5rem] overflow-hidden bg-white/5 border border-white/10 group relative flex justify-center items-center">
                  <img
                    src={section.media.src}
                    alt={section.media.alt}
                    className="w-auto h-auto max-w-full object-contain rounded-[2.5rem]"
                    loading="lazy"
                  />
                </div>
                <p className="text-center text-xs uppercase tracking-widest text-white/40 mt-8">{section.media.caption}</p>
              </Reveal>
            </SectionShell>
          );
        }

        if (section.type === 'ui-showcase') {
          return (
            <SectionShell key={`${section.type}-${index}`} theme={section.theme}>
              <div className="max-w-5xl mx-auto text-center mb-16">
                <Reveal>
                  <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{section.eyebrow}</p>
                  <h2 className={`text-4xl md:text-5xl font-black leading-tight mb-6 ${section.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {renderLines(section.title)}
                  </h2>
                </Reveal>
                <Reveal delay={200}>
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className={`text-lg leading-relaxed max-w-2xl mx-auto ${section.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {paragraph}
                    </p>
                  ))}
                </Reveal>
              </div>
              
              <Reveal delay={400} className="w-full relative px-6 md:px-0">
                <AnimatedPhonesGrid slug={slug} />
                <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mt-8">{section.media.caption}</p>
              </Reveal>
            </SectionShell>
          );
        }

        if (section.type === 'quote') {
          return (
            <SectionShell key={`${section.type}-${index}`} theme={section.theme}>
              <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
                <div>
                  <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{section.eyebrow}</p>
                  <h2 className={`text-4xl md:text-5xl font-black leading-tight ${section.theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {section.title}
                  </h2>
                </div>
                <div className={`text-lg leading-relaxed italic pt-1 ${section.theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                  {section.blogLink && (
                    <Link
                      to={section.blogLink}
                      onClick={() => trackEvent('case_blog_link_click', { case: slug, post: section.blogLink })}
                      className="not-italic inline-block mt-6 text-sm font-black text-pink-500 hover:underline"
                    >
                      {section.blogLinkLabel}
                    </Link>
                  )}
                </div>
              </div>
            </SectionShell>
          );
        }

        return null;
      })}

      <footer className={`${sections.some((section) => section.theme === 'dark') ? 'bg-gray-950 border-t border-white/10 text-white' : 'bg-pink-500 text-white'} py-20 px-6 md:px-20 text-center`}>
        <p className={`text-[11px] font-bold uppercase tracking-widest mb-6 ${sections.some((section) => section.theme === 'dark') ? 'text-white/40' : 'text-white/70'}`}>
          {nextCaseEyebrow}
        </p>
        <Link
          to={`/cases/${caseStudy.nextCase.slug}`}
          onClick={() => trackEvent('case_next_open', { from: caseStudy.slug, to: caseStudy.nextCase.slug })}
          className={`text-4xl md:text-5xl font-black tracking-tighter transition-colors ${sections.some((section) => section.theme === 'dark') ? 'text-pink-400 hover:text-pink-300' : 'hover:text-pink-200'}`}
        >
          {nextCaseLabel} →
        </Link>
      </footer>
    </div>
  );
};

export default CaseStudyPage;
