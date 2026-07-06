import { Header } from "@/components/Header";
import { FAQ } from "@/components/FAQ";
import { Search, Plus, Lock, Star, Users, ArrowRight, ArrowLeft, Fuel, Zap, Droplet, Leaf, Car, Briefcase, Trophy, ChevronRight, Clock, MapPin, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex flex-col w-full pb-20 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="flex w-full min-h-screen">
          {/* Left Side (Content) */}
          <div className="w-1/2 bg-[#F4F8FB] relative overflow-hidden flex flex-col justify-center px-[8%] pt-32 pb-12">
            
            {/* SVG Background (image-4.svg) */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center" style={{ backgroundImage: 'url("/image-4.svg")' }}></div>

            <div className="relative z-10 max-w-xl">
              {/* Live Rooms Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></div>
                <span className="text-xs font-semibold text-blue-600 font-outfit">2,400+ quote rooms live today across Delhi NCR</span>
              </div>

              {/* Headlines */}
              <h1 className="text-[54px] leading-[1.1] font-black font-outfit text-slate-800 mb-5 tracking-tight">
                Let Dealers Quote For <span className="text-blue-600">Your Car</span>
              </h1>
              
              <p className="text-slate-600 text-[17px] leading-relaxed mb-10 max-w-md font-medium">
                Post your car requirement once. Up to 18 verified dealers quote their lowest prices in real time. You pick the best deal — and save an average of <span className="font-bold text-blue-600">₹38,400.</span>
              </p>

              {/* Search Input */}
              <div className="flex items-center bg-white/80 backdrop-blur-md border border-white/60 p-1.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 transition-all focus-within:bg-white focus-within:shadow-[0_8px_30px_rgb(37,99,235,0.1)] focus-within:border-blue-200">
                <div className="pl-4 text-slate-400">
                  <Search size={18} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search Swift, Creta, XUV700..." 
                  className="flex-1 bg-transparent border-none outline-none px-3 py-3 text-slate-700 placeholder-slate-400 font-medium"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-bold font-outfit transition-colors shadow-md shadow-blue-500/20">
                  Search
                </button>
              </div>

              {/* Post Requirement Button */}
              <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-full font-bold font-outfit transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 mb-16">
                <Plus size={18} strokeWidth={2.5} />
                Post a Requirement
              </button>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5 bg-[#2563EB]/10 px-3 py-1.5 rounded-full border border-[#2563EB]/20">
                  <Lock size={14} className="text-amber-600" />
                  <span className="text-xs font-bold text-slate-700 font-outfit">Dealer NDA Protected</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#2563EB]/10 px-3 py-1.5 rounded-full border border-[#2563EB]/20">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-700 font-outfit">4.8★ Rated</span>
                </div>
                <div className="flex items-center gap-1.5 bg-[#2563EB]/10 px-3 py-1.5 rounded-full border border-[#2563EB]/20">
                  <Users size={14} className="text-amber-600" />
                  <span className="text-xs font-bold text-slate-700 font-outfit">2,400+ Buyers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side (Graphics) */}
          <div className="w-1/2 bg-blue-600 relative overflow-hidden">
            {/* Abstract background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-[65%] left-[-10%] right-[-10%] h-[180px] bg-[#1E40AF]/20 -skew-y-6 transform origin-left"></div>
              <div className="absolute top-[70%] left-[-10%] right-[-10%] h-[120px] bg-[#3B82F6]/40 -skew-y-6 transform origin-left"></div>
              <div className="absolute top-[78%] left-[-10%] right-[-10%] h-[150px] bg-[#60A5FA]/30 -skew-y-6 transform origin-left backdrop-blur-sm"></div>
              <div className="absolute top-[85%] left-[-10%] right-[-10%] h-[200px] bg-[#2563EB] -skew-y-6 transform origin-left shadow-[0_-20px_50px_rgba(0,0,0,0.1)]"></div>
            </div>
          </div>
        </section>

        {/* --- BROWSE BY BRAND SECTION --- */}
        <section className="w-full bg-[#F8FAFC] py-20 pl-[8%] flex items-center overflow-hidden">
          {/* Left Column */}
          <div className="w-[300px] flex-shrink-0 pr-8">
            <h2 className="text-[34px] font-black font-outfit text-[#0F172A] mb-2 leading-tight">Browse by Brand</h2>
            <p className="text-slate-500 font-medium mb-8">7 major brands, 30+ models available</p>
            <Link href="#" className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-semibold transition-colors shadow-md shadow-blue-500/20">
              Show All Brands <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right Column (Scrollable Cards) */}
          <div className="flex-1 relative min-w-0">
            <div className="flex items-center gap-6 overflow-x-auto pb-6 pt-4 pr-[8%] snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              {[
                { name: 'BMW', logo: '/logo_bmw_1783320942164.jpg' }, 
                { name: 'Tesla', logo: '/logo_tesla_1783320951882.jpg' }, 
                { name: 'Mercedes', logo: '/logo_mercedes_1783320960267.jpg' }, 
                { name: 'Honda', logo: '/logo_honda_1783320969365.jpg' }, 
                { name: 'Tata', logo: '/logo_tata_1783320978129.jpg' }, 
                { name: 'BMW', logo: '/logo_bmw_1783320942164.jpg' }, 
                { name: 'Tesla', logo: '/logo_tesla_1783320951882.jpg' }, 
                { name: 'Mercedes', logo: '/logo_mercedes_1783320960267.jpg' }
              ].map((brand, i) => (
                <div key={i} className="flex-shrink-0 w-40 h-[210px] bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-between p-6 snap-start hover:shadow-md transition-shadow hover:border-blue-100 group cursor-pointer">
                  <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-100 flex items-center justify-center p-2 bg-white">
                    <img src={brand.logo} alt={brand.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="w-12 h-px bg-slate-100 mt-2 mb-2 group-hover:bg-blue-100 transition-colors"></div>
                  <span className="font-semibold text-slate-700 text-sm font-outfit">{brand.name}</span>
                </div>
              ))}
            </div>
            
            {/* Scroll Indicator & Arrows */}
            <div className="mt-4 flex items-center justify-between pr-[8%]">
              <div className="h-[2px] flex-1 max-w-xl bg-blue-200/40 rounded-full overflow-hidden flex">
                <div className="h-full w-1/3 bg-blue-600 rounded-full"></div>
              </div>
              <div className="flex items-center gap-3 ml-8 shrink-0">
                <button className="w-10 h-10 flex-shrink-0 rounded-full border-2 border-blue-600 text-blue-600 flex items-center justify-center hover:bg-blue-50 transition-colors cursor-pointer group">
                  <ArrowLeft size={18} strokeWidth={2.5} className="transition-transform group-hover:-translate-x-0.5" />
                </button>
                <button className="w-10 h-10 flex-shrink-0 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-colors cursor-pointer group">
                  <ArrowRight size={18} strokeWidth={2.5} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- BROWSE BY FUEL SECTION --- */}
        <section className="w-full bg-white py-20 px-[8%]">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black font-outfit text-slate-800 mb-2">Browse by Fuel</h2>
              <p className="text-slate-500 font-medium">Browse petrol, diesel, electric, and hybrid cars to find the right vehicle for you.</p>
            </div>
            <Link href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
              Show All Fuel <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F9F9FF] rounded-[10px] p-[11px] border border-[#D9D9D9] hover:shadow-md transition-shadow cursor-pointer flex gap-[14px] items-center relative overflow-hidden h-[100px]">
              <div className="w-[72px] h-[72px] bg-white rounded-[10px] shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                <img src="/petrol.svg" alt="Petrol" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0F172A] text-[17px] mb-0.5 font-outfit">Petrol</h3>
                <p className="text-[11px] text-slate-500 leading-[1.4]">Explore petrol cars with competitive dealer offers.</p>
              </div>
              <div className="absolute bottom-0 left-[15%] right-[15%] h-[3px] bg-[#4CAF50] rounded-t-sm"></div>
            </div>

            <div className="bg-[#F9F9FF] rounded-[10px] p-[11px] border border-[#D9D9D9] hover:shadow-md transition-shadow cursor-pointer flex gap-[14px] items-center relative overflow-hidden h-[100px]">
              <div className="w-[72px] h-[72px] bg-white rounded-[10px] shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                <img src="/electric.svg" alt="Electric" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0F172A] text-[17px] mb-0.5 font-outfit">Electric</h3>
                <p className="text-[11px] text-slate-500 leading-[1.4]">Compare EV prices, benefits, and dealer savings.</p>
              </div>
              <div className="absolute bottom-0 left-[15%] right-[15%] h-[3px] bg-[#FFB300] rounded-t-sm"></div>
            </div>

            <div className="bg-[#F9F9FF] rounded-[10px] p-[11px] border border-[#D9D9D9] hover:shadow-md transition-shadow cursor-pointer flex gap-[14px] items-center relative overflow-hidden h-[100px]">
              <div className="w-[72px] h-[72px] bg-white rounded-[10px] shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                <img src="/diesel.svg" alt="Diesel" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0F172A] text-[17px] mb-0.5 font-outfit">Diesel</h3>
                <p className="text-[11px] text-slate-500 leading-[1.4]">Find diesel cars with strong on-road price deals.</p>
              </div>
              <div className="absolute bottom-0 left-[15%] right-[15%] h-[3px] bg-[#1E88E5] rounded-t-sm"></div>
            </div>

            <div className="bg-[#F9F9FF] rounded-[10px] p-[11px] border border-[#D9D9D9] hover:shadow-md transition-shadow cursor-pointer flex gap-[14px] items-center relative overflow-hidden h-[100px]">
              <div className="w-[72px] h-[72px] bg-white rounded-[10px] shadow-sm flex items-center justify-center p-2 flex-shrink-0">
                <img src="/hybrid.svg" alt="Hybrid" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-[#0F172A] text-[17px] mb-0.5 font-outfit">Hybrid</h3>
                <p className="text-[11px] text-slate-500 leading-[1.4]">Browse hybrid cars with smart fuel efficiency.</p>
              </div>
              <div className="absolute bottom-0 left-[15%] right-[15%] h-[3px] bg-[#FB8C00] rounded-t-sm"></div>
            </div>
          </div>
        </section>

        {/* --- HOW IT WORKS SECTION --- */}
        <section className="w-full py-20 px-[8%] relative bg-[#F8FAFC]">
          <div className="relative z-10 max-w-[1400px] mx-auto">
            <div className="text-center mb-[90px]">
              <h2 className="text-[34px] font-black font-outfit text-slate-800 mb-4 leading-tight">How CarBounty Works</h2>
              <p className="text-slate-500 font-medium max-w-2xl mx-auto">A smarter way to buy your next car — without visiting multiple showrooms or negotiating again and again.</p>
            </div>

            <div className="relative pt-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {/* Step 1 */}
                <div className="bg-[#F2F7FF] rounded-[14px] p-6 pt-[52px] border border-[#D0E0FF] shadow-sm relative min-h-[166px] w-full max-w-[433px] mx-auto">
                  {/* Dashed line to Step 2 */}
                  <div className="absolute top-[-24px] left-[116px] w-[calc(150%-120px)] hidden md:flex items-center z-0 pointer-events-none">
                    <div className="flex-1 h-[2px]" style={{ backgroundImage: 'linear-gradient(to right, #2563EB 50%, transparent 50%)', backgroundSize: '16px 2px', backgroundRepeat: 'repeat-x' }}></div>
                    <ChevronRight className="text-[#2563EB] -ml-1" size={18} strokeWidth={3} />
                  </div>

                  {/* SVG Cutout Mask */}
                  <div className="absolute -top-[1px] left-[10px] w-[140px] h-[26px] z-10">
                    <div className="absolute top-0 left-[33px] right-[33px] h-[2px] bg-[#F8FAFC]"></div>
                    <svg width="140" height="26" viewBox="0 0 140 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                      <path d="M 0 1 L 33.1 1 C 50.4 27.6, 89.6 27.6, 106.9 1 L 140 1" stroke="#D0E0FF" strokeWidth="1" fill="#F8FAFC" />
                    </svg>
                  </div>
                  
                  {/* Circle Icon */}
                  <div className="absolute -top-[60px] left-[44px] w-[72px] h-[72px] z-20">
                    <img src="/car-circle.svg" alt="Post Requirement" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-2 relative z-30 gap-4">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-outfit mt-2 whitespace-nowrap">Post Your Requirement</h3>
                    <div className="text-[36px] leading-none font-bold italic tracking-wider font-outfit flex-shrink-0" style={{ textShadow: '1px 1px 0 #BFDBFE, -1px -1px 0 #BFDBFE, 1px -1px 0 #BFDBFE, -1px 1px 0 #BFDBFE, 0 1px 0 #BFDBFE, 1px 0 0 #BFDBFE, 0 -1px 0 #BFDBFE, -1px 0 0 #BFDBFE', color: '#F2F7FF' }}>1 Step</div>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed relative z-30 pr-4">Tell us the car you want — model, variant, colour, timeline. Takes 2 minutes. ₹1,999 commitment fee keeps dealers serious.</p>
                </div>

                {/* Step 2 */}
                <div className="bg-[#F2F7FF] rounded-[14px] p-6 pt-[52px] border border-[#D0E0FF] shadow-sm relative min-h-[166px] w-full max-w-[433px] mx-auto mt-16 md:mt-0">
                  {/* Dashed line to Step 3 */}
                  <div className="absolute top-[-24px] left-[calc(50%+36px)] w-[calc(150%-120px)] hidden md:flex items-center z-0 pointer-events-none">
                    <div className="flex-1 h-[2px]" style={{ backgroundImage: 'linear-gradient(to right, #2563EB 50%, transparent 50%)', backgroundSize: '16px 2px', backgroundRepeat: 'repeat-x' }}></div>
                    <ChevronRight className="text-[#2563EB] -ml-1" size={18} strokeWidth={3} />
                  </div>

                  {/* SVG Cutout Mask */}
                  <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-[140px] h-[26px] z-10">
                    <div className="absolute top-0 left-[33px] right-[33px] h-[2px] bg-[#F8FAFC]"></div>
                    <svg width="140" height="26" viewBox="0 0 140 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                      <path d="M 0 1 L 33.1 1 C 50.4 27.6, 89.6 27.6, 106.9 1 L 140 1" stroke="#D0E0FF" strokeWidth="1" fill="#F8FAFC" />
                    </svg>
                  </div>
                  
                  {/* Circle Icon */}
                  <div className="absolute -top-[60px] left-1/2 -translate-x-1/2 w-[72px] h-[72px] z-20">
                    <img src="/man-circle.svg" alt="Dealers Quote" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-2 relative z-30 gap-4">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-outfit mt-2 whitespace-nowrap">Dealers Quote</h3>
                    <div className="text-[36px] leading-none font-bold italic tracking-wider font-outfit flex-shrink-0" style={{ textShadow: '1px 1px 0 #BFDBFE, -1px -1px 0 #BFDBFE, 1px -1px 0 #BFDBFE, -1px 1px 0 #BFDBFE, 0 1px 0 #BFDBFE, 1px 0 0 #BFDBFE, 0 -1px 0 #BFDBFE, -1px 0 0 #BFDBFE', color: '#F2F7FF' }}>2 Step</div>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed relative z-30 pr-4">Up to 18 verified dealers in your city see your room and quote their absolute lowest prices in real time. No spam — just quotes.</p>
                </div>

                {/* Step 3 */}
                <div className="bg-[#F2F7FF] rounded-[14px] p-6 pt-[52px] border border-[#D0E0FF] shadow-sm relative min-h-[166px] w-full max-w-[433px] mx-auto mt-16 md:mt-0">
                  {/* SVG Cutout Mask */}
                  <div className="absolute -top-[1px] right-[10px] w-[140px] h-[26px] z-10">
                    <div className="absolute top-0 left-[33px] right-[33px] h-[2px] bg-[#F8FAFC]"></div>
                    <svg width="140" height="26" viewBox="0 0 140 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative z-10">
                      <path d="M 0 1 L 33.1 1 C 50.4 27.6, 89.6 27.6, 106.9 1 L 140 1" stroke="#D0E0FF" strokeWidth="1" fill="#F8FAFC" />
                    </svg>
                  </div>
                  
                  {/* Circle Icon */}
                  <div className="absolute -top-[60px] right-[44px] w-[72px] h-[72px] z-20">
                    <img src="/trophy-circle.svg" alt="You Win" className="w-full h-full object-contain drop-shadow-sm" />
                  </div>
                  
                  <div className="flex justify-between items-start mb-2 relative z-30 gap-4">
                    <h3 className="font-bold text-[17px] text-[#0F172A] font-outfit mt-2 whitespace-nowrap">You Win</h3>
                    <div className="text-[36px] leading-none font-bold italic tracking-wider font-outfit flex-shrink-0" style={{ textShadow: '1px 1px 0 #BFDBFE, -1px -1px 0 #BFDBFE, 1px -1px 0 #BFDBFE, -1px 1px 0 #BFDBFE, 0 1px 0 #BFDBFE, 1px 0 0 #BFDBFE, 0 -1px 0 #BFDBFE, -1px 0 0 #BFDBFE', color: '#F2F7FF' }}>3 Step</div>
                  </div>
                  <p className="text-[13px] text-slate-500 leading-relaxed relative z-30 pr-4">Pick the best quote, connect with your dealer, close the deal. Your ₹1,999 fee adjusts against the car purchase price.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- YOUR BID ROOM SECTION --- */}
        <section className="w-full bg-white py-20 px-[8%]">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black font-outfit text-slate-800 mb-2">Your Bid Room</h2>
              <p className="text-slate-500 font-medium">Track live dealer offers, best bids, savings, and room status in one place.</p>
            </div>
            <Link href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
              Show All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Bid Room Card 1 (Live) */}
            <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden group hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-shadow">
              {/* Background Diagonal Shape */}
              <div className="absolute top-0 right-0 w-full h-[150px] bg-[#E3EAF6] z-0" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 80%)' }}></div>
              
              {/* Badge */}
              <div className="absolute bg-[#65B764] text-white text-[11px] font-bold z-10 shadow-sm"
                   style={{
                     width: "65.47px",
                     height: "21.21px",
                     top: "10.66px",
                     right: "0px",
                     borderWidth: "2px",
                     borderStyle: "solid",
                     borderColor: "#ffffff",
                     borderTopLeftRadius: "2px",
                     borderTopRightRadius: "2px",
                     borderBottomRightRadius: "2px",
                     borderBottomLeftRadius: "14px",
                     opacity: 1
                   }}>
                <div className="w-full h-full flex items-center justify-center gap-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div> Live
                </div>
              </div>
              
              {/* Car Image */}
              <div className="h-[120px] relative z-10 mt-6 mb-3 flex items-center justify-center">
                <img src="/brezza.png" alt="Maruti Brezza" className="w-[180px] h-full object-contain drop-shadow-xl" />
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-1.5 relative z-10">
                <MapPin size={12} className="text-slate-400" /> Delhi NCR
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-[#1E293B] text-[17px] mb-2 font-outfit relative z-10 leading-tight">Maruti Brezza ZXI+</h3>
              
              {/* Specs */}
              <div className="flex items-center text-[12px] text-[#2563EB] mb-4 relative z-10 flex-wrap gap-y-1">
                <span>Petrol • Automatic • </span>
                <div className="flex items-center bg-[#2563EB] text-white px-2 py-0.5 rounded-full ml-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 mr-1.5 border border-white/20"></div>
                  <span className="text-[11px] font-medium">Red</span>
                </div>
              </div>
              
              {/* Stats Box */}
              <div className="bg-[#F4F7FA] rounded-xl p-3 flex justify-between mb-5 relative z-10">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">7</div>
                  <div className="text-[11px] text-slate-500">Dealers</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">₹13.1L</div>
                  <div className="text-[11px] text-slate-500">Best Bid</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#22C55E] mb-0.5">₹42K</div>
                  <div className="text-[11px] text-slate-500">Savings</div>
                </div>
              </div>
              
              {/* Timer & Progress */}
              <div className="mb-5 relative z-10">
                <div className="flex items-center text-[12px] font-bold mb-2">
                  <span className="text-[#F97316]">17:15 Min</span>
                  <span className="text-slate-300 mx-2">|</span>
                  <span className="text-[#334155]">Remaining</span>
                </div>
                <div className="w-full h-[3px] bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              
              {/* Button */}
              <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-2.5 rounded-[10px] text-[13px] transition-colors relative z-10 mt-auto">
                View Room
              </button>
            </div>

            {/* Bid Room Card 2 (Waiting) */}
            <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden group hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-shadow">
              {/* Background Diagonal Shape */}
              <div className="absolute top-0 right-0 w-full h-[150px] bg-[#E3EAF6] z-0" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 80%)' }}></div>
              
              {/* Badge */}
              <div className="absolute top-4 left-0 bg-[#FC8C36] text-white text-[11px] font-bold px-2.5 py-1 rounded-r-md flex items-center gap-1 z-10 shadow-sm">
                <Clock size={11} strokeWidth={3} /> Waiting
              </div>
              
              {/* Car Image */}
              <div className="h-[120px] relative z-10 mt-6 mb-3 flex items-center justify-center">
                <img src="/creta.png" alt="Hyundai Creta" className="w-[180px] h-full object-contain drop-shadow-xl" />
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-1.5 relative z-10">
                <MapPin size={12} className="text-slate-400" /> Delhi NCR
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-[#1E293B] text-[17px] mb-2 font-outfit relative z-10 leading-tight">Hyundai Creta SX</h3>
              
              {/* Specs */}
              <div className="flex items-center text-[12px] text-[#2563EB] mb-4 relative z-10 flex-wrap gap-y-1">
                <span>Diesel • MT • ₹13.1L • </span>
                <div className="flex items-center bg-[#2563EB] text-white px-2 py-0.5 rounded-full ml-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-white mr-1.5 border border-slate-200"></div>
                  <span className="text-[11px] font-medium">White</span>
                </div>
              </div>
              
              {/* Stats Box */}
              <div className="bg-[#F4F7FA] rounded-xl p-3 flex justify-between mb-5 relative z-10">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">0</div>
                  <div className="text-[11px] text-slate-500">Dealers</div>
                </div>
                {/* Thick blue line match from screenshot design anomaly */}
                <div className="w-[2px] bg-[#2563EB] my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">—</div>
                  <div className="text-[11px] text-slate-500">Best Bid</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">—</div>
                  <div className="text-[11px] text-slate-500">Savings</div>
                </div>
              </div>
              
              {/* Timer & Progress */}
              <div className="mb-5 relative z-10">
                <div className="flex items-center text-[12px] font-bold mb-2">
                  <span className="text-[#F97316]">17:15 Min</span>
                  <span className="text-slate-300 mx-2">|</span>
                  <span className="text-[#334155]">Starts In</span>
                </div>
                <div className="w-full h-[3px] bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              {/* Button */}
              <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-2.5 rounded-[10px] text-[13px] transition-colors relative z-10 mt-auto">
                View Room
              </button>
            </div>

            {/* Bid Room Card 3 (Live) */}
            <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden group hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-shadow">
              {/* Background Diagonal Shape */}
              <div className="absolute top-0 right-0 w-full h-[150px] bg-[#E3EAF6] z-0" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 80%)' }}></div>
              
              {/* Badge */}
              <div className="absolute bg-[#65B764] text-white text-[11px] font-bold z-10 shadow-sm"
                   style={{
                     width: "65.47px",
                     height: "21.21px",
                     top: "10.66px",
                     right: "0px",
                     borderWidth: "2px",
                     borderStyle: "solid",
                     borderColor: "#ffffff",
                     borderTopLeftRadius: "2px",
                     borderTopRightRadius: "2px",
                     borderBottomRightRadius: "2px",
                     borderBottomLeftRadius: "14px",
                     opacity: 1
                   }}>
                <div className="w-full h-full flex items-center justify-center gap-1">
                  <div className="w-1 h-1 bg-white rounded-full"></div> Live
                </div>
              </div>
              
              {/* Car Image */}
              <div className="h-[120px] relative z-10 mt-6 mb-3 flex items-center justify-center">
                <img src="/brezza.png" alt="Maruti Brezza" className="w-[180px] h-full object-contain drop-shadow-xl" />
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-1.5 relative z-10">
                <MapPin size={12} className="text-slate-400" /> Delhi NCR
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-[#1E293B] text-[17px] mb-2 font-outfit relative z-10 leading-tight">Maruti Brezza ZXI+</h3>
              
              {/* Specs */}
              <div className="flex items-center text-[12px] text-[#2563EB] mb-4 relative z-10 flex-wrap gap-y-1">
                <span>Petrol • Automatic • </span>
                <div className="flex items-center bg-[#2563EB] text-white px-2 py-0.5 rounded-full ml-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-600 mr-1.5 border border-white/20"></div>
                  <span className="text-[11px] font-medium">Red</span>
                </div>
              </div>
              
              {/* Stats Box */}
              <div className="bg-[#F4F7FA] rounded-xl p-3 flex justify-between mb-5 relative z-10">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">7</div>
                  <div className="text-[11px] text-slate-500">Dealers</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">₹13.1L</div>
                  <div className="text-[11px] text-slate-500">Best Bid</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#22C55E] mb-0.5">₹42K</div>
                  <div className="text-[11px] text-slate-500">Savings</div>
                </div>
              </div>
              
              {/* Timer & Progress */}
              <div className="mb-5 relative z-10">
                <div className="flex items-center text-[12px] font-bold mb-2">
                  <span className="text-[#F97316]">17:15 Min</span>
                  <span className="text-slate-300 mx-2">|</span>
                  <span className="text-[#334155]">Remaining</span>
                </div>
                <div className="w-full h-[3px] bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '50%' }}></div>
                </div>
              </div>
              
              {/* Button */}
              <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-2.5 rounded-[10px] text-[13px] transition-colors relative z-10 mt-auto">
                View Room
              </button>
            </div>

            {/* Bid Room Card 4 (Waiting) */}
            <div className="bg-white rounded-[16px] p-4 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col relative overflow-hidden group hover:shadow-[0_4px_25px_rgb(0,0,0,0.08)] transition-shadow">
              {/* Background Diagonal Shape */}
              <div className="absolute top-0 right-0 w-full h-[150px] bg-[#E3EAF6] z-0" style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 80%)' }}></div>
              
              {/* Badge */}
              <div className="absolute top-4 left-0 bg-[#FC8C36] text-white text-[11px] font-bold px-2.5 py-1 rounded-r-md flex items-center gap-1 z-10 shadow-sm">
                <Clock size={11} strokeWidth={3} /> Waiting
              </div>
              
              {/* Car Image */}
              <div className="h-[120px] relative z-10 mt-6 mb-3 flex items-center justify-center">
                <img src="/creta.png" alt="Hyundai Creta" className="w-[180px] h-full object-contain drop-shadow-xl" />
              </div>
              
              {/* Location */}
              <div className="flex items-center gap-1 text-[11px] text-slate-500 font-medium mb-1.5 relative z-10">
                <MapPin size={12} className="text-slate-400" /> Delhi NCR
              </div>
              
              {/* Title */}
              <h3 className="font-bold text-[#1E293B] text-[17px] mb-2 font-outfit relative z-10 leading-tight">Hyundai Creta SX</h3>
              
              {/* Specs */}
              <div className="flex items-center text-[12px] text-[#2563EB] mb-4 relative z-10 flex-wrap gap-y-1">
                <span>Diesel • MT • ₹13.1L • </span>
                <div className="flex items-center bg-[#2563EB] text-white px-2 py-0.5 rounded-full ml-1">
                  <div className="w-2.5 h-2.5 rounded-full bg-white mr-1.5 border border-slate-200"></div>
                  <span className="text-[11px] font-medium">White</span>
                </div>
              </div>
              
              {/* Stats Box */}
              <div className="bg-[#F4F7FA] rounded-xl p-3 flex justify-between mb-5 relative z-10">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">0</div>
                  <div className="text-[11px] text-slate-500">Dealers</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">—</div>
                  <div className="text-[11px] text-slate-500">Best Bid</div>
                </div>
                <div className="w-[1px] bg-slate-200 my-1"></div>
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[13px] font-bold text-[#1E293B] mb-0.5">—</div>
                  <div className="text-[11px] text-slate-500">Savings</div>
                </div>
              </div>
              
              {/* Timer & Progress */}
              <div className="mb-5 relative z-10">
                <div className="flex items-center text-[12px] font-bold mb-2">
                  <span className="text-[#F97316]">17:15 Min</span>
                  <span className="text-slate-300 mx-2">|</span>
                  <span className="text-[#334155]">Starts In</span>
                </div>
                <div className="w-full h-[3px] bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-[#2563EB] rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              
              {/* Button */}
              <button className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-medium py-2.5 rounded-[10px] text-[13px] transition-colors relative z-10 mt-auto">
                View Room
              </button>
            </div>
          </div>
        </section>

        {/* --- BROWSE BY BODY STYLE SECTION --- */}
        <section className="w-full bg-[#F8FAFC] py-20 px-[8%] border-t border-slate-100">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black font-outfit text-slate-800 mb-2">Your Bid Room</h2>
              <p className="text-slate-500 font-medium">Track live dealer offers, best bids, savings, and room status in one place.</p>
            </div>
            <Link href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
              Show All <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {['Sedan', 'Coupe', 'SUV', 'Truck', 'Hatchback', 'Convertible'].map(style => (
               <div key={style} className="bg-white rounded-[16px] p-5 py-8 flex flex-col items-center justify-center cursor-pointer hover:shadow-[0_4px_20px_rgb(0,0,0,0.06)] transition-all border border-slate-100 group">
                 <div className="h-[70px] flex items-center justify-center mb-4">
                   <img src={`/${style.toLowerCase()}.png`} alt={style} className="w-[140px] object-contain drop-shadow-md group-hover:scale-105 transition-transform" />
                 </div>
                 <span className="font-semibold text-slate-800 text-[15px]">{style}</span>
               </div>
            ))}
          </div>
        </section>

        {/* --- COMPARE MODELS BANNER --- */}
        <section className="w-full bg-[#F8FAFC] pb-20 px-[8%]">
          <div className="w-full rounded-[24px] relative overflow-hidden flex flex-col md:flex-row items-center min-h-[360px] shadow-lg" style={{ background: 'linear-gradient(93.05deg, #1246B7 1.54%, #2563EB 50.01%, #0D3CA2 98.49%)' }}>
            {/* Tyre Marks Background */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
              <img src="/tyrecurve.svg" alt="" className="absolute left-[-2%] top-[-10%] h-[120%] w-auto object-contain opacity-90 mix-blend-overlay" />
              <img src="/tyrecurve2.svg" alt="" className="absolute right-[-2%] top-[-10%] h-[120%] w-auto object-contain opacity-90 mix-blend-overlay" />
            </div>
            
            <div className="relative z-10 flex-1 py-16 px-10 md:px-20 flex flex-col items-center text-center">
              <div className="text-[#FFB067] font-bold tracking-[0.2em] text-[13px] mb-3 uppercase">Feature</div>
              <h2 className="text-[40px] font-bold text-white mb-4 font-outfit leading-tight">Compare Models</h2>
              <p className="text-blue-100 max-w-2xl mx-auto mb-8 text-[15px] leading-relaxed">
                Pick any 2 cars side-by-side and compare specs, price, features, fuel type, body style, and expected CarBounty savings before you decide.
              </p>
              <button className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 transition-colors">
                Compare Cars <ArrowRight size={18} />
              </button>
              <p className="text-blue-200/70 text-[12px] mt-5">Make better decisions before opening your bid room.</p>
            </div>
            
            {/* Right Image */}
            <div className="hidden lg:block absolute right-[-80px] top-1/2 -translate-y-1/2 w-[550px] z-10 pointer-events-none">
              <img src="/safari.png" alt="Compare Cars" className="w-full h-auto object-contain drop-shadow-2xl" />
            </div>
          </div>
        </section>

        {/* --- RECENT NCR PURCHASES --- */}
        <section className="w-full bg-[#F8FAFC] pb-20 px-[8%]">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-3xl font-black font-outfit text-slate-800 mb-2">Recent NCR Purchases</h2>
              <p className="text-slate-500 font-medium">See real purchase stories from buyers who saved through CarBounty.</p>
            </div>
            <Link href="#" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-colors">
              Show All <ArrowRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Purchase Card 1 */}
            <div className="bg-white rounded-[16px] border border-[#D0E0FF] overflow-hidden shadow-sm">
              <div className="p-4 pb-5">
                {/* Top Pill */}
                <div className="relative bg-[#F0F5FA] rounded-[16px] p-4 flex items-center mt-3 mb-6 min-h-[80px]">
                  <div className="absolute -top-3.5 -right-1 bg-[#65B764] text-white text-[12px] xl:text-[14px] font-medium z-10 shadow-sm"
                       style={{
                         width: "65.47px",
                         height: "21.21px",
                         borderWidth: "2px",
                         borderStyle: "solid",
                         borderColor: "#ffffff",
                         borderTopLeftRadius: "2px",
                         borderTopRightRadius: "2px",
                         borderBottomRightRadius: "2px",
                         borderBottomLeftRadius: "14px",
                         opacity: 1
                       }}>
                    <div className="w-full h-full flex items-center justify-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Done
                    </div>
                  </div>
                  <div className="absolute -left-2 xl:-left-4 top-1/2 -translate-y-1/2 w-[110px] xl:w-[130px] z-10">
                    <img src="/wagonr.png" alt="" className="w-full object-contain drop-shadow-md" />
                  </div>
                  <div className="ml-[95px] xl:ml-[105px] flex-1">
                    <h3 className="font-bold text-[#0F172A] text-[15px] xl:text-[18px] font-outfit leading-tight mb-1 line-clamp-2">Maruti Wagon R VXi CNG</h3>
                    <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1 pr-2">
                      <span className="text-[#3B82F6] text-[12px] xl:text-[14px] font-medium leading-none">Maurya Motors • Delhi</span>
                      <span className="text-slate-500 text-[11px] xl:text-[13px] leading-none">March 14, 2026</span>
                    </div>
                  </div>
                </div>
                
                {/* Price Section */}
                <div className="flex flex-row justify-between items-stretch px-1">
                  <div className="flex flex-col flex-1 pr-1">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">On-Road Price<br/> Paid</span>
                    <span className="font-bold text-[#0F172A] text-[14px] xl:text-[16px]">₹6,10,000</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 my-1"></div>
                  <div className="flex flex-col flex-1 px-2">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">Ex-Showroow</span>
                    <span className="font-bold text-slate-400 text-[14px] xl:text-[16px]">₹5,82,000</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 my-1"></div>
                  <div className="flex flex-col flex-1 pl-2">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">Saved VIA<br/> Carbounty</span>
                    <span className="font-bold text-[#207320] text-[14px] xl:text-[16px]">₹28,000</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#EDF4FC] p-4 px-6 border-t border-[#D0E0FF]">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 text-[15px] text-[#0F172A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#2563EB]">
                      <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.7 3 17 4.2 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12L11 15L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Free mats & seat covers
                  </div>
                  <div className="flex items-center gap-2.5 text-[15px] text-[#0F172A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#2563EB]">
                      <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.7 3 17 4.2 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12L11 15L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    1-year free service
                  </div>
                </div>
              </div>
            </div>
            
            {/* Purchase Card 2 */}
            <div className="bg-white rounded-[16px] border border-[#D0E0FF] overflow-hidden shadow-sm">
              <div className="p-4 pb-5">
                {/* Top Pill */}
                <div className="relative bg-[#F0F5FA] rounded-[16px] p-4 flex items-center mt-3 mb-6 min-h-[80px]">
                  <div className="absolute -top-3.5 -right-1 bg-[#65B764] text-white text-[12px] xl:text-[14px] font-medium z-10 shadow-sm"
                       style={{
                         width: "65.47px",
                         height: "21.21px",
                         borderWidth: "2px",
                         borderStyle: "solid",
                         borderColor: "#ffffff",
                         borderTopLeftRadius: "2px",
                         borderTopRightRadius: "2px",
                         borderBottomRightRadius: "2px",
                         borderBottomLeftRadius: "14px",
                         opacity: 1
                       }}>
                    <div className="w-full h-full flex items-center justify-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Done
                    </div>
                  </div>
                  <div className="absolute -left-2 xl:-left-4 top-1/2 -translate-y-1/2 w-[110px] xl:w-[130px] z-10">
                    <img src="/brezza.png" alt="" className="w-full object-contain drop-shadow-md" />
                  </div>
                  <div className="ml-[95px] xl:ml-[105px] flex-1">
                    <h3 className="font-bold text-[#0F172A] text-[15px] xl:text-[18px] font-outfit leading-tight mb-1 line-clamp-2">Maruti Brezza ZXI+ AT</h3>
                    <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1 pr-2">
                      <span className="text-[#3B82F6] text-[12px] xl:text-[14px] font-medium leading-none">Maurya Motors • Delhi</span>
                      <span className="text-slate-500 text-[11px] xl:text-[13px] leading-none">April 28, 2026</span>
                    </div>
                  </div>
                </div>
                
                {/* Price Section */}
                <div className="flex flex-row justify-between items-stretch px-1">
                  <div className="flex flex-col flex-1 pr-1">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">On-Road Price<br/> Paid</span>
                    <span className="font-bold text-[#0F172A] text-[14px] xl:text-[16px]">₹13,18,000</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 my-1"></div>
                  <div className="flex flex-col flex-1 px-2">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">Ex-Showroow</span>
                    <span className="font-bold text-slate-400 text-[14px] xl:text-[16px]">₹12,76,900</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 my-1"></div>
                  <div className="flex flex-col flex-1 pl-2">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">Saved VIA<br/> Carbounty</span>
                    <span className="font-bold text-[#207320] text-[14px] xl:text-[16px]">₹42,000</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#EDF4FC] p-4 px-6 border-t border-[#D0E0FF]">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 text-[15px] text-[#0F172A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#2563EB]">
                      <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.7 3 17 4.2 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12L11 15L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    5-yr extended warranty
                  </div>
                  <div className="flex items-center gap-2.5 text-[15px] text-[#0F172A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#2563EB]">
                      <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.7 3 17 4.2 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12L11 15L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Free accessories kit
                  </div>
                </div>
              </div>
            </div>
            
            {/* Purchase Card 3 */}
            <div className="bg-white rounded-[16px] border border-[#D0E0FF] overflow-hidden shadow-sm">
              <div className="p-4 pb-5">
                {/* Top Pill */}
                <div className="relative bg-[#F0F5FA] rounded-[16px] p-4 flex items-center mt-3 mb-6 min-h-[80px]">
                  <div className="absolute -top-3.5 -right-1 bg-[#65B764] text-white text-[12px] xl:text-[14px] font-medium z-10 shadow-sm"
                       style={{
                         width: "65.47px",
                         height: "21.21px",
                         borderWidth: "2px",
                         borderStyle: "solid",
                         borderColor: "#ffffff",
                         borderTopLeftRadius: "2px",
                         borderTopRightRadius: "2px",
                         borderBottomRightRadius: "2px",
                         borderBottomLeftRadius: "14px",
                         opacity: 1
                       }}>
                    <div className="w-full h-full flex items-center justify-center gap-1.5">
                       <div className="w-1.5 h-1.5 bg-white rounded-full"></div> Done
                    </div>
                  </div>
                  <div className="absolute -left-2 xl:-left-4 top-1/2 -translate-y-1/2 w-[110px] xl:w-[130px] z-10">
                    <img src="/wagonr.png" alt="" className="w-full object-contain drop-shadow-md" />
                  </div>
                  <div className="ml-[95px] xl:ml-[105px] flex-1">
                    <h3 className="font-bold text-[#0F172A] text-[15px] xl:text-[18px] font-outfit leading-tight mb-1 line-clamp-2">Maruti Wagon R VXi CNG</h3>
                    <div className="flex flex-wrap justify-between items-center gap-x-2 gap-y-1 pr-2">
                      <span className="text-[#3B82F6] text-[12px] xl:text-[14px] font-medium leading-none">Maurya Motors • Delhi</span>
                      <span className="text-slate-500 text-[11px] xl:text-[13px] leading-none">March 14, 2026</span>
                    </div>
                  </div>
                </div>
                
                {/* Price Section */}
                <div className="flex flex-row justify-between items-stretch px-1">
                  <div className="flex flex-col flex-1 pr-1">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">On-Road Price<br/> Paid</span>
                    <span className="font-bold text-[#0F172A] text-[14px] xl:text-[16px]">₹6,10,000</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 my-1"></div>
                  <div className="flex flex-col flex-1 px-2">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">Ex-Showroow</span>
                    <span className="font-bold text-slate-400 text-[14px] xl:text-[16px]">₹5,82,000</span>
                  </div>
                  <div className="w-[1px] bg-slate-200 my-1"></div>
                  <div className="flex flex-col flex-1 pl-2">
                    <span className="text-slate-500 text-[10px] xl:text-[12px] leading-tight mb-1 min-h-[28px] md:min-h-[32px]">Saved VIA<br/> Carbounty</span>
                    <span className="font-bold text-[#207320] text-[14px] xl:text-[16px]">₹28,000</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#EDF4FC] p-4 px-6 border-t border-[#D0E0FF]">
                <div className="flex flex-col gap-2.5">
                  <div className="flex items-center gap-2.5 text-[15px] text-[#0F172A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#2563EB]">
                      <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.7 3 17 4.2 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12L11 15L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Free mats & seat covers
                  </div>
                  <div className="flex items-center gap-2.5 text-[15px] text-[#0F172A]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 text-[#2563EB]">
                      <path d="M21 12C21 16.97 16.97 21 12 21C7.03 21 3 16.97 3 12C3 7.03 7.03 3 12 3C14.7 3 17 4.2 18.5 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <path d="M8 12L11 15L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    1-year free service
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What Buyers Say Section */}
        <section className="bg-white py-16 xl:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-black font-outfit text-[#0F172A] mb-3">What Buyers Say</h2>
              <p className="text-slate-400 font-medium">Real buyers. Real quotes. Real savings.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
              {/* Left Column: Testimonials */}
              <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {[
                  "CarBounty made the car buying process much easier. I posted my requirement once and dealers started sending offers. I saved more than I expected.",
                  "I liked that everything was inside one bid room. No repeated calls, no pressure, just clear offers from dealers.",
                  "The comparison feature helped me decide better. I checked cars, compared prices, and then opened my bid room.",
                  "I liked that everything was inside one bid room. No repeated calls, no pressure, just clear offers from dealers."
                ].map((quote, i) => (
                  <div key={i} className="bg-[#F0F5FA] rounded-[16px] border border-[#D0E0FF] p-5 lg:p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={18} className="fill-[#F97316] text-[#F97316]" />
                      ))}
                    </div>
                    <p className="text-slate-500 text-[14px] leading-relaxed mb-5">
                      "{quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <img src={`https://i.pravatar.cc/150?img=${11 + i}`} alt="David John" className="w-11 h-11 rounded-full object-cover border border-white shadow-sm" />
                      <div>
                        <h4 className="font-bold text-[#0F172A] text-[15px] leading-tight mb-0.5">David John</h4>
                        <p className="text-slate-400 text-[12px] leading-none">UI Designer at — <span className="font-semibold text-slate-700">Dream IT</span></p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right Column: Image and Floating Card */}
              <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0 min-h-[400px] lg:min-h-auto">
                <div className="w-full h-full rounded-[24px] overflow-hidden">
                  <img src="/hands-stack.svg" alt="Hands stacked together" className="w-full h-full object-cover" />
                </div>
                
                {/* Trusted Happy Customers Card */}
                <div className="absolute bottom-0 left-0 bg-white pt-4 pr-4 rounded-tr-[32px]">
                  <div className="bg-[#2563EB] text-white rounded-[20px] p-5 lg:p-6 shadow-xl flex flex-col items-center justify-center w-[160px] h-[160px] lg:w-[200px] lg:h-[200px]">
                    <div className="flex -space-x-3 mb-4">
                      <img src="https://i.pravatar.cc/150?img=32" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#2563EB]" alt="Customer" />
                      <img src="https://i.pravatar.cc/150?img=12" className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#2563EB]" alt="Customer" />
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full border-2 border-[#2563EB] bg-white flex items-center justify-center text-[#2563EB] text-[11px] lg:text-[13px] font-bold z-10 relative">
                        +5k
                      </div>
                    </div>
                    <p className="font-bold text-center leading-tight text-[16px] lg:text-[18px]">Trusted Happy<br/> Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA BANNER --- */}
        <section className="w-full bg-white pb-20 pt-10 px-[4%] lg:px-[8%]">
          <div className="w-full max-w-[1340px] mx-auto rounded-[10px] relative overflow-hidden flex flex-col items-center justify-center p-8 lg:p-0 min-h-[323px] lg:aspect-[1340/323] shadow-xl text-center" style={{ background: 'linear-gradient(93.05deg, #1246B7 1.54%, #2563EB 50.01%, #0D3CA2 98.49%)' }}>
            {/* Tyre Backgrounds */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[10px]">
              {/* Left side tracks */}
              <img 
                src="/tyrestraight.svg" 
                alt="" 
                style={{ width: '254px', height: '200%', top: '-50%', left: '-60px', transform: 'rotate(-172.63deg)', opacity: 1 }} 
                className="absolute max-w-none mix-blend-overlay object-cover" 
              />
              <img 
                src="/tyrestraight.svg" 
                alt="" 
                style={{ width: '254px', height: '200%', top: '-50%', left: '80px', transform: 'rotate(-172.63deg)', opacity: 1 }} 
                className="absolute max-w-none mix-blend-overlay object-cover" 
              />
              
              {/* Right side tracks */}
              <img 
                src="/tyrestraight.svg" 
                alt="" 
                style={{ width: '254px', height: '200%', top: '-50%', right: '80px', transform: 'rotate(-172.63deg)', opacity: 1 }} 
                className="absolute max-w-none mix-blend-overlay object-cover" 
              />
              <img 
                src="/tyrestraight.svg" 
                alt="" 
                style={{ width: '254px', height: '200%', top: '-50%', right: '-60px', transform: 'rotate(-172.63deg)', opacity: 1 }} 
                className="absolute max-w-none mix-blend-overlay object-cover" 
              />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-[32px] md:text-[40px] font-bold text-white mb-3 font-outfit leading-tight">Ready to save ₹38,400 on your next car?</h2>
              <p className="text-blue-100 mb-8 text-[15px]">Join 2,400+ buyers who let dealers quote for their business.</p>
              
              <button className="bg-[#FF9441] hover:opacity-90 text-white px-8 py-3.5 rounded-full font-semibold flex items-center justify-center gap-2 mx-auto transition-opacity text-[15px] shadow-sm">
                <Plus size={18} strokeWidth={2.5} /> Post a Requirement — Free to Browse
              </button>
              
              <p className="text-blue-200/80 text-[12px] mt-6 tracking-wide font-medium">₹1,999 commitment fee only when you're ready to open your quote room</p>
            </div>
          </div>
        </section>

        {/* --- FAQ SECTION --- */}
        <section className="w-full bg-[#F8FAFC] py-20 px-[8%]">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h2 className="text-[32px] md:text-[40px] font-bold text-[#0F172A] mb-3 font-outfit text-center">Frequently Asked Questions</h2>
            <p className="text-slate-500 mb-12 text-[15px] text-center">See real purchase stories from buyers who saved through CarBounty.</p>
            
            <div className="w-full flex flex-col gap-4">
              <FAQ />
            </div>
          </div>
        </section>

      </main>
    </>
  );
}
