import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import CaseNav from './CaseNav';

const caseT = {
  en: {
    back: '← Back to portfolio',
    label: 'Product Leadership · Emerging Technology',
    title: 'Holoride',
    subtitle: 'Leading design and research for a frontier technology startup — before the market was ready.',
    about: {
      label: 'About the project',
      heading: "A product category that didn't exist yet.",
      body1: "Holoride was a Munich-based startup building immersive VR entertainment for passengers inside moving vehicles — a product category that didn't exist yet. I led the design and research team, managing the end-to-end process from user research strategy to UI delivery across multiple product workstreams including Holo Credits, the Shopping Cart Flow, and market validation exercises with participants across Europe and the US.",
      body2: "Holoride shut down in 2024. Working on a product ahead of its time is one of the most instructive experiences a product leader can have.",
    },
    phases: [
      {
        number: "01",
        title: "Research & Strategy",
        body: "We designed a multi-market research strategy to understand how passengers in moving vehicles experience discomfort, entertainment, and immersion. Studies were conducted with participants across Europe and the US, combining in-vehicle sessions, remote testing, and concept validation exercises across multiple product workstreams.",
      },
      {
        number: "02",
        title: "Product Design",
        body: "I led the design team across several concurrent workstreams: Holo Credits (the platform's reward and monetization system), the Shopping Cart Flow (in-vehicle commerce), and the core VR content experience. Each required designing for a context — a moving vehicle, with motion sickness constraints and no standard interaction conventions — that had no established design patterns.",
      },
      {
        number: "03",
        title: "Validation",
        body1: "We ran validation exercises across multiple markets to test both usability and product-market fit. The core challenge was not whether users could use the product — they could — but whether the problem the product solved was real enough, and present enough in daily life, to build a sustainable business around.",
        body2: "Holoride shut down in 2024. Working on a product ahead of its time is one of the most instructive experiences a product leader can have.",
      },
    ],
    reflection: {
      label: 'Reflection',
      title: 'What I learned',
      body: '"Designing for a product category that doesn\'t exist yet requires a different kind of research. You\'re not validating solutions — you\'re validating whether the problem is real enough to sustain a business. Holoride had brilliant technology. The market timing wasn\'t there. That\'s a product lesson, not a design lesson."',
    },
    nextLabel: 'Next case study',
  },
  es: {
    back: '← Volver al portfolio',
    label: 'Liderazgo de Producto · Tecnología Emergente',
    title: 'Holoride',
    subtitle: 'Liderando diseño e investigación para una startup de tecnología de frontera — antes de que el mercado estuviera listo.',
    about: {
      label: 'Sobre el proyecto',
      heading: 'Una categoría de producto que aún no existía.',
      body1: 'Holoride era una startup de Múnich que construía entretenimiento VR inmersivo para pasajeros dentro de vehículos en movimiento — una categoría de producto que aún no existía. Lideré el equipo de diseño e investigación, gestionando el proceso end-to-end desde la estrategia de investigación de usuarios hasta la entrega de UI en múltiples workstreams de producto, incluyendo Holo Credits, el Flujo del Carrito de Compras y ejercicios de validación de mercado con participantes de Europa y los Estados Unidos.',
      body2: 'Holoride cerró en 2024. Trabajar en un producto antes de su tiempo es una de las experiencias más instructivas que puede tener un product leader.',
    },
    phases: [
      {
        number: "01",
        title: "Investigación y estrategia",
        body: "Diseñamos una estrategia de investigación multi-mercado para entender cómo los pasajeros en vehículos en movimiento experimentan el malestar, el entretenimiento y la inmersión. Los estudios se realizaron con participantes en Europa y los Estados Unidos, combinando sesiones dentro de vehículos, testing remoto y ejercicios de validación de conceptos en múltiples workstreams de producto.",
      },
      {
        number: "02",
        title: "Diseño de producto",
        body: "Lideré el equipo de diseño en varios workstreams simultáneos: Holo Credits (el sistema de recompensas y monetización de la plataforma), el Flujo del Carrito de Compras (comercio dentro del vehículo) y la experiencia central de contenido VR. Cada uno requería diseñar para un contexto — un vehículo en movimiento, con restricciones de mareos y sin convenciones de interacción establecidas — que no tenía patrones de diseño previos.",
      },
      {
        number: "03",
        title: "Validación",
        body1: "Realizamos ejercicios de validación en múltiples mercados para testear tanto la usabilidad como el product-market fit. El desafío central no era si los usuarios podían usar el producto — podían — sino si el problema que el producto resolvía era suficientemente real y presente en la vida cotidiana como para construir un negocio sostenible.",
        body2: "Holoride cerró en 2024. Trabajar en un producto antes de su tiempo es una de las experiencias más instructivas que puede tener un product leader.",
      },
    ],
    reflection: {
      label: 'Reflexión',
      title: 'Lo que aprendí',
      body: '"Diseñar para una categoría de producto que aún no existe requiere un tipo diferente de investigación. No estás validando soluciones — estás validando si el problema es suficientemente real como para sostener un negocio. Holoride tenía tecnología brillante. El timing de mercado no estuvo. Esa es una lección de producto, no una lección de diseño."',
    },
    nextLabel: 'Próximo caso',
  },
};

const Holoride = () => {
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
            <p className="text-[10px] font-bold uppercase text-gray-400">Skills</p>
            <p className="font-bold text-gray-900 text-sm">Design Team Leadership · Research Strategy · Product Management</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Company</p>
            <p className="font-bold text-gray-900 text-sm">Holoride · Holistic Interaction</p>
          </div>
          <div className="space-y-2 border-l-2 border-gray-100 pl-6">
            <p className="text-[10px] font-bold uppercase text-gray-400">Year</p>
            <p className="font-bold text-gray-900 text-sm">2023–2024</p>
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
      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <p className="text-[11px] font-bold uppercase tracking-widest text-white/70 mb-6">{t.nextLabel}</p>
        <Link to="/cases/comodoro" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          Barrios con Encanto →
        </Link>
      </footer>
    </div>
  );
};

export default Holoride;
