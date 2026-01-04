import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // লগআউটের পর রিডাইরেক্টের জন্য
import { useUserStore } from '../store/useUserStore.js';
import { API_BASE_URL } from '../utils/apiClient.js';
import { User, Phone, IdCard, Briefcase, Loader2, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const logout = useUserStore((state) => state.logout); // Zustand থেকে logout action
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError('');

        const res = await fetch(`${API_BASE_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Failed to load profile');
        }

        setProfile(data.data);
      } catch (err) {
        setError(err.message || 'Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError('You are not logged in');
    }
  }, [token]);

  const handleLogout = () => {
    logout(); // Zustand store থেকে user, token clear করবে
    navigate('/login'); // লগইন পেজে রিডাইরেক্ট
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            আমার প্রোফাইল
          </h1>
          <p className="text-slate-400 text-sm sm:text-base">
            তোমার ব্যক্তিগত তথ্য নিরাপদে সংরক্ষিত আছে
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-slate-800/70 backdrop-blur-lg rounded-3xl shadow-2xl border border-yellow-600/30 overflow-hidden">
          {/* Card Header with Gradient */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 px-8 py-10 text-center relative">
            <div className="h-24 w-24 mx-auto rounded-full bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center shadow-2xl ring-4 ring-yellow-500/50">
              <User className="h-12 w-12 text-black" />
            </div>
            <h2 className="mt-4 text-2xl font-bold text-white">
              {profile?.name_en || 'Loading...'}
            </h2>
            {profile?.name_bn && (
              <p className="text-lg text-yellow-300 font-medium mt-1">
                {profile.name_bn}
              </p>
            )}

            {/* Logout Button - Top Right */}
            {token && (
              <button
                onClick={handleLogout}
                className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-medium shadow-lg transition-all hover:shadow-rose-500/30"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">লগ আউট</span>
              </button>
            )}
          </div>

          {/* Card Body */}
          <div className="p-8 space-y-6">
            {loading && (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-10 w-10 text-yellow-500 animate-spin" />
                <span className="ml-3 text-slate-300">লোড হচ্ছে...</span>
              </div>
            )}

            {error && !loading && (
              <div className="text-center py-12">
                <p className="text-red-400 text-lg font-medium">{error}</p>
                <p className="text-slate-500 text-sm mt-2">
                  লগইন করে আবার চেষ্টা করুন
                </p>
              </div>
            )}

            {!loading && !error && profile && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Mobile */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">মোবাইল নম্বর</p>
                    <p className="text-white font-semibold text-lg">
                      {profile.mobile_number}
                    </p>
                  </div>
                </div>

                {/* NID */}
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <IdCard className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm">জাতীয় পরিচয়পত্র</p>
                    <p className="text-white font-semibold text-lg">
                      {profile.nid_number}
                    </p>
                  </div>
                </div>

                {/* Profession - Full Width if exists */}
                {profile.current_profession && (
                  <div className="sm:col-span-2 flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-slate-400 text-sm">বর্তমান পেশা</p>
                      <p className="text-white font-semibold text-lg">
                        {profile.current_profession}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!loading && !error && !profile && (
              <div className="text-center py-12">
                <p className="text-slate-400">কোনো প্রোফাইল তথ্য পাওয়া যায়নি</p>
              </div>
            )}
          </div>

          {/* Footer Note */}
          <div className="bg-slate-900/50 px-8 py-5 border-t border-slate-700">
            <p className="text-center text-xs text-slate-500">
              আপনার তথ্য সম্পূর্ণ নিরাপদ এবং শুধুমাত্র আপনার জন্য দৃশ্যমান
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;