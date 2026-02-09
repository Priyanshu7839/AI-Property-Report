import { Info } from 'lucide-react';
import { useState } from 'react';

interface InfoTooltipProps {
  content: string;
}

export function InfoTooltip({ content }: InfoTooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-[#fff]/10 text-[#fFF] hover:bg-[#fff]/20 transition-colors touch-manipulation"
        aria-label="More information"
      >
        <Info size={12} />
      </button>
      
      {isVisible && (
        <>
          {/* Mobile: Full width bottom sheet style */}
          <div className="fixed sm:hidden bottom-0 left-0 right-0 z-50 animate-slide-up">
            <div className="bg-black text-white text-[12px] p-4 rounded-t-2xl shadow-2xl">
              {content}
              <button 
                onClick={() => setIsVisible(false)}
                className="mt-3 w-full py-2 bg-white/20 rounded-lg text-[11px] font-medium"
              >
                Got it
              </button>
            </div>
            <div 
              className="fixed inset-0 bg-black/50 -z-10"
              onClick={() => setIsVisible(false)}
            />
          </div>
          
          {/* Desktop: Tooltip */}
          <div className="hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-64">
            <div className="bg-black text-white text-[11px] p-3 rounded-lg shadow-xl">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-black rotate-45"></div>
              {content}
            </div>
          </div>
        </>
      )}
    </div>
  );
}