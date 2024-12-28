import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "@/@locales/en/common.json";
import ruTranslations from "@/@locales/ru/common.json";
import uaTranslations from "@/@locales/ua/common.json";
import esTranslations from "@/@locales/es/common.json";
import koTranslations from "@/@locales/ko/common.json";
import zhTranslations from "@/@locales/zh/common.json";
import jaTranslations from "@/@locales/ja/common.json";
import hiTranslations from '@/@locales/hi/common.json';
import arTranslations from '@/@locales/ar/common.json';
import deTranslations from '@/@locales/de/common.json';

i18next.use(initReactI18next).init({
  resources: {
    en: { common: enTranslations },
    ru: { common: ruTranslations },
    ua: { common: uaTranslations },
    es: { common: esTranslations },
    ko: { common: koTranslations },
    zh: { common: zhTranslations },
    ja: { common: jaTranslations },
    hi: { common: hiTranslations },
    ar: { common: arTranslations },
    de: { common: deTranslations },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18next;
