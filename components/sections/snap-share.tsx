"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Instagram,
  Facebook,
  Twitter,
  Share2,
  Copy,
  Check,
  Download,
  Camera,
} from "lucide-react";
import { Section } from "@/components/section";
import { QRCodeCanvas } from "qrcode.react";

export function SnapShare() {
  const [copiedHashtag, setCopiedHashtag] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const websiteUrl =
    typeof window !== "undefined"
      ? window.location.href
      : "https://example.com";
  const hashtags = ["#KENNETHelpFallingForANGEL", "#AngelforKen2026"];
  const shareText = `Join us in celebrating Kenneth & Angel's special day! Check out their wedding website: ${websiteUrl} ${hashtags.join(" ")} 💕`;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const checkMobile = () => setIsMobile(window.innerWidth < 640);

    checkMobile();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedHashtag(true);
      setTimeout(() => setCopiedHashtag(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareOnSocial = (
    platform: "instagram" | "facebook" | "twitter" | "tiktok",
  ) => {
    const encodedUrl = encodeURIComponent(websiteUrl);
    const encodedText = encodeURIComponent(shareText);

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}`,
      tiktok: `https://www.tiktok.com/`,
    };

    const target = urls[platform];
    if (target) {
      window.open(target, "_blank", "width=600,height=400");
    }
  };

  const downloadQRCode = () => {
    const canvas = document.getElementById(
      "snapshare-qr",
    ) as HTMLCanvasElement | null;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "wedding-qr.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <Section
      id="snap-share"
      className="relative bg-transparent py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
    >
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16 md:mb-20"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-[family-name:var(--font-crimson)] font-normal text-white mb-6 sm:mb-8 uppercase tracking-[0.12em] sm:tracking-[0.15em]"
            style={{
              textShadow:
                "0 0 20px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Snap & Share
          </h2>

          <p
            className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-white font-light max-w-xl mx-auto leading-relaxed tracking-wide px-4"
            style={{
              textShadow:
                "0 0 15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 0, 0, 0.6), 0 2px 4px rgba(0, 0, 0, 0.5)",
            }}
          >
            Help us capture and share the magic of our special day
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerChildren}
          initial="initial"
          animate="animate"
        >
          {/* Hashtags Card */}
          <motion.div
            className="relative group"
            variants={fadeInUp}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-10 border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60">
              <div className="text-center space-y-6">
                {/* Camera Icon */}
                <div className="relative inline-flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#1A1A1A]/10 rounded-full blur-xl scale-150 animate-pulse"></div>
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-[#1A1A1A] rounded-full flex items-center justify-center shadow-lg">
                    <Camera className="h-7 w-7 sm:h-8 sm:w-8 text-[#E8DCC8]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-3">
                    Official Hashtags
                  </h3>
                  <p className="text-sm sm:text-base font-[family-name:var(--font-crimson)] text-[#1A1A1A]/70 mb-6">
                    Tag your photos and videos with our hashtags to share your
                    memories
                  </p>
                </div>

                {/* Hashtags */}
                <div className="space-y-4">
                  {hashtags.map((hashtag) => (
                    <div
                      key={hashtag}
                      className="flex items-center justify-center gap-3 bg-[#E8DCC8]/20 px-4 sm:px-6 py-3 sm:py-4 rounded-xl border border-[#1A1A1A]/20 hover:border-[#1A1A1A]/30 transition-all duration-300 hover:shadow-md"
                    >
                      <span className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] break-all sm:break-normal tracking-wide">
                        {hashtag}
                      </span>
                      <button
                        onClick={() => copyToClipboard(hashtag)}
                        className="p-2 rounded-full bg-white hover:bg-[#E8DCC8]/50 transition-colors duration-200 shadow-sm flex-shrink-0 border border-[#1A1A1A]/20"
                        title="Copy hashtag"
                      >
                        {copiedHashtag ? (
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 sm:w-5 sm:h-5 text-[#1A1A1A]/60" />
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* QR Code & Social Media */}
          <motion.div className="space-y-6 sm:space-y-8" variants={fadeInUp}>
            {/* QR Code Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60 text-center">
                <h4 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-6">
                  Share Our Website
                </h4>

                <div className="inline-flex flex-col items-center bg-[#E8DCC8]/10 p-4 sm:p-6 rounded-xl border border-[#1A1A1A]/20 mb-4">
                  <div className="mb-4 p-3 rounded-xl bg-white shadow-md border border-[#1A1A1A]/10">
                    <QRCodeCanvas
                      id="snapshare-qr"
                      value={websiteUrl}
                      size={isMobile ? 128 : 160}
                      includeMargin
                      className="bg-white"
                    />
                  </div>
                  <button
                    onClick={downloadQRCode}
                    className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#1A1A1A] hover:bg-[#3C3C3C] text-[#E8DCC8] rounded-lg transition-all duration-200 shadow-md hover:shadow-lg text-xs sm:text-sm font-[family-name:var(--font-crimson)] font-semibold"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download QR Code</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm font-[family-name:var(--font-crimson)] text-[#1A1A1A]/70">
                  Scan with any camera app to visit our website
                </p>
              </div>
            </div>

            {/* Social Media Card */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

              <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60">
                <h5 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#1A1A1A] mb-6 text-center">
                  Share on Social Media
                </h5>

                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <button
                    onClick={() => shareOnSocial("instagram")}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-pink-500 via-purple-500 to-pink-600 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm">
                      Instagram
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("facebook")}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-blue-500 to-blue-700 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm">
                      Facebook
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("tiktok")}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-black via-gray-800 to-black text-white px-3 sm:px-4 py-3 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Share2 className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm">
                      TikTok
                    </span>
                  </button>

                  <button
                    onClick={() => shareOnSocial("twitter")}
                    className="group flex items-center justify-center gap-2 bg-gradient-to-br from-sky-400 to-blue-500 text-white px-3 sm:px-4 py-3 sm:py-4 rounded-lg hover:scale-105 transition-all duration-200 shadow-md hover:shadow-xl"
                  >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
                    <span className="font-[family-name:var(--font-crimson)] font-semibold text-xs sm:text-sm">
                      Twitter
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Closing Message */}
        <motion.div
          className="text-center mt-12 sm:mt-16"
          variants={fadeInUp}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="relative group max-w-3xl mx-auto">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#1A1A1A]/20 to-[#1A1A1A]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl p-8 sm:p-10 md:p-12 border-2 border-[#1A1A1A]/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#1A1A1A]/60">
              <p className="text-base sm:text-lg md:text-xl font-[family-name:var(--font-crimson)] text-[#1A1A1A] leading-relaxed mb-6">
                We are so excited to celebrate our love with you! See you on our
                special day!
              </p>

              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-3 sm:gap-4 my-6">
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
                <div className="w-1.5 h-1.5 bg-[#1A1A1A]/60 rounded-full" />
                <div className="h-px w-12 sm:w-16 md:w-20 bg-[#1A1A1A]/50" />
              </div>

              <div className="text-center">
                <span className="block text-xl sm:text-2xl md:text-3xl font-[family-name:var(--font-ephesis)] text-[#1A1A1A] font-normal">
                  – Kenneth & Angel –
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
