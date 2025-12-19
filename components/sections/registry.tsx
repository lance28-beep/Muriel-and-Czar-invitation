"use client";

import { Section } from "@/components/section";
import { Heart } from "lucide-react";
import Image from "next/image";

export function Registry() {
  return (
    <Section
      id="registry"
      className="relative py-8 sm:py-12 md:py-16 lg:py-20 overflow-hidden bg-transparent"
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
      <div className="relative z-10 text-center mb-6 sm:mb-10 md:mb-12 px-3 sm:px-4 md:px-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-white mb-3 sm:mb-4 md:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
          Gift Registry
        </h2>

        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2 sm:px-4">
          Your presence is the greatest gift we could ask for
        </p>
      </div>

      {/* Central Card Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card with elegant styling */}
        <div className="relative group">
          {/* Subtle earth tone glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#800A06]/20 to-[#800A06]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl border-2 border-[#800A06]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#800A06]/50 overflow-hidden">
            {/* Card content */}
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
              <div className="flex flex-col items-center space-y-8 sm:space-y-10 md:space-y-12">
                {/* Heart icon */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#800A06]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#EFCA93] rounded-full flex items-center justify-center shadow-lg border-2 border-[#800A06]/20">
                    <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-[#800A06]" fill="#800A06" />
                  </div>
                </div>

                {/* Main message */}
                <div className="text-center space-y-6 sm:space-y-8 max-w-2xl">
                  {/* First message */}
                  <div className="relative">
                    {/* Decorative top line */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#800A06]/50" />
                      <div className="w-1.5 h-1.5 bg-[#800A06]/60 rounded-full" />
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#800A06]/50" />
                    </div>

                    <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-[family-name:var(--font-crimson)] font-light text-[#800A06] leading-relaxed tracking-wide">
                      Your presence at our wedding is the most precious gift.
                    </p>
                  </div>

                  {/* Second message */}
                  <div className="relative">
                    <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] font-light text-[#800A06]/80 leading-relaxed tracking-wide">
                      We kindly ask for no boxed gifts. Monetary gifts are welcome but never expected.
                    </p>

                    {/* Decorative bottom line */}
                    <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#800A06]/50" />
                      <div className="w-1.5 h-1.5 bg-[#800A06]/60 rounded-full" />
                      <div className="h-px w-12 sm:w-16 md:w-20 bg-[#800A06]/50" />
                    </div>
                  </div>

                  {/* GCash QR Code */}
                  <div className="relative mt-8 sm:mt-10 md:mt-12">
                    <div className="flex flex-col items-center space-y-4 sm:space-y-5">
                      <div className="text-center">
                        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-semibold text-[#800A06] mb-2 sm:mb-3 uppercase tracking-wider">
                          GCash
                        </p>
                        <p className="text-xs sm:text-sm text-[#800A06]/70 font-[family-name:var(--font-crimson)]">
                          Scan to send monetary gift
                        </p>
                      </div>
                      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-white rounded-xl p-3 sm:p-4 shadow-lg border-2 border-[#800A06]/20">
                        <Image
                          src="/QR/newQR.png"
                          alt="QR Code"
                          fill
                          className="object-contain rounded-lg"
                        />
                      </div>
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
