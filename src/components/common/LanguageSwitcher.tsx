import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
    const { i18n, t } = useTranslation();

    const nextLang = i18n.language === 'en' ? 'ar' : 'en';

    const toggleLanguage = useCallback(() => {
        i18n.changeLanguage(nextLang);
    }, [i18n, nextLang]);

    return (
        <button
            onClick={toggleLanguage}
            aria-label={t("language.switch", { lng: i18n.language })}
            className="
        fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-2
        bg-violet-900 text-white rounded-lg shadow-lg
        hover:bg-violet-800 transition-colors
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-900
      "
        >
            <Globe className="w-5 h-5" aria-hidden="true" />
            <span className="font-medium">
                {t(`language.${nextLang}`)}
            </span>
        </button>
    );
};
