'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Plus, LayoutTemplate, Sparkles } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (data) setPortfolios([data]);
      } catch (err) {
        console.error('Failed to load dashboard:', err);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) loadData();
    else setIsLoading(false);
  }, [user]);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      setPortfolios([]);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0B0F19] overflow-y-auto custom-scrollbar p-6 lg:p-10">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">
            Welcome back, {user?.username || 'User'}
          </h1>
          <p className="text-slate-400 text-sm">
            Manage your portfolios and see how they are performing.
          </p>
        </div>
        <Link href="/templates">
          <Button size="lg" className="bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 shadow-[0_0_20px_rgba(90,75,255,0.3)] hover:-translate-y-0.5 transition-all gap-2 rounded-xl">
            <Plus size={20} />
            {portfolios.length > 0 ? 'Edit Portfolio' : 'Create Portfolio'}
          </Button>
        </Link>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-[#0F121E] rounded-3xl border border-[#1E2336] shadow-sm">
          <div className="w-10 h-10 border-2 border-[#5A4BFF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : portfolios.length > 0 ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-[#5A4BFF]" size={20} />
            <h2 className="text-xl font-bold text-white">Active Portfolios</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {portfolios.map((portfolio, index) => (
              <div key={portfolio._id || portfolio.id || index} className="group relative rounded-2xl overflow-hidden border border-[#1E2336] bg-[#0F121E] hover:border-[#5A4BFF]/50 transition-colors">
                <PortfolioCard 
                  {...portfolio}
                  subdomain={user?.subdomain || portfolio.subdomain}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-32 bg-[#0F121E] rounded-3xl border border-[#1E2336] shadow-[0_0_40px_rgba(90,75,255,0.03)] relative overflow-hidden">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5A4BFF]/10 rounded-full blur-[80px] pointer-events-none" />
          
          <div className="w-20 h-20 bg-[#0B0F19] rounded-2xl flex items-center justify-center mb-6 border border-[#1E2336] relative z-10 shadow-xl">
            <LayoutTemplate className="w-10 h-10 text-[#5A4BFF]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 relative z-10">No portfolios yet</h2>
          <p className="text-slate-400 max-w-sm mx-auto mb-8 relative z-10">
            You haven't created any portfolios. Choose a stunning template to get started and build your online presence!
          </p>
          <Link href="/templates" className="relative z-10">
            <Button className="rounded-xl px-8 shadow-[0_0_15px_rgba(90,75,255,0.2)] hover:-translate-y-1 transition-transform bg-[#5A4BFF] text-white hover:bg-[#4B3DE6] border-0">
              Browse Templates
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
