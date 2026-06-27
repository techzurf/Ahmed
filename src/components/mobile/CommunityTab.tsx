import React from 'react';
import { motion } from 'motion/react';
import {
  Users,
  Droplet,
  Calendar,
  HelpCircle,
  Briefcase,
  Compass,
  ArrowRight,
  TrendingUp,
  Award,
  Heart
} from 'lucide-react';
import { UserProfile } from '../../types';

interface CommunityTabProps {
  userProfile: UserProfile;
  onNavigateSub: (sub: string | null) => void;
  volunteerCount: number;
  donorCount: number;
  eventCount: number;
  jobCount: number;
}

export default function CommunityTab({
  userProfile,
  onNavigateSub,
  volunteerCount = 1420,
  donorCount = 312,
  eventCount = 3,
  jobCount = 3
}: CommunityTabProps) {

  const hubItems = [
    {
      id: 'volunteer_module',
      title: 'Volunteer Module',
      description: 'Join, claim ID card, track service hours, achievements & certificates.',
      icon: Users,
      badge: userProfile.volunteerStatus === 'Active' ? 'Active Vol' : 'Join Team',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-100'
    },
    {
      id: 'blood_network',
      title: 'Blood Donor Network',
      description: 'Register as donor, search emergency database, filter by group.',
      icon: Droplet,
      badge: `${donorCount} Donors`,
      color: 'bg-red-50 text-red-700 border-red-100'
    },
    {
      id: 'events',
      title: 'Upcoming Welfare Events',
      description: 'Medical camps, blood drives, career seminars, event registration & QR codes.',
      icon: Calendar,
      badge: `${eventCount} Events`,
      color: 'bg-[#C8A23A]/10 text-[#C8A23A] border-[#C8A23A]/20'
    },
    {
      id: 'help_support',
      title: 'Help & Support Tracker',
      description: 'Request financial/educational aid & track live coordinator review status.',
      icon: HelpCircle,
      badge: 'Active Tracker',
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100'
    },
    {
      id: 'job_portal',
      title: 'Job & Career Portal',
      description: 'Community jobs board, application portal, skill training & career help.',
      icon: Briefcase,
      badge: `${jobCount} Jobs`,
      color: 'bg-amber-50 text-amber-800 border-amber-100'
    },
    {
      id: 'islamic_corner',
      title: 'Islamic Corner',
      description: 'Prayer times, daily duyas, nearby masjids, calendar & Islamic articles.',
      icon: Compass,
      badge: 'Spiritual Hub',
      color: 'bg-teal-50 text-teal-800 border-teal-100'
    }
  ];

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-20 bg-[#FAF9F6] flex flex-col gap-4.5">
      {/* Title */}
      <div className="pt-4 flex flex-col gap-1">
        <h2 className="text-lg font-black text-[#0F5D46] tracking-tight">Community Hub</h2>
        <p className="text-[10px] text-neutral-500 font-medium">
          Connect, participate, and build strong humanitarian bonds across the platform
        </p>
      </div>

      {/* Community Metrics Banner */}
      <div className="grid grid-cols-2 gap-2 bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm">
        <div className="flex flex-col border-r border-neutral-100 pr-2">
          <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Active Volunteers</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg font-black text-[#0F5D46]">1,450+</span>
            <span className="text-[8px] text-emerald-600 font-bold flex items-center gap-0.5">
              <TrendingUp className="w-2.5 h-2.5" />
              +12 today
            </span>
          </div>
        </div>
        <div className="flex flex-col pl-2">
          <span className="text-[9px] text-neutral-400 font-bold uppercase tracking-wider">Donor Database</span>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-lg font-black text-red-600">320+</span>
            <span className="text-[8px] text-red-500 font-bold">All Groups</span>
          </div>
        </div>
      </div>

      {/* Hub Categories list */}
      <div className="flex flex-col gap-3">
        {hubItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              onClick={() => onNavigateSub(item.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.99 }}
              className="p-3.5 bg-white border border-neutral-100 rounded-2xl shadow-sm hover:border-[#0F5D46]/40 cursor-pointer transition-all flex justify-between items-center gap-3"
            >
              <div className="flex gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${item.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-neutral-800 tracking-wide">{item.title}</h3>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-full uppercase tracking-wider ${item.color}`}>
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-1 leading-normal max-w-[240px]">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="text-neutral-400 hover:text-[#0F5D46] shrink-0">
                <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Quotes Card */}
      <div className="p-4 rounded-2xl border border-dashed border-[#C8A23A]/40 bg-[#C8A23A]/5 flex items-start gap-3">
        <Award className="w-5 h-5 text-[#C8A23A] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-[10px] font-black text-[#C8A23A] uppercase tracking-wider">Social Cohesion Duty</h4>
          <p className="text-[10px] text-neutral-600 mt-1 leading-relaxed italic">
            "By coordinating efforts on blood, jobs, welfare, and scholarship, we build an interconnected society where nobody feels left behind."
          </p>
          <p className="text-[9px] text-[#C8A23A] font-bold mt-1">— Al-Haj Muhammad Yunus</p>
        </div>
      </div>
    </div>
  );
}
