import { Link, useParams } from 'react-router-dom';
import { useLanguage } from '../content/useLanguage';
import { getPostBySlug } from '../content/posts';
import { renderRichBlock } from './lib/renderRichText';
import { toLocaleDate } from '../../shared/lib/format';
import { usePageSeo } from '../../shared/seo/usePageSeo';
import LanguageToggle from '../../shared/components/LanguageToggle';
import { trackEvent } from '../../shared/analytics/trackEvent';

const BlogPostPage = () => {
  const { slug } = useParams();
  const { lang, toggle } = useLanguage();
  const post = getPostBySlug(slug);

  usePageSeo({
    title: post ? post[lang].title : 'Post not found',
    description: post ? post[lang].excerpt : 'Post not found.',
    path: post ? `/blog/${post.slug}` : '/blog',
  });

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">404</p>
          <h1 className="text-5xl font-black text-gray-900 mb-8">
            {lang === 'en' ? 'Post not found' : 'Post no encontrado'}
          </h1>
          <Link to="/blog" className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:underline">
            ← {lang === 'en' ? 'Back to Blog' : 'Volver al Blog'}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-pink-100">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-20 py-5 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <Link to="/blog" className="text-[11px] font-black uppercase tracking-widest text-gray-500 hover:text-pink-500 transition-colors">
          ← Blog
        </Link>
        <div className="flex items-center gap-4">
          <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">Maru Fiorillo</span>
          <LanguageToggle lang={lang} onToggle={toggle} />
        </div>
      </nav>

      <article className="pt-40 pb-24 px-6 md:px-20">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
              {post.label}
            </span>
            <span className="text-[10px] text-gray-400 font-medium">
              {toLocaleDate(post.date, lang)}
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter text-gray-900 mb-10">
            {post[lang].title}
          </h1>

          <div className="mt-12">{post[lang].content.map((block, index) => renderRichBlock(block, index))}</div>
        </div>
      </article>

      <footer className="bg-pink-500 py-20 px-6 md:px-20 text-white text-center">
        <Link
          to="/blog"
          onClick={() => trackEvent('blog_post_back', { slug: post.slug })}
          className="text-4xl md:text-5xl font-black tracking-tighter hover:text-pink-200 transition-colors"
        >
          {lang === 'en' ? '← Back to Blog' : '← Volver al Blog'}
        </Link>
      </footer>
    </div>
  );
};

export default BlogPostPage;
