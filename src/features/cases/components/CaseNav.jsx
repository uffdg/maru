import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cases } from '../../content/cases';
import { useLanguage } from '../../content/useLanguage';
import SiteLogo from '../../../shared/components/SiteLogo';
import LanguageToggle from '../../../shared/components/LanguageToggle';

const CaseNav = () => {
  const { lang, toggle } = useLanguage();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="flex items-center justify-between px-6 md:px-20 py-5">
        <SiteLogo />

        <div className="flex items-center gap-6">
          <div className="relative">
            <button
              onClick={() => setOpen((current) => !current)}
              className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1"
            >
              {lang === 'en' ? 'Cases' : 'Casos'}
              <span className={`inline-block transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>▾</span>
            </button>

            {open ? (
              <div className="absolute right-0 top-full mt-3 bg-white border border-gray-100 rounded-2xl shadow-xl py-3 min-w-[220px] z-50">
                {cases.map((item) => {
                  const active = pathname === item.route;

                  return (
                    <Link
                      key={item.slug}
                      to={item.route}
                      onClick={() => setOpen(false)}
                      className={`block px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${
                        active
                          ? 'text-pink-500 bg-pink-50'
                          : 'text-gray-500 hover:text-pink-500 hover:bg-pink-50/50'
                      }`}
                    >
                      {item.hero[lang].title.replace(/\n/g, ' ')}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </div>

          <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
            ← Portfolio
          </Link>

          <LanguageToggle lang={lang} onToggle={toggle} />
        </div>
      </div>
    </nav>
  );
};

export default CaseNav;
