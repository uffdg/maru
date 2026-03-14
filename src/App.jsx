import { Link } from 'react-router-dom';
import {
  Mail,
  Linkedin,
  ArrowUpRight,
  Users,
  Cpu,
  Monitor,
  Zap,
  ChevronLeft,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { t as translations } from './translations';
import maruLogo from './assets/maru logo.svg';
import { posts } from './data/posts';

const BlogCarousel = ({ lang }) => {
  const [active, setActive] = useState(0);
  const prev = () => setActive(i => (i - 1 + posts.length) % posts.length);
  const next = () => setActive(i => (i + 1) % posts.length);
  const post = posts[active];

  return (
    <section className="py-24 px-6 md:px-20 bg-pink-50/40 border-t border-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">
              {lang === 'en' ? 'Writing' : 'Escritura'}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Blog</h2>
          </div>
          <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:underline">
            {lang === 'en' ? 'All posts →' : 'Ver todos →'}
          </Link>
        </div>

        <div className="relative">
          <Link
            to={`/blog/${post.slug}`}
            className="block bg-white rounded-[2rem] border border-pink-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-14 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">{post.label}</span>
              <span className="text-[10px] text-gray-400 font-medium">
                {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { year: 'numeric', month: 'short', day: 'numeric' })}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight group-hover:text-pink-500 transition-colors">
              {post[lang].title}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">{post[lang].excerpt}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-pink-400 group-hover:text-pink-600 transition-colors">
              {lang === 'en' ? 'Read more →' : 'Leer más →'}
            </p>
          </Link>

          <div className="flex items-center gap-4 mt-8">
            <button onClick={prev} className="p-3 rounded-full border border-gray-200 hover:border-pink-300 hover:text-pink-500 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {posts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-2 h-2 rounded-full transition-all ${i === active ? 'bg-pink-500 w-6' : 'bg-gray-200 hover:bg-pink-200'}`}
                />
              ))}
            </div>
            <button onClick={next} className="p-3 rounded-full border border-gray-200 hover:border-pink-300 hover:text-pink-500 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const { lang, toggle } = useLanguage();
  const t = translations[lang];
  const [menuOpen, setMenuOpen] = useState(false);

  const mentoringIcons = [
    <Monitor className="w-5 h-5 mb-4 text-pink-500" />,
    <Cpu className="w-5 h-5 mb-4 text-pink-500" />,
    <Users className="w-5 h-5 mb-4 text-pink-500" />,
  ];

  const projects = [
    { name: "Mercantil Andina", type: "Service Design", desc: "Optimizing policyholder journey through digital transformation.", slug: "mercantil-andina" },
    { name: "Agrofy", type: "Mentoring & Research", desc: "Boosting research maturity and seniority within the UX team.", slug: "agrofy" },
    { name: "Wuufy", type: "Product Strategy", desc: "Awarded Best Product @ BubbleCon 2023.", slug: "wuufy" },
    { name: "Google for Startups", type: "Accelerator Mentor", desc: "Helping founders validate product-market fit.", slug: "google-startups" },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100">

      {/* --- NAV --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="flex items-center justify-between px-6 md:px-20 py-5">
          <img src={maruLogo} alt="Maru Fiorillo" style={{ height: '32px', width: 'auto' }} />

          {/* Desktop menu */}
          <div className="hidden md:flex gap-6 text-[11px] font-bold uppercase tracking-widest items-center">
            <a href="#projects" className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.projects}</a>
            <a href="#about" className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.about}</a>
            <a href="#mentoring" className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.mentoring}</a>
            <Link to="/blog" className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.blog}</Link>
            <a href="#contact" className="text-pink-500 hover:text-pink-600 transition-colors">{t.nav.contact}</a>
            <button onClick={toggle} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1">
              <span className={lang === 'en' ? 'text-pink-500' : 'text-gray-400'}>EN</span>
              <span className="text-gray-300">/</span>
              <span className={lang === 'es' ? 'text-pink-500' : 'text-gray-400'}>ES</span>
            </button>
          </div>

          {/* Mobile right side */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={toggle} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1">
              <span className={lang === 'en' ? 'text-pink-500' : 'text-gray-400'}>EN</span>
              <span className="text-gray-300">/</span>
              <span className={lang === 'es' ? 'text-pink-500' : 'text-gray-400'}>ES</span>
            </button>
            <button onClick={() => setMenuOpen(o => !o)} className="p-1 text-gray-500 hover:text-pink-500 transition-colors">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-6 py-6 flex flex-col gap-5 text-[11px] font-bold uppercase tracking-widest">
            <a href="#projects" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.projects}</a>
            <a href="#about" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.about}</a>
            <a href="#mentoring" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.mentoring}</a>
            <Link to="/blog" onClick={() => setMenuOpen(false)} className="text-gray-500 hover:text-pink-500 transition-colors">{t.nav.blog}</Link>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="text-pink-500 hover:text-pink-600 transition-colors">{t.nav.contact}</a>
          </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <section id="hero-section" className="relative min-h-[75vh] flex items-center px-6 md:px-20 overflow-hidden bg-white">

        <div className="max-w-7xl w-full mx-auto pt-28 relative z-0 flex flex-col justify-center">
          <div className="space-y-6 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" /> {t.hero.label}
            </p>
            <h1 className="text-7xl md:text-[130px] font-black leading-none tracking-tighter text-gray-900">
              {t.hero.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i < t.hero.title.split('\n').length - 1 && <br />}</span>
              ))}
            </h1>
            <p className="max-w-xl text-xl text-gray-600 leading-relaxed">
              {t.hero.subtitle}
            </p>
          </div>
        </div>
      </section>

      {/* --- MENTORING / EXPERTISE --- */}
      <section id="mentoring" className="py-24 px-6 md:px-20 border-b border-gray-50 bg-gradient-to-b from-white to-pink-50/40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-4">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">
              {t.mentoring.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i < t.mentoring.title.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
            <div className="max-w-xs">
              <p className="text-gray-500 text-sm uppercase font-bold tracking-widest">
                {t.mentoring.label}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.mentoring.cards.map((item, i) => (
              <div key={i} className="group p-10 bg-white rounded-[2rem] border border-pink-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                {mentoringIcons[i]}
                <h3 className="text-2xl font-black mb-4 uppercase text-gray-900">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                <div className="mt-8 h-1 w-8 bg-pink-100 group-hover:w-16 group-hover:bg-pink-500 rounded-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- BIO SECTION --- */}
      <section id="about" className="py-24 px-6 md:px-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-pink-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 relative z-10">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.about.label}</p>
            <h2 className="text-5xl font-black leading-none mb-8 text-gray-900">
              {t.about.headline.split('\n').map((line, i) => (
                <span key={i}>{line}{i < t.about.headline.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
          </div>
          <div className="space-y-6 text-gray-600 leading-relaxed text-lg pt-4">
            <p>
              {t.about.body1}
            </p>
            <p>
              {t.about.body2}
            </p>
          </div>
        </div>
      </section>

      {/* --- NOW / CURRENTLY --- */}
      <section className="py-24 px-6 md:px-20 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-8">{t.now.label}</p>
          <div className="border-2 border-dashed border-pink-200 rounded-[2rem] p-10 md:p-14 relative">
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">
                {t.now.title}
              </h2>
              <span className="inline-flex items-center gap-2 bg-pink-50 text-pink-500 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full border border-pink-200 self-start md:self-auto whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse inline-block"></span>
                {t.now.inProgress}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  {t.now.body}
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">{t.now.whatLabel}</p>
                {t.now.items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-pink-400 font-black mt-0.5 shrink-0">—</span>
                    <p className="text-gray-600 text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="mt-10 text-sm text-gray-400 italic border-t border-dashed border-pink-100 pt-8">
              {t.now.closing}
            </p>
          </div>
        </div>
      </section>

      {/* --- CASE STUDIES --- */}
      <section id="projects" className="py-24 px-6 md:px-20 bg-pink-50/30">
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.projects.case01}</p>
            <h2 className="text-6xl font-black mb-12 text-gray-900">Barrios con Encanto —<br />Comodoro Rivadavia</h2>

            <div className="grid md:grid-cols-3 gap-8 items-start mb-12 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
               <div className="space-y-2 border-l-2 border-pink-500 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Project Type</p>
                  <p className="font-bold text-gray-900">Strategic Foresight · Urban Design</p>
               </div>
               <div className="space-y-2 border-l-2 border-gray-100 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Role</p>
                  <p className="font-bold text-gray-900">Lead Researcher & Strategist</p>
               </div>
               <div className="space-y-2 border-l-2 border-gray-100 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Output</p>
                  <p className="font-bold text-gray-900">10-year neighborhood concepts</p>
               </div>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mb-8">
              As part of Comodoro Rivadavia's Pioneros 2030 strategic plan, I led the field research and future conceptualization of three historic neighborhoods — KM5, Astra, and Diadema. Working directly with residents, I mapped current identity and designed distinct 10-year futures for each: a youth and knowledge hub, a world-class audiovisual and cultural district, and a wellness and spirituality destination.
            </p>
            <Link to="/cases/comodoro" className="text-xs font-bold text-pink-500 uppercase tracking-widest hover:underline">
              {t.projects.viewCase}
            </Link>
          </div>

          <div className="mb-24">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.projects.case02}</p>
            <h2 className="text-6xl font-black mb-12 text-gray-900">Museo Nacional<br />del Prado</h2>

            <div className="grid md:grid-cols-3 gap-8 items-start mb-12 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
               <div className="space-y-2 border-l-2 border-pink-500 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Project Type</p>
                  <p className="font-bold text-gray-900">Strategic Design · Cultural Futures</p>
               </div>
               <div className="space-y-2 border-l-2 border-gray-100 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Role</p>
                  <p className="font-bold text-gray-900">Lead Strategist & Experience Designer</p>
               </div>
               <div className="space-y-2 border-l-2 border-gray-100 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
                  <p className="font-bold text-gray-900">2017–2019</p>
               </div>
            </div>
            <Link to="/cases/prado-holoride" className="text-xs font-bold text-pink-500 uppercase tracking-widest hover:underline">
              {t.projects.viewCase}
            </Link>
          </div>

          <div className="mb-24">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.projects.case03}</p>
            <h2 className="text-6xl font-black mb-12 text-gray-900">Holoride</h2>

            <div className="grid md:grid-cols-3 gap-8 items-start mb-12 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
               <div className="space-y-2 border-l-2 border-pink-500 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Project Type</p>
                  <p className="font-bold text-gray-900">Product Leadership · Emerging Technology</p>
               </div>
               <div className="space-y-2 border-l-2 border-gray-100 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Role</p>
                  <p className="font-bold text-gray-900">Design Team Lead & Research Strategist</p>
               </div>
               <div className="space-y-2 border-l-2 border-gray-100 pl-6">
                  <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
                  <p className="font-bold text-gray-900">2023–2024</p>
               </div>
            </div>
            <Link to="/cases/holoride" className="text-xs font-bold text-pink-500 uppercase tracking-widest hover:underline">
              {t.projects.viewCase}
            </Link>
          </div>

          <div className="mt-32">
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.projects.strategyLabel}</p>
            <h2 className="text-4xl md:text-5xl font-black mb-16 text-gray-900">
              {t.projects.strategyTitle.split('\n').map((line, i) => (
                <span key={i}>{line}{i < t.projects.strategyTitle.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((proj, i) => (
                <div key={i} className={`bg-white p-10 rounded-3xl border border-pink-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group`}>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">{t.projects.projectTypes[proj.type]}</span>
                    <ArrowUpRight className="w-5 h-5 text-gray-300 group-hover:text-pink-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>
                  <h3 className="text-3xl font-black mb-4 text-gray-900">{proj.name}</h3>
                  <p className="text-gray-500 text-sm mb-8 leading-relaxed">{proj.desc}</p>
                  <Link to={`/cases/${proj.slug}`} className="text-xs font-bold text-pink-500 uppercase tracking-widest hover:underline">
                    {t.projects.viewCase}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BUILDING SECTION --- */}
      <section className="py-24 px-6 md:px-20 bg-white border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.building.label}</p>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl md:text-6xl font-black leading-none tracking-tighter text-gray-900 mb-8">
                {t.building.title.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < t.building.title.split('\n').length - 1 && <br />}</span>
                ))}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-10">
                {t.building.desc}
              </p>
              <a
                href="https://arde.com.ar/rituales"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-pink-500 text-white px-10 py-4 rounded-full font-black uppercase tracking-widest text-xs hover:bg-pink-600 hover:-translate-y-1 shadow-lg shadow-gray-200 hover:shadow-xl transition-all duration-300"
              >
                {t.building.cta}
              </a>
            </div>
            <div className="bg-pink-50/60 border border-pink-100 rounded-[2rem] p-12 flex flex-col gap-6">
              {t.building.features.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 shrink-0"></div>
                  <p className="text-gray-700 font-medium">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BLOG CAROUSEL --- */}
      <BlogCarousel lang={lang} />

      {/* --- STATS SECTION --- */}
      <section className="py-24 px-6 md:px-20 bg-white relative overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black leading-tight mb-16 text-gray-900">
            {t.stats.headline.split('\n').map((line, i) => (
              <span key={i}>{line}{i < t.stats.headline.split('\n').length - 1 && <br />}</span>
            ))}
          </h2>
          <div className="grid grid-cols-2 gap-y-12 gap-x-8 max-w-sm">
            <div>
              <p className="text-6xl font-black text-pink-500 mb-4 tracking-tighter">20<span className="text-4xl text-pink-300">+</span></p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 leading-relaxed">
                {t.stats.stat1Label.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < t.stats.stat1Label.split('\n').length - 1 && <br />}</span>
                ))}
              </p>
            </div>
            <div>
              <p className="text-6xl font-black text-pink-500 mb-4 tracking-tighter">880K</p>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 leading-relaxed">
                {t.stats.stat2Label.split('\n').map((line, i) => (
                  <span key={i}>{line}{i < t.stats.stat2Label.split('\n').length - 1 && <br />}</span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER / CONTACT --- */}
      <section id="contact" className="py-32 px-6 md:px-20 bg-pink-500 text-white text-center rounded-t-[3rem] mt-10">
        <h2 className="text-7xl md:text-9xl font-black tracking-tighter mb-12">
          {t.contact.headline.split('\n').map((line, i) => (
            <span key={i}>{line}{i < t.contact.headline.split('\n').length - 1 && <br />}</span>
          ))}
        </h2>
        <div className="flex flex-col items-center gap-8">
          <a href="mailto:marufiorillo@gmail.com" className="bg-white text-pink-600 px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-[0_20px_50px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_60px_rgba(0,0,0,0.25)] hover:-translate-y-2 transition-all duration-300 flex items-center gap-3">
            {t.contact.cta} <Mail className="w-5 h-5" />
          </a>
          <div className="flex gap-8 mt-12">
            <a href="https://linkedin.com/in/marianafiorillo" target="_blank" className="hover:text-pink-200 hover:scale-110 transition-all bg-white/10 p-4 rounded-full">
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-pink-500 py-8 px-6 md:px-20 flex justify-center items-center text-[10px] font-bold uppercase tracking-widest text-white/70">
        <p>{t.footer.copy}</p>
      </footer>
    </div>
  );
};

export default App;
