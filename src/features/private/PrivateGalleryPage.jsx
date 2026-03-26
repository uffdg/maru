import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight, Eye } from 'lucide-react';
import { privateGalleryPassword, privateProjects } from './data/localPrivateProjects';
import MastercardStoryProject from './MastercardStoryProject';

const STORAGE_KEY = 'private-gallery-authenticated';

const PROJECTS = [
  { id: 'qurable',    label: 'Qurable',         description: 'Loyalty platform', tag: 'Product flows' },
  { id: 'mastercard', label: 'Mastercard DEMO',  description: 'by Qurable',       tag: '48h sprint'    },
];

// ── Single screen card ───────────────────────────────────────
const ScreenCard = ({ entry }) => (
  <figure className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.05)] transition hover:shadow-[0_8px_32px_rgba(15,23,42,0.10)]">
    <div className="overflow-hidden bg-gradient-to-b from-pink-50/50 to-slate-50 p-3">
      <img
        src={entry.image}
        alt={entry.title}
        className="w-full rounded-xl border border-slate-200/60 bg-white transition duration-300 group-hover:scale-[1.01]"
        loading="lazy"
      />
    </div>
    <figcaption className="border-t border-slate-100 px-4 py-3">
      <h4 className="text-sm font-bold leading-snug text-slate-900">{entry.title}</h4>
      <p className="mt-1 text-xs leading-5 text-slate-500">{entry.description}</p>
    </figcaption>
  </figure>
);

// ── Qurable project view ─────────────────────────────────────
const QurableProject = ({ projects }) => {
  const project = projects[0];
  const modules = (project?.modules || []).filter((m) => m.entries.length > 0);
  const [activeSlug, setActiveSlug] = useState(modules[0]?.slug ?? null);
  const currentModule = modules.find((m) => m.slug === activeSlug) ?? modules[0];

  return (
    <div className="space-y-8">
      {/* Project header */}
      <div>
        <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF0066]">{project.client}</p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-950 md:text-4xl">{project.title}</h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-slate-500">{project.summary}</p>
      </div>

      {/* Module tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-6">
        {modules.map((mod) => {
          const active = mod.slug === (currentModule?.slug);
          return (
            <button
              key={mod.slug}
              type="button"
              onClick={() => setActiveSlug(mod.slug)}
              className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] transition ${
                active
                  ? 'border-pink-200 bg-[#FF0066] text-white shadow-sm shadow-pink-200'
                  : 'border-slate-200 bg-white text-slate-500 hover:border-pink-200 hover:text-[#FF0066]'
              }`}
            >
              {mod.title}
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-black tabular-nums ${
                active ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {mod.entries.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active module */}
      {currentModule && (
        <div className="space-y-6">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h3 className="text-xl font-black tracking-tight text-slate-950">{currentModule.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">{currentModule.summary}</p>
            </div>
            <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-pink-100 bg-pink-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#FF0066] md:inline-flex">
              <Eye className="h-3 w-3" />
              {currentModule.entries.length} screens
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {currentModule.entries.map((entry) => (
              <ScreenCard key={entry.slug} entry={entry} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ── Main page ────────────────────────────────────────────────
const PrivateGalleryPage = () => {
  const [password, setPassword] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState('');
  const [activeProject, setActiveProject] = useState('qurable');

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setIsUnlocked(window.localStorage.getItem(STORAGE_KEY) === 'true');
  }, []);

  const availableProjects = useMemo(
    () =>
      privateProjects.map((project) => ({
        ...project,
        entries: project.entries.filter((entry) => entry.image),
        modules: (project.modules || []).map((module) => ({
          ...module,
          entries: project.entries.filter((entry) => entry.image && entry.module === module.slug),
        })),
      })),
    [],
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== privateGalleryPassword) {
      setError('Incorrect password.');
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, 'true');
    setIsUnlocked(true);
    setError('');
    setPassword('');
  };

  const handleLock = () => {
    window.localStorage.removeItem(STORAGE_KEY);
    setIsUnlocked(false);
  };

  return (
    <main className="min-h-screen bg-white text-slate-900">

      {/* ── Header band ──────────────────────────────────── */}
      <div style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #ffffff 60%)' }}>
        <div className="mx-auto max-w-7xl px-6 pb-10 pt-10 md:px-12 md:pb-12 md:pt-12">

          {/* Top nav */}
          <div className="mb-10 flex items-center justify-between">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF0066] transition hover:opacity-70"
            >
              <ArrowRight className="h-4 w-4 rotate-180" />
              Portfolio
            </Link>
            {isUnlocked && (
              <button
                type="button"
                onClick={handleLock}
                className="inline-flex items-center gap-2 rounded-full border border-pink-200/60 bg-white/50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF0066] backdrop-blur-sm transition hover:bg-white/80"
              >
                <Lock className="h-3.5 w-3.5" />
                Lock
              </button>
            )}
          </div>

          {/* Title */}
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.28em] text-[#FF0066]">
            Confidential portfolio
          </p>
          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-5xl">
            Private work
          </h1>
          <p className="mt-3 max-w-lg text-base leading-7 text-slate-500">
            Password-protected area for confidential case material and unreleased product work.
          </p>

          {/* Password gate — inside header */}
          {!isUnlocked && (
            <form className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-end" onSubmit={handleSubmit}>
              <label className="block">
                <span className="mb-2 block text-[11px] font-bold uppercase tracking-[0.24em] text-[#FF0066]">
                  Password
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-72 rounded-2xl border border-pink-200/60 bg-white/70 px-4 py-3 text-base text-slate-900 backdrop-blur-sm outline-none transition focus:border-[#FF0066] focus:bg-white focus:ring-4 focus:ring-[#FF0066]/10"
                  placeholder="Enter password"
                  autoFocus
                />
              </label>
              <div className="flex flex-col gap-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 rounded-full bg-[#FF0066] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.24em] text-white transition hover:opacity-90"
                >
                  Unlock
                  <ArrowRight className="h-4 w-4" />
                </button>
                {error && <p className="text-sm font-medium text-rose-500">{error}</p>}
              </div>
            </form>
          )}

          {/* Project switcher — inside header, flush to bottom */}
          {isUnlocked && (
            <div className="mt-10 flex gap-3">
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveProject(p.id)}
                  className={`flex flex-col items-start gap-0.5 rounded-2xl border px-5 py-4 text-left transition ${
                    activeProject === p.id
                      ? 'border-pink-300/70 bg-white shadow-[0_4px_20px_rgba(255,0,102,0.12)]'
                      : 'border-pink-200/40 bg-white/40 hover:bg-white/70'
                  }`}
                >
                  <span className={`text-sm font-black tracking-tight ${activeProject === p.id ? 'text-slate-950' : 'text-slate-500'}`}>
                    {p.label}
                  </span>
                  <span className={`text-[11px] ${activeProject === p.id ? 'text-[#FF0066] font-semibold' : 'text-slate-400'}`}>
                    {p.description} · {p.tag}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Content band (white) ───────────────────────────── */}
      {isUnlocked && (
        <div className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
          {activeProject === 'qurable' && <QurableProject projects={availableProjects} />}
          {activeProject === 'mastercard' && <MastercardStoryProject />}
        </div>
      )}
    </main>
  );
};

export default PrivateGalleryPage;
