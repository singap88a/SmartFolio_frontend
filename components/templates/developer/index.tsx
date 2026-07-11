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

const DeveloperTemplate = ({ data }: TemplateProps) => {
  const accentColor = data.themeColor || '#4f46e5';
  
  return (
    <div className="min-h-full bg-slate-950 text-slate-100 font-mono selection:bg-indigo-500/30">
      {/* 1. Power Bar */}
      <div className="w-full h-2" style={{ backgroundColor: accentColor }}></div>
      
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className="h-8 w-auto object-contain" />
            ) : (
              <div className="text-xl font-bold tracking-tight flex items-center gap-1" style={{ color: accentColor }}>
                <span>{data.logo || data.name?.split(' ')[0] || 'DEV'}</span>
                <span className="text-white">.</span>
              </div>
            )}
          </div>
          <div className="flex gap-8 items-center">
            <nav className="hidden md:flex gap-8 items-center">
              {data.navbarLinks?.map((link, i) => (
                <a key={i} href={link.url} onClick={(e) => {
                  if (link.url.startsWith('#')) {
                    e.preventDefault();
                    document.getElementById(link.url.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                  }
                }} className="text-sm font-medium text-slate-400 hover:text-white transition-colors duration-200">
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="hidden md:block w-px h-5 bg-slate-800 mx-2"></div>
            <Button className="rounded-full px-6 py-2 text-sm font-medium transition-transform hover:scale-105" style={{ backgroundColor: accentColor, color: '#fff' }} onClick={() => {
              const link = data.navbarCtaLink || '#contact';
              if (link.startsWith('#')) {
                document.getElementById(link.substring(1))?.scrollIntoView({ behavior: 'smooth' });
              } else {
                window.open(link, '_blank');
              }
            }}>
              {data.navbarCtaText || 'Hire Me'}
            </Button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section id="hero" className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-bold mb-6" style={{ color: accentColor }}>
            {data.jobTitle || 'AVAILABLE FOR HIRE'}
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]">
            {data.name || 'Your Name'} <br />
            <span style={{ color: accentColor }}>Creative Dev.</span>
          </h1>
          <p className="text-lg text-slate-400 max-w-xl mb-10 leading-relaxed">
            {data.bio || "I'm a senior software engineer specializing in building exceptional digital experiences."}
          </p>
          <div className="flex flex-wrap gap-4">
            {data.cvLink && (
              <Button size="lg" style={{ backgroundColor: accentColor }} onClick={() => window.open(data.cvLink, '_blank')}>Download CV</Button>
            )}
            {data.whatsapp && (
              <Button variant="outline" size="lg" onClick={() => window.open(`https://wa.me/${data.whatsapp?.replace(/\D/g, '')}`, '_blank')}>WhatsApp</Button>
            )}
            <Button variant="outline" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>Let&apos;s Talk</Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full opacity-50"></div>
          <div className="relative aspect-square rounded-3xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
            <img 
              src={data.heroImage || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"} 
              alt={data.name} 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
        </motion.div>
      </section>

      <section id="skills" className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 mb-12 flex items-center gap-4">
            Expertise <span className="h-px flex-1 bg-slate-800"></span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.skills?.map((skill, i) => (
              <motion.div 
                key={i} 
                className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-4 group hover:border-indigo-500/50 transition-all"
                whileHover={{ y: -5 }}
              >
                <div style={{ color: accentColor }}>
                  {skill.icon ? <DynamicIcon name={skill.icon} className="w-8 h-8" /> : <div className="w-4 h-4 rounded-full bg-current" />}
                </div>
                <span className="font-bold text-slate-300 text-xs uppercase tracking-widest">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Services */}
      <section id="services" className="py-32 max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-20 text-center">Services<span style={{ color: accentColor }}>.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.services?.map((service, i) => (
            <motion.div 
              key={i} 
              className="p-8 rounded-3xl bg-slate-900/50 border border-slate-800 hover:border-indigo-500/50 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="w-12 h-12 rounded-2xl mb-6 flex items-center justify-center bg-indigo-500/10" style={{ color: accentColor }}>
                {service.icon ? <DynamicIcon name={service.icon} className="w-6 h-6" /> : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4 4-4"/></svg>
                )}
              </div>
              <h3 className="text-xl font-bold mb-4">{service.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. Projects */}
      <section id="projects" className="py-32 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-20">Selected Work<span style={{ color: accentColor }}>.</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {data.projects?.map((project, i) => (
              <motion.div 
                key={i} 
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 mb-8 relative">
                  <img 
                    src={project.image || `https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800`} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                    {project.link && (
                      <Button size="sm" style={{ backgroundColor: accentColor }} onClick={() => window.open(project.link, '_blank')}>View Project</Button>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills?.map((s, j) => (
                    <span key={j} className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-slate-800 text-slate-400 rounded">{s}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact & Newsletter */}
      <section id="contact" className="py-32 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-6xl font-black mb-8 leading-tight">
              {data.contact?.title ? (
                <>
                  {data.contact.title.split(' ').map((word, i, arr) => (
                    <React.Fragment key={i}>
                      {i === arr.length - 1 ? <span style={{ color: accentColor }}>{word}</span> : word}{' '}
                    </React.Fragment>
                  ))}
                </>
              ) : (
                <>Let&apos;s start <br /> something <span style={{ color: accentColor }}>new.</span></>
              )}
            </h2>
            <p className="text-slate-400 mb-12 text-lg max-w-md">
              {data.contact?.description || "I am currently available for freelance work and full-time positions. Feel free to reach out!"}
            </p>
            
            <div className="space-y-8">
              {data.contact?.email && (
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl" style={{ color: accentColor }}>
                    <DynamicIcon name="faEnvelope" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Email Me</p>
                    <p className="font-bold text-lg">{data.contact.email}</p>
                  </div>
                </div>
              )}
              {data.contact?.phone && (
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xl" style={{ color: accentColor }}>
                    <DynamicIcon name="faPhone" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Call / WhatsApp</p>
                    <p className="font-bold text-lg">{data.contact.phone}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-10 rounded-[2.5rem] bg-slate-900/50 border border-slate-800 shadow-2xl relative overflow-hidden group flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/10 blur-[80px] group-hover:bg-indigo-600/20 transition-all"></div>
            <div className="relative z-10 text-center space-y-6">
              <h3 className="text-2xl font-bold">{data.newsletter?.title || 'Subscribe to my Newsletter'}</h3>
              <p className="text-slate-400 text-sm">{data.newsletter?.description || 'Get the latest updates and news directly in your inbox.'}</p>
              <form className="flex flex-col gap-4 mt-8" onSubmit={(e) => { e.preventDefault(); alert('Subscribed successfully!'); }}>
                <input 
                  type="email" 
                  className="w-full bg-slate-800/50 border border-slate-700/50 rounded-2xl px-5 py-4 outline-none focus:border-indigo-500 transition-all text-center text-sm" 
                  placeholder="Enter your email address" 
                  required 
                />
                <Button className="w-full py-4 text-sm font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-500/20 transition-transform hover:scale-105" style={{ backgroundColor: accentColor, color: '#fff' }}>
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Component */}
      <footer className="pt-24 pb-12 border-t border-slate-900 mt-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            {/* Logo and Description */}
            <div className="lg:col-span-2 space-y-6">
              <a href="#" className="flex items-center gap-2 group mb-6">
                {data.logoType === 'image' && data.logo ? (
                  <img src={data.logo} alt="Logo" className="h-10 rounded" />
                ) : (
                  <>
                    <div className="w-10 h-10 bg-[#0F121E] text-slate-950 rounded flex items-center justify-center font-black text-xl group-hover:rotate-12 transition-transform">
                      {data.logo ? data.logo.charAt(0).toUpperCase() : 'P'}
                    </div>
                    <span className="font-black text-2xl tracking-tighter">{data.logo || 'Portfolify'}</span>
                  </>
                )}
              </a>
              <p className="text-slate-400 max-w-sm text-sm leading-relaxed">
                {data.footer?.description || 'Empowering creators to showcase their best work with professional, high-end portfolios that launch in seconds.'}
              </p>
              <div className="flex gap-4 pt-4">
                {Object.entries(data.socialLinks || {}).map(([key, value]) => (
                  value && (
                    <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:-translate-y-1 hover:border-slate-600 transition-all group">
                      <DynamicIcon name={`fa${key.charAt(0).toUpperCase()}${key.slice(1)}`} className="text-slate-400 group-hover:text-white transition-colors text-sm" />
                    </a>
                  )
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Platform</h4>
              <ul className="space-y-4">
                {data.navbarLinks?.slice(0, Math.ceil((data.navbarLinks.length || 0) / 2)).map((link, i) => (
                  <li key={i}>
                    <a href={link.url} onClick={(e) => {
                      if (link.url.startsWith('#')) {
                        e.preventDefault();
                        document.getElementById(link.url.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} className="text-slate-400 hover:text-white transition-colors text-sm">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Additional Links */}
            <div>
              <h4 className="font-black text-sm uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4">
                {data.navbarLinks?.slice(Math.ceil((data.navbarLinks.length || 0) / 2)).map((link, i) => (
                  <li key={i}>
                    <a href={link.url} onClick={(e) => {
                      if (link.url.startsWith('#')) {
                        e.preventDefault();
                        document.getElementById(link.url.substring(1))?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }} className="text-slate-400 hover:text-white transition-colors text-sm">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
            <p>
              {data.footer?.copyRight || `© ${new Date().getFullYear()} ${data.name || 'Portfolify Inc'}. All rights reserved.`}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeveloperTemplate;
