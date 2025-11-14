import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/global.css';
import i18n from './i18n/config';
import { useTranslation } from 'react-i18next';

// Dynamically update document title when language changes
const setDocumentTitle = () => {
    const title = i18n.t('app.title');
    if (title) document.title = title;
};

// Initial title
setDocumentTitle();

// Update on language change
i18n.on('languageChanged', setDocumentTitle);

const RootWithI18nFallback = () => {
    const { t } = useTranslation();
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center text-gray-500 text-sm">
                    {t('messages.loading')}
                </div>
            }
        >
            <App />
        </Suspense>
    );
};

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RootWithI18nFallback />
    </StrictMode>
);
