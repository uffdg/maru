import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Product Leadership · Insurance',
    title: 'Mercantil\nAndina',
    subtitle: 'Mapping the pain points of a traditional insurance company to define a product roadmap for digital transformation.',
    about: {
      label: 'About the project',
      heading: 'From friction to roadmap.',
      body: "Mercantil Andina is one of Argentina's leading insurance companies. I led the design team and the product discovery process, identifying critical pain points across their digital and operational experience. From that research I defined and prioritized a product roadmap that translated user and business needs into a clear execution plan.",
    },
    phases: [
      {
        number: "01",
        title: "Understanding the pain points",
        body: "We conducted an extensive discovery process across multiple touchpoints — policyholder journeys, internal operational workflows, and digital product audits. The goal was to identify where friction was highest and where a digital intervention would generate the most business and user value.",
      },
      {
        number: "02",
        title: "Mapping the system",
        body: "From the research we built a comprehensive pain point map connecting user frustrations to operational bottlenecks. This allowed us to see not just where users struggled, but why — and what organizational or technical constraints were behind each friction point.",
      },
      {
        number: "03",
        title: "Defining the roadmap",
        body: "With a clear picture of the problem landscape, I led the prioritization process and defined a product roadmap that translated user and business needs into a structured execution plan — phased by impact, feasibility, and strategic alignment.",
      },
    ],
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Liderazgo de Producto · Seguros',
    title: 'Mercantil\nAndina',
    subtitle: 'Mapeando los pain points de una compañía de seguros tradicional para definir un roadmap de producto para la transformación digital.',
    about: {
      label: 'Sobre el proyecto',
      heading: 'Del dolor al roadmap.',
      body: 'Mercantil Andina es una de las principales compañías de seguros de Argentina. Lideré el equipo de diseño y el proceso de product discovery, identificando pain points críticos en su experiencia digital y operacional. A partir de esa investigación definí y prioricé un roadmap de producto que tradujo las necesidades de usuarios y negocio en un plan de ejecución claro.',
    },
    phases: [
      {
        number: "01",
        title: "Entendiendo los pain points",
        body: "Realizamos un extenso proceso de discovery a través de múltiples touchpoints — recorridos de asegurados, flujos operativos internos y auditorías de producto digital. El objetivo era identificar dónde era mayor la fricción y dónde una intervención digital generaría más valor para el negocio y los usuarios.",
      },
      {
        number: "02",
        title: "Mapeando el sistema",
        body: "A partir de la investigación construimos un mapa completo de pain points que conectaba las frustraciones de los usuarios con los cuellos de botella operacionales. Esto nos permitió ver no solo dónde los usuarios tenían dificultades, sino por qué — y qué restricciones organizativas o técnicas había detrás de cada punto de fricción.",
      },
      {
        number: "03",
        title: "Definiendo el roadmap",
        body: "Con un panorama claro del problema, lideré el proceso de priorización y definí un roadmap de producto que tradujo las necesidades de usuarios y negocio en un plan de ejecución estructurado — organizado por impacto, factibilidad y alineación estratégica.",
      },
    ],
    nextLabel: 'Próximo caso',
  },
};

const MercantilAndina = () => {
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
            <p className="font-bold text-gray-900 text-sm">Team Leadership · Pain Point Mapping · Product Roadmap</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Company</p>
            <p className="font-bold text-gray-900 text-sm">Mercantil Andina · Holistic Interaction</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
            <p className="font-bold text-gray-900 text-sm">—</p>
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
              <p>{phase.body}</p>
            </div>
          </div>
        </section>
      ))}

      {/* FOOTER */}
      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">{t.nextLabel}</p>
        <Link to="/cases/agrofy" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Agrofy →
        </Link>
      </footer>
    </div>
  );
};

export default MercantilAndina;
