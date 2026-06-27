import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, BookOpen, Compass, Plus, RotateCcw, Heart, Calendar, Eye, Moon } from 'lucide-react';
import { prayerTimes, dailyVerse, dailyHadith } from '../../../data';
import { useLanguage } from '../../../LanguageContext';

interface IslamicProps {
  onBack: () => void;
}

export default function IslamicCorner({ onBack }: IslamicProps) {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'spiritual' | 'tasbeeh'>('spiritual');
  const [zikrCount, setZikrCount] = useState(0);
  const [selectedZikr, setSelectedZikr] = useState('SubhanAllah');

  const zikrs = [
    { phrase: 'SubhanAllah', translation_en: 'Glory be to Allah', translation_ta: 'அல்லாஹ்வுக்கே அனைத்துப் புகழும்' },
    { phrase: 'Alhamdulillah', translation_en: 'Praise be to Allah', translation_ta: 'அல்லாஹ்வுக்கே புகழ் அனைத்தும்' },
    { phrase: 'Allahu Akbar', translation_en: 'Allah is the Greatest', translation_ta: 'அல்லாஹ் மிகப் பெரியவன்' },
    { phrase: 'Astaghfirullah', translation_en: 'I seek forgiveness from Allah', translation_ta: 'அல்லாஹ்விடம் பாவமன்னிப்பு கோருகிறேன்' }
  ];

  const getZikrTranslation = (phrase: string) => {
    const item = zikrs.find((z) => z.phrase === phrase);
    if (!item) return '';
    return language === 'ta' ? item.translation_ta : item.translation_en;
  };

  const getPrayerName = (name: string) => {
    const map: Record<string, Record<string, string>> = {
      Fajr: { en: 'Fajr', ta: 'ஃபஜ்ர்' },
      Dhuhr: { en: 'Dhuhr', ta: 'ளுஹர்' },
      Asr: { en: 'Asr', ta: 'அஸர்' },
      Maghrib: { en: 'Maghrib', ta: 'மக்ரிப்' },
      Isha: { en: 'Isha', ta: 'இஷா' }
    };
    return map[name] ? map[name][language] : name;
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
        <h3 className="text-xs font-black uppercase text-[#0F5D46] tracking-wider font-display">{t('islamic.title', 'Spiritual Corner')}</h3>
        <div className="w-8" />
      </div>

      {/* Tabs */}
      <div className="flex justify-between items-center bg-white p-1 rounded-xl border border-neutral-100 shadow-sm shrink-0">
        <button
          onClick={() => setActiveTab('spiritual')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'spiritual'
              ? 'bg-[#0F5D46] text-white shadow'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {t('islamic.insights', 'Insights')}
        </button>
        <button
          onClick={() => setActiveTab('tasbeeh')}
          className={`flex-1 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all ${
            activeTab === 'tasbeeh'
              ? 'bg-[#0F5D46] text-white shadow'
              : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          {t('islamic.tasbeeh', 'Tasbeeh Counter')}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'spiritual' ? (
          <motion.div
            key="spiritual"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-4"
          >
            {/* Prayer Times card */}
            <div className="bg-white rounded-2xl p-4 border border-neutral-100 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                <div className="flex items-center gap-1.5 text-[#0F5D46]">
                  <Moon className="w-4 h-4 text-[#C8A23A]" />
                  <h4 className="text-[10px] font-black uppercase tracking-wider font-display">{t('islamic.prayer_title', 'Bengaluru Prayer Times')}</h4>
                </div>
                <span className="text-[8px] text-neutral-400 font-bold uppercase">Hanafi</span>
              </div>

              <div className="grid grid-cols-5 gap-1">
                {prayerTimes.map((pt) => (
                  <div
                    key={pt.name}
                    className={`p-2 rounded-xl flex flex-col items-center gap-1 text-center border transition-all ${
                      pt.isNext
                        ? 'bg-[#0F5D46]/5 border-[#0F5D46]/20 ring-1 ring-[#0F5D46]/20'
                        : 'bg-[#FAF9F6] border-neutral-100'
                    }`}
                  >
                    <span className={`text-[8px] font-bold uppercase ${pt.isNext ? 'text-[#0F5D46]' : 'text-neutral-400'}`}>
                      {getPrayerName(pt.name)}
                    </span>
                    <span className={`text-[9px] font-black tracking-tight ${pt.isNext ? 'text-neutral-900' : 'text-neutral-700'}`}>
                      {pt.time.replace(' AM', '').replace(' PM', '')}
                    </span>
                    {pt.isNext && (
                      <span className="text-[7px] font-black text-amber-700 uppercase bg-amber-50 px-1 py-0.5 rounded scale-90">Next</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Daily spiritual card */}
            <div className="bg-gradient-to-br from-white to-[#FAF9F6] p-4.5 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-4">
              <div>
                <span className="text-[8px] font-black uppercase text-[#0F5D46] bg-[#0F5D46]/5 px-2.5 py-0.5 rounded-md border border-[#0F5D46]/10">{t('islamic.verse_title', "Daily Qur'an Verse")}</span>
                <p className="text-xs text-neutral-700 italic leading-relaxed mt-2.5 font-sans">
                  "{dailyVerse.text}"
                </p>
                <p className="text-[9px] text-[#C8A23A] font-extrabold mt-1.5 font-display uppercase tracking-wider">{dailyVerse.reference}</p>
              </div>

              <div className="border-t border-neutral-200/60 pt-4">
                <span className="text-[8px] font-black uppercase text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-100">{t('islamic.hadith_title', 'Prophetic Hadith')}</span>
                <p className="text-xs text-neutral-700 italic leading-relaxed mt-2.5 font-sans">
                  "{dailyHadith.text}"
                </p>
                <p className="text-[9px] text-[#0F5D46] font-extrabold mt-1.5 font-display uppercase tracking-wider">{dailyHadith.reference}</p>
              </div>
            </div>

            {/* Qibla finder compass mockup */}
            <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm flex items-center justify-between gap-4">
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 bg-neutral-50 rounded-xl flex items-center justify-center text-neutral-600 border border-neutral-100">
                  <Compass className="w-5 h-5 text-[#C8A23A]" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-neutral-800">{t('islamic.qibla_title', 'Qibla Direction')}</h4>
                  <p className="text-[9px] text-neutral-400 font-bold mt-0.5">{language === 'ta' ? 'பெங்களூரு: 292° வடமேற்கு' : 'Bengaluru: 292° Northwest'}</p>
                </div>
              </div>

              <button
                onClick={() => alert('Simulating precise compass sensor alignment... Qibla aligned successfully.')}
                className="py-1.5 px-3 bg-[#0F5D46]/5 border border-[#0F5D46]/10 text-[#0F5D46] text-[9px] font-black rounded-lg hover:bg-[#0F5D46]/10"
              >
                {t('islamic.launch_finder', 'Launch Finder')}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tasbeeh"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="flex flex-col gap-4 items-center"
          >
            {/* Zikr Phrase Select */}
            <div className="w-full bg-white p-3 rounded-2xl border border-neutral-100 shadow-sm flex flex-col gap-2">
              <span className="text-[8px] text-neutral-400 font-bold uppercase px-1">{t('islamic.tasbeeh_phrase', 'Zikr Phrase')}</span>

              <div className="grid grid-cols-2 gap-2">
                {zikrs.map((z) => (
                  <button
                    key={z.phrase}
                    onClick={() => {
                      setSelectedZikr(z.phrase);
                      setZikrCount(0);
                    }}
                    className={`p-2.5 rounded-xl border text-left flex flex-col gap-0.5 transition-all ${
                      selectedZikr === z.phrase
                        ? 'bg-[#0F5D46]/5 border-[#0F5D46]/30 shadow-sm'
                        : 'bg-[#FAF9F6] border-neutral-100 hover:border-neutral-200'
                    }`}
                  >
                    <span className="text-[11px] font-black text-neutral-800">{z.phrase}</span>
                    <span className="text-[8px] text-neutral-400 font-bold truncate">
                      {language === 'ta' ? z.translation_ta : z.translation_en}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Big Interactive Counter */}
            <div className="w-full bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm flex flex-col items-center gap-6 relative overflow-hidden">
              {/* Reset button absolute top-right */}
              <button
                onClick={() => setZikrCount(0)}
                className="absolute right-4 top-4 w-7 h-7 bg-[#FAF9F6] border border-neutral-100 text-neutral-500 rounded-full flex items-center justify-center hover:bg-neutral-100 shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <div className="text-center">
                <p className="text-[10px] font-black text-[#0F5D46] uppercase tracking-widest font-display">{selectedZikr}</p>
                <p className="text-[8px] text-neutral-400 font-bold mt-0.5 uppercase">
                  {getZikrTranslation(selectedZikr)}
                </p>
              </div>

              {/* Counter Display */}
              <div className="w-32 h-32 rounded-full border-4 border-[#0F5D46]/10 flex flex-col items-center justify-center relative shadow-inner bg-[#FAF9F6]">
                <span className="text-3xl font-black text-neutral-800 font-mono tracking-tight">{zikrCount}</span>
                <span className="text-[8px] text-neutral-400 font-black uppercase mt-1">{t('islamic.tasbeeh_count', 'Zikr Count')}</span>
              </div>

              {/* Huge Tap Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setZikrCount((prev) => prev + 1)}
                className="w-20 h-20 bg-[#0F5D46] rounded-full flex items-center justify-center shadow-lg border border-[#C8A23A]/20 text-white hover:bg-[#0c4e3b] active:shadow-md cursor-pointer"
              >
                <Plus className="w-8 h-8 text-[#C8A23A]" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
