"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import {
  Instagram,
  Twitter,
  Facebook,
  MapPin,
  Calendar,
  Clock,
  Heart,
  Music2,
} from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  const quotes = [
    "In every love story, there's a moment when two hearts become one, and ours is just beginning.",
    "Two souls, one heart—forever entwined in the journey of love and faith together.",
    "Love is not about finding the perfect person, but learning to see an imperfect person perfectly.",
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const pauseTimeout = setTimeout(() => {
        setIsPaused(false);
      }, 3000);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting) {
      if (displayedText.length > 0) {
        const deleteTimeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, 30);
        return () => clearTimeout(deleteTimeout);
      } else {
        setIsDeleting(false);
        setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
      }
    } else {
      const currentQuote = quotes[currentQuoteIndex];
      if (displayedText.length < currentQuote.length) {
        const typeTimeout = setTimeout(() => {
          setDisplayedText(currentQuote.slice(0, displayedText.length + 1));
        }, 50);
        return () => clearTimeout(typeTimeout);
      } else {
        setIsPaused(true);
        setIsDeleting(true);
      }
    }
  }, [displayedText, isDeleting, isPaused, currentQuoteIndex, quotes]);

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
  };

  const staggerChildren = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  };

  const nav = [
    { label: "Home", href: "#home" },
    { label: "Countdown", href: "#countdown" },
    { label: "Messages", href: "#messages" },
    { label: "Details", href: "#details" },
    { label: "Entourage", href: "#entourage" },
    { label: "Sponsors", href: "#sponsors" },
    { label: "RSVP", href: "#guest-list" },
    { label: "Registry", href: "#registry" },
    { label: "FAQ", href: "#faq" },
    { label: "Snap & Share", href: "#snap-share" },
  ] as const;

  return (
    <footer className="relative z-20 mt-16 overflow-hidden">
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 bg-[#EFCA93] backdrop-blur-sm pointer-events-none" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-16">
        {/* Wedding date presentation */}
        <motion.div
          className="flex justify-center px-4 mb-16"
          variants={fadeInUp}
        >
          <div className="max-w-2xl w-full">
            {/* Save The Date Header */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Monogram */}
              <div className="flex justify-center mb-4 sm:mb-6">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
                  <Image
                    src="/monogram/monogram.png"
                    alt="Mark Joey & Diana Grace Monogram"
                    fill
                    className="object-contain drop-shadow-lg"
                    style={{ 
                      filter: 'brightness(0) saturate(100%) sepia(100%) saturate(5000%) hue-rotate(0deg) brightness(0.5) contrast(1.2)'
                    }}
                    priority
                  />
                </div>
              </div>

              {/* Top decorative line with earth tone accent */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
              </div>

              {/* Save The Date text with elegant color */}
              <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-semibold text-[#800A06] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6">
                Save The Date
              </p>

              {/* Bottom decorative line with earth tone accent */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style with earth tones */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ephesis)] text-[#800A06] leading-none drop-shadow-lg font-semibold">
                  February
                </p>
              </div>

              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point with elegant color */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-[family-name:var(--font-crimson)] font-bold text-[#800A06] leading-none drop-shadow-lg">
                  8
                </p>

                {/* Vertical divider with earth tone gradient */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent via-[#9F8650] to-transparent" />

                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-crimson)] font-light text-[#800A06] leading-none drop-shadow-sm">
                  2026
                </p>
              </div>

              {/* Day of Week */}
              <p className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-medium text-[#800A06] mb-6 sm:mb-8 tracking-wider">
                Sunday
              </p>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative line with earth tone accent */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
              </div>

              {/* Time with elegant styling */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#800A06] tracking-wider mb-4 sm:mb-5">
                2:30 PM
              </p>

              {/* Bottom decorative line with earth tone accent */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#9F8650] to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Couple Info */}
          <motion.div className="lg:col-span-2" variants={fadeInUp}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                  <Image
                    src="/monogram/monogram.png"
                    alt="Mark Joey & Diana Grace Monogram"
                    fill
                    className="object-contain"
                    style={{ 
                      filter: 'brightness(0) saturate(100%) sepia(100%) saturate(5000%) hue-rotate(0deg) brightness(0.5) contrast(1.2)'
                    }}
                    priority
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-[#800A06] uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  Mark & Diana
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-[#800A06] font-medium">
                  <Calendar className="w-5 h-5 text-[#800A06]" />
                  <span className="text-base sm:text-lg">February 8, 2026 • Sunday</span>
                </div>
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-[#800A06] font-medium">
                  <MapPin className="w-5 h-5 text-[#800A06]" />
                  <span className="text-sm sm:text-base">San Lorenzo Ruiz Parish Church & Cz Ranch</span>
                </div>
              </div>
            </div>

            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#9F8650]/30 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="font-[family-name:var(--font-crimson)] text-[#800A06] font-medium italic text-base sm:text-lg leading-relaxed min-h-[80px]">
                "{displayedText}
                <span className="inline-block w-0.5 h-6 bg-gradient-to-b from-[#9F8650] to-[#800A06] ml-1 animate-pulse">
                  |
                </span>
                "
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-gradient-to-br from-[#9F8650] to-[#800A06] rounded-full shadow-sm" />
                <div className="w-2 h-2 bg-gradient-to-br from-[#800A06] to-[#9F8650] rounded-full shadow-sm" />
                <div className="w-2 h-2 bg-gradient-to-br from-[#9F8650] to-[#800A06] rounded-full shadow-sm" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.div
              className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-[#9F8650]/30 hover:border-[#9F8650]/60 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#800A06] rounded-full flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-[family-name:var(--font-crimson)] font-bold text-lg sm:text-xl text-[#800A06]">
                  Ceremony
                </h4>
              </div>
              <div className="space-y-3 font-[family-name:var(--font-crimson)] text-[#800A06] font-medium text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#800A06]" />
                  <span>San Lorenzo Ruiz Parish Church</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#800A06]" />
                  <span>2:30 PM</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-[#9F8650]/30 hover:border-[#9F8650]/60 shadow-lg hover:shadow-xl transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#800A06] rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-[family-name:var(--font-crimson)] font-bold text-lg sm:text-xl text-[#800A06]">
                  Reception
                </h4>
              </div>
              <div className="space-y-3 font-[family-name:var(--font-crimson)] text-[#800A06] font-medium text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#800A06]" />
                  <span>Cz Ranch</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#800A06]" />
                  <span>4:00 PM</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-[family-name:var(--font-crimson)] font-bold text-lg sm:text-xl mb-6 flex items-center gap-3 text-[#800A06]">
                <div className="w-2 h-8 bg-gradient-to-b from-[#9F8650] to-[#800A06] rounded-full" /> Follow
                Us
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/90 border border-[#9F8650]/30 hover:border-[#9F8650]/60 hover:bg-white transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-[#800A06]" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/90 border border-[#9F8650]/30 hover:border-[#9F8650]/60 hover:bg-white transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#800A06]" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/90 border border-[#9F8650]/30 hover:border-[#9F8650]/60 hover:bg-white transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5 text-[#800A06]" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full bg-white/90 border border-[#9F8650]/30 hover:border-[#9F8650]/60 hover:bg-white transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-[#800A06]" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-[family-name:var(--font-crimson)] font-bold text-base sm:text-lg mb-4 text-[#800A06]">
                Quick Links
              </h5>
              <div className="space-y-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-[#800A06] font-medium hover:text-[#800A06]/80 transition-colors duration-200 font-[family-name:var(--font-crimson)] text-sm sm:text-base hover:pl-2"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Row */}
        <motion.div
          className="border-t border-[#9F8650]/40 pt-8"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-[#800A06] font-[family-name:var(--font-crimson)] text-sm sm:text-base font-semibold">
                © {year} Mark & Diana. All rights reserved.
              </p>
              <p className="text-[#800A06] font-[family-name:var(--font-crimson)] text-sm sm:text-base mt-1 font-medium">
                Made with 💕 for our special day
              </p>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[#800A06] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-medium">
                Developed by{" "}
                <a
                  href="https://lance28-beep.github.io/portfolio-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#800A06] hover:text-[#800A06]/80 transition-colors duration-200 underline decoration-[#800A06]/40 hover:decoration-[#800A06]/70 font-semibold"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-[#800A06] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-medium">
                Want a website like this? Visit{" "}
                <a
                  href="https://www.facebook.com/WeddingInvitationNaga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#800A06] hover:text-[#800A06]/80 transition-colors duration-200 underline decoration-[#800A06]/40 hover:decoration-[#800A06]/70 font-semibold"
                >
                  Wedding Invitation Naga
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
