import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Send, ShieldAlert, CheckCircle, Clock, ChevronRight, FileText, Upload, Plus, AlertCircle, X } from 'lucide-react';
import { HelpRequest } from '../../../types';
import { useLanguage } from '../../../LanguageContext';

interface HelpProps {
  requests: HelpRequest[];
  onSubmitRequest: (req: HelpRequest) => void;
  onBack: () => void;
}

export default function HelpSupportScreen({ requests, onSubmitRequest, onBack }: HelpProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'apply' | 'history'>('apply');
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [helpType, setHelpType] = useState('Medical Help');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [fileName, setFileName] = useState('');

  const handleApplyHelp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !mobile || !description) return;

    const newRequest: HelpRequest = {
      id: `req-${Date.now()}`,
      type: helpType,
      applicantName: name,
      mobile,
      description,
      amountRequested: amount ? `₹${Number(amount).toLocaleString('en-IN')}` : 'Direct Service Support',
      documents: fileName ? [fileName] : [],
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };

    onSubmitRequest(newRequest);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setActiveTab('history');
      // Reset
      setName('');
      setMobile('');
      setDescription('');
      setAmount('');
      setFileName('');
    }, 1500);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const helpCategories = [
    'Medical Help',
    'Educational Grant',
    'Monthly Food Ration Support',
    'Financial Assistance',
    'Widow & Orphan Support'
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
        <h3 className="text-xs font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('help.title', 'Apply for Welfare Support')}</h3>
        <div className="w-8" />
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center bg-white p-1 rounded-xl border border-neutral-100 shadow-sm shrink-0">
        <button
          onClick={() => setActiveTab('apply')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'apply'
              ? 'bg-[#0F5D46] text-white shadow'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {t('help.apply_tab', 'Request Aid')}
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'history'
              ? 'bg-[#0F5D46] text-white shadow'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {t('help.history_tab', 'Appeal Status')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'apply' ? (
          <motion.div
            key="apply"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-4"
          >
            {/* Warning Advice */}
            <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex flex-col gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#0F5D46]" />
                <h4 className="text-[10px] font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('help.banner_title', 'Ahmed Welfare Fund')}</h4>
              </div>
              <p className="text-[10px] text-emerald-800 leading-relaxed font-medium">
                {t('help.banner_desc', "Ahmed coordinates direct distribution of educational, medical, and nutritional aid. Fill out this secure appeal for consideration.")}
              </p>
            </div>

            {/* Application Form */}
            {success ? (
              <div className="bg-white rounded-2xl p-8 border border-neutral-100 shadow-sm flex flex-col items-center text-center gap-3">
                <CheckCircle className="w-12 h-12 text-emerald-600" />
                <h4 className="text-xs font-black text-neutral-800">{t('help.success', 'Welfare aid appeal ticket submitted!')}</h4>
                <p className="text-[10px] text-neutral-400 font-bold">Your ticket reference has been added to your Appeal History.</p>
              </div>
            ) : (
              <form onSubmit={handleApplyHelp} className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('help.cat_label', 'Support Category Needed')}</label>
                  <select
                    value={helpType}
                    onChange={(e) => setHelpType(e.target.value)}
                    className="w-full px-2.5 py-2.5 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                  >
                    {helpCategories.map((cat) => (
                      <option key={cat}>{t(`services.${cat.toLowerCase().replace(/\s/g, '_')}`, cat)}</option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('help.name_label', 'Applicant Full Name')}</label>
                    <input
                      type="text"
                      required
                      placeholder="Full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('help.phone_label', 'Mobile Contact Number')}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91..."
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('help.amount_label', 'Estimated Financial Aid Needed (₹)')}</label>
                  <input
                    type="number"
                    placeholder="e.g. 15000"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('help.desc_label', 'Explain your situation & welfare need')}</label>
                  <textarea
                    required
                    rows={3}
                    placeholder={t('help.desc_placeholder', 'Please provide background details to expedite approval...')}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-xl text-xs outline-none focus:ring-1 focus:ring-[#0F5D46] resize-none"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-extrabold text-neutral-600 uppercase tracking-wider">{t('help.docs_label', 'Upload Supporting Documents (Optional)')}</label>
                  <div className="border border-dashed border-neutral-200 rounded-xl p-4 flex flex-col items-center gap-2 text-center bg-[#FAF9F6] relative">
                    <input
                      type="file"
                      id="doc-upload"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-[#0F5D46]" />
                    <div>
                      <p className="text-[10px] font-black text-neutral-800">
                        {fileName ? fileName : t('help.docs_btn', 'Attach Files / Photos')}
                      </p>
                      <p className="text-[8px] text-neutral-400 font-bold mt-0.5">{t('help.docs_desc', 'Upload prescriptions, fee structures, or ration card copies')}</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 bg-[#0F5D46] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b] shadow-sm mt-1 border border-[#C8A23A]/10 font-display flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5 text-[#C8A23A]" />
                  {t('help.submit_btn', 'Submit Secure Aid Appeal')}
                </motion.button>
              </form>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="history"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-2.5"
          >
            <div className="flex justify-between items-center px-1 text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-display">
              <span>{t('help.history_title', 'Your Support Requests')}</span>
              <span>{requests.length} cases</span>
            </div>

            {requests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-white rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-3"
              >
                <div className="flex justify-between items-center">
                  <span className="px-2 py-0.5 bg-[#0F5D46]/5 border border-[#0F5D46]/10 text-[#0F5D46] text-[8px] font-black uppercase tracking-wider rounded-md">
                    {req.type}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {req.status === 'Pending' && <Clock className="w-3.5 h-3.5 text-neutral-400" />}
                    {req.status === 'In Progress' && <Clock className="w-3.5 h-3.5 text-amber-500" />}
                    {req.status === 'Approved' && <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />}
                    {req.status === 'Completed' && <CheckCircle className="w-3.5 h-3.5 text-[#0F5D46]" />}
                    <span className={`text-[8px] font-black uppercase tracking-wider ${
                      req.status === 'Pending' ? 'text-neutral-500' :
                      req.status === 'In Progress' ? 'text-amber-700' :
                      req.status === 'Approved' ? 'text-emerald-700' : 'text-[#0F5D46]'
                    }`}>
                      {req.status === 'Pending' ? t('status.pending', 'Pending') :
                       req.status === 'In Progress' ? t('status.inprogress', 'In Progress') :
                       req.status === 'Approved' ? t('status.approved', 'Approved') : t('status.completed', 'Completed')}
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-black text-neutral-800">{req.applicantName}</h4>
                  <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mt-1">{req.description}</p>
                </div>

                {req.documents && req.documents.length > 0 && (
                  <div className="flex items-center gap-1 text-[8px] text-[#0F5D46] font-bold uppercase bg-[#0F5D46]/5 border border-[#0F5D46]/10 py-1 px-2.5 rounded-lg w-max">
                    <FileText className="w-3 h-3 text-[#C8A23A]" />
                    <span>Attached: {req.documents[0]}</span>
                  </div>
                )}

                <div className="flex justify-between items-center border-t border-neutral-200/60 pt-2.5 text-[9px] font-bold text-neutral-400 uppercase tracking-wider">
                  <span>Requested: {req.amountRequested}</span>
                  <span>Date: {req.date}</span>
                </div>
              </div>
            ))}

            {requests.length === 0 && (
              <p className="text-[10px] text-neutral-400 font-bold text-center py-6">{t('help.empty_requests', 'You have not submitted any help appeals.')}</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
