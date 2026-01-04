// Simple helpers to persist auth token and user in localStorage

const TOKEN_KEY = 'sonakanda-auth-token';
const USER_KEY = 'sonakanda-auth-user';

export const loadAuth = () => {
  if (typeof window === 'undefined') {
    return { token: null, user: null };
  }

  try {
    const token = window.localStorage.getItem(TOKEN_KEY);
    const rawUser = window.localStorage.getItem(USER_KEY);
    const user = rawUser ? JSON.parse(rawUser) : null;
    return { token, user };
  } catch {
    return { token: null, user: null };
  }
};

export const saveAuth = ({ token, user }) => {
  if (typeof window === 'undefined') return;

  try {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token);
    }
    if (user) {
      window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  } catch {
    // ignore storage errors
  }
};

export const clearAuth = () => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.removeItem(USER_KEY);
  } catch {
    // ignore storage errors
  }
};
