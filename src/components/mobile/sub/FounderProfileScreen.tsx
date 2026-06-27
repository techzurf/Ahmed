import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
  Award,
  BookOpen,
  CalendarDays,
  Play,
  Compass,
  Video,
  Globe
} from 'lucide-react';
import { founderProfile } from '../../data';

interface FounderProps {
  onBack: () => void;
}

export default function FounderProfileScreen({ onBack }: FounderProps) {
  const profile = founderProfile;

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-12 bg-[#FAF9F6] flex flex-col gap-5">
      {/* Back Button sticky-like */}
      <div className="pt-4 flex items-center justify-between z-10 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-[#0F5D46]"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-black uppercase text-[#0F5D46] tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100/50">
          Leader Biography
        </span>
        <div className="w-8" />
      </div>

      {/* Hero Portait card */}
      <div className="relative w-full rounded-2xl overflow-hidden shadow-md bg-white border border-neutral-100 p-4">
        <div className="flex gap-4">
          <div className="w-24 h-32 rounded-xl overflow-hidden border border-[#C8A23A] bg-neutral-900 shrink-0">
            <img
              src={profile.image}
              alt={profile.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[8px] font-black text-[#C8A23A] uppercase tracking-wider">Honorary Trustee</span>
            <h1 className="text-sm font-black text-neutral-800 tracking-wide mt-1 leading-tight">{profile.name}</h1>
            <p className="text-[9px] text-[#0F5D46] font-bold mt-1 leading-normal italic">{profile.tagline}</p>
            
            <div className="flex gap-1.5 mt-3">
              {Object.entries(profile.contact.socials).map(([key, url]) => (
                <a
                  key={key}
                  href="#"
                  onClick={(e) => { e.preventDefault(); alert(`Redirecting to official ${key} handle (simulation)...`); }}
                  className="w-6 h-6 rounded-lg bg-[#0F5D46]/5 hover:bg-[#0F5D46]/10 text-[#0F5D46] flex items-center justify-center text-[10px] font-bold capitalize"
                >
                  {key[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Biography */}
      <div className="flex flex-col gap-2.5 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-50">
          <BookOpen className="w-4 h-4 text-[#C8A23A]" />
          <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Biography</h3>
        </div>
        <p className="text-[10px] text-neutral-600 font-medium leading-relaxed">
          {profile.bio}
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3.5 bg-emerald-50/50 rounded-2xl border border-emerald-100/50 flex flex-col gap-1.5">
          <Compass className="w-4 h-4 text-[#0F5D46]" />
          <h4 className="text-[10px] font-black text-neutral-800 uppercase tracking-wide">Our Vision</h4>
          <p className="text-[9px] text-neutral-500 font-medium leading-normal">{profile.vision}</p>
        </div>
        <div className="p-3.5 bg-amber-50/40 rounded-2xl border border-amber-100/50 flex flex-col gap-1.5">
          <Sparkles className="w-4 h-4 text-[#C8A23A]" />
          <h4 className="text-[10px] font-black text-neutral-800 uppercase tracking-wide">Our Mission</h4>
          <p className="text-[9px] text-neutral-500 font-medium leading-normal">{profile.mission}</p>
        </div>
      </div>

      {/* Achievements Bullet lists */}
      <div className="flex flex-col gap-3 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex items-center gap-1.5 pb-2 border-b border-neutral-50">
          <Award className="w-4 h-4 text-[#C8A23A]" />
          <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Achievements & Merits</h3>
        </div>
        <div className="flex flex-col gap-2">
          {profile.achievements.map((ach, idx) => (
            <div key={idx} className="flex gap-2 items-start text-[10px] text-neutral-600 font-semibold leading-normal">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A23A] mt-1.5 shrink-0" />
              <span>{ach}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Video Messages section */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5 px-1">
          <Video className="w-4 h-4 text-[#0F5D46]" />
          <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Video Messages</h3>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
          {profile.videoMessages.map((vid, idx) => (
            <div
              key={idx}
              onClick={() => alert(`Starting video playback simulation: "${vid.title}"`)}
              className="w-44 bg-white rounded-xl overflow-hidden border border-neutral-100 shadow-sm shrink-0 snap-start cursor-pointer hover:border-[#0F5D46]"
            >
              <div className="h-24 bg-neutral-900 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/40" />
                <div className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center backdrop-blur shadow relative z-10">
                  <Play className="w-4 h-4 fill-current ml-0.5 text-[#C8A23A]" />
                </div>
              </div>
              <div className="p-2.5">
                <h4 className="text-[10px] font-extrabold text-neutral-800 line-clamp-1">{vid.title}</h4>
                <div className="flex justify-between text-[8px] text-neutral-400 font-bold mt-1">
                  <span>{vid.duration}</span>
                  <span>{vid.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Community Service Timeline */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-1.5 px-1">
          <CalendarDays className="w-4 h-4 text-[#0F5D46]" />
          <h3 className="text-xs font-black text-neutral-800 uppercase tracking-wide">Service Timeline</h3>
        </div>
        <div className="relative border-l border-neutral-200/60 pl-4 ml-2 flex flex-col gap-4">
          {profile.timeline.map((item, idx) => (
            <div key={idx} className="relative">
              {/* Dot node */}
              <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C8A23A] border-2 border-[#FAF9F6]" />
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black text-[#0F5D46] bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">
                  {item.year}
                </span>
                <h4 className="text-[10px] font-black text-neutral-800 truncate max-w-[190px]">{item.title}</h4>
              </div>
              <p className="text-[9px] text-neutral-500 font-medium leading-relaxed mt-1">
                {item.details}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Official Contact Info Card */}
      <div className="bg-white rounded-2xl border border-neutral-100 p-4 shadow-sm flex flex-col gap-2.5 text-[10px] text-neutral-600 font-medium">
        <h4 className="text-[11px] font-black text-neutral-800 uppercase tracking-wide pb-1.5 border-b border-neutral-50">Office Contacts</h4>
        <div className="flex items-start gap-2">
          <MapPin className="w-3.5 h-3.5 text-[#0F5D46] shrink-0" />
          <span>{profile.contact.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mail className="w-3.5 h-3.5 text-[#0F5D46] shrink-0" />
          <span>{profile.contact.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5 text-[#0F5D46] shrink-0" />
          <span>{profile.contact.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3.5 h-3.5 text-[#0F5D46] shrink-0" />
          <span>WhatsApp Hotline: {profile.contact.whatsapp}</span>
        </div>
      </div>
    </div>
  );
}
