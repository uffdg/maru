import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';
import journeyMap from '../assets/museodelprado.png';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Strategic Design · Cultural Futures',
    title: 'Museo Nacional\ndel Prado',
    subtitle: "Designing the future visitor experience for one of the world's great museums.",
    meta: {
      skillsLabel: 'Skills',
      companyLabel: 'Company',
      yearLabel: 'Year',
    },
    about: {
      label: 'About the project',
      heading: 'A 200-year-old institution. A future-facing brief.',
      body1: "In collaboration with Paginar and Holistic Interaction, we were commissioned to reimagine the complete digital experience of Museo Nacional del Prado for its 200th anniversary — not just the ticket purchase flow, but the entire visitor journey, from the moment someone considers a visit to long after they leave.",
      body2: "This was a futures design project: we asked what visiting a world-class museum could feel like when technology, culture, and human behavior converge.",
    },
    phases: [
      {
        number: "01",
        title: "Understanding the system",
        body: "We mapped the full visitor ecosystem — who comes to the Prado, from where, with what expectations, and through which channels. We conducted stakeholder interviews, visitor journey research, and competitive benchmarking across the world's leading cultural institutions.",
      },
      {
        number: "02",
        title: "Designing the future",
        body: "We ran co-design sessions with internal teams and external cultural experts to define what a world-class museum experience could look like in the next decade. We moved beyond ticket flows into experience architecture: pre-visit discovery, on-site navigation, and post-visit engagement.",
      },
      {
        number: "03",
        title: "Making it real",
        body: "From the future vision, we designed the digital systems that would bring it to life — a reimagined purchase and planning flow, a personalized visit companion, and a digital layer connecting the physical museum to ongoing cultural engagement.",
      },
      {
        number: "04",
        title: "Learnings & Legacy",
        body1: "Working at this scale — a 200-year-old institution with global reach — taught us that transformation in cultural organizations requires designing for trust as much as usability. Every proposal had to honor the weight of the institution while creating space for a new kind of visitor relationship.",
        body2: "The customer journey map we built remains one of the most complete system maps of a cultural institution's visitor experience — from pre-visit consideration to post-visit engagement, across digital and physical touchpoints.",
      },
    ],
    systemMap: {
      label: 'The System Map',
      title: 'Experiencia Digital\nMuseo del Prado',
      desc: 'A complete map of the future visitor experience — seven phases, two user archetypes, every touchpoint from digital to physical. Built to guide not just design decisions, but organizational strategy.',
      caption: 'Full customer journey map — Museo Nacional del Prado · 2018',
    },
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Diseño Estratégico · Futuros Culturales',
    title: 'Museo Nacional\ndel Prado',
    subtitle: 'Diseñando la experiencia futura del visitante para uno de los grandes museos del mundo.',
    meta: {
      skillsLabel: 'Habilidades',
      companyLabel: 'Empresa',
      yearLabel: 'Año',
    },
    about: {
      label: 'Sobre el proyecto',
      heading: 'Una institución de 200 años. Un brief orientado al futuro.',
      body1: 'En colaboración con Paginar y Holistic Interaction, fuimos comisionados para reimaginar la experiencia digital completa del Museo Nacional del Prado para su 200° aniversario — no solo el flujo de compra de entradas, sino todo el recorrido del visitante, desde el momento en que alguien considera visitar hasta mucho después de que se va.',
      body2: 'Este fue un proyecto de diseño de futuros: nos preguntamos cómo podría sentirse visitar un museo de clase mundial cuando la tecnología, la cultura y el comportamiento humano convergen.',
    },
    phases: [
      {
        number: "01",
        title: "Entendiendo el sistema",
        body: "Mapeamos el ecosistema completo del visitante — quién viene al Prado, desde dónde, con qué expectativas y a través de qué canales. Realizamos entrevistas con stakeholders, investigación del recorrido del visitante y benchmarking competitivo entre las principales instituciones culturales del mundo.",
      },
      {
        number: "02",
        title: "Diseñando el futuro",
        body: "Realizamos sesiones de co-diseño con equipos internos y expertos culturales externos para definir cómo podría ser una experiencia de museo de clase mundial en la próxima década. Fuimos más allá de los flujos de entradas hacia la arquitectura de experiencia: descubrimiento previo a la visita, navegación en el sitio y engagement post-visita.",
      },
      {
        number: "03",
        title: "Haciéndolo real",
        body: "A partir de la visión futura, diseñamos los sistemas digitales que la harían realidad — un flujo de compra y planificación reimaginado, un asistente de visita personalizado y una capa digital que conecta el museo físico con el engagement cultural continuo.",
      },
      {
        number: "04",
        title: "Aprendizajes y legado",
        body1: "Trabajar a esta escala — una institución de 200 años con alcance global — nos enseñó que la transformación en organizaciones culturales requiere diseñar para la confianza tanto como para la usabilidad. Cada propuesta tenía que honrar el peso de la institución mientras creaba espacio para un nuevo tipo de relación con el visitante.",
        body2: "El mapa de customer journey que construimos sigue siendo uno de los mapas sistémicos más completos de la experiencia del visitante de una institución cultural — desde la consideración previa a la visita hasta el engagement post-visita, a través de todos los puntos de contacto digitales y físicos.",
      },
    ],
    systemMap: {
      label: 'El mapa del sistema',
      title: 'Experiencia Digital\nMuseo del Prado',
      desc: 'Un mapa completo de la experiencia futura del visitante — siete fases, dos arquetipos de usuario, cada punto de contacto del digital al físico. Construido para guiar no solo las decisiones de diseño, sino la estrategia organizacional.',
      caption: 'Mapa completo de customer journey — Museo Nacional del Prado · 2018',
    },
    nextLabel: 'Próximo caso',
  },
};

const PradoHoloride = () => {
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
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.skillsLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Strategic Foresight · Experience Design · Systems Thinking</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.companyLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Paginar · Holistic Interaction</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.yearLabel}</p>
            <p className="font-bold text-gray-900 text-sm">2017–2019</p>
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
