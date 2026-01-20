"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/section";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "When and where is the wedding?",
    answer:
      "The wedding will be held on Friday, May 29, 2026, at Buddy-One Camp, Tuba, Benguet.\n\nCeremony Call Time: 2:00 PM\nCeremony Start: 3:00 PM\nPlease be on time.\n\nCeremony: Back Garden of buddy One camp\n\nReception: Function Hall pf Buddy One Camp (5:30pm)",
  },
  {
    question: "What is the dress code?",
    answer:
      "Principal Sponsors\n\nGents: Formal Barong Tagalog (long sleeves) paired with Brown slacks\n\nLadies: Long gown in Beige, Nude, or Light brown tones\n\nSecondary Sponsors\n(Wedding Bearers, Groomsmen & Bridesmaids)\n\nGents: White long-sleeved button-down shirt, navy blue slacks\n\nLadies: Long gown in terracotta or rustic orange tones\n\nBest Man\n\nGents: White long-sleeved button-down shirt with gray vest and slacks\n\nMaid of Honor\n\nLadies: Long gown in Chocolate or Dark Brown shade\n\nFlower Girl\n\nLong gown or dress in dusty pink tone\n\nGuests\n\nWear any Semi-Formal Attire in the following rustic earth tones:\n\nGents: any Gray or Dark brown tones\n\nLadies: any Mustard yellow or Old Rose tones\n\nGentle Reminders for All\n\nPlease wear plain, solid-colored attire only. Kindly avoid printed, patterned, or graphic tops. To maintain the formality of the event, please avoid wearing shorts, slippers, t-shirts, or any casual attire.\n\nWe genuinely appreciate your patience and effort in helping make our wedding day even more special. Thank you!",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm your attendance by February 28, 2026. We have reserved seats for you, and we look forward to celebrating with you! Your response helps us finalize our guest list and seating arrangements.\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
  },
  {
    question: "Can I bring a plus one?",
    answer:
      "As we celebrate this moment with our closest loved ones, we kindly ask that attendance be limited to those named on the invitation. Thank you for your understanding and cooperation!",
  },
  {
    question: "Are children allowed?",
    answer:
      "We love your little ones, but to keep the celebration intimate, we kindly request an adults-only event. Children in our family and the entourage are the exception. We appreciate your understanding!",
  },
  {
    question: "What is your gift guide?",
    answer:
      "With sincere appreciation, we respectfully prefer monetary gifts for our future. We kindly ask that any financial gifts be personally given to us on our wedding day. Your presence is truly a gift to us. Thank you so much. 🤍",
  },
  {
    question: "Can I take photos during the ceremony?",
    answer:
      "We'd love for everyone to be fully present. Please avoid posting photos during the celebration or ahead of time—our photographers will take care of the memories. We want everyone to be in the moment with us!",
  },
  {
    question: "What if I have dietary restrictions or allergies?",
    answer:
      "Please mention any dietary restrictions, allergies, or special meal requirements in the message field when you submit your RSVP, or contact Muriel & Czar directly. We want to ensure everyone is comfortable and well-fed!",
  },
  {
    question: "How do I get to the venue?",
    answer:
      "You can use the 'Get Directions' button in the Event Details section to open Google Maps for easy navigation to Buddy-One Camp, Tuba, Benguet.\n\nCeremony Call Time: 2:00 PM\nCeremony Start: 3:00 PM\nPlease be on time.\n\nCeremony: Back Garden of Buddy One camp\n\nReception: Function Hall of Buddy One Camp (5:30pm)",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! The venue has parking facilities. We recommend arriving by the call time (2:00 PM) to secure a spot and get settled comfortably. The ceremony starts at 3:00 PM. Please be on time.",
  },
  {
    question: "What should I do if I need to cancel or update my RSVP?",
    answer:
      "Please contact Muriel & Czar as soon as possible if your plans change. You can also update your RSVP by searching for your name in the RSVP section and submitting a new response. We appreciate your timely communication!",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <Section
      id="faq"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden"
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

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#EFD2AA] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#EFD2AA] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#EFD2AA]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2">
          Everything you need to know
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#9B4719]/20 to-[#9B4719]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#9B4719]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#9B4719]/50" style={{ backgroundColor: '#EFD2AA' }}>
            {/* Card content */}
            <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
              {/* FAQ items */}
              <div className="space-y-2.5 sm:space-y-3 md:space-y-4">
                {faqItems.map((item, index) => {
                  const isOpen = openIndex === index;
                  const contentId = `faq-item-${index}`;
                  return (
                    <div
                      key={index}
                      className="rounded-lg sm:rounded-xl border border-[#6A1F08]/20 hover:bg-[#EFD2AA]/50 transition-all duration-300 hover:shadow-md hover:border-[#6A1F08]/40 overflow-hidden"
                      style={{ backgroundColor: '#EFD2AA' }}
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="group w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#6A1F08]/50 focus-visible:ring-offset-2 transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                      >
                        <span className="font-[family-name:var(--font-crimson)] font-semibold text-[#6A1F08] pr-3 sm:pr-4 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-[#6A1F08]/80 transition-colors duration-200">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-[#6A1F08] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#6A1F08]/80`}
                          aria-hidden
                        />
                      </button>

                      <div
                        id={contentId}
                        role="region"
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen
                            ? "grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 border-t border-[#6A1F08]/20" style={{ backgroundColor: '#EFD2AA' }}>
                            {item.answer.includes("[RSVP_LINK]") ? (
                              <p className="text-[#6A1F08]/80 leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line">
                                {item.answer.split("[RSVP_LINK]")[0]}
                                <a
                                  href="#guest-list"
                                  className="text-[#6A1F08] underline font-semibold hover:text-[#6A1F08]/80 transition-colors inline-flex items-center gap-1"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    document
                                      .getElementById("guest-list")
                                      ?.scrollIntoView({ behavior: "smooth" });
                                  }}
                                >
                                  {
                                    item.answer.match(
                                      /\[RSVP_LINK\](.*?)\[\/RSVP_LINK\]/,
                                    )?.[1]
                                  }
                                </a>
                                {item.answer.split("[/RSVP_LINK]")[1]}
                              </p>
                            ) : (
                              <p className="text-[#6A1F08]/80 leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line">
                                {item.answer}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
