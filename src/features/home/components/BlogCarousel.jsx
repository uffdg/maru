import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { posts } from '../../content/posts';
import { toLocaleDate } from '../../../shared/lib/format';
import { trackEvent } from '../../../shared/analytics/trackEvent';

const BlogCarousel = ({ lang }) => {
  const [active, setActive] = useState(0);
  const prev = () => setActive((index) => (index - 1 + posts.length) % posts.length);
  const next = () => setActive((index) => (index + 1) % posts.length);
  const post = posts[active];

  return (
    <section className="py-24 px-6 md:px-20 bg-pink-50/40 border-t border-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-baseline justify-between mb-12">
          <div>
            <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-2">
              {lang === 'en' ? 'Writing' : 'Escritura'}
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900">Blog</h2>
          </div>
          <Link
            to="/blog"
            className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:underline"
          >
            {lang === 'en' ? 'All posts →' : 'Ver todos →'}
          </Link>
        </div>

        <div className="relative">
          <Link
            to={`/blog/${post.slug}`}
            onClick={() => trackEvent('blog_carousel_open', { slug: post.slug })}
            className="block bg-white rounded-[2rem] border border-pink-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-10 md:p-14 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-pink-500 bg-pink-50 px-3 py-1 rounded-full">
                {post.label}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {toLocaleDate(post.date, lang)}
              </span>
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight group-hover:text-pink-500 transition-colors">
              {post[lang].title}
            </h3>
            <p className="text-gray-500 text-lg leading-relaxed max-w-3xl">{post[lang].excerpt}</p>
            <p className="mt-6 text-xs font-bold uppercase tracking-widest text-pink-400 group-hover:text-pink-600 transition-colors">
              {lang === 'en' ? 'Read more →' : 'Leer más →'}
            </p>
          </Link>

          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="p-3 rounded-full border border-gray-200 hover:border-pink-300 hover:text-pink-500 transition-colors"
              aria-label="Previous post"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-2">
              {posts.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActive(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === active ? 'bg-pink-500 w-6' : 'bg-gray-200 hover:bg-pink-200'
                  }`}
                  aria-label={`Go to post ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="p-3 rounded-full border border-gray-200 hover:border-pink-300 hover:text-pink-500 transition-colors"
              aria-label="Next post"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
