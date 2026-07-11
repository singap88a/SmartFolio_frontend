import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
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

export async function generateMetadata(
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { username } = await params;
  const { template } = await searchParams;
  const portfolio = await getPortfolioData(username, template);

  if (!portfolio) {
    return {
      title: 'Portfolio Not Found',
    };
  }

  const { data } = portfolio;
  
  // Truncate bio for SEO description
  const description = data.bio 
    ? (data.bio.length > 160 ? data.bio.substring(0, 157) + '...' : data.bio) 
    : 'View my professional portfolio.';

  return {
    title: `${data.name} | Portfolio`,
    description: description,
    openGraph: {
      title: `${data.name} | Portfolio`,
      description: description,
      images: data.heroImage ? [data.heroImage] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${data.name} | Portfolio`,
      description: description,
      images: data.heroImage ? [data.heroImage] : [],
    }
  };
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
