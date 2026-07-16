import React from 'react';
import { Phone, Mail, Clock, MapPin, Bell, User, Plus } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { CarBountyLogo } from './CarBountyLogo';
import Link from 'next/link';

export function Header() {
  return (
    <header className="flex flex-col w-full z-50 absolute top-0 left-0 pt-6 px-[4%]">
      <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-2.5 border-b border-gray-100 text-[11px] font-medium text-slate-500 bg-white">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Phone size={12} className="text-blue-500" />
              <span>+91 79090 83806</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <Mail size={12} className="text-blue-500" />
              <span>sales@carbounty.com</span>
            </div>
            <span className="text-gray-300">|</span>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-blue-500" />
              <span>Support: Mon-Sat, 10 AM - 7 PM IST</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Link href="#" className="hover:text-blue-600 transition-colors bg-gray-50 p-1.5 rounded-full"><FaFacebookF size={12} /></Link>
            <Link href="#" className="hover:text-blue-600 transition-colors bg-gray-50 p-1.5 rounded-full"><FaTwitter size={12} /></Link>
            <Link href="#" className="hover:text-blue-600 transition-colors bg-gray-50 p-1.5 rounded-full"><FaInstagram size={12} /></Link>
            <Link href="#" className="hover:text-blue-600 transition-colors bg-gray-50 p-1.5 rounded-full"><FaLinkedinIn size={12} /></Link>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex items-center justify-between px-6 py-3 bg-white">
          <Link href="/" className="flex items-center">
            <CarBountyLogo className="h-9 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-700 font-outfit">
            <Link href="#" className="hover:text-blue-600 transition-colors">Browse Cars</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Services</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">My Room</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Finance</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">Profile</Link>
            <div className="flex items-center gap-1 hover:text-blue-600 transition-colors cursor-pointer">
              <span>Legal</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {/* New Onboarding Link */}
            <Link href="/onboarding" className="text-blue-600 font-bold border border-blue-200 px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 transition-colors">
              Onboarding App
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-4 py-2 border border-slate-100 rounded-full text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 transition-colors">
              <MapPin size={14} className="text-slate-500" />
              <span>Delhi NCR</span>
            </div>
            
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors relative">
              <Bell size={18} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors">
              <User size={18} />
            </button>
            
            <button className="ml-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-bold font-outfit shadow-md shadow-blue-500/20 transition-all hover:shadow-blue-500/40">
              <Plus size={16} strokeWidth={3} />
              Post Requirement
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}
