import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { LanguageProvider } from './features/content/LanguageProvider.jsx';
import AppRouter from './app/AppRouter.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  </StrictMode>,
);
