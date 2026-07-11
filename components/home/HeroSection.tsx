import React from 'react';
import Link from 'next/link';
import { Sparkles, Edit, Globe, ArrowUpLeft, Bot } from 'lucide-react';

interface HeroSectionProps {
  user: any;
  portfolio: any;
  portfolioUrl: string | null;
}

export default function HeroSection({ user, portfolio, portfolioUrl }: HeroSectionProps) {
  return (
    <section className="relative bg-[#0F121E]/60 backdrop-blur-xl border border-[#1E2336] rounded-3xl p-8 lg:p-12 mb-24 lg:mb-32 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#5A4BFF]/20">
      {/* أضواء خلفية متوهجة عريضة */}
      <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-gradient-to-bl from-[#5A4BFF]/15 to-transparent rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-gradient-to-tr from-cyan-500/10 to-transparent rounded-full blur-[130px] pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* الجانب الأيمن: النصوص وزر البناء */}
        <div className="lg:col-span-7 space-y-6 text-right">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5A4BFF]/10 border border-[#5A4BFF]/20 text-[#5A4BFF] text-xs font-extrabold mb-2 hover:bg-[#5A4BFF]/15 transition-all">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            الجيل القادم من منصات إنشاء مواقع الأعمال
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-black text-white leading-tight">
            أهلاً بك{user?.username ? ` يا ${user.username}` : ""} في منصة <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-indigo-400 to-[#5A4BFF]">
              SmartFolio
            </span>
          </h2>
          <p className="text-slate-450 text-base lg:text-lg leading-relaxed max-w-xl font-normal text-slate-300">
            منصتنا تساعدك على بناء موقعك الشخصي وصفحة هبوطك الاحترافية في دقيقة واحدة باستخدام الذكاء الاصطناعي، بدون أي خبرة مسبقة في البرمجة أو التصميم.
          </p>
          
          <div className="pt-4 flex flex-wrap gap-4">
            {portfolio ? (
              <>
                <Link href="/create">
                  <button className="px-8 py-4 bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(90,75,255,0.35)] hover:shadow-[0_0_35px_rgba(90,75,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5">
                    <Edit className="w-5 h-5" />
                    تعديل موقعك الحالي
                  </button>
                </Link>
                {portfolioUrl && (
                  <a href={portfolioUrl} target="_blank" rel="noopener noreferrer">
                    <button className="px-8 py-4 bg-slate-900/60 hover:bg-slate-800/80 text-cyan-400 border border-[#1E2336] font-bold rounded-2xl shadow-inner transition-all duration-300 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-cyan-400" />
                      زيارة الموقع
                      <ArrowUpLeft className="w-4 h-4 text-slate-500" />
                    </button>
                  </a>
                )}
              </>
            ) : (
              <Link href="/templates">
                <button className="px-8 py-4 bg-gradient-to-l from-[#5A4BFF] to-indigo-600 hover:from-[#4B3DE6] hover:to-indigo-500 text-white font-bold rounded-2xl shadow-[0_0_25px_rgba(90,75,255,0.4)] hover:shadow-[0_0_35px_rgba(90,75,255,0.6)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-2.5">
                  <Sparkles className="w-5 h-5 text-cyan-300 animate-pulse" />
                  ابدأ بناء موقعك الآن
                </button>
              </Link>
            )}
          </div>
        </div>

        {/* الجانب الأيسر: مجسم جرافيكي متوهج لموقع إنترنت مبني بالكامل بـ CSS */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative w-full max-w-[360px] h-[280px] flex items-center justify-center">
            {/* توهج خلفي للموك أب */}
            <div className="absolute inset-0 bg-gradient-to-tr from-[#5A4BFF]/20 to-cyan-400/20 rounded-full blur-[60px] animate-pulse" />

            {/* النافذة الرئيسية للموقع */}
            <div className="absolute w-[280px] h-[190px] bg-slate-950/80 border border-[#1E2336] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:scale-105 hover:border-[#5A4BFF]/40 hover:shadow-[0_20px_50px_rgba(90,75,255,0.25)] group">
              {/* شريط المتصفح */}
              <div className="h-6 bg-[#0F121E] border-b border-[#1E2336] flex items-center px-3 gap-1.5 justify-start">
                <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                <div className="w-24 h-3 bg-slate-900 rounded ml-2" />
              </div>
              {/* محتوى نافذة المتصفح */}
              <div className="p-4 space-y-3">
                <div className="w-12 h-1.5 bg-[#5A4BFF]/80 rounded group-hover:bg-[#5A4BFF] transition-colors" />
                <div className="w-3/4 h-3 bg-slate-800 rounded mt-2" />
                <div className="w-1/2 h-2 bg-slate-800 rounded" />
                <div className="flex gap-2 pt-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336]" />
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336]" />
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336]" />
                </div>
                <div className="w-full h-8 bg-[#5A4BFF]/10 border border-[#5A4BFF]/25 rounded-lg flex items-center justify-center group-hover:bg-[#5A4BFF]/15 transition-all">
                  <div className="w-1/3 h-1.5 bg-[#5A4BFF] rounded" />
                </div>
              </div>
            </div>

            {/* بطاقة الذكاء الاصطناعي العائمة في الأعلى واليمين */}
            <div className="absolute top-4 -right-2 w-[160px] bg-[#0F121E]/95 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-bounce [animation-duration:4s] hover:border-indigo-400 transition-all">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="flex-1 space-y-1">
                <div className="w-10 h-1 bg-[#5A4BFF] rounded" />
                <div className="w-16 h-1.5 bg-slate-700 rounded" />
                <div className="w-12 h-1 bg-slate-800 rounded" />
              </div>
            </div>

            {/* بطاقة الجوال العائمة في الأسفل واليسار */}
            <div className="absolute bottom-2 -left-2 w-[100px] h-[160px] bg-slate-950/95 border border-cyan-500/30 rounded-2xl shadow-2xl p-2 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-cyan-400/60 hover:shadow-[0_15px_30px_rgba(6,182,212,0.15)]">
              <div className="w-6 h-1 bg-slate-850 rounded-full mx-auto mb-2" />
              <div className="flex-1 space-y-2">
                <div className="w-full h-10 bg-gradient-to-tr from-[#5A4BFF]/20 to-cyan-500/20 rounded-lg" />
                <div className="w-3/4 h-1.5 bg-slate-800 rounded" />
                <div className="w-1/2 h-1 bg-slate-800 rounded" />
                <div className="w-full h-5 bg-cyan-500/10 border border-cyan-500/20 rounded" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
