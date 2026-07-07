import React from 'react';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col lg:flex-row">
      <DashboardSidebar />
      <main className="flex-1 w-full lg:w-[calc(100%-16rem)]">
        {children}
      </main>
    </div>
  );
}
