import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Button from '@/components/ui/Button';
import { X, Wand2, Loader2, FileText, Type, Sparkles, UploadCloud, Pencil } from 'lucide-react';
import { fetchApi } from '@/lib/api';

interface AIGenerateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataGenerated: (data: any) => void;
  currentData?: any;
}

type TabType = 'wizard' | 'text' | 'cv' | 'edit';

const AIGenerateModal: React.FC<AIGenerateModalProps> = ({ isOpen, onClose, onDataGenerated, currentData }) => {
  const [activeTab, setActiveTab] = useState<TabType>('wizard');
  
  // Text State
  const [text, setText] = useState('');
  
  // Edit State
  const [editText, setEditText] = useState('');
  
  // Wizard State
  const [wizName, setWizName] = useState('');
  const [wizJob, setWizJob] = useState('');
  const [wizSkills, setWizSkills] = useState('');
  
  // CV State
  const [cvFile, setCvFile] = useState<File | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleGenerate = async () => {
    setError('');
    setIsLoading(true);

    try {
      let response;

      if (activeTab === 'wizard') {
        if (!wizName.trim() || !wizJob.trim() || !wizSkills.trim()) {
          setError('يرجى تعبئة جميع حقول الأسئلة السريعة.');
          setIsLoading(false);
          return;
        }
        const combinedText = `My name is ${wizName}. My job title is ${wizJob}. My main skills are: ${wizSkills}. Please write a professional bio, invent suitable services, and create sample projects for me. Return Arabic translation for everything.`;
        response = await fetchApi('/ai/generate-portfolio', {
          method: 'POST',
          body: JSON.stringify({ text: combinedText }),
        });
      } 
      else if (activeTab === 'text') {
        if (!text.trim()) {
          setError('يرجى إدخال بعض النص.');
          setIsLoading(false);
          return;
        }
        response = await fetchApi('/ai/generate-portfolio', {
          method: 'POST',
          body: JSON.stringify({ text }),
        });
      } 
      else if (activeTab === 'edit') {
        if (!editText.trim()) {
          setError('يرجى تحديد ما تود تغييره.');
          setIsLoading(false);
          return;
        }
        response = await fetchApi('/ai/edit-portfolio', {
          method: 'POST',
          body: JSON.stringify({ text: editText, currentData }),
        });
      }
      else if (activeTab === 'cv') {
        if (!cvFile) {
          setError('يرجى رفع ملف PDF.');
          setIsLoading(false);
          return;
        }
        const formData = new FormData();
        formData.append('cv', cvFile);
        
        response = await fetchApi('/ai/generate-portfolio-cv', {
          method: 'POST',
          body: formData,
        });
      }

      if (response && response.data) {
        onDataGenerated(response.data);
        onClose();
        setText('');
        setEditText('');
        setWizName('');
        setWizJob('');
        setWizSkills('');
        setCvFile(null);
      } else {
        setError('فشل في استخراج البيانات. يرجى المحاولة مرة أخرى.');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'حدث خطأ ما.');
    } finally {
      setIsLoading(false);
    }
  };

  const isGenerateDisabled = () => {
    if (isLoading) return true;
    if (activeTab === 'wizard') return !wizName.trim() || !wizJob.trim() || !wizSkills.trim();
    if (activeTab === 'text') return !text.trim();
    if (activeTab === 'edit') return !editText.trim();
    if (activeTab === 'cv') return !cvFile;
    return true;
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4" dir="rtl">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-500/10 rounded-xl flex items-center justify-center">
              <Wand2 className="text-indigo-600 dark:text-indigo-400" size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 dark:text-white">املأ بالذكاء الاصطناعي</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">اختر كيف تريد إنشاء أو تعديل محفظتك.</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-4 gap-6">
          <button
            onClick={() => setActiveTab('wizard')}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'wizard' 
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Sparkles size={16} /> الأسئلة السريعة
          </button>
          <button
            onClick={() => setActiveTab('text')}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'text' 
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Type size={16} /> لصق نص
          </button>
          <button
            onClick={() => setActiveTab('cv')}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'cv' 
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <FileText size={16} /> رفع السيرة الذاتية
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`pb-3 text-sm font-medium transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === 'edit' 
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400 dark:border-indigo-400' 
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            <Pencil size={16} /> التعديل السحري
          </button>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          {activeTab === 'wizard' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ما هو اسمك؟</label>
                <input 
                  type="text"
                  placeholder="مثال: أحمد محمد"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  value={wizName}
                  onChange={(e) => setWizName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">ما هو مسماك الوظيفي؟</label>
                <input 
                  type="text"
                  placeholder="مثال: مطور ويب (Frontend Developer)"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  value={wizJob}
                  onChange={(e) => setWizJob(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">اذكر 3 مهارات أو أكثر</label>
                <input 
                  type="text"
                  placeholder="مثال: React, Node.js, تصميم واجهات"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                  value={wizSkills}
                  onChange={(e) => setWizSkills(e.target.value)}
                />
              </div>
              <p className="text-xs text-slate-500 mt-2">
                سنستخدم هذه التفاصيل لكتابة نبذة احترافية كاملة، وإنشاء خدمات، وتخيل مشاريع نموذجية تناسبك!
              </p>
            </div>
          )}

          {activeTab === 'text' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                قم بلصق سيرتك الذاتية التفصيلية أو أي نص هنا
              </label>
              <textarea
                className="w-full h-48 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none outline-none"
                placeholder="مثال: أنا مهندس برمجيات بخبرة 5 سنوات في React و Node.js. مهاراتي تشمل TypeScript و MongoDB. عملت على مشاريع مثل..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}

          {activeTab === 'edit' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                ما الذي تود تغييره؟
              </label>
              <textarea
                className="w-full h-48 p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none outline-none"
                placeholder="مثال: قم بتغيير مسماي الوظيفي إلى مطور خلفي (Backend) وأضف لغة بايثون إلى مهاراتي."
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <p className="text-xs text-slate-500 mt-2">
                سيقوم الذكاء الاصطناعي بتعديل البيانات المطلوبة فقط دون المساس بباقي معلومات محفظتك.
              </p>
            </div>
          )}

          {activeTab === 'cv' && (
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                ارفع سيرتك الذاتية (بصيغة PDF)
              </label>
              <div className="mt-2 flex justify-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 px-6 py-10 bg-slate-50 dark:bg-slate-800/50">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
                  <div className="mt-4 flex text-sm leading-6 text-slate-600 dark:text-slate-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 dark:text-indigo-400"
                    >
                      <span>اختر ملفاً</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" accept=".pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} />
                    </label>
                    <p className="pl-1">أو قم بالسحب والإفلات هنا</p>
                  </div>
                  <p className="text-xs leading-5 text-slate-500 mt-2">ملف PDF بحجم أقصاه 10 ميجابايت</p>
                  {cvFile && (
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-4 bg-indigo-50 dark:bg-indigo-900/30 py-2 px-4 rounded-lg inline-block">
                      تم اختيار: {cvFile.name}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50 dark:bg-slate-900/50">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            إلغاء
          </Button>
          <Button 
            variant="primary" 
            onClick={handleGenerate} 
            disabled={isGenerateDisabled()}
            className="gap-2 bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            {isLoading ? <Loader2 className="animate-spin" size={18} /> : <Wand2 size={18} />}
            {isLoading ? 'جاري التنفيذ...' : 'نفذ الطلب بالسحر 🪄'}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AIGenerateModal;
