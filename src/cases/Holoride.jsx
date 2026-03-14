import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';
import casesData from '../data/cases.json';

const caseData = casesData['holoride'];

const Holoride = () => {
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
            {t.title}
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

      {/* PHASES */}
      {t.phases.map((phase, i) => (
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

      {/* WHAT I LEARNED */}
      <section className="px-6 md:px-20 py-24 bg-gray-950 border-t border-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.reflection.label}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">{t.reflection.title}</h2>
          </div>
          <p className="text-gray-400 text-lg leading-relaxed pt-1 italic">
            {t.reflection.body}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-950 py-20 px-6 md:px-20 text-white text-center border-t border-white/10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-6">{t.nextLabel}</p>
        <Link to="/cases/mercantil-andina" className="text-4xl md:text-5xl font-black tracking-tighter text-pink-400 hover:text-pink-300 transition-colors">
          Mercantil Andina →
        </Link>
      </footer>
    </div>
  );
};

export default Holoride;
