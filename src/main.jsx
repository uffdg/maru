import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './index.css'
import { LanguageProvider } from './LanguageContext.jsx'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};
import App from './App.jsx'
import Blog from './Blog.jsx'
import BlogPost from './BlogPost.jsx'
import Admin from './Admin.jsx'
import CasePage from './CasePage.jsx'
import Comodoro from './cases/Comodoro.jsx'
import PradoHoloride from './cases/PradoHoloride.jsx'
import Holoride from './cases/Holoride.jsx'
import MercantilAndina from './cases/MercantilAndina.jsx'
import Wuufy from './cases/Wuufy.jsx'
import GoogleStartups from './cases/GoogleStartups.jsx'
import Agrofy from './cases/Agrofy.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/cases/comodoro" element={<Comodoro />} />
          <Route path="/cases/prado-holoride" element={<PradoHoloride />} />
          <Route path="/cases/holoride" element={<Holoride />} />
          <Route path="/cases/mercantil-andina" element={<MercantilAndina />} />
          <Route path="/cases/wuufy" element={<Wuufy />} />
          <Route path="/cases/google-startups" element={<GoogleStartups />} />
          <Route path="/cases/agrofy" element={<Agrofy />} />
          <Route path="/cases/:slug" element={<CasePage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
)
