import { useParams, Link } from 'react-router-dom';

const cases = {
  'comodoro': 'Barrios con Encanto — Comodoro Rivadavia',
  'prado-holoride': 'Prado Museum & Holoride',
  'mercantil-andina': 'Mercantil Andina',
  'agrofy': 'Agrofy',
  'wuufy': 'Wuufy',
  'google-startups': 'Google for Startups',
};

const CasePage = () => {
  const { slug } = useParams();
  const title = cases[slug] ?? 'Case Study';

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-gray-900 hover:text-pink-500 transition-colors">
          ← Back
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Maru Fiorillo</span>
      </nav>
      <div className="pt-40 pb-32 px-6 md:px-20 max-w-4xl mx-auto">
        <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">Case Study</p>
        <h1 className="text-6xl md:text-7xl font-black leading-none tracking-tighter text-gray-900 mb-12">
          {title}
        </h1>
        <p className="text-gray-400 text-lg">Full case study coming soon.</p>
      </div>
    </div>
  );
};

export default CasePage;
