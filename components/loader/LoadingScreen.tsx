import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation over 8 seconds
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.25; // 100 / 80 intervals (8 seconds * 10 updates per second)
      });
    }, 100);

    // Complete loading after 8 seconds
    const timer = setTimeout(() => {
      setProgress(100);
      setFadeOut(true);
      setTimeout(onComplete, 1000); // Wait for fade out animation
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[#BDCBCB]" />

      <div className="relative flex flex-col items-center justify-center px-6">
        <div className="relative flex items-center justify-center mb-8">
          {/* Glow halos */}
          <div className="absolute w-40 h-40 rounded-full bg-[#434F39]/25 blur-3xl animate-pulse" />
          <div className="absolute w-28 h-28 rounded-full bg-[#434F39]/20 blur-2xl animate-ping" />

          {/* Outer decorative rings */}
          <div className="absolute w-32 h-32 rounded-full border border-[#434F39]/40 animate-ping" />
          <div className="absolute w-26 h-26 rounded-full border border-[#434F39]/30 animate-[spin_7s_linear_infinite]" />
          <div className="absolute w-22 h-22 rounded-full border-t-2 border-b-2 border-[#434F39]/50 animate-[spin_12s_linear_infinite_reverse]" />

          {/* Monogram */}
          <div className="flex flex-col items-center justify-center z-10">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
              <Image
                src="/monogram/monogramgreen.png"
                alt="Muriel & Czar Monogram"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Couple Name */}
        <div className="mb-4 text-center">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl text-[#434F39] font-serif tracking-wide"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 600 }}
          >
            Muriel & Czar
          </h2>
        </div>

        {/* Introductory Message */}
        <div className="mb-8 text-center max-w-md">
          <p
            className="text-sm sm:text-base text-[#434F39] leading-relaxed"
            style={{ fontFamily: '"Cinzel", serif', fontWeight: 400 }}
          >
            Welcome to our special day. We're so excited to share this moment with you.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-xs sm:max-w-sm">
          <div className="h-1 bg-[#434F39]/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#434F39] rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};