import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export const LanguageSwitcher: React.FC = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <button
            onClick={toggleLanguage}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2 bg-violet-900 text-white rounded-lg hover:bg-violet-800 transition-colors shadow-lg"
            aria-label="Switch language"
        >
            <Globe className="w-5 h-5" />
            <span className="font-medium">
                {i18n.language === 'en' ? 'العربية' : 'English'}
            </span>
        </button>
    );
};
