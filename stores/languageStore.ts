import { Language } from '@/locales/i18n';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';


interface LanguageStore {
  language: Language | null;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>()(
  persist(
    (set) => ({
      language: null,
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: 'USER_LANGUAGE',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
