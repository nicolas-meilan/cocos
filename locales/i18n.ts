import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import es from '@/locales/es.json';

export type Language = 'en' | 'es';
const resources = {
  en: { translation: en },
  es: { translation: es },
};

const SUPPORTED_LANGUAGES = ['en', 'es'];
const DEFAULT_LANGUAGE = 'en';

export const getSystemLanguage = () => {
  const locale = Localization.getLocales()[0];

  const languageCode = locale?.languageCode;

  if (languageCode && SUPPORTED_LANGUAGES.includes(languageCode)) {
    return languageCode;
  }

  return DEFAULT_LANGUAGE;
};

const initializeI18n = (initialLng: Language = DEFAULT_LANGUAGE) => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: initialLng,
      fallbackLng: DEFAULT_LANGUAGE,
      interpolation: {
        escapeValue: false,
      },
    });
};

export { i18n };
export default initializeI18n;
