'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import PortfolioCard from '@/components/portfolio/PortfolioCard';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { Plus, LayoutTemplate } from 'lucide-react';

const DashboardPage = () => {
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
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this portfolio?')) {
      setPortfolios([]);
    }
  };

  return (
    <div className="p-8 lg:p-12 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <p className="text-sm font-bold text-indigo-600 dark:text-indigo-400 mb-2 tracking-widest uppercase">Overview</p>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, {user?.username || 'User'}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            Manage your portfolios and see how they are performing.
          </p>
        </div>
        <Link href="/templates">
          <Button size="lg" className="gap-2 rounded-xl shadow-lg shadow-indigo-500/20 hover:-translate-y-1 transition-transform bg-indigo-600 text-white border-0 hover:bg-indigo-700">
            <Plus size={20} />
            {portfolios.length > 0 ? 'Edit Portfolio' : 'Create Portfolio'}
          </Button>
        </Link>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : portfolios.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Active Portfolios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {portfolios.map((portfolio, index) => (
              <PortfolioCard 
                key={portfolio._id || portfolio.id || index}
                {...portfolio}
                subdomain={user?.subdomain || portfolio.subdomain}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-24 bg-white dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
            <LayoutTemplate className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">No portfolios yet</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-8">
            You haven't created any portfolios. Choose a stunning template to get started!
          </p>
          <Link href="/templates">
            <Button variant="primary" className="rounded-xl px-8 shadow-lg shadow-indigo-500/20 hover:-translate-y-1 transition-transform">
              Browse Templates
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
