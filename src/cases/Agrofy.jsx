import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Mentoring · Agtech Startup',
    title: 'Agrofy',
    subtitle: "Mentoring and training the product and design team of one of Latin America's leading agtech platforms.",
    meta: {
      skillsLabel: 'Skills',
      companyLabel: 'Company',
    },
    about: {
      label: 'About the project',
      heading: 'Growing the people around you.',
      body: 'Agrofy is one of the largest agtech marketplaces in Latin America. I worked with their team as a mentor and trainer, helping them build product and design capabilities, sharpen their processes, and grow as a cross-functional team. Sometimes the most impactful product work is the one you do by growing the people around you.',
    },
    phases: [
      {
        number: "01",
        title: "Building product capability",
        body: "I worked with Agrofy's product and design team to identify gaps in their process and practice. Rather than delivering outputs, the goal was to build internal capability — giving the team the frameworks, tools, and confidence to make better product decisions on their own.",
      },
      {
        number: "02",
        title: "Design thinking in practice",
        body: "We ran workshops and working sessions that brought design thinking into the team's everyday workflow — not as a methodology to follow, but as a lens for approaching problems. The focus was on research habits, framing questions well, and validating before building.",
      },
      {
        number: "03",
        title: "Growing cross-functional teams",
        body: "Some of the most valuable work happened at the intersection of product, design, and engineering. I helped the team build shared language, clearer handoffs, and a culture of collaborative decision-making. Sometimes the most impactful product work is the one you do by growing the people around you.",
      },
    ],
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Mentoría · Startup Agtech',
    title: 'Agrofy',
    subtitle: 'Mentoreando y capacitando al equipo de producto y diseño de una de las principales plataformas agtech de Latinoamérica.',
    meta: {
      skillsLabel: 'Habilidades',
      companyLabel: 'Empresa',
    },
    about: {
      label: 'Sobre el proyecto',
      heading: 'Haciendo crecer a las personas a tu alrededor.',
      body: 'Agrofy es uno de los marketplaces de agtech más grandes de Latinoamérica. Trabajé con su equipo como mentora y capacitadora, ayudándolos a construir capacidades de producto y diseño, afilar sus procesos y crecer como equipo cross-funcional. A veces el trabajo de producto más impactante es el que hacés haciendo crecer a las personas a tu alrededor.',
    },
    phases: [
      {
        number: "01",
        title: "Construyendo capacidad de producto",
        body: "Trabajé con el equipo de producto y diseño de Agrofy para identificar brechas en su proceso y práctica. En lugar de entregar outputs, el objetivo era construir capacidad interna — darle al equipo los frameworks, herramientas y confianza para tomar mejores decisiones de producto por su cuenta.",
      },
      {
        number: "02",
        title: "Design thinking en la práctica",
        body: "Realizamos workshops y sesiones de trabajo que llevaron el design thinking al flujo de trabajo cotidiano del equipo — no como una metodología a seguir, sino como una lente para abordar problemas. El foco estuvo en hábitos de investigación, formular bien las preguntas y validar antes de construir.",
      },
      {
        number: "03",
        title: "Haciendo crecer equipos cross-funcionales",
        body: "Parte del trabajo más valioso sucedió en la intersección de producto, diseño e ingeniería. Ayudé al equipo a construir lenguaje compartido, handoffs más claros y una cultura de toma de decisiones colaborativa. A veces el trabajo de producto más impactante es el que hacés haciendo crecer a las personas a tu alrededor.",
      },
    ],
    nextLabel: 'Próximo caso',
  },
};

const Agrofy = () => {
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
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-pink-50">
          <div className="space-y-2 border-l-2 border-pink-500 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.skillsLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Team Mentoring · Product Coaching · Design Thinking</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.companyLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Agrofy · Holistic Interaction</p>
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
        <Link to="/cases/wuufy" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Wuufy →
        </Link>
      </footer>
    </div>
  );
};

export default Agrofy;
