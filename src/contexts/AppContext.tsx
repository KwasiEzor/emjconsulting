import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTranslation, Lang, TranslationKey } from '../lib/translations';

type Theme = 'light' | 'dark';

interface AppContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: TranslationKey;
  theme: Theme;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const savedLang = localStorage.getItem('emj-lang') as Lang | null;
    const savedTheme = localStorage.getItem('emj-theme') as Theme | null;
    if (savedLang) setLangState(savedLang);
    if (savedTheme) setTheme(savedTheme);
    else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('emj-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem('emj-lang', lang);
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const toggleTheme = () => setTheme((p) => (p === 'dark' ? 'light' : 'dark'));

  return (
    <AppContext.Provider value={{ lang, setLang, t: getTranslation(lang), theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
