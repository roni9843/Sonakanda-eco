import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore.js';
import { Loader2, ChevronLeft, Phone, Lock } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useUserStore((state) => state.login);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);

  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const from = location.state?.from?.pathname || '/profile';
  const infoMessage = location.state?.message;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!mobileNumber || !password) {
      setFormError('মোবাইল নম্বর এবং পাসওয়ার্ড দিন');
      return;
    }

    try {
      await login(mobileNumber, password);
      navigate(from, { replace: true });
    } catch (err) {
      // store থেকে error আসলে সেটাই দেখাবে
    }
  };

  return (
    <div className="min-h-screen  via-slate-800 to-black flex flex-col">
  

      {/* Main Content */}
      <div className="flex-1 px-6 pt-8 pb-10">
        {/* Welcome Text */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">
            স্বাগতম আপনাকে!
          </h2>
          <p className="text-slate-400 text-base">
            আপনার অ্যাকাউন্টে প্রবেশ করুন
          </p>
          {infoMessage && (
            <p className="mt-4 text-sm text-amber-300 bg-amber-900/20 px-4 py-2 rounded-full inline-block">
              {infoMessage}
            </p>
          )}
        </div>

        {/* Login Form Card */}
        <div className="bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-600/30 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Phone className="h-4 w-4" />
                মোবাইল নম্বর
              </label>
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                placeholder="01XXXXXXXXX"
                autoFocus
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Lock className="h-4 w-4" />
                পাসওয়ার্ড
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition"
                placeholder="তোমার পাসওয়ার্ড"
              />
            </div>

            {/* Error Message */}
            {(formError || error) && (
              <div className="bg-red-900/30 border border-red-600/50 rounded-2xl px-4 py-3 text-center">
                <p className="text-red-400 text-sm font-medium">
                  {formError || error}
                </p>
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black font-bold py-4 rounded-2xl shadow-lg transform active:scale-95 transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  লগইন হচ্ছে...
                </>
              ) : (
                'লগইন করুন'
              )}
            </button>
          </form>
        </div>

        {/* Registration Link - Clear & Colorful */}
        <div className="text-center mt-10">
          <p className="text-slate-400 text-base">
            এখনো অ্যাকাউন্ট নেই?
          </p>
          <Link
            to="/register"
            state={{ from }}
            className="block mt-4 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition"
          >
            এখনই রেজিস্ট্রেশন করুন
          </Link>
          <p className="text-xs text-slate-500 mt-3">
            নতুন সদস্য হয়ে কমিউনিটির অংশ হোন
          </p>
        </div>

        {/* Home Link */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="text-slate-500 text-sm underline hover:text-slate-300 transition"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;