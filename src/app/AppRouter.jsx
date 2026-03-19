import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { appRoutes } from './routes';
import { trackEvent } from '../shared/analytics/trackEvent';
import ScrollToTop from '../shared/routing/ScrollToTop';

const RouteAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent('page_view', { path: location.pathname });
  }, [location.pathname]);

  return null;
};

const AppRouter = () => (
  <BrowserRouter>
    <Analytics />
    <ScrollToTop />
    <RouteAnalytics />
    <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </Routes>
  </BrowserRouter>
);

export default AppRouter;
