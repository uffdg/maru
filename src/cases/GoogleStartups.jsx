import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Mentoring · Latin America',
    title: 'Google for\nStartups',
    subtitle: '20+ cohorts. Hundreds of founders. One consistent mission: help them build the right thing.',
    meta: {
      skillsLabel: 'Skills',
      programLabel: 'Program',
      yearsLabel: 'Years',
    },
    about: {
      label: 'About the work',
      heading: 'Help them build the right thing.',
      body: "Since 2017 I've been a mentor and Design Sprint facilitator for Google for Startups Accelerator across Latin America. I've worked with founders at the earliest and most uncertain stages of their companies — helping them validate ideas, reframe problems, define MVPs, and build product teams. This is where I developed my deepest instinct for what makes a product survive its first contact with reality.",
    },
    phases: [
      {
        number: "01",
        title: "Working at the zero stage",
        body: "Most of the founders I've worked with are pre-product or pre-traction. They have a hypothesis, a team, and a window of time. My role is to help them compress the learning cycle — move from assumption to evidence as fast as possible, without building things they don't need to build yet.",
      },
      {
        number: "02",
        title: "Design Sprints as a thinking tool",
        body: "I've used Design Sprints not as a process checkbox but as a genuine tool for collective sense-making. A well-run sprint forces a founding team to externalize their assumptions, align on the real question, and test a version of the answer before committing to execution. Across 20+ cohorts, this has been the most consistently valuable intervention I've facilitated.",
      },
      {
        number: "03",
        title: "What mentoring taught me about product",
        body1: "Working with hundreds of founders at the earliest stages of their companies gave me something no single product role could: pattern recognition at scale. I've seen the same mistakes made in fintech, agtech, healthtech, and consumer — and I've learned what separates the products that survive first contact with reality from the ones that don't.",
        body2: "This is where I developed my deepest instinct for what makes a product survive its first contact with reality.",
      },
    ],
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Mentoría · Latinoamérica',
    title: 'Google for\nStartups',
    subtitle: 'Más de 20 cohortes. Cientos de founders. Una misión consistente: ayudarlos a construir lo correcto.',
    meta: {
      skillsLabel: 'Habilidades',
      programLabel: 'Programa',
      yearsLabel: 'Años',
    },
    about: {
      label: 'Sobre el trabajo',
      heading: 'Ayudarlos a construir lo correcto.',
      body: 'Desde 2017 soy mentora y facilitadora de Design Sprints para Google for Startups Accelerator en Latinoamérica. He trabajado con founders en las etapas más tempranas e inciertas de sus empresas — ayudándolos a validar ideas, reformular problemas, definir MVPs y construir equipos de producto. Aquí es donde desarrollé mi instinto más profundo sobre qué hace que un producto sobreviva su primer contacto con la realidad.',
    },
    phases: [
      {
        number: "01",
        title: "Trabajando en la etapa cero",
        body: "La mayoría de los founders con los que he trabajado son pre-producto o pre-tracción. Tienen una hipótesis, un equipo y una ventana de tiempo. Mi rol es ayudarlos a comprimir el ciclo de aprendizaje — pasar de supuesto a evidencia lo más rápido posible, sin construir cosas que no necesitan construir todavía.",
      },
      {
        number: "02",
        title: "Design Sprints como herramienta de pensamiento",
        body: "He usado los Design Sprints no como un checkbox de proceso sino como una herramienta genuina para la construcción colectiva de sentido. Un sprint bien ejecutado obliga a un equipo fundador a externalizar sus supuestos, alinearse en la pregunta real y testear una versión de la respuesta antes de comprometerse a la ejecución. A través de más de 20 cohortes, esta ha sido la intervención más consistentemente valiosa que he facilitado.",
      },
      {
        number: "03",
        title: "Lo que la mentoría me enseñó sobre producto",
        body1: "Trabajar con cientos de founders en las etapas más tempranas de sus empresas me dio algo que ningún rol de producto individual podría: reconocimiento de patrones a escala. He visto los mismos errores cometerse en fintech, agtech, healthtech y consumo — y he aprendido qué separa los productos que sobreviven el primer contacto con la realidad de los que no.",
        body2: "Aquí es donde desarrollé mi instinto más profundo sobre qué hace que un producto sobreviva su primer contacto con la realidad.",
      },
    ],
    nextLabel: 'Próximo caso',
  },
};

const GoogleStartups = () => {
  const { lang, toggle } = useLanguage();
  const t = caseT[lang];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
          {t.back}
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Maru Fiorillo</span>
          <button onClick={toggle} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1">
            <span className={lang === 'en' ? 'text-pink-500' : 'text-gray-400'}>EN</span>
            <span className="text-gray-300">/</span>
            <span className={lang === 'es' ? 'text-pink-500' : 'text-gray-400'}>ES</span>
          </button>
        </div>
      </nav>

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
            <p className="font-bold text-gray-900 text-sm">Strategic Mentoring · Design Sprints · Product Validation</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.programLabel}</p>
            <p className="font-bold text-gray-900 text-sm">Google for Startups Accelerator · Latin America</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">{t.meta.yearsLabel}</p>
            <p className="font-bold text-gray-900 text-sm">2017 – Present · 20+ cohorts</p>
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
      <footer className="bg-pink-500 py-16 px-6 md:px-20 text-white text-center rounded-t-[3rem] mt-10">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">{t.nextLabel}</p>
        <Link to="/cases/comodoro" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Barrios con Encanto →
        </Link>
      </footer>
    </div>
  );
};

export default GoogleStartups;
