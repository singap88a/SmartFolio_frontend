'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TemplateCard from '@/components/portfolio/TemplateCard';
import { useAuth } from '@/context/AuthContext';

const TEMPLATES = [
  {
    id: 'developer',
    name: 'The Minimalist (Dev)',
    description: 'A dark, minimal design focused on code and technical skills. Perfect for developers and engineers.',
    image: 'from-slate-900 to-slate-800'
  }
];

const TemplatesPage = () => {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/login');
      } else if (!user.subdomain) {
        router.push('/profile?requireSubdomain=true');
      }
    }
  }, [user, isLoading, router]);

  const handleSelect = (id: string) => {
    router.push(`/create?template=${id}`);
  };

  if (isLoading || !user || !user.subdomain) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold mb-4">Choose your template</h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Start with a professionally designed template and customize it to make it your own.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {TEMPLATES.map(template => (
          <TemplateCard 
            key={template.id}
            {...template}
            onSelect={handleSelect}
          />
        ))}
      </div>
    </div>
  );
};

export default TemplatesPage;

