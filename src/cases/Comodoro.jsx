import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Strategic Foresight · Urban Design',
    title: 'Barrios con Encanto —\nComodoro Rivadavia',
    subtitle: 'Designing 10-year futures for three historic neighborhoods in Comodoro Rivadavia, Patagonia.',
    meta: {
      clientLabel: 'Client',
      roleLabel: 'Role',
      outputLabel: 'Output',
    },
    about: {
      label: 'About the project',
      heading: 'Futures designed from within.',
      body: "As part of Comodoro Rivadavia's Pioneros 2030 strategic plan, I led the field research and future conceptualization of three historic neighborhoods — KM5, Astra, and Diadema. Working directly with residents, I mapped current identity and designed distinct 10-year futures for each: a youth and knowledge hub, a world-class audiovisual and cultural district, and a wellness and spirituality destination.",
    },
    challenge: {
      label: '01',
      title: 'The Challenge',
      body: 'Comodoro Rivadavia needed to define the future of three historic neighborhoods — KM5, Astra, and Diadema — based on the identity and voice of their own residents, not top-down urban planning.',
    },
    process: {
      label: '02',
      title: 'The Process',
      body: 'We conducted two full field visits to each neighborhood. From there we built empathy maps, identity mindmaps, HMW ideation sessions, and future scenario maps for each one.',
    },
    concepts: {
      label: '03',
      title: 'The Concepts',
    },
    learned: {
      label: '04',
      title: 'What I learned',
      body: '"Designing futures for communities requires listening before proposing. The strongest concepts came directly from what residents said they valued — not what external experts assumed they needed."',
    },
    neighborhoods: [
      {
        title: "KM5 — El Barrio del Futuro Joven",
        concept: "A youth and knowledge hub connecting the neighborhood's industrial heritage with the nearby university. Proposed: co-living spaces, extreme sports park in the old YPF pool, coastal gastronomy route, sustainable housing, and a cultural arts corridor.",
      },
      {
        title: "Astra — Polo Audiovisual Patagónico",
        concept: "A world-class audiovisual and cultural district built around the existing rugby infrastructure and historic buildings. Proposed: film sets, international festivals, a cine-theatre of excellence, innovation hub, and co-working spaces for creative industries.",
      },
      {
        title: "Diadema — Destino Wellness de la Patagonia",
        concept: "A wellness, spirituality, and sustainability destination anchored in the neighborhood's natural tranquility and existing monastic presence. Proposed: retreat centers, glamping, organic gastronomy, mindfulness spaces, and a renewable energy corridor.",
      },
    ],
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Foresight Estratégico · Diseño Urbano',
    title: 'Barrios con Encanto —\nComodoro Rivadavia',
    subtitle: 'Diseñando futuros a 10 años para tres barrios históricos de Comodoro Rivadavia, Patagonia.',
    meta: {
      clientLabel: 'Cliente',
      roleLabel: 'Rol',
      outputLabel: 'Resultado',
    },
    about: {
      label: 'Sobre el proyecto',
      heading: 'Futuros diseñados desde adentro.',
      body: 'Como parte del plan estratégico Pioneros 2030 de Comodoro Rivadavia, lideré la investigación de campo y la conceptualización de futuros de tres barrios históricos — KM5, Astra y Diadema. Trabajando directamente con los vecinos, mapeé la identidad actual y diseñé futuros a 10 años distintos para cada uno: un hub de juventud y conocimiento, un distrito audiovisual y cultural de clase mundial, y un destino de bienestar y espiritualidad.',
    },
    challenge: {
      label: '01',
      title: 'El desafío',
      body: 'Comodoro Rivadavia necesitaba definir el futuro de tres barrios históricos — KM5, Astra y Diadema — basado en la identidad y la voz de sus propios vecinos, no en planificación urbana de arriba hacia abajo.',
    },
    process: {
      label: '02',
      title: 'El proceso',
      body: 'Realizamos dos visitas completas de campo a cada barrio. A partir de ahí construimos mapas de empatía, mapas mentales de identidad, sesiones de ideación HMW y mapas de escenarios futuros para cada uno.',
    },
    concepts: {
      label: '03',
      title: 'Los conceptos',
    },
    learned: {
      label: '04',
      title: 'Lo que aprendí',
      body: '"Diseñar futuros para comunidades requiere escuchar antes de proponer. Los conceptos más fuertes vinieron directamente de lo que los vecinos dijeron que valoraban — no de lo que expertos externos asumían que necesitaban."',
    },
    neighborhoods: [
      {
        title: "KM5 — El Barrio del Futuro Joven",
        concept: "A youth and knowledge hub connecting the neighborhood's industrial heritage with the nearby university. Proposed: co-living spaces, extreme sports park in the old YPF pool, coastal gastronomy route, sustainable housing, and a cultural arts corridor.",
      },
      {
        title: "Astra — Polo Audiovisual Patagónico",
        concept: "A world-class audiovisual and cultural district built around the existing rugby infrastructure and historic buildings. Proposed: film sets, international festivals, a cine-theatre of excellence, innovation hub, and co-working spaces for creative industries.",
      },
      {
        title: "Diadema — Destino Wellness de la Patagonia",
        concept: "A wellness, spirituality, and sustainability destination anchored in the neighborhood's natural tranquility and existing monastic presence. Proposed: retreat centers, glamping, organic gastronomy, mindfulness spaces, and a renewable energy corridor.",
      },
    ],
    nextLabel: 'Próximo caso',
  },
};

const Comodoro = () => {
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
          <div className="space-y-2 border-l-2 border-pink-500 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.clientLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Plan Pioneros 2030 · Municipio de Comodoro Rivadavia</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.roleLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Lead Field Researcher & Strategist</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
            <p className="font-bold text-gray-900 text-sm">2021</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Team</p>
            <p className="font-bold text-gray-900 text-sm">HI — Holistic Interaction</p>
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
