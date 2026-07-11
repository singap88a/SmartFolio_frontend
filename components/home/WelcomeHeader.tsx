import React from 'react';

interface WelcomeHeaderProps {
  user: any;
}

export default function WelcomeHeader({ user }: WelcomeHeaderProps) {
  return (
    <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 relative z-10">
      <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#5A4BFF]/5 rounded-full blur-[80px] pointer-events-none" />
      <div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r from-[#5A4BFF]/10 to-cyan-500/10 text-[#5A4BFF] border border-[#5A4BFF]/20 backdrop-blur-sm">
          لوحة التحكم الذكية
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight text-white mt-3 flex items-center gap-3">
          مرحباً بك، {user?.username || "شريكنا العزيز"} في منصة SmartFolio 👋
        </h1>
        <p className="text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
          من هنا يمكنك بدء رحلتك في بناء وتعديل هويتك الرقمية الراقية والظهور باحترافية أمام عملائك.
        </p>
      </div>
    </header>
  );
}
