'use client';
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { fetchApi } from '@/lib/api';
import { getSubdomainUrl, APP_DOMAIN } from '@/lib/config';
import Button from '@/components/ui/Button';
import { User as UserIcon, Mail, Phone, Globe, Camera, Save, AlertCircle, Check, ArrowRight } from 'lucide-react';

const ProfilePage = () => {
  const { user, checkAuth } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const requireSubdomain = searchParams.get('requireSubdomain') === 'true';

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
    phone: '',
    birthDate: '',
    profileImage: '',
  });
  
  const [userPortfolios, setUserPortfolios] = useState<any[]>([]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username || '',
        email: user.email || '',
        bio: user.bio || '',
        phone: user.phone || '',
        birthDate: user.birthDate ? new Date(user.birthDate).toISOString().split('T')[0] : '',
        profileImage: user.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      });
    }

    const fetchUserPortfolios = async () => {
      try {
        const res = await fetchApi('/portfolio/my');
        if (res && Array.isArray(res)) {
          setUserPortfolios(res);
        } else if (res && typeof res === 'object') {
          setUserPortfolios([res]);
        }
      } catch (err) {
        console.log('No portfolios found for user');
      }
    };

    fetchUserPortfolios();
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setGeneralError('');
    setSuccessMessage('');

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
      setGeneralError(err.message || 'Failed to update profile');
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
      {requireSubdomain && userPortfolios.length === 0 && (
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
                <label className="block text-sm font-semibold text-slate-300 mb-2">My Active Subdomains</label>
                <div className="space-y-3">
                  {userPortfolios.length > 0 ? (
                    userPortfolios.map((port: any) => (
                      <a 
                        key={port._id}
                        href={getSubdomainUrl(port.subdomain)} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="flex items-center justify-between p-3.5 rounded-2xl bg-[#0B0F19] border border-[#1E2336] group hover:border-[#5A4BFF]/50 transition-colors"
                      >
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-black text-[#5A4BFF] uppercase tracking-widest">
                            {port.templateId} Template
                          </span>
                          <span className="text-xs font-semibold text-slate-300 truncate mt-1">
                            {port.subdomain}.{APP_DOMAIN}
                          </span>
                        </div>
                        <ArrowRight size={14} className="text-[#5A4BFF] group-hover:translate-x-1 transition-transform shrink-0" />
                      </a>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 border border-dashed border-[#1E2336] p-5 rounded-2xl text-center">
                      No active subdomains yet. Choose a template to register one.
                    </div>
                  )}
                </div>
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
