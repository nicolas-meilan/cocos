import * as Localization from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locales/en.json';
import es from '@/locales/es.json';

const resources = {
  en: { translation: en },
  es: { translation: es },
};

const SUPPORTED_LANGUAGES = ['en', 'es'];

const getSystemLanguage = () => {
  const locale = Localization.getLocales()[0];

  const languageCode = locale?.languageCode;

  if (languageCode && SUPPORTED_LANGUAGES.includes(languageCode)) {
    return languageCode;
  }

  return 'en';
};

const initializeI18n = () => {
  i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: getSystemLanguage(),
      fallbackLng: 'en',
      interpolation: {
        escapeValue: false,
      },
    });
};

export default initializeI18n;
