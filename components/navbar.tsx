"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";
import { siteConfig } from "@/content/site";
import StaggeredMenu from "./StaggeredMenu";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#countdown", label: "Countdown" },
  { href: "#messages", label: "Messages" },
  { href: "#details", label: "Details" },
  { href: "#entourage", label: "Entourage" },
  { href: "#sponsors", label: "Sponsors" },
  { href: "#guest-list", label: "RSVP" },
  { href: "#registry", label: "Registry" },
  { href: "#faq", label: "FAQ" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (rafIdRef.current != null) return;
      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;
        setIsScrolled(window.scrollY > 50);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (rafIdRef.current != null) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener("scroll", onScroll as EventListener);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const sectionIds = navLinks.map((l) => l.href.substring(1));
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const topMost = visible[0];
          if (topMost.target && topMost.target.id) {
            const newActive = `#${topMost.target.id}`;
            setActiveSection((prev) => (prev === newActive ? prev : newActive));
          }
        }
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const menuItems = useMemo(
    () =>
      navLinks.map((l) => ({
        label: l.label,
        ariaLabel: `Go to ${l.label}`,
        link: l.href,
      })),
    [],
  );

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ease-out ${
        isScrolled
          ? "bg-[#FAAF38]/95 backdrop-blur-xl shadow-sm border-b border-[#6A1F08]/30 premium-shadow"
          : "bg-[#FAAF38]/85 backdrop-blur-lg border-b border-[#6A1F08]/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 sm:h-16 md:h-14">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Monogram Image */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/monogram/monogram.png"
                  alt="Mark Joey & Diana Grace Monogram"
                  fill
                  className="object-contain"
                  style={{ 
                    filter: 'brightness(0) saturate(100%) invert(8%) sepia(94%) saturate(1352%) hue-rotate(120deg) brightness(95%) contrast(85%)'
                  }}
                  priority
                />
              </div>

              {/* Names with accent color on hover */}
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-semibold group-hover:text-[#6A1F08]/80 transition-all duration-300 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[#6A1F08] uppercase whitespace-nowrap">
                Mark & Diana
              </div>
            </div>
          </Link>

          <div className="hidden md:flex gap-1 items-center">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 lg:px-4 py-1.5 text-xs lg:text-sm font-[family-name:var(--font-crimson)] font-normal tracking-wide transition-all duration-300 relative group ${
                    isActive
                      ? "text-[#6A1F08]"
                      : "text-[#6A1F08]/80 hover:text-[#6A1F08]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#6A1F08] to-[#6A1F08]/80 transition-all duration-300 ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          <div className="md:hidden relative z-20">
            <StaggeredMenu
              position="left"
              items={menuItems}
              socialItems={[]}
              displaySocials={false}
              displayItemNumbering={true}
              menuButtonColor="#6A1F08"
              openMenuButtonColor="#6A1F08"
              changeMenuColorOnOpen={true}
              colors={["#F9F8F4", "#800A06", "#6A1F08", "#F9F8F4", "#9F8650"]}
              accentColor="#F9F8F4"
              isFixed={true}
              onMenuOpen={() => {}}
              onMenuClose={() => {}}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
