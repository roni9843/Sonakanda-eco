import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import MobileBottomNav from '../components/MobileBottomNav.jsx';

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Navbar - সব ডিভাইসে দেখাবে (যেমনটা ছিল) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom navigation bar */}
      <MobileBottomNav />

      {/* Footer - শুধু sm (640px) এবং তার উপরে দেখাবে, মোবাইলে লুকাবে */}
      <footer className="hidden sm:block border-t border-yellow-600/20 bg-black/90 backdrop-blur-md shadow-2xl">
        <div className="container max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm">
            {/* Left Side */}
            <div className="text-center sm:text-left">
              <p className="font-bold text-yellow-400 tracking-wider">
                নতুন সোনাকান্দা যুব সমাজ
              </p>
              <p className="text-slate-400 text-xs mt-1">
                Sonakanda Eco System © {new Date().getFullYear()} • সবসময় সহজ, সুন্দর ও দ্রুত
              </p>
            </div>

            {/* Center Logo - এখন আর দরকার নেই কারণ ফুটারই মোবাইলে লুকানো */}
            {/* <div className="sm:hidden">...</div> এটা রিমুভ করলাম */}

            {/* Right Side */}
            <div className="text-center sm:text-right space-y-1">
              <p className="text-slate-300 font-medium">Built with ❤️ using</p>
              <p className="text-xs text-slate-500">
                React • Tailwind CSS • Zustand • Vite
              </p>
            </div>
          </div>

          {/* Bottom Secure Badge */}
          <div className="mt-6 pt-4 border-t border-slate-800 flex justify-center">
            <span className="inline-flex items-center gap-2 text-xs text-slate-400 bg-yellow-900/20 px-4 py-2 rounded-full border border-yellow-600/30">
              <span>🔒</span> Secure & Private • Powered by Community
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;