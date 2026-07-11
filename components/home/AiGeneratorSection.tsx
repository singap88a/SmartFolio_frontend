import React, { useState } from 'react';
import Link from 'next/link';
import { Loader2, Wand2, Bot, Check } from 'lucide-react';
import { fetchApi } from '@/lib/api';

const GENERATION_STEPS = [
  "تحليل تخصصك وصياغة الهيكل الأنسب...",
  "تنسيق الألوان وتوزيع اللمسات المضيئة...",
  "توليد العناوين والنصوص التسويقية الاحترافية...",
  "صياغة نبذة شخصية (Bio) مخصصة لمجالك...",
  "بناء موقعك الرقمي وجعله جاهزاً للانطلاق..."
];

interface AiGeneratorSectionProps {
  user: any;
}

export default function AiGeneratorSection({ user }: AiGeneratorSectionProps) {
  const [description, setDescription] = useState("");
  const [generationState, setGenerationState] = useState<"idle" | "generating" | "completed">("idle");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  
  const [generatedResult, setGeneratedResult] = useState<any>({
    name: user?.username || "أحمد خالد",
    role: "مطور تطبيقات ويب متكاملة (Full-Stack)",
    bio: "أصمم وأبني خوادم قوية وواجهات سريعة التجاوب باستخدام أحدث التقنيات البرمجية لتجسيد أفكارك على أرض الواقع.",
    services: ["برمجة React & Next.js", "تطوير قواعد البيانات والـ APIs", "تحسين محركات البحث SEO"]
  });

  const [mockStyle, setMockStyle] = useState<"neon" | "velvet" | "minimal">("neon");

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    
    setGenerationState("generating");
    setCurrentStepIndex(0);

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      currentStep++;
      if (currentStep < GENERATION_STEPS.length - 1) {
        setCurrentStepIndex(currentStep);
      }
    }, 1500);

    try {
      // نرسل تعليمة صريحة للذكاء الاصطناعي لكي يقوم بـ "صياغة" نبذة احترافية بدلاً من نسخ النص كما هو
      const enhancedPrompt = `قم بصياغة نبذة شخصية (Bio) احترافية جداً وجذابة للعملاء باللغة العربية (أو الإنجليزية حسب لغة الإدخال)، واستنتج المسمى الوظيفي الدقيق، والخدمات بناءً على هذه المعطيات العامية أو البسيطة: "${description}"`;

      const response = await fetchApi('/ai/generate-portfolio', {
        method: 'POST',
        body: JSON.stringify({ text: enhancedPrompt }),
      });

      clearInterval(stepInterval);
      setCurrentStepIndex(GENERATION_STEPS.length - 1);

      setTimeout(() => {
        setGenerationState("completed");
        if (response && response.data) {
          setGeneratedResult({
            name: response.data.name || user?.username || "أحمد خالد",
            role: response.data.jobTitle || "مستقل محترف",
            bio: response.data.bio || description,
            services: response.data.services?.map((s: any) => s.title) || ["تصميم واجهات", "تطوير ويب", "تطوير تطبيقات"]
          });
        } else {
          setGeneratedResult({
            name: user?.username || "أحمد خالد",
            role: "مستقل محترف",
            bio: description,
            services: ["تصميم واجهات", "تطوير ويب", "تطوير تطبيقات"]
          });
        }
      }, 1000);
    } catch (error) {
      console.error("AI Generation failed:", error);
      clearInterval(stepInterval);
      setGenerationState("completed");
      setGeneratedResult({
        name: user?.username || "أحمد خالد",
        role: "مستقل محترف",
        bio: description,
        services: ["تصميم واجهات", "تطوير ويب", "تطوير تطبيقات"]
      });
    }
  };

  return (
    <section className="mb-24 lg:mb-32 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#5A4BFF]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="text-center mb-10">
        <span className="text-xs font-bold text-[#5A4BFF] tracking-wider uppercase bg-[#5A4BFF]/10 px-3 py-1 rounded-full border border-[#5A4BFF]/20">التجربة التفاعلية</span>
        <h3 className="text-2xl font-bold text-white mt-4">المولد السحري السريع للذكاء الاصطناعي</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          اكتب وصفاً عنك واختر نمط التصميم لترى كيف يقوم الذكاء الاصطناعي ببناء هويتك الرقمية وتوزيع الأقسام فوراً وبشكل حي
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes laserScan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(340px); opacity: 0; }
        }
        .animate-scan {
          animation: laserScan 2.5s infinite linear;
        }
      `}} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto px-4 lg:px-0">
        {/* لوحة التحكم الذكية */}
        <div className="lg:col-span-5 bg-[#0F121E]/60 backdrop-blur-xl border border-[#1E2336] rounded-3xl p-6 flex flex-col justify-between space-y-6 shadow-xl relative z-10">
          <div className="space-y-4 text-right">
            <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider">1. اختر نمط التصميم واللون</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "neon", name: "نيون عصري", activeClass: "border-[#5A4BFF] bg-[#5A4BFF]/10 text-white", inactiveClass: "border-[#1E2336] bg-slate-950/40 text-slate-400 hover:text-white" },
                { id: "velvet", name: "مخملي إبداعي", activeClass: "border-purple-500 bg-purple-500/10 text-white", inactiveClass: "border-[#1E2336] bg-slate-950/40 text-slate-400 hover:text-white" },
                { id: "minimal", name: "بسيط هادئ", activeClass: "border-emerald-500 bg-emerald-500/10 text-white", inactiveClass: "border-[#1E2336] bg-slate-950/40 text-slate-400 hover:text-white" }
              ].map((style) => (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => setMockStyle(style.id as any)}
                  className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                    mockStyle === style.id ? style.activeClass : style.inactiveClass
                  }`}
                >
                  {style.name}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleGenerate} className="space-y-4 text-right">
            <div>
              <label className="block text-xs font-bold text-slate-350 uppercase tracking-wider mb-2">2. أدخل نبذة مختصرة عنك</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="مثلاً: أنا مصمم واجهات مستخدم بخبرة 5 سنوات، مهتم بتطوير تجارب استخدام استثنائية..."
                className="w-full px-4 py-3.5 bg-slate-950/60 border border-[#1E2336] rounded-xl text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-[#5A4BFF] text-sm transition-all resize-none h-24 custom-scrollbar"
                disabled={generationState === "generating"}
              />
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white text-sm font-bold rounded-xl transition-all shadow-[0_4px_20px_rgba(90,75,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={generationState === "generating" || !description.trim()}
            >
              {generationState === "generating" ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span>جاري تحديث هيكل الموقع...</span>
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 text-cyan-300" />
                  <span>توليد وتحديث الموقع</span>
                </>
              )}
            </button>
          </form>

          {/* شريط التحميل لمحاكاة الخطوات */}
          {generationState === "generating" ? (
            <div className="p-4 bg-slate-950/40 border border-[#1E2336] rounded-2xl text-right space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-slate-400 font-medium">خطوة المعالجة:</span>
                <span className="text-[#5A4BFF] font-bold">{Math.round(((currentStepIndex + 1) / GENERATION_STEPS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-[#1E2336] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-l from-[#5A4BFF] to-cyan-400 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStepIndex + 1) / GENERATION_STEPS.length) * 100}%` }}
                />
              </div>
              <p className="text-xs text-[#5A4BFF] font-bold flex items-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                {GENERATION_STEPS[currentStepIndex]}
              </p>
            </div>
          ) : (
            <div className="p-4 bg-[#5A4BFF]/5 border border-[#5A4BFF]/10 rounded-2xl text-right">
              <p className="text-xs text-slate-400 leading-relaxed">
                💡 <strong>تلميح:</strong> يمكنك تغيير النمط (مثلاً: نيون، مخملي، بسيط) لرؤية كيف يتغير قالب المعاينة فوراً بألوان وهويات بصرية مختلفة.
              </p>
            </div>
          )}
        </div>

        {/* لوحة المعاينة التفاعلية الحية */}
        <div className="lg:col-span-7 flex items-center justify-center relative z-10">
          {(() => {
            const getStyleConfig = () => {
              switch (mockStyle) {
                case "velvet":
                  return {
                    accentColor: "text-purple-400",
                    accentBg: "bg-purple-500/10 border-purple-500/20 text-purple-400",
                    buttonBg: "bg-gradient-to-l from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500",
                    glowColor: "from-purple-500/10 to-pink-500/5",
                    dotColor: "border-purple-500",
                    badgeText: "تصميم مخملي إبداعي",
                    borderHover: "hover:border-purple-500/30"
                  };
                case "minimal":
                  return {
                    accentColor: "text-emerald-400",
                    accentBg: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400",
                    buttonBg: "bg-slate-800 hover:bg-slate-700 text-white",
                    glowColor: "from-emerald-500/5 to-slate-900/10",
                    dotColor: "border-emerald-400",
                    badgeText: "تصميم هادئ بسيط",
                    borderHover: "hover:border-emerald-500/30"
                  };
                default: // neon
                  return {
                    accentColor: "text-cyan-400",
                    accentBg: "bg-[#5A4BFF]/10 border-[#5A4BFF]/20 text-cyan-400",
                    buttonBg: "bg-gradient-to-l from-[#5A4BFF] to-cyan-600 hover:from-[#4B3DE6] hover:to-cyan-500",
                    glowColor: "from-[#5A4BFF]/10 to-cyan-500/5",
                    dotColor: "border-[#5A4BFF]",
                    badgeText: "تصميم نيون عصري",
                    borderHover: "hover:border-[#5A4BFF]/30"
                  };
              }
            };
            const styleCfg = getStyleConfig();

            return (
              <div className={`relative bg-slate-950/80 border border-[#1E2336] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ${styleCfg.borderHover} flex flex-col h-[400px] w-full group`}>
                {/* Browser Bar */}
                <div className="h-9 bg-[#0F121E] border-b border-[#1E2336] flex items-center px-4 justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="bg-slate-900/80 text-[10px] text-slate-500 px-6 py-1 rounded-md border border-[#1E2336]/60 font-mono">
                    ahmed.smartfolio.me
                  </div>
                  <div className="w-8" />
                </div>

                {/* Interactive Mockup Web Content */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 relative text-right">
                  {/* Glowing backdrop circle */}
                  <div className={`absolute top-0 right-12 w-48 h-48 bg-gradient-to-bl ${styleCfg.glowColor} rounded-full blur-[60px] pointer-events-none`} />

                  {/* Laser scanning line when generating */}
                  {generationState === "generating" && (
                    <div className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#5A4BFF] to-transparent shadow-[0_0_10px_rgba(90,75,255,0.8)] animate-scan z-30" />
                  )}

                  <div className="space-y-6 relative z-10">
                    {/* Mini Header / Profile Card */}
                    <div className="flex items-center justify-between border-b border-[#1E2336]/40 pb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-full bg-gradient-to-tr from-slate-900 to-slate-950 border-2 border-dashed ${styleCfg.dotColor} flex items-center justify-center font-bold text-xs text-white`}>
                          {generatedResult ? generatedResult.name[0] : "أ"}
                        </div>
                        <div className="text-right">
                          <div className="text-[11px] font-bold text-white leading-none">{generatedResult ? generatedResult.name : "أحمد خالد"}</div>
                          <div className="text-[9px] text-slate-550 mt-1 leading-none">متاح للعمل الحر</div>
                        </div>
                      </div>
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md border ${styleCfg.accentBg}`}>
                        {styleCfg.badgeText}
                      </span>
                    </div>

                    {/* Hero Section of the Mockup Website */}
                    <div className="space-y-2">
                      <span className="text-[8px] font-extrabold tracking-widest text-slate-500 uppercase">عن المهني</span>
                      <h4 className="text-md lg:text-lg font-black text-white leading-tight">
                        أهلاً بك، أنا <span className="text-transparent bg-clip-text bg-gradient-to-l from-white to-slate-400">{generatedResult ? generatedResult.name : "أحمد خالد"}</span>
                      </h4>
                      <p className={`text-xs font-bold ${styleCfg.accentColor}`}>
                        {generatedResult ? generatedResult.role : "مطور برمجيات متكامل"}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed max-w-md">
                        {generatedResult ? generatedResult.bio : "أقوم بصياغة البرمجيات وتصميم واجهات المستخدم الرقمية بكفاءة عالية."}
                      </p>
                    </div>

                    {/* Mini Services of the Mockup Website */}
                    <div className="space-y-2">
                      <span className="text-[8px] font-extrabold tracking-widest text-slate-500 uppercase">الخدمات المهنية المقترحة</span>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                        {generatedResult ? (
                          generatedResult.services.slice(0, 3).map((service: string, idx: number) => (
                            <div key={idx} className="bg-slate-900/60 border border-[#1E2336]/40 px-3 py-2 rounded-xl flex items-center gap-2 hover:border-[#1E2336] transition-all">
                              <Check className={`w-3 h-3 ${styleCfg.accentColor} shrink-0`} />
                              <span className="text-[9px] text-slate-350 font-bold truncate">{service}</span>
                            </div>
                          ))
                        ) : (
                          [1, 2].map((i) => (
                            <div key={i} className="bg-slate-900/60 border border-[#1E2336]/40 h-8 rounded-xl animate-pulse" />
                          ))
                        )}
                      </div>
                    </div>

                    {/* Call to Action for real template creation */}
                    <div className="pt-4 border-t border-[#1E2336]/40 flex items-center justify-between">
                      <span className="text-[9px] text-slate-500">هل يعجبك هذا التصميم المقترح؟</span>
                      <Link href="/templates">
                        <button className={`px-4 py-2 text-[9px] font-bold rounded-lg text-white transition-all ${styleCfg.buttonBg} shadow-md`}>
                          ابدأ موقعك الفعلي
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}
