import React from 'react';
import Image from 'next/image';
import { FadeIn } from './FadeIn';

interface HeroProps {
  onOpen: () => void;
  visible: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpen, visible }) => {
  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center overflow-hidden transition-all duration-1000 ${visible ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/Details/background.mp4" type="video/mp4" />
        </video>

        {/* Soft overlay tint */}
        <div className="absolute inset-0 bg-[#BDCBCB]/55 pointer-events-none" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 w-full max-w-md mx-auto h-full">
        
        {/* Top Logo/Monogram */}
        <FadeIn show={visible} delay={300} className="mb-auto mt-8">
          <div className="w-20 h-24 border border-[#434F39]/40 rounded-[2rem] flex items-center justify-center backdrop-blur-sm bg-[#BDCBCB]/90">
            <div className="relative w-14 h-14">
              <Image
                src="/monogram/monogramgreen.png"
                alt="Muriel & Czar Monogram"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>

        <div className="flex-1" />

        <div className="flex flex-col items-center justify-end w-full gap-4 pb-14 sm:pb-16 md:pb-20">
          <FadeIn show={visible} delay={600}>
            <h2
              className="text-6xl md:text-8xl transform -rotate-6 drop-shadow-lg opacity-95 text-[#434F39]"
              style={{
                fontFamily: '"Great Vibes", cursive',
                fontWeight: 400,
                textShadow: '0 4px 14px rgba(0,0,0,0.25)',
              }}
            >
              You are
            </h2>
          </FadeIn>
          
          <FadeIn show={visible} delay={900}>
            <h1
              className="text-5xl md:text-7xl font-bold tracking-wider uppercase drop-shadow-[0_8px_20px_rgba(0,0,0,0.3)] text-[#434F39]"
              style={{
                fontFamily: '"Cinzel", serif',
                fontWeight: 700,
              }}
            >
              Invited!
            </h1>
          </FadeIn>

          <FadeIn show={visible} delay={1500}>
            <button 
              onClick={onOpen}
              className="group relative px-10 py-4 bg-[#434F39] text-white font-serif text-sm tracking-[0.2em] uppercase transition-all duration-500 hover:bg-[#434F39]/90 shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0 rounded-sm overflow-hidden"
            >
              <span
                className="relative z-10 text-white"
                style={{ fontFamily: '"Cinzel", serif', fontWeight: 400 }}
              >
                Open Invitation
              </span>
              {/* Button sheen effect */}
              <div className="absolute top-0 left-[-100%] w-full h-full bg-white/10 skew-x-12 group-hover:animate-[shimmer_1s_infinite]" />
            </button>
          </FadeIn>
        </div>

        {/* Bottom Spacer */}
        <div className="h-4" />
      </div>
    </div>
  );
};