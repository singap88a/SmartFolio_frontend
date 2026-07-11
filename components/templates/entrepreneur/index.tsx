'use client';
import React from 'react';
import Button from '../../ui/Button';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  if (!name) return null;
  const iconDef = (SolidIcons as any)[name] || (BrandIcons as any)[name] || SolidIcons.faCircleQuestion;
  return <FontAwesomeIcon icon={iconDef} className={className} />;
};

import { TemplateProps } from '../types';

const EntrepreneurTemplate = ({ data }: TemplateProps) => {
  const accentColor = data.themeColor || '#0f172a'; // Default to deeply corporate navy
  const primaryColor = '#1e40af'; // Bright blue for highlights
  
  return (
    <div className="min-h-full bg-slate-50 text-slate-800 font-sans selection:bg-blue-200">
      
      {/* 1. Elegant Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="text-2xl font-serif font-bold tracking-tight text-slate-900">
                {data.logo || data.name?.split(' ')[0] || 'Founder'}
              </div>
            )}
          </div>
          
          <div className="flex gap-8 items-center">
            <nav className="hidden md:flex gap-8 items-center">
              {data.navbarLinks?.map((link, i) => (
                <a 
                  key={i} 
                  href={link.url} 
                  onClick={(e) => {
                    if (link.url.startsWith('#')) {
                      e.preventDefault();
                      document.getElementById(link.url.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} 
                  className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block w-px h-5 bg-slate-200 mx-1"></div>
            <Button 
              className="rounded px-6 py-2.5 text-sm font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5" 
              style={{ backgroundColor: accentColor, color: '#fff' }} 
              onClick={() => {
                const link = data.navbarCtaLink || '#contact';
                if (link.startsWith('#')) {
                  document.getElementById(link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(link, '_blank');
                }
              }}
            >
              {data.navbarCtaText || 'Connect'}
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Executive Hero Section */}
      <section id="hero" className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden bg-white">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50 transform skew-x-12 translate-x-32 origin-top-right z-0"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="inline-block px-4 py-1.5 rounded bg-slate-100 text-sm font-bold tracking-wide mb-6 uppercase" style={{ color: primaryColor }}>
              {data.jobTitle || 'Entrepreneur & Executive'}
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">
              Driving <span style={{ color: accentColor }}>Innovation</span> <br/>
              Building Value.
            </h1>
            
            <p className="text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
              {data.bio || "Passionate about scaling startups, streamlining operations, and building robust business models. I help companies navigate complex growth phases."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded font-semibold px-8 py-3" style={{ backgroundColor: accentColor }} onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                Discuss a Project
              </Button>
              {data.cvLink && (
                <Button variant="outline" size="lg" className="rounded font-semibold px-8 py-3 border-slate-300 text-slate-700 hover:bg-slate-50" onClick={() => window.open(data.cvLink, '_blank')}>
                  Download Profile
                </Button>
              )}
            </div>
            
            {/* Trust Badges / Social Proof Simulation */}
            <div className="mt-16 pt-8 border-t border-slate-200">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">Connect Professionally</p>
              <div className="flex gap-6">
                {Object.entries(data.socialLinks || {}).map(([key, value]) => (
                  value && (
                    <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-800 transition-colors">
                      <DynamicIcon name={`fa${key.charAt(0).toUpperCase()}${key.slice(1)}`} className="text-2xl" />
                    </a>
                  )
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative aspect-[3/4] md:aspect-square lg:aspect-[4/5] rounded bg-slate-200 overflow-hidden shadow-2xl">
              <img 
                src={data.heroImage || "https://images.unsplash.com/photo-1556761175-5973dc0f32d7?auto=format&fit=crop&q=80&w=800"} 
                alt={data.name} 
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stat Box floating */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded shadow-xl border border-slate-100 hidden md:block">
              <p className="text-4xl font-bold text-slate-900 mb-1" style={{ color: primaryColor }}>10+</p>
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">Years Experience</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Value Proposition (Services) */}
      <section id="services" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Core Competencies</h2>
            <div className="w-16 h-1 mx-auto rounded" style={{ backgroundColor: primaryColor }}></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services?.map((service, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-10 rounded shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 rounded bg-slate-50 flex items-center justify-center mb-6" style={{ color: primaryColor }}>
                  {service.icon ? <DynamicIcon name={service.icon} className="text-2xl" /> : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Strategic Case Studies (Projects) */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">Strategic Ventures</h2>
              <div className="w-16 h-1 rounded" style={{ backgroundColor: primaryColor }}></div>
            </div>
            <p className="text-slate-500 max-w-md">Highlighting key milestones, successful launches, and measurable impact across various industries.</p>
          </div>
          
          <div className="space-y-16">
            {data.projects?.map((project, i) => (
              <motion.div 
                key={i} 
                className={`flex flex-col gap-10 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="w-full lg:w-1/2">
                  <div className="aspect-[16/10] bg-slate-100 rounded overflow-hidden shadow-md">
                    <img 
                      src={project.image || `https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800`} 
                      alt={project.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-1/2 lg:px-8">
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {project.skills?.map((s, j) => (
                      <span key={j} className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded">{s}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{project.title}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed text-base">{project.description}</p>
                  {project.link && (
                    <Button variant="outline" className="rounded font-semibold px-6 py-2 border-slate-300 text-slate-900 hover:bg-slate-50 hover:text-slate-900" onClick={() => window.open(project.link, '_blank')}>
                      View Case Study &rarr;
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Skills Matrix */}
      <section id="skills" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-16 text-center">Professional Capabilities</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {data.skills?.map((skill, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-800 rounded border border-slate-700 hover:border-slate-500 transition-colors">
                <div className="mb-4 text-3xl" style={{ color: '#60a5fa' }}>
                  {skill.icon ? <DynamicIcon name={skill.icon} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <span className="font-semibold text-sm text-center text-slate-200">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Executive Contact */}
      <section id="contact" className="py-24 bg-slate-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-5/12 p-10 md:p-12 text-white flex flex-col justify-between" style={{ backgroundColor: accentColor }}>
              <div>
                <h2 className="text-3xl font-serif font-bold mb-4">{data.contact?.title || 'Let\'s collaborate.'}</h2>
                <p className="text-slate-300 text-sm leading-relaxed mb-10">
                  {data.contact?.description || "Open for executive roles, board memberships, and strategic consulting."}
                </p>
                
                <div className="space-y-6">
                  {data.contact?.email && (
                    <div className="flex items-center gap-4">
                      <DynamicIcon name="faEnvelope" className="text-slate-400" />
                      <span className="font-medium text-sm">{data.contact.email}</span>
                    </div>
                  )}
                  {data.contact?.phone && (
                    <div className="flex items-center gap-4">
                      <DynamicIcon name="faPhone" className="text-slate-400" />
                      <span className="font-medium text-sm">{data.contact.phone}</span>
                    </div>
                  )}
                  {data.contact?.address && (
                    <div className="flex items-center gap-4">
                      <DynamicIcon name="faMapMarkerAlt" className="text-slate-400" />
                      <span className="font-medium text-sm">{data.contact.address}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="md:w-7/12 p-10 md:p-12 bg-white">
              <h3 className="text-xl font-bold text-slate-900 mb-6">{data.newsletter?.title || 'Reach Out Directly'}</h3>
              <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                <div className="grid grid-cols-2 gap-4">
                  <input type="text" placeholder="First Name" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:border-slate-400 text-sm" required />
                  <input type="text" placeholder="Last Name" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:border-slate-400 text-sm" required />
                </div>
                <input type="email" placeholder="Business Email" className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:border-slate-400 text-sm" required />
                <textarea placeholder="How can I help you?" rows={4} className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 outline-none focus:border-slate-400 text-sm" required></textarea>
                <Button className="w-full py-3 rounded font-semibold" style={{ backgroundColor: accentColor, color: '#fff' }}>
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-white text-lg">{data.logo || data.name}</span>
          </div>
          <p>{data.footer?.copyRight || `© ${new Date().getFullYear()} ${data.name}. All rights reserved.`}</p>
          <div className="flex gap-4">
             {data.navbarLinks?.map((link, i) => (
                <a key={i} href={link.url} className="hover:text-white transition-colors">{link.label}</a>
             ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default EntrepreneurTemplate;
