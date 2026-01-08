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
      "The wedding will be held on Friday, May 29, 2026, at 3:00 PM at Buddy-One Camp, Tuba, Benguet.\n\nThe ceremony and reception will both take place at the same venue.",
  },
  {
    question: "What is the dress code?",
    answer:
      "Theme: Rustic Countryside - A warm, romantic mix of earthy tones, soft neutrals, and organic textures.\n\nGuest Attire:\n• Ladies: Dress in any earth tones of the theme colors (avoid white or ivory)\n• Gentlemen: Long-sleeve polo in neutral or earth tones\n\nPrincipal Sponsors:\n• Women: Long Gown in Beige, Mocha, or Muted Rose tones\n• Men: Formal Barong Tagalog\n\nGroomsmen & Bridesmaids:\n• Men: White long sleeve with Navy blue pants or slacks\n• Women: Long Gown in Terracotta or Dusty Rose\n\nPlease adhere to the dress code to maintain the rustic countryside theme of our celebration.",
  },
  {
    question: "When is the RSVP deadline?",
    answer:
      "Please confirm your attendance by November 15, 2025. We have reserved seats for you, and we look forward to celebrating with you! Your response helps us finalize our guest list and seating arrangements.\n\n[RSVP_LINK]Click here to RSVP[/RSVP_LINK]",
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
    question: "What is your gift policy?",
    answer:
      "Your presence is the greatest gift of all. But if you wish to bless us further, a monetary gift will help us start our new life together. Note: Money gifts can also be given in person. If you wish to send a monetary gift, you can scan the BDO Bank QR code in our Gift Registry section.",
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
      "You can use the 'Get Directions' button in the Event Details section to open Google Maps for easy navigation to Buddy-One Camp, Tuba, Benguet. The ceremony and reception will both take place at the same venue.",
  },
  {
    question: "Is there parking available?",
    answer:
      "Yes! The venue has parking facilities. We recommend arriving 15-20 minutes early to secure a spot and get settled comfortably. The event starts at 3:00 PM.",
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
    >
      {/* Background matching countdown section */}
      <div className="absolute inset-0 bg-[#BDCBCB] backdrop-blur-sm pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 md:mb-16 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#85562A] to-transparent" />
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[family-name:var(--font-crimson)] font-normal text-[#85562A] mb-4 sm:mb-6 uppercase tracking-[0.1em] sm:tracking-[0.12em] elegant-text-shadow">
          Frequently Asked Questions
        </h2>
        <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
          <div className="h-[1px] w-12 sm:w-16 md:w-24 bg-gradient-to-r from-transparent via-[#85562A] to-transparent" />
        </div>
        <p className="text-sm sm:text-base md:text-lg font-[family-name:var(--font-crimson)] text-[#85562A]/80 font-light max-w-xl mx-auto leading-relaxed tracking-wide px-2">
          Everything you need to know
        </p>
      </div>

      {/* FAQ content */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 md:px-6">
        {/* Main card */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-br from-[#434F39]/20 to-[#434F39]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />

          <div className="relative bg-white backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border-2 border-[#434F39]/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#434F39]/50" style={{ backgroundColor: '#FFFFFF' }}>
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
                      className="rounded-lg sm:rounded-xl border border-[#434F39]/20 bg-white hover:bg-[#BDCBCB]/10 transition-all duration-300 hover:shadow-md hover:border-[#434F39]/40 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleItem(index)}
                        className="group w-full px-3 sm:px-4 md:px-5 py-3 sm:py-3.5 md:py-4 flex items-center justify-between text-left outline-none focus-visible:ring-2 focus-visible:ring-[#434F39]/50 focus-visible:ring-offset-2 transition-colors"
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                      >
                        <span className="font-[family-name:var(--font-crimson)] font-semibold text-[#434F39] pr-3 sm:pr-4 text-xs sm:text-sm md:text-base leading-relaxed group-hover:text-[#434F39]/80 transition-colors duration-200">
                          {item.question}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`text-[#434F39] flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""} w-4 h-4 sm:w-5 sm:h-5 group-hover:text-[#434F39]/80`}
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
                          <div className="px-3 sm:px-4 md:px-5 py-2.5 sm:py-3 md:py-4 bg-[#BDCBCB]/20 border-t border-[#434F39]/20">
                            {item.answer.includes("[RSVP_LINK]") ? (
                              <p className="text-[#434F39]/80 leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line">
                                {item.answer.split("[RSVP_LINK]")[0]}
                                <a
                                  href="#guest-list"
                                  className="text-[#434F39] underline font-semibold hover:text-[#434F39]/80 transition-colors inline-flex items-center gap-1"
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
                              <p className="text-[#434F39]/80 leading-relaxed text-xs sm:text-sm md:text-base font-[family-name:var(--font-crimson)] whitespace-pre-line">
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
