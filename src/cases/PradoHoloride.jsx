import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';
import journeyMap from '../assets/museodelprado.png';
import casesData from '../data/cases.json';

const caseData = casesData['prado-holoride'];

const PradoHoloride = () => {
  const { lang } = useLanguage();
  const t = caseData[lang];
  const meta = caseData.meta;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100">

      {/* NAV */}
      <CaseNav />

      {/* HERO */}
      <section className="pt-40 pb-24 px-6 md:px-20 bg-white">
        <div className="max-w-5xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-6">{t.label}</p>
          <h1 className="text-7xl md:text-[110px] font-black leading-none tracking-tighter text-gray-900 mb-8">
            {t.title.split('\n').map((line, i) => (
              <span key={i}>{line}{i < t.title.split('\n').length - 1 && <br />}</span>
            ))}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* METADATA */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
          <div className="space-y-2 border-l-2 border-pink-500 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Skills</p>
            <p className="font-bold text-gray-900 text-sm">{meta.skills}</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Company</p>
            <p className="font-bold text-gray-900 text-sm">{meta.company}</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
            <p className="font-bold text-gray-900 text-sm">{meta.year}</p>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="px-6 md:px-20 py-24 bg-pink-50/30">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.about.label}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{t.about.heading}</h2>
          </div>
          <div className="space-y-6 text-gray-600 text-lg leading-relaxed pt-1">
            <p>{t.about.body1}</p>
            <p>{t.about.body2}</p>
          </div>
        </div>
      </section>

      {/* PHASES 01–02 */}
      {t.phases.slice(0, 2).map((phase, i) => (
        <section
          key={i}
          className={`px-6 md:px-20 py-24 border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-pink-50/30'}`}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{phase.number}</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{phase.title}</h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed pt-1">
              <p>{phase.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* FEATURED IMAGE — THE SYSTEM MAP */}
      <section className="py-24 border-t border-gray-50 bg-gray-950">
        <div className="px-6 md:px-20 max-w-5xl mx-auto mb-12">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.systemMap.label}</p>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
              {t.systemMap.title.split('\n').map((line, i) => (
                <span key={i}>{line}{i < t.systemMap.title.split('\n').length - 1 && <br />}</span>
              ))}
            </h2>
            <p className="text-gray-400 text-base leading-relaxed max-w-sm">
              {t.systemMap.desc}
            </p>
          </div>
        </div>

        <img src={journeyMap} alt="Full customer journey map — Museo Nacional del Prado · 2018" className="w-full block" />

        <div className="px-6 md:px-20 mt-6">
          <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
            {t.systemMap.caption}
          </p>
        </div>
      </section>

      {/* PHASES 03–04 */}
      {t.phases.slice(2).map((phase, i) => (
        <section
          key={i}
          className={`px-6 md:px-20 py-24 border-t border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-pink-50/30'}`}
        >
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{phase.number}</p>
              <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{phase.title}</h2>
            </div>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed pt-1">
              {phase.body1 ? (
                <>
                  <p>{phase.body1}</p>
                  <p>{phase.body2}</p>
                </>
              ) : (
                <p>{phase.body}</p>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* FOOTER */}
      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">{t.nextLabel}</p>
        <Link to="/cases/holoride" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Holoride →
        </Link>
      </footer>
    </div>
  );
};

export default PradoHoloride;
