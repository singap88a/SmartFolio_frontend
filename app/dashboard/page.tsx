"use client";

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { getSubdomainUrl } from '@/lib/config';

import WelcomeHeader from '@/components/home/WelcomeHeader';
import HeroSection from '@/components/home/HeroSection';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import AiGeneratorSection from '@/components/home/AiGeneratorSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import FaqSection from '@/components/home/FaqSection';

export default function Dashboard() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    loadData();
  }, []);

  const portfolioUrl = user?.subdomain ? getSubdomainUrl(user.subdomain) : null;

  return (
    <div dir="rtl" className="font-cairo flex-1 flex flex-col min-h-full bg-[#0B0F19] overflow-y-auto custom-scrollbar p-6 lg:p-12 pb-24 text-slate-200 selection:bg-[#5A4BFF]/30 selection:text-white">
      
      <WelcomeHeader user={user} />

      <HeroSection 
        user={user} 
        portfolio={portfolio} 
        portfolioUrl={portfolioUrl} 
      />

      <HowItWorksSection />

      <AiGeneratorSection user={user} />

      <FeaturesSection />

      <FaqSection />

      {/* الفوتر البسيط في نهاية الصفحة */}
      <footer className="border-t border-[#1E2336] pt-12 pb-8 mt-12 text-center text-xs text-slate-500 relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 bg-[#5A4BFF] rounded-lg flex items-center justify-center text-white font-black text-xs shadow-[0_0_10px_rgba(90,75,255,0.3)]">
              S
            </div>
            <span className="font-bold text-slate-350 text-sm">SmartFolio</span>
          </div>
          <p className="font-normal text-slate-500">
            &copy; {new Date().getFullYear()} SmartFolio. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-6 font-medium text-slate-400">
            <a href="#" className="hover:text-[#5A4BFF] transition-colors">سياسة الخصوصية</a>
            <a href="#" className="hover:text-[#5A4BFF] transition-colors">شروط الخدمة</a>
            <a href="#" className="hover:text-[#5A4BFF] transition-colors">الدعم الفني</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
