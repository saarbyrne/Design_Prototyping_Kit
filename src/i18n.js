/**
 * i18n setup for react-i18next (used by Playbook Components).
 * Uses key-as-default so t('key') returns 'key' when no translation is loaded.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
  react: { useSuspense: false },
  resources: {
    en: { translation: {} },
  },
});

export default i18n;
