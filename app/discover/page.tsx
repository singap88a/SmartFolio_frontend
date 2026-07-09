import React from 'react';
import Link from 'next/link';
import { Sparkles, LayoutTemplate, Rocket, Code2, ArrowRight } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function DiscoverPage() {
  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto h-full overflow-y-auto">
      
      {/* Hero Section */}
      <div className="relative bg-[#0F121E] rounded-3xl border border-[#1E2336] p-10 md:p-16 mb-12 overflow-hidden shadow-2xl">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5A4BFF] opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500 opacity-10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#5A4BFF]/10 text-[#5A4BFF] font-semibold text-sm mb-6 border border-[#5A4BFF]/20">
              <Sparkles size={16} />
              Welcome to SmartFolio
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Build your <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#5A4BFF] to-purple-400">digital identity</span> in minutes.
            </h1>
            <p className="text-lg text-slate-400 mb-8 max-w-xl leading-relaxed mx-auto md:mx-0">
              SmartFolio is the ultimate platform to showcase your skills, projects, and professional experience. Start with a stunning template and customize it endlessly without writing code.
            </p>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link href="/templates">
                <Button className="bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 h-14 px-8 rounded-xl text-lg gap-2 group">
                  Explore Templates 
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/">
                <Button className="bg-[#1E2336] hover:bg-[#2A3047] text-white border border-[#2A3047] h-14 px-8 rounded-xl text-lg">
                  My Dashboard
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="hidden md:flex flex-1 justify-center relative">
            <div className="w-64 h-80 bg-gradient-to-br from-[#5A4BFF] to-purple-600 rounded-2xl transform rotate-6 shadow-2xl relative">
               <div className="absolute inset-2 bg-[#0F121E] rounded-xl p-4 flex flex-col gap-4">
                  <div className="w-12 h-12 bg-[#1E2336] rounded-full"></div>
                  <div className="space-y-2">
                    <div className="h-4 w-3/4 bg-[#1E2336] rounded"></div>
                    <div className="h-4 w-1/2 bg-[#1E2336] rounded"></div>
                  </div>
                  <div className="h-24 w-full bg-[#1E2336] rounded-xl mt-auto"></div>
               </div>
            </div>
            <div className="w-64 h-80 bg-[#1E2336] rounded-2xl transform -rotate-6 shadow-2xl absolute -left-8 -bottom-8 border border-[#2A3047]">
               <div className="p-6 h-full flex flex-col justify-end">
                  <div className="h-32 w-full bg-gradient-to-t from-[#5A4BFF] to-transparent rounded-xl opacity-20"></div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-white mb-6">Why SmartFolio?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0F121E] p-8 rounded-2xl border border-[#1E2336] hover:border-[#5A4BFF] transition-colors group">
            <div className="w-12 h-12 bg-[#5A4BFF]/10 text-[#5A4BFF] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LayoutTemplate size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Premium Designs</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Choose from a variety of professionally crafted templates that look amazing on every device and screen size.
            </p>
          </div>
          
          <div className="bg-[#0F121E] p-8 rounded-2xl border border-[#1E2336] hover:border-[#5A4BFF] transition-colors group">
            <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Publishing</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Claim your unique subdomain and publish your portfolio to the world instantly with a single click. No hosting required.
            </p>
          </div>
          
          <div className="bg-[#0F121E] p-8 rounded-2xl border border-[#1E2336] hover:border-[#5A4BFF] transition-colors group">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Code2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">No Code Needed</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our intuitive dashboard lets you manage all your content, links, and styling without needing to write a single line of code.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
