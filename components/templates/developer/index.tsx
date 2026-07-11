'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import { TemplateProps } from '../types';

const DynamicIcon = ({ name, className }: { name: string, className?: string }) => {
  if (!name) return null;
  const iconDef = (SolidIcons as any)[name] || (BrandIcons as any)[name] || SolidIcons.faCircleQuestion;
  return <FontAwesomeIcon icon={iconDef} className={className} />;
};

const DeveloperTemplate = ({ data }: TemplateProps) => {
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const sections = ['hero', 'skills', 'services', 'projects', 'newsletter'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const primaryColor = data.themeColor || '#0070F3'; 
  
  // Premium Theme Variables
  const bgMain = isDark ? 'bg-[#000000]' : 'bg-[#FAFAFA]';
  const bgSub = isDark ? 'bg-[#111111]' : 'bg-[#FFFFFF]';
  const bgGlass = isDark ? 'bg-[#000000]/60' : 'bg-[#FFFFFF]/70';
  
  const textMain = isDark ? 'text-[#EDEDED]' : 'text-[#171717]';
  const textMuted = isDark ? 'text-[#A1A1AA]' : 'text-[#71717A]';
  
  const borderSubtle = isDark ? 'border-[#333333]/50' : 'border-[#E5E5E5]';
  const borderHover = isDark ? 'border-[#444444]' : 'border-[#D4D4D4]';
  
  const getGlow = (opacity: number) => {
    return `0 0 40px ${primaryColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    // overflow-x-clip prevents horizontal scroll without breaking sticky positioning
    <div dir="ltr" className={`min-h-screen font-sans transition-colors duration-500 ${bgMain} ${textMain} selection:bg-black/10 dark:selection:bg-white/20 relative overflow-x-clip`} style={{ WebkitFontSmoothing: 'antialiased' }}>
      
      {/* Background Blended Glows Spread Across the Page */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
        {/* Hero Glow */}
        <div className={`absolute top-[-5%] left-[-10%] w-[50%] h-[800px] rounded-full blur-[150px] opacity-20 ${isDark ? 'bg-blue-900' : 'bg-blue-200'}`} style={{ backgroundColor: primaryColor }}></div>
        {/* Mid Page Glow */}
        <div className={`absolute top-[35%] right-[-10%] w-[40%] h-[800px] rounded-full blur-[150px] opacity-[0.15] ${isDark ? 'bg-purple-900' : 'bg-purple-200'}`}></div>
        {/* Bottom Page Glow */}
        <div className={`absolute bottom-[5%] left-[10%] w-[50%] h-[800px] rounded-full blur-[150px] opacity-[0.15] ${isDark ? 'bg-indigo-900' : 'bg-indigo-200'}`} style={{ backgroundColor: primaryColor }}></div>
      </div>

      {/* 1. Navbar */}
      <header className={`sticky top-0 inset-x-0 z-50 backdrop-blur-xl ${bgGlass} border-b ${borderSubtle} transition-all duration-300`}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 h-16 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className="h-6 w-auto object-contain" />
            ) : (
              <span className="font-semibold text-sm tracking-tight">{data.logo || data.name?.split(' ')[0]}</span>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {data.navbarLinks?.map((link, i) => {
              const isActive = activeSection === link.url.substring(1);
              return (
                <button
                  key={i}
                  onClick={() => link.url.startsWith('#') ? scrollTo(link.url.substring(1)) : window.open(link.url, '_blank')}
                  className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors ${isActive ? textMain : textMuted + ' hover:' + textMain}`}
                >
                  {isActive && (
                    <motion.div layoutId="nav-pill" className={`absolute inset-0 rounded-full ${isDark ? 'bg-white/10' : 'bg-black/5'} -z-10`} transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isDark ? 'text-[#A1A1AA] hover:text-white hover:bg-white/10' : 'text-[#71717A] hover:text-black hover:bg-black/5'}`}
            >
              <FontAwesomeIcon icon={isDark ? SolidIcons.faSun : SolidIcons.faMoon} className="text-sm" />
            </button>

            <button 
              className={`hidden sm:flex h-8 items-center px-4 rounded-full text-[13px] font-medium transition-all shadow-sm`}
              style={{ backgroundColor: primaryColor, color: '#fff', boxShadow: getGlow(0.2) }}
              onClick={() => {
                const link = data.navbarCtaLink || '#contact';
                if (link.startsWith('#')) scrollTo(link.substring(1));
                else window.open(link, '_blank');
              }}
            >
              {data.navbarCtaText || 'Contact'}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden flex items-center justify-center w-8 h-8 rounded-full bg-black/5 dark:bg-white/5"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <FontAwesomeIcon icon={SolidIcons.faBars} className={`text-sm ${textMain}`} />
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
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
            <motion.div 
              className={`relative w-[280px] h-full ${bgSub} border-l ${borderSubtle} shadow-2xl flex flex-col p-6`}
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-bold text-sm tracking-tight">{data.logo || data.name?.split(' ')[0]}</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                  <FontAwesomeIcon icon={SolidIcons.faTimes} />
                </button>
              </div>
              
              <nav className="flex flex-col gap-4">
                {data.navbarLinks?.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setTimeout(() => {
                        if (link.url.startsWith('#')) scrollTo(link.url.substring(1));
                        else window.open(link.url, '_blank');
                      }, 300);
                    }}
                    className={`text-left text-base font-medium py-3 border-b ${borderSubtle} ${textMuted} hover:${textMain} transition-colors`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <button 
                className={`mt-auto h-12 w-full rounded-full text-sm font-semibold transition-transform shadow-lg flex items-center justify-center gap-2`}
                style={{ backgroundColor: primaryColor, color: '#fff' }}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setTimeout(() => {
                    const link = data.navbarCtaLink || '#contact';
                    if (link.startsWith('#')) scrollTo(link.substring(1));
                    else window.open(link, '_blank');
                  }, 300);
                }}
              >
                {data.navbarCtaText || 'Contact'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-[1400px] mx-auto px-6 md:px-12 pt-24 pb-24 space-y-32">
        
        {/* 2. Hero Section */}
        <section id="hero" className="relative flex flex-col lg:flex-row gap-16 items-center min-h-[60vh]">
          <motion.div className="flex-1 relative z-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${borderSubtle} ${bgSub} text-[12px] font-medium mb-8`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
              {data.jobTitle || 'Software Engineer'}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-6">
              {data.name?.split(' ')[0] || 'Developer'}.<br/>
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${primaryColor}, ${isDark ? '#fff' : '#000'})` }}>
                Building the future.
              </span>
            </h1>
            
            <p className={`${textMuted} text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-light`}>
              {data.bio || "I engineer high-performance software architectures and design elegant user interfaces for the modern web."}
            </p>
            
            <div className="flex items-center gap-4">
              <button 
                className="h-11 px-6 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center gap-2"
                style={{ backgroundColor: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff' }}
                onClick={() => scrollTo('projects')}
              >
                Explore Work <FontAwesomeIcon icon={SolidIcons.faArrowRight} className="text-[10px]" />
              </button>
              {data.cvLink && (
                <button 
                  className={`h-11 px-6 rounded-full text-sm font-medium border ${borderSubtle} ${bgSub} hover:${borderHover} transition-all flex items-center gap-2`}
                  onClick={() => window.open(data.cvLink, '_blank')}
                >
                  <FontAwesomeIcon icon={SolidIcons.faDownload} className="text-[12px]" /> Resume
                </button>
              )}
            </div>
          </motion.div>

          <motion.div className="flex-1 w-full relative z-10" initial={{ opacity: 0, filter: 'blur(10px)' }} animate={{ opacity: 1, filter: 'blur(0px)' }} transition={{ duration: 1, delay: 0.2 }}>
            <div className={`aspect-[4/3] rounded-3xl overflow-hidden border ${borderSubtle} ${bgSub} shadow-2xl relative p-2`}>
              {data.heroImage ? (
                <img src={data.heroImage} alt={data.name} className="w-full h-full object-cover rounded-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700" />
              ) : (
                <div className="w-full h-full rounded-2xl flex items-center justify-center bg-gradient-to-tr from-black/5 to-black/20 dark:from-white/5 dark:to-white/10 relative overflow-hidden">
                  <div className="absolute w-[200%] h-[200%] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [transform:rotate(-15deg)]"></div>
                  <FontAwesomeIcon icon={SolidIcons.faCode} className="text-6xl opacity-20" />
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* 3. Skills Section */}
        <section id="skills" className="relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Technologies</h2>
            <p className={`${textMuted} text-base`}>The tools and frameworks I use to build scalable products.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.skills?.map((skill, i) => (
              <motion.div 
                key={i} 
                className={`flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border ${borderSubtle} ${bgSub} hover:${borderHover} transition-all group`}
                whileHover={{ y: -4, boxShadow: `0 10px 30px -10px ${isDark ? 'rgba(0,0,0,0.5)' : 'rgba(0,0,0,0.1)'}` }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <div className={`text-2xl transition-transform duration-300 group-hover:scale-110 group-hover:text-current ${textMuted}`} style={{ '--hover-color': primaryColor } as React.CSSProperties}>
                  {skill.icon ? <DynamicIcon name={skill.icon} /> : <div className="w-4 h-4 bg-current rounded-full" />}
                </div>
                <span className="text-[12px] font-medium tracking-wide">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 4. Services Section */}
        <section id="services" className="relative z-10">
          <div className="mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-3">Services</h2>
            <p className={`${textMuted} text-base max-w-xl`}>Comprehensive solutions designed to solve complex technical challenges and drive business growth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.services?.map((service, i) => (
              <motion.div 
                key={i} 
                className={`relative p-8 rounded-3xl border ${borderSubtle} ${bgSub} group overflow-hidden`}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5 dark:to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 border ${borderSubtle} bg-white dark:bg-[#1A1A1A] text-xl shadow-sm`} style={{ color: primaryColor }}>
                  {service.icon ? <DynamicIcon name={service.icon} /> : <FontAwesomeIcon icon={SolidIcons.faLayerGroup} />}
                </div>
                <h3 className="text-lg font-semibold mb-3 tracking-tight">{service.title}</h3>
                <p className={`${textMuted} text-[14px] leading-relaxed`}>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 5. Projects Section (Direct Links, No Modal) */}
        <section id="projects" className="relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-3">Selected Work</h2>
              <p className={`${textMuted} text-base max-w-xl`}>A showcase of my recent engineering projects and architectural designs.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {data.projects?.map((project, i) => (
              <motion.div 
                key={i} 
                className={`group flex flex-col rounded-3xl border ${borderSubtle} ${bgSub} overflow-hidden hover:${borderHover} transition-all duration-300 hover:shadow-xl`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="aspect-[16/10] relative overflow-hidden bg-[#111] border-b border-black/5 dark:border-white/5">
                  <img 
                    src={project.image || `https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800`} 
                    alt={project.title} 
                    className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-2xl font-bold tracking-tight">{project.title}</h3>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.skills?.map((s, j) => (
                      <span key={j} className={`text-[11px] font-medium px-2.5 py-1 rounded-md border ${borderSubtle} ${isDark ? 'bg-white/5' : 'bg-black/5'}`}>
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className={`${textMuted} text-[14px] mb-8 leading-relaxed flex-1`}>{project.description}</p>
                  
                  {project.link && (
                    <div className="pt-6 border-t border-current/10 mt-auto">
                      <button 
                        onClick={() => window.open(project.link, '_blank')}
                        className={`inline-flex items-center gap-2 h-10 px-6 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] shadow-sm`}
                        style={{ backgroundColor: primaryColor, color: '#fff' }}
                      >
                        View Project <FontAwesomeIcon icon={SolidIcons.faArrowRight} className="text-[10px]" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 6. Newsletter / CTA Section */}
        <section id="newsletter" className="relative z-10">
          <motion.div 
            className="w-full rounded-[2rem] relative overflow-hidden flex flex-col items-center text-center p-12 md:p-24"
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Elegant Background for Newsletter */}
            <div className={`absolute inset-0 z-0 opacity-40`} style={{ 
              backgroundImage: `radial-gradient(circle at 50% -20%, ${primaryColor}60 0%, transparent 60%)` 
            }}></div>
            <div className={`absolute inset-0 border ${borderSubtle} rounded-[2rem] z-0`}></div>
            <div className={`absolute inset-0 ${bgSub} -z-10`}></div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">{data.newsletter?.title || "Let's build something."}</h2>
              <p className={`${textMuted} text-lg mb-10 font-light`}>
                {data.newsletter?.description || "I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions."}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {data.contact?.email && (
                  <button 
                    className="h-12 px-8 rounded-full text-sm font-semibold transition-transform hover:scale-[1.02] shadow-xl flex items-center justify-center gap-2"
                    style={{ backgroundColor: isDark ? '#fff' : '#000', color: isDark ? '#000' : '#fff' }}
                    onClick={() => window.location.href = `mailto:${data.contact?.email}`}
                  >
                    <FontAwesomeIcon icon={SolidIcons.faEnvelope} /> Email Me
                  </button>
                )}
                {data.contact?.phone && (
                  <button 
                    className={`h-12 px-8 rounded-full text-sm font-medium border ${borderSubtle} ${bgMain} hover:${bgSub} transition-colors flex items-center justify-center gap-2`}
                    onClick={() => window.open(`https://wa.me/${data.contact?.phone?.replace(/\D/g, '')}`, '_blank')}
                  >
                    <FontAwesomeIcon icon={BrandIcons.faWhatsapp} /> Chat
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </section>

      </main>

      {/* 7. Footer */}
      <footer className={`border-t ${borderSubtle} ${bgMain} py-12 px-6 md:px-12 relative z-10`}>
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          <div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-pointer md:justify-start justify-center" onClick={() => scrollTo('hero')}>
            {data.logoType === 'image' && data.logo ? (
              <img src={data.logo} alt="Logo" className="h-6 w-auto object-contain grayscale" />
            ) : (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded flex items-center justify-center text-white" style={{ backgroundColor: primaryColor }}>
                  <FontAwesomeIcon icon={SolidIcons.faTerminal} className="text-[10px]" />
                </div>
                <span className="font-bold text-sm tracking-tight">{data.logo || data.name}</span>
              </div>
            )}
          </div>
          
          <div className="flex gap-6 md:justify-center justify-center">
            {Object.entries(data.socialLinks || {}).map(([key, value]) => (
              value && (
                <a key={key} href={value as string} target="_blank" rel="noopener noreferrer" className={`${textMuted} hover:${textMain} transition-colors p-2`}>
                  <DynamicIcon name={`fa${key.charAt(0).toUpperCase()}${key.slice(1)}`} className="text-[16px]" />
                </a>
              )
            ))}
          </div>
          
          <div className={`md:text-right text-center ${textMuted} text-[13px] font-medium`}>
            {data.footer?.copyRight || `© ${new Date().getFullYear()} ${data.name}. All rights reserved.`}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DeveloperTemplate;
