'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { getSubdomainUrl, APP_DOMAIN } from '@/lib/config';
import Button from '@/components/ui/Button';
import { User as UserIcon, Mail, Phone, Calendar, Globe, Camera, Save, AlertCircle, Check, Lock, ArrowRight, LayoutTemplate } from 'lucide-react';

const ProfilePage = () => {
  const { user, checkAuth } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const requireSubdomain = searchParams.get('requireSubdomain') === 'true';

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [subdomainError, setSubdomainError] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    phone: '',
    birthDate: '',
    profileImage: '',
    subdomain: '',
  });
  
  const [userPortfolio, setUserPortfolio] = useState<any>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
        profileImage: user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        subdomain: user.subdomain || '',
      });
    }

    const fetchUserPortfolio = async () => {
      try {
        const res = await fetchApi('/portfolio/my');
        if (res && res.data) {
          setUserPortfolio(res.data);
        }
      } catch (err) {
        console.log('No portfolio found for user');
      }
    };

    fetchUserPortfolio();
  }, [user]);

  const handleSubdomainChange = (val: string) => {
    const cleanVal = val.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setFormData(prev => ({ ...prev, subdomain: cleanVal }));
    setSubdomainError('');
    setGeneralError('');
    
    if (cleanVal.trim() === '') {
      setSubdomainError('Subdomain cannot be empty.');
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSubdomainError('');
    setGeneralError('');
    setSuccessMessage('');

    if (!formData.subdomain.trim()) {
      setSubdomainError('Please enter a valid subdomain.');
      setIsLoading(false);
      return;
    }

    try {
      await fetchApi('/auth/profile', {
        method: 'PUT',
        body: JSON.stringify(formData)
      });
      
      await checkAuth();
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      if (err.message?.includes('subdomain')) {
        setSubdomainError(err.message);
      } else {
        setGeneralError(err.message || 'Failed to update profile');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

  return (
    <div className="p-8 lg:p-12 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <p className="text-sm font-bold text-[#5A4BFF] mb-2 tracking-widest uppercase">Settings</p>
        <h1 className="text-3xl font-black text-white tracking-tight">My Profile</h1>
      </div>

      {/* Alerts */}
      {requireSubdomain && !user?.subdomain && (
        <div className="bg-amber-50 dark:bg-amber-500/10 border-l-4 border-amber-500 p-4 rounded-r-2xl flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-500 shrink-0" />
          <div>
            <h3 className="font-bold text-amber-900 dark:text-amber-400">Subdomain Required</h3>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
              Before selecting a template, you must secure a unique subdomain for your portfolio.
            </p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="bg-emerald-50 dark:bg-emerald-500/10 border-l-4 border-emerald-500 p-4 rounded-r-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400">
          <Check className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold">{successMessage}</p>
        </div>
      )}

      {generalError && (
        <div className="bg-rose-50 dark:bg-rose-500/10 border-l-4 border-rose-500 p-4 rounded-r-2xl flex items-center gap-3 text-rose-700 dark:text-rose-400">
          <AlertCircle className="w-5 h-5 shrink-0" />
          <p className="text-sm font-bold">{generalError}</p>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-[#0F121E] rounded-3xl border border-[#1E2336] shadow-sm overflow-hidden">
        
        {/* Profile Header (Avatar & Name) */}
        <div className="p-8 border-b border-[#1E2336] flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-center gap-6">
            <div className="relative group">
              <img 
                src={formData.profileImage || defaultAvatar} 
                alt="Avatar" 
                className="w-24 h-24 rounded-2xl object-cover shadow-md border border-[#1E2336]"
              />
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-slate-900/50 rounded-2xl opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera className="w-6 h-6 text-white" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                </label>
              )}
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-bold text-white">{formData.username || 'User'}</h2>
              <p className="text-slate-400 text-sm mt-1 max-w-md">{formData.bio || 'Add a bio to tell visitors who you are.'}</p>
            </div>
          </div>
          
          {!isEditing ? (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="rounded-xl shrink-0">
              Edit Profile
            </Button>
          ) : (
            <div className="flex gap-3 shrink-0">
              <Button variant="ghost" onClick={() => setIsEditing(false)} className="rounded-xl">Cancel</Button>
              <Button variant="primary" onClick={handleUpdate} isLoading={isLoading} className="rounded-xl gap-2">
                <Save size={16} /> Save
              </Button>
            </div>
          )}
        </div>

        {/* Form Fields */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Display Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    disabled={!isEditing}
                    type="text"
                    value={formData.username}
                    onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] text-white border border-[#1E2336] rounded-xl focus:ring-2 focus:ring-[#5A4BFF] focus:border-[#5A4BFF] transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Portfolio Subdomain</label>
                <div className="relative flex">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Globe className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    disabled={!isEditing}
                    type="text"
                    value={formData.subdomain}
                    onChange={(e) => handleSubdomainChange(e.target.value)}
                    placeholder="myname"
                    className={`w-full pl-10 pr-[140px] py-2.5 bg-[#0B0F19] text-white border rounded-xl transition-all disabled:opacity-60 ${subdomainError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[#1E2336] focus:ring-2 focus:ring-[#5A4BFF] focus:border-[#5A4BFF]'}`}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center px-3 border-l border-[#1E2336] text-slate-400 bg-[#151926] rounded-r-xl text-sm font-medium">
                    .{APP_DOMAIN}
                  </div>
                </div>
                {subdomainError && <p className="text-xs text-red-500 mt-2 flex items-center gap-1"><AlertCircle size={12}/>{subdomainError}</p>}
                
                {/* Live Link Preview */}
                {!isEditing && formData.subdomain && (
                  <a href={getSubdomainUrl(formData.subdomain)} target="_blank" rel="noreferrer" className="mt-3 flex items-center justify-between p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/10 border border-indigo-100 dark:border-indigo-500/20 group hover:bg-indigo-50 dark:hover:bg-indigo-500/20 transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                      <span className="text-xs font-semibold text-indigo-700 dark:text-indigo-400">{getSubdomainUrl(formData.subdomain)}</span>
                    </div>
                    <ArrowRight size={14} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    disabled={!isEditing}
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] text-white border border-[#1E2336] rounded-xl focus:ring-2 focus:ring-[#5A4BFF] focus:border-[#5A4BFF] transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    disabled={!isEditing}
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0B0F19] text-white border border-[#1E2336] rounded-xl focus:ring-2 focus:ring-[#5A4BFF] focus:border-[#5A4BFF] transition-all disabled:opacity-60"
                  />
                </div>
              </div>
            </div>

            {/* Full Width Bio */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-slate-300 mb-2">Short Bio</label>
              <textarea 
                disabled={!isEditing}
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                placeholder="Write a brief intro about yourself..."
                className="w-full bg-[#0B0F19] text-white border border-[#1E2336] rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-[#5A4BFF] focus:border-[#5A4BFF] transition-all resize-none h-[120px] disabled:opacity-60"
              />
            </div>
            
          </div>
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
