import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

interface MobileFrameProps {
  children: React.ReactNode;
}

export default function MobileFrame({ children }: MobileFrameProps) {
  const [time, setTime] = useState("09:41");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      setTime(`${hours}:${minutes} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 30000); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-[410px] h-[860px] bg-neutral-950 rounded-[55px] p-4 shadow-[0_25px_60px_-15px_rgba(15,93,70,0.3)] border-4 border-neutral-800 ring-12 ring-neutral-900 ring-offset-4 ring-offset-neutral-100 flex flex-col overflow-hidden select-none">
      {/* Speaker and Camera pill (Dynamic Island style) */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-full z-50 flex items-center justify-between px-4">
        {/* Lens */}
        <div className="w-3.5 h-3.5 bg-neutral-900 rounded-full border border-neutral-800 flex items-center justify-center">
          <div className="w-1 h-1 bg-indigo-950 rounded-full" />
        </div>
        {/* Speaker slit */}
        <div className="w-12 h-1 bg-neutral-800 rounded-full" />
        {/* Sensor light */}
        <div className="w-1 h-1 bg-green-500/20 rounded-full" />
      </div>

      {/* Screen Container */}
      <div className="relative w-full h-full bg-[#FAF9F6] rounded-[42px] overflow-hidden flex flex-col shadow-inner">
        {/* Status Bar */}
        <div className="h-12 w-full px-7 pt-3 flex items-center justify-between text-[13px] font-semibold text-neutral-800 z-40 bg-transparent shrink-0">
          <div>{time}</div>
          <div className="flex items-center gap-1.5">
            <Signal className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="text-[10px] font-bold">5G</span>
            <Wifi className="w-3.5 h-3.5" strokeWidth={2.5} />
            <Battery className="w-4 h-4 text-emerald-800" strokeWidth={2.5} />
          </div>
        </div>

        {/* Device Content Viewport */}
        <div className="w-full h-full overflow-hidden flex flex-col relative">
          {children}
        </div>

        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-neutral-800/60 rounded-full z-40" />
      </div>

      {/* Outer Side Buttons (Visual Decoration) */}
      <div className="absolute -left-1 top-36 w-1 h-12 bg-neutral-800 rounded-r-sm" />
      <div className="absolute -left-1 top-52 w-1 h-16 bg-neutral-800 rounded-r-sm" />
      <div className="absolute -left-1 top-72 w-1 h-16 bg-neutral-800 rounded-r-sm" />
      <div className="absolute -right-1 top-48 w-1 h-24 bg-neutral-800 rounded-l-sm" />
    </div>
  );
}
