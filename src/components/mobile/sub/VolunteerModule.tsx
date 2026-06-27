import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Users, QrCode, Award, Shield, CheckCircle, Clock, Trophy, ChevronRight } from 'lucide-react';
import { UserProfile } from '../../../types';
import { useLanguage } from '../../../LanguageContext';

const LOGO_IMAGE = "https://res.cloudinary.com/dv16a8l1l/image/upload/c_thumb,w_120,h_120,g_face/v1782547740/WhatsApp_Image_2026-06-04_at_12.58.27_abgfzj.jpg";

interface VolunteerProps {
  profile: UserProfile;
  onRegisterVolunteer: () => void;
  onBack: () => void;
}

export default function VolunteerModule({ profile, onRegisterVolunteer, onBack }: VolunteerProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'id-card' | 'rewards' | 'history'>('id-card');
  const [success, setSuccess] = useState(false);

  const handleApply = () => {
    onRegisterVolunteer();
    setSuccess(true);
  };

  const tasks = [
    { id: 1, title_en: "Medical Camp Setup", title_ta: "மருத்துவ முகாம் வடிவமைப்பு", date: "July 10, 2026", status: "Upcoming", hours: 4 },
    { id: 2, title_en: "Ramadan Food Distribution", title_ta: "ரமலான் உணவு விநியோகம்", date: "Mar 2026", status: "Completed", hours: 8 },
    { id: 3, title_en: "Monsoon Relief Drive", title_ta: "மழைக்கால நிவாரண முகாம்", date: "Jan 2026", status: "Completed", hours: 6 }
  ];

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-12 bg-[#FAF9F6] flex flex-col gap-4 relative">
      {/* Header */}
      <div className="pt-4 flex items-center justify-between shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 rounded-full bg-white shadow-sm border border-neutral-100 flex items-center justify-center text-neutral-700 hover:text-[#0F5D46]"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h3 className="text-xs font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('vol.title', 'Volunteer Hub')}</h3>
        <div className="w-8" />
      </div>

      {profile.volunteerStatus === 'Not Registered' ? (
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-sm flex flex-col items-center text-center gap-4">
          <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center text-[#0F5D46] border border-emerald-100">
            <Users className="w-7 h-7 text-[#C8A23A]" />
          </div>
          <div>
            <h4 className="text-sm font-black text-neutral-800 font-display">{t('comm.volunteer_title', 'Volunteer Hub')}</h4>
            <p className="text-[10px] text-neutral-500 font-medium leading-relaxed max-w-xs mt-1">
              {t('comm.volunteer_desc', "Become a volunteer and support Ahmed's social & emergency response missions.")}
            </p>
          </div>

          <div className="w-full grid grid-cols-3 gap-2.5 bg-[#FAF9F6] p-3 rounded-xl border border-neutral-100">
            <div className="flex flex-col items-center text-center gap-1">
              <Shield className="w-4 h-4 text-[#0F5D46]" />
              <span className="text-[8px] font-black uppercase text-neutral-700">{t('vol.id_label', 'Official Card')}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1 border-x border-neutral-200/60">
              <Clock className="w-4 h-4 text-[#0F5D46]" />
              <span className="text-[8px] font-black uppercase text-neutral-700">{t('vol.hours_label', 'Service Hours')}</span>
            </div>
            <div className="flex flex-col items-center text-center gap-1">
              <Award className="w-4 h-4 text-[#0F5D46]" />
              <span className="text-[8px] font-black uppercase text-neutral-700">{t('vol.cert_label', 'Certificates')}</span>
            </div>
          </div>

          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-1.5 text-[#0F5D46] bg-emerald-50 border border-emerald-100 py-2.5 px-4 rounded-xl w-full justify-center"
            >
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="text-[10px] font-black uppercase tracking-wider">{t('status.pending', 'Application Under Review!')}</span>
            </motion.div>
          ) : (
            <button
              onClick={handleApply}
              className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-black rounded-xl hover:bg-[#0c4e3b] shadow-sm border border-[#C8A23A]/10 uppercase tracking-wider font-display"
            >
              {t('comm.btn_register', 'Register as Ahmed Volunteer')}
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {/* Volunteer Status & Navigation Tabs */}
          <div className="flex justify-between items-center bg-white p-1 rounded-xl border border-neutral-100 shadow-sm shrink-0">
            <button
              onClick={() => setActiveTab('id-card')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'id-card'
                  ? 'bg-[#0F5D46] text-white shadow'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              ID Card
            </button>
            <button
              onClick={() => setActiveTab('rewards')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'rewards'
                  ? 'bg-[#0F5D46] text-white shadow'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {t('vol.rewards_tab', 'Badges')}
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
                activeTab === 'history'
                  ? 'bg-[#0F5D46] text-white shadow'
                  : 'text-neutral-500 hover:text-neutral-700'
              }`}
            >
              {t('vol.history_tab', 'Mission Log')}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'id-card' && (
              <motion.div
                key="id-card"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-4"
              >
                {/* ID Card Display */}
                <div className="bg-gradient-to-br from-[#0F5D46] to-[#0a4131] text-white rounded-3xl p-5 border border-[#C8A23A]/40 shadow-xl relative overflow-hidden">
                  {/* Decorative shapes */}
                  <div className="absolute right-0 top-0 w-24 h-24 bg-[#C8A23A]/10 rounded-full blur-2xl" />
                  <div className="absolute left-0 bottom-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl" />

                  {/* Top Bar logo & header */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-white p-0.5 flex items-center justify-center">
                        <img src={LOGO_IMAGE} alt="Logo" referrerPolicy="no-referrer" className="w-full h-full rounded-full object-cover" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider font-display text-white">Ahmed Volunteers</span>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest text-[#C8A23A] bg-white/5 px-2 py-0.5 rounded border border-white/10">{t('comm.registered', 'Active Member')}</span>
                  </div>

                  {/* Profile Detail */}
                  <div className="flex gap-4 items-center mt-4">
                    <div className="w-16 h-16 rounded-2xl bg-[#FAF9F6] border-2 border-[#C8A23A] p-0.5 shrink-0 overflow-hidden shadow">
                      <img src={profile.profilePhoto} alt="Profile" referrerPolicy="no-referrer" className="w-full h-full rounded-xl object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-black tracking-tight uppercase truncate">{profile.fullName}</h4>
                      <p className="text-[9px] font-black text-[#C8A23A] mt-0.5">UID: {profile.volunteerId || 'AL-709A1'}</p>

                      <div className="grid grid-cols-2 gap-2 mt-2 border-t border-white/10 pt-2">
                        <div>
                          <p className="text-[7px] text-white/50 uppercase font-bold">{t('login.blood_label', 'Blood Type')}</p>
                          <p className="text-[10px] font-black text-white">{profile.bloodGroup}</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-white/50 uppercase font-bold">{t('vol.hours', 'Experience')}</p>
                          <p className="text-[10px] font-black text-[#C8A23A]">{profile.serviceHours} {t('vol.hours', 'Hours')}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* QR Code section */}
                  <div className="mt-5 bg-white rounded-2xl p-3 flex items-center justify-between gap-4 border border-white/10 shadow-inner text-neutral-800">
                    <div>
                      <p className="text-[8px] text-neutral-400 font-bold uppercase">{t('vol.card_title', 'VOLUNTEER IDENTITY')}</p>
                      <p className="text-[10px] text-[#0F5D46] font-black uppercase mt-0.5 font-display">{t('vol.scan', 'Scan Campaign QR')}</p>
                    </div>
                    <div className="w-10 h-10 bg-[#FAF9F6] border border-neutral-200 rounded-xl p-1 flex items-center justify-center shrink-0">
                      <QrCode className="w-full h-full text-neutral-800" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'rewards' && (
              <motion.div
                key="rewards"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-3"
              >
                {/* Metric Summary */}
                <div className="grid grid-cols-2 gap-2.5 shrink-0">
                  <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-1.5">
                    <Clock className="w-5 h-5 text-[#0F5D46]" />
                    <div>
                      <p className="text-[8px] text-neutral-400 font-bold uppercase">{t('comm.volunteer_hours', 'Total Service')}</p>
                      <h4 className="text-base font-extrabold text-neutral-800 font-display mt-0.5">{profile.serviceHours} <span className="text-[10px] text-neutral-500 font-bold">{t('vol.hours', 'Hrs')}</span></h4>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-1.5">
                    <Trophy className="w-5 h-5 text-[#C8A23A]" />
                    <div>
                      <p className="text-[8px] text-neutral-400 font-bold uppercase">{t('comm.points', 'Points Earned')}</p>
                      <h4 className="text-base font-extrabold text-neutral-800 font-display mt-0.5">{profile.communityPoints} <span className="text-[10px] text-neutral-500 font-bold">{t('comm.points', 'Pts')}</span></h4>
                    </div>
                  </div>
                </div>

                {/* Badges and Badges status */}
                <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-3">
                  <h4 className="text-[10px] font-black uppercase text-[#0F5D46] tracking-wider font-display border-b border-neutral-100 pb-2">{t('vol.certificates', 'Unlocked Badges & Credentials')}</h4>

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] rounded-xl border border-neutral-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-50 border border-amber-100 flex items-center justify-center text-[#C8A23A]">
                          <Award className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black text-neutral-800">{language === 'ta' ? 'அறக்கட்டளை கூட்டாளி பேட்ஜ்' : 'Founder Associate Badge'}</h5>
                          <p className="text-[8px] text-neutral-400 font-bold mt-0.5">{language === 'ta' ? '2+ நிவாரண ஓட்டங்களில் நேரடியாக உதவினார்' : 'Assisted directly in 2+ major relief runs'}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-wider text-amber-800 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded">Active</span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] rounded-xl border border-neutral-100">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#0F5D46]">
                          <Shield className="w-4 h-4" />
                        </div>
                        <div>
                          <h5 className="text-[10px] font-black text-neutral-800">{language === 'ta' ? 'மருத்துவ காப்பாளர்' : 'Medical Guardian'}</h5>
                          <p className="text-[8px] text-neutral-400 font-bold mt-0.5">{language === 'ta' ? 'பெங்களூரு மெகா சுகாதார முகாமின் போது பெற்றது' : 'Earned during Bengaluru Mega Health Camp'}</p>
                        </div>
                      </div>
                      <span className="text-[8px] font-black uppercase tracking-wider text-[#0F5D46] bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded">Verified</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="flex flex-col gap-2.5"
              >
                <div className="flex justify-between items-center px-1 text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-display">
                  <span>{t('vol.leaderboard', 'Assigned Operations')}</span>
                  <span>{tasks.length} {t('vol.history_tab', 'missions')}</span>
                </div>

                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="p-3.5 bg-white rounded-xl border border-neutral-100 shadow-sm flex justify-between items-center"
                  >
                    <div>
                      <h4 className="text-xs font-black text-neutral-800">{language === 'ta' ? task.title_ta : task.title_en}</h4>
                      <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-bold mt-0.5">
                        <span>{task.date}</span>
                        <span>•</span>
                        <span>{task.hours} Hours Credit</span>
                      </div>
                    </div>

                    <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded border ${
                      task.status === 'Upcoming'
                        ? 'text-amber-800 bg-amber-50 border-amber-100'
                        : 'text-emerald-800 bg-emerald-50 border-emerald-100'
                    }`}>
                      {task.status === 'Upcoming' ? t('status.pending', 'Upcoming') : t('status.completed', 'Completed')}
                    </span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
