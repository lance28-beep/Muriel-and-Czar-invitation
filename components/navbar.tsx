"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
          ? "bg-[#9B4719]/95 backdrop-blur-xl shadow-sm border-b border-[#800A06]/30 premium-shadow"
          : "bg-[#9B4719]/85 backdrop-blur-lg border-b border-[#800A06]/20"
      }`}
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
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-16 sm:h-16 md:h-14">
          <Link href="#home" className="flex-shrink-0 group relative z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Monogram Image */}
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex-shrink-0 group-hover:scale-105 transition-all duration-300">
                <Image
                  src="/monogram/monogramNew2.png"
                  alt="Muriel & Czar Monogram"
                  fill
                  className="object-contain"
                  style={{ filter: 'brightness(0) saturate(100%) invert(88%) sepia(8%) saturate(800%) hue-rotate(350deg) brightness(110%) contrast(95%)' }}
                  priority
                />
              </div>

              {/* Names with accent color on hover */}
              <div className="text-xs sm:text-sm md:text-base lg:text-lg font-[family-name:var(--font-crimson)] font-semibold group-hover:text-[#EFD2AA]/80 transition-all duration-300 tracking-[0.1em] sm:tracking-[0.15em] md:tracking-[0.2em] text-[#EFD2AA] uppercase whitespace-nowrap">
                {siteConfig.couple.brideNickname} & {siteConfig.couple.groomNickname}
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
                      ? "text-[#EFD2AA]"
                      : "text-[#EFD2AA]/80 hover:text-[#EFD2AA]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-0 h-[1.5px] bg-gradient-to-r from-[#EFD2AA] to-[#EFD2AA]/80 transition-all duration-300 ${
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
              menuButtonColor="#EFD2AA"
              openMenuButtonColor="#EFD2AA"
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
