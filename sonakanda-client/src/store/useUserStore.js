import { create } from 'zustand';
import { withDevtools } from './devtoolsConfig.js';
import { loadAuth, saveAuth, clearAuth } from '../utils/authStorage.js';
import { API_BASE_URL } from '../utils/apiClient.js';

// Auth store connected with backend API
export const useUserStore = create(
  withDevtools(
    (set, get) => {
      const initial = loadAuth();

      return {
        user: initial.user,
        token: initial.token,
        isAuthenticated: Boolean(initial.token),
        loading: false,
        error: null,

        // Login with mobile_number and password via backend
        login: async (mobile_number, password) => {
          set({ loading: true, error: null });

          try {
            const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ mobile_number, password }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
              throw new Error(data.message || 'Login failed');
            }

            const { token, user } = data.data;

            saveAuth({ token, user });

            set({
              user,
              token,
              isAuthenticated: true,
              loading: false,
              error: null,
            });

            return { token, user };
          } catch (error) {
            set({ loading: false, error: error.message || 'Login failed' });
            throw error;
          }
        },

        // Clear local auth state and storage
        logout: () => {
          clearAuth();
          set({ user: null, token: null, isAuthenticated: false, error: null, loading: false });
        },
      };
    },
    'user-store',
  ),
);
