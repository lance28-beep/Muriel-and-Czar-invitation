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
import { siteConfig } from "@/content/site";

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
    <footer className="relative z-20 mt-16 overflow-hidden"
      style={{
        backgroundImage: `
          repeating-linear-gradient(
            0deg,
            rgba(0, 0, 0, 0.03) 0px,
            transparent 1px,
            transparent 2px,
            rgba(0, 0, 0, 0.03) 3px
          ),
          repeating-linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.05) 0px,
            transparent 1px,
            transparent 2px,
            rgba(255, 255, 255, 0.02) 3px,
            transparent 4px,
            rgba(0, 0, 0, 0.03) 5px
          ),
          linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.1) 0%,
            transparent 20%,
            transparent 80%,
            rgba(0, 0, 0, 0.1) 100%
          )
        `,
        backgroundSize: '100% 4px, 8px 100%, 100% 100%',
        backgroundPosition: '0 0, 0 0, 0 0',
      }}
    >
      {/* Background matching countdown section */}
      <div className="absolute inset-0 bg-[#9B4719] backdrop-blur-sm pointer-events-none" />
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
                  <div 
                    className="absolute inset-0 drop-shadow-lg"
                    style={{
                      backgroundColor: '#EFD2AA',
                      maskImage: 'url(/monogram/monogramNew2.png)',
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskImage: 'url(/monogram/monogramNew2.png)',
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center'
                    }}
                  />
                </div>
              </div>

              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
              </div>

              {/* Save The Date text */}
              <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] font-semibold text-[#EFD2AA] uppercase tracking-[0.25em] sm:tracking-[0.3em] mb-4 sm:mb-6">
                Save The Date
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
              </div>
            </div>

            {/* Date Section - Elegant Layout */}
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              {/* Month - Elegant script style */}
              <div className="mb-4 sm:mb-5 md:mb-6">
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-ephesis)] text-[#EFD2AA] leading-none drop-shadow-lg font-semibold">
                  {new Date(siteConfig.wedding.date).toLocaleDateString('en-US', { month: 'long' })}
                </p>
              </div>

              {/* Day and Year - Horizontal layout with divider */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8">
                {/* Day - Large and bold focal point */}
                <p className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] xl:text-[12rem] font-[family-name:var(--font-crimson)] font-bold text-[#EFD2AA] leading-none drop-shadow-lg">
                  {new Date(siteConfig.wedding.date).getDate()}
                </p>

                {/* Vertical divider */}
                <div className="h-16 sm:h-20 md:h-24 lg:h-28 w-px bg-gradient-to-b from-transparent via-[#EFD2AA] to-transparent" />

                {/* Year - Elegant and refined */}
                <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-[family-name:var(--font-crimson)] font-light text-[#EFD2AA] leading-none drop-shadow-sm">
                  {new Date(siteConfig.wedding.date).getFullYear()}
                </p>
              </div>

              {/* Day of Week */}
              <p className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-medium text-[#EFD2AA] mb-6 sm:mb-8 tracking-wider">
                {siteConfig.ceremony.day}
              </p>
            </div>

            {/* Time Section */}
            <div className="text-center">
              {/* Top decorative line */}
              <div className="flex items-center justify-center gap-3 mb-4 sm:mb-5">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
              </div>

              {/* Time with elegant styling */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#EFD2AA] tracking-wider mb-4 sm:mb-5">
                {siteConfig.wedding.time}
              </p>

              {/* Bottom decorative line */}
              <div className="flex items-center justify-center gap-3">
                <div className="h-[1px] w-16 sm:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
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
                  <div 
                    className="absolute inset-0"
                    style={{
                      backgroundColor: '#EFD2AA',
                      maskImage: 'url(/monogram/monogramNew2.png)',
                      maskSize: 'contain',
                      maskRepeat: 'no-repeat',
                      maskPosition: 'center',
                      WebkitMaskImage: 'url(/monogram/monogramNew2.png)',
                      WebkitMaskSize: 'contain',
                      WebkitMaskRepeat: 'no-repeat',
                      WebkitMaskPosition: 'center'
                    }}
                  />
                </div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-[family-name:var(--font-crimson)] font-semibold text-[#EFD2AA] uppercase tracking-[0.15em] sm:tracking-[0.2em]">
                  Muriel & Czar
                </h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-[#EFD2AA] font-medium">
                  <Calendar className="w-5 h-5 text-[#EFD2AA]" />
                  <span className="text-base sm:text-lg">{siteConfig.wedding.date} • {siteConfig.ceremony.day}</span>
                </div>
                <div className="flex items-center gap-3 font-[family-name:var(--font-crimson)] text-[#EFD2AA] font-medium">
                  <MapPin className="w-5 h-5 text-[#EFD2AA]" />
                  <span className="text-sm sm:text-base">{siteConfig.ceremony.venue}, {siteConfig.ceremony.address}</span>
                </div>
              </div>
            </div>

            <motion.div
              className="backdrop-blur-md rounded-2xl p-6 border border-[#6A1F08]/30 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#EFD2AA' }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="font-[family-name:var(--font-crimson)] text-[#6A1F08] font-medium italic text-base sm:text-lg leading-relaxed min-h-[80px]">
                "{displayedText}
                <span className="inline-block w-0.5 h-6 bg-gradient-to-b from-[#6A1F08] to-[#6A1F08] ml-1 animate-pulse">
                  |
                </span>
                "
              </blockquote>
              <div className="flex items-center gap-2 mt-4">
                <div className="w-2 h-2 bg-gradient-to-br from-[#6A1F08] to-[#6A1F08] rounded-full shadow-sm" />
                <div className="w-2 h-2 bg-gradient-to-br from-[#6A1F08] to-[#6A1F08] rounded-full shadow-sm" />
                <div className="w-2 h-2 bg-gradient-to-br from-[#6A1F08] to-[#6A1F08] rounded-full shadow-sm" />
              </div>
            </motion.div>
          </motion.div>

          {/* Event Details quick tiles */}
          <motion.div className="space-y-6" variants={fadeInUp}>
            <motion.div
              className="backdrop-blur-md rounded-2xl p-6 border border-[#6A1F08]/30 hover:border-[#6A1F08]/60 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#EFD2AA' }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#6A1F08] rounded-full flex items-center justify-center shadow-md">
                  <Clock className="w-5 h-5 text-[#EFD2AA]" />
                </div>
                <h4 className="font-[family-name:var(--font-crimson)] font-bold text-lg sm:text-xl text-[#6A1F08]">
                  Ceremony
                </h4>
              </div>
              <div className="space-y-3 font-[family-name:var(--font-crimson)] text-[#6A1F08] font-medium text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#6A1F08]" />
                  <span>{siteConfig.ceremony.venue}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#6A1F08]" />
                  <span>{siteConfig.wedding.time}</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="backdrop-blur-md rounded-2xl p-6 border border-[#6A1F08]/30 hover:border-[#6A1F08]/60 shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ backgroundColor: '#EFD2AA' }}
              whileHover={{ y: -5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#6A1F08] rounded-full flex items-center justify-center shadow-md">
                  <Heart className="w-5 h-5 text-[#EFD2AA]" />
                </div>
                <h4 className="font-[family-name:var(--font-crimson)] font-bold text-lg sm:text-xl text-[#6A1F08]">
                  Reception
                </h4>
              </div>
              <div className="space-y-3 font-[family-name:var(--font-crimson)] text-[#6A1F08] font-medium text-sm sm:text-base">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#6A1F08]" />
                  <span>{siteConfig.reception.venue}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-[#6A1F08]" />
                  <span>{siteConfig.reception.time}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact + Quick Links */}
          <motion.div className="space-y-8" variants={fadeInUp}>
            <div>
              <h4 className="font-[family-name:var(--font-crimson)] font-bold text-lg sm:text-xl mb-6 flex items-center gap-3 text-[#EFD2AA]">
                <div className="w-2 h-8 bg-gradient-to-b from-[#EFD2AA] to-[#EFD2AA] rounded-full" /> Follow
                Us
              </h4>
              <div className="flex items-center gap-3 flex-wrap">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#EFD2AA]/30 hover:border-[#EFD2AA]/60 transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#EFD2AA' }}
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5 text-[#6A1F08]" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#EFD2AA]/30 hover:border-[#EFD2AA]/60 transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#EFD2AA' }}
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5 text-[#6A1F08]" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#EFD2AA]/30 hover:border-[#EFD2AA]/60 transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#EFD2AA' }}
                  aria-label="TikTok"
                >
                  <Music2 className="w-5 h-5 text-[#6A1F08]" />
                </a>
                <a
                  href="https://www.twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center h-11 w-11 rounded-full border border-[#EFD2AA]/30 hover:border-[#EFD2AA]/60 transition-all hover:scale-110 shadow-md hover:shadow-lg"
                  style={{ backgroundColor: '#EFD2AA' }}
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-[#6A1F08]" />
                </a>
              </div>
            </div>

            <div>
              <h5 className="font-[family-name:var(--font-crimson)] font-bold text-base sm:text-lg mb-4 text-[#EFD2AA]">
                Quick Links
              </h5>
              <div className="space-y-2">
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="block text-[#EFD2AA] font-medium hover:text-[#EFD2AA]/80 transition-colors duration-200 font-[family-name:var(--font-crimson)] text-sm sm:text-base hover:pl-2"
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
          className="border-t border-[#EFD2AA]/40 pt-8"
          variants={fadeInUp}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-[#EFD2AA] font-[family-name:var(--font-crimson)] text-sm sm:text-base font-semibold">
                © {year} Muriel & Czar. All rights reserved.
              </p>
              <p className="text-[#EFD2AA] font-[family-name:var(--font-crimson)] text-sm sm:text-base mt-1 font-medium">
                Made with 💕 for our special day
              </p>
            </div>

            <div className="text-center md:text-right space-y-1">
              <p className="text-[#EFD2AA] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-medium">
                Developed by{" "}
                <a
                  href="https://lance28-beep.github.io/portfolio-website/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EFD2AA] hover:text-[#EFD2AA]/80 transition-colors duration-200 underline decoration-[#EFD2AA]/40 hover:decoration-[#EFD2AA]/70 font-semibold"
                >
                  Lance Valle
                </a>
              </p>
              <p className="text-[#EFD2AA] font-[family-name:var(--font-crimson)] text-xs sm:text-sm font-medium">
                Want a website like this? Visit{" "}
                <a
                  href="https://www.facebook.com/WeddingInvitationNaga"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EFD2AA] hover:text-[#EFD2AA]/80 transition-colors duration-200 underline decoration-[#EFD2AA]/40 hover:decoration-[#EFD2AA]/70 font-semibold"
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
