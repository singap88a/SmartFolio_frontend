import React, { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { templates } from '../templates';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

// Custom Frame component to copy tailwind styles and render children inside iframe
const Frame = ({ children, className, style, device }: any) => {
  const [iframeDocument, setIframeDocument] = useState<Document | null>(null);
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);

  const handleRef = (iframe: HTMLIFrameElement | null) => {
    if (iframe && iframe.contentDocument) {
      setIframeDocument(iframe.contentDocument);
      setMountNode(iframe.contentDocument.body);
    }
  };

  useEffect(() => {
    if (!iframeDocument || !mountNode) return;
    const head = iframeDocument.head;

    if (head) {
      head.innerHTML = '';
      // Copy styles from main document to iframe document so tailwind styles load
      const hostStyles = document.querySelectorAll('style, link[rel="stylesheet"]');
      hostStyles.forEach((style) => {
        head.appendChild(style.cloneNode(true));
      });
    }

    if (mountNode) {
      mountNode.style.margin = '0';
      mountNode.style.padding = '0';
      mountNode.style.backgroundColor = '#0B0F19';
      mountNode.style.color = '#fff';
    }
  }, [iframeDocument, mountNode, device]);

  return (
    <iframe 
      title="preview" 
      ref={handleRef} 
      className={className} 
      style={style}
    >
      {mountNode && createPortal(children, mountNode)}
    </iframe>
  );
};

interface LivePreviewProps {
  templateId: string;
  data: any;
}

