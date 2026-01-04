import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { API_BASE_URL } from '../utils/apiClient.js';
import { useUserStore } from '../store/useUserStore.js';
import { Loader2, ChevronLeft, User, Calendar, Droplet, Phone, Briefcase, Home, MapPin, Lock } from 'lucide-react';

const RegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useUserStore((state) => state.login);

  const from = location.state?.from || '/profile';

  const [form, setForm] = useState({
    name_en: '',
    nid_number: '',
    mobile_number: '',
    password: '',
    re_password: '',
    name_bn: '',
    date_of_birth: '',
    emergency_mobile_number: '',
    blood_group: '',
    father_name: '',
    mother_name: '',
    school_or_college_name: '',
    current_profession: '',
    birthplace_village: '',
    birthplace_union: '',
    birthplace_ward_no: '',
    birthplace_upazila: '',
    birthplace_zila: '',
    permanent_village: '',
    permanent_union: '',
    permanent_ward_no: '',
    permanent_upazila: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!form.name_en || !form.nid_number || !form.mobile_number || !form.password) {
      setError('নাম (ইংরেজি), এনআইডি, মোবাইল নম্বর এবং পাসওয়ার্ড আবশ্যক');
      return;
    }

    if (form.password !== form.re_password) {
      setError('পাসওয়ার্ড এবং রি-পাসওয়ার্ড মিলছে না');
      return;
    }

    try {
      setSubmitting(true);

      const payload = {
        name_en: form.name_en,
        nid_number: form.nid_number,
        mobile_number: form.mobile_number,
        password: form.password,
        name_bn: form.name_bn || undefined,
        date_of_birth: form.date_of_birth || undefined,
        emergency_mobile_number: form.emergency_mobile_number || undefined,
        blood_group: form.blood_group || undefined,
        father_name: form.father_name || undefined,
        mother_name: form.mother_name || undefined,
        school_or_college_name: form.school_or_college_name || undefined,
        current_profession: form.current_profession || undefined,
        birthplace: {
          village: form.birthplace_village || undefined,
          union: form.birthplace_union || undefined,
          ward_no: form.birthplace_ward_no || undefined,
          upazila: form.birthplace_upazila || undefined,
          zila: form.birthplace_zila || undefined,
        },
        permanent_address: {
          village: form.permanent_village || undefined,
          union: form.permanent_union || undefined,
          ward_no: form.permanent_ward_no || undefined,
          upazila: form.permanent_upazila || undefined,
        },
      };

      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data?.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
        return;
      }

      setSuccessMessage('রেজিস্ট্রেশন সফল! লগইন করা হচ্ছে...');
      await login(form.mobile_number, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || 'কিছু একটা ভুল হয়েছে');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen via-slate-800 to-black flex flex-col">
    

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-20">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-3">
            যুব সমাজে যোগ দিন
          </h2>
          <p className="text-slate-400 text-base">
            তোমার তথ্য দিয়ে একাউন্ট তৈরি করো
          </p>
        </div>

        {/* Main Form Card */}
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* Required Fields - Highlighted Section */}
          <div className="bg-gradient-to-r from-yellow-600/20 to-amber-600/20 rounded-3xl p-6 border border-yellow-600/30">
            <p className="text-sm font-semibold text-yellow-300 mb-5">আবশ্যক তথ্য *</p>

            {/* Name (English) */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <User className="h-4 w-4" /> নাম (ইংরেজি)
              </label>
              <input
                type="text"
                name="name_en"
                value={form.name_en}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                placeholder="Full name in English"
              />
            </div>

            {/* NID & Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300">এনআইডি নম্বর</label>
                <input
                  type="text"
                  name="nid_number"
                  value={form.nid_number}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="NID number"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> মোবাইল নম্বর
                </label>
                <input
                  type="tel"
                  name="mobile_number"
                  value={form.mobile_number}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="01XXXXXXXXX"
                />
                <p className="text-xs text-slate-500">এই নম্বর দিয়ে লগইন করবে</p>
              </div>
            </div>

            {/* Passwords */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Lock className="h-4 w-4" /> পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="শক্তিশালী পাসওয়ার্ড সেট করুন"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <Lock className="h-4 w-4" /> পুনরায় পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  name="re_password"
                  value={form.re_password}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
                  placeholder="একই পাসওয়ার্ড আবার দিন"
                />
              </div>
            </div>
          </div>

          {/* Optional Personal Info */}
          <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border border-slate-700 space-y-6">
            <p className="text-sm font-semibold text-slate-300">ব্যক্তিগত তথ্য (অপশনাল)</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> জন্ম তারিখ
                </label>
                <input type="date" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Droplet className="h-4 w-4" /> রক্তের গ্রুপ
                </label>
                <input type="text" name="blood_group" value={form.blood_group} onChange={handleChange} placeholder="A+, O-, AB+" className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> জরুরি মোবাইল
                </label>
                <input type="tel" name="emergency_mobile_number" value={form.emergency_mobile_number} onChange={handleChange} placeholder="Emergency contact" className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400 flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> পেশা
                </label>
                <input type="text" name="current_profession" value={form.current_profession} onChange={handleChange} placeholder="ছাত্র, শিক্ষক, ব্যবসায়ী" className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">পিতার নাম</label>
                <input type="text" name="father_name" value={form.father_name} onChange={handleChange} className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">মাতার নাম</label>
                <input type="text" name="mother_name" value={form.mother_name} onChange={handleChange} className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">স্কুল/কলেজের নাম ( যদি থাকে )</label>
              <input type="text" name="school_or_college_name" value={form.school_or_college_name} onChange={handleChange} placeholder="শিক্ষা প্রতিষ্ঠানের নাম" className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">নাম (বাংলায়)</label>
              <input type="text" name="name_bn" value={form.name_bn} onChange={handleChange} placeholder="আপনার নাম বাংলায়" className="w-full bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
            </div>
          </div>

          {/* Address Sections - Collapsible Style */}
          <div className="space-y-6">
            {/* Birthplace */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border border-slate-700">
              <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4" /> জন্মস্থান (অপশনাল)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="birthplace_village" value={form.birthplace_village} onChange={handleChange} placeholder="গ্রাম" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="birthplace_union" value={form.birthplace_union} onChange={handleChange} placeholder="ইউনিয়ন" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="birthplace_ward_no" value={form.birthplace_ward_no} onChange={handleChange} placeholder="ওয়ার্ড নং" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="birthplace_upazila" value={form.birthplace_upazila} onChange={handleChange} placeholder="উপজেলা" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="birthplace_zila" value={form.birthplace_zila} onChange={handleChange} placeholder="জেলা" className="md:col-span-2 bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
              </div>
            </div>

            {/* Permanent Address */}
            <div className="bg-slate-800/60 backdrop-blur-md rounded-3xl p-6 border border-slate-700">
              <p className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
                <Home className="h-4 w-4" /> স্থায়ী ঠিকানা (অপশনাল)
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="permanent_village" value={form.permanent_village} onChange={handleChange} placeholder="গ্রাম" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="permanent_union" value={form.permanent_union} onChange={handleChange} placeholder="ইউনিয়ন" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="permanent_ward_no" value={form.permanent_ward_no} onChange={handleChange} placeholder="ওয়ার্ড নং" className="bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
                <input name="permanent_upazila" value={form.permanent_upazila} onChange={handleChange} placeholder="উপজেলা" className="md:col-span-2 bg-slate-900/70 border border-slate-700 rounded-2xl px-5 py-4 text-white placeholder-slate-500" />
              </div>
            </div>
          </div>

          {/* Error / Success */}
          {error && (
            <div className="bg-red-900/30 border border-red-600/50 rounded-2xl p-4 text-center">
              <p className="text-red-400 font-medium">{error}</p>
            </div>
          )}
          {successMessage && (
            <div className="bg-emerald-900/30 border border-emerald-600/50 rounded-2xl p-4 text-center">
              <p className="text-emerald-400 font-medium">{successMessage}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-amber-600 text-black font-bold text-lg py-5 rounded-2xl shadow-xl transform active:scale-95 transition disabled:opacity-70 flex items-center justify-center gap-3"
          >
            {submitting ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin" />
                রেজিস্ট্রেশন হচ্ছে...
              </>
            ) : (
              'নিবন্ধন সম্পন্ন করুন'
            )}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-10">
          <p className="text-slate-400">
            ইতিমধ্যে একাউন্ট আছে?
          </p>
          <Link
            to="/login"
            className="block mt-3 text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition"
          >
            এখনই লগইন করুন
          </Link>
        </div>

        {/* Home Link */}
        <div className="text-center mt-8 pb-10">
          <Link to="/" className="text-slate-500 text-sm underline hover:text-slate-300">
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;