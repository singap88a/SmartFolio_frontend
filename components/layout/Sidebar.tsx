'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, Home, Grid, Settings, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const navItems = [
    { name: 'الرئيسية', href: '/discover', icon: LayoutGrid },
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Templates', href: '/templates', icon: Grid },
    { name: 'Profile Settings', href: '/profile', icon: Settings },
  ];

  return (
    <aside 
      className={`
        bg-[#0F121E] border-r border-[#1E2336] flex flex-col py-6 hidden md:flex h-screen shrink-0 transition-all duration-300
        ${isExpanded ? 'w-64' : 'w-20 items-center'}
      `}
    >
      {/* Logo and Toggle */}
      <div className={`flex items-center mb-8 px-4 ${isExpanded ? 'justify-between' : 'justify-center'}`}>
        {isExpanded ? (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#5A4BFF] rounded-xl flex items-center justify-center shrink-0">
              <Link href="/">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
            <span className="text-white font-bold text-lg tracking-tight">SmartFolio</span>
          </div>
        ) : null}

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-10 h-10 flex items-center justify-center rounded-xl text-[#6B7280] hover:text-white hover:bg-[#1E2336] transition-colors"
          title="Toggle Sidebar"
        >
          {isExpanded ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Nav Links */}
      <nav className={`flex-1 flex flex-col gap-4 w-full ${isExpanded ? 'px-4' : 'px-4 items-center'}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`
                flex items-center rounded-xl transition-all duration-200
                ${isExpanded ? 'px-4 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
                ${isActive 
                  ? 'bg-[#5A4BFF] text-white shadow-lg shadow-[#5A4BFF]/20' 
                  : 'text-[#6B7280] hover:text-white hover:bg-[#1E2336]'}
              `}
              title={!isExpanded ? item.name : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} className="shrink-0" />
              {isExpanded && <span className="font-medium whitespace-nowrap">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom Action */}
      <div className={`w-full flex shrink-0 ${isExpanded ? 'px-4' : 'px-4 items-center'}`}>
        <button
          onClick={() => logout()}
          className={`
            flex items-center rounded-xl text-[#6B7280] hover:text-red-400 hover:bg-[#1E2336] transition-all duration-200
            ${isExpanded ? 'px-4 py-3 gap-3 w-full' : 'w-12 h-12 justify-center'}
          `}
          title={!isExpanded ? 'Logout' : undefined}
        >
          <LogOut size={20} strokeWidth={2} className="shrink-0" />
          {isExpanded && <span className="font-medium whitespace-nowrap">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
