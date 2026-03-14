import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Product Discovery · Award-Winning MVP',
    title: 'Wuufy',
    subtitle: 'A full discovery process that led to an MVP — and won Best Product at BubbleCon 2023.',
    meta: {
      skillsLabel: 'Skills',
      awardLabel: 'Award',
      companyLabel: 'Company',
    },
    about: {
      label: 'About the project',
      heading: 'Discovery done right.',
      body: "Wuufy started as a discovery project. I led the end-to-end process: understanding the problem space, defining the user, mapping the opportunity, and translating everything into a product concept. The resulting MVP won Best Product at BubbleCon 2023. Discovery done right doesn't just validate assumptions — it builds the foundation for something that wins.",
    },
    phases: [
      {
        number: "01",
        title: "Understanding the problem space",
        body: "We started with no assumptions. Through exploratory research — user interviews, market analysis, and opportunity mapping — we defined the real problem Wuufy needed to solve and who it needed to solve it for.",
      },
      {
        number: "02",
        title: "Defining the user",
        body: "From the research we built a precise user definition: not a persona, but a behavioral and motivational profile that could guide every product decision. Understanding who the user was — and equally, who they weren't — became the filter for scope.",
      },
      {
        number: "03",
        title: "From concept to MVP",
        body1: "With a clear problem and user in place, I led the translation from insight to product concept. We defined the MVP scope, validated the core flows, and built something lean enough to ship and strong enough to win.",
        body2: "The MVP won Best Product at BubbleCon 2023. Discovery done right doesn't just validate assumptions — it builds the foundation for something that wins.",
      },
    ],
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Product Discovery · MVP Premiado',
    title: 'Wuufy',
    subtitle: 'Un proceso completo de discovery que llevó a un MVP — y ganó Mejor Producto en BubbleCon 2023.',
    meta: {
      skillsLabel: 'Habilidades',
      awardLabel: 'Premio',
      companyLabel: 'Empresa',
    },
    about: {
      label: 'Sobre el proyecto',
      heading: 'Discovery bien hecho.',
      body: 'Wuufy comenzó como un proyecto de discovery. Lideré el proceso end-to-end: entender el espacio del problema, definir al usuario, mapear la oportunidad y traducir todo en un concepto de producto. El MVP resultante ganó Mejor Producto en BubbleCon 2023. El discovery bien hecho no solo valida supuestos — construye la base para algo que gana.',
    },
    phases: [
      {
        number: "01",
        title: "Entendiendo el espacio del problema",
        body: "Comenzamos sin supuestos. A través de investigación exploratoria — entrevistas con usuarios, análisis de mercado y mapeo de oportunidades — definimos el problema real que Wuufy necesitaba resolver y para quién necesitaba resolverlo.",
      },
      {
        number: "02",
        title: "Definiendo al usuario",
        body: "A partir de la investigación construimos una definición precisa del usuario: no una persona, sino un perfil conductual y motivacional que pudiera guiar cada decisión de producto. Entender quién era el usuario — e igualmente, quién no era — se convirtió en el filtro para el alcance.",
      },
      {
        number: "03",
        title: "Del concepto al MVP",
        body1: "Con un problema y usuario claros, lideré la traducción de insight a concepto de producto. Definimos el alcance del MVP, validamos los flujos principales y construimos algo lo suficientemente lean para lanzar y lo suficientemente sólido para ganar.",
        body2: "El MVP ganó Mejor Producto en BubbleCon 2023. El discovery bien hecho no solo valida supuestos — construye la base para algo que gana.",
      },
    ],
    nextLabel: 'Próximo caso',
  },
};

const Wuufy = () => {
  const { lang } = useLanguage();
  const t = caseT[lang];

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
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.skillsLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Product Discovery · MVP Definition · Strategic Design</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.awardLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Best Product · BubbleCon 2023</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.companyLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Holistic Interaction</p>
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
        <Link to="/cases/google-startups" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Google for Startups →
        </Link>
      </footer>
    </div>
  );
};

export default Wuufy;
