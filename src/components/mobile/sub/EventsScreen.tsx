import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Search, Calendar, MapPin, Users, HeartHandshake, CheckCircle2, ChevronRight, X } from 'lucide-react';
import { Event } from '../../../types';
import { useLanguage } from '../../../LanguageContext';

interface EventsProps {
  events: Event[];
  onRegisterEvent: (eventId: string) => void;
  registeredEvents: string[];
  onBack: () => void;
}

export default function EventsScreen({ events, onRegisterEvent, registeredEvents, onBack }: EventsProps) {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const categories = ['All', 'Medical', 'Blood', 'Relief'];

  const filteredEvents = events.filter((evt) => {
    const matchesCategory = selectedCategory === 'All' || evt.type.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          evt.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <h3 className="text-xs font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('events.title', 'Ahmed Community Events')}</h3>
        <div className="w-8" />
      </div>

      {/* Intro Panel */}
      <div className="bg-[#0F5D46]/5 rounded-2xl p-4 border border-[#0F5D46]/10 flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[#0F5D46]">
          <HeartHandshake className="w-4 h-4 text-[#C8A23A]" />
          <h4 className="text-[10px] font-black uppercase tracking-wider font-display">{t('events.empowering', 'Empowering Communities')}</h4>
        </div>
        <p className="text-[10px] text-neutral-500 font-medium leading-relaxed">
          {t('events.desc', 'Ahmed Community Connect organises weekly medical wellness setups, food kit distribution camps, and emergency blood drives. Participate to make a difference.')}
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2.5 bg-white p-3.5 rounded-2xl border border-neutral-100 shadow-sm shrink-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            type="text"
            placeholder={t('events.search_placeholder', 'Search campaigns or venues...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 bg-[#FAF9F6] border border-neutral-200/80 rounded-xl text-[11px] font-medium text-neutral-800 outline-none"
          />
        </div>

        {/* Categories slider */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 mt-1 -mx-2 px-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
                selectedCategory === cat
                  ? 'bg-[#0F5D46] text-white shadow'
                  : 'bg-[#FAF9F6] text-neutral-600 border border-neutral-100'
              }`}
            >
              {cat === 'All' ? t('btn.filter', 'All') : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns list */}
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center px-1 text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-display">
          <span>Active Programs</span>
          <span>{filteredEvents.length} found</span>
        </div>

        {filteredEvents.map((evt) => {
          const isRegistered = registeredEvents.includes(evt.id);

          return (
            <div
              key={evt.id}
              onClick={() => setSelectedEvent(evt)}
              className="bg-white rounded-2xl border border-neutral-100 shadow-sm overflow-hidden hover:border-[#0F5D46]/20 transition-all cursor-pointer group flex flex-col"
            >
              <div className="h-28 w-full bg-neutral-100 relative">
                <img
                  src={evt.image}
                  alt={evt.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
                <span className="absolute left-3 top-3 px-2 py-0.5 bg-[#0F5D46] text-white text-[8px] font-black uppercase tracking-wider rounded-md border border-[#C8A23A]/20">
                  {evt.type}
                </span>
              </div>

              <div className="p-3.5 flex flex-col gap-2">
                <h4 className="text-xs font-black text-neutral-800 font-display leading-snug">{evt.title}</h4>

                <div className="flex flex-col gap-1 text-[9px] text-neutral-500 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span>{evt.date} • {evt.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                    <span className="truncate">{evt.location}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-neutral-100 pt-2.5 mt-1 shrink-0">
                  <div className="flex items-center gap-1 text-[9px] text-neutral-400 font-bold uppercase">
                    <Users className="w-3.5 h-3.5 text-neutral-400" />
                    <span>{evt.registeredCount + (isRegistered ? 1 : 0)} Attending</span>
                  </div>

                  <span className={`text-[9px] font-black uppercase tracking-wider flex items-center gap-1 ${
                    isRegistered ? 'text-emerald-700 font-bold' : 'text-[#0F5D46]'
                  }`}>
                    {isRegistered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        {t('events.registered', 'Registered!')}
                      </>
                    ) : (
                      <>
                        View Detail
                        <ChevronRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filteredEvents.length === 0 && (
          <p className="text-[10px] text-neutral-400 font-bold text-center py-6">No campaigns found.</p>
        )}
      </div>

      {/* Bottom Campaign detail drawer / overlay */}
      <AnimatePresence>
        {selectedEvent && (
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
                  {selectedEvent.type} Detail
                </span>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="w-7 h-7 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Cover Image */}
              <div className="h-36 w-full rounded-2xl overflow-hidden bg-neutral-100">
                <img
                  src={selectedEvent.image}
                  alt={selectedEvent.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Description */}
              <div className="flex flex-col gap-1">
                <h3 className="text-sm font-black text-neutral-800 font-display leading-snug">{selectedEvent.title}</h3>
                <p className="text-[10px] text-neutral-500 font-medium leading-relaxed mt-1">
                  {selectedEvent.description}
                </p>
              </div>

              {/* Logistics */}
              <div className="bg-[#FAF9F6] p-3 rounded-2xl border border-neutral-100 flex flex-col gap-2.5">
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-[#0F5D46]" />
                  <div>
                    <p className="text-[8px] text-neutral-400 font-bold uppercase">{t('events.time', 'Time')}</p>
                    <p className="text-[10px] font-black text-neutral-700 mt-0.5">{selectedEvent.date} • {selectedEvent.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 border-t border-neutral-200/60 pt-2.5">
                  <MapPin className="w-4 h-4 text-[#0F5D46]" />
                  <div>
                    <p className="text-[8px] text-neutral-400 font-bold uppercase">{t('events.venue', 'Venue')}</p>
                    <p className="text-[10px] font-black text-neutral-700 mt-0.5 leading-relaxed">{selectedEvent.location}</p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              {registeredEvents.includes(selectedEvent.id) ? (
                <div className="py-2.5 px-4 bg-emerald-50 border border-emerald-100 rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase text-emerald-800 tracking-wider">{t('events.registered', 'Registered!')}</span>
                </div>
              ) : (
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    onRegisterEvent(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                  className="w-full py-3 bg-[#0F5D46] text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-[#0c4e3b] shadow-sm border border-[#C8A23A]/10 font-display"
                >
                  {t('events.btn_register', 'Register for Campaign')}
                </motion.button>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
