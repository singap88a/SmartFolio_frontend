'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, ChevronDown, LogOut, Settings, User as UserIcon } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 bg-[#0B0F19] shrink-0 border-b border-[#1E2336]/50 relative z-50">
      {/* Brand */}
      <div className="flex items-center gap-3">
        <span className="text-white text-xl font-bold tracking-tight md:hidden">SmartFolio</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-[#6B7280]" />
          </div>
          <input 
            type="text" 
            placeholder="Search portfolios..." 
            className="block w-full pl-10 pr-3 py-2 border border-[#1E2336] rounded-xl leading-5 bg-[#0F121E] text-white placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#5A4BFF] focus:border-[#5A4BFF] sm:text-sm transition-colors"
          />
        </div>
      </div>

      {/* Right side actions */}
      <div className="flex items-center gap-6">
        <button className="text-[#6B7280] hover:text-white transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-[#0B0F19]"></span>
        </button>
        
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#1E2336] shrink-0">
                <img 
                  src={user?.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-sm font-semibold text-white group-hover:text-[#5A4BFF] transition-colors">{user?.username || 'User'}</span>
                <span className="text-xs text-[#6B7280]">{user?.email || 'email@example.com'}</span>
              </div>
              <ChevronDown size={16} className={`text-[#6B7280] hidden md:block transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-[#0F121E] border border-[#1E2336] rounded-xl shadow-xl py-2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 border-b border-[#1E2336] md:hidden">
                  <span className="block text-sm font-semibold text-white">{user?.username}</span>
                  <span className="block text-xs text-[#6B7280] truncate">{user?.email}</span>
                </div>
                
                <Link 
                  href="/profile" 
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#1E2336] flex items-center gap-2 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <UserIcon size={16} />
                  My Profile
                </Link>
                
                <Link 
                  href="/profile" 
                  className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-[#1E2336] flex items-center gap-2 transition-colors"
                  onClick={() => setDropdownOpen(false)}
                >
                  <Settings size={16} />
                  Settings
                </Link>

                <div className="h-px bg-[#1E2336] my-1 mx-2"></div>
                
                <button 
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-[#1E2336] flex items-center gap-2 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="px-4 py-2 bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white rounded-lg text-sm font-semibold transition-colors">
            Login
          </a>
        )}
      </div>
    </header>
  );
}
