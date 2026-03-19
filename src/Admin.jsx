import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 px-6 md:px-20 py-24">
      <div className="max-w-3xl mx-auto">
        <p className="text-pink-500 font-bold uppercase tracking-widest text-xs mb-4">Editorial workflow</p>
        <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-8">
          The public admin panel has been retired.
        </h1>
        <div className="bg-pink-50 border border-pink-100 rounded-[2rem] p-8 space-y-4 text-gray-600 text-lg leading-relaxed">
          <p>
            Content is now managed through a Git-based workflow. Blog posts and case studies live in versioned files under `src/data`, and the recommended next step is to use the static Decap CMS scaffold in `public/admin`.
          </p>
          <p>
            This change removes secrets and direct GitHub writes from the browser-facing application.
          </p>
        </div>
        <div className="mt-10 flex gap-6">
          <Link to="/" className="text-xs font-bold uppercase tracking-widest text-pink-500 hover:underline">
            ← Back to portfolio
          </Link>
          <a href="/admin/index.html" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-pink-500">
            Open CMS scaffold →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Admin;
