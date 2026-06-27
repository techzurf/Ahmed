import React from 'react';

interface IslamicBgProps {
  className?: string;
  opacity?: number;
}

export default function IslamicGeometricBg({ className = "absolute inset-0", opacity = 0.04 }: IslamicBgProps) {
  return (
    <div className={`pointer-events-none overflow-hidden select-none ${className}`}>
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        style={{ opacity }}
      >
        <defs>
          {/* Create an elegant 8-point Islamic star tile */}
          <pattern id="islamic-star-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
            {/* Outer circles */}
            <circle cx="30" cy="30" r="28" fill="none" stroke="#C8A23A" strokeWidth="0.5" />
            <circle cx="30" cy="30" r="20" fill="none" stroke="#C8A23A" strokeWidth="0.5" strokeDasharray="2,2" />
            
            {/* 8-point star made of two rotated squares */}
            <rect x="11" y="11" width="38" height="38" fill="none" stroke="#C8A23A" strokeWidth="0.75" />
            <rect x="11" y="11" width="38" height="38" fill="none" stroke="#C8A23A" strokeWidth="0.75" transform="rotate(45 30 30)" />
            
            {/* Small center star */}
            <path
              d="M 30,24 L 32,28 L 36,30 L 32,32 L 30,36 L 28,32 L 24,30 L 28,28 Z"
              fill="none"
              stroke="#C8A23A"
              strokeWidth="0.5"
            />
            
            {/* Corner connection nodes */}
            <circle cx="0" cy="0" r="2" fill="none" stroke="#C8A23A" strokeWidth="0.5" />
            <circle cx="60" cy="0" r="2" fill="none" stroke="#C8A23A" strokeWidth="0.5" />
            <circle cx="0" cy="60" r="2" fill="none" stroke="#C8A23A" strokeWidth="0.5" />
            <circle cx="60" cy="60" r="2" fill="none" stroke="#C8A23A" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamic-star-pattern)" />
      </svg>
    </div>
  );
}
