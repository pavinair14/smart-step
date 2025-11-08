import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import ar from './locales/ar.json';

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: { translation: en },
            ar: { translation: ar },
        },
        lng: 'en', // default language
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            caches: [],
        }
    });

// Set initial dir attribute based on detected language
const currentLang = i18n.language || 'en';
document.documentElement.lang = currentLang;

// Listen for language changes
i18n.on('languageChanged', (lng) => {
    document.documentElement.lang = lng;
});

export default i18n;
