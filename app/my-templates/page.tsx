'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { getSubdomainUrl } from '@/lib/config';
import { LayoutTemplate, Eye, Edit3, Trash2, Plus, ExternalLink, AlertTriangle, X } from 'lucide-react';

export default function MyTemplatesPage() {
  const { user } = useAuth();
  const [portfolios, setPortfolios] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (data && Array.isArray(data)) {
          setPortfolios(data);
        } else if (data && typeof data === 'object') {
          // Fallback if API returned a single object
          setPortfolios([data]);
        } else {
          setPortfolios([]);
        }
      } catch {
        setPortfolios([]);
      } finally {
        setIsLoading(false);
      }
    };
    if (user) load();
    else setIsLoading(false);
  }, [user]);

  const confirmDelete = (id: string, name: string) => {
    setDeleteTarget({ id, name });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await fetchApi(`/portfolio/${deleteTarget.id}`, { method: 'DELETE' });
      setPortfolios(prev => prev.filter(p => p._id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch {
      setDeleteTarget(null);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#0B0F19] overflow-y-auto custom-scrollbar p-6 lg:p-10">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">My Templates</h1>
          <p className="text-slate-400 text-sm">View and manage your active portfolio templates.</p>
        </div>
        <Link href="/templates">
          <Button className="bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 shadow-[0_0_20px_rgba(90,75,255,0.3)] hover:-translate-y-0.5 transition-all gap-2 rounded-xl">
            <Plus size={18} />
            Browse Templates
          </Button>
        </Link>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64 bg-[#0F121E] rounded-3xl border border-[#1E2336]">
          <div className="w-10 h-10 border-2 border-[#5A4BFF] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : portfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {portfolios.map(portfolioItem => {
            const portfolioUrl = portfolioItem.subdomain 
              ? getSubdomainUrl(portfolioItem.subdomain) 
              : null;
            const templateName = portfolioItem.templateId
              ? portfolioItem.templateId.charAt(0).toUpperCase() + portfolioItem.templateId.slice(1)
              : 'Custom';

            const TEMPLATE_PREVIEWS: Record<string, string> = {
              developer: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
              creative: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
            };
            const previewImage = TEMPLATE_PREVIEWS[portfolioItem.templateId] || TEMPLATE_PREVIEWS.developer;

            return (
              <div 
                key={portfolioItem._id} 
                className="group bg-[#0F121E] border border-[#1E2336] rounded-3xl overflow-hidden hover:border-[#5A4BFF]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(90,75,255,0.08)]"
              >
                
                {/* Preview Thumbnail */}
                <div className="relative aspect-video bg-[#0A0D14] overflow-hidden">
                  {/* Mock Browser Frame */}
                  <div className="absolute top-0 inset-x-0 h-6 bg-[#0F121E]/95 border-b border-[#1E2336] flex items-center px-3 gap-1.5 z-10">
                    <div className="w-2 h-2 rounded-full bg-red-500/70" />
                    <div className="w-2 h-2 rounded-full bg-amber-500/70" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/70" />
                  </div>
                  {/* Actual Template Preview Image */}
                  <img
                    src={previewImage}
                    alt={`${templateName} template preview`}
                    className="absolute inset-0 w-full h-full object-cover pt-6 group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Subtle dark overlay to keep text readable */}
                  <div className="absolute inset-0 pt-6 bg-gradient-to-t from-[#0A0D14]/60 via-transparent to-transparent pointer-events-none" />

                  {/* Live badge */}
                  <div className="absolute top-8 right-3 flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold px-2 py-1 rounded-full z-10">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="mb-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {portfolioItem.data?.name || user?.username || 'My Portfolio'}
                    </h3>
                    <p className="text-sm text-slate-400 truncate">
                      {portfolioItem.data?.jobTitle || 'Portfolio'}
                    </p>
                  </div>

                  {/* Subdomain URL */}
                  {portfolioUrl && (
                    <a
                      href={portfolioUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-[#5A4BFF] hover:text-[#7B6FFF] font-medium mb-5 group/link"
                    >
                      <ExternalLink size={12} />
                      <span className="truncate group-hover/link:underline">{portfolioUrl}</span>
                    </a>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    {portfolioUrl && (
                      <a
                        href={portfolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[#1E2336] text-sm font-semibold text-slate-300 hover:text-white hover:bg-[#1E2336] transition-colors"
                      >
                        <Eye size={15} />
                        View
                      </a>
                    )}
                    <Link
                      href={`/create?template=${portfolioItem.templateId}`}
                      className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#5A4BFF] text-sm font-semibold text-white hover:bg-[#4B3DE6] shadow-[0_0_10px_rgba(90,75,255,0.2)] transition-all"
                    >
                      <Edit3 size={15} />
                      Edit
                    </Link>
                    <button
                      onClick={() => confirmDelete(portfolioItem._id, portfolioItem.data?.name || portfolioItem.templateId)}
                      disabled={isDeleting}
                      className="w-11 flex items-center justify-center rounded-xl border border-[#1E2336] text-slate-500 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-colors"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty state */
        <div className="flex flex-col items-center justify-center text-center py-32 bg-[#0F121E] rounded-3xl border border-[#1E2336] relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#5A4BFF]/8 rounded-full blur-[80px] pointer-events-none" />
          <div className="w-20 h-20 bg-[#0B0F19] rounded-2xl flex items-center justify-center mb-6 border border-[#1E2336] relative z-10 shadow-xl">
            <LayoutTemplate className="w-10 h-10 text-[#5A4BFF]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 relative z-10">No template selected</h2>
          <p className="text-slate-400 max-w-sm mx-auto mb-8 relative z-10 text-sm leading-relaxed">
            You haven&apos;t picked a template yet. Browse our collection and launch your portfolio in minutes.
          </p>
          <Link href="/templates" className="relative z-10">
            <Button className="rounded-xl px-8 shadow-[0_0_15px_rgba(90,75,255,0.2)] hover:-translate-y-1 transition-transform bg-[#5A4BFF] text-white hover:bg-[#4B3DE6] border-0">
              Browse Templates
            </Button>
          </Link>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#060810]/80 backdrop-blur-md"
            onClick={() => setDeleteTarget(null)}
          />

          {/* Modal */}
          <div className="relative z-10 bg-[#0F121E] border border-[#232943] w-full max-w-md rounded-3xl p-8 shadow-2xl">
            {/* Close */}
            <button
              onClick={() => setDeleteTarget(null)}
              className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Icon */}
            <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center justify-center mb-5">
              <AlertTriangle className="text-red-400" size={26} />
            </div>

            <h3 className="text-xl font-bold text-white mb-2">Delete Template?</h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-8">
              Are you sure you want to permanently delete the{' '}
              <span className="font-semibold text-white">{deleteTarget.name}</span>{' '}
              portfolio? This action cannot be undone.
            </p>

            <div className="flex gap-3">
              <Button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-3 border border-[#232943] bg-transparent text-slate-300 hover:bg-[#1E2336] rounded-xl text-sm font-bold"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDelete}
                isLoading={isDeleting}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white border-0 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all"
              >
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
