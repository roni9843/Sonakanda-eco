import { create } from 'zustand';
import { withDevtools } from './devtoolsConfig.js';
import { saveThemeToStorage, getInitialTheme } from '../utils/themeStorage.js';

// Theme (light/dark) store example
export const useThemeStore = create(
  withDevtools(
    (set) => ({
      theme: getInitialTheme(),
      toggleTheme: () =>
        set((state) => {
          const next = state.theme === 'dark' ? 'light' : 'dark';
          saveThemeToStorage(next);
          return { theme: next };
        }),
      setTheme: (theme) => {
        saveThemeToStorage(theme);
        set({ theme });
      },
    }),
    'theme-store',
  ),
);
