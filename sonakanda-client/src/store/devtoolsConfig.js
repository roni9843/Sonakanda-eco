import { devtools } from 'zustand/middleware';

// Helper to conditionally enable Redux DevTools for Zustand stores
// Toggle using Vite env: VITE_ZUSTAND_DEVTOOLS=true/false
const isDevtoolsEnabled = import.meta.env.VITE_ZUSTAND_DEVTOOLS !== 'false';

export const withDevtools = (initializer, name) => {
  if (!isDevtoolsEnabled) return initializer;

  return devtools(initializer, {
    name,
  });
};
