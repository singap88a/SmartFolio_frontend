"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { getSubdomainUrl } from '@/lib/config';
import Button from '@/components/ui/Button';
import { 
  Sparkles, 
  Wand2, 
  Rocket, 
  Globe, 
  Palette, 
  Check, 
  Edit, 
  ArrowUpLeft, 
  Loader2, 
  Bot, 
  Layout, 
  Laptop,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

// قائمة بخطوات التوليد الوهمي للذكاء الاصطناعي لإضفاء لمسة تفاعلية فاخرة
const GENERATION_STEPS = [
  "تحليل تخصصك وصياغة الهيكل الأنسب...",
  "تنسيق الألوان وتوزيع اللمسات المضيئة...",
  "توليد العناوين والنصوص التسويقية الاحترافية...",
  "صياغة نبذة شخصية (Bio) مخصصة لمجالك...",
  "بناء موقعك الرقمي وجعله جاهزاً للانطلاق..."
];

export default function DashboardPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // حالات خاصة بمولد الذكاء الاصطناعي السحري (Interactive AI Mock Preview)
  const [specialization, setSpecialization] = useState("");
  const [generationState, setGenerationState] = useState<"idle" | "generating" | "completed">("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [generatedResult, setGeneratedResult] = useState<any>(null);

  // جلب بيانات موقع المستخدم إن وجدت
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (data) setPortfolio(data);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) loadData();
    else setIsLoading(false);
  }, [user]);

  // محاكاة خطوات التوليد السحرية بالذكاء الاصطناعي
  useEffect(() => {
    let interval: any;
    if (generationState === "generating") {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < GENERATION_STEPS.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            // إعداد النتيجة المفترضة بناء على التخصص الذي أدخله المستخدم
            const specLower = specialization.toLowerCase();
            let name = "أحمد خالد";
            let role = specialization || "مطور برمجيات";
            let bio = "أقوم بتحويل الأفكار والتحديات البرمجية المعقدة إلى واجهات رقمية سلسة وتطبيقات فائقة الأداء تناسب احتياجات عملائك.";
            let services = ["برمجة وتطوير الويب", "تصميم واجهات المستخدم UI/UX", "تحسين الأداء والحماية"];

            if (specLower.includes("تصميم") || specLower.includes("مصمم") || specLower.includes("design") || specLower.includes("ui") || specLower.includes("ux")) {
              name = "سارة عبد الرحمن";
              role = "مصممة واجهات وتجربة المستخدم (UI/UX)";
              bio = "أبتكر تصاميم رقمية متميزة ترتكز على سهولة الاستخدام وجمال التفاصيل لتمنح عملائك تجربة لا تُنسى.";
              services = ["تصميم واجهات الويب وتطبيقات الجوال", "هندسة وتخطيط تجربة المستخدم", "بناء الأنظمة البصرية والهويات الرقمية"];
            } else if (specLower.includes("برمج") || specLower.includes("مطور") || specLower.includes("ويب") || specLower.includes("developer") || specLower.includes("code")) {
              name = "خالد مصطفى";
              role = "مطور تطبيقات ويب متكاملة (Full-Stack)";
              bio = "أصمم وأبني خوادم قوية وواجهات سريعة التجاوب باستخدام أحدث التقنيات البرمجية لتجسيد أفكارك على أرض الواقع.";
              services = ["برمجة React & Next.js", "تطوير قواعد البيانات والـ APIs", "تحسين محركات البحث SEO"];
            }

            setGeneratedResult({ name, role, bio, services });
            setGenerationState("completed");
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [generationState, specialization]);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!specialization.trim()) return;
    setGenerationState("generating");
    setCurrentStepIndex(0);
    setGeneratedResult(null);
  };

  const portfolioUrl = user?.subdomain ? getSubdomainUrl(user.subdomain) : null;

  return (
    <div dir="rtl" className="font-cairo flex-1 flex flex-col min-h-full bg-[#0B0F19] overflow-y-auto custom-scrollbar p-6 lg:p-12 pb-24 text-slate-200 selection:bg-[#5A4BFF]/30 selection:text-white">
      
      {/* سكشن الترحيب الفاخر والأنيق */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16 relative">
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#5A4BFF]/5 rounded-full blur-[80px] pointer-events-none" />
        <div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#5A4BFF]/10 to-cyan-500/10 text-[#5A4BFF] border border-[#5A4BFF]/20 backdrop-blur-sm">
            لوحة التحكم الذكية
          </span>
          <h1 className="text-3xl font-extrabold tracking-tight text-white mt-3 flex items-center gap-3">
            مرحباً بك، {user?.username || "شريكنا العزيز"} 👋
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
            من هنا يمكنك بدء رحلتك في بناء وتعديل هويتك الرقمية الراقية والظهور باحترافية أمام عملائك.
          </p>
        </div>
      </header>

      {/* القسم الأول: سكشن الترحيب والانطلاق الذكي (Hero Dashboard Section) */}
      <section className="relative bg-[#0F121E]/60 backdrop-blur-xl border border-[#1E2336] rounded-3xl p-8 lg:p-12 mb-16 overflow-hidden shadow-2xl">
        {/* أضواء خلفية متوهجة */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5A4BFF]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* الجانب الأيمن: النصوص وزر البناء */}
          <div className="lg:col-span-7 space-y-6 text-right">
            <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight">
              مرحباً بك في مركز إطلاق <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-l from-cyan-400 via-indigo-400 to-[#5A4BFF]">
                هويتك الرقمية المتكاملة
              </span>
            </h2>
            <p className="text-slate-400 text-base leading-relaxed max-w-xl">
              منصتنا تساعدك على بناء موقعك الشخصي وصفحة هبوطك الاحترافية في دقيقة واحدة باستخدام الذكاء الاصطناعي، بدون أي خبرة في البرمجة.
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
              <div className="absolute w-[280px] h-[190px] bg-slate-950/80 border border-[#1E2336] rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 hover:scale-105">
                {/* شريط المتصفح */}
                <div className="h-6 bg-[#0F121E] border-b border-[#1E2336] flex items-center px-3 gap-1.5 justify-start">
                  <div className="w-2 h-2 rounded-full bg-rose-500/80" />
                  <div className="w-2 h-2 rounded-full bg-amber-500/80" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/80" />
                  <div className="w-24 h-3 bg-slate-900 rounded ml-2" />
                </div>
                {/* محتوى نافذة المتصفح */}
                <div className="p-4 space-y-3">
                  <div className="w-12 h-1.5 bg-[#5A4BFF]/80 rounded" />
                  <div className="w-3/4 h-3 bg-slate-800 rounded mt-2" />
                  <div className="w-1/2 h-2 bg-slate-800 rounded" />
                  <div className="flex gap-2 pt-2">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336]" />
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336]" />
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336]" />
                  </div>
                  <div className="w-full h-8 bg-[#5A4BFF]/10 border border-[#5A4BFF]/20 rounded-lg flex items-center justify-center">
                    <div className="w-1/3 h-1.5 bg-[#5A4BFF] rounded" />
                  </div>
                </div>
              </div>

              {/* بطاقة الذكاء الاصطناعي العائمة في الأعلى واليمين */}
              <div className="absolute top-4 -right-2 w-[160px] bg-[#0F121E]/90 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-3.5 shadow-2xl flex items-center gap-3 animate-bounce [animation-duration:4s]">
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
              <div className="absolute bottom-2 -left-2 w-[100px] h-[160px] bg-slate-950/90 border border-cyan-500/30 rounded-2xl shadow-2xl p-2 flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-2">
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

      {/* القسم الثاني: كيف نساعدك؟ (The 3-Step Flow) */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">رحلة سهلة وسريعة</span>
          <h3 className="text-2xl font-bold text-white mt-2">كيف تعمل منصة SmartFolio؟</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* البطاقة الأولى */}
          <div className="group bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:border-[#5A4BFF]/50 hover:bg-[#0F121E]/60 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#5A4BFF]/2 rounded-full blur-[30px]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-[#5A4BFF]/10 border border-[#5A4BFF]/20 flex items-center justify-center text-[#5A4BFF] group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">1. اختر تصميمك</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                تصفح مجموعة من القوالب العصرية المصممة بعناية لتناسب مختلف المجالات والتخصصات المهنية والعملية.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1E2336]/40 text-xs font-semibold text-slate-500 group-hover:text-[#5A4BFF] transition-colors">
              ابدأ بالخطوة الأولى
            </div>
          </div>

          {/* البطاقة الثانية */}
          <div className="group bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:border-indigo-500/50 hover:bg-[#0F121E]/60 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/2 rounded-full blur-[30px]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Wand2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">2. الذكاء الاصطناعي يكتب عنك</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                أدخل مجال عملك أو خبراتك البسيطة، ودع الذكاء الاصطناعي الذكي يقوم بصياغة النصوص والعناوين والسيرة الذاتية فوراً.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1E2336]/40 text-xs font-semibold text-slate-500 group-hover:text-indigo-400 transition-colors">
              ذكاء اصطناعي فائق
            </div>
          </div>

          {/* البطاقة الثالثة */}
          <div className="group bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:border-cyan-500/50 hover:bg-[#0F121E]/60 flex flex-col justify-between h-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/2 rounded-full blur-[30px]" />
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <Rocket className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-white">3. انشر موقعك للعالم</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                اختر الرابط الفرعي الخاص بك (Subdomain) واطلق موقعك بضغطة زر لتبدأ فوراً في استقبال عملائك وعرض مهاراتك.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#1E2336]/40 text-xs font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors">
              حضور رقمي فوري
            </div>
          </div>

        </div>
      </section>

      {/* القسم الثالث: لوحة التحكم بالذكاء الاصطناعي (AI Quick Generator Preview) */}
      <section className="relative bg-[#0F121E]/60 backdrop-blur-xl border border-[#1E2336] rounded-3xl p-8 lg:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 left-0 w-80 h-80 bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-3xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold">
            <Bot className="w-3.5 h-3.5" />
            التجربة التفاعلية
          </div>
          
          <h3 className="text-2xl font-bold text-white">المولد السحري السريع للذكاء الاصطناعي</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-xl mx-auto">
            اكتب تخصصك هنا (مثلاً: مصمم واجهات، مطور برمجيات، مصور فوتوغرافي) لترى كيف يمكن للذكاء الاصطناعي صياغة وتوزيع الهيكل الكامل لموقعك في ثوانٍ معدودة.
          </p>

          {/* حقل الإدخال وزر التوليد */}
          <form onSubmit={handleGenerate} className="flex flex-col sm:flex-row gap-3 items-stretch max-w-lg mx-auto">
            <input 
              type="text" 
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              placeholder="أدخل تخصصك هنا..."
              className="flex-1 px-4 py-3 bg-[#0A0D14]/75 border border-[#1E2336] rounded-2xl text-slate-200 placeholder:text-slate-650 focus:outline-none focus:border-[#5A4BFF] focus:ring-2 focus:ring-[#5A4BFF]/20 text-sm transition-all"
              disabled={generationState === "generating"}
            />
            <button 
              type="submit" 
              className="px-6 py-3 bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white text-sm font-bold rounded-2xl transition-all shadow-[0_0_15px_rgba(90,75,255,0.25)] flex items-center justify-center gap-2 hover:scale-102 shrink-0 disabled:opacity-50"
              disabled={generationState === "generating" || !specialization.trim()}
            >
              {generationState === "generating" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  جاري التوليد...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-cyan-300" />
                  توليد بواسطة AI
                </>
              )}
            </button>
          </form>

          {/* شريط التحميل لمحاكاة الذكاء الاصطناعي */}
          {generationState === "generating" && (
            <div className="max-w-md mx-auto space-y-3 mt-8 p-6 bg-slate-950/40 border border-[#1E2336] rounded-2xl text-right animate-pulse">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400">خطوة المعالجة الحالية:</span>
                <span className="text-[#5A4BFF] font-bold">{Math.round(((currentStepIndex + 1) / GENERATION_STEPS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#1E2336] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-l from-[#5A4BFF] to-cyan-400 transition-all duration-500 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / GENERATION_STEPS.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#5A4BFF] font-bold transition-all duration-300 flex items-center gap-2">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                {GENERATION_STEPS[currentStepIndex]}
              </p>
            </div>
          )}

          {/* بطاقة النتائج الناتجة من الذكاء الاصطناعي كمعاينة حية مذهلة */}
          {generationState === "completed" && generatedResult && (
            <div className="max-w-2xl mx-auto mt-8 bg-slate-950/60 border-2 border-indigo-500/20 rounded-3xl p-6 lg:p-8 text-right shadow-2xl relative animate-fadeIn">
              {/* تأثير توهج على أطراف البطاقة */}
              <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-gradient-to-tr from-[#5A4BFF]/10 to-cyan-400/10 rounded-3xl -z-10 blur-sm" />
              
              <div className="flex items-center justify-between border-b border-[#1E2336] pb-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                    <Layout className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">معاينة تصميمك السحري</h4>
                    <p className="text-[10px] text-slate-500">تم بناؤه بالكامل بواسطة SmartFolio AI</p>
                  </div>
                </div>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> جاهز للنشر
                </span>
              </div>

              {/* الهيكل التجريبي المولد */}
              <div className="space-y-6">
                <div>
                  <span className="text-[10px] font-bold text-[#5A4BFF] uppercase tracking-widest">قسم الترحيب والـ Hero</span>
                  <h5 className="text-xl font-extrabold text-white mt-1">{generatedResult.role}</h5>
                  <p className="text-slate-400 text-xs leading-relaxed mt-2 bg-slate-900/40 p-3 rounded-xl border border-[#1E2336]/40">
                    {generatedResult.bio}
                  </p>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#5A4BFF] uppercase tracking-widest">الخدمات المهنية المقترحة</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                    {generatedResult.services.map((service: string, index: number) => (
                      <div key={index} className="bg-[#0F121E]/60 border border-[#1E2336] p-3 rounded-xl text-center flex items-center justify-center gap-2 hover:border-indigo-500/30 transition-all">
                        <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-xs font-semibold text-slate-200">{service}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* دعوة للإجراء بعد تجربة المولد */}
              <div className="mt-8 pt-6 border-t border-[#1E2336]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-xs text-slate-450">هل أعجبتك هذه النتيجة؟ اطلق موقعك الحقيقي الآن مع تحكم كامل بالبيانات والألوان.</p>
                <Link href="/templates" className="shrink-0">
                  <button className="px-5 py-2.5 bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white text-xs font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(90,75,255,0.2)] flex items-center gap-2">
                    ابدأ موقعك الحقيقي
                    <ArrowRight className="w-3.5 h-3.5 rotate-180" />
                  </button>
                </Link>
              </div>

            </div>
          )}

        </div>
      </section>

    </div>
  );
}
