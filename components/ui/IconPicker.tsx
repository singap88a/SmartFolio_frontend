import React, { useState, useMemo, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as SolidIcons from '@fortawesome/free-solid-svg-icons';
import * as BrandIcons from '@fortawesome/free-brands-svg-icons';
import { X, Search } from 'lucide-react';
import { createPortal } from 'react-dom';

const allSolidIcons = Object.keys(SolidIcons)
  .filter(key => key.startsWith('fa') && key !== 'fas' && key !== 'fa')
  .map(key => ({ name: key, icon: (SolidIcons as any)[key] }));

const allBrandIcons = Object.keys(BrandIcons)
  .filter(key => key.startsWith('fa') && key !== 'fab' && key !== 'fa')
  .map(key => ({ name: key, icon: (BrandIcons as any)[key] }));

const allIconsList = [...allSolidIcons, ...allBrandIcons];

const CATEGORIES = [
  { id: 'all', label: 'الكل', keywords: [] },
  { id: 'tech', label: 'برمجة وتكنولوجيا', keywords: ['code', 'laptop', 'server', 'react', 'node', 'js', 'database', 'android', 'apple', 'desktop', 'mobile', 'robot', 'python', 'java', 'bug', 'terminal'] },
  { id: 'business', label: 'بيزنس وماليات', keywords: ['chart', 'dollar', 'briefcase', 'bank', 'money', 'shop', 'cart', 'credit', 'euro', 'wallet', 'store', 'percent'] },
  { id: 'social', label: 'سوشيال ميديا', keywords: ['facebook', 'twitter', 'instagram', 'linkedin', 'whatsapp', 'youtube', 'tiktok', 'snapchat', 'discord', 'telegram', 'slack', 'reddit', 'github', 'behance', 'dribbble'] },
  { id: 'media', label: 'تصميم وميديا', keywords: ['palette', 'image', 'camera', 'video', 'music', 'film', 'brush', 'pen-nib', 'headphones', 'microphone'] },
  { id: 'construction', label: 'مقاولات وعقارات', keywords: ['hammer', 'wrench', 'building', 'house', 'truck', 'helmet', 'hard-hat', 'tools', 'city', 'screwdriver', 'paint', 'ruler'] },
  { id: 'education', label: 'تعليم', keywords: ['book', 'school', 'graduation', 'pen', 'pencil', 'chalkboard', 'user-graduate', 'microscope', 'globe'] },
  { id: 'medical', label: 'طبي وصحة', keywords: ['heart', 'stethoscope', 'hospital', 'doctor', 'syringe', 'pills', 'tooth', 'brain', 'lungs', 'virus', 'x-ray'] },
  { id: 'arrows', label: 'أسهم وتوجيه', keywords: ['arrow', 'chevron', 'angle', 'caret', 'location', 'map', 'compass', 'route', 'navigation'] },
];

interface IconPickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function IconPicker({ value, onChange, label }: IconPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const filteredIcons = useMemo(() => {
    let list = allIconsList;

    // 1. Filter by category if no search is active
    if (!search && activeCategory !== 'all') {
      const category = CATEGORIES.find(c => c.id === activeCategory);
      if (category && category.keywords.length > 0) {
        list = list.filter(item => 
          category.keywords.some(kw => item.name.toLowerCase().includes(kw))
        );
      }
    }

    // 2. Filter by search text
    if (search) {
      const lowerSearch = search.toLowerCase();
      list = list.filter(item => item.name.toLowerCase().includes(lowerSearch));
    }

    return list.slice(0, 150); // Limit to 150 icons for performance
  }, [search, activeCategory]);

  const currentIconDef = value ? ((SolidIcons as any)[value] || (BrandIcons as any)[value]) : null;

  const ModalContent = (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" dir="rtl">
      {/* Blurred Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Main Modal Container */}
      <div className="relative w-full max-w-5xl h-[85vh] bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Sidebar (Categories) */}
        <div className="w-full md:w-64 bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 flex flex-col shrink-0 h-48 md:h-full overflow-y-auto custom-scrollbar">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 shrink-0">
            <h2 className="text-xl font-black text-slate-800 dark:text-white">مكتبة الأيقونات</h2>
            <p className="text-xs text-slate-500 mt-1">اختر الأيقونة المناسبة</p>
          </div>
          <div className="p-3 flex-1 overflow-y-auto space-y-1">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setSearch(''); }}
                className={`w-full text-right px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  activeCategory === cat.id && !search
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-h-0 bg-white dark:bg-slate-900">
          {/* Header (Search Bar & Close Button) */}
          <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 shrink-0">
            <div className="flex-1 relative">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="ابحث عن أيقونة بالإنجليزي... (مثل: home, user, car)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-12 py-3.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl text-sm font-medium outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-right"
                dir="ltr"
              />
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-3 bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 text-slate-500 rounded-2xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Icons Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4">
              {filteredIcons.map(item => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => {
                    onChange(item.name);
                    setIsOpen(false);
                    setSearch('');
                  }}
                  className={`flex flex-col items-center justify-center p-4 sm:p-5 rounded-2xl border transition-all ${
                    value === item.name 
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 shadow-md scale-105' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:border-indigo-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-1'
                  }`}
                  title={item.name}
                >
                  <FontAwesomeIcon icon={item.icon} className="text-2xl sm:text-3xl mb-2" />
                  <span className="text-[10px] font-medium opacity-50 truncate w-full text-center" dir="ltr">{item.name.replace('fa', '')}</span>
                </button>
              ))}
            </div>

            {filteredIcons.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4 py-12">
                <Search className="w-12 h-12 opacity-20" />
                <p className="font-bold">لم نتمكن من العثور على أيقونة تطابق بحثك</p>
                <p className="text-sm">جرب استخدام كلمات إنجليزية أخرى (مثل: web, phone, location)</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative w-full space-y-1.5" dir="rtl">
      {label && <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{label}</label>}
      
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-between px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10"
      >
        <div className="flex items-center gap-3">
          {currentIconDef ? (
            <FontAwesomeIcon icon={currentIconDef} className="text-indigo-600 text-lg" />
          ) : (
            <FontAwesomeIcon icon={SolidIcons.faIcons} className="text-slate-400 text-lg" />
          )}
          <span className="text-slate-700 dark:text-slate-300 font-medium text-left" dir="ltr">{value || 'اختر أيقونة...'}</span>
        </div>
      </button>

      {/* Render Modal via Portal if window is available */}
      {isOpen && mounted && createPortal(ModalContent, document.body)}
    </div>
  );
}
