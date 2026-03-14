import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';
import casesData from '../data/cases.json';

const caseData = casesData['comodoro'];

const Comodoro = () => {
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
          <div className="space-y-2 border-l-2 border-pink-500 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Client</p>
            <p className="font-bold text-gray-900 text-sm">{meta.client}</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Role</p>
            <p className="font-bold text-gray-900 text-sm">{meta.role}</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
            <p className="font-bold text-gray-900 text-sm">{meta.year}</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Team</p>
            <p className="font-bold text-gray-900 text-sm">{meta.team}</p>
          </div>
        </div>
      </section>

      {/* SECTION 1 — THE CHALLENGE */}
      <section className="px-6 md:px-20 py-24 bg-pink-50/30">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.challenge.label}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{t.challenge.title}</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed pt-1">
            {t.challenge.body}
          </p>
        </div>
      </section>

      {/* SECTION 2 — THE PROCESS */}
      <section className="px-6 md:px-20 py-24 bg-white border-t border-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.process.label}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{t.process.title}</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed pt-1">
            {t.process.body}
          </p>
        </div>
      </section>

      {/* SECTION 3 — NEIGHBORHOOD CONCEPTS */}
      <section className="px-6 md:px-20 py-24 bg-pink-50/30 border-t border-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.concepts.label}</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900 mb-16">{t.concepts.title}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {t.neighborhoods.map((n, i) => (
              <div key={i} className="group bg-white p-10 rounded-[2rem] border border-pink-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300">
                <p className="text-pink-500 font-black text-4xl mb-6 tracking-tighter">0{i + 1}</p>
                <h3 className="text-xl font-black uppercase text-gray-900 mb-4 leading-tight">{n.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{n.concept}</p>
                <div className="mt-8 h-1 w-8 bg-pink-100 group-hover:w-16 group-hover:bg-pink-500 rounded-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — WHAT I LEARNED */}
      <section className="px-6 md:px-20 py-24 bg-white border-t border-gray-50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">{t.learned.label}</p>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-gray-900">{t.learned.title}</h2>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed pt-1 italic">
            {t.learned.body}
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">{t.nextLabel}</p>
        <Link to="/cases/prado-holoride" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          {lang === 'en' ? 'Museo Nacional del Prado →' : 'Museo Nacional del Prado →'}
        </Link>
      </footer>
    </div>
  );
};

export default Comodoro;
