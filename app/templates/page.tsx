'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/portfolio/TemplateCard';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';

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

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
    }

    const fetchMyPortfolios = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (data && Array.isArray(data)) {
          setActiveTemplateIds(data.map((p: any) => p.templateId));
        } else if (data && typeof data === 'object') {
          setActiveTemplateIds([data.templateId]);
        }
      } catch (err) {
        console.error('Failed to fetch active portfolios:', err);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      fetchMyPortfolios();
    } else if (!isLoading) {
      setDataLoading(false);
    }
  }, [user, isLoading, router]);

  const handleSelect = (id: string) => {
    router.push(`/templates/preview?id=${id}`);
  };

  if (isLoading || dataLoading || !user || !user.subdomain) {
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
    </div>
  );
};

export default TemplatesPage;
