import HomePage from '../features/home/HomePage';
import BlogPage from '../features/blog/BlogPage';
import BlogPostPage from '../features/blog/BlogPostPage';
import CaseStudyPage from '../features/cases/CaseStudyPage';
import NotFoundPage from '../features/not-found/NotFoundPage';
import PrivateGalleryPage from '../features/private/PrivateGalleryPage';

export const appRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPostPage /> },
  { path: '/cases/:slug', element: <CaseStudyPage /> },
  { path: '/private', element: <PrivateGalleryPage /> },
  { path: '*', element: <NotFoundPage /> },
];
