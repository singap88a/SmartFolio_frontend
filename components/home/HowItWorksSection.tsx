import React from 'react';
import { Palette, ArrowLeft, Wand2, Bot, Rocket, Check } from 'lucide-react';

export default function HowItWorksSection() {
  return (
    <section className="mb-24 lg:mb-32">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-[#5A4BFF] tracking-wider uppercase bg-[#5A4BFF]/10 px-3 py-1 rounded-full border border-[#5A4BFF]/20">رحلة سهلة وسريعة</span>
        <h3 className="text-2xl font-bold text-white mt-4">كيف تعمل منصة SmartFolio؟</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          ثلاث خطوات بسيطة ومباشرة تفصلك عن امتلاك موقع رقمي متكامل يعرض أعمالك بكفاءة
        </p>
      </div>

      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-6 relative">
        
        {/* البطاقة الأولى (الخطوة 1) */}
        <div className="flex-1 group bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:border-[#5A4BFF]/50 hover:bg-[#0F121E]/60 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#5A4BFF]/2 rounded-full blur-[30px]" />
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#5A4BFF]/10 border border-[#5A4BFF]/20 flex items-center justify-center text-[#5A4BFF] group-hover:scale-110 transition-transform">
              <Palette className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">1. اختر تصميمك</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              تصفح مجموعة من القوالب العصرية المصممة بعناية لتناسب مختلف المجالات والتخصصات المهنية والعملية.
            </p>
            
            {/* محاكاة اختيار قالب مصغرة */}
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-[#1E2336] space-y-2">
              <div className="flex gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A4BFF] animate-pulse" />
                <div className="w-12 h-2 bg-slate-800 rounded" />
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="h-8 rounded bg-gradient-to-tr from-[#5A4BFF]/20 to-indigo-500/20 border border-[#5A4BFF]/40" />
                <div className="h-8 rounded bg-slate-900 border border-slate-850" />
                <div className="h-8 rounded bg-slate-900 border border-slate-850" />
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1E2336]/40 text-xs font-semibold text-slate-500 group-hover:text-[#5A4BFF] transition-colors">
            ابدأ بالخطوة الأولى
          </div>
        </div>

        {/* سهم الربط الأول بين 1 و 2 (يظهر في الشاشات الكبيرة) */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#0F121E] border border-[#1E2336] flex items-center justify-center text-[#5A4BFF] shadow-lg shadow-black/40 hover:border-[#5A4BFF]/40 hover:text-white transition-all transform hover:scale-110">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </div>

        {/* البطاقة الثانية (الخطوة 2) */}
        <div className="flex-1 group bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#0F121E]/60 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/2 rounded-full blur-[30px]" />
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
              <Wand2 className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">2. الذكاء الاصطناعي يكتب عنك</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              أدخل مجال عملك أو خبراتك البسيطة، ودع الذكاء الاصطناعي الذكي يقوم بصياغة النصوص والعناوين والسيرة الذاتية فوراً.
            </p>

            {/* محاكاة الكتابة الذكية */}
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-[#1E2336] space-y-2 text-right">
              <div className="flex items-center gap-1.5">
                <Bot className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span className="text-[10px] text-slate-500">مساعد الذكاء الاصطناعي...</span>
              </div>
              <div className="space-y-1">
                <div className="h-1.5 w-11/12 bg-[#5A4BFF]/25 rounded" />
                <div className="h-1.5 w-8/12 bg-slate-800 rounded" />
                <div className="h-1.5 w-10/12 bg-slate-800 rounded animate-pulse" />
              </div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1E2336]/40 text-xs font-semibold text-slate-500 group-hover:text-indigo-400 transition-colors">
            ذكاء اصطناعي فائق
          </div>
        </div>

        {/* سهم الربط الثاني بين 2 و 3 (يظهر في الشاشات الكبيرة) */}
        <div className="hidden lg:flex items-center justify-center shrink-0">
          <div className="w-10 h-10 rounded-full bg-[#0F121E] border border-[#1E2336] flex items-center justify-center text-[#5A4BFF] shadow-lg shadow-black/40 hover:border-[#5A4BFF]/40 hover:text-white transition-all transform hover:scale-110">
            <ArrowLeft className="w-5 h-5" />
          </div>
        </div>

        {/* البطاقة الثالثة (الخطوة 3) */}
        <div className="flex-1 group bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-[#0F121E]/60 flex flex-col justify-between h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 rounded-full blur-[30px]" />
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
              <Rocket className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-white">3. انشر موقعك للعالم</h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              اختر الرابط الفرعي الخاص بك (Subdomain) واطلق موقعك بضغطة زر لتبدأ فوراً في استقبال عملائك وعرض مهاراتك.
            </p>

            {/* محاكاة نجاح النشر */}
            <div className="mt-4 p-3 bg-slate-950/60 rounded-xl border border-cyan-500/20 space-y-2 text-center">
              <div className="mx-auto w-6 h-6 rounded-full bg-emerald-500/15 flex items-center justify-center border border-emerald-500/30">
                <Check className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="h-2 w-16 bg-slate-800 rounded mx-auto" />
              <div className="text-[10px] text-cyan-400 font-mono truncate">name.smartfolio.me</div>
            </div>
          </div>
          <div className="mt-6 pt-4 border-t border-[#1E2336]/40 text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
            حضور رقمي فوري
          </div>
        </div>

      </div>
    </section>
  );
}
