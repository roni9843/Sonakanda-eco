import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useThemeStore } from '../store/useThemeStore.js';
import { useUserStore } from '../store/useUserStore.js';
import { Sun, Moon } from 'lucide-react';
import logo from '../assets/logo.jpg';

const Navbar = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const user = useUserStore((state) => state.user);
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const logout = useUserStore((state) => state.logout);

  return (
    <header className="border-b border-slate-700 bg-gradient-to-r from-slate-900 via-emerald-900/20 to-slate-900 shadow-lg">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 relative">
          
          {/* Desktop Logo (Left) */}
          <Link to="/" className="hidden md:flex items-center gap-3 group">
            <img
              src={logo}
              alt="Sonakanda Wallet Logo"
              className="h-10 w-10 rounded-xl object-cover shadow-lg group-hover:shadow-emerald-500/50 transition-shadow"
            />
            <span className="text-lg font-bold text-white">
              Sonakanda Wallet
            </span>
          </Link>

          {/* Mobile Only: Centered Logo – একদম ক্লিন, কোনো মেনু বাটন নেই */}
          <div className="md:hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Link to="/">
              <img
                src={logo}
                alt="Sonakanda Wallet"
                className="h-12 w-12 rounded-full object-cover shadow-2xl ring-4 ring-emerald-500/40"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-emerald-300'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-emerald-300'
                }`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-emerald-300'
                }`
              }
            >
              Profile
            </NavLink>
          </nav>

          {/* Right Side Actions - Desktop Only */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-emerald-300 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-300">
                  স্বাগতম, <span className="font-semibold text-emerald-300">{user?.name_en || 'User'}</span>
                </span>
                <button
                  onClick={logout}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-rose-600 to-rose-500 text-white font-medium hover:from-rose-700 hover:to-rose-600 shadow-md transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className="px-5 py-2 rounded-lg border border-emerald-500 text-emerald-300 font-medium hover:bg-emerald-500/10 transition-all"
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium hover:from-emerald-700 hover:to-emerald-600 shadow-md transition-all"
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/* মোবাইলে কোনো হ্যামবার্গার মেনু বাটন বা ড্রপডাউন থাকবে না */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;