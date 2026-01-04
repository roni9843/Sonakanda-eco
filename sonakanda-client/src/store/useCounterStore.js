import { create } from 'zustand';
import { withDevtools } from './devtoolsConfig.js';

// Global counter store example
export const useCounterStore = create(
  withDevtools(
    (set) => ({
      count: 0,
      increment: () => set((state) => ({ count: state.count + 1 })),
      decrement: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    'counter-store',
  ),
);
