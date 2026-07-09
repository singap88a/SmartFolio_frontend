import React from 'react';
import Button from '../ui/Button';
import { Check } from 'lucide-react';

interface TemplateCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  selected?: boolean;
  onSelect: (id: string) => void;
}

const TemplateCard = ({ id, name, description, image, selected, onSelect }: TemplateCardProps) => {
  const images = {
    developer: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    creative: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
    professional: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
  };

  return (
    <div className={`group bg-[#0F121E] border-2 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#5A4BFF] transition-all duration-500 hover:-translate-y-2 relative ${
      selected ? 'border-[#5A4BFF] shadow-[0_0_20px_rgba(90,75,255,0.1)]' : 'border-[#1E2336]'
    }`}>
      
      {/* Selected Badge */}
      {selected && (
        <div className="absolute top-4 left-4 z-20 bg-[#5A4BFF] text-white p-2 rounded-full shadow-lg flex items-center justify-center">
          <Check size={16} strokeWidth={3} />
        </div>
      )}

      <div className="aspect-[4/3] bg-slate-800 relative overflow-hidden">
        <img 
          src={images[id as keyof typeof images] || image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-[#0F121E]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <Button 
            className={`scale-90 group-hover:scale-100 transition-transform duration-300 border-0 ${
              selected ? 'bg-[#1E2336] text-slate-400 cursor-not-allowed' : 'bg-[#5A4BFF] text-white hover:bg-[#4B3DE6]'
            }`}
            onClick={() => !selected && onSelect(id)}
            disabled={selected}
          >
            {selected ? 'Already Selected' : 'Preview Design'}
          </Button>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-2xl font-black text-white tracking-tight">{name}</h3>
          {selected && (
            <span className="text-[10px] font-black tracking-widest uppercase bg-[#5A4BFF]/20 text-[#5A4BFF] px-2.5 py-1 rounded-md">
              Active
            </span>
          )}
        </div>
        <p className="text-slate-400 text-sm leading-relaxed mb-8 h-12 overflow-hidden">
          {description}
        </p>
        <Button 
          className={`w-full h-12 font-black uppercase tracking-widest text-xs border transition-colors ${
            selected 
              ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400 cursor-not-allowed' 
              : 'border-[#1E2336] bg-transparent text-white hover:bg-[#1E2336]'
          }`}
          onClick={() => !selected && onSelect(id)}
          disabled={selected}
        >
          {selected ? 'Already Selected' : 'Review Design'}
        </Button>
      </div>
    </div>
  );
};

export default TemplateCard;
