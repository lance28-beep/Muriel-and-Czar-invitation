"use client"
import { Section } from "@/components/section"
import { siteConfig } from "@/content/site"
import Stack from "@/components/stack"
import { motion } from "motion/react"


export function Narrative() {
  return (
    <Section id="narrative" className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#EFD2AA] backdrop-blur-sm pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title - Matching countdown section style */}
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#800A06] to-transparent" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#800A06] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
            Our Love Story
          </h2>
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#800A06] to-transparent" />
          </div>
        </motion.div>

        {/* Main Content - Centered Layout */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-12 md:gap-16 items-center lg:items-start"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Spacer */}
          <div className="hidden lg:block"></div>

          {/* Interactive Stack Component - Center */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#800A06]/20 via-[#800A06]/10 to-transparent rounded-full blur-3xl -z-10 w-full h-full max-w-sm animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-[#800A06]/15 via-transparent to-transparent rounded-full blur-2xl -z-10 w-full h-full max-w-sm"></div>

              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                cardDimensions={{ width: 280, height: 320 }}
                cardsData={[
                  { id: 1, img: "/gallery/couple (26).webp" },
                  { id: 2, img: "/gallery/couple (3).webp" },
                  { id: 3, img: "/gallery/couple (19).webp" },
                  { id: 4, img: "/gallery/couple (23).webp" },
                ]}
                animationConfig={{ stiffness: 260, damping: 20 }}
              />

              <motion.p 
                className="text-center text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#800A06]/80 mt-8 font-light tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                ✨ Drag to explore our moments ✨
              </motion.p>
            </div>
          </div>

          {/* Right Spacer */}
          <div className="hidden lg:block"></div>
        </motion.div>

        {/* Story Text - Full Width Below */}
        <motion.div 
          className="mt-16 md:mt-28 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="space-y-6 md:space-y-10">
            {siteConfig.narrative.split("\n\n").map((paragraph, index) => (
              <motion.div 
                key={index} 
                className="relative"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              >
                {/* First paragraph with drop cap */}
                {index === 0 ? (
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] leading-relaxed text-[#800A06] text-pretty font-light pl-3 md:pl-6">
                    <span className="float-left text-4xl md:text-7xl lg:text-8xl font-[family-name:var(--font-crimson)] font-bold text-[#800A06] leading-none mr-2 mt-1 drop-shadow-md">
                      {paragraph.charAt(0)}
                    </span>
                    {paragraph.slice(1)}
                  </p>
                ) : (
                  <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] leading-relaxed text-[#800A06] text-pretty font-light pl-3 md:pl-6">
                    {paragraph}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Divider and CTA */}
          <motion.div 
            className="mt-16 md:mt-24 lg:mt-28 space-y-8 md:space-y-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Decorative divider */}
            <div className="flex items-center justify-center gap-2">
              <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#800A06] to-transparent" />
            </div>

            {/* CTA Button - Matching countdown style */}
            <div className="flex justify-center">
              <motion.a
                href="#guest-list"
                className="inline-flex items-center gap-2 sm:gap-3 px-8 sm:px-10 md:px-12 lg:px-14 py-3 sm:py-3.5 md:py-4 lg:py-4.5 font-[family-name:var(--font-crimson)] font-semibold text-sm sm:text-base md:text-lg text-[#800A06] bg-white hover:bg-[#FAAF38] transition-all duration-300 tracking-wider uppercase border-2 border-[#800A06] hover:border-[#800A06]/80 hover:scale-105 hover:shadow-[0_10px_30px_rgba(128,10,6,0.25)] hover:brightness-105 active:scale-100 premium-shadow rounded-sm relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></span>
                <span className="relative z-10">Join Our Celebration</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </Section>
  )
}
