import HomePage from '../features/home/HomePage';
import BlogPage from '../features/blog/BlogPage';
import BlogPostPage from '../features/blog/BlogPostPage';
import CaseStudyPage from '../features/cases/CaseStudyPage';
import NotFoundPage from '../features/not-found/NotFoundPage';
import Admin from '../Admin';

export const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/cases/:slug', element: <CaseStudyPage /> },
  { path: '/admin', element: <Admin /> },
  { path: '*', element: <NotFoundPage /> },
];
