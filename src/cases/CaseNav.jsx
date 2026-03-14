import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';
import maruLogo from '../assets/maru logo.svg';
import { useState } from 'react';

const cases = [
  { slug: 'mercantil-andina', en: 'Mercantil Andina', es: 'Mercantil Andina' },
  { slug: 'agrofy',           en: 'Agrofy',           es: 'Agrofy' },
  { slug: 'wuufy',            en: 'Wuufy',            es: 'Wuufy' },
  { slug: 'google-startups',  en: 'Google for Startups', es: 'Google for Startups' },
  { slug: 'comodoro',         en: 'Comodoro Rivadavia', es: 'Comodoro Rivadavia' },
  { slug: 'prado-holoride',   en: 'Museo Nacional del Prado', es: 'Museo Nacional del Prado' },
  { slug: 'holoride',         en: 'Holoride', es: 'Holoride' },
];

const CaseNav = () => {
  const { lang, toggle } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 md:px-20 py-5">
        <Link to="/">
          <img src={maruLogo} alt="Maru Fiorillo" style={{ height: '32px', width: 'auto' }} />
        </Link>

        <div className="flex items-center gap-6">
          {/* Cases dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(o => !o)}
              className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1"
            >
              {lang === 'en' ? 'Cases' : 'Casos'}
              <span className={`inline-block transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {open && (
              <div className="absolute right-0 top-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 min-w-[220px] z-50">
                {cases.map(c => {
                  const active = pathname === `/cases/${c.slug}`;
                  return (
                    <Link
                      key={c.slug}
                      to={`/cases/${c.slug}`}
                      onClick={() => setOpen(false)}
                      className={`block px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                        active
                          ? 'text-pink-500 bg-pink-50'
                          : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50/50'
                      }`}
                    >
                      {c[lang]}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
            ← Portfolio
          </Link>

          <button onClick={toggle} className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1">
            <span className={lang === 'en' ? 'text-pink-500' : 'text-gray-400'}>EN</span>
            <span className="text-gray-300">/</span>
            <span className={lang === 'es' ? 'text-pink-500' : 'text-gray-400'}>ES</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default CaseNav;
