import { useEffect } from 'react';
import { useThemeStore } from '../store/useThemeStore.js';

// Hook to sync Tailwind's dark class with Zustand theme state
export const useThemeSync = () => {
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);
};
