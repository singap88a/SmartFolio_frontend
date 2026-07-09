'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, FolderOpen, Layers, User, ExternalLink, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { getSubdomainUrl } from '@/lib/config';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'My Templates', href: '/my-templates', icon: FolderOpen },
    { name: 'Templates', href: '/templates', icon: Layers },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const portfolioUrl = user?.subdomain ? getSubdomainUrl(user.subdomain) : null;

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
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#5A4BFF] rounded-xl flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(90,75,255,0.4)]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-white font-black text-lg tracking-tight">SmartFolio</span>
          </div>
        ) : (
          <div className="w-9 h-9 bg-[#5A4BFF] rounded-xl flex items-center justify-center shadow-[0_0_12px_rgba(90,75,255,0.4)]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-[#6B7280] hover:text-white hover:bg-[#1E2336] transition-colors"
          title="Toggle Sidebar"
        >
          {isExpanded ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className={`flex-1 flex flex-col gap-2 w-full ${isExpanded ? 'px-3' : 'px-3 items-center'}`}>
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

        {/* View Portfolio — opens in new tab */}
        {portfolioUrl ? (
          <a
            href={portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              flex items-center rounded-xl transition-all duration-200 text-emerald-400 hover:text-emerald-300 hover:bg-[#1E2336]
              ${isExpanded ? 'px-3 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
            `}
            title={!isExpanded ? 'View Portfolio' : undefined}
          >
            <ExternalLink size={20} strokeWidth={2} className="shrink-0" />
            {isExpanded && <span className="font-semibold text-sm whitespace-nowrap">View Portfolio</span>}
          </a>
        ) : (
          <button
            disabled
            className={`
              flex items-center rounded-xl transition-all duration-200 text-[#3A4055] cursor-not-allowed
              ${isExpanded ? 'px-3 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
            `}
            title={!isExpanded ? 'No portfolio yet' : undefined}
          >
            <ExternalLink size={20} strokeWidth={2} className="shrink-0" />
            {isExpanded && <span className="font-semibold text-sm whitespace-nowrap">View Portfolio</span>}
          </button>
        )}
      </nav>

      {/* Bottom: Logout */}
      <div className={`w-full shrink-0 pt-4 border-t border-[#1E2336] mt-4 ${isExpanded ? 'px-3' : 'px-3 flex justify-center'}`}>
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
      </div>
    </aside>
  );
}
