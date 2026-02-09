import { AlertCircle, X, Building2, Home } from 'lucide-react';
import { Button } from './ui/button';

interface CommercialErrorPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommercialErrorPopup({ isOpen, onClose }: CommercialErrorPopupProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md">
        <div className="relative group">
          {/* Glow Effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/40 via-blue-500/40 to-purple-500/40 rounded-2xl opacity-75 blur-xl animate-pulse"></div>
          
          {/* Main Card */}
          <div className="relative bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] overflow-hidden">
            {/* Header with gradient */}
            <div className="relative px-6 pt-8 pb-6 bg-gradient-to-br from-purple-50 via-white to-blue-50">
              <div className="absolute top-4 right-4">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                  aria-label="Close"
                >
                  <X size={20} className="text-[#6A6A6A]" />
                </button>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-50"></div>
                  <div className="relative p-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500">
                    <Building2 className="text-white" size={32} />
                  </div>
                </div>
              </div>

              {/* Title */}
              <h2 className="text-black text-[22px] sm:text-[24px] font-medium text-center mb-2">
                Commercial Property Detected
              </h2>
            </div>

            {/* Content */}
            <div className="px-6 pb-6">
              <div className="mb-6">
                <p className="text-[#6A6A6A] text-[14px] sm:text-[15px] text-center leading-relaxed mb-4">
                  The property you have selected seems to be commercial or mixed-use. Please select a different residential property.
                </p>

                {/* Info Cards */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-50 to-white border border-purple-500/30">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 mt-0.5">
                        <Building2 className="text-purple-600" size={16} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-black text-[13px] font-medium mb-1">
                          This Property Type
                        </h3>
                        <p className="text-[#6A6A6A] text-[12px] leading-relaxed">
                          Commercial or mixed-use properties are not currently supported
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-gradient-to-br from-[#005BFF]/5 to-white border border-[#005BFF]/20">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-[#005BFF]/10 mt-0.5">
                        <Home className="text-[#005BFF]" size={16} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-black text-[13px] font-medium mb-1">
                          Residential Only
                        </h3>
                        <p className="text-[#6A6A6A] text-[12px] leading-relaxed">
                          Our analysis is designed for single-family homes, condos, and townhouses
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="space-y-3">
                <Button 
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#005BFF] to-[#0066FF] text-white hover:opacity-90 px-6 py-3 rounded-xl text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Select Residential Property
                </Button>
                
                <p className="text-[#6A6A6A] text-[11px] text-center">
                  Commercial property analysis may be available in future updates
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
