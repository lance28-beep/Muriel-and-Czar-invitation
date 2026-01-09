"use client";

import { Section } from "@/components/section";
import { Heart } from "lucide-react";

export function Registry() {
  return (
    <Section
      id="registry"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >

      {/* Corner Decorations - All 4 Corners */}
      <div className="absolute top-0 left-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 h-auto opacity-80 scale-x-[-1]"
        />
      </div>
      <div className="absolute top-0 right-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 h-auto opacity-80"
        />
      </div>
      <div className="absolute bottom-0 left-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 h-auto opacity-80 scale-x-[-1] scale-y-[-1]"
        />
      </div>
      <div className="absolute bottom-0 right-0 z-[1] pointer-events-none">
        <img 
          src="/decoration/top-right-corner-automleaves.png" 
          alt="Autumn leaves decoration"
          className="w-48 sm:w-56 md:w-64 lg:w-72 xl:w-80 2xl:w-96 h-auto opacity-80 scale-y-[-1]"
        />
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#EFD2AA] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
          Gift Registry
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
        </div>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          {/* Subtle glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9B4719]/20 to-[#9B4719]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-[#9B4719]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#9B4719]/50 overflow-hidden" style={{ backgroundColor: '#EFD2AA' }}>
            {/* Card content */}
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12">
                {/* Heart icon */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#6A1F08]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-lg border-2 border-[#6A1F08]/20" style={{ backgroundColor: '#EFD2AA' }}>
                    <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-[#6A1F08]" fill="#6A1F08" />
                  </div>
                </div>

                {/* Main message */}
                <div className="text-center space-y-6 sm:space-y-8 max-w-2xl">
                  {/* First message */}
                  <div className="relative">
                    {/* Decorative top line */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#6A1F08]/50" />
                      <div className="w-1.5 h-1.5 bg-[#6A1F08]/60 rounded-full" />
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#6A1F08]/50" />
                    </div>

                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-light text-[#6A1F08] leading-relaxed tracking-wide">
                      Your presence is the greatest gift of all.
                    </p>
                  </div>

                  {/* Second message */}
                  <div className="relative">
                    <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-light text-[#6A1F08] leading-relaxed tracking-wide">
                      We prefer monetary gift for future use.
                    </p>
                    <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-light text-[#6A1F08] leading-relaxed tracking-wide mt-3">
                      Gift will be given during the celebration.
                    </p>

                    {/* Decorative bottom line */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#6A1F08]/50" />
                      <div className="w-1.5 h-1.5 bg-[#6A1F08]/60 rounded-full" />
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#6A1F08]/50" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
