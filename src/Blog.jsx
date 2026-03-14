import { Link } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { posts } from './data/posts';

const Blog = () => {
  const { lang, toggle } = useLanguage();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link to="/" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
          ← {lang === 'en' ? 'Back' : 'Volver'}
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

      <section className="pt-40 pb-24 px-6 md:px-20">
        <div className="max-w-4xl mx-auto">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-6">
            {lang === 'en' ? 'Writing' : 'Escritura'}
          </p>
          <h1 className="text-7xl md:text-[100px] font-black leading-none tracking-tighter text-gray-900 mb-16">
            Blog
          </h1>

          <div className="space-y-0">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group flex flex-col md:flex-row md:items-start gap-6 py-10 border-t border-gray-100 hover:border-pink-200 transition-colors"
              >
                <div className="md:w-32 shrink-0">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500">{post.label}</span>
                  <p className="text-[10px] text-gray-400 mt-1 font-medium">
                    {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 group-hover:text-pink-500 transition-colors leading-tight">
                    {post[lang].title}
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">{post[lang].excerpt}</p>
                </div>
                <div className="shrink-0 text-gray-300 group-hover:text-pink-500 transition-colors md:pt-1">
                  <span className="text-xl font-black">→</span>
                </div>
              </Link>
            ))}
            <div className="border-t border-gray-100" />
          </div>
        </div>
      </section>

      <footer className="bg-pink-500 py-16 px-6 md:px-20 text-white text-center rounded-t-[3rem] mt-10">
        <Link to="/" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          {lang === 'en' ? '← Back to portfolio' : '← Volver al portfolio'}
        </Link>
      </footer>
    </div>
  );
};

export default Blog;