const LivePreview = ({ templateId, data }: LivePreviewProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [scale, setScale] = useState(1);

  const getDeviceWidth = () => {
    switch (device) {
      case 'desktop': return 1280;
      case 'tablet': return 820; // iPad Pro width
      case 'mobile': return 430;  // iPhone 16 Pro Max width
    }
  };

  const getDeviceHeight = () => {
    switch (device) {
      case 'desktop': return '100%';
      case 'tablet': return 1180; // iPad Pro height
      case 'mobile': return 932;  // iPhone 16 Pro Max height
    }
  };

  const deviceWidth = getDeviceWidth();
  const deviceHeight = getDeviceHeight();

  useEffect(() => {
    const updateScale = () => {
      if (containerRef.current) {
        const parentWidth = containerRef.current.offsetWidth - 64; // 32px padding each side
        const parentHeight = containerRef.current.offsetHeight - 64;
        
        const scaleX = parentWidth / deviceWidth;
        const scaleY = typeof deviceHeight === 'number' ? parentHeight / deviceHeight : 1;
        
        const scaleVal = Math.min(scaleX, scaleY, 1);
        setScale(scaleVal);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [device, deviceWidth, deviceHeight]);

  const renderTemplate = () => {
    const TemplateComponent = templates[templateId as keyof typeof templates] || templates.developer;
    return <TemplateComponent data={data} />;
  };

  return (
    <div className="w-full h-full bg-[#151926] rounded-2xl overflow-hidden border border-[#1E2336] shadow-2xl flex flex-col">
      
      {/* Device Controller Header */}
      <div className="bg-[#0F121E] border-b border-[#1E2336] px-4 py-3 flex items-center justify-between shrink-0">
        {/* Fake window buttons */}
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-400/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-400/80"></div>
        </div>

        {/* Device Switcher */}
        <div className="flex items-center bg-[#0B0F19] border border-[#1E2336] rounded-xl p-1 gap-1">
          <button 
            type="button"
            onClick={() => setDevice('desktop')}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
              device === 'desktop' ? 'bg-[#5A4BFF] text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Desktop Mode"
          >
            <Monitor size={18} />
          </button>
          
          <button 
            type="button"
            onClick={() => setDevice('tablet')}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
              device === 'tablet' ? 'bg-[#5A4BFF] text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Tablet Mode"
          >
            <Tablet size={18} />
          </button>
          
          <button 
            type="button"
            onClick={() => setDevice('mobile')}
            className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${
              device === 'mobile' ? 'bg-[#5A4BFF] text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
            title="Mobile Mode"
          >
            <Smartphone size={18} />
          </button>
        </div>

        {/* Active Badge */}
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-[#0B0F19] border border-[#1E2336] px-3 py-1.5 rounded-lg">
          {device} mode
        </div>
      </div>
      
      {/* Centered Device Canvas Area */}
      <div 
        className="flex-1 bg-slate-950 relative overflow-hidden p-8 flex items-center justify-center"
        ref={containerRef}
      >
        <div 
          className="absolute origin-center transition-all duration-300 flex items-center justify-center"
          style={{
            transform: `scale(${scale})`,
            width: `${deviceWidth}px`,
            height: typeof deviceHeight === 'number' ? `${deviceHeight}px` : `${100 / scale}%`,
          }}
        >
          {/* Mockup Shell Wrapper */}
          {device === 'mobile' ? (
            /* Photorealistic iPhone 16 Pro Max Mockup Shell */
            <div className="relative w-full h-full p-[12px] bg-gradient-to-tr from-[#15161c] via-[#333541] to-[#15161c] rounded-[56px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.15)] ring-[8px] ring-[#1F2026] ring-offset-2 ring-offset-[#0B0F19]">
              
              {/* Antenna Bands */}
              <div className="absolute top-28 -left-[8px] w-2 h-1 bg-[#1F2026]"></div>
              <div className="absolute bottom-28 -left-[8px] w-2 h-1 bg-[#1F2026]"></div>
              <div className="absolute top-28 -right-[8px] w-2 h-1 bg-[#1F2026]"></div>
              <div className="absolute bottom-28 -right-[8px] w-2 h-1 bg-[#1F2026]"></div>

              {/* Side Buttons (Action & Volume) */}
              <div className="absolute top-32 -left-[10px] w-[3px] h-9 bg-gradient-to-b from-[#333541] to-[#1f2026] rounded-l-md border-r border-[#15161c] shadow-md"></div>
              <div className="absolute top-[182px] -left-[10px] w-[3px] h-16 bg-gradient-to-b from-[#333541] to-[#1f2026] rounded-l-md border-r border-[#15161c] shadow-md"></div>
              <div className="absolute top-[262px] -left-[10px] w-[3px] h-16 bg-gradient-to-b from-[#333541] to-[#1f2026] rounded-l-md border-r border-[#15161c] shadow-md"></div>
              
              {/* Power / Siri Button & Camera Control (Right Side) */}
              <div className="absolute top-[182px] -right-[10px] w-[3px] h-20 bg-gradient-to-b from-[#333541] to-[#1f2026] rounded-r-md border-l border-[#15161c] shadow-md"></div>
              <div className="absolute top-[320px] -right-[9px] w-[2px] h-12 bg-[#2d2f39] rounded-r-sm border-l border-[#15161c] opacity-60"></div>
              
              {/* Dynamic Island Screen Hole */}
              <div className="absolute top-[24px] left-1/2 -translate-x-1/2 w-[110px] h-[30px] bg-black rounded-full z-30 flex items-center justify-end pr-5 shadow-[inset_0_1px_3px_rgba(255,255,255,0.1)]">
                {/* Camera Lens Reflection */}
                <div className="w-[11px] h-[11px] bg-[#0c0d13] rounded-full border border-[#22232a] flex items-center justify-center relative">
                  <div className="w-[4px] h-[4px] bg-[#1a3a5f] rounded-full opacity-60"></div>
                  <div className="absolute top-0.5 right-0.5 w-[2px] h-[2px] bg-white rounded-full opacity-40"></div>
                </div>
              </div>

              {/* Screen Bezel and Screen Display */}
              <div className="w-full h-full bg-[#0B0F19] rounded-[44px] overflow-hidden border-[4px] border-black relative shadow-[inset_0_0_10px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/[0.02] before:to-transparent before:z-20 before:pointer-events-none">
                <Frame 
                  className="w-full h-full border-0"
                  style={{ minHeight: '100%' }}
                  device={device}
                >
                  {renderTemplate()}
                </Frame>
              </div>
            </div>
          ) : device === 'tablet' ? (
            /* Photorealistic iPad Pro Mockup Shell */
            <div className="relative w-full h-full p-[18px] bg-gradient-to-tr from-[#15161c] via-[#333541] to-[#15161c] rounded-[36px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),inset_0_2px_4px_rgba(255,255,255,0.15)] ring-[8px] ring-[#1F2026] ring-offset-2 ring-offset-[#0B0F19]">
              
              {/* Top Camera Sensor */}
              <div className="absolute top-[7px] left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-30 flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]">
                <div className="w-1.5 h-1.5 bg-[#0e0f17] rounded-full flex items-center justify-center relative">
                  <div className="w-0.5 h-0.5 bg-[#122e4d] rounded-full"></div>
                </div>
              </div>
              
              {/* Volume Buttons (Right Side) */}
              <div className="absolute top-20 -right-[10px] w-[2px] h-12 bg-gradient-to-b from-[#333541] to-[#1f2026] rounded-r-sm"></div>
              <div className="absolute top-[140px] -right-[10px] w-[2px] h-12 bg-gradient-to-b from-[#333541] to-[#1f2026] rounded-r-sm"></div>
              
              {/* Screen Bezel and Screen Display */}
              <div className="w-full h-full bg-[#0B0F19] rounded-[20px] overflow-hidden border-[6px] border-black relative shadow-[inset_0_0_12px_rgba(0,0,0,0.8)] before:absolute before:inset-0 before:bg-gradient-to-tr before:from-transparent before:via-white/[0.015] before:to-transparent before:z-20 before:pointer-events-none">
                <Frame 
                  className="w-full h-full border-0"
                  style={{ minHeight: '100%' }}
                  device={device}
                >
                  {renderTemplate()}
                </Frame>
              </div>
            </div>
          ) : (
            /* Laptop / Desktop Preview (As-is) */
            <div className="w-full h-full bg-[#0B0F19] rounded-xl overflow-hidden shadow-lg border border-[#1E2336] relative">
              <Frame 
                className="w-full h-full border-0"
                style={{ minHeight: '100%' }}
                device={device}
              >
                {renderTemplate()}
              </Frame>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
