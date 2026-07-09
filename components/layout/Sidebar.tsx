'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Layers, User, ExternalLink, LogOut, Menu, X, ChevronDown, Globe } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getSubdomainUrl } from '@/lib/config';
import { fetchApi } from '@/lib/api';

interface Portfolio {
  _id: string;
  subdomain: string;
  templateId: string;
}

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [portfoliosOpen, setPortfoliosOpen] = useState(false);
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);

  // Fetch user portfolios when logged in
  useEffect(() => {
    if (!user) {
      setPortfolios([]);
      return;
    }
    const load = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (Array.isArray(data)) setPortfolios(data);
        else if (data && typeof data === 'object' && data._id) setPortfolios([data]);
        else setPortfolios([]);
      } catch {
        setPortfolios([]);
      }
    };
    load();
  }, [user]);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Templates', href: '/my-templates', icon: FolderOpen },
    { name: 'Templates', href: '/templates', icon: Layers },
    ...(user ? [{ name: 'Profile', href: '/profile', icon: User }] : []),
  ];

  return (
    <aside
      className={`
        bg-[#0F121E] border-r border-[#1E2336] flex flex-col py-6 hidden md:flex h-screen shrink-0 transition-all duration-300
        ${isExpanded ? 'w-64' : 'w-20 items-center'}
      `}
    >
      {/* Logo and Toggle */}
      <div className={`flex items-center mb-10 px-4 ${isExpanded ? 'justify-between w-full' : 'justify-center'}`}>
        {isExpanded ? (
          <>
            {/* Logo text — only in expanded mode */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#5A4BFF] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(90,75,255,0.4)]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-black text-lg tracking-tight">SmartFolio</span>
            </div>
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
              className="w-9 h-9 flex items-center justify-center rounded-xl text-[#6B7280] hover:text-white hover:bg-[#1E2336] transition-colors"
              title="Collapse Sidebar"
            >
              <X size={20} />
            </button>
          </>
        ) : (
          /* Collapsed: single logo button that opens the sidebar */
          <button
            onClick={() => setIsExpanded(true)}
            className="w-9 h-9 bg-[#5A4BFF] rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(90,75,255,0.4)] hover:bg-[#4B3DE6] transition-colors"
            title="Expand Sidebar"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )}
      </div>

      {/* Nav Links */}
      <nav className={`flex-1 flex flex-col gap-1 w-full ${isExpanded ? 'px-3' : 'px-3 items-center'}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center rounded-xl transition-all duration-200
                ${isExpanded ? 'px-3 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
                ${isActive
                  ? 'bg-[#5A4BFF] text-white shadow-[0_4px_15px_rgba(90,75,255,0.25)]'
                  : 'text-[#6B7280] hover:text-white hover:bg-[#1E2336]'}
              `}
              title={!isExpanded ? item.name : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
              {isExpanded && <span className="font-semibold text-sm whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}

        {/* Divider */}
        <div className={`my-2 h-px bg-[#1E2336] ${isExpanded ? 'mx-0' : 'w-8'}`} />

        {/* View Portfolio — expandable accordion (only when logged in and has portfolios) */}
        {user && portfolios.length > 0 ? (
          <div className="w-full">
            {/* Accordion Toggle Button */}
            <button
              onClick={() => {
                if (!isExpanded) setIsExpanded(true);
                setPortfoliosOpen(prev => !prev);
              }}
              className={`
                flex items-center rounded-xl transition-all duration-200 w-full
                text-emerald-400 hover:text-emerald-300 hover:bg-[#1E2336]
                ${isExpanded ? 'px-3 py-3 gap-3' : 'w-12 h-12 justify-center'}
              `}
              title={!isExpanded ? 'View Portfolios' : undefined}
            >
              <ExternalLink size={20} strokeWidth={2} className="shrink-0" />
              {isExpanded && (
                <>
                  <span className="font-semibold text-sm whitespace-nowrap flex-1 text-left">
                    View Portfolio
                  </span>
                  <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform duration-300 ${portfoliosOpen ? 'rotate-180' : ''}`}
                  />
                </>
              )}
            </button>

            {/* Expanded subdomain list */}
            {isExpanded && portfoliosOpen && (
              <div className="mt-1 ml-3 pl-3 border-l border-[#1E2336] flex flex-col gap-0.5">
                {portfolios.map((p) => {
                  const url = getSubdomainUrl(p.subdomain);
                  const label = p.subdomain || p.templateId;
                  return (
                    <a
                      key={p._id}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-2 py-2 rounded-lg text-slate-400 hover:text-emerald-300 hover:bg-[#1E2336] transition-colors group"
                    >
                      <Globe size={13} className="shrink-0 text-emerald-500/60 group-hover:text-emerald-400" />
                      <span className="text-xs font-medium truncate">{label}</span>
                      <ExternalLink size={11} className="shrink-0 ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        ) : user ? (
          /* Logged in but no portfolios yet */
          <button
            disabled
            className={`
              flex items-center rounded-xl transition-all duration-200 text-[#3A4055] cursor-not-allowed w-full
              ${isExpanded ? 'px-3 py-3 gap-3' : 'w-12 h-12 justify-center'}
            `}
            title={!isExpanded ? 'No portfolios yet' : undefined}
          >
            <ExternalLink size={20} strokeWidth={2} className="shrink-0" />
            {isExpanded && <span className="font-semibold text-sm whitespace-nowrap">View Portfolio</span>}
          </button>
        ) : null}
      </nav>

      {/* Bottom: Login or Logout */}
      <div className={`w-full shrink-0 pt-4 border-t border-[#1E2336] mt-4 ${isExpanded ? 'px-3' : 'px-3 flex justify-center'}`}>
        {user ? (
          <button
            onClick={() => logout()}
            className={`
              flex items-center rounded-xl text-[#6B7280] hover:text-red-400 hover:bg-[#1E2336] transition-all duration-200
              ${isExpanded ? 'px-3 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
            `}
            title={!isExpanded ? 'Logout' : undefined}
          >
            <LogOut size={20} strokeWidth={2} className="shrink-0" />
            {isExpanded && <span className="font-semibold text-sm whitespace-nowrap">Logout</span>}
          </button>
        ) : (
          <Link
            href="/login"
            className={`
              flex items-center rounded-xl text-[#5A4BFF] hover:text-white hover:bg-[#5A4BFF] transition-all duration-200
              ${isExpanded ? 'px-3 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
            `}
            title={!isExpanded ? 'Login' : undefined}
          >
            <User size={20} strokeWidth={2} className="shrink-0" />
            {isExpanded && <span className="font-semibold text-sm whitespace-nowrap">Login</span>}
          </Link>
        )}
      </div>
    </aside>
  );
}
