import { Link, useParams } from 'react-router-dom';
import { useLanguage } from './LanguageContext';
import { posts } from './data/posts';

// Renders **bold** markers as <strong>
const parseBold = (text) => {
  if (!text || !text.includes('**')) return text;
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith('**') && part.endsWith('**')
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : part
  );
};

const renderBlock = (block, i) => {
  switch (block.type) {
    case 'intro':
      return <p key={i} className="text-xl text-gray-500 italic mb-10 leading-relaxed">{parseBold(block.text)}</p>;
    case 'paragraph':
      return <p key={i} className="text-gray-600 text-lg leading-relaxed mb-6">{parseBold(block.text)}</p>;
    case 'h2':
      return <h2 key={i} className="text-3xl font-black text-gray-900 mt-16 mb-6 leading-tight">{block.text}</h2>;
    case 'h3':
      return <h3 key={i} className="text-lg font-black text-pink-500 uppercase tracking-widest mt-10 mb-4">{block.text}</h3>;
    case 'list':
      return (
        <ul key={i} className="mb-6 space-y-3">
          {(block.items || []).map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-gray-600 text-lg leading-relaxed">
              <span className="text-pink-400 font-black mt-1 shrink-0">—</span>
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>
      );
    case 'quote':
      return (
        <blockquote key={i} className="my-10 pl-6 border-l-4 border-pink-300">
          <p className="text-2xl font-black text-gray-900 leading-tight italic">{parseBold(block.text)}</p>
        </blockquote>
      );
    case 'callout':
      return (
        <div key={i} className="my-10 bg-pink-50 border border-pink-100 rounded-2xl p-8">
          <p className="text-gray-700 text-base leading-relaxed">{parseBold(block.text)}</p>
        </div>
      );
    case 'image':
      return (
        <div key={i} className="my-10">
          <img src={block.url} alt={block.alt || ''} className="w-full rounded-2xl" />
          {block.alt && <p className="text-center text-xs text-gray-400 mt-3">{block.alt}</p>}
        </div>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const { lang, toggle } = useLanguage();
  const post = posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">404</p>
          <h1 className="text-5xl font-black text-gray-900 mb-8">Post not found</h1>
          <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:underline">
            ← {lang === 'en' ? 'Back to Blog' : 'Volver al Blog'}
          </Link>
        </div>
      </div>
    );
  }

  const content = post[lang]?.content;

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100">

      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link to="/blog" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
          ← Blog
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

      <article className="pt-40 pb-24 px-6 md:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">{post.label}</span>
            <span className="text-[10px] text-gray-400 font-medium">
              {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : 'es-AR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter text-gray-900 mb-10">
            {post[lang]?.title}
          </h1>

          {content ? (
            <div className="mt-12">
              {content.map((block, i) => renderBlock(block, i))}
            </div>
          ) : (
            <>
              <p className="text-xl text-gray-600 leading-relaxed border-l-4 border-pink-200 pl-6 mb-16">
                {post[lang]?.excerpt}
              </p>
              <div className="bg-pink-50/40 border border-pink-100 rounded-[2rem] p-10 text-center">
                <p className="text-gray-500 text-sm leading-relaxed">
                  {lang === 'en' ? 'Full article coming soon.' : 'Artículo completo próximamente.'}
                </p>
              </div>
            </>
          )}
        </div>
      </article>

      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <Link to="/blog" className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors">
          {lang === 'en' ? '← Back to Blog' : '← Volver al Blog'}
        </Link>
      </footer>
    </div>
  );
};

export default BlogPost;
