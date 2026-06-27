import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Droplet,
  HeartPulse,
  GraduationCap,
  Award,
  Briefcase,
  Sparkles,
  Smile,
  Utensils,
  ShieldAlert,
  Flower2,
  CalendarCheck,
  BookOpen,
  ArrowRight,
  X,
  CheckCircle,
  HelpCircle,
  Search
} from 'lucide-react';
import { communityServices } from '../../data';
import { HelpRequest } from '../../types';

interface ServicesProps {
  requests: HelpRequest[];
  onAddRequest: (req: HelpRequest) => void;
  onNavigateSub: (sub: string | null) => void;
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Droplet,
  HeartPulse,
  GraduationCap,
  Award,
  Briefcase,
  Sparkles,
  Smile,
  Utensils,
  ShieldAlert,
  Flower2,
  CalendarCheck2: CalendarCheck,
  BookOpen
};

export default function ServicesTab({ requests, onAddRequest, onNavigateSub }: ServicesProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState<typeof communityServices[0] | null>(null);
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [details, setDetails] = useState('');
  const [success, setSuccess] = useState(false);

  const filteredServices = communityServices.filter((srv) =>
    srv.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    srv.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone || !details) {
      alert("Please fill in all fields");
      return;
    }

    const newReq: HelpRequest = {
      id: `req-${Date.now()}`,
      type: selectedService?.title || 'General Help',
      applicantName,
      mobile: applicantPhone,
      description: details,
      amountRequested: selectedService?.title === 'Scholarship Assistance' ? "$500" : "Sponsorship",
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    onAddRequest(newReq);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedService(null);
      setApplicantName('');
      setApplicantPhone('');
      setDetails('');
    }, 1800);
  };

  return (
    <div className="w-full h-full overflow-y-auto px-4 pb-20 bg-[#FAF9F6] flex flex-col gap-4">
      {/* Title Header */}
      <div className="pt-4 flex flex-col gap-1">
        <h2 className="text-lg font-black text-[#0F5D46] tracking-tight">Community Services</h2>
        <p className="text-[10px] text-neutral-500 font-medium">
          Dignified support programs provided directly to citizens under leadership
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          placeholder="Search support programs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-neutral-200/80 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
        />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-3">
        {filteredServices.map((srv) => {
          const IconComponent = iconMap[srv.icon] || HelpCircle;
          
          return (
            <motion.div
              key={srv.id}
              whileHover={{ y: -2 }}
              className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm flex flex-col justify-between gap-3 relative overflow-hidden"
            >
              {/* Corner decor star */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#0F5D46]/5 rounded-bl-full pointer-events-none" />

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5D46] flex items-center justify-center shrink-0 border border-[#0F5D46]/10 shadow-sm">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-black text-neutral-800 tracking-wide">{srv.title}</h3>
                  <p className="text-[10px] text-neutral-500 mt-1 leading-normal">{srv.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-neutral-50">
                {srv.title === "Blood Donation Network" ? (
                  <button
                    onClick={() => onNavigateSub('blood_network')}
                    className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0F5D46] hover:text-[#C8A23A] transition-colors"
                  >
                    Open Directory
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      if (srv.title === "Job Assistance") {
                        onNavigateSub('job_portal');
                      } else {
                        setSelectedService(srv);
                      }
                    }}
                    className="flex items-center gap-1.5 text-[10px] font-extrabold text-[#0F5D46] hover:text-[#C8A23A] transition-colors"
                  >
                    {srv.title === "Job Assistance" ? "Open Job Board" : "Apply / Submit Request"}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Slide-Up Application Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/60">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-h-[90%] bg-[#FAF9F6] rounded-t-[32px] p-5 shadow-2xl flex flex-col gap-4 relative z-50 overflow-y-auto"
            >
              {/* Header */}
              <div className="flex justify-between items-center border-b border-neutral-200/50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-emerald-50 rounded-lg text-[#0F5D46]">
                    {React.createElement(iconMap[selectedService.icon] || HelpCircle, { className: "w-4 h-4" })}
                  </div>
                  <div>
                    <h3 className="text-xs font-black text-[#0F5D46] uppercase tracking-wide">Application Form</h3>
                    <h4 className="text-[11px] font-bold text-neutral-500 truncate max-w-[200px]">{selectedService.title}</h4>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedService(null)}
                  className="w-7 h-7 bg-neutral-200/60 text-neutral-600 rounded-full flex items-center justify-center hover:bg-neutral-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-green-600 shadow"
                  >
                    <CheckCircle className="w-10 h-10" />
                  </motion.div>
                  <h3 className="text-sm font-black text-neutral-800">Application Submitted!</h3>
                  <p className="text-xs text-neutral-500 px-6">
                    Your request for <strong>{selectedService.title}</strong> has been saved. Our coordinator team will review this shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="flex flex-col gap-4 pb-6">
                  <div className="p-3 bg-white border border-neutral-100 rounded-xl text-[10px] text-neutral-500 leading-relaxed">
                    <strong>Program Guidelines:</strong> {selectedService.details}
                  </div>

                  {/* Applicant Name */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-wide">Applicant Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Enter beneficiary full name"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800 focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>

                  {/* Contact Phone */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-wide">Contact Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800 focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>

                  {/* Support Details */}
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-black text-neutral-600 uppercase tracking-wide">Briefly describe your request / eligibility</label>
                    <textarea
                      required
                      rows={3}
                      placeholder="Why do you require this support? Share any relevant family details."
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-xs outline-none text-neutral-800 resize-none focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-black rounded-xl shadow-md border border-[#C8A23A]/10 mt-2"
                  >
                    Submit Secure Request
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
