'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { LayoutTemplate, ArrowRight } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      login(data.user);
      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex relative overflow-hidden w-full items-center justify-center">
      {/* Background Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#5A4BFF]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Center: Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="max-w-[380px] w-full bg-[#0F121E]/90 backdrop-blur-xl border border-[#1E2336] p-6 sm:p-8 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-[#5A4BFF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(90,75,255,0.4)]">
              <LayoutTemplate className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black mb-2 text-white tracking-tight">Sign In</h2>
            <p className="text-slate-400 text-xs">Enter your email and password to access your account.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <Input 
              label="Email Address" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              placeholder="john@example.com"
            />
            <div className="space-y-1">
              <Input 
                label="Password" 
                type="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                placeholder="••••••••"
              />
              <div className="flex justify-end pt-1">
                <a href="#" className="text-[11px] font-semibold text-[#5A4BFF] hover:text-[#7B6FFF] transition-colors">
                  Forgot password?
                </a>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full h-12 mt-4 text-sm font-bold bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 shadow-[0_0_20px_rgba(90,75,255,0.25)] hover:shadow-[0_0_25px_rgba(90,75,255,0.4)] transition-all flex items-center justify-center gap-2 rounded-xl" 
              isLoading={isLoading}
            >
              Sign In <ArrowRight size={16} />
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-xs text-slate-400 font-medium">
              Don't have an account?{' '}
              <Link href="/register" className="text-[#5A4BFF] font-bold hover:text-white transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
