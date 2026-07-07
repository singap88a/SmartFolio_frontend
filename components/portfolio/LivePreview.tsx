import React, { useRef, useEffect, useState } from 'react';
import DeveloperTemplate from '../templates/DeveloperTemplate';

interface LivePreviewProps {
  templateId: string;
  data: any;
}

const LivePreview = ({ templateId, data }: LivePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const DESKTOP_WIDTH = 1280;

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth;
        setScale(parentWidth / DESKTOP_WIDTH);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  const renderTemplate = () => {
    switch (templateId) {
      case 'developer':
        return <DeveloperTemplate data={data} />;
      default:
        return <DeveloperTemplate data={data} />;
    }
  };

  return (
    <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-inner flex flex-col">
      {/* Fake Mac Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center gap-2 shrink-0">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
          <div className="w-3 h-3 rounded-full bg-green-400"></div>
        </div>
        <div className="mx-auto text-[10px] font-medium text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <span>Live Preview</span>
          <span className="bg-indigo-100 text-indigo-600 dark:bg-indigo-900/50 dark:text-indigo-400 px-2 py-0.5 rounded-full text-[9px]">Desktop Mode</span>
        </div>
      </div>
      
      {/* Scaled Content Area */}
      <div className="flex-1 relative overflow-hidden bg-slate-900" ref={containerRef}>
        <div 
          className="absolute top-0 left-0 custom-scrollbar bg-slate-50 dark:bg-slate-950"
          style={{ 
            width: `${DESKTOP_WIDTH}px`,
            height: scale > 0 ? `${100 / scale}%` : '100%',
            transform: `scale(${scale})`,
            transformOrigin: 'top left',
            overflowY: 'auto',
            overflowX: 'hidden'
          }}
        >
          <div className="min-h-full">
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
