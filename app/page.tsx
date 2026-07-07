import React from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function LandingPage() {
  return (
    <div className="flex flex-col bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-brand-500/10 blur-[150px] rounded-full animate-pulse"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-indigo-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs font-bold mb-8 border border-slate-200 dark:border-slate-800 shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping"></span>
            TRUSTED BY 10,000+ CREATIVES
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 dark:text-white mb-8 leading-[0.9]">
            YOUR WORK <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">DESERVES BETTER.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed">
            Stop wasting time on complex builders. Portfolify gives you high-end, professional templates that launch in seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto h-16 px-12 text-lg shadow-2xl shadow-brand-500/40">Get Started Now</Button>
            </Link>
            <Link href="/templates">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-16 px-12 text-lg border-2">Explore Templates</Button>
            </Link>
          </div>

          {/* Interactive Preview Container */}
          <div className="mt-32 relative max-w-6xl mx-auto">
            <div className="absolute -inset-2 bg-gradient-to-r from-brand-500 via-indigo-500 to-purple-600 rounded-[2.5rem] blur-2xl opacity-20"></div>
            <div className="relative bg-white dark:bg-slate-900 rounded-[2rem] p-4 shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="bg-slate-50 dark:bg-slate-950 rounded-[1.5rem] overflow-hidden aspect-video border border-slate-200 dark:border-slate-800">
                <img 
                  src="/dashboard_preview.png" 
                  alt="Portfolify Dashboard Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <div className="py-12 border-y border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale contrast-125">
          {['GOOGLE', 'VERCEL', 'STRIPE', 'AIRBNB', 'SLACK'].map(brand => (
            <span key={brand} className="text-2xl font-black tracking-widest">{brand}</span>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                Designed for the <br />
                <span className="text-indigo-600">modern professional.</span>
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Whether you're a developer, designer, or executive, our templates are crafted to showcase your skills with maximum impact. No compromise on quality.
              </p>
              <div className="space-y-6">
                {[
                  "Dynamic Live Preview Engine",
                  "SEO Optimized Portfolios",
                  "Custom Domain Integration",
                  "Responsive on Every Device"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-slate-900 dark:text-white font-bold">
                    <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6 pt-12">
                <div className="aspect-square bg-indigo-600 rounded-3xl p-8 flex flex-col justify-end text-white shadow-xl">
                  <span className="text-4xl font-black mb-2">99%</span>
                  <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Satisfaction</span>
                </div>
                <div className="aspect-[3/4] bg-slate-900 rounded-3xl p-8 flex flex-col justify-end text-white shadow-xl">
                  <span className="text-4xl font-black mb-2">24/7</span>
                  <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Support</span>
                </div>
              </div>
              <div className="space-y-6">
                <div className="aspect-[3/4] bg-indigo-500 rounded-3xl p-8 flex flex-col justify-end text-white shadow-xl">
                  <span className="text-4xl font-black mb-2">50+</span>
                  <span className="text-sm font-bold opacity-80 uppercase tracking-widest">Templates</span>
                </div>
                <div className="aspect-square bg-slate-100 dark:bg-slate-800 rounded-3xl p-8 flex flex-col justify-end border border-slate-200 dark:border-slate-700 shadow-xl">
                  <span className="text-4xl font-black mb-2 text-slate-900 dark:text-white">10k+</span>
                  <span className="text-sm font-bold text-slate-500 uppercase tracking-widest">Users</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 max-w-7xl mx-auto px-6 mb-32">
        <div className="relative bg-slate-900 rounded-[3rem] p-16 md:p-24 overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
          
          <h2 className="text-5xl md:text-7xl font-black text-white mb-8 relative z-10 leading-none">
            READY TO <br />
            LEVEL UP?
          </h2>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 relative z-10 font-medium">
            Join thousands of professionals who have already launched their stunning portfolios. Your future starts here.
          </p>
          <Link href="/register" className="relative z-10">
            <Button variant="secondary" size="lg" className="h-20 px-16 text-xl font-black uppercase tracking-widest rounded-2xl shadow-2xl bg-white text-slate-900 hover:bg-slate-100 border-none">
              Create My Portfolio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
