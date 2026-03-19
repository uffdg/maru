const LanguageToggle = ({ lang, onToggle }) => (
  <button
    onClick={onToggle}
    className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1"
    aria-label="Toggle language"
  >
    <span className={lang === 'en' ? 'text-pink-500' : 'text-gray-400'}>EN</span>
    <span className="text-gray-300">/</span>
    <span className={lang === 'es' ? 'text-pink-500' : 'text-gray-400'}>ES</span>
  </button>
);

export default LanguageToggle;
