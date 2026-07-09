'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/portfolio/TemplateCard';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import Link from 'next/link';
import { LogIn, X } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'developer',
    name: 'The Minimalist (Dev)',
    description: 'A dark, minimal design focused on code and technical skills. Perfect for developers and engineers.',
    image: 'from-slate-900 to-slate-800'
  },
  {
    id: 'creative',
    name: 'The Creative Artsy (Designer)',
    description: 'A beautiful serif-based layout with organic glows and asymmetric grids. Built for designers and copywriters.',
    image: 'from-pink-900 to-purple-950'
  }
];

const TemplatesPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();
  const [activeTemplateIds, setActiveTemplateIds] = useState<string[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);

  useEffect(() => {
    const fetchMyPortfolios = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (data && Array.isArray(data)) {
          setActiveTemplateIds(data.map((p: any) => p.templateId));
        } else if (data && typeof data === 'object') {
          setActiveTemplateIds([data.templateId]);
        }
      } catch {
        // Not logged in or no portfolios — that's fine
      } finally {
        setDataLoading(false);
      }
    };

    if (!isLoading) {
      if (user) {
        fetchMyPortfolios();
      } else {
        setDataLoading(false);
      }
    }
  }, [user, isLoading]);

  const handleSelect = (id: string) => {
    if (!user) {
      // Guest: show login prompt instead of navigating
      setShowLoginPrompt(true);
      return;
    }
    router.push(`/templates/preview?id=${id}`);
  };

  if (isLoading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A4BFF]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4 text-white">Choose your template</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Start with a professionally designed template and customize it to make it your own.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map(template => (
          <TemplateCard
            key={template.id}
            {...template}
            selected={activeTemplateIds.includes(template.id)}
            onSelect={handleSelect}
          />
        ))}
      </div>

      {/* Login Required Modal */}
      {showLoginPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#060810]/80 backdrop-blur-md"
            onClick={() => setShowLoginPrompt(false)}
          />

          {/* Modal */}
          <div className="relative z-10 bg-[#0F121E] border border-[#232943] w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center">
            <button
              onClick={() => setShowLoginPrompt(false)}
              className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 bg-[#5A4BFF]/15 border border-[#5A4BFF]/30 rounded-2xl flex items-center justify-center mb-5 mx-auto">
              <LogIn className="text-[#5A4BFF]" size={26} />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Login Required</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              You need to sign in to select a template and build your portfolio.
            </p>

            <div className="flex flex-col gap-3">
              <Link
                href="/login"
                className="w-full py-3 rounded-xl bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white font-bold text-sm transition-all shadow-[0_0_15px_rgba(90,75,255,0.25)]"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="w-full py-3 rounded-xl border border-[#232943] text-slate-300 hover:bg-[#1E2336] font-bold text-sm transition-colors"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatesPage;
