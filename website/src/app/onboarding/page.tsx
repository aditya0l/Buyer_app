"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Car, UserCheck, ShieldCheck, CheckCircle2, ChevronDown, Check } from 'lucide-react';
import { CarBountyLogo } from '@/components/CarBountyLogo';

export default function OnboardingFlow() {
  const [currentStep, setCurrentStep] = useState(0);

  // Auto transition for splash screen
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setCurrentStep(1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSkip = () => {
    setCurrentStep(4);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-center overflow-hidden">
      {/* Mobile constraint container */}
      <div className="w-full h-screen max-w-[400px] bg-white relative overflow-hidden shadow-2xl flex flex-col">
        
        {/* =======================
            STEP 0: SPLASH SCREEN 
            ======================= */}
        {currentStep === 0 && (
          <div className="absolute inset-0 bg-[#2563EB] z-50 flex flex-col justify-center items-center overflow-hidden">
            {/* Tyre background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay">
              <img src="/tyrestraight.svg" className="absolute w-[200%] h-auto top-1/4 left-[-50%] -rotate-[35deg]" alt="" />
              <img src="/tyrestraight.svg" className="absolute w-[200%] h-auto top-1/2 left-[-50%] -rotate-[35deg]" alt="" />
            </div>
            
            {/* Logo */}
            <div className="relative z-10 flex flex-col items-center gap-2 mb-10 text-white">
               <CarBountyLogo className="brightness-0 invert h-12 w-auto" />
            </div>
            
            {/* Loading Progress Bar */}
            <div className="absolute bottom-16 left-10 right-10">
              <div className="w-full h-[2px] bg-blue-400/50 relative">
                 <div className="absolute left-0 bottom-[4px] text-white animate-[drive_2s_ease-in-out_forwards]">
                    <Car size={24} />
                 </div>
                 <div className="h-full bg-white animate-[progress_2s_ease-in-out_forwards]"></div>
              </div>
            </div>
            
            <style jsx>{`
              @keyframes drive {
                0% { transform: translateX(0); }
                100% { transform: translateX(300px); }
              }
              @keyframes progress {
                0% { width: 0%; }
                100% { width: 100%; }
              }
            `}</style>
          </div>
        )}

        {/* =======================
            STEP 1: INFO 1
            ======================= */}
        {currentStep === 1 && (
          <div className="flex flex-col h-full w-full bg-white animate-in fade-in duration-500">
            {/* Top Blue Half */}
            <div className="h-[60%] bg-[#2563EB] relative overflow-hidden flex flex-col">
              <div className="p-5 flex justify-between items-center text-white relative z-20">
                <div className="text-xs font-medium">12:22</div>
                <button onClick={handleSkip} className="border border-white/30 px-4 py-1 rounded-full text-[11px]">Skip</button>
              </div>
              
              <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0">
                <img src="/tyrestraight.svg" className="absolute w-[200%] h-auto top-[40%] left-[-50%] -rotate-[35deg]" alt="" />
              </div>
              
              <div className="flex-1 flex justify-center items-end pb-8 relative z-10">
                <img src="/image-4.svg" alt="SUV" className="w-[85%] h-auto drop-shadow-2xl translate-x-4 object-contain" />
              </div>
            </div>
            
            {/* Bottom White Half */}
            <div className="h-[40%] px-8 pt-8 pb-10 flex flex-col justify-between">
              <div>
                <h1 className="text-[28px] font-bold text-slate-800 leading-tight mb-3 font-outfit">
                  Get the Best<br/>Deal on <span className="text-[#2563EB]">Your Next Car</span>
                </h1>
                <p className="text-[13px] text-slate-500 leading-relaxed pr-4">
                  Buy Your New Car with Complete Confidence from Verified Dealers Near You
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                  <div className="w-6 h-1.5 rounded-full bg-[#2563EB]"></div>
                  <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
                </div>
                <button onClick={handleNext} className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 active:scale-95 transition-transform">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            STEP 2: INFO 2
            ======================= */}
        {currentStep === 2 && (
          <div className="flex flex-col h-full w-full bg-white animate-in slide-in-from-right-4 duration-300">
            {/* Top Blue Half */}
            <div className="h-[60%] bg-[#2563EB] relative overflow-hidden flex flex-col">
              <div className="p-5 flex justify-between items-center text-white relative z-20">
                <div className="text-xs font-medium">12:22</div>
                <button onClick={handleSkip} className="border border-white/30 px-4 py-1 rounded-full text-[11px]">Skip</button>
              </div>
              
              {/* Features List */}
              <div className="px-8 mt-4 relative z-20 text-white">
                <ul className="space-y-4">
                  <li className="flex items-center gap-2 text-[14px] font-medium">
                    <div className="w-1.5 h-1.5 bg-[#FF9441] rounded-full shadow-[0_0_8px_#FF9441]"></div>
                    Choose your car
                  </li>
                  <li className="flex items-center gap-2 text-[14px] font-medium">
                    <div className="w-1.5 h-1.5 bg-[#FF9441] rounded-full shadow-[0_0_8px_#FF9441]"></div>
                    Dealers Bid Live
                  </li>
                  <li className="flex items-center gap-2 text-[14px] font-medium">
                    <div className="w-1.5 h-1.5 bg-[#FF9441] rounded-full shadow-[0_0_8px_#FF9441]"></div>
                    You Get the Best Price
                  </li>
                </ul>
              </div>
              
              <div className="absolute bottom-4 left-0 w-full h-[60px] opacity-20 pointer-events-none mix-blend-overlay z-0 overflow-hidden flex items-end">
                <img src="/tyrestraight.svg" className="w-[150%] h-auto -translate-x-10 object-contain" alt="" />
              </div>
              
              {/* Man Image Placeholder */}
              <div className="absolute right-[-10%] bottom-0 w-[70%] h-[75%] flex justify-end items-end z-10">
                 <div className="w-full h-full bg-blue-400 rounded-tl-full opacity-30 blur-2xl"></div>
                 <div className="absolute bottom-0 right-4 flex flex-col items-center justify-end text-white/50 h-full w-full">
                    <UserCheck size={120} strokeWidth={1} />
                 </div>
              </div>
            </div>
            
            {/* Bottom White Half */}
            <div className="h-[40%] px-8 pt-8 pb-10 flex flex-col justify-between">
              <div>
                <h1 className="text-[28px] font-bold text-slate-800 leading-tight mb-3 font-outfit">
                  Dealers<br/>Compete. <span className="text-[#2563EB]">You Save.</span>
                </h1>
                <p className="text-[13px] text-slate-500 leading-relaxed pr-4">
                  No showroom visits, no endless negotiations — just the best car deal, made simple for you.
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-auto">
                <div className="flex gap-2">
                  <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="w-6 h-1.5 rounded-full bg-[#2563EB]"></div>
                  <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
                </div>
                <button onClick={handleNext} className="w-12 h-12 bg-[#2563EB] rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-600/30 active:scale-95 transition-transform">
                  <ArrowRight size={20} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            STEP 3: INFO 3
            ======================= */}
        {currentStep === 3 && (
          <div className="flex flex-col h-full w-full bg-white animate-in slide-in-from-right-4 duration-300">
            {/* Top Blue Half with Arc */}
            <div className="h-[55%] bg-[#2563EB] relative flex flex-col items-center">
               <div className="w-full p-5 flex justify-between items-center text-white relative z-20">
                <div className="text-xs font-medium">12:22</div>
                <button onClick={handleSkip} className="border border-white/30 px-4 py-1 rounded-full text-[11px]">Skip</button>
              </div>
              
              <div className="w-full absolute top-[60px] flex justify-center z-10">
                 <div className="w-[120%] aspect-square bg-blue-500/20 rounded-t-full border border-blue-400/30 blur-[1px]"></div>
              </div>
              
              <div className="relative z-20 text-center mt-6">
                <h1 className="text-white text-[32px] font-black tracking-wide font-outfit mb-4 drop-shadow-md">BEST DEALS</h1>
                
                <div className="flex flex-wrap justify-center gap-3 px-10">
                  <span className="bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5">
                     <CheckCircle2 size={14} className="text-[#FF9441]" /> Verified Dealers
                  </span>
                  <span className="bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5">
                     <CheckCircle2 size={14} className="text-[#FF9441]" /> Secure Payments
                  </span>
                  <span className="bg-white/10 border border-white/20 backdrop-blur-md px-3 py-1.5 rounded-full text-[11px] text-white flex items-center gap-1.5">
                     <CheckCircle2 size={14} className="text-[#FF9441]" /> Transparent Pricing
                  </span>
                </div>
              </div>
              
              {/* Cars Image Placeholder (Bottom of Blue) */}
              <div className="absolute -bottom-8 w-full h-[120px] flex justify-center items-end z-30 px-4">
                 <div className="w-full max-w-[280px] h-[80px] bg-slate-800 rounded-t-3xl border-4 border-slate-700 relative overflow-hidden flex items-end justify-center shadow-2xl">
                     <div className="w-[80px] h-[30px] bg-white/10 rounded-t-xl mb-4"></div>
                     <div className="absolute left-4 bottom-2 w-4 h-4 rounded-full bg-red-500 blur-[2px]"></div>
                     <div className="absolute right-4 bottom-2 w-4 h-4 rounded-full bg-red-500 blur-[2px]"></div>
                 </div>
              </div>
            </div>
            
            {/* Bottom White Half */}
            <div className="h-[45%] px-8 pt-16 pb-10 flex flex-col justify-between relative z-20 bg-white">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay z-0 flex items-center">
                <img src="/tyrestraight.svg" className="w-[100%] h-auto" alt="" />
              </div>
              
              <div className="relative z-10 text-center">
                <h1 className="text-[28px] font-bold text-slate-800 leading-tight mb-3 font-outfit">
                  Save More<br/>on Every Car <span className="text-[#2563EB]">Today</span>
                </h1>
                <p className="text-[13px] text-slate-500 leading-relaxed px-4 mx-auto max-w-[300px]">
                  No showroom visits, no endless negotiations — just the best car deal, made simple for you.
                </p>
              </div>
              
              <div className="flex justify-between items-center mt-auto relative z-10">
                <div className="flex gap-2">
                  <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="w-2 h-1.5 rounded-full bg-slate-200"></div>
                  <div className="w-6 h-1.5 rounded-full bg-[#2563EB]"></div>
                </div>
                <button onClick={handleNext} className="bg-[#2563EB] px-6 py-3 rounded-full flex items-center gap-2 text-white font-medium shadow-lg shadow-blue-600/30 active:scale-95 transition-transform text-[14px]">
                  Get Started <ArrowRight size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =======================
            STEP 4: LOGIN / OTP
            ======================= */}
        {currentStep === 4 && (
          <div className="flex flex-col h-full w-full bg-[#F8FAFC] animate-in fade-in duration-500 overflow-y-auto">
            <div className="p-5 flex justify-between items-center text-slate-800 relative z-20">
              <div className="text-xs font-medium">12:22</div>
            </div>
            
            {/* Top Graphics */}
            <div className="relative h-[220px] w-full flex-shrink-0">
               {/* Logo Top Left */}
               <div className="absolute top-4 left-8 text-slate-800 z-20">
                  <CarBountyLogo className="h-10 w-auto" />
               </div>
               
               {/* Curved Tyre Marks */}
               <div className="absolute right-0 top-12 w-[85%] h-full z-10 overflow-hidden">
                  <img src="/tyrecurve.svg" className="absolute right-[-10%] top-0 w-full h-[150%] object-contain opacity-30 mix-blend-overlay rotate-[15deg] pointer-events-none" alt="" />
               </div>
            </div>
            
            <div className="px-8 pb-10 flex-1 flex flex-col relative z-20 bg-[#F8FAFC]">
               <h1 className="text-[26px] font-bold text-slate-800 mb-2 font-outfit">
                 Welcome to <span className="text-[#2563EB]">CarBounty</span>
               </h1>
               <p className="text-[12px] text-slate-500 mb-8 leading-relaxed">
                 Enter your mobile number to continue and access the best car deals near you.
               </p>
               
               <div className="mb-4">
                  <label className="text-[11px] font-semibold text-slate-700 mb-2 block uppercase tracking-wide">Mobile Number</label>
                  <div className="flex gap-3 h-[52px]">
                     <button className="bg-white border border-slate-200 rounded-[12px] px-3 flex items-center gap-2 text-[14px] font-medium shadow-sm flex-shrink-0">
                        <img src="https://flagcdn.com/w40/in.png" alt="IN" className="w-5 h-auto rounded-[2px]" />
                        <ChevronDown size={14} className="text-slate-400" />
                     </button>
                     <input 
                        type="tel" 
                        placeholder="+91 000 000 0000" 
                        className="flex-1 bg-white border border-slate-200 rounded-[12px] px-4 text-[14px] font-medium outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all shadow-sm"
                     />
                  </div>
               </div>
               
               <div className="flex items-center gap-2 mb-8 mt-2">
                  <div className="w-4 h-4 bg-[#2563EB] rounded-[4px] flex items-center justify-center cursor-pointer flex-shrink-0">
                     <Check size={12} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-[12px] text-slate-600">Get Updates On <span className="font-semibold text-[#25D366]">WhatsApp</span></span>
               </div>
               
               <button className="w-full h-[52px] bg-[#2563EB] hover:bg-blue-700 text-white rounded-[12px] font-semibold text-[15px] shadow-lg shadow-blue-600/30 active:scale-[0.98] transition-transform mb-6">
                  Get OTP
               </button>
               
               <p className="text-[10px] text-slate-400 text-center leading-relaxed mt-auto">
                 By continuing, you agree to our Terms of Service & <br/><span className="text-[#2563EB] cursor-pointer hover:underline">Privacy Policy</span>
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
