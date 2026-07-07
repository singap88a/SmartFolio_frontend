'use client';
import React, { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import IconPicker from '../ui/IconPicker';
import AIGenerateModal from './AIGenerateModal';
import { ChevronDown, ChevronUp, Plus, X, LayoutTemplate, User, Code2, Briefcase, FolderGit2, Mail, Wand2 } from 'lucide-react';

interface PortfolioFormProps {
  data: any;
  onChange: (newData: any) => void;
}

interface AccordionItemProps {
  id: number;
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: (id: number) => void;
  children: React.ReactNode;
}

const AccordionItem = ({ id, title, icon, isOpen, onToggle, children }: AccordionItemProps) => {
  return (
    <div className="border border-slate-200 dark:border-slate-800 rounded-xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm transition-all duration-300">
      <button 
        onClick={() => onToggle(id)}
        className={`w-full flex justify-between items-center p-3 transition-colors ${isOpen ? 'bg-slate-50 dark:bg-slate-900/80' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
      >
        <div className="flex items-center gap-3">
          <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold transition-colors ${isOpen ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}>
            {icon}
          </span>
          <h3 className="text-sm font-bold text-slate-800 dark:text-white">{title}</h3>
        </div>
        <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 rotate-180' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
          <ChevronDown size={18} />
        </div>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <div className="p-5 pt-2 border-t border-slate-100 dark:border-slate-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioForm = ({ data, onChange }: PortfolioFormProps) => {
  const [openSection, setOpenSection] = useState<number>(1);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  const handleAiData = (aiData: any) => {
    const newData = { ...data };
    if (aiData.name) newData.name = aiData.name;
    if (aiData.jobTitle) newData.jobTitle = aiData.jobTitle;
    if (aiData.bio) newData.bio = aiData.bio;
    if (aiData.skills && Array.isArray(aiData.skills)) newData.skills = aiData.skills;
    if (aiData.services && Array.isArray(aiData.services)) newData.services = aiData.services;
    if (aiData.projects && Array.isArray(aiData.projects)) newData.projects = aiData.projects;
    
    const validNavbarLinks = aiData.navbarLinks && Array.isArray(aiData.navbarLinks) 
      ? aiData.navbarLinks.filter((l: any) => l.label && l.label.trim() !== '')
      : [];

    if (validNavbarLinks.length > 0) {
      newData.navbarLinks = validNavbarLinks;
    } else {
      newData.navbarLinks = [
        { label: 'Home', url: '#hero' },
        { label: 'Skills', url: '#skills' },
        { label: 'Services', url: '#services' },
        { label: 'Projects', url: '#projects' },
        { label: 'Contact', url: '#contact' }
      ];
    }

    if (aiData.socialLinks) newData.socialLinks = { ...newData.socialLinks, ...aiData.socialLinks };
    if (aiData.contact) newData.contact = { ...newData.contact, ...aiData.contact };
    onChange(newData);
  };

  const handleChange = (path: string, value: any) => {
    const newData = { ...data };
    const parts = path.split('.');
    let current = newData;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = value;
    onChange(newData);
  };

  const handleImageUpload = (path: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange(path, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSection = (id: number) => {
    setOpenSection(openSection === id ? 0 : id);
  };

  return (
    <div className="space-y-3" dir="rtl">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold dark:text-white mb-1">إعدادات المحفظة</h2>
          <p className="text-slate-500 text-sm">أدخل بياناتك هنا وسوف تظهر مباشرة في شاشة العرض.</p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setIsAiModalOpen(true)}
          className="gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 text-white shadow-lg shadow-indigo-500/30 whitespace-nowrap"
        >
          <Wand2 size={18} />
          املأ بالذكاء الاصطناعي
        </Button>
      </div>

      <AIGenerateModal 
        isOpen={isAiModalOpen}
        onClose={() => setIsAiModalOpen(false)}
        onDataGenerated={handleAiData}
        currentData={data}
      />

      {/* 1. Navbar Customization */}
      <AccordionItem id={1} icon={<LayoutTemplate size={16} />} isOpen={openSection === 1} onToggle={toggleSection} title="إعدادات القائمة العلوية (Navbar)">
        <div className="space-y-6">
          <div className="p-5 bg-slate-50 dark:bg-slate-950/50 rounded-2xl border border-slate-200 dark:border-slate-800">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block mb-4">شعار الموقع (اللوجو)</label>
            <div className="flex gap-4 mb-5">
              {['text', 'image'].map(type => (
                <button 
                  key={type}
                  onClick={() => handleChange('logoType', type)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${data.logoType === type ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20' : 'bg-white dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
                >
                  {type === 'text' ? 'نص' : 'صورة'}
                </button>
              ))}
            </div>
            {data.logoType === 'image' ? (
              <div className="flex gap-5 items-center">
                {data.logo && <img src={data.logo} className="w-14 h-14 rounded-xl object-contain bg-white p-2 border shadow-sm" />}
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-500 mb-2">رفع صورة الشعار</label>
                  <input type="file" accept="image/*" onChange={(e) => handleImageUpload('logo', e)} className="w-full text-sm text-slate-500 file:ml-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
                </div>
              </div>
            ) : (
              <Input 
                label="نص الشعار" 
                value={data.logo} 
                onChange={(e) => handleChange('logo', e.target.value)} 
                placeholder="مثال: Portfolify"
              />
            )}
          </div>

          <div className="space-y-4">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">روابط القائمة</label>
            {(data.navbarLinks || []).map((link: any, index: number) => (
              <div key={index} className="flex gap-3 items-end p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                <div className="flex-1">
                  <Input label="الاسم" value={link.label} onChange={(e) => {
                    const newLinks = [...data.navbarLinks];
                    newLinks[index].label = e.target.value;
                    handleChange('navbarLinks', newLinks);
                  }} />
                </div>
                <div className="flex-1">
                  <Input label="الرابط (URL)" value={link.url} onChange={(e) => {
                    const newLinks = [...data.navbarLinks];
                    newLinks[index].url = e.target.value;
                    handleChange('navbarLinks', newLinks);
                  }} />
                </div>
                <button onClick={() => {
                  const newLinks = [...data.navbarLinks];
                  newLinks.splice(index, 1);
                  handleChange('navbarLinks', newLinks);
                }} className="mb-2 p-3 bg-white dark:bg-slate-900 text-red-500 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors shadow-sm border border-slate-200 dark:border-slate-700">
                  <X size={18} />
                </button>
              </div>
            ))}
            <Button variant="outline" className="w-full rounded-2xl border-dashed border-2 py-4 flex items-center justify-center gap-2" onClick={() => handleChange('navbarLinks', [...(data.navbarLinks || []), { label: '', url: '' }])}>
              <Plus size={18} />
              إضافة رابط جديد
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-slate-50 dark:bg-slate-950/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <Input 
              label="نص زر التواصل السريع (CTA)" 
              value={data.navbarCtaText} 
              onChange={(e) => handleChange('navbarCtaText', e.target.value)} 
              placeholder="مثال: Hire Me"
            />
            <div className="w-full space-y-1.5">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300 block">رابط زر التواصل (إلى أين يذهب؟)</label>
              <select 
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-all outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 text-sm"
                value={data.navbarCtaLink || '#contact'}
                onChange={(e) => handleChange('navbarCtaLink', e.target.value)}
              >
                <option value="#contact">قسم التواصل (افتراضي)</option>
                {data.navbarLinks?.map((link: any, i: number) => (
                  <option key={i} value={link.url}>{link.label} ({link.url})</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* 2. Hero Section */}
      <AccordionItem id={2} icon={<User size={16} />} isOpen={openSection === 2} onToggle={toggleSection} title="القسم الرئيسي (Hero Section)">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input 
              label="الاسم المهني" 
              value={data.name} 
              onChange={(e) => handleChange('name', e.target.value)} 
              placeholder="مثال: أحمد محمد"
            />
            <Input 
              label="المسمى الوظيفي / التخصص" 
              value={data.jobTitle} 
              onChange={(e) => handleChange('jobTitle', e.target.value)} 
              placeholder="مثال: مطور ويب شامل"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300">الصورة الشخصية للقسم الرئيسي (Hero Image)</label>
              <div className="flex gap-4 items-center p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 overflow-hidden border border-slate-200 dark:border-slate-700 flex-shrink-0">
                  {data.heroImage ? <img src={data.heroImage} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-400">?</div>}
                </div>
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload('heroImage', e)} className="w-full text-sm text-slate-500 file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 cursor-pointer" />
              </div>
            </div>
            <div className="space-y-4">
              <Input 
                label="رابط السيرة الذاتية (CV)" 
                value={data.cvLink} 
                onChange={(e) => handleChange('cvLink', e.target.value)} 
                placeholder="https://drive.google.com/..."
              />
            </div>
          </div>
          <div className="w-full space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">نبذة عنك (Bio)</label>
            <textarea 
              className="w-full px-5 py-4 rounded-2xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all min-h-[140px] resize-none text-sm"
              value={data.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              placeholder="اكتب نبذة مختصرة عنك وعن خبراتك..."
            />
          </div>
        </div>
      </AccordionItem>

      {/* 3. Skills */}
      <AccordionItem id={3} icon={<Code2 size={16} />} isOpen={openSection === 3} onToggle={toggleSection} title="المهارات (Skills)">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(data.skills || []).map((skill: any, index: number) => (
            <div key={index} className="flex flex-col gap-3 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-500">مهارة {index + 1}</label>
                <button onClick={() => {
                  const newSkills = [...data.skills];
                  newSkills.splice(index, 1);
                  handleChange('skills', newSkills);
                }} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded-lg transition-colors">
                  <X size={16} />
                </button>
              </div>
              <Input 
                value={skill.name} 
                placeholder="اسم المهارة (مثال: React)"
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index].name = e.target.value;
                  handleChange('skills', newSkills);
                }} 
              />
              <IconPicker 
                label="الأيقونة"
                value={skill.icon} 
                onChange={(val) => {
                  const newSkills = [...data.skills];
                  newSkills[index].icon = val;
                  handleChange('skills', newSkills);
                }} 
              />
            </div>
          ))}
          <button 
            onClick={() => handleChange('skills', [...(data.skills || []), { name: '', icon: '' }])}
            className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl py-8 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors text-indigo-600 font-bold"
          >
            <Plus size={24} />
            إضافة مهارة جديدة
          </button>
        </div>
      </AccordionItem>

      {/* 4. Services */}
      <AccordionItem id={4} icon={<Briefcase size={16} />} isOpen={openSection === 4} onToggle={toggleSection} title="الخدمات (Services)">
        <div className="space-y-4">
          {data.services?.map((service: any, index: number) => (
            <div key={index} className="p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-slate-100 dark:border-slate-800 relative group">
              <button 
                className="absolute top-4 left-4 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                onClick={() => {
                  const newServices = [...data.services];
                  newServices.splice(index, 1);
                  handleChange('services', newServices);
                }}
              ><X size={18} /></button>
              
              <div className="grid grid-cols-1 gap-4 pr-2">
                <Input 
                  label="اسم الخدمة" 
                  value={service.title} 
                  onChange={(e) => {
                    const newServices = [...data.services];
                    newServices[index].title = e.target.value;
                    handleChange('services', newServices);
                  }} 
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input 
                    label="وصف مختصر للخدمة" 
                    value={service.description} 
                    onChange={(e) => {
                      const newServices = [...data.services];
                      newServices[index].description = e.target.value;
                      handleChange('services', newServices);
                    }} 
                  />
                  <IconPicker 
                    label="الأيقونة"
                    value={service.icon} 
                    onChange={(val) => {
                      const newServices = [...data.services];
                      newServices[index].icon = val;
                      handleChange('services', newServices);
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full rounded-2xl border-dashed border-2 py-4 flex items-center justify-center gap-2" onClick={() => handleChange('services', [...data.services, { title: '', description: '', icon: '' }])}>
            <Plus size={18} />
            إضافة خدمة
          </Button>
        </div>
      </AccordionItem>

      {/* 5. Projects */}
      <AccordionItem id={5} icon={<FolderGit2 size={16} />} isOpen={openSection === 5} onToggle={toggleSection} title="الأعمال (Projects)">
        <div className="space-y-6">
          {data.projects.map((project: any, index: number) => (
            <div key={index} className="p-6 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-3xl relative">
              <button 
                className="absolute top-5 left-5 p-2 bg-white dark:bg-slate-900 text-red-500 rounded-xl shadow-sm hover:bg-red-50 transition-all border border-slate-200 dark:border-slate-700"
                onClick={() => {
                  const newProjects = [...data.projects];
                  newProjects.splice(index, 1);
                  handleChange('projects', newProjects);
                }}
              ><X size={18} /></button>
              <div className="grid grid-cols-1 gap-5">
                <Input 
                  label="عنوان المشروع" 
                  value={project.title} 
                  onChange={(e) => {
                    const newProjects = [...data.projects];
                    newProjects[index].title = e.target.value;
                    handleChange('projects', newProjects);
                  }}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Input 
                    label="رابط الصورة (URL)" 
                    value={project.image} 
                    placeholder="https://images.unsplash.com/..."
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[index].image = e.target.value;
                      handleChange('projects', newProjects);
                    }}
                  />
                  <Input 
                    label="رابط المعاينة / المصدر" 
                    value={project.link} 
                    placeholder="https://github.com/..."
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[index].link = e.target.value;
                      handleChange('projects', newProjects);
                    }}
                  />
                </div>
                <div className="w-full space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">وصف المشروع</label>
                  <textarea 
                    className="w-full px-5 py-3 rounded-xl border-2 border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-600/10 outline-none transition-all resize-none text-sm"
                    rows={2}
                    value={project.description}
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[index].description = e.target.value;
                      handleChange('projects', newProjects);
                    }}
                  />
                </div>
                <div className="w-full space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">التقنيات المستخدمة (مفصولة بفاصلة)</label>
                  <Input 
                    value={project.skills?.join(', ')} 
                    onChange={(e) => {
                      const newProjects = [...data.projects];
                      newProjects[index].skills = e.target.value.split(',').map((s: string) => s.trim());
                      handleChange('projects', newProjects);
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full rounded-2xl border-dashed border-2 py-4 flex items-center justify-center gap-2" onClick={() => handleChange('projects', [...data.projects, { title: '', description: '', image: '', skills: [] }])}>
            <Plus size={18} />
            إضافة مشروع
          </Button>
        </div>
      </AccordionItem>

      {/* 6. Contact & Newsletter */}
      <AccordionItem id={6} icon={<Mail size={16} />} isOpen={openSection === 6} onToggle={toggleSection} title="التواصل والنشرة البريدية (Contact & Newsletter)">
        <div className="space-y-8">
          
          {/* Contact Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">قسم التواصل (Contact)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="العنوان (Title)" 
                placeholder="مثال: Let's work together"
                value={data.contact?.title}
                onChange={(e) => handleChange('contact.title', e.target.value)}
              />
              <Input 
                label="رقم الهاتف أو الواتساب" 
                placeholder="مثال: +1234567890"
                value={data.contact?.phone}
                onChange={(e) => handleChange('contact.phone', e.target.value)}
              />
              <div className="sm:col-span-2">
                <Input 
                  label="الوصف (Description)" 
                  placeholder="وصف قسم التواصل..."
                  value={data.contact?.description}
                  onChange={(e) => handleChange('contact.description', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">النشرة البريدية (Newsletter)</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="عنوان النشرة البريدية" 
                placeholder="مثال: Subscribe to Newsletter"
                value={data.newsletter?.title}
                onChange={(e) => handleChange('newsletter.title', e.target.value)}
              />
              <Input 
                label="البريد الإلكتروني" 
                type="email"
                placeholder="contact@yourdomain.com"
                value={data.contact?.email}
                onChange={(e) => handleChange('contact.email', e.target.value)}
              />
              <div className="sm:col-span-2">
                <Input 
                  label="وصف النشرة البريدية" 
                  placeholder="اكتب وصف قصير..."
                  value={data.newsletter?.description}
                  onChange={(e) => handleChange('newsletter.description', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </AccordionItem>

      {/* 7. Footer & Socials */}
      <AccordionItem id={7} icon={<LayoutTemplate size={16} />} isOpen={openSection === 7} onToggle={toggleSection} title="التذييل والسوشيال ميديا (Footer & Socials)">
        <div className="space-y-8">
          {/* Social Media Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">روابط السوشيال ميديا</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input 
                label="فيسبوك (Facebook)" 
                placeholder="https://facebook.com/..."
                value={data.socialLinks?.facebook}
                onChange={(e) => handleChange('socialLinks.facebook', e.target.value)}
              />
              <Input 
                label="تويتر (X / Twitter)" 
                placeholder="https://twitter.com/..."
                value={data.socialLinks?.twitter}
                onChange={(e) => handleChange('socialLinks.twitter', e.target.value)}
              />
              <Input 
                label="انستجرام (Instagram)" 
                placeholder="https://instagram.com/..."
                value={data.socialLinks?.instagram}
                onChange={(e) => handleChange('socialLinks.instagram', e.target.value)}
              />
              <Input 
                label="لينكد إن (LinkedIn)" 
                placeholder="https://linkedin.com/..."
                value={data.socialLinks?.linkedin}
                onChange={(e) => handleChange('socialLinks.linkedin', e.target.value)}
              />
              <Input 
                label="جيت هب (Github)" 
                placeholder="https://github.com/..."
                value={data.socialLinks?.github}
                onChange={(e) => handleChange('socialLinks.github', e.target.value)}
              />
            </div>
          </div>

          {/* Footer Text Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">نصوص التذييل (Footer Text)</h4>
            <div className="grid grid-cols-1 gap-4">
              <Input 
                label="نبذة عن الموقع (Footer Description)" 
                placeholder="اكتب جملة قصيرة عنك تظهر في التذييل..."
                value={data.footer?.description}
                onChange={(e) => handleChange('footer.description', e.target.value)}
              />
              <Input 
                label="حقوق النشر (Copyright)" 
                placeholder="© 2026 Your Name. All rights reserved."
                value={data.footer?.copyRight}
                onChange={(e) => handleChange('footer.copyRight', e.target.value)}
              />
            </div>
          </div>

          {/* Theme Color */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 block">لون الثيم الأساسي (المظهر)</label>
            <div className="flex flex-wrap gap-4">
              {['#4f46e5', '#ec4899', '#10b981', '#f59e0b', '#ef4444', '#000000'].map(color => (
                <button
                  key={color}
                  className={`w-12 h-12 rounded-2xl border-4 transition-all hover:scale-110 ${data.themeColor === color ? 'border-indigo-600 dark:border-white scale-110 shadow-lg' : 'border-transparent shadow-sm'}`}
                  style={{ backgroundColor: color }}
                  onClick={() => handleChange('themeColor', color)}
                  type="button"
                />
              ))}
            </div>
          </div>

        </div>
      </AccordionItem>
    </div>
  );
};

export default PortfolioForm;
