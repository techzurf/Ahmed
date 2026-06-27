import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Droplet, UserPlus, Phone, ShieldAlert, Plus, X, CheckCircle } from 'lucide-react';
import { BloodDonor } from '../../../types';
import { useLanguage } from '../../../LanguageContext';

interface DonorProps {
  donors: BloodDonor[];
  onAddDonor: (donor: BloodDonor) => void;
  onBack: () => void;
}

export default function BloodDonorNetwork({ donors, onAddDonor, onBack }: DonorProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('All');
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showEmergencyForm, setShowEmergencyForm] = useState(false);

  // Forms
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regGroup, setRegGroup] = useState('O+');
  const [regCity, setRegCity] = useState('Bengaluru');
  const [successMsg, setSuccessMsg] = useState('');

  const [emerGroup, setEmerGroup] = useState('O+');
  const [emerContact, setEmerContact] = useState('');
  const [emerLocation, setEmerLocation] = useState('');
  const [emerUnits, setEmerUnits] = useState('2');

  const bloodGroups = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleRegisterDonor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regPhone) return;

    const newDonor: BloodDonor = {
      id: `bd-${Date.now()}`,
      fullName: regName,
      bloodGroup: regGroup,
      mobile: regPhone,
      city: regCity,
      district: `${regCity} Urban`,
      lastDonated: 'Never',
      isAvailable: true
    };

    onAddDonor(newDonor);
    setSuccessMsg(t('blood.registered_success', 'Registered successfully as an active donor!'));
    setTimeout(() => {
      setSuccessMsg('');
      setShowRegisterForm(false);
      setRegName('');
      setRegPhone('');
    }, 1500);
  };

  const handleEmergencyRequest = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Emergency alert broadcasted to all local ${emerGroup} blood donors. An organizer will contact you shortly.`);
    setShowEmergencyForm(false);
    setEmerContact('');
    setEmerLocation('');
  };

  const filteredDonors = donors.filter((donor) => {
    const matchesGroup = selectedGroup === 'All' || donor.bloodGroup === selectedGroup;
    const matchesSearch = donor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          donor.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesGroup && matchesSearch;
  });

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
        <h3 className="text-xs font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('blood.network', 'Blood Donor Network')}</h3>
        <div className="w-8" />
      </div>

      {/* Emergency Request Panel */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-600" />
          <h4 className="text-xs font-extrabold text-red-800 uppercase tracking-wider font-display">{t('blood.require_urgent', 'Require Urgent Blood?')}</h4>
        </div>
        <p className="text-[10px] text-red-600 font-medium leading-relaxed">
          {t('blood.urgent_desc', 'Broadcast an instant emergency request to nearby matching donors or call coordinators immediately.')}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setShowEmergencyForm(true)}
            className="flex-1 py-1.5 px-3 bg-red-600 text-white text-[10px] font-black rounded-lg hover:bg-red-700 shadow"
          >
            {t('blood.btn_emer', 'Submit Emergency Call')}
          </button>
          <a
            href="tel:+919999988888"
            className="py-1.5 px-3 bg-white border border-red-200 text-red-600 text-[10px] font-black rounded-lg hover:bg-red-50 flex items-center justify-center gap-1"
          >
            <Phone className="w-3.5 h-3.5" />
            Call Admin
          </a>
        </div>
      </div>

      {/* Primary Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowRegisterForm(true)}
          className="flex-1 py-2.5 px-3 bg-[#0F5D46] text-white text-xs font-black rounded-xl hover:bg-[#0c4e3b] shadow-sm flex items-center justify-center gap-1.5 border border-[#C8A23A]/10"
        >
          <UserPlus className="w-4 h-4 text-[#C8A23A]" />
          {t('blood.btn_reg', 'Register as Active Donor')}
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-2 bg-white p-3.5 rounded-2xl border border-neutral-100 shadow-sm">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={t('blood.search_placeholder', 'Search donors by city/name...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FAF9F6] border border-neutral-200/80 rounded-xl text-[11px] font-medium text-neutral-800 outline-none"
          />
        </div>

        {/* Blood Groups filters list */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mt-1 -mx-2 px-2 scrollbar-none">
          {bloodGroups.map((group) => (
            <button
              key={group}
              onClick={() => setSelectedGroup(group)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                selectedGroup === group
                  ? 'bg-red-600 text-white shadow'
                  : 'bg-[#FAF9F6] text-neutral-600 border border-neutral-100'
              }`}
            >
              {group}
            </button>
          ))}
        </div>
      </div>

      {/* Donors list */}
      <div className="flex flex-col gap-2.5">
        <div className="flex justify-between items-center px-1 text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-display">
          <span>Active Volunteers</span>
          <span>{filteredDonors.length} found</span>
        </div>

        {filteredDonors.map((donor) => (
          <div
            key={donor.id}
            className="p-3.5 bg-white rounded-xl border border-neutral-100 shadow-sm flex justify-between items-center gap-4"
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-black text-xs shrink-0 border border-red-100">
                {donor.bloodGroup}
              </div>
              <div>
                <h4 className="text-xs font-black text-neutral-800">{donor.fullName}</h4>
                <div className="flex items-center gap-1.5 text-[9px] text-neutral-400 font-bold mt-0.5">
                  <span>{donor.city}</span>
                  <span>•</span>
                  <span>{t('blood.last_donated', 'Last Donated')}: {donor.lastDonated === 'Never' ? t('blood.never', 'Never') : donor.lastDonated}</span>
                </div>
              </div>
            </div>

            {/* Direct Dial Action */}
            <a
              href={`tel:${donor.mobile}`}
              className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-800 flex items-center justify-center hover:bg-emerald-100 shrink-0 border border-emerald-100 shadow-sm"
              onClick={(e) => {
                e.preventDefault();
                alert(`Simulating dialing donor: ${donor.fullName} (${donor.mobile})`);
              }}
            >
              <Phone className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}

        {filteredDonors.length === 0 && (
          <p className="text-[10px] text-neutral-400 font-bold text-center py-6">{t('blood.no_donors_found', 'No matching available donors found.')}</p>
        )}
      </div>

      {/* Dialog for Register Donor */}
      <AnimatePresence>
        {showRegisterForm && (
          <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3 border border-[#C8A23A]"
            >
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <h3 className="text-xs font-black text-[#0F5D46] uppercase font-display">{t('blood.register_title', 'Register as Blood Donor')}</h3>
                <button onClick={() => setShowRegisterForm(false)} className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>

              {successMsg ? (
                <div className="flex flex-col items-center justify-center text-center py-6 gap-2">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                  <p className="text-xs font-bold text-neutral-800">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleRegisterDonor} className="flex flex-col gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('login.name_label', 'Your Full Name')}</label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('login.phone_label', 'Mobile Number')}</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91..."
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('login.blood_label', 'Blood Group')}</label>
                      <select
                        value={regGroup}
                        onChange={(e) => setRegGroup(e.target.value)}
                        className="w-full px-2 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                      >
                        {bloodGroups.filter(g => g !== 'All').map(g => (
                          <option key={g}>{g}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('blood.form_city', 'Your City')}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-[#0F5D46]"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-2 bg-[#0F5D46] text-white text-xs font-black rounded-lg mt-1 border border-[#C8A23A]/10"
                  >
                    {t('blood.btn_reg', 'Register in Network')}
                  </motion.button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dialog for Emergency Request */}
      <AnimatePresence>
        {showEmergencyForm && (
          <div className="absolute inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full bg-white rounded-2xl p-4 shadow-xl flex flex-col gap-3 border border-red-200"
            >
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <h3 className="text-xs font-black text-red-700 uppercase font-display">{t('blood.emer_title', 'Emergency Blood Request')}</h3>
                <button onClick={() => setShowEmergencyForm(false)} className="w-6 h-6 bg-neutral-100 rounded-full flex items-center justify-center">
                  <X className="w-3.5 h-3.5 text-neutral-500" />
                </button>
              </div>

              <form onSubmit={handleEmergencyRequest} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('login.blood_label', 'Blood Group')}</label>
                    <select
                      value={emerGroup}
                      onChange={(e) => setEmerGroup(e.target.value)}
                      className="w-full px-2 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-red-500"
                    >
                      {bloodGroups.filter(g => g !== 'All').map(g => (
                        <option key={g}>{g}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('blood.emer_units', 'Units Required')}</label>
                    <input
                      type="number"
                      required
                      value={emerUnits}
                      onChange={(e) => setEmerUnits(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-red-500"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('blood.emer_phone', 'Emergency Contact Number')}</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91..."
                    value={emerContact}
                    onChange={(e) => setEmerContact(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold text-neutral-600 uppercase">{t('blood.emer_location', 'Hospital Name & Location')}</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. City General Hospital, Ward 4"
                    value={emerLocation}
                    onChange={(e) => setEmerLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FAF9F6] border border-neutral-200 rounded-lg text-xs outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2 bg-red-600 text-white text-xs font-black rounded-lg mt-1"
                >
                  {t('blood.emer_btn_send', 'Broadcast SOS Alert')}
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
