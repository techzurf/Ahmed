import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  BookOpen,
  Calendar,
  Compass,
  HeartPulse,
  Droplet,
  Users,
  Briefcase,
  HelpCircle,
  Megaphone,
  ChevronRight,
  PhoneCall,
  Bell,
  Sparkles,
  BookMarked
} from 'lucide-react';
import {
  FOUNDER_NAME,
  FOUNDER_IMAGE,
  dailyVerse,
  dailyHadith,
  todayDua,
  welfareActivities,
  announcements,
  LOGO_IMAGE
} from '../../data';
import { UserProfile } from '../../types';

interface HomeProps {
  userProfile: UserProfile;
  onNavigateTab: (tab: 'home' | 'services' | 'community' | 'news' | 'profile') => void;
  onNavigateSub: (sub: string | null) => void;
  onOpenNotifications: () => void;
}

export default function HomeTab({ userProfile, onNavigateTab, onNavigateSub, onOpenNotifications }: HomeProps) {
  const [expandedCard, setExpandedCard] = useState<'verse' | 'hadith' | 'dua' | null>(null);

  const toggleExpand = (card: 'verse' | 'hadith' | 'dua') => {
    setExpandedCard((prev) => (prev === card ? null : card));
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-20 bg-[#FAF9F6] flex flex-col gap-5">
      {/* Top Welcome Bar */}
      <div className="flex items-center justify-between pt-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full border border-[#C8A23A] overflow-hidden shadow-sm bg-white">
            <img
              src={userProfile.profilePhoto}
              alt="Profile"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">Welcome Back</p>
            <h3 className="text-xs font-black text-neutral-800">{userProfile.fullName}</h3>
          </div>
        </div>

        {/* Quick notification bell with dot */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNotifications}
            className="w-9 h-9 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-neutral-700 relative hover:text-[#0F5D46]"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#C8A23A]" />
          </button>
        </div>
      </div>

      {/* Premium Welcome Banner Featuring Founder */}
      <div className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#0F5D46] via-[#127256] to-[#0B4433] text-white p-5 shadow-md">
        {/* Floating background decorative details */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full filter blur-xl" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#C8A23A]/10 rounded-full filter blur-lg" />

        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <span className="text-[9px] font-black uppercase tracking-widest text-[#C8A23A] bg-[#C8A23A]/10 px-2 py-0.5 rounded-full border border-[#C8A23A]/20">
              Community Connect
            </span>
            <h1 className="text-base font-extrabold tracking-tight mt-2 leading-tight">
              Welcome to {FOUNDER_NAME} Community Connect
            </h1>
            <p className="text-[10px] text-neutral-200 mt-1 font-semibold tracking-wide">
              Serving Humanity • Building Communities • Inspiring Change
            </p>
          </div>

          <div className="w-16 h-20 rounded-xl overflow-hidden border border-[#C8A23A]/40 bg-neutral-900 shadow-md shrink-0">
            <img
              src={FOUNDER_IMAGE}
              alt="Al-Haj Muhammad Yunus Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-medium text-emerald-100">
          <span>Official Social Service App</span>
          <button
            onClick={() => onNavigateSub('founder_profile')}
            className="flex items-center gap-1 text-[#C8A23A] font-bold hover:underline"
          >
            Founder Biography
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Daily Spiritual Cards (Expandable on Tap) */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl shadow-sm border border-neutral-100">
        <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-100">
          <Sparkles className="w-4 h-4 text-[#C8A23A]" />
          <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Daily Spiritual Corner</h4>
        </div>

        {/* Quran Verse of the Day */}
        <div
          onClick={() => toggleExpand('verse')}
          className="p-3 bg-emerald-50/50 border border-emerald-100 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors"
        >
          <div className="flex justify-between items-center text-[10px] font-bold text-emerald-800">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              Daily Quran Verse
            </span>
            <span className="bg-emerald-100 px-1.5 py-0.5 rounded text-[9px]">{dailyVerse.surah} {dailyVerse.verseNo}</span>
          </div>
          <p className="text-xs text-right font-medium text-emerald-950 mt-2 font-serif" dir="rtl">
            {dailyVerse.arabic}
          </p>
          <AnimatePresence>
            {(expandedCard === 'verse') && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-[11px] text-neutral-600 mt-2 font-medium italic border-t border-emerald-100 pt-2"
              >
                "{dailyVerse.translation}"
              </motion.p>
            )}
          </AnimatePresence>
          {!expandedCard && (
            <p className="text-[9px] text-[#C8A23A] font-bold mt-1 text-center">Tap to show English translation</p>
          )}
        </div>

        {/* Daily Hadith */}
        <div
          onClick={() => toggleExpand('hadith')}
          className="p-3 bg-amber-50/40 border border-amber-100 rounded-xl cursor-pointer hover:bg-amber-50 transition-colors"
        >
          <div className="flex justify-between items-center text-[10px] font-bold text-amber-800">
            <span className="flex items-center gap-1">
              <BookMarked className="w-3.5 h-3.5" />
              Hadith of the Day
            </span>
            <span className="bg-amber-100 px-1.5 py-0.5 rounded text-[9px]">{dailyHadith.source}</span>
          </div>
          <p className="text-xs text-right font-medium text-amber-950 mt-2 font-serif" dir="rtl">
            {dailyHadith.arabic}
          </p>
          <AnimatePresence>
            {(expandedCard === 'hadith') && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="text-[11px] text-neutral-600 mt-2 font-medium italic border-t border-amber-100 pt-2"
              >
                "{dailyHadith.translation}"
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Today's Dua */}
        <div
          onClick={() => toggleExpand('dua')}
          className="p-3 bg-neutral-50 border border-neutral-200/60 rounded-xl cursor-pointer hover:bg-neutral-100 transition-colors"
        >
          <div className="flex justify-between items-center text-[10px] font-bold text-neutral-700">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#C8A23A]" />
              Today's Dua
            </span>
            <span className="text-[9px] text-neutral-400">Expand</span>
          </div>
          <h5 className="text-[11px] font-bold text-neutral-800 mt-1.5">{todayDua.title}</h5>
          <AnimatePresence>
            {(expandedCard === 'dua') && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-2 border-t border-neutral-200/50 pt-2 flex flex-col gap-1.5 text-[11px]"
              >
                <p className="text-right text-emerald-900 font-serif" dir="rtl">{todayDua.arabic}</p>
                <p className="text-neutral-500 italic">Transliteration: {todayDua.transliteration}</p>
                <p className="text-neutral-700 font-medium">Translation: "{todayDua.translation}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Quick Action Grid */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wide px-1">Quick Action Grid</h4>
        <div className="grid grid-cols-4 gap-2">
          {/* Volunteer */}
          <button
            onClick={() => onNavigateSub('volunteer_module')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-emerald-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-[#0F5D46] flex items-center justify-center mb-1.5 group-hover:bg-[#0F5D46] group-hover:text-white transition-all">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Volunteer Module</span>
          </button>

          {/* Blood Donation */}
          <button
            onClick={() => onNavigateSub('blood_network')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-red-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-1.5 group-hover:bg-red-600 group-hover:text-white transition-all">
              <Droplet className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Blood Network</span>
          </button>

          {/* Request Help */}
          <button
            onClick={() => onNavigateSub('help_support')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-emerald-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 group-hover:bg-orange-600 group-hover:text-white transition-all">
              <HelpCircle className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Request Help</span>
          </button>

          {/* Community Services */}
          <button
            onClick={() => onNavigateTab('services')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-emerald-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 group-hover:bg-blue-600 group-hover:text-white transition-all">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Our Services</span>
          </button>

          {/* Jobs */}
          <button
            onClick={() => onNavigateSub('job_portal')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-[#C8A23A] group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-amber-50 text-[#C8A23A] flex items-center justify-center mb-1.5 group-hover:bg-[#C8A23A] group-hover:text-white transition-all">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Job Board</span>
          </button>

          {/* Medical Camp */}
          <button
            onClick={() => onNavigateSub('events')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-emerald-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mb-1.5 group-hover:bg-rose-600 group-hover:text-white transition-all">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Medical Camps</span>
          </button>

          {/* Islamic Corner */}
          <button
            onClick={() => onNavigateSub('islamic_corner')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-emerald-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center mb-1.5 group-hover:bg-teal-700 group-hover:text-white transition-all">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Islamic Corner</span>
          </button>

          {/* Contact Team */}
          <button
            onClick={() => onNavigateSub('media_gallery')}
            className="flex flex-col items-center justify-center p-2.5 bg-white rounded-xl border border-neutral-100 shadow-sm text-center hover:border-emerald-600 group transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mb-1.5 group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <PhoneCall className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-bold text-neutral-700 leading-tight">Media Gallery</span>
          </button>
        </div>
      </div>

      {/* Announcements */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1 px-1">
          <Megaphone className="w-4 h-4 text-[#C8A23A]" />
          <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Community Announcements</h4>
        </div>
        <div className="flex flex-col gap-2.5">
          {announcements.map((ann) => (
            <div key={ann.id} className="p-3 bg-white rounded-xl border border-neutral-100 shadow-sm">
              <div className="flex justify-between items-center text-[9px] font-bold text-[#C8A23A]">
                <span>Official Update</span>
                <span>{ann.date}</span>
              </div>
              <h5 className="text-[11px] font-extrabold text-neutral-800 mt-1">{ann.title}</h5>
              <p className="text-[10px] text-neutral-500 mt-1 leading-normal">{ann.details}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Latest Welfare Projects Showcase */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Latest Welfare Initiatives</h4>
          <button onClick={() => onNavigateTab('services')} className="text-[10px] font-black text-[#0F5D46] hover:underline">
            View All
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {welfareActivities.map((act) => (
            <div key={act.id} className="w-48 bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 snap-start">
              <div className="h-28 w-full relative">
                <img
                  src={act.image}
                  alt={act.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 text-[8px] font-extrabold uppercase bg-[#0F5D46] text-white px-1.5 py-0.5 rounded shadow">
                  {act.category}
                </span>
              </div>
              <div className="p-3">
                <h5 className="text-[11px] font-black text-neutral-800 truncate">{act.title}</h5>
                <p className="text-[9px] text-neutral-500 mt-1 line-clamp-2 leading-relaxed">{act.description}</p>
                <div className="mt-2.5 pt-2 border-t border-neutral-50 flex justify-between items-center text-[9px] font-bold text-[#C8A23A]">
                  <span>{act.beneficiaries}+ Served</span>
                  <span>Budget: {act.budget}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
