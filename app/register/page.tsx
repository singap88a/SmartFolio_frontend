'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { fetchApi } from '@/lib/api';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      await fetchApi('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
      });

      // Success - redirect to login
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-6 w-full">
      <div className="max-w-md w-full bg-[#0F121E] rounded-3xl p-10 shadow-2xl border border-[#1E2336]">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black mb-2 text-white uppercase tracking-tighter">Create Account</h1>
          <p className="text-slate-400 text-sm">Join SmartFolio and start building today.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm font-bold text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          <Input 
            label="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            placeholder="johndoe"
            className="bg-[#0B0F19] border-[#1E2336] text-white focus:border-[#5A4BFF] focus:ring-[#5A4BFF]"
          />
          <Input 
            label="Email Address" 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="john@example.com"
            className="bg-[#0B0F19] border-[#1E2336] text-white focus:border-[#5A4BFF] focus:ring-[#5A4BFF]"
          />
          <Input 
            label="Password" 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="••••••••"
            className="bg-[#0B0F19] border-[#1E2336] text-white focus:border-[#5A4BFF] focus:ring-[#5A4BFF]"
          />
          <Input 
            label="Confirm Password" 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            placeholder="••••••••"
            className="bg-[#0B0F19] border-[#1E2336] text-white focus:border-[#5A4BFF] focus:ring-[#5A4BFF]"
          />
          
          <Button type="submit" className="w-full h-14 text-lg bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0" isLoading={isLoading}>
            Get Started
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-[#5A4BFF] font-bold hover:underline">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
