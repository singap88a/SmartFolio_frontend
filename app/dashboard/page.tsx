"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { getSubdomainUrl } from '@/lib/config';
import Button from '@/components/ui/Button';
import { 
  Eye, 
  Users, 
  MessageSquare, 
  Activity,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  Server,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  MonitorPlay,
  ShieldCheck,
  Zap
} from "lucide-react";

// Mock Data for Sparklines (SVG paths)
const sparklineUp = "M 0 20 Q 10 15 20 20 T 40 10 T 60 15 T 80 5 T 100 0";
const sparklineDown = "M 0 5 Q 10 10 20 5 T 40 15 T 60 10 T 80 20 T 100 25";
const sparklineNeutral = "M 0 15 Q 10 10 20 15 T 40 10 T 60 15 T 80 10 T 100 12";

// Mock Data
const INTELLIGENCE_FEED = [
  { id: 1, type: "alert", title: "Page views down 2%", desc: "Traffic from social media dropped. Check your recent Twitter links.", icon: AlertTriangle, color: "text-rose-400", bg: "bg-rose-500/10" },
  { id: 2, type: "suggestion", title: "Action Suggestion", desc: "Add a call-to-action button to your 'About' section to improve conversion.", icon: Lightbulb, color: "text-amber-400", bg: "bg-amber-500/10" },
  { id: 3, type: "event", title: "New Lead Captured", desc: "sarah@example.com submitted the contact form.", icon: MessageSquare, color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { id: 4, type: "system", title: "SSL Certificate Auto-Renewed", desc: "Your domain security is up to date.", icon: ShieldCheck, color: "text-emerald-400", bg: "bg-emerald-500/10" },
];

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
  return (
    <div className="flex-1 flex flex-col min-h-full bg-[#0B0F19] overflow-y-auto custom-scrollbar p-6 lg:p-8 pb-24 text-slate-200">
      {/* Top Header & Global Nav Extensions */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-3">
            Performance Snapshot
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">Executive View</span>
          </h1>
          <p className="text-slate-400 mt-1 text-sm">Real-time intelligence and conversion metrics for your digital assets.</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Always-on System Health Indicator */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800/60 shadow-inner">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
              <Server className="w-3 h-3 text-slate-500" />
              System Healthy
            </span>
          </div>
        </div>
      </header>

      {/* KPI Pulse (Ticker / Ribbon) */}
      <div className="flex flex-nowrap overflow-x-auto custom-scrollbar gap-4 pb-4 mb-4 min-h-[120px]">
        {/* KPI 1: Page Views */}
        <div className="min-w-[240px] min-h-[120px] flex-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-400" /> Page Views
            </span>
            <span className="text-xs font-medium text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded"><ArrowUpRight className="w-3 h-3 mr-0.5"/> 12.5%</span>
          </div>
          <div className="flex items-end justify-between z-10">
            <h3 className="text-2xl font-bold text-white">24,592</h3>
            {/* Minimalist Sparkline inside the card */}
            <svg className="w-16 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d={sparklineUp} fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/5 to-transparent pointer-events-none" />
        </div>

        {/* KPI 2: Unique Visitors */}
        <div className="min-w-[240px] min-h-[120px] flex-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-cyan-400" /> Unique Visitors
            </span>
            <span className="text-xs font-medium text-emerald-400 flex items-center bg-emerald-500/10 px-1.5 py-0.5 rounded"><ArrowUpRight className="w-3 h-3 mr-0.5"/> 5.2%</span>
          </div>
          <div className="flex items-end justify-between z-10">
            <h3 className="text-2xl font-bold text-white">8,439</h3>
            <svg className="w-16 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d={sparklineNeutral} fill="none" stroke="#22D3EE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        </div>

        {/* KPI 3: Form Submissions */}
        <div className="min-w-[240px] min-h-[120px] flex-1 bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden group">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> Form Submissions
            </span>
            <span className="text-xs font-medium text-rose-400 flex items-center bg-rose-500/10 px-1.5 py-0.5 rounded"><ArrowDownRight className="w-3 h-3 mr-0.5"/> 2.4%</span>
          </div>
          <div className="flex items-end justify-between z-10">
            <h3 className="text-2xl font-bold text-white">142</h3>
            <svg className="w-16 h-8 opacity-60 group-hover:opacity-100 transition-opacity" viewBox="0 0 100 25" preserveAspectRatio="none">
              <path d={sparklineDown} fill="none" stroke="#C084FC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-purple-500/5 to-transparent pointer-events-none" />
        </div>

        {/* KPI 4: Portfolio Health Score */}
        <div className="min-w-[240px] min-h-[120px] flex-1 bg-slate-900/40 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-[0_0_15px_rgba(99,102,241,0.1)]">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-indigo-400" /> Health Score
            </span>
            <span className="text-xs font-medium text-indigo-300 bg-indigo-500/20 px-1.5 py-0.5 rounded border border-indigo-500/30">Excellent</span>
          </div>
          <div className="flex items-center gap-3 z-10">
            <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">94</h3>
            <span className="text-sm text-slate-400">/ 100</span>
          </div>
          <div className="absolute right-0 bottom-0 top-0 w-24 bg-gradient-to-l from-indigo-500/10 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Main Grid: Strategic Overview & Intelligence */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Strategic Overview: Hybrid Chart & Funnel */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-indigo-500" />
                  Traffic Trend & Conversion Funnel
                </h2>
                <p className="text-sm text-slate-400">Aggregated view of visitor journey and volume over 30 days.</p>
              </div>
            </div>
            
            <div className="flex-1 flex flex-col md:flex-row gap-6">
              {/* Left: Area Chart Placeholder */}
              <div className="flex-1 rounded-xl border border-slate-800/50 bg-[#0A0D14]/80 p-4 relative overflow-hidden group min-h-[250px] flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs text-slate-400 font-semibold uppercase">Volume Trend</span>
                  <div className="flex gap-2 text-xs">
                    <span className="flex items-center gap-1 text-slate-300"><div className="w-2 h-2 rounded-full bg-blue-500/50"></div> Views</span>
                    <span className="flex items-center gap-1 text-slate-300"><div className="w-2 h-2 rounded-full bg-cyan-400"></div> Unique</span>
                  </div>
                </div>
                
                {/* Mock Chart Visualization */}
                <div className="flex-1 w-full flex items-end justify-between gap-1 relative z-10 px-2 pb-2">
                  {/* Mock Bars/Area simulation */}
                  {[40, 55, 45, 70, 65, 80, 95, 85, 100, 90, 75, 85, 110, 105, 120].map((h, i) => (
                    <div key={i} className="relative flex-1 flex items-end group/bar cursor-crosshair h-full">
                      {/* Background Area Bar */}
                      <div style={{height: `${h}%`}} className="w-full bg-blue-500/10 rounded-t-sm border-t border-blue-500/30 group-hover/bar:bg-blue-500/20 transition-all"></div>
                      {/* Stacked Overlay (Unique visitors approx) */}
                      <div style={{height: `${h * 0.4}%`}} className="absolute bottom-0 w-full bg-cyan-400/80 rounded-t-sm shadow-[0_0_10px_rgba(34,211,238,0.4)]"></div>
                    </div>
                  ))}
                </div>
                {/* Grid Lines */}
                <div className="absolute inset-y-12 inset-x-4 flex flex-col justify-between pointer-events-none opacity-20">
                  <div className="border-t border-dashed border-slate-600 w-full"></div>
                  <div className="border-t border-dashed border-slate-600 w-full"></div>
                  <div className="border-t border-dashed border-slate-600 w-full"></div>
                </div>
              </div>

              {/* Right: Condensed Funnel */}
              <div className="w-full md:w-48 lg:w-56 flex flex-col gap-2 justify-center">
                <span className="text-xs text-slate-400 font-semibold uppercase mb-2">Conversion Funnel</span>
                
                {/* Step 1 */}
                <div className="relative w-full bg-slate-800/30 border border-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">Total Visitors</div>
                  <div className="text-lg font-bold text-white">8,439</div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900 border border-slate-700 rounded-full px-2 py-0.5 text-[10px] text-cyan-400 shadow-sm">
                    100%
                  </div>
                </div>
                <div className="h-4 flex justify-center"><div className="w-px bg-slate-700/50"></div></div>
                
                {/* Step 2 */}
                <div className="relative w-[90%] mx-auto bg-slate-800/40 border border-slate-700/50 rounded-lg p-3 text-center">
                  <div className="text-xs text-slate-400 mb-1">Engaged (&gt;1m)</div>
                  <div className="text-lg font-bold text-white">3,120</div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 bg-slate-900 border border-slate-700 rounded-full px-2 py-0.5 text-[10px] text-indigo-400 shadow-sm">
                    37%
                  </div>
                </div>
                <div className="h-4 flex justify-center"><div className="w-px bg-slate-700/50"></div></div>
                
                {/* Step 3 */}
                <div className="relative w-[75%] mx-auto bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-3 text-center shadow-[0_0_15px_rgba(99,102,241,0.1)]">
                  <div className="text-xs text-indigo-200 mb-1">Leads Captured</div>
                  <div className="text-xl font-black text-indigo-400">142</div>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-10 bg-indigo-900 border border-indigo-500 rounded-full px-2 py-0.5 text-[10px] text-white shadow-sm">
                    1.68%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Intelligence Feed */}
        <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 flex flex-col h-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-400" />
              Intelligence Feed
            </h2>
            <span className="flex items-center gap-1 text-xs font-medium text-slate-400 bg-slate-800/50 px-2 py-1 rounded-lg">
              Live <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
            </span>
          </div>

          <div className="flex flex-col space-y-3">
            {INTELLIGENCE_FEED.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.id} className="group p-4 rounded-xl bg-[#0A0D14]/80 border border-slate-800/50 hover:border-slate-700 transition-colors flex gap-4">
                  <div className={`shrink-0 p-2.5 rounded-lg ${item.bg} h-fit`}>
                    <Icon className={`w-4 h-4 ${item.color}`} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 mb-1 group-hover:text-white transition-colors">{item.title}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
                    
                    {/* Action Suggestion Link */}
                    {item.type === 'suggestion' && (
                      <button className="mt-2 text-xs font-medium text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
                        Apply Suggestion <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                    {item.type === 'alert' && (
                      <button className="mt-2 text-xs font-medium text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-colors">
                        Investigate <ArrowRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Portfolio Hub (Bottom Section) */}
      <div className="bg-slate-900/40 backdrop-blur-xl border border-slate-800/60 rounded-2xl p-6 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 relative z-10 gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
              <MonitorPlay className="w-5 h-5 text-cyan-400" />
              Dynamic Portfolio Hub
            </h2>
            <p className="text-sm text-slate-400">Manage and preview your active digital assets and configurations.</p>
          </div>
          <div className="flex gap-3">
            {portfolio && (
              <Link href="/create">
                <Button className="bg-slate-800 hover:bg-slate-700 text-white border-0 shadow-sm rounded-xl text-sm px-4">
                  Edit Current Portfolio
                </Button>
              </Link>
            )}
            <Link href="/templates">
              <Button className="bg-indigo-600 hover:bg-indigo-500 text-white border-0 shadow-[0_0_15px_rgba(99,102,241,0.3)] rounded-xl text-sm px-4 gap-2 flex items-center">
                <Plus className="w-4 h-4" />
                Create New Portfolio
              </Button>
            </Link>
          </div>
        </div>

        {/* Thumbnail Grid & Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
          
          {portfolio ? (
            <>
              {/* Active Portfolio Thumbnail */}
              <div className="md:col-span-1 bg-[#0A0D14] border border-indigo-500/30 rounded-xl overflow-hidden group cursor-pointer relative shadow-[0_0_20px_rgba(99,102,241,0.05)]">
                <div className="absolute top-2 right-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full z-10 backdrop-blur-sm">
                  LIVE
                </div>
                {/* Mock Thumbnail Image area */}
                <div className="h-32 bg-slate-900 border-b border-slate-800 relative overflow-hidden flex flex-col">
                  {/* Wireframe UI */}
                  <div className="h-4 bg-slate-950 border-b border-slate-800 flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>
                  </div>
                  <div className="flex-1 p-3 flex flex-col gap-2 opacity-50 group-hover:scale-105 transition-transform duration-500">
                    <div className="w-1/2 h-3 bg-slate-800 rounded"></div>
                    <div className="w-3/4 h-2 bg-slate-800 rounded"></div>
                    <div className="w-full flex gap-2 mt-auto">
                      <div className="flex-1 h-8 bg-indigo-500/20 rounded"></div>
                      <div className="flex-1 h-8 bg-slate-800 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-sm font-semibold text-white truncate">{portfolio?.data?.name || 'My Portfolio'}</h4>
                  <p className="text-xs text-slate-400 mt-1 truncate">{portfolioUrl?.replace('https://', '') || 'Not configured'}</p>
                </div>
                {/* Hover overlay link */}
                {portfolioUrl && (
                  <a href={portfolioUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-indigo-600/0 group-hover:bg-indigo-600/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all backdrop-blur-[1px]">
                    <span className="bg-indigo-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1 transform translate-y-2 group-hover:translate-y-0 transition-all">
                      View Live <ArrowUpRight className="w-3 h-3" />
                    </span>
                  </a>
                )}
              </div>

              {/* Add New Thumbnail Box */}
              <Link href="/templates" className="md:col-span-1 border-2 border-dashed border-slate-700/50 rounded-xl flex flex-col items-center justify-center h-full min-h-[180px] hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group cursor-pointer text-slate-500 hover:text-indigo-400">
                <div className="w-10 h-10 rounded-full bg-slate-800/50 group-hover:bg-indigo-500/20 flex items-center justify-center mb-2 transition-colors">
                  <Plus className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Add Variation</span>
              </Link>
            </>
          ) : (
            <div className="md:col-span-4 py-8 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
                <MonitorPlay className="w-8 h-8 text-slate-600" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">No Active Portfolios</h3>
              <p className="text-sm text-slate-400 max-w-md">You haven't set up your digital presence yet. Create your first portfolio to start tracking insights and generating leads.</p>
            </div>
          )}

        </div>
      </div>

    </div>
  );
}
