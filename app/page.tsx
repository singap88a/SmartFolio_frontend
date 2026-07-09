'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { getSubdomainUrl } from '@/lib/config';
import { 
  Plus, 
  LayoutTemplate, 
  Eye, 
  Edit3, 
  Globe, 
  TrendingUp, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    if (user) loadData();
    else setIsLoading(false);
  }, [user]);

  const portfolioUrl = user?.subdomain ? getSubdomainUrl(user.subdomain) : null;
  const templateName = portfolio?.templateId
    ? portfolio.templateId.charAt(0).toUpperCase() + portfolio.templateId.slice(1)
    : 'Not Chosen';

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0B0F19] overflow-y-auto custom-scrollbar p-6 lg:p-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <p className="text-xs font-bold text-[#5A4BFF] mb-2 tracking-widest uppercase">الرئيسية</p>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Welcome back, {user?.username || 'User'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Analyze your site activity and make updates dynamically.
          </p>
        </div>
        
        {portfolio ? (
          <Link href="/create">
            <Button size="lg" className="bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 shadow-[0_0_20px_rgba(90,75,255,0.3)] hover:-translate-y-0.5 transition-all gap-2 rounded-xl">
              <Edit3 size={18} />
              Edit Portfolio
            </Button>
          </Link>
        ) : (
          <Link href="/templates">
            <Button size="lg" className="bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 shadow-[0_0_20px_rgba(90,75,255,0.3)] hover:-translate-y-0.5 transition-all gap-2 rounded-xl">
              <Plus size={18} />
              Create Portfolio
            </Button>
          </Link>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-[#0F121E] rounded-3xl border border-[#1E2336] shadow-sm">
          <div className="w-10 h-10 border-2 border-[#5A4BFF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <div className="space-y-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#0F121E] border border-[#1E2336] p-6 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#5A4BFF]/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Portfolio Subdomain</span>
                <span className="text-sm font-bold text-white block truncate max-w-[200px]">
                  {user?.subdomain ? `${user.subdomain}.${window.location.host.replace('www.', '')}` : 'Not configured'}
                </span>
              </div>
              <div className="w-12 h-12 bg-[#5A4BFF]/10 rounded-xl flex items-center justify-center text-[#5A4BFF]">
                <Globe size={22} />
              </div>
            </div>

            <div className="bg-[#0F121E] border border-[#1E2336] p-6 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Active Template</span>
                <span className="text-lg font-bold text-white block">{templateName}</span>
              </div>
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400">
                <LayoutTemplate size={22} />
              </div>
            </div>

            <div className="bg-[#0F121E] border border-[#1E2336] p-6 rounded-2xl flex items-center justify-between shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform" />
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">Status</span>
                <span className="text-lg font-bold text-white block">
                  {portfolio ? 'Published & Live' : 'No Active Site'}
                </span>
              </div>
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400">
                <TrendingUp size={22} />
              </div>
            </div>

          </div>

          {/* Portfolio Management Panel */}
          {portfolio ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Active Portfolio Preview Card */}
              <div className="lg:col-span-2 bg-[#0F121E] border border-[#1E2336] rounded-3xl overflow-hidden hover:border-[#5A4BFF]/30 transition-all shadow-sm">
                <div className="p-6 border-b border-[#1E2336] flex justify-between items-center bg-[#0A0D14]">
                  <h2 className="text-lg font-bold text-white flex items-center gap-2">
                    <Sparkles size={18} className="text-[#5A4BFF]" />
                    Live Portfolio Preview
                  </h2>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                    Active
                  </span>
                </div>
                
                <div className="p-6 flex flex-col justify-between h-[300px] relative bg-gradient-to-br from-[#0F121E] to-[#0A0D14]">
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black text-white">
                      {portfolio?.data?.name || user?.username || 'My Site'}
                    </h3>
                    <p className="text-slate-400 text-sm max-w-md">
                      {portfolio?.data?.jobTitle || 'No title set yet'}
                    </p>
                    <p className="text-slate-500 text-xs line-clamp-2 max-w-lg">
                      {portfolio?.data?.bio || 'Add a bio inside the editor to describe yourself.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-4 border-t border-[#1E2336]/60">
                    {portfolioUrl && (
                      <a
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 rounded-xl border border-[#1E2336] text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#1E2336] transition-colors"
                      >
                        <Eye size={16} />
                        View Live Site
                      </a>
                    )}
                    <Link
                      href="/create"
                      className="flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 rounded-xl bg-[#5A4BFF] text-sm font-semibold text-white hover:bg-[#4B3DE6] shadow-[0_0_15px_rgba(90,75,255,0.2)] transition-all"
                    >
                      <Edit3 size={16} />
                      Open Editor
                    </Link>
                  </div>
                </div>
              </div>

              {/* Quick Actions Panel */}
              <div className="bg-[#0F121E] border border-[#1E2336] rounded-3xl p-6 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
                  <div className="space-y-4">
                    <Link href="/profile" className="flex items-center justify-between p-4 rounded-xl border border-[#1E2336] bg-[#0A0D14] hover:bg-[#151926] transition-colors group">
                      <div>
                        <span className="font-semibold text-sm text-white block">Update Profile Details</span>
                        <span className="text-xs text-slate-500 block mt-0.5">Edit email, phone & display name</span>
                      </div>
                      <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                    </Link>

                    <Link href="/templates" className="flex items-center justify-between p-4 rounded-xl border border-[#1E2336] bg-[#0A0D14] hover:bg-[#151926] transition-colors group">
                      <div>
                        <span className="font-semibold text-sm text-white block">Change Theme / Template</span>
                        <span className="text-xs text-slate-500 block mt-0.5">Browse minimalist & timeline templates</span>
                      </div>
                      <ArrowRight size={16} className="text-slate-500 group-hover:translate-x-1 transition-transform group-hover:text-white" />
                    </Link>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#1E2336] text-xs text-slate-500 text-center">
                  SmartFolio Dashboard v1.0.0
                </div>
              </div>

            </div>
          ) : (
            /* Empty State for Dashboard */
            <div className="flex flex-col items-center justify-center text-center py-24 bg-[#0F121E] rounded-3xl border border-[#1E2336] shadow-[0_0_40px_rgba(90,75,255,0.02)] relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5A4BFF]/5 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="w-20 h-20 bg-[#0B0F19] rounded-2xl flex items-center justify-center mb-6 border border-[#1E2336] relative z-10 shadow-xl">
                <LayoutTemplate className="w-10 h-10 text-[#5A4BFF]" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-3 relative z-10">No portfolio setup yet</h2>
              <p className="text-slate-400 max-w-sm mx-auto mb-8 relative z-10 text-sm leading-relaxed">
                Choose one of our premium, modern templates to initialize your personal webpage and domain.
              </p>
              <Link href="/templates" className="relative z-10">
                <Button className="rounded-xl px-8 shadow-[0_0_15px_rgba(90,75,255,0.2)] hover:-translate-y-1 transition-transform bg-[#5A4BFF] text-white hover:bg-[#4B3DE6] border-0">
                  Select a Template
                </Button>
              </Link>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
