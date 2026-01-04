import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore.js';
import { useThemeSync } from '../hooks/useThemeSync.js';
import logo from '../assets/logo.jpg';

import { 
  PlusCircle, 
  PhoneCall, 
  ArrowLeftRight, 
  ArrowDownCircle, 
  HeartHandshake, 
  Receipt,
  Megaphone,
  Users,
  HandCoins,
  Info
} from 'lucide-react';

// Toast Component - reused from old HomePage
const Toast = ({ message, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-x-4 bottom-6 left-1/2 -translate-x-1/2 max-w-md w-full mx-auto z-50 animate-slide-up pointer-events-auto">
      <div className="flex items-center gap-3 w-full bg-slate-800/95 backdrop-blur-md border border-slate-700 rounded-2xl shadow-2xl p-4 text-white">
        <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
          <Info size={24} className="text-emerald-400" />
        </div>
        <p className="text-sm sm:text-base font-medium flex-1 pr-2">{message}</p>
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-white transition flex-shrink-0 text-xl leading-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

const CardHomePage = () => {
  useThemeSync();
  const location = useLocation();
  const state = location.state;
  const isAuthenticated = useUserStore((s) => s.isAuthenticated);
  const user = useUserStore((s) => s.user);

  const balance = typeof user?.balance === 'number' ? user.balance : 0;

  const [toast, setToast] = useState(null);

  const showToast = () => {
    setToast({
      message:
        'এই ফিচারটির কাজ এখনো সম্পূর্ণ হয়নি। ভবিষ্যতে এটি যোগ করা হবে। ধন্যবাদ ধৈর্য ধরার জন্য! 🚀',
    });
  };

  const closeToast = () => setToast(null);

  const handleQuickActionClick = (e) => {
    if (!isAuthenticated) return;
    e.preventDefault();
    showToast();
  };

  return (
    <div className="min-h-screen from-slate-900 to-slate-800 p-4 sm:p-6 md:p-8 space-y-8 md:space-y-12">
      {toast && <Toast message={toast.message} onClose={closeToast} />}

      <header className="text-center space-y-4">
        <p className="text-sm uppercase tracking-wider text-emerald-400 font-medium">আমাদের একতা</p>

        <h2 className="font-bold text-white whitespace-nowrap overflow-visible">
          <span className="inline-block text-2xl xxs:text-3xl xs:text-4xl sm:text-5xl md:text-6xl leading-none">
            নতুন সোনাকান্দা যুব সমাজ
          </span>
        </h2>

        <p className="text-sm md:text-base text-slate-300 max-w-xl mx-auto">সবসময় সহজ, সুন্দর ও দ্রুত</p>
        {state?.message && (
          <p className="text-sm text-yellow-300 bg-yellow-900/30 px-4 py-2 rounded-lg inline-block">
            {state.message}
          </p>
        )}
        {!isAuthenticated && (
          <Link
            to="/login"
            className="inline-block mt-4 px-8 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition shadow-lg"
          >
            লগইন করুন
          </Link>
        )}
      </header>

      {/* Credit Card */}
      <section className="mx-auto w-full max-w-sm sm:max-w-md md:max-w-lg">
        <div className="relative w-full aspect-[85.6/54] max-w-sm mx-auto transform rotate-1 hover:rotate-0 transition-all duration-500 hover:shadow-3xl group">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black rounded-2xl shadow-2xl overflow-hidden border border-yellow-600/40">
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1200 ease-out skew-x-12" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out delay-100 skew-x-12 blur-sm" />
            </div>

            <div className="absolute inset-0 opacity-40">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shine" />
            </div>

            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-8 -left-8 w-48 h-48 rounded-full bg-yellow-500/60 blur-3xl animate-pulse" />
              <div className="absolute -bottom-8 -right-8 w-56 h-56 rounded-full bg-yellow-600/40 blur-3xl animate-pulse delay-1000" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-emerald-500/30 blur-3xl animate-ping" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/5 via-transparent to-emerald-400/5 mix-blend-overlay" />

            <div className="absolute top-4 left-4 w-10 h-7 sm:w-12 sm:h-9 bg-gradient-to-br from-yellow-400/90 to-yellow-600 rounded-lg shadow-lg border border-yellow-300/70 flex items-center justify-center">
              <div className="w-9 h-6 sm:w-10 sm:h-7 bg-gradient-to-tr from-yellow-200/90 to-yellow-400 rounded border border-yellow-100/80 shadow-inner" />
            </div>

            <div className="absolute top-3 right-4">
              <img
                src={logo}
                alt="Sonakanda Logo"
                className="h-12 w-12 sm:h-11 sm:w-11 rounded-full object-cover shadow-xl ring-2 ring-yellow-500/80"
              />
            </div>

            <div className="absolute left-4 right-4 bottom-4 space-y-3 px-2 text-white">
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-medium opacity-90 tracking-wide">Available Balance</p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-yellow-300 drop-shadow-2xl shadow-yellow-500/50">
                  ৳ {balance.toFixed(2)}
                </p>
              </div>

              <div className="flex justify-between items-end text-xs sm:text-sm space-x-2">
                <div className="min-w-0 flex-1 space-y-0.5 pr-1">
                  {isAuthenticated && user?.name_en && (
                    <>
                      <p className="text-[10px] sm:text-xs uppercase tracking-widest opacity-80">Cardholder</p>
                      <p className="font-bold tracking-widest text-yellow-200 truncate text-sm sm:text-base drop-shadow-md">
                        {user.name_en.toUpperCase()}
                      </p>
                    </>
                  )}
                  {isAuthenticated && user?.mobile_number && (
                    <p className="font-mono text-[10px] tracking-widest opacity-85 text-slate-200">
                      {user.mobile_number.replace(/(\d{4})(?=\d)/g, '$1 ')}
                    </p>
                  )}
                </div>

                <div className="text-right flex-shrink-0 space-y-0.5">
                  <p className="font-black tracking-wider text-yellow-400 text-xs sm:text-sm drop-shadow-md">
                    নতুন সোনাকান্দা
                  </p>
                  <p className="font-medium opacity-85 text-[10px] sm:text-xs">যুব সমাজ</p>
                  <span className="inline-block text-[9px] sm:text-xs bg-yellow-900/50 px-2 py-0.5 rounded-full border border-yellow-600/60 backdrop-blur-sm shadow-md">
                    🔒 Secure
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-white text-center">Quick Actions</h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 max-w-5xl mx-auto">
          <QuickAction
            icon={PlusCircle}
            bgColor="bg-gradient-to-br from-emerald-500 to-emerald-600"
            label="অ্যাড মানি"
            disabled={!isAuthenticated}
            onClick={handleQuickActionClick}
          />
          <QuickAction
            icon={PhoneCall}
            bgColor="bg-gradient-to-br from-purple-500 to-fuchsia-600"
            label="রিচার্জ"
            disabled={!isAuthenticated}
            onClick={handleQuickActionClick}
          />
          <QuickAction
            icon={ArrowLeftRight}
            bgColor="bg-gradient-to-br from-sky-500 to-blue-600"
            label="ট্রান্সফার"
            disabled={!isAuthenticated}
            onClick={handleQuickActionClick}
          />
          <QuickAction
            icon={ArrowDownCircle}
            bgColor="bg-gradient-to-br from-indigo-500 to-purple-600"
            label="ক্যাশ আউট"
            disabled={!isAuthenticated}
            onClick={handleQuickActionClick}
          />
          <QuickAction
            icon={HeartHandshake}
            bgColor="bg-gradient-to-br from-rose-500 to-pink-600"
            label="ডোনেট"
            disabled={!isAuthenticated}
            onClick={handleQuickActionClick}
          />
          <QuickAction
            icon={Receipt}
            bgColor="bg-gradient-to-br from-amber-500 to-orange-600"
            label="ফান্ড"
            disabled={!isAuthenticated}
            onClick={handleQuickActionClick}
          />
        </div>
        {!isAuthenticated && (
          <p className="text-center text-slate-400 text-sm px-4">লগইন করে সব ফিচার ব্যবহার করুন।</p>
        )}
      </section>

      {/* Announcement & Community Fund */}
      <section className="space-y-12 max-w-5xl mx-auto px-4 sm:px-0">
        <div className="bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-slate-700 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 p-4 flex items-center gap-3">
            <Megaphone className="h-8 w-8 text-white flex-shrink-0" />
            <h3 className="text-xl font-bold text-white">গুরুত্বপূর্ণ ঘোষণা</h3>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <Users className="h-8 w-8 text-black" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-semibold text-white">নতুন সোনাকান্দা যুব সমাজ</p>
                <p className="text-sm text-slate-400">১৫ মিনিট আগে</p>
              </div>
            </div>
            <p className="text-slate-200 leading-relaxed text-base">
              প্রিয় ব্যবহারকারীরা,
              <br />
              এই অ্যাপটি এখনো তৈরি করা হচ্ছে। তাই এখানে দেখানো ফান্ডের তথ্যগুলো শুধু দেখানোর জন্য দেওয়া হয়েছে, এগুলো পুরোপুরি সঠিক নাও হতে পারে। আমরা ভবিষ্যতে অ্যাপটির কার্যকারিতা আরও উন্নত করতে নিয়মিত আপডেট নিয়ে কাজ করছি।
              <br />
              <br />
              আপনার যদি কোনো পরামর্শ, মতামত বা উন্নয়ন–সংক্রান্ত কোনো ধারণা থাকে, তাহলে অনুগ্রহ করে আমাদের সাথে যোগাযোগ করুন। আপনাদের সহযোগিতাই আমাদের এগিয়ে চলার প্রেরণা।
            </p>
            <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-slate-700">
              <button className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition">
                <HeartHandshake size={20} />
                <span>সাপোর্ট করুন</span>
              </button>
              <button className="text-slate-400 hover:text-white transition">কমেন্ট করুন</button>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-600/30 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-xl flex-shrink-0">
                <HandCoins className="h-7 w-7 sm:h-8 sm:w-8 text-black" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">কমিউনিটি ফান্ড</h3>
                <p className="text-sm sm:text-base text-slate-400">মোট সংগ্রহ: ৫,০০০ টাকা</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                  <PlusCircle size={20} className="text-emerald-400" />
                </div>
                <div>
                  <p className="text-white font-medium">শিক্ষা প্রকল্প</p>
                  <p className="text-xs text-slate-400">ব্যয়</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-red-400">-৳ 2,000</span>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-slate-700">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-amber-400" />
                </div>
                <div>
                  <p className="text-white font-medium">সামাজিক কার্যক্রম</p>
                  <p className="text-xs text-slate-400">ব্যয়</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-red-400">-৳ 1,500</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-sky-500/20 flex items-center justify-center flex-shrink-0">
                  <HeartHandshake size={20} className="text-sky-400" />
                </div>
                <div>
                  <p className="text-white font-medium">দুর্যোগ তহবিল</p>
                  <p className="text-xs text-slate-400">ব্যয়</p>
                </div>
              </div>
              <span className="text-lg font-semibold text-red-400">-৳ 800</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-lg font-semibold text-white">বর্তমান ব্যালেন্স</p>
            <p className="text-2xl sm:text-3xl font-black text-yellow-400 text-right">৳ 700</p>
          </div>
        </div>
      </section>
    </div>
  );
};

const QuickAction = ({ icon: Icon, bgColor, label, disabled, onClick }) => (
  <button
    type="button"
    disabled={disabled}
    onClick={onClick}
    className={`relative flex flex-col items-center justify-center gap-4 p-6 rounded-3xl text-white shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group ${
      disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
    }`}
  >
    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className={`h-12 w-12 rounded-full ${bgColor} flex items-center justify-center shadow-xl`}>
      <Icon size={32} strokeWidth={2.5} className="text-white" />
    </div>
    <span className="text-base font-bold tracking-wide">{label}</span>
  </button>
);

export default CardHomePage;
