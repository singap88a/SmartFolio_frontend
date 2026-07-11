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

const CreativeTemplate = ({ data }: TemplateProps) => {
  const accentColor = data.themeColor || '#ec4899'; // Default to hot pink for creative
  
  return (
    <div className="min-h-full bg-[#0a0a0f] text-slate-100 font-sans selection:bg-pink-500/30 overflow-x-hidden">
      {/* Aesthetic Top Ambient Light Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-pink-500/10 via-purple-500/5 to-transparent blur-[120px] pointer-events-none rounded-full"></div>
      
      <header className="sticky top-0 z-50 backdrop-blur-md bg-[#0a0a0f]/75 border-b border-white/5 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-8 py-6 flex justify-between items-center">
          {/* Creative Logo */}
          <div className="flex items-center gap-3">
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className="h-7 w-auto object-contain" />
            ) : (
              <div className="text-2xl font-serif italic tracking-wide flex items-center gap-0.5">
                <span style={{ color: accentColor }}>{data.logo || data.name?.split(' ')[0] || 'CRTV'}</span>
                <span className="text-white">.</span>
              </div>
            )}
          </div>
          
          {/* Navigation Links */}
          <div className="flex gap-8 items-center">
            <nav className="hidden md:flex gap-10 items-center">
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
                  className="text-xs font-semibold uppercase tracking-widest text-slate-400 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block w-px h-4 bg-white/10 mx-2"></div>
            <Button 
              className="rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:brightness-110 active:scale-95" 
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
              {data.navbarCtaText || 'Start Project'}
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section - Asymmetric Artsy Style */}
      <section id="hero" className="max-w-6xl mx-auto px-8 py-24 md:py-36 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        <motion.div
          className="lg:col-span-7 z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold uppercase tracking-wider text-slate-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: accentColor }}></span>
            {data.jobTitle || 'Available for freelance'}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif italic font-light mb-8 leading-[1.05] tracking-tight">
            I craft digital <br />
            <span className="font-sans font-black not-italic block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-150 to-white/70" style={{ textShadow: `0 0 40px ${accentColor}15` }}>
              {data.name || 'Creative Mind'}
            </span>
          </h1>
          
          <p className="text-base text-slate-400 max-w-xl mb-12 leading-relaxed font-light">
            {data.bio || "Designing high-end experiences for forward-thinking brands worldwide. Combining aesthetics with strategy."}
          </p>
          
          <div className="flex flex-wrap gap-4 items-center">
            {data.cvLink && (
              <Button size="lg" className="rounded-full font-bold text-xs uppercase tracking-wider px-8" style={{ backgroundColor: accentColor }} onClick={() => window.open(data.cvLink, '_blank')}>View Case Studies</Button>
            )}
            {data.whatsapp && (
              <Button variant="outline" size="lg" className="rounded-full text-xs font-bold uppercase tracking-wider px-8 border-white/10 hover:bg-white/5" onClick={() => window.open(`https://wa.me/${data.whatsapp?.replace(/\D/g, '')}`, '_blank')}>Get In Touch</Button>
            )}
          </div>
        </motion.div>
        
        {/* Organic Shaped Hero Image */}
        <motion.div 
          className="lg:col-span-5 relative"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-10 bg-gradient-to-tr from-pink-500/10 to-purple-500/10 blur-[80px] opacity-70 rounded-full"></div>
          <div className="relative aspect-[4/5] rounded-[48px] overflow-hidden border border-white/10 bg-slate-950 p-2 shadow-2xl">
            <img 
              src={data.heroImage || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800"} 
              alt={data.name} 
              className="w-full h-full object-cover rounded-[38px] transition-transform duration-700 hover:scale-105"
            />
          </div>
        </motion.div>
      </section>

      {/* 3. Skills - Pill Badge Clouds */}
      <section id="skills" className="py-24 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="text-center font-serif italic text-2xl text-slate-400 mb-12">Core Capabilities</h2>
          <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
            {data.skills?.map((skill, i) => (
              <motion.div 
                key={i} 
                className="px-5 py-3 rounded-full bg-white/[0.03] border border-white/5 flex items-center gap-3 group hover:bg-white/[0.07] hover:border-white/10 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
              >
                <div style={{ color: accentColor }}>
                  {skill.icon ? <DynamicIcon name={skill.icon} className="w-4 h-4" /> : <div className="w-2 h-2 rounded-full bg-current" />}
                </div>
                <span className="font-bold text-xs uppercase tracking-widest text-slate-300">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services - Glassmorphic minimal cards */}
      <section id="services" className="py-32 max-w-6xl mx-auto px-8">
        <div className="text-center mb-24">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-3" style={{ color: accentColor }}>Expertise Areas</p>
          <h2 className="text-4xl font-serif italic font-light">Services I Offer</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services?.map((service, i) => (
            <motion.div 
              key={i} 
              className="p-10 rounded-[32px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 hover:border-white/10 hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/5 to-transparent blur-md rounded-bl-full group-hover:scale-110 transition-transform"></div>
              <div className="w-12 h-12 rounded-2xl mb-8 flex items-center justify-center bg-white/[0.04] border border-white/5" style={{ color: accentColor }}>
                {service.icon ? <DynamicIcon name={service.icon} className="w-5 h-5" /> : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                )}
              </div>
              <h3 className="text-lg font-bold mb-4 tracking-tight">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Projects - Elegant Carousel Grid */}
      <section id="projects" className="py-32 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-3" style={{ color: accentColor }}>Works Showcase</p>
              <h2 className="text-4xl font-serif italic font-light">Featured Portfolios</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.projects?.map((project, i) => (
              <motion.div 
                key={i} 
                className="group relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
              >
                <div className="aspect-[4/3] rounded-[40px] overflow-hidden bg-slate-900 border border-white/5 mb-8 relative shadow-lg">
                  <img 
                    src={project.image || `https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    {project.link && (
                      <Button size="sm" className="rounded-full px-6 py-2.5 text-xs font-bold tracking-widest uppercase" style={{ backgroundColor: accentColor }} onClick={() => window.open(project.link, '_blank')}>Explore Work</Button>
                    )}
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex gap-2 mb-3">
                    {project.skills?.map((s, j) => (
                      <span key={j} className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{s}</span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif italic font-light hover:text-white transition-colors cursor-pointer mb-2">{project.title}</h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed">{project.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact & Custom Newsletter */}
      <section id="contact" className="py-32 max-w-6xl mx-auto px-8 relative">
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-gradient-to-tr from-purple-500/5 to-transparent blur-[100px] pointer-events-none rounded-full"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-400 mb-3" style={{ color: accentColor }}>Get in Touch</p>
            <h2 className="text-5xl font-serif italic font-light mb-8 leading-tight">
              {data.contact?.title || <>Let&apos;s design a <br /> new reality <span style={{ color: accentColor }}>together.</span></>}
            </h2>
            <p className="text-slate-400 mb-12 text-sm leading-relaxed font-light max-w-md">
              {data.contact?.description || "Have an idea, project, or need full-time design support? Hit the links below to connect directly with me."}
            </p>
            
            <div className="space-y-6">
              {data.contact?.email && (
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-sm" style={{ color: accentColor }}>
                    <DynamicIcon name="faEnvelope" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">Email Address</p>
                    <p className="font-semibold text-slate-350 text-sm">{data.contact.email}</p>
                  </div>
                </div>
              )}
              {data.contact?.phone && (
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-sm" style={{ color: accentColor }}>
                    <DynamicIcon name="faPhone" />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold uppercase text-slate-500 tracking-wider">Direct Call / WA</p>
                    <p className="font-semibold text-slate-350 text-sm">{data.contact.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-10 rounded-[40px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 shadow-2xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-serif italic font-light">{data.newsletter?.title || 'Receive Creative Notes'}</h3>
              <p className="text-slate-400 text-xs font-light leading-relaxed">{data.newsletter?.description || 'Get occasional design resources, articles, and insights directly.'}</p>
              <form className="flex flex-col gap-4 mt-6" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                <input 
                  type="email" 
                  className="w-full bg-[#0a0a0f] border border-white/5 rounded-2xl px-5 py-4 outline-none focus:border-pink-500 transition-all text-sm font-light" 
                  placeholder="Your primary email address" 
                  required 
                />
                <Button className="w-full py-4 text-xs font-bold uppercase tracking-[0.2em] rounded-full shadow-lg transition-transform hover:scale-[1.02] active:scale-95" style={{ backgroundColor: accentColor, color: '#fff' }}>
                  Join List
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-12 border-t border-white/5 bg-[#0a0a0f]">
        <div className="max-w-6xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <a href="#" className="flex items-center gap-2 group mb-6">
                {data.logoType === 'image' && data.logo ? (
                  <img src={data.logo} alt="Logo" className="h-8 rounded" />
                ) : (
                  <span className="font-serif italic text-2xl tracking-wide">{data.logo || 'Portfolify'}</span>
                )}
              </a>
              <p className="text-slate-400 max-w-sm text-xs leading-relaxed font-light">
                {data.footer?.description || 'Empowering creative thinkers to display their craft in styled web spaces.'}
              </p>
              <div className="flex gap-4 pt-2">
                {Object.entries(data.socialLinks || {}).map(([key, value]) => (
                  value && (
                    <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/[0.02] border border-white/5 flex items-center justify-center hover:-translate-y-1 hover:border-white/20 transition-all group">
                      <DynamicIcon name={`fa${key.charAt(0).toUpperCase()}${key.slice(1)}`} className="text-slate-400 group-hover:text-white transition-colors text-xs" />
                    </a>
                  )
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Quick Links</h4>
              <ul className="space-y-4">
                {data.navbarLinks?.slice(0, Math.ceil((data.navbarLinks.length || 0) / 2)).map((link, i) => (
                  <li key={i}>
                    <a href={link.url} onClick={(e) => {
                      if (link.url.startsWith('#')) {
                        e.preventDefault();
                        document.getElementById(link.url.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} className="text-slate-400 hover:text-white transition-colors text-xs font-light">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-6">Navigation</h4>
              <ul className="space-y-4">
                {data.navbarLinks?.slice(Math.ceil((data.navbarLinks.length || 0) / 2)).map((link, i) => (
                  <li key={i}>
                    <a href={link.url} onClick={(e) => {
                      if (link.url.startsWith('#')) {
                        e.preventDefault();
                        document.getElementById(link.url.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} className="text-slate-400 hover:text-white transition-colors text-xs font-light">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest">
            <p>
              {data.footer?.copyRight || `© ${new Date().getFullYear()} ${data.name || 'Creative Studio'}. All rights reserved.`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreativeTemplate;
