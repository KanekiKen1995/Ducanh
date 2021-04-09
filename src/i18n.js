import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend  from "i18next-http-backend";

import translationEng from "./locales/en.json";
import translationVi from "./locales/vi.json";

const currentLang = localStorage.getItem('language');
const lang = currentLang || "vi"
i18n
  .use(Backend)
  .use(LanguageDetector)
  .init({
    debug: true,
    lng: lang,
    fallbackLng: "vi", // use en if detected lng is not available

    interpolation: {
      escapeValue: false // react already safes from xss
    },

    resources: {
      en: {
        translations: translationEng
      },
      vi: {
        translations: translationVi
      }
    },
    ns: ["translations"],
    defaultNS: "translations"
  });
export default i18n;
