"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "What is CarBounty?",
      answer: "CarBounty is a new car buying platform where you post your car requirement and verified dealers compete by sending their best offers.",
    },
    {
      question: "How does the bid room work?",
      answer: "",
    },
    {
      question: "Will dealers call me again and again?",
      answer: "",
    },
    {
      question: "Can I compare cars before posting a requirement?",
      answer: "",
    },
    {
      question: "Is CarBounty available outside Delhi NCR?",
      answer: "",
    },
    {
      question: "How do I start?",
      answer: "",
    },
  ];

  return (
    <div className="w-full flex flex-col gap-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className={`rounded-[12px] border overflow-hidden transition-all duration-200 ${
              isOpen ? "bg-[#EEF2FA] border-[#D0E0FF]" : "bg-white border-slate-200 shadow-sm hover:border-slate-300"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full px-6 py-5 flex items-center justify-between text-left text-[#0F172A] font-semibold text-[15px] cursor-pointer"
            >
              {faq.question}
              <ChevronRight
                size={20}
                className={`text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-[-90deg]" : "rotate-90"}`}
              />
            </button>
            {isOpen && (
              <div className="px-6 pb-5 pt-0 min-h-[10px]">
                <p className="text-slate-500 text-[14px] leading-relaxed">
                  {faq.answer || ""}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
