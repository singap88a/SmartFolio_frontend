import React from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

interface PortfolioCardProps {
  id: string;
  name: string;
  username: string;
  updatedAt: string;
  subdomain?: string;
  templateId?: string;
  onDelete: (id: string) => void;
}

const PortfolioCard = ({ id, name, username, subdomain, updatedAt, templateId, onDelete }: PortfolioCardProps) => {
  const domain = subdomain ? `${subdomain}.localhost:3000` : `localhost:3000/${username}`;
  
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-bold dark:text-white mb-1">{name}</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">{subdomain ? `${subdomain}.portfolify.com` : `portfolify.me/${username}`}</p>
        </div>
        <div className="px-2 py-1 bg-green-50 text-green-600 text-xs font-semibold rounded border border-green-100 dark:bg-green-900/20 dark:border-green-800 dark:text-green-400">
          Published
        </div>
      </div>
      
      <div className="text-xs text-slate-400 dark:text-slate-500 mb-6">
        Last updated {updatedAt}
      </div>

      <div className="flex gap-2">
        <a href={`http://${domain}`} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" size="sm" className="w-full">View</Button>
        </a>
        <Link href={`/create?template=${templateId || 'developer'}`} className="flex-1">
          <Button variant="secondary" size="sm" className="w-full">Edit</Button>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          onClick={() => onDelete(id)}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </Button>
      </div>
    </div>
  );
};

export default PortfolioCard;
