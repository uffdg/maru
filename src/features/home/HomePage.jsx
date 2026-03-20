import { Menu, Monitor, Cpu, Users, X, Zap, Mail, Linkedin } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../content/useLanguage';
import { t as translations } from '../../translations';
import { splitLines } from '../../shared/lib/format';
import { usePageSeo } from '../../shared/seo/usePageSeo';
import LanguageToggle from '../../shared/components/LanguageToggle';
import SiteLogo from '../../shared/components/SiteLogo';
import TrackedExternalLink from '../../shared/components/TrackedExternalLink';
import ProjectsSection from './components/ProjectsSection';
import BlogCarousel from './components/BlogCarousel';
import HeroAnimation from './components/HeroAnimation';

const renderLines = (value) =>
  splitLines(value).map((line, index, lines) => (
    <span key={index}>
      {line}
      {index < lines.length - 1 ? <br /> : null}
    </span>
  ));

const HomePage = () => {
  const { lang, toggle } = useLanguage();
  const copy = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  usePageSeo({
    title: 'Strategic Foresight · Product',
    description: copy.hero.subtitle,
    path: '/',
  });

  const mentoringIcons = [
    <Monitor className="w-5 h-5 mb-4 text-pink-500" key="monitor" />,
    <Cpu className="w-5 h-5 mb-4 text-pink-500" key="cpu" />,
    <Users className="w-5 h-5 mb-4 text-pink-500" key="users" />,
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-900 font-sans selection:bg-pink-100">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/60 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-6 md:px-20 py-5">
          <SiteLogo />

          <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-widest items-center">
            <a href="#projects" className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.projects}
            </a>
            <a href="#about" className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.about}
            </a>
            <a href="#mentoring" className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.mentoring}
            </a>
            <Link to="/blog" className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.blog}
            </Link>
            <a href="#contact" className="text-pink-500 hover:text-pink-600 transition-colors">
              {copy.nav.contact}
            </a>
            <LanguageToggle lang={lang} onToggle={toggle} />
          </div>

          <div className="flex md:hidden items-center gap-3">
            <LanguageToggle lang={lang} onToggle={toggle} />
            <button
              onClick={() => setMenuOpen((current) => !current)}
              className="p-1 text-gray-500 hover:text-pink-500 transition-colors"
              aria-label="Open menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="md:hidden border-t border-gray-100 bg-white/80 backdrop-blur-md px-6 py-6 flex flex-col gap-5 text-[11px] font-bold uppercase tracking-widest">
            <a href="#projects" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.projects}
            </a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.about}
            </a>
            <a href="#mentoring" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.mentoring}
            </a>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">
              {copy.nav.blog}
            </Link>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-pink-500 hover:text-pink-600 transition-colors">
              {copy.nav.contact}
            </a>
          </div>
        ) : null}
      </nav>

      <section id="hero-section" className="relative min-h-[75vh] flex items-center px-6 md:px-20 overflow-hidden bg-transparent">
        <div className="max-w-7xl w-full mx-auto pt-28 relative z-0 flex flex-col justify-center">
          <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" /> {copy.hero.label}
            </p>
            <h1 className="text-7xl md:text-[130px] font-black leading-none tracking-tighter text-gray-900">
              {renderLines(copy.hero.title)}
            </h1>
            <p className="max-w-xl text-xl text-gray-600 leading-relaxed">{copy.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section id="mentoring" className="py-24 px-6 md:px-20 bg-white/20 backdrop-blur-[2px]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              {renderLines(copy.mentoring.title)}
            </h2>
            <div className="max-w-xs">
              <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">
                {copy.mentoring.label}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {copy.mentoring.cards.map((item, index) => (
              <div
                key={item.title}
                className="group h-full p-10 bg-white/40 backdrop-blur-md rounded-[2rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
              >
                {mentoringIcons[index]}
                <h3 className="text-2xl font-black mb-4 uppercase text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-8 h-1 w-8 bg-pink-100 group-hover:w-16 group-hover:bg-pink-500 rounded-full transition-all duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 md:px-20 bg-white/20 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{copy.about.label}</p>
            <h2 className="text-5xl font-black leading-none mb-8 text-gray-900">{renderLines(copy.about.headline)}</h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg pt-4">
            <p>{copy.about.body1}</p>
            <p>{copy.about.body2}</p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 md:px-20 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-8">{copy.now.label}</p>
          <div className="border-2 border-dashed border-pink-200 rounded-[2rem] p-10 md:p-14 relative">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{copy.now.title}</h2>
              <span className="inline-flex items-center gap-2 bg-pink-50 text-pink-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-pink-200 self-start md:self-auto whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse inline-block" />
                {copy.now.inProgress}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>{copy.now.body}</p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">{copy.now.whatLabel}</p>
                {copy.now.items.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="text-pink-400 font-black mt-0.5 shrink-0">—</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 text-sm text-gray-400 italic border-t border-dashed border-pink-100 pt-8">
              {copy.now.closing}
            </p>
          </div>
        </div>
      </section>

      <ProjectsSection lang={lang} translations={copy} />

      <section className="py-24 px-6 md:px-20 bg-white/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{copy.building.label}</p>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tighter text-gray-900 mb-8">
                {renderLines(copy.building.title)}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">{copy.building.desc}</p>
              <TrackedExternalLink
                href="https://arde.com.ar/rituales"
                target="_blank"
                rel="noopener noreferrer"
                eventName="manifest_click"
                eventPayload={{ location: 'home_building' }}
                className="inline-flex items-center gap-2 bg-pink-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-pink-600 hover:-translate-y-1 shadow-lg shadow-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {copy.building.cta}
              </TrackedExternalLink>
            </div>
            <div className="bg-pink-50/60 border border-pink-100 rounded-[2rem] p-12 flex flex-col gap-6">
              {copy.building.features.map((item) => (
                <div key={item} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0" />
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BlogCarousel lang={lang} />

      <section className="py-24 px-6 md:px-20 bg-white/20 backdrop-blur-md relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-16 text-gray-900">
            {renderLines(copy.stats.headline)}
          </h2>
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 max-w-sm">
            <div>
              <p className="text-6xl font-black text-pink-500 mb-4 tracking-tighter">
                20<span className="text-4xl text-pink-300">+</span>
              </p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 leading-relaxed">
                {renderLines(copy.stats.stat1Label)}
              </p>
            </div>
            <div>
              <p className="text-6xl font-black text-pink-500 mb-4 tracking-tighter">880K</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 leading-relaxed">
                {renderLines(copy.stats.stat2Label)}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-32 px-6 md:px-20 relative text-gray-900 text-center rounded-t-[3rem] mt-10 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl pointer-events-none" />
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h60v1.5H0z' fill='rgba(255,255,255,0.5)'/%3E%3Cpath d='M0 0h1.5v60H0z' fill='rgba(255,255,255,0.5)'/%3E%3Cpath d='M58.5 0h1.5v60H58.5z' fill='rgba(0,0,0,0.04)'/%3E%3Cpath d='M0 58.5h60v1.5H0z' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E\")" }} />
        
        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-12">{renderLines(copy.contact.headline)}</h2>
          <div className="flex flex-col items-center gap-8">
            <TrackedExternalLink
              href="mailto:marufiorillo@gmail.com"
              eventName="contact_click"
              eventPayload={{ type: 'email' }}
              className="bg-pink-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(236,72,153,0.3)] hover:shadow-[0_25px_60px_rgba(236,72,153,0.4)] hover:-translate-y-2 hover:bg-pink-600 transition-all duration-300 flex items-center gap-3"
            >
              {copy.contact.cta} <Mail className="w-5 h-5" />
            </TrackedExternalLink>
            <div className="flex gap-8 mt-12">
              <TrackedExternalLink
                href="https://linkedin.com/in/marianafiorillo"
                target="_blank"
                rel="noopener noreferrer"
                eventName="contact_click"
                eventPayload={{ type: 'linkedin' }}
                className="hover:text-pink-500 hover:scale-110 transition-all bg-white/50 p-4 rounded-full text-pink-500 shadow-sm"
              >
                <Linkedin className="w-6 h-6" />
              </TrackedExternalLink>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative py-8 px-6 md:px-20 text-[10px] font-bold uppercase tracking-widest text-gray-500 overflow-hidden">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-2xl pointer-events-none" />
        <div className="absolute inset-0 opacity-60 pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h60v60H0z' fill='none'/%3E%3Cpath d='M0 0h60v1.5H0z' fill='rgba(255,255,255,0.5)'/%3E%3Cpath d='M0 0h1.5v60H0z' fill='rgba(255,255,255,0.5)'/%3E%3Cpath d='M58.5 0h1.5v60H58.5z' fill='rgba(0,0,0,0.04)'/%3E%3Cpath d='M0 58.5h60v1.5H0z' fill='rgba(0,0,0,0.04)'/%3E%3C/svg%3E\")" }} />
        
        <div className="relative z-10 flex justify-center items-center">
          <p>{copy.footer.copy}</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
