'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import { TemplateProps } from '../types';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  if (!name) return null;
  const iconDef = (SolidIcons as any)[name] || (BrandIcons as any)[name] || SolidIcons.faAsterisk;
  return <FontAwesomeIcon icon={iconDef} className={className} />;
};

const CreativeTemplate = ({ data }: TemplateProps) => {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 150]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const accentColor = data.themeColor || '#E55A43';

  // Editorial Theme Variables
  const bgMain = isDark ? 'bg-[#0A0A0A]' : 'bg-[#F4F4F0]';
  const textMain = isDark ? 'text-[#EFEFEF]' : 'text-[#1C1C1C]';
  const textMuted = isDark ? 'text-[#8A8A8A]' : 'text-[#6C6C6C]';
  const borderSubtle = isDark ? 'border-white/10' : 'border-black/10';
  const borderStrong = isDark ? 'border-white/30' : 'border-black/30';

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div dir="ltr" className={`min-h-screen font-sans transition-colors duration-700 ${bgMain} ${textMain} selection:bg-[${accentColor}]/30 relative overflow-x-clip z-0`} style={{ WebkitFontSmoothing: 'antialiased' }}>

      {/* Film Grain Texture Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Animated Fluid Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div
          className={`absolute top-[5%] left-[10%] w-[40vw] h-[40vw] rounded-full blur-[120px] ${isDark ? 'opacity-20' : 'opacity-[0.08]'}`}
          style={{ backgroundColor: accentColor }}
          animate={{ x: [0, 100, -50, 0], y: [0, 50, 100, 0], scale: [1, 1.2, 0.9, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute top-[40%] right-[5%] w-[35vw] h-[35vw] rounded-full blur-[120px] ${isDark ? 'opacity-20' : 'opacity-10'} bg-blue-600`}
          animate={{ x: [0, -100, 50, 0], y: [0, -50, 50, 0], scale: [1, 1.1, 0.8, 1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 1. Navbar */}
      <header className={`sticky top-0 inset-x-0 z-40 transition-all duration-300 backdrop-blur-md border-b ${borderSubtle} ${isDark ? 'bg-[#0A0A0A]/70' : 'bg-[#F4F4F0]/70'}`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer z-50" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className={`h-6 w-auto object-contain ${isDark ? 'invert' : ''}`} />
            ) : (
              <span className="font-serif text-xl tracking-tighter uppercase font-medium">{data.logo || data.name?.split(' ')[0]}</span>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-8 z-50">
            {data.navbarLinks?.map((link, i) => (
              <button
                key={i}
                onClick={() => link.url.startsWith('#') ? scrollTo(link.url.substring(1)) : window.open(link.url, '_blank')}
                className={`text-sm font-medium uppercase tracking-widest ${textMuted} hover:${textMain} transition-colors`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6 z-50">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isDark ? 'text-yellow-400 bg-white/10 hover:bg-white/20' : 'text-slate-700 bg-black/5 hover:bg-black/10'}`}
            >
              <FontAwesomeIcon icon={isDark ? SolidIcons.faSun : SolidIcons.faMoon} />
            </button>

            <button
              className="hidden sm:flex items-center px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105"
              style={{ backgroundColor: accentColor, color: '#fff' }}
              onClick={() => {
                const link = data.navbarCtaLink || '#contact';
                if (link.startsWith('#')) scrollTo(link.substring(1));
                else window.open(link, '_blank');
              }}
            >
              {data.navbarCtaText || 'Let\'s Talk'}
            </button>

            <button
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-black/5 dark:bg-white/5"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FontAwesomeIcon icon={SolidIcons.faBars} className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex justify-end"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <div className={`absolute inset-0 ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-sm`} onClick={() => setIsMobileMenuOpen(false)}></div>
            <motion.div
              className={`relative w-[80%] sm:w-[400px] h-full ${bgMain} border-l ${borderSubtle} flex flex-col p-8 md:p-12 shadow-2xl`}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-16">
                <span className="font-serif text-xl tracking-tighter uppercase font-medium">{data.logo || data.name?.split(' ')[0]}</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:opacity-50 transition-opacity">
                  <FontAwesomeIcon icon={SolidIcons.faTimes} />
                </button>
              </div>

              <nav className="flex flex-col gap-6">
                {data.navbarLinks?.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        if (link.url.startsWith('#')) scrollTo(link.url.substring(1));
                        else window.open(link, '_blank');
                      }, 300);
                    }}
                    className={`text-left text-2xl font-serif font-light hover:italic transition-all border-b ${borderSubtle} pb-4`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <button
                className={`mt-auto w-full py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-transform shadow-lg`}
                style={{ backgroundColor: accentColor, color: '#fff' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    const link = data.navbarCtaLink || '#contact';
                    if (link.startsWith('#')) scrollTo(link.substring(1));
                    else window.open(link, '_blank');
                  }, 300);
                }}
              >
                {data.navbarCtaText || 'Let\'s Talk'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10 pt-10 pb-32">

        {/* 2. Hero Section (Asymmetrical Artistic Layout) */}
        <section id="hero" className="max-w-[1600px] mx-auto px-6 md:px-12 min-h-[80vh] flex flex-col justify-center py-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 relative">

            {/* Text Side */}
            <motion.div className="flex-1 w-full z-10" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}>
              <span className="inline-block mb-6 px-4 py-1.5 border border-current rounded-full text-[10px] font-bold uppercase tracking-widest opacity-60">
                {data.jobTitle || 'Creative Director'}
              </span>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-serif leading-[0.9] tracking-tighter mb-8 max-w-2xl">
                {data.name ? (
                  <>
                    {data.name.split(' ')[0]} <br />
                    <span className="italic font-light opacity-70">
                      {data.name.split(' ').slice(1).join(' ') || '.'}
                    </span>
                  </>
                ) : (
                  <>
                    Creative <br />
                    <span className="italic font-light opacity-70">Visionary.</span>
                  </>
                )}
              </h1>
              <p className={`${textMuted} text-lg md:text-2xl leading-relaxed font-light mb-12 max-w-xl`}>
                {data.bio || "I craft digital experiences that merge artistic direction with functional elegance."}
              </p>

              <div className="flex flex-wrap gap-4 items-center">
                <button
                  className="h-14 px-10 rounded-full text-xs font-bold uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl flex items-center gap-3"
                  style={{ backgroundColor: accentColor, color: '#fff' }}
                  onClick={() => scrollTo('projects')}
                >
                  View Works <FontAwesomeIcon icon={SolidIcons.faArrowRight} />
                </button>
                {data.cvLink && (
                  <button
                    className={`h-14 px-8 rounded-full text-xs font-bold uppercase tracking-widest border border-current transition-colors flex items-center gap-3 ${isDark ? 'hover:bg-white hover:text-black' : 'hover:bg-black hover:text-white'}`}
                    onClick={() => window.open(data.cvLink, '_blank')}
                  >
                    Download CV
                  </button>
                )}
              </div>
            </motion.div>

            {/* Highly Professional Portrait Side */}
            <motion.div
              className="flex-1 w-full lg:w-[45%] relative z-0 flex justify-end items-center"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Offset Wireframe Border */}
              <div className={`absolute w-[85%] md:w-[70%] aspect-[3/4] border ${borderStrong} rounded-3xl -translate-x-6 translate-y-6 -z-10`}></div>
              
              <div className="relative w-[85%] md:w-[70%] aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0">
                  <img
                    src={data.heroImage || `https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800`}
                    alt={data.name}
                    className="w-full h-full object-cover transition-transform duration-[1.5s] hover:scale-105"
                  />
                </div>
              </div>

              {/* Elegant Availability Badge */}
              <motion.div
                className={`absolute bottom-12 -left-4 md:-left-12 px-6 py-4 rounded-full ${isDark ? 'bg-black/60' : 'bg-white/60'} backdrop-blur-md border ${borderSubtle} shadow-lg flex items-center gap-3`}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.8 }}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] uppercase tracking-widest font-bold">Available for Work</span>
              </motion.div>
            </motion.div>
          </div>


        </section>

        {/* 3. Professional Skills Section */}
        <section id="skills" className="py-24 max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Professional <br /><span className="italic text-slate-500">Skills.</span></h2>
            <p className={`md:max-w-sm text-base md:text-lg ${textMuted} font-light`}>A blend of strategic thinking, artistic direction, and meticulous execution.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {data.skills?.map((skill, i) => (
              <motion.div 
                key={i} 
                className={`relative overflow-hidden p-6 rounded-[1.5rem] border ${borderSubtle} flex flex-col items-start gap-4 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                {/* Artistic Merged Background inside the card */}
                <div className={`absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500`} style={{ background: `linear-gradient(135deg, ${accentColor}40 0%, transparent 100%)` }}></div>
                <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-blue-500 rounded-full blur-[40px] opacity-20 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150"></div>
                <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-[40px] opacity-20 group-hover:opacity-60 transition-all duration-700 group-hover:scale-150" style={{ backgroundColor: accentColor }}></div>
                
                {/* Glass Layer */}
                <div className={`absolute inset-0 z-0 backdrop-blur-[2px] ${isDark ? 'bg-black/40' : 'bg-white/40'}`}></div>

                {/* Content */}
                <div className="relative z-10 text-4xl opacity-80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" style={{ color: accentColor }}>
                  {skill.icon ? <DynamicIcon name={skill.icon} /> : <div className="w-4 h-4 rounded-full bg-current" />}
                </div>
                <span className="relative z-10 text-sm font-bold tracking-wide uppercase mt-2">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Services Section (Interactive Accordion Style) */}
        <section id="services" className={`py-32 border-y ${borderSubtle} mt-20`}>
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <div className="mb-20">
              <h2 className="text-4xl md:text-6xl font-serif tracking-tighter">Expertise.</h2>
            </div>

            <div className="flex flex-col border-t border-current/10">
              {data.services?.map((service, i) => (
                <div
                  key={i}
                  className="group relative border-b border-current/10 py-10 transition-colors duration-500 hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer"
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10 px-4 md:px-8">
                    <div className="flex items-center gap-8">
                      <span className="text-sm font-bold opacity-30">0{i + 1}</span>
                      <h3 className="text-3xl md:text-5xl font-serif italic group-hover:pl-4 transition-all duration-500" style={{ color: hoveredService === i ? accentColor : 'inherit' }}>
                        {service.title}
                      </h3>
                    </div>

                    <motion.div
                      className="overflow-hidden md:max-w-md w-full"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: hoveredService === i ? 'auto' : 0, opacity: hoveredService === i ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <p className={`${textMuted} text-base font-light leading-relaxed pt-4 md:pt-0`}>{service.description}</p>
                    </motion.div>

                    <div className="hidden md:flex text-3xl opacity-20 group-hover:opacity-100 transition-opacity group-hover:rotate-45 duration-500">
                      <FontAwesomeIcon icon={SolidIcons.faArrowRight} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Projects Section (Clean Editorial Layout) */}
        <section id="projects" className="py-32">
          <div className="max-w-[1600px] mx-auto px-6 md:px-12">
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter mb-20 text-center">Selected Works.</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.projects?.map((project, i) => (
                <motion.div
                  key={i}
                  className={`group flex flex-col`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  <div className="aspect-[4/3] w-full relative overflow-hidden bg-[#111] cursor-pointer mb-6 rounded-xl" onClick={() => project.link && window.open(project.link, '_blank')}>
                    <img
                      src={project.image || `https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=800`}
                      alt={project.title}
                      className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-[1s] ease-[0.16,1,0.3,1]"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>

                  <div className="flex flex-col flex-grow">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.skills?.map((s, j) => (
                        <span key={j} className="text-[9px] font-bold uppercase tracking-widest opacity-50">
                          {s}
                        </span>
                      ))}
                    </div>
                    {/* Fixed Title Hover Color */}
                    <h3
                      className="text-xl font-serif italic mb-3 leading-tight cursor-pointer transition-colors duration-300"
                      style={{ color: 'inherit' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = accentColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = 'inherit'}
                      onClick={() => project.link && window.open(project.link, '_blank')}
                    >
                      {project.title}
                    </h3>
                    <p className={`${textMuted} text-sm font-light leading-relaxed mb-6 flex-grow line-clamp-3`}>
                      {project.description}
                    </p>
                    {project.link && (
                      <button
                        onClick={() => window.open(project.link, '_blank')}
                        className="self-start text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-50 transition-opacity border-b border-current pb-1"
                      >
                        View Project <FontAwesomeIcon icon={SolidIcons.faArrowRight} className="-rotate-45" />
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Newsletter / Contact Section (Original Design) */}
        <section id="contact" className="py-20 max-w-[1600px] mx-auto px-6 md:px-12">
          <motion.div
            className="w-full rounded-[3rem] p-12 md:p-32 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            style={{ backgroundColor: isDark ? '#141414' : '#E8E8E4' }}
          >
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `radial-gradient(circle at 50% 100%, ${accentColor}, transparent 60%)` }}></div>

            <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
              <h2 className="text-5xl md:text-7xl font-serif tracking-tighter mb-8">{data.newsletter?.title || "Let's create magic."}</h2>
              <p className={`${textMuted} text-xl md:text-2xl font-light mb-12`}>
                {data.newsletter?.description || "Available for freelance opportunities and creative collaborations."}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center w-full">
                {data.contact?.email && (
                  <button
                    className="h-14 px-10 rounded-full text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105 shadow-2xl flex items-center justify-center gap-3"
                    style={{ backgroundColor: accentColor, color: '#fff' }}
                    onClick={() => window.location.href = `mailto:${data.contact?.email}`}
                  >
                    Say Hello
                  </button>
                )}
                {data.contact?.phone && (
                  <button
                    className={`h-14 px-10 rounded-full text-sm font-bold uppercase tracking-widest border border-current hover:bg-white hover:text-black dark:hover:bg-black dark:hover:text-white transition-colors flex items-center justify-center gap-3`}
                    onClick={() => window.open(`https://wa.me/${data.contact?.phone?.replace(/\D/g, '')}`, '_blank')}
                  >
                    WhatsApp
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className={`border-t ${borderSubtle} ${bgMain} py-16 px-6 md:px-12 relative z-10`}>
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-serif text-3xl tracking-tighter uppercase font-bold">{data.logo || data.name?.split(' ')[0]}</span>
            <span className={`text-sm uppercase tracking-widest ${textMuted}`}>{data.jobTitle || 'Creative Director'}</span>
          </div>

          <div className="flex gap-8">
            {Object.entries(data.socialLinks || {}).map(([key, value]) => (
              value && (
                <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className={`${textMuted} hover:${textMain} transition-colors p-2`}>
                  <DynamicIcon name={`fa${key.charAt(0).toUpperCase()}${key.slice(1)}`} className="text-2xl" />
                </a>
              )
            ))}
          </div>

          <p className={`${textMuted} text-xs uppercase tracking-widest font-medium`}>
            {data.footer?.copyRight || `© ${new Date().getFullYear()} ${data.name}.`}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CreativeTemplate;
