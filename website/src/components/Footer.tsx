import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

export function Footer() {
  return (
    <footer className="w-full bg-black text-white pt-24 pb-8 px-[8%] font-sans">
      <div className="max-w-[1340px] mx-auto flex flex-col">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-[14px] font-bold mb-6 text-white uppercase inline-block border-b-2 border-blue-600 pb-1">About Us</h3>
            <p className="text-[#9CA3AF] text-[13px] leading-relaxed pr-4">
              CarBounty Helps New Car Buyers Make Smarter Purchase Decisions By Comparing Cars, Creating Bid Rooms, Receiving Verified Dealer Offers, And Tracking Real Savings In One Place.
            </p>
          </div>
          
          <div>
            <h3 className="text-[14px] font-bold mb-6 text-white uppercase inline-block border-b-2 border-blue-600 pb-1">Explore</h3>
            <ul className="flex flex-col gap-4 text-[#9CA3AF] text-[13px]">
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Browse Cars</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Compare Models</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Browse by Brand</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Browse by Fuel</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Browse by Body Type</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold mb-6 text-white uppercase inline-block border-b-2 border-blue-600 pb-1">Carbounty</h3>
            <ul className="flex flex-col gap-4 text-[#9CA3AF] text-[13px]">
              <li><Link href="#" className="hover:text-blue-500 transition-colors">How It Works</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Bid Rooms</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Recent Purchases</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Finance</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Buyer Savings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold mb-6 text-white uppercase inline-block border-b-2 border-blue-600 pb-1">Services</h3>
            <ul className="flex flex-col gap-4 text-[#9CA3AF] text-[13px]">
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Quote Room Creation</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Dealer Quoting</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Finance Pre-Approval</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">PDI Inspection</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Test Drive Coordination</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[14px] font-bold mb-6 text-white uppercase inline-block border-b-2 border-blue-600 pb-1">Support</h3>
            <ul className="flex flex-col gap-4 text-[#9CA3AF] text-[13px]">
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Middle Section (Contact) */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-16 relative">
          <div className="flex items-start gap-4 w-[280px]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
              <MapPin size={18} className="text-[#3B82F6]" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1 text-[14px]">Address</h4>
              <p className="text-[#9CA3AF] text-[12px] leading-tight">Mehrauli-Gurgaon Road, Sector 16, Gurugram,</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 w-[280px]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
              <Mail size={18} className="text-[#3B82F6]" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1 text-[14px]">Email Address</h4>
              <p className="text-[#9CA3AF] text-[12px] leading-tight">Sales@Carbounty.Com</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 w-[280px]">
            <div className="w-[42px] h-[42px] rounded-full bg-[#0F172A] flex items-center justify-center shrink-0">
              <Phone size={18} className="text-[#3B82F6]" />
            </div>
            <div>
              <h4 className="font-semibold text-white mb-1 text-[14px]">Phone No.</h4>
              <p className="text-[#9CA3AF] text-[12px] leading-tight">+91 79090 83806</p>
            </div>
          </div>
          
          <div className="flex-1 hidden md:flex items-center">
            <div className="w-full h-[1px] bg-[#1F2937]"></div>
          </div>
        </div>

        {/* Lower Section (Logo and Thumbnails) */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 mb-12">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12 lg:w-1/2">
            <div className="flex items-center gap-2">
              <span className="text-[36px] font-bold tracking-tight italic font-outfit">
                Car<span className="text-[#3B82F6]">Bounty</span>
              </span>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0">
                <InstagramIcon className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <h4 className="font-semibold text-white text-[14px]">@CarBounty</h4>
                <Link href="#" className="text-[#9CA3AF] text-[12px] underline hover:text-[#3B82F6] transition-colors">Connect with us</Link>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 lg:w-1/2 justify-end">
            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=300&q=80" alt="Car" className="w-[85px] h-[85px] lg:w-[100px] lg:h-[100px] object-cover rounded-[8px] opacity-90 hover:opacity-100 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1502877338535-773905fc5fea?auto=format&fit=crop&w=300&q=80" alt="Car" className="w-[85px] h-[85px] lg:w-[100px] lg:h-[100px] object-cover rounded-[8px] opacity-90 hover:opacity-100 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=300&q=80" alt="Car" className="w-[85px] h-[85px] lg:w-[100px] lg:h-[100px] object-cover rounded-[8px] opacity-90 hover:opacity-100 transition-opacity" />
            <img src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=300&q=80" alt="Car" className="w-[85px] h-[85px] lg:w-[100px] lg:h-[100px] object-cover rounded-[8px] opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="w-full h-[1px] bg-[#1F2937] mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-[#9CA3AF] text-[12px]">© 2026 CarBounty. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-blue-500 transition-colors">
              <FacebookIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href="#" className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-blue-500 transition-colors">
              <TwitterIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href="#" className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-blue-500 transition-colors">
              <InstagramIcon className="w-4 h-4 text-white" />
            </Link>
            <Link href="#" className="w-9 h-9 rounded-full bg-[#2563EB] flex items-center justify-center hover:bg-blue-500 transition-colors">
              <LinkedinIcon className="w-4 h-4 text-white" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
