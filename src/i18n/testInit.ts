import i18n from 'i18next';
import en from './locales/en.json';

// Minimal i18n init for unit tests (no plugins)
i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
        en: { translation: en },
    },
    interpolation: { escapeValue: false },
});

export default i18n;
