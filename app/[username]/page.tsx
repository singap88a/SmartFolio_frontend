import React from 'react';
import DeveloperTemplate from '@/components/templates/DeveloperTemplate';
import { API_BASE_URL } from '@/lib/config';

const getPortfolioData = async (username: string) => {
  const res = await fetch(`${API_BASE_URL}/portfolio/u/${username}`, {
    cache: 'no-store'
  });
  
  if (!res.ok) return null;
  return res.json();
};

export default async function PortfolioPage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;
  const portfolio = await getPortfolioData(username);

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio Not Found</h1>
          <p className="text-slate-500">The user @{username} hasn't created a portfolio yet.</p>
        </div>
      </div>
    );
  }

  const { data } = portfolio;

  return (
    <div className="min-h-screen">
      <DeveloperTemplate data={data} />
    </div>
  );
}
