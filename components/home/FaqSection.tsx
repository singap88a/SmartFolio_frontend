import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    question: "ما هي منصة SmartFolio وكيف تساعدني؟",
    answer: "SmartFolio هي منصة مبتكرة تمكنك من إنشاء موقع شخصي احترافي ومعرض أعمال متكامل في أقل من دقيقة. بفضل تقنيات الذكاء الاصطناعي، نقوم بصياغة النصوص وترتيب الأقسام بناءً على تخصصك، مما يمنحك حضوراً رقمياً فورياً يجذب العملاء دون الحاجة لكتابة كود برمجى واحد."
  },
  {
    question: "هل يلزمني أي معرفة برمجية لاستخدام المنصة؟",
    answer: "لا أبداً. واجهة المنصة مصممة لجميع المستخدمين. كل ما عليك فعله هو إدخال تخصصك، والذكاء الاصطناعي سيتولى توليد النصوص وتنسيق الألوان وبناء الهيكل العام. يمكنك لاحقاً تعديل أي تفاصيل بضغطة زر وبكل سلاسة."
  },
  {
    question: "كيف يمكنني نشر موقعي للجمهور؟ وما هو الرابط؟",
    answer: "بمجرد الانتهاء من التعديل والنشر، ستحصل على رابط فرعي خاص بك (مثل: yourname.smartfolio.me) ويمكنك مشاركته فوراً في سيرتك الذاتية وحساباتك المهنية."
  },
  {
    question: "هل يمكنني تعديل التصميم أو المحتوى بعد النشر؟",
    answer: "بالتأكيد! يمكنك الدخول إلى لوحة التحكم في أي وقت وتعديل النصوص، تغيير الألوان، أو إضافة مشاريع ومهارات جديدة، وسيتم تحديث موقعك المباشر فوراً دون الحاجة لإجراءات معقدة."
  },
  {
    question: "هل المنصة مجانية أم مدفوعة؟",
    answer: "توفر المنصة تجربة استخدام مجانية تتيح لك بناء موقعك ونشره برابط فرعي. وهناك أيضاً باقات احترافية متقدمة تمنحك مميزات إضافية مثل ربط نطاق مخصص (Custom Domain) وزيادة سعة التخزين."
  },
  {
    question: "هل سيكون موقعي متوافقاً مع شاشات الهواتف؟",
    answer: "نعم 100%. جميع القوالب التي نقوم بتوليدها مصممة بأحدث تقنيات الويب لتكون متجاوبة (Responsive) تماماً لتعمل بشكل مثالي على الهواتف الذكية والأجهزة اللوحية."
  }
];

export default function FaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <section className="mb-24 lg:mb-32">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-indigo-400 tracking-wider uppercase bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">الأسئلة الشائعة</span>
        <h3 className="text-2xl font-bold text-white mt-4">لديك استفسار؟ ابحث عنه هنا</h3>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mt-2 leading-relaxed">
          إجابات واضحة ومباشرة لأهم الأسئلة الشائعة حول كيفية عمل المنصة وإطلاق موقعك مقسمة لتصفح أسهل
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        {/* العمود الأول */}
        <div className="space-y-4">
          {FAQS.slice(0, 3).map((faq, idx) => {
            const actualIdx = idx;
            const isOpen = openFaqIndex === actualIdx;
            return (
              <div 
                key={actualIdx}
                className={`bg-[#0F121E]/40 backdrop-blur-xl border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#5A4BFF]/50 bg-[#0F121E]/65 shadow-[0_10px_30px_rgba(90,75,255,0.06)]' : 'border-[#1E2336] hover:border-[#1E2336]/85'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : actualIdx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336] flex items-center justify-center text-slate-400 transition-all duration-300 ${
                    isOpen ? 'rotate-180 border-[#5A4BFF]/30 text-[#5A4BFF]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                {/* Collapsible content area */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-[#1E2336]/40 mt-1 font-normal">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* العمود الثاني - إذا كان هناك أسئلة أخرى يمكن إضافتها لاحقاً */}
        <div className="space-y-4">
          {FAQS.slice(3, 6).map((faq, idx) => {
            const actualIdx = idx + 3;
            const isOpen = openFaqIndex === actualIdx;
            return (
              <div 
                key={actualIdx}
                className={`bg-[#0F121E]/40 backdrop-blur-xl border rounded-2xl transition-all duration-300 overflow-hidden ${
                  isOpen ? 'border-[#5A4BFF]/50 bg-[#0F121E]/65 shadow-[0_10px_30px_rgba(90,75,255,0.06)]' : 'border-[#1E2336] hover:border-[#1E2336]/85'
                }`}
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : actualIdx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-right gap-4 focus:outline-none"
                >
                  <span className="text-base font-bold text-white">
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-lg bg-slate-900 border border-[#1E2336] flex items-center justify-center text-slate-400 transition-all duration-300 ${
                    isOpen ? 'rotate-180 border-[#5A4BFF]/30 text-[#5A4BFF]' : ''
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>
                
                {/* Collapsible content area */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-400 leading-relaxed border-t border-[#1E2336]/40 mt-1 font-normal">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
