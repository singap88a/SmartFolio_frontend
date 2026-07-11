import React from 'react';
import { Wand2, Palette, Rocket, Cpu, Layers, ShieldCheck } from 'lucide-react';

const SERVICES = [
  {
    title: "كتابة نصوص بالذكاء الاصطناعي",
    description: "توليد فوري واحترافي للنبذة الشخصية، العناوين التسويقية، والمحتوى التقني المناسب لمجال تخصصك الفرعي.",
    icon: Wand2,
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-indigo-500/10 border-indigo-500/20 text-indigo-400"
  },
  {
    title: "تصاميم وقوالب عالمية",
    description: "مكتبة متجددة من القوالب الأنيقة تم اختيار تفاصيلها وألوانها بدقة لتناسب أرقى الأذواق المهنية.",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10 border-pink-500/20 text-pink-400"
  },
  {
    title: "نشر فوري برابط مخصص",
    description: "بث موقعك بضغطة زر على خوادمنا السحابية الآمنة، مع رابط فرعي مجاني ومحمي بشهادة SSL تلقائياً.",
    icon: Rocket,
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
  },
  {
    title: "لوحة تحكم مرنة وسريعة",
    description: "تحديث مشاريعك، مهاراتك، وروابط الاتصال بشكل فوري ومباشر دون المساس بأكواد البرمجة المعقدة.",
    icon: Cpu,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
  },
  {
    title: "تحسين محركات البحث SEO",
    description: "هيكلية برمجية مهيأة لمحركات البحث ووسوم ميتا (Meta Tags) محسنة لزيادة فرص ظهورك للعملاء.",
    icon: Layers,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10 border-amber-500/20 text-amber-500"
  },
  {
    title: "حماية وأمان متكامل",
    description: "تأمين خوادم موقعك وحمايته من التهديدات السيبرانية مع ضمان استقرار الخدمة وسرعة التحميل.",
    icon: ShieldCheck,
    color: "from-violet-500 to-fuchsia-500",
    bgColor: "bg-violet-500/10 border-violet-500/20 text-violet-400"
  }
];

export default function FeaturesSection() {
  return (
    <section className="mb-24 lg:mb-32">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">مميزات لا حصر لها</span>
        <h3 className="text-2xl font-bold text-white mt-4">ماذا تقدم لك منصة SmartFolio؟</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          نجمع لك أفضل تقنيات الويب والتصميم الذكي في مكان واحد لإخراج هويتك المهنية بشكل رائع
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div 
              key={idx} 
              className="group relative bg-[#0F121E]/40 backdrop-blur-xl border border-[#1E2336] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5A4BFF]/40 hover:bg-[#0F121E]/60 flex flex-col justify-between"
            >
              {/* Glow behind icon */}
              <div className={`absolute top-6 right-6 w-12 h-12 rounded-xl bg-gradient-to-tr ${service.color} opacity-5 blur-[10px] group-hover:opacity-20 transition-opacity`} />
              
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center border transition-colors ${service.bgColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-[#5A4BFF] transition-colors">{service.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
