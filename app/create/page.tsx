'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import PortfolioForm from '@/components/portfolio/PortfolioForm';
import LivePreview from '@/components/portfolio/LivePreview';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

const DEFAULT_DATA = {
  name: '',
  jobTitle: '',
  bio: '',
  logo: '',
  logoType: 'text' as 'text' | 'image',
  heroImage: '',
  whatsapp: '',
  cvLink: '',
  navbarLinks: [
    { label: 'About', url: '#about' },
    { label: 'Work', url: '#work' },
    { label: 'Contact', url: '#contact' },
  ],
  skills: [
    { name: 'React', icon: 'Code' },
    { name: 'Next.js', icon: 'Globe' },
    { name: 'TypeScript', icon: 'FileCode' },
    { name: 'Node.js', icon: 'Server' },
  ],
  services: [
    { title: 'Web Development', description: 'Building fast, responsive, and SEO-friendly websites.', icon: 'Monitor' },
    { title: 'UI/UX Design', description: 'Creating beautiful and intuitive user interfaces.', icon: 'Palette' }
  ],
  projects: [
    { 
      title: 'Project One', 
      description: 'A brief description of your amazing project.',
      image: '',
      link: '',
      skills: ['Next.js', 'Tailwind']
    }
  ],
  socialLinks: {
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    github: ''
  },
  contact: { 
    title: "Let's work together", 
    description: 'Feel free to reach out for collaborations or just a friendly hello',
    email: 'hello@example.com', 
    phone: '+1 234 567 890' 
  },
  newsletter: {
    title: 'Subscribe to Newsletter',
    description: 'Get the latest updates and articles directly in your inbox.'
  },
  footer: {
    description: 'Empowering creators to showcase their best work with professional, high-end portfolios.',
    copyRight: '© 2026 Portfolify. All rights reserved.'
  },
  faqs: [],
  testimonials: [],
  themeColor: '#4f46e5'
};

const CreatePortfolioPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const templateId = searchParams.get('template') || 'developer';
  
  const [data, setData] = useState(DEFAULT_DATA);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
      if (!user.subdomain) {
        router.push('/profile?requireSubdomain=true');
        return;
      }
    }

    // Check for existing portfolio
    const fetchPortfolio = async () => {
      try {
        const portfolio = await fetchApi('/portfolio/my');
        if (portfolio && portfolio.data) {
          setData(portfolio.data);
        }
      } catch (err) {
        console.error('Failed to fetch portfolio:', err);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchPortfolio();
    }
    
    if (templateId === 'creative') {
      setData(prev => ({ ...prev, themeColor: '#ec4899' }));
    }
  }, [templateId, user, authLoading, router]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await fetchApi('/portfolio', {
        method: 'POST',
        body: JSON.stringify({ templateId, data }),
      });
      
      router.push('/profile/dashboard');
    } catch (err) {
      alert('Error saving portfolio. Are you logged in?');
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19]">
      {/* Header */}
      <div className="sticky top-16 z-40 bg-[#0F121E] border-b border-[#1E2336] px-4 py-4">
        <div className="w-full px-4 md:px-6 mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold ">Creating your portfolio</h1>
            <p className="text-sm text-slate-400">Template: {templateId.charAt(0).toUpperCase() + templateId.slice(1)}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button variant="primary" onClick={handleSave} isLoading={isSaving}>Publish Portfolio</Button>
          </div>
        </div>
      </div>

      <div className="w-full px-4 md:px-6 py-6">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Form Side */}
          <div className="w-full lg:w-[650px] shrink-0 bg-[#0F121E] rounded-2xl p-5 shadow-sm border border-[#1E2336] lg:sticky lg:top-[120px] h-[calc(100vh-140px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
            <PortfolioForm data={data} onChange={setData} />
          </div>

          {/* Preview Side */}
          <div className="flex-1 w-full lg:sticky lg:top-[120px] h-[calc(100vh-140px)]">
            <LivePreview templateId={templateId} data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePortfolioPage;

