import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Briefcase, MapPin, DollarSign, ListChecks, CheckCircle, ChevronRight, X, User } from 'lucide-react';
import { Job } from '../../../types';
import { useLanguage } from '../../../LanguageContext';

interface JobProps {
  jobs: Job[];
  onBack: () => void;
}

export default function JobPortalScreen({ jobs, onBack }: JobProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  // Apply Form
  const [applicantName, setApplicantName] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantResume, setApplicantResume] = useState('');

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
           job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
           job.location.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleApplyJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantPhone) return;

    setApplySuccess(true);
    setTimeout(() => {
      setApplySuccess(false);
      setShowApplyModal(false);
      setSelectedJob(null);
      setApplicantName('');
      setApplicantPhone('');
      setApplicantResume('');
    }, 1500);
  };

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
        <h3 className="text-xs font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('jobs.title', 'Youth Job Portal')}</h3>
        <div className="w-8" />
      </div>

      {/* Intro card */}
      <div className="bg-[#0F5D46]/5 rounded-2xl p-4 border border-[#0F5D46]/10 flex flex-col gap-2 shrink-0">
        <div className="flex items-center gap-2 text-[#0F5D46]">
          <Briefcase className="w-4 h-4 text-[#C8A23A]" />
          <h4 className="text-[10px] font-black uppercase tracking-wider font-display">Empowering Livelihoods</h4>
        </div>
        <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
          {t('jobs.subtitle', 'Connecting youths with entry-level, delivery, retail, and office assistant positions to foster self-reliance.')}
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-3.5 rounded-2xl border border-neutral-100 shadow-sm shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={t('jobs.search_placeholder', 'Search jobs by title or company...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FAF9F6] border border-neutral-200/80 rounded-xl text-[11px] font-medium text-neutral-800 outline-none"
          />
        </div>
      </div>

      {/* Jobs List */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1 text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-display">
          <span>Active Opportunities</span>
          <span>{filteredJobs.length} listed</span>
        </div>

        {filteredJobs.map((job) => (
          <div
            key={job.id}
            onClick={() => setSelectedJob(job)}
            className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm hover:border-[#0F5D46]/20 cursor-pointer flex justify-between items-center transition-all group"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0F5D46] border border-emerald-100 flex items-center justify-center shrink-0">
                <Briefcase className="w-5 h-5 text-[#C8A23A]" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-black text-neutral-800 leading-snug group-hover:text-[#0F5D46] transition-all">{job.title}</h4>
                <p className="text-[9px] text-neutral-400 font-bold mt-0.5 uppercase tracking-wide">{job.company}</p>
                <div className="flex items-center gap-2 text-[9px] text-neutral-500 font-medium mt-1.5">
                  <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3 text-neutral-400" /> {job.location}</span>
                  <span>•</span>
                  <span className="text-emerald-700 font-bold">{job.salary}</span>
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#0F5D46] group-hover:translate-x-0.5 transition-all shrink-0" />
          </div>
        ))}

        {filteredJobs.length === 0 && (
          <p className="text-[10px] text-neutral-400 font-bold text-center py-6">No matching career listings found.</p>
        )}
      </div>

      {/* Details / Application Overlay */}
      <AnimatePresence>
        {selectedJob && (
          <div className="absolute inset-0 z-50 bg-black/60 flex items-end">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-full max-h-[85%] bg-white rounded-t-3xl p-5 border-t border-[#C8A23A] shadow-2xl overflow-y-auto flex flex-col gap-4"
            >
              <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                <span className="px-2 py-0.5 bg-neutral-100 text-neutral-600 text-[8px] font-black uppercase tracking-wider rounded-md">
                  {selectedJob.type} Opening
                </span>
                <button
                  onClick={() => {
                    setSelectedJob(null);
                    setShowApplyModal(false);
                  }}
                  className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {!showApplyModal ? (
                <>
                  {/* Job Header */}
                  <div>
                    <h3 className="text-sm font-black text-neutral-800 font-display leading-snug">{selectedJob.title}</h3>
                    <p className="text-[10px] text-[#0F5D46] font-bold mt-0.5 uppercase tracking-wide">{selectedJob.company}</p>
                  </div>

                  {/* Logistics metrics */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-[#FAF9F6] border border-neutral-100 rounded-2xl flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#C8A23A]" />
                      <div>
                        <p className="text-[8px] text-neutral-400 font-bold uppercase">Location</p>
                        <p className="text-[10px] font-black text-neutral-700 mt-0.5">{selectedJob.location}</p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF9F6] border border-neutral-100 rounded-2xl flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="text-[8px] text-neutral-400 font-bold uppercase">{t('jobs.salary', 'Salary')}</p>
                        <p className="text-[10px] font-black text-neutral-700 mt-0.5">{selectedJob.salary}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-wider font-display">Job Description</h4>
                    <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
                      {selectedJob.description}
                    </p>
                  </div>

                  {/* Requirements */}
                  {selectedJob.requirements && selectedJob.requirements.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[10px] font-black text-neutral-400 uppercase tracking-wider font-display">Requirements</h4>
                      <div className="flex flex-col gap-1.5">
                        {selectedJob.requirements.map((req, index) => (
                          <div key={index} className="flex items-start gap-2 text-[10px] text-neutral-600 font-medium">
                            <ListChecks className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Apply trigger button */}
                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowApplyModal(true)}
                    className="w-full py-3 bg-[#0F5D46] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b] shadow-sm border border-[#C8A23A]/10 font-display mt-2"
                  >
                    {t('btn.apply', 'Apply Now')}
                  </motion.button>
                </>
              ) : (
                <>
                  {applySuccess ? (
                    <div className="py-8 flex flex-col items-center text-center gap-3">
                      <CheckCircle className="w-12 h-12 text-emerald-600" />
                      <h4 className="text-xs font-black text-neutral-800">{t('jobs.applied_success', 'Your job application has been successfully submitted!')}</h4>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyJobSubmit} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-xs font-black text-neutral-800 uppercase font-display">{t('jobs.apply_title', 'Apply for Job Role')}</h4>
                        <p className="text-[9px] text-neutral-400 font-bold">{selectedJob.title} • {selectedJob.company}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('login.name_label', 'Your Full Name')}</label>
                          <input
                            type="text"
                            required
                            placeholder="Your full name"
                            value={applicantName}
                            onChange={(e) => setApplicantName(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                          />
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('login.phone_label', 'Mobile Number')}</label>
                          <input
                            type="tel"
                            required
                            placeholder="+91..."
                            value={applicantPhone}
                            onChange={(e) => setApplicantPhone(e.target.value)}
                            className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('jobs.resume_label', 'Your Bio / Qualifications Resume')}</label>
                        <textarea
                          rows={3}
                          required
                          placeholder={t('jobs.resume_placeholder', 'Briefly describe your schooling, skill sets, and job experience...')}
                          value={applicantResume}
                          onChange={(e) => setApplicantResume(e.target.value)}
                          className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46] resize-none"
                        />
                      </div>

                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b] shadow-sm border border-[#C8A23A]/10 font-display flex items-center justify-center gap-2"
                      >
                        <Briefcase className="w-4 h-4 text-[#C8A23A]" />
                        {t('jobs.btn_apply', 'Submit Job Application')}
                      </motion.button>
                    </form>
                  )}
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
