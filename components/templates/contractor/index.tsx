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

const ContractorTemplate = ({ data }: TemplateProps) => {
  const accentColor = data.themeColor || '#facc15'; // Default to construction yellow
  const darkColor = '#111827'; // Solid slate 900
  
  return (
    <div className="min-h-full bg-slate-100 text-slate-800 font-sans uppercase font-bold tracking-tight">
      
      {/* 1. Heavy Duty Header */}
      <header className="sticky top-0 z-50 bg-[#111827] text-white border-b-4 transition-all duration-300" style={{ borderColor: accentColor }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <div className="text-3xl font-black tracking-tighter flex items-center gap-1">
                <span className="bg-white text-[#111827] px-2 py-1 leading-none rounded-sm">{data.logo?.charAt(0) || data.name?.charAt(0) || 'C'}</span>
                <span>{data.logo || data.name?.split(' ')[0] || 'CONSTRUCT'}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-8 items-center">
            <nav className="hidden lg:flex gap-8 items-center">
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
                  className="text-sm font-black tracking-widest text-slate-300 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <Button 
              className="rounded-none px-6 py-3 text-sm font-black tracking-widest hover:brightness-110" 
              style={{ backgroundColor: accentColor, color: darkColor }} 
              onClick={() => {
                const link = data.navbarCtaLink || '#contact';
                if (link.startsWith('#')) {
                  document.getElementById(link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.open(link, '_blank');
                }
              }}
            >
              {data.navbarCtaText || 'GET A QUOTE'}
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Massive Hero Section */}
      <section id="hero" className="relative pt-24 pb-32 lg:py-48 overflow-hidden bg-[#111827] text-white">
        <div className="absolute inset-0 opacity-40">
          <img 
            src={data.heroImage || "https://images.unsplash.com/photo-1541888086225-ee80c65c3b17?auto=format&fit=crop&q=80&w=1920"} 
            alt="Construction Background" 
            className="w-full h-full object-cover grayscale mix-blend-overlay"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827] via-[#111827]/80 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-black tracking-[0.2em] mb-6 border-l-4" style={{ borderColor: accentColor }}>
              {data.jobTitle || 'CONSTRUCTION & ENGINEERING'}
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tighter uppercase">
              BUILDING <br/>
              <span style={{ color: accentColor }}>THE FUTURE.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-semibold max-w-2xl capitalize">
              {data.bio || "We provide top-tier construction services, ensuring robust infrastructure and uncompromised quality on every site."}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-none font-black tracking-widest px-8 py-4 border-2" style={{ backgroundColor: accentColor, color: darkColor, borderColor: accentColor }} onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                VIEW OUR WORK
              </Button>
              {data.whatsapp && (
                <Button variant="outline" size="lg" className="rounded-none font-black tracking-widest px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#111827]" onClick={() => window.open(`https://wa.me/${data.whatsapp?.replace(/\D/g, '')}`, '_blank')}>
                  CONTACT US
                </Button>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Heavy Equipment Services */}
      <section id="services" className="py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-16 h-2" style={{ backgroundColor: accentColor }}></div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#111827]">CORE EXPERTISE</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.services?.map((service, i) => (
              <motion.div 
                key={i} 
                className="bg-white p-8 border-b-8 shadow-sm hover:shadow-xl transition-all"
                style={{ borderBottomColor: accentColor }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 rounded-sm flex items-center justify-center mb-6 bg-[#111827]" style={{ color: accentColor }}>
                  {service.icon ? <DynamicIcon name={service.icon} className="text-3xl" /> : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>
                  )}
                </div>
                <h3 className="text-2xl font-black text-[#111827] mb-4">{service.title}</h3>
                <p className="text-slate-600 font-semibold leading-relaxed capitalize">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Builds (Projects) */}
      <section id="projects" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="w-16 h-2" style={{ backgroundColor: accentColor }}></div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#111827]">FEATURED BUILDS</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.projects?.map((project, i) => (
              <motion.div 
                key={i} 
                className="group relative overflow-hidden bg-[#111827]"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/3] w-full">
                  <img 
                    src={project.image || `https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80&w=800`} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 group-hover:opacity-40 transition-all duration-500"
                  />
                </div>
                
                <div className="absolute inset-0 p-8 flex flex-col justify-end translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="flex gap-2 mb-3 flex-wrap">
                    {project.skills?.map((s, j) => (
                      <span key={j} className="text-[10px] font-black px-2 py-1 bg-white text-[#111827] tracking-widest uppercase">{s}</span>
                    ))}
                  </div>
                  <h3 className="text-3xl font-black text-white mb-2">{project.title}</h3>
                  <p className="text-slate-300 font-semibold text-sm mb-6 line-clamp-2 capitalize">{project.description}</p>
                  
                  {project.link && (
                    <Button className="rounded-none self-start font-black tracking-widest px-6 py-2" style={{ backgroundColor: accentColor, color: darkColor }} onClick={() => window.open(project.link, '_blank')}>
                      VIEW DETAILS
                    </Button>
                  )}
                </div>
                
                {/* Always visible label on bottom left before hover */}
                <div className="absolute bottom-0 left-0 bg-[#111827] p-4 pr-8 group-hover:opacity-0 transition-opacity duration-300 border-t-4" style={{ borderTopColor: accentColor }}>
                  <h3 className="text-xl font-black text-white tracking-widest">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Toolbelt / Certifications (Skills) */}
      <section id="skills" className="py-24 bg-[#111827] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <div className="w-16 h-2" style={{ backgroundColor: accentColor }}></div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">CAPABILITIES & TOOLS</h2>
            <div className="w-16 h-2" style={{ backgroundColor: accentColor }}></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.skills?.map((skill, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-slate-800/50 border border-slate-700 hover:border-white transition-colors">
                <div className="mb-4 text-3xl" style={{ color: accentColor }}>
                  {skill.icon ? <DynamicIcon name={skill.icon} /> : <div className="w-4 h-4 bg-current" />}
                </div>
                <span className="font-black text-xs text-center tracking-widest">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Robust Contact */}
      <section id="contact" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-0 border-4 border-[#111827]">
          <div className="bg-[#111827] p-12 text-white flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-white/10 text-white text-xs font-black tracking-[0.2em] mb-6 border-l-4" style={{ borderColor: accentColor }}>
                START A PROJECT
              </div>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tighter">{data.contact?.title || 'READY TO BUILD?'}</h2>
              <p className="text-slate-400 font-semibold leading-relaxed mb-12 capitalize">
                {data.contact?.description || "Contact our dispatch team today for an estimate on your next major development project."}
              </p>
              
              <div className="space-y-8">
                {data.contact?.phone && (
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-800 flex items-center justify-center text-3xl" style={{ color: accentColor }}>
                      <DynamicIcon name="faPhone" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500 tracking-widest mb-1">CALL DISPATCH</p>
                      <p className="text-2xl font-black">{data.contact.phone}</p>
                    </div>
                  </div>
                )}
                {data.contact?.email && (
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-slate-800 flex items-center justify-center text-3xl" style={{ color: accentColor }}>
                      <DynamicIcon name="faEnvelope" />
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-500 tracking-widest mb-1">EMAIL OFFICE</p>
                      <p className="text-xl font-black">{data.contact.email}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-100 p-12">
            <h3 className="text-2xl font-black text-[#111827] mb-8 tracking-tighter">{data.newsletter?.title || 'REQUEST AN ESTIMATE'}</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Request sent!'); }}>
              <div>
                <label className="block text-xs font-black text-slate-500 tracking-widest mb-2">FULL NAME / COMPANY</label>
                <input type="text" className="w-full bg-white border-2 border-slate-300 p-4 font-semibold outline-none focus:border-[#111827]" required />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 tracking-widest mb-2">EMAIL ADDRESS</label>
                <input type="email" className="w-full bg-white border-2 border-slate-300 p-4 font-semibold outline-none focus:border-[#111827]" required />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-500 tracking-widest mb-2">PROJECT DETAILS</label>
                <textarea rows={5} className="w-full bg-white border-2 border-slate-300 p-4 font-semibold outline-none focus:border-[#111827]" required></textarea>
              </div>
              <Button className="w-full py-5 text-lg font-black tracking-widest border-2" style={{ backgroundColor: accentColor, color: darkColor, borderColor: accentColor }}>
                SUBMIT REQUEST
              </Button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#111827] border-t-8" style={{ borderTopColor: accentColor }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8 text-white">
            <div className="text-3xl font-black tracking-tighter flex items-center gap-1">
              <span className="bg-white text-[#111827] px-2 py-1 leading-none rounded-sm">{data.logo?.charAt(0) || data.name?.charAt(0) || 'C'}</span>
              <span>{data.logo || data.name?.split(' ')[0] || 'CONSTRUCT'}</span>
            </div>
            <div className="flex gap-4">
              {Object.entries(data.socialLinks || {}).map(([key, value]) => (
                value && (
                  <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 flex items-center justify-center hover:bg-white transition-colors group">
                    <DynamicIcon name={`fa${key.charAt(0).toUpperCase()}${key.slice(1)}`} className="text-slate-400 group-hover:text-[#111827] text-lg" />
                  </a>
                )
              ))}
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-black tracking-widest text-slate-500">
            <p>{data.footer?.copyRight || `© ${new Date().getFullYear()} ${data.name || 'CONSTRUCTION CO'}. ALL RIGHTS RESERVED.`}</p>
            <div className="flex gap-6">
              {data.navbarLinks?.map((link, i) => (
                <a key={i} href={link.url} className="hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ContractorTemplate;
