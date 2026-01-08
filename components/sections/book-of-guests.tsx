"use client";

import { useState, useEffect } from "react";
import {
  Loader2,
  Mail,
  MessageSquare,
  Heart,
  Sparkles,
  User,
} from "lucide-react";
import { Section } from "@/components/section";

interface Guest {
  Name: string;
  Email: string;
  RSVP: string;
  Guest: string;
  Message: string;
}

export function BookOfGuests() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalGuests, setTotalGuests] = useState(0);

  const getInitials = (name: string) => {
    if (!name) return "?";
    const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?";
  };

  const fetchGuests = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/guests", { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch guest list");
      }

      const data: Guest[] = await response.json();

      // Filter only attending guests and normalize Guest field
      const attendingGuests = data
        .filter((guest) => guest.RSVP === "Yes")
        .map((guest) => ({
          ...guest,
          Guest: guest.Guest || "1", // Ensure Guest field exists
        }));

      // Calculate total guests by summing the Guest column values
      const totalGuestCount = attendingGuests.reduce((sum, guest) => {
        const guestCount = parseInt(String(guest.Guest)) || 1;
        return sum + guestCount;
      }, 0);

      setGuests(attendingGuests);
      setTotalGuests(totalGuestCount);
    } catch (error: any) {
      console.error("Failed to load guests:", error);
      setError(error?.message || "Failed to load guest list");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch
    fetchGuests();

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests();
      }, 2000);
    };

    window.addEventListener("rsvpUpdated", handleRsvpUpdate);

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate);
    };
  }, []);

  return (
    <Section id="guests" className="relative py-16 sm:py-20 md:py-24 lg:py-28">
      {/* Background matching countdown section */}
      <div className="absolute inset-0 bg-[#BDCBCB] backdrop-blur-sm pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#85562A] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#85562A] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
          Book of Guests
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#85562A] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#85562A]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2">
          See who's celebrating with us on our special day
        </p>
      </div>

      {/* Guests content */}
      <div className="relative z-10">
        {/* Stats card */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 px-3 sm:px-4 md:px-6">
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#434F39]/20 to-[#434F39]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#434F39]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#434F39]/50" style={{ backgroundColor: '#FFFFFF' }}>
              {/* Card content */}
              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
                <div className="flex items-center justify-center gap-2.5 sm:gap-3 md:gap-4 mb-3 sm:mb-4 md:mb-5">
                  <div className="bg-[#434F39] p-1.5 sm:p-2 md:p-2.5 rounded-full shadow-lg">
                    <Heart className="text-white h-3.5 w-3.5 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="white" />
                  </div>
                  <div className="flex flex-col items-center">
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#434F39]">
                      {totalGuests} {totalGuests === 1 ? "Guest" : "Guests"}{" "}
                      Celebrating With Us
                    </h3>
                    <p className="text-[10px] sm:text-xs md:text-sm text-[#434F39]/70 font-[family-name:var(--font-crimson)] mt-0.5 sm:mt-1">
                      {guests.length}{" "}
                      {guests.length === 1 ? "RSVP entry" : "RSVP entries"}
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-[#434F39]/80 font-[family-name:var(--font-crimson)] leading-relaxed">
                  Thank you for confirming your RSVP! Your presence means the
                  world to us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Guest list container */}
        <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-[#434F39]/20 to-[#434F39]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

            <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#434F39]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#434F39]/50" style={{ backgroundColor: '#FFFFFF' }}>
              {/* Card content */}
              <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
              {isLoading ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="flex flex-col items-center gap-3 sm:gap-4">
                    <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin text-[#434F39]" />
                    <span className="text-[#434F39] font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg">
                      Loading guests...
                    </span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="text-center">
                    <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-red-500 mx-auto mb-3 sm:mb-4" />
                    <p className="text-red-500 font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg mb-2">
                      {error}
                    </p>
                  </div>
                </div>
              ) : guests.length === 0 ? (
                <div className="flex items-center justify-center py-16 sm:py-20 md:py-24">
                  <div className="text-center">
                    <div className="bg-[#434F39] w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                      <Heart className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-white" fill="white" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-crimson)] font-semibold text-[#434F39] mb-2">
                      No guests have RSVP'd yet
                    </h3>
                    <p className="text-xs sm:text-sm md:text-base text-[#434F39]/70 font-[family-name:var(--font-crimson)] max-w-md mx-auto leading-relaxed">
                      Be the first to RSVP and kick off the celebration!
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mb-3 sm:mb-5 md:mb-7 lg:mb-9">
                  <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                    {guests.map((guest, index) => (
                      <div
                        key={index}
                        className="group relative bg-white rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 border border-[#434F39]/20 hover:border-[#434F39]/40 transition-all duration-300 hover:shadow-lg"
                      >
                      <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 md:gap-4">
                        {/* Avatar */}
                        <div className="relative h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 flex-shrink-0">
                          <div className="h-full w-full rounded-full bg-[#434F39] text-white flex items-center justify-center font-[family-name:var(--font-crimson)] font-semibold shadow-md ring-2 ring-white text-xs sm:text-sm md:text-base">
                            {getInitials(guest.Name)}
                          </div>
                        </div>

                        {/* Guest Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                            <div className="flex-1 pr-12 sm:pr-0">
                              <h4 className="font-[family-name:var(--font-crimson)] text-sm sm:text-base md:text-lg font-semibold text-[#434F39] mb-0.5 sm:mb-1 group-hover:text-[#434F39]/80 transition-colors duration-200">
                                {guest.Name}
                              </h4>
                              {guest.Email && guest.Email !== "Pending" && (
                                <div className="flex items-center text-[10px] sm:text-xs md:text-sm text-[#434F39]/70">
                                  <Mail className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 mr-1 sm:mr-1.5 text-[#434F39] flex-shrink-0" />
                                  <span className="font-[family-name:var(--font-crimson)] break-all">
                                    {guest.Email}
                                  </span>
                                </div>
                              )}
                            </div>
                            {/* Guest count badge */}
                            <div className="absolute right-2.5 top-2.5 sm:static sm:right-auto sm:top-auto flex items-center gap-1 sm:gap-1.5">
                              <User className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0" />
                              <span className="inline-flex items-center justify-center px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#434F39]/10 text-[#434F39] rounded-full text-[10px] sm:text-xs md:text-sm font-[family-name:var(--font-crimson)] font-semibold border border-[#434F39]/30">
                                {guest.Guest
                                  ? parseInt(String(guest.Guest)) || 1
                                  : 1}{" "}
                                {parseInt(String(guest.Guest || "1")) === 1
                                  ? "guest"
                                  : "guests"}
                              </span>
                            </div>
                          </div>

                          {/* Message */}
                          {guest.Message && (
                            <div className="mt-2.5 sm:mt-3 md:mt-4 pt-2.5 sm:pt-3 md:pt-4 border-t border-[#434F39]/20">
                              <div className="flex items-start gap-2 sm:gap-2.5 md:gap-3">
                                <MessageSquare className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#434F39] flex-shrink-0 mt-0.5" />
                                <p className="text-[10px] sm:text-xs md:text-sm text-[#434F39]/80 font-[family-name:var(--font-crimson)] leading-relaxed italic flex-1">
                                  "{guest.Message}"
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
