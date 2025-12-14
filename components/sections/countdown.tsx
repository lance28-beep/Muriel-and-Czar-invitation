"use client"

import { useEffect, useState } from "react"
import { Section } from "@/components/section"
import Counter from "@/components/counter"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target: February 8, 2026 at 2:30 PM GMT+8
      // Compute using UTC to avoid timezone parsing inconsistencies across browsers
      // 2:30 PM GMT+8 == 06:30 AM UTC
      const targetDate = Date.UTC(2026, 1, 8, 6, 30, 0) // February is month 1 (0-indexed)
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      } else {
        // Wedding has passed or is happening now
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      {/* Compact elegant card with earth tone accents */}
      <div className="relative group">
        {/* Subtle earth tone glow on hover */}
        <div className="absolute -inset-0.5 bg-gradient-to-br from-[#9F8650]/20 to-[#800A06]/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
        
        {/* Main card - more compact for mobile */}
        <div className="relative elegant-card rounded-lg sm:rounded-xl px-2.5 py-3 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-6 lg:py-6 border border-[#9F8650]/30 premium-shadow hover:border-[#9F8650]/50 transition-all duration-300 min-w-[60px] sm:min-w-[70px] md:min-w-[85px] lg:min-w-[95px]">
          {/* Counter - smaller for mobile */}
          <div className="relative z-10 flex items-center justify-center">
            <Counter
              value={value}
              places={value >= 100 ? [100, 10, 1] : [10, 1]}
              fontSize={28}
              padding={4}
              gap={2}
              textColor="#800A06"
              fontWeight={700}
              borderRadius={6}
              horizontalPadding={3}
              gradientHeight={8}
              gradientFrom="rgba(159,134,80,0.08)"
              gradientTo="transparent"
            />
          </div>
        </div>
      </div>

      {/* Compact label */}
      <span className="text-[10px] sm:text-xs font-[family-name:var(--font-crimson)] font-semibold text-[#800A06] uppercase tracking-wide">
        {label}
      </span>
    </div>
  )

  return (
    <Section
      id="countdown"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-[#EFCA93] backdrop-blur-sm pointer-events-none" />
      
      {/* Header - More compact for mobile */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#800A06] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
          Countdown to Our Special Day
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#800A06]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2">
          Every moment brings us closer to forever
        </p>
      </div>

      {/* Main countdown container - Compact for mobile */}
      <div className="relative z-10">
        <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 lg:gap-6 mb-10 sm:mb-14 md:mb-18 px-3 sm:px-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        {/* Wedding date presentation - Compact Save The Date Card Style */}
        <div className="flex justify-center px-3 sm:px-4 md:px-6">
          <div className="max-w-xl w-full">
            {/* Save The Date Header - More compact */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#9F8650] to-[#9F8650]" />
                <div className="w-1.5 h-1.5 bg-[#9F8650] rounded-full" />
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#9F8650] to-[#9F8650]" />
              </div>
              
              {/* Save The Date text - Better readability */}
              <p className="text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-bold text-[#800A06] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-3 sm:mb-4">
                Save The Date
              </p>
              
              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#9F8650] to-[#9F8650]" />
                <div className="w-1.5 h-1.5 bg-[#9F8650] rounded-full" />
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#9F8650] to-[#9F8650]" />
              </div>
            </div>

            {/* Date Section - More compact and readable */}
            <div className="text-center mb-6 sm:mb-8 md:mb-10">
              {/* Month - Script style with earth tones, smaller for mobile */}
              <div className="mb-3 sm:mb-4 md:mb-5">
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-ephesis)] text-[#800A06] leading-none">
                  February
                </p>
              </div>
              
              {/* Day and Year - Horizontal layout with divider, more compact */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 mb-5 sm:mb-6">
                {/* Day - Large and bold but scaled for mobile */}
                <p className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-normal text-[#800A06] leading-none elegant-text-shadow">
                  8
                </p>
                
                {/* Vertical divider with earth tone gradient - shorter */}
                <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-[#9F8650] via-[#800A06] to-[#9F8650]" />
                
                {/* Year - Elegant and refined, smaller for mobile */}
                <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-[#800A06] leading-none">
                  2026
                </p>
              </div>
            </div>

            {/* Time Section - More compact */}
            <div className="text-center">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#9F8650] to-[#9F8650]" />
                <div className="w-1.5 h-1.5 bg-[#9F8650] rounded-full" />
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#9F8650] to-[#9F8650]" />
              </div>
              
              {/* Time - Better readability */}
              <p className="text-sm sm:text-base md:text-lg lg:text-xl font-[family-name:var(--font-crimson)] font-semibold text-[#800A06] tracking-wide mb-3 sm:mb-4">
                2:30 PM
              </p>
              
              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-r from-transparent via-[#9F8650] to-[#9F8650]" />
                <div className="w-1.5 h-1.5 bg-[#9F8650] rounded-full" />
                <div className="h-[1px] w-8 sm:w-12 md:w-16 bg-gradient-to-l from-transparent via-[#9F8650] to-[#9F8650]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
