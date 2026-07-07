'use client';
import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from '../ui/Button';
import { useAuth } from '@/context/AuthContext';
import { User as UserIcon, LayoutDashboard, LogOut, ChevronDown, Globe } from 'lucide-react';
import { getSubdomainUrl } from '@/lib/config';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
    router.push('/login');
    router.refresh();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  // Check if we are on a portfolio route (any route that is not a core platform route)
  const coreRoutes = ['/', '/login', '/register', '/templates', '/profile', '/create'];
  const isPortfolioRoute = !coreRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
  
  if (isPortfolioRoute) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-12">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 font-black text-xl transition-transform group-hover:rotate-12">P</div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                Portfolify<span className="text-brand-500">.</span>
              </span>
            </Link>
            
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest">
                Home
              </Link>
              <Link href="/templates" className="text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors uppercase tracking-widest">
                Templates
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {!isLoading && (
              user ? (
                <div className="relative" ref={dropdownRef}>
                  <button 
                    onClick={() => setIsOpen(!isOpen)}
                    onMouseEnter={() => setIsOpen(true)}
                    className="flex items-center gap-2 p-1.5 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-900 transition-all duration-200 cursor-pointer focus:outline-none border border-transparent hover:border-slate-200/60 dark:hover:border-slate-800/60"
                  >
                    <img 
                      src={user.profileImage || defaultAvatar} 
                      alt={user.username} 
                      className="w-9 h-9 rounded-xl object-cover border border-slate-200/50 dark:border-slate-800"
                    />
                    <span className="hidden sm:block text-xs font-bold text-slate-755 dark:text-slate-300 px-1">
                      {user.username}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div 
                      onMouseLeave={() => setIsOpen(false)}
                      className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60 shadow-2xl py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                    >
                      {/* User Header */}
                      <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-2">
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Signed In As</p>
                        <p className="font-extrabold text-sm text-slate-800 dark:text-white truncate">{user.username}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>

                      {/* Dropdown Links */}
                      <Link 
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <UserIcon className="w-4 h-4 text-slate-400" />
                        My Profile
                      </Link>

                      <Link 
                        href="/profile/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-350 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4 text-slate-400" />
                        Dashboard
                      </Link>

                      {user.subdomain && (
                        <a 
                          href={getSubdomainUrl(user.subdomain)}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-355 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                        >
                          <Globe className="w-4 h-4 text-brand-500" />
                          View Portfolio
                        </a>
                      )}

                      <div className="border-t border-slate-100 dark:border-slate-800 mt-2 pt-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors text-left cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link href="/login" className="hidden sm:block">
                    <Button variant="ghost" className="font-bold uppercase tracking-widest text-xs">Login</Button>
                  </Link>
                  <Link href="/register">
                    <Button variant="primary" size="md" className="font-bold uppercase tracking-widest text-xs px-6 h-12 rounded-xl shadow-xl shadow-brand-500/20">
                      Join Now
                    </Button>
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
