import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n/config'
import App from './App.tsx'
import i18n from './i18n/config';

// Dynamically update document title when language changes
i18n.on('languageChanged', () => {
  const title = i18n.t('app.title');
  if (title) document.title = title;
});

// Set initial title
document.title = i18n.t('app.title');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>
);