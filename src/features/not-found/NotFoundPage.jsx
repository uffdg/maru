import { Link } from 'react-router-dom';
import { usePageSeo } from '../../shared/seo/usePageSeo';

const NotFoundPage = () => {
  usePageSeo({
    title: '404',
    description: 'Page not found',
    path: '/404',
  });

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">404</p>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6">Page not found</h1>
        <p className="text-gray-500 text-lg mb-10">
          This route does not exist anymore. The portfolio is now organized around a single content-driven routing system.
        </p>
        <Link to="/" className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:underline">
          ← Back to portfolio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
