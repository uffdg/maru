import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import maruLogo from '../assets/maru logo.svg';

const CaseNav = () => {
  const { lang, toggle } = useLanguage();
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <Link to="/">
        <img src={maruLogo} alt="Maru Fiorillo" style={{ height: '32px', width: 'auto' }} />
      </Link>
      <div className="flex items-center gap-6">
        <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
          {lang === 'en' ? '← Portfolio' : '← Portfolio'}
        </Link>
        <button onClick={toggle} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1">
          <span className={lang === 'en' ? 'text-pink-500' : 'text-gray-400'}>EN</span>
          <span className="text-gray-300">/</span>
          <span className={lang === 'es' ? 'text-pink-500' : 'text-gray-400'}>ES</span>
        </button>
      </div>
    </nav>
  );
};

export default CaseNav;
