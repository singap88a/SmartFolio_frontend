'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { templates } from '@/components/templates';
import Button from '@/components/ui/Button';
import { fetchApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, Check, X, Globe, Sparkles } from 'lucide-react';
import { APP_DOMAIN } from '@/lib/config';

const PREVIEW_DATA: Record<string, any> = {
  developer: {
    name: 'Alex Rivera',
    jobTitle: 'Full Stack Engineer',
    bio: 'I build high-performance web applications and cloud architectures. Passionate about clean code, developer tools, and system design.',
    logo: 'ALEX',
    logoType: 'text',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    whatsapp: '+1234567890',
    cvLink: '#',
    navbarLinks: [
      { label: 'About', url: '#hero' },
      { label: 'Skills', url: '#skills' },
      { label: 'Services', url: '#services' },
      { label: 'Projects', url: '#projects' },
      { label: 'Contact', url: '#contact' },
    ],
    skills: [
      { name: 'TypeScript', icon: 'Code' },
      { name: 'React / Next.js', icon: 'Globe' },
      { name: 'Node.js', icon: 'Server' },
      { name: 'GraphQL', icon: 'Database' },
      { name: 'Docker', icon: 'Terminal' },
      { name: 'AWS', icon: 'Cloud' },
    ],
    services: [
      { title: 'Frontend Architecture', description: 'Crafting responsive, optimized, and scalable user interfaces using modern React architectures.', icon: 'Monitor' },
      { title: 'API & Backend Systems', description: 'Designing robust RESTful and GraphQL APIs with microservices and secure database structures.', icon: 'Server' },
      { title: 'Performance Optimization', description: 'Auditing and accelerating web apps to achieve perfect Web Vitals and lightning-fast load times.', icon: 'Gauge' }
    ],
    projects: [
      {
        title: 'CloudOps Dashboard',
        description: 'A real-time server monitoring dashboard featuring live websockets, metric visualizations, and cluster alerts.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
        link: '#',
        skills: ['Next.js', 'Tailwind', 'Go', 'Websockets']
      },
      {
        title: 'Aura Commerce',
        description: 'A headless e-commerce store with dynamic cart syncing, international payment support, and fluid layout translations.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
        link: '#',
        skills: ['React', 'GraphQL', 'Stripe', 'Node.js']
      }
    ],
    socialLinks: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    contact: {
      title: "Let&apos;s build the future together",
      description: 'I am open to consulting projects, freelance engagements, and full-time opportunities. Reach out and let&apos;s talk!',
      email: 'alex.rivera@example.com',
      phone: '+1 (555) 019-2834'
    },
    newsletter: {
      title: 'Weekly Tech Insights',
      description: 'Get parsed software design patterns, system architecture tips, and performance articles directly in your inbox.'
    },
    footer: {
      description: 'Engineering high-performance portfolios and web interfaces that make a lasting professional statement.',
      copyRight: '© 2026 Alex Rivera. All rights reserved.'
    },
    themeColor: '#4f46e5'
  },
  creative: {
    name: 'Sophia Chen',
    jobTitle: 'Creative Director & Designer',
    bio: 'Sculpting unique visual narratives and brand identities. Specializing in high-end web layouts, kinetic typography, and editorial systems.',
    logo: 'SOPHIA',
    logoType: 'text',
    heroImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
    whatsapp: '+1234567890',
    cvLink: '#',
    navbarLinks: [
      { label: 'Introduction', url: '#hero' },
      { label: 'Expertise', url: '#skills' },
      { label: 'Philosophy', url: '#services' },
      { label: 'Portfolios', url: '#projects' },
      { label: 'Connect', url: '#contact' },
    ],
    skills: [
      { name: 'Creative Direction', icon: 'Palette' },
      { name: 'Brand Identity', icon: 'Award' },
      { name: 'Web & UI Design', icon: 'Layout' },
      { name: 'Typography', icon: 'Type' },
      { name: 'Motion Design', icon: 'Layers' },
      { name: 'User Experience', icon: 'Compass' },
    ],
    services: [
      { title: 'Brand Identity Systems', description: 'Designing complete visual guidelines, typography sets, and color palettes that shape modern cultural brands.', icon: 'Award' },
      { title: 'Interactive Web Spaces', description: 'Developing creative web layouts that combine high-end editorial styling with seamless interactive animations.', icon: 'Layout' },
      { title: 'Art & Motion Direction', description: 'Directing visual campaigns and kinetic systems that demand user engagement and elevate digital brand assets.', icon: 'Layers' }
    ],
    projects: [
      {
        title: 'Verge Editorial',
        description: 'A conceptual digital lookbook showcasing fluid layout dynamics, fine serif spacing, and experimental visual spacing.',
        image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800',
        link: '#',
        skills: ['Branding', 'Typography', 'Framer']
      },
      {
        title: 'Chronos Identity',
        description: 'Complete brand guidelines, logos, and print layouts designed for an organic Swiss watchmaker.',
        image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?auto=format&fit=crop&q=80&w=800',
        link: '#',
        skills: ['Art Direction', 'Logo Design', 'Print']
      }
    ],
    socialLinks: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    },
    contact: {
      title: 'Let&apos;s design a new reality together.',
      description: 'Have a vision waiting to be created? Reach out for collaborations, visual consulting, or projects.',
      email: 'hello@sophiachen.design',
      phone: '+1 (555) 981-0231'
    },
    newsletter: {
      title: 'Creative Notes',
      description: 'Occasional dispatches containing design inspiration, typography collections, and fresh layout ideas.'
    },
    footer: {
      description: 'Empowering visual statements and brand experiences through clean, intentional design.',
      copyRight: '© 2026 Sophia Chen. All rights reserved.'
    },
    themeColor: '#ec4899'
  }
};

const TemplatePreviewPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  
  const templateId = searchParams.get('id') || 'developer';
  
  // Selection & Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subdomain, setSubdomain] = useState('');
  const [isValidFormat, setIsValidFormat] = useState(true);
  const [isChecking, setIsChecking] = useState(false);
  const [availability, setAvailability] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
  
  const [isSelecting, setIsSelecting] = useState(false);
  const [isAlreadySelected, setIsAlreadySelected] = useState(false);
  const [dataLoading, setDataLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
    }

    const checkActiveStatus = async () => {
      try {
        const data = await fetchApi('/portfolio/my');
        if (data && Array.isArray(data)) {
          setIsAlreadySelected(data.some((p: any) => p.templateId === templateId));
        } else if (data && typeof data === 'object') {
          setIsAlreadySelected(data.templateId === templateId);
        }
      } catch (err) {
        console.error('Failed to load active portfolios:', err);
      } finally {
        setDataLoading(false);
      }
    };

    if (user) {
      checkActiveStatus();
    } else if (!authLoading) {
      setDataLoading(false);
    }
  }, [user, authLoading, templateId, router]);

  // Handle subdomain input change & debounced validation
  useEffect(() => {
    if (!subdomain) {
      setAvailability('idle');
      return;
    }

    // Format validation
    const formatRegex = /^[a-z0-9-]+$/;
    if (!formatRegex.test(subdomain)) {
      setIsValidFormat(false);
      setAvailability('idle');
      return;
    }
    setIsValidFormat(true);
    setAvailability('checking');

    const delayDebounceFn = setTimeout(async () => {
      try {
        const res = await fetchApi(`/portfolio/check-subdomain?subdomain=${subdomain.toLowerCase()}`);
        if (res && res.available) {
          setAvailability('available');
        } else {
          setAvailability('taken');
        }
      } catch {
        setAvailability('taken');
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [subdomain]);

  const handleSelectTemplate = async () => {
    if (isAlreadySelected) return;
    setIsModalOpen(true);
  };

  const handleConfirmActivation = async () => {
    if (availability !== 'available' || !isValidFormat || !subdomain) return;
    setIsSelecting(true);
    try {
      const defaultData = PREVIEW_DATA[templateId] || PREVIEW_DATA.developer;
      
      // Initialize/Save this template portfolio with custom subdomain
      await fetchApi('/portfolio', {
        method: 'POST',
        body: JSON.stringify({
          templateId,
          subdomain: subdomain.toLowerCase(),
          data: defaultData
        })
      });

      setIsModalOpen(false);
      router.push('/my-templates');
    } catch (error) {
      console.error('Failed to select template:', error);
      alert('Error selecting template. Please try again.');
    } finally {
      setIsSelecting(false);
    }
  };

  if (authLoading || dataLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0F19]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5A4BFF]"></div>
      </div>
    );
  }

  const TemplateComponent = templates[templateId as keyof typeof templates] || templates.developer;
  const templateData = PREVIEW_DATA[templateId] || PREVIEW_DATA.developer;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white relative">
      
      {/* Sticky Bar for Choice */}
      <div className="sticky top-0 z-40 bg-[#0F121E]/90 backdrop-blur-md border-b border-[#1E2336] px-6 py-4 flex items-center justify-between shadow-lg">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Templates</span>
        </button>

        <div className="text-center hidden sm:block">
          <span className="text-xs uppercase tracking-widest text-slate-500 font-bold">Reviewing Design</span>
          <h2 className="text-sm font-bold text-white uppercase mt-0.5">{templateId} Template</h2>
        </div>

        <Button 
          onClick={handleSelectTemplate}
          disabled={isAlreadySelected}
          className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
            isAlreadySelected 
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 cursor-not-allowed' 
              : 'bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 shadow-[0_0_15px_rgba(90,75,255,0.3)] hover:-translate-y-0.5 active:scale-98'
          }`}
        >
          {isAlreadySelected ? (
            <>
              <Check size={14} />
              Already Selected
            </>
          ) : (
            <>
              <Sparkles size={14} />
              Choose this template
            </>
          )}
        </Button>
      </div>

      {/* Live scrollable preview element */}
      <div className="flex-1 overflow-y-auto bg-slate-950">
        <TemplateComponent data={templateData} />
      </div>

      {/* Subdomain Picker Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-[#060810]/85 backdrop-blur-md"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Container */}
          <div className="bg-[#0F121E] border border-[#232943] w-full max-w-lg rounded-3xl p-8 relative z-10 shadow-2xl hover:border-[#5A4BFF]/30 transition-all duration-300">
            {/* Close Button */}
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>

            {/* Header */}
            <div className="mb-6">
              <div className="w-12 h-12 bg-[#5A4BFF]/10 rounded-2xl flex items-center justify-center mb-4 border border-[#5A4BFF]/25">
                <Globe className="text-[#5A4BFF]" size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Configure Template Subdomain</h3>
              <p className="text-slate-400 text-sm">
                Each portfolio template runs on its own unique subdomain. Pick an available subdomain below.
              </p>
            </div>

            {/* Input field */}
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Subdomain Address</label>
              <div className="flex items-center bg-[#070A13] border border-[#232943] rounded-2xl px-4 py-3.5 focus-within:border-[#5A4BFF] transition-colors relative">
                <input 
                  type="text" 
                  value={subdomain} 
                  onChange={(e) => setSubdomain(e.target.value.toLowerCase())}
                  placeholder="my-portfolio"
                  className="bg-transparent text-white placeholder-slate-600 outline-none text-sm w-full font-semibold"
                  autoFocus
                />
                <span className="text-sm font-bold text-slate-500 select-none ml-2">
                  .{APP_DOMAIN}
                </span>
              </div>

              {/* Validation helper lines */}
              <div className="mt-3 text-xs min-h-5">
                {!subdomain && (
                  <span className="text-slate-500">Only letters, numbers, and hyphens (-) allowed</span>
                )}
                {subdomain && !isValidFormat && (
                  <span className="text-red-400 flex items-center gap-1">
                    <X size={12} /> Only letters, numbers, and hyphens allowed (lowercase)
                  </span>
                )}
                {subdomain && isValidFormat && availability === 'checking' && (
                  <span className="text-[#5A4BFF] flex items-center gap-1.5 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5A4BFF]" /> Checking availability...
                  </span>
                )}
                {subdomain && isValidFormat && availability === 'available' && (
                  <span className="text-emerald-400 flex items-center gap-1.5">
                    <Check size={12} strokeWidth={3} /> Subdomain is available!
                  </span>
                )}
                {subdomain && isValidFormat && availability === 'taken' && (
                  <span className="text-red-400 flex items-center gap-1.5">
                    <X size={12} /> This subdomain is already taken
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <Button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 border border-[#232943] bg-transparent text-slate-300 hover:bg-[#1E2336] rounded-xl text-sm font-bold"
              >
                Cancel
              </Button>
              <Button 
                onClick={handleConfirmActivation}
                isLoading={isSelecting}
                disabled={availability !== 'available' || !isValidFormat || !subdomain}
                className="flex-1 py-3 bg-[#5A4BFF] hover:bg-[#4B3DE6] text-white border-0 rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(90,75,255,0.2)] disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed"
              >
                Activate Design
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplatePreviewPage;
