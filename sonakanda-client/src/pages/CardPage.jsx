import React, { useState } from 'react';
import CardHomePage from './CardHomePage.jsx';

// CardPage: owns its own bottom navigation bar and
// by default shows the HomePage content with Home selected.
const CardPage = () => {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'history' | 'profile'

  const renderContent = () => {
    if (activeTab === 'home') {
      // Show original card-style home content inside Card page
      return <CardHomePage />;
    }

    if (activeTab === 'history') {
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">History</h1>
          <p className="text-sm text-slate-300">
            এখানে ভবিষ্যতে কার্ড সম্পর্কিত লেনদেনের হিস্টোরি দেখানো হবে।
          </p>
        </div>
      );
    }

    if (activeTab === 'profile') {
      return (
        <div className="space-y-4">
          <h1 className="text-2xl font-semibold">Profile (Preview)</h1>
          <p className="text-sm text-slate-300">
            এখানে আপনার প্রোফাইল সম্পর্কিত তথ্য কার্ড ভিউতে দেখানো হবে। আপাতত এটি একটি
            ডেমো সেকশন।
          </p>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-[60vh] flex flex-col">
      {/* Main content area */}
      <div className="flex-1 pb-20">{/* Extra bottom padding for nav bar */}
        {renderContent()}
      </div>

      {/* Local bottom navigation bar just for CardPage */}
      <nav className="mt-auto fixed bottom-0 left-0 right-0 z-30 md:z-10 border-t border-slate-800 bg-slate-950/95 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-4 text-xs text-slate-300">
          <CardBottomItem
            label="Home"
            isActive={activeTab === 'home'}
            onClick={() => setActiveTab('home')}
          />
          <CardBottomItem
            label="History"
            isActive={activeTab === 'history'}
            onClick={() => setActiveTab('history')}
          />
          <CardBottomItem
            label="Profile"
            isActive={activeTab === 'profile'}
            onClick={() => setActiveTab('profile')}
          />
        </div>
      </nav>
    </div>
  );
};

const CardBottomItem = ({ label, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center flex-1 gap-1 px-2 py-1 rounded-xl transition-colors ${
      isActive
        ? 'text-emerald-300 bg-slate-900'
        : 'text-slate-400 hover:text-emerald-200 hover:bg-slate-900/60'
    }`}
  >
    <span>{label}</span>
  </button>
);

export default CardPage;
