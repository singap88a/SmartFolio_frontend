'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Footer = () => {
  const pathname = usePathname();
  
  // Check if we are on a portfolio route (any route that is not a core platform route)
  const coreRoutes = ['/', '/login', '/register', '/templates', '/profile', '/create'];
  const isPortfolioRoute = !coreRoutes.some(route => pathname === route || pathname.startsWith(`${route}/`));
  
  if (isPortfolioRoute) {
    return null;
  }

  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-slate-900 dark:bg-white rounded-xl flex items-center justify-center text-white dark:text-slate-900 font-black text-xl">P</div>
              <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
                Portfolify<span className="text-indigo-600">.</span>
              </span>
            </Link>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed mb-8">
              Empowering creators to showcase their best work with professional, high-end portfolios that launch in seconds.
            </p>
            <div className="flex gap-4">
              {['Twitter', 'Instagram', 'LinkedIn', 'Dribbble'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center text-slate-500 hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-slate-900 transition-all">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-current rounded-sm opacity-20"></div>
                </a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs mb-8">Platform</h4>
            <ul className="space-y-4">
              <li><Link href="/templates" className="text-slate-500 hover:text-indigo-600 transition-colors">Templates</Link></li>
              <li><Link href="/profile/dashboard" className="text-slate-500 hover:text-indigo-600 transition-colors">Dashboard</Link></li>
              <li><Link href="/pricing" className="text-slate-500 hover:text-indigo-600 transition-colors">Pricing</Link></li>
              <li><Link href="/showcase" className="text-slate-500 hover:text-indigo-600 transition-colors">Showcase</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs mb-8">Company</h4>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-slate-500 hover:text-indigo-600 transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="text-slate-500 hover:text-indigo-600 transition-colors">Blog</Link></li>
              <li><Link href="/careers" className="text-slate-500 hover:text-indigo-600 transition-colors">Careers</Link></li>
              <li><Link href="/contact" className="text-slate-500 hover:text-indigo-600 transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Portfolify Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 dark:hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
