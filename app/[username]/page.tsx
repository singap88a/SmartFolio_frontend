import React from 'react';
import { templates } from '@/components/templates';
import { API_BASE_URL } from '@/lib/config';

const getPortfolioData = async (username: string, template?: string) => {
  const url = template 
    ? `${API_BASE_URL}/portfolio/u/${username}?template=${template}` 
    : `${API_BASE_URL}/portfolio/u/${username}`;
    
  const res = await fetch(url, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
};

interface PageProps {
  params: Promise<{ username: string }>;
  searchParams: Promise<{ template?: string }>;
}

export default async function PortfolioPage({ params, searchParams }: PageProps) {
  const { username } = await params;
  const { template } = await searchParams;
  const portfolio = await getPortfolioData(username, template);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-white">Portfolio Not Found</h1>
          <p className="text-slate-400">The user @{username} hasn&apos;t created a portfolio yet.</p>
        </div>
      </div>
    );
  }

  const { data, templateId } = portfolio;
  const TemplateComponent = templates[templateId as keyof typeof templates] || templates.developer;

  return (
    <div className="min-h-screen">
      <TemplateComponent data={data} />
    </div>
  );
}
