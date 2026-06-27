import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';
import IslamicGeometricBg from '../IslamicGeometricBg';
import { LOGO_IMAGE, FOUNDER_IMAGE, FOUNDER_NAME } from '../../data';

interface SplashProps {
  onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 600); // give user a moment to see 100%
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [onFinish]);

  return (
    <div id="splash-screen" className="relative w-full h-full bg-[#FAF9F6] flex flex-col justify-between p-8 overflow-hidden">
      {/* Decorative BG pattern */}
      <IslamicGeometricBg opacity={0.08} />

      {/* Top Section: Gold & Green Accents */}
      <div className="flex justify-center pt-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#0F5D46]/10 border border-[#0F5D46]/20 text-[#0F5D46] text-xs font-semibold uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C8A23A]" />
          Welfare & Leadership Portal
        </motion.div>
      </div>

      {/* Middle Section: Logo & Founder Portrait */}
      <div className="flex flex-col items-center justify-center gap-8 my-auto">
        {/* Floating Logo Stack */}
        <div className="relative">
          {/* Logo Orbiting Halo */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            className="absolute -inset-4 rounded-full border border-dashed border-[#C8A23A]/30"
          />

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100, delay: 0.2 }}
            className="w-24 h-24 rounded-full bg-[#0F5D46] p-1 shadow-xl flex items-center justify-center relative z-10 border border-[#C8A23A]"
          >
            <img
              src={LOGO_IMAGE}
              alt="Organization Logo"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </motion.div>
        </div>

        {/* Founder Portrait Circle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="flex flex-col items-center text-center"
        >
          <div className="w-20 h-20 rounded-full p-1 bg-white shadow-lg border border-[#C8A23A] mb-3 overflow-hidden">
            <img
              src={FOUNDER_IMAGE}
              alt="Founder Portrait"
              referrerPolicy="no-referrer"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-[11px] text-[#C8A23A] font-semibold tracking-wide uppercase">Initiative By</span>
          <h2 className="text-sm font-bold text-neutral-800 tracking-wide">{FOUNDER_NAME}</h2>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-2xl font-extrabold text-[#0F5D46] tracking-tight">
            Community Connect
          </h1>
          <p className="text-xs text-neutral-500 font-medium mt-1">
            Serving Humanity • Inspiring Change
          </p>
        </motion.div>
      </div>

      {/* Bottom Section: Progress and Manual Skip */}
      <div className="flex flex-col gap-5 pt-4 pb-8 relative z-10">
        {/* Loading progress bar */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between items-center text-[10px] font-bold text-neutral-600 tracking-wide uppercase">
            <span>Loading Modules</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 bg-[#0F5D46]/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#0F5D46] to-[#C8A23A]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Quick Skip Button */}
        <motion.button
          onClick={onFinish}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#0F5D46] hover:text-[#C8A23A] transition-all self-center py-1.5 px-4 rounded-full bg-white/60 shadow-sm border border-neutral-200/50"
        >
          Skip Introduction
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>
    </div>
  );
}
