import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';
import casesData from '../data/cases.json';
import moolliLogo from '../assets/moollilogo.png';
import moolliRoadmap from '../assets/moolliroadmap.png';
import moolliApp1 from '../assets/moolliapp.png';
import moolliApp2 from '../assets/moolliapp2.png';
import moolliApp3 from '../assets/moolliapp3.png';

const caseData = casesData['wuufy'];

const Wuufy = () => {
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
            <p className="text-[10px] font-bold uppercase text-gray-400">Award</p>
            <p className="font-bold text-gray-900 text-sm">{meta.award}</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Company</p>
            <p className="font-bold text-gray-900 text-sm">{meta.company}</p>
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
            <p>{t.about.body}</p>
          </div>
        </div>
      </section>

      {/* PHASES */}
      {t.phases.map((phase, i) => (
        <div key={i}>
          <section
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
          {i === 0 && (
            <section className="px-6 md:px-20 py-16 bg-white border-t border-gray-50">
              <div className="max-w-5xl mx-auto">
                <img
                  src={moolliRoadmap}
                  alt="Moolli — product roadmap"
                  className="w-full rounded-2xl"
                />
              </div>
            </section>
          )}
        </div>
      ))}

      {/* LOGO SECTION */}
      <section className="py-16 border-t border-gray-50 bg-[#F5C518]">
        <img
          src={moolliLogo}
          alt="Moolli — Una tribu de dog lovers"
          className="w-full max-w-sm mx-auto block px-12"
        />
      </section>

      {/* APP SCREENSHOTS */}
      <section className="py-20 border-t border-gray-50 bg-gray-950">
        <div className="px-6 md:px-20 max-w-5xl mx-auto mb-12">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">The Product</p>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">Moolli · 2023</h2>
        </div>
        <div className="max-w-5xl mx-auto px-6 md:px-20 space-y-12">
          <img src={moolliApp1} alt="Moolli app — métricas e integración con apps de salud" className="w-full rounded-2xl" />
          <img src={moolliApp2} alt="Moolli app — engagement, diagnóstico AI y referidos" className="w-full rounded-2xl" />
          <img src={moolliApp3} alt="Moolli app — pantallas completas" className="w-full rounded-2xl" />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">{t.nextLabel}</p>
        <Link to="/cases/google-startups" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Google for Startups →
        </Link>
      </footer>
    </div>
  );
};

export default Wuufy;
