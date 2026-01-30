import initializeI18n, { getSystemLanguage, i18n as i18nInstance, Language } from '@/locales/i18n';
import { useLanguageStore } from '@/stores/languageStore';
import React, { JSX, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const unsubStoreLoader = useLanguageStore.persist.onFinishHydration(() => {
  const { language } = useLanguageStore.getState();

  if (!language) {
    const systemLng = getSystemLanguage();

    initializeI18n(systemLng as Language)
    useLanguageStore.setState({ language: systemLng as Language });
  } else {
    initializeI18n(language);
  }

  unsubStoreLoader?.();
});

type I18nInitializerProps = {
  children: JSX.Element;
};

const I18nInitializer = ({
  children
}: I18nInitializerProps) => {
  const { i18n } = useTranslation();
  const { setLanguage } = useLanguageStore();

  useEffect(() => {
    setLanguage(i18n.language as Language);
  }, [i18n.language]);

  return children;
};

const I18nInitializerValidator = (props: I18nInitializerProps) => {
  if (!i18nInstance.isInitialized) return null;

  return <I18nInitializer {...props} />
};

export default React.memo(I18nInitializerValidator);
