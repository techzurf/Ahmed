import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award,
  Calendar,
  Clock,
  User,
  ShieldAlert,
  ChevronRight,
  Download,
  QrCode,
  MapPin,
  Settings,
  X,
  FileCheck2,
  BookOpen,
  Mail,
  Smartphone,
  CheckCircle,
  Video
} from 'lucide-react';
import { UserProfile } from '../../types';
import { FOUNDER_IMAGE, FOUNDER_NAME, LOGO_IMAGE } from '../../data';

interface ProfileProps {
  userProfile: UserProfile;
  onNavigateSub: (sub: string | null) => void;
  onLogout: () => void;
}

export default function ProfileTab({ userProfile, onNavigateSub, onLogout }: ProfileProps) {
  const [showCertificate, setShowCertificate] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const triggerDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      alert("Digital Card Saved! check your device's downloads folder (simulation).");
    }, 1200);
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-20 bg-[#FAF9F6] flex flex-col gap-5">
      {/* Settings Top Button */}
      <div className="pt-4 flex justify-between items-center">
        <h2 className="text-lg font-black text-[#0F5D46] tracking-tight">My Membership</h2>
        <button
          onClick={() => {
            if (confirm("Are you sure you want to log out of your community profile?")) {
              onLogout();
            }
          }}
          className="text-[10px] font-bold text-red-600 hover:underline"
        >
          Logout Account
        </button>
      </div>

      {/* Profile Header Block */}
      <div className="flex items-center gap-3.5 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="relative">
          <div className="w-14 h-14 rounded-full border border-[#C8A23A] overflow-hidden bg-white shadow-sm">
            <img
              src={userProfile.profilePhoto}
              alt={userProfile.fullName}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          {userProfile.volunteerStatus === 'Active' && (
            <span className="absolute -bottom-1 -right-1 bg-[#0F5D46] text-white p-1 rounded-full border border-white">
              <Award className="w-3 h-3 text-[#C8A23A]" />
            </span>
          )}
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="text-xs font-black text-neutral-800">{userProfile.fullName}</h3>
            {userProfile.volunteerStatus === 'Active' && (
              <span className="text-[8px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded border border-emerald-100 uppercase tracking-wide">
                Volunteer
              </span>
            )}
          </div>
          <p className="text-[10px] text-neutral-500 font-medium mt-0.5">{userProfile.occupation}</p>
          <div className="flex items-center gap-1 text-[9px] text-neutral-400 font-bold mt-1">
            <MapPin className="w-3 h-3" />
            {userProfile.city}, {userProfile.district}
          </div>
        </div>
      </div>

      {/* Digital Black Gold Membership Card */}
      <div className="relative w-full aspect-[1.6/1] rounded-2xl bg-gradient-to-tr from-neutral-900 via-neutral-800 to-neutral-950 p-5 text-white shadow-lg overflow-hidden border border-[#C8A23A]/30">
        {/* Shiny radial overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

        {/* Card Header */}
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-[#0F5D46] p-0.5 border border-[#C8A23A] flex items-center justify-center">
              <img src={LOGO_IMAGE} alt="Logo" referrerPolicy="no-referrer" className="w-full h-full rounded-full object-cover" />
            </div>
            <div>
              <h4 className="text-[10px] font-black tracking-wider uppercase text-white">Community Connect</h4>
              <p className="text-[6px] text-[#C8A23A] font-bold tracking-widest uppercase">Member Network</p>
            </div>
          </div>
          <span className="text-[7px] font-bold text-neutral-400 uppercase tracking-widest border border-neutral-600 px-1.5 py-0.5 rounded">
            ID: {userProfile.membershipId}
          </span>
        </div>

        {/* Card Body */}
        <div className="mt-5 flex justify-between items-end">
          <div>
            <h5 className="text-xs font-bold tracking-wide uppercase text-white truncate max-w-[170px]">{userProfile.fullName}</h5>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2.5">
              <div>
                <span className="text-[6px] text-neutral-400 uppercase tracking-wider block">Member Since</span>
                <span className="text-[8px] font-black text-neutral-200">{userProfile.memberSince}</span>
              </div>
              <div>
                <span className="text-[6px] text-neutral-400 uppercase tracking-wider block">Blood Group</span>
                <span className="text-[8px] font-black text-[#C8A23A]">{userProfile.bloodGroup}</span>
              </div>
            </div>
          </div>

          {/* Card QR Code Container */}
          <div className="flex flex-col items-center gap-1 shrink-0">
            <div className="p-1 bg-white rounded-lg shadow-inner">
              <QrCode className="w-10 h-10 text-neutral-900" strokeWidth={1.5} />
            </div>
            <span className="text-[6px] font-black text-[#C8A23A] tracking-wider uppercase">Verified ID</span>
          </div>
        </div>

        {/* Card Footer Line */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-[#0F5D46] via-[#C8A23A] to-[#0F5D46]" />
      </div>

      {/* Card Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={triggerDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-neutral-200/80 rounded-xl text-[10px] font-black text-[#0F5D46] hover:bg-neutral-50 shadow-sm"
        >
          <Download className="w-3.5 h-3.5 text-[#C8A23A]" />
          {downloading ? "Saving..." : "Download Card"}
        </button>
        <button
          onClick={() => alert("Verification code matches live server: " + userProfile.membershipId)}
          className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white border border-neutral-200/80 rounded-xl text-[10px] font-black text-[#0F5D46] hover:bg-neutral-50 shadow-sm"
        >
          <QrCode className="w-3.5 h-3.5" />
          Share QR Code
        </button>
      </div>

      {/* Member Statistics Grid */}
      <div className="grid grid-cols-3 gap-2 text-center bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex flex-col py-1.5 border-r border-neutral-50">
          <span className="text-sm font-black text-[#0F5D46]">{userProfile.communityPoints}</span>
          <span className="text-[8px] text-neutral-400 font-black uppercase mt-0.5">Points</span>
        </div>
        <div className="flex flex-col py-1.5 border-r border-neutral-50">
          <span className="text-sm font-black text-neutral-800">{userProfile.serviceHours} hrs</span>
          <span className="text-[8px] text-neutral-400 font-black uppercase mt-0.5">Vol Time</span>
        </div>
        <div className="flex flex-col py-1.5">
          <span className="text-sm font-black text-[#C8A23A]">{userProfile.certificates.length}</span>
          <span className="text-[8px] text-neutral-400 font-black uppercase mt-0.5">Certificates</span>
        </div>
      </div>

      {/* Premium Redirection to Founder Public Profile Screen */}
      <div
        onClick={() => onNavigateSub('founder_profile')}
        className="p-4 bg-gradient-to-r from-[#0F5D46] to-[#127256] text-white rounded-2xl shadow-sm border border-[#C8A23A]/30 flex justify-between items-center cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full pointer-events-none filter blur-xl" />
        <div className="flex gap-3 items-center">
          <div className="w-12 h-12 rounded-full border border-[#C8A23A]/40 overflow-hidden bg-neutral-900 shrink-0">
            <img
              src={FOUNDER_IMAGE}
              alt="Founder"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-xs font-black text-[#C8A23A] tracking-wide">Explore Founder's Profile</h4>
            <p className="text-[9px] text-emerald-100 font-medium leading-normal mt-0.5 max-w-[190px]">
              Learn about Muhammad Yunus's public service records, vision, and mission.
            </p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-[#C8A23A] shrink-0" />
      </div>

      {/* My Achievements & Certificates section */}
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-black text-neutral-800 uppercase tracking-wide">My Earned Certificates</h4>
        <div className="flex flex-col gap-2">
          {userProfile.certificates.map((certId, idx) => (
            <div
              key={certId}
              onClick={() => setShowCertificate(certId)}
              className="p-3 bg-white rounded-xl border border-neutral-100 shadow-sm flex justify-between items-center cursor-pointer hover:border-[#0F5D46]/30"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-50 text-[#0F5D46] rounded-lg">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-black text-neutral-800">Volunteer Excellence Cert</span>
                  <p className="text-[8px] text-neutral-400 font-bold mt-0.5">ID: {certId} • Approved</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </div>
          ))}

          {userProfile.certificates.length === 0 && (
            <div className="p-4 bg-white text-center text-[10px] font-bold text-neutral-400 rounded-xl border border-neutral-100">
              No certificates earned yet. Become a volunteer and register hours to qualify!
            </div>
          )}
        </div>
      </div>

      {/* Modal for viewing certificates */}
      <AnimatePresence>
        {showCertificate && (
          <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full bg-white rounded-2xl p-5 shadow-2xl relative flex flex-col items-center text-center gap-4 border border-[#C8A23A]"
            >
              <button
                onClick={() => setShowCertificate(null)}
                className="absolute top-3 right-3 w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-full bg-[#0F5D46]/10 text-[#0F5D46] flex items-center justify-center">
                <FileCheck2 className="w-6 h-6 text-[#C8A23A]" />
              </div>

              <div>
                <h3 className="text-sm font-black text-[#0F5D46] uppercase">Certificate of Excellence</h3>
                <p className="text-[8px] text-[#C8A23A] font-bold mt-0.5 tracking-wider uppercase">Al-Ameen Welfare Trust</p>
              </div>

              <div className="py-2.5 px-4 bg-[#FAF9F6] border border-neutral-100 rounded-xl w-full text-[10px] text-neutral-500 leading-relaxed italic">
                "This certificate is proudly awarded to <strong>{userProfile.fullName}</strong> in recognition of outstanding voluntarism, commitment to public welfare, and selfless community service hours."
              </div>

              <div className="flex justify-between w-full pt-4 border-t border-neutral-100 text-[8px] font-bold text-neutral-400">
                <div className="flex flex-col items-center">
                  <div className="h-4 w-12 border-b border-neutral-300 mb-1" />
                  <span>Trustee Board</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="font-extrabold text-[#0F5D46]">{FOUNDER_NAME}</span>
                  <span>Trust President</span>
                </div>
              </div>

              <button
                onClick={() => alert("Certificate PDF download started...")}
                className="flex items-center gap-1.5 py-1.5 px-4 bg-[#0F5D46] text-white rounded-lg text-[9px] font-bold"
              >
                <Download className="w-3 h-3" />
                Download PDF
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
