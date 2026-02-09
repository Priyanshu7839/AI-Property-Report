import { useState } from 'react';
import { Mail, Linkedin, Facebook, Link2, Download, Share2, X, Check } from 'lucide-react';
import { Button } from './ui/button';

interface ShareReportProps {
  variant?: 'compact' | 'cta';
  propertyAddress?: string;
}

export function ShareReport({ variant = 'compact', propertyAddress,GeneratePDF }: ShareReportProps) {
  const [showMobileModal, setShowMobileModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `Check out my AI Property Report for ${propertyAddress || 'my property'}`;
  const shareText = `I just discovered hidden value in my home using AIPropertyReport.com! Get your free AI-powered property intelligence report.`;

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleEmailShare = () => {
    const subject = encodeURIComponent(shareTitle);
    const body = encodeURIComponent(`${shareText}\n\n${shareUrl}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
  };

  const handleFacebookShare = () => {
    const url = encodeURIComponent(shareUrl);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownloadPDF = () => {
    GeneratePDF()
  };

  const ShareButtons = () => (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
      {/* WhatsApp */}
      <button
        onClick={handleWhatsAppShare}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#F7F7F7] border border-black/[0.06] rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] text-[#6A6A6A] hover:text-black shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:border-black/[0.1]"
        title="Share on WhatsApp"
      >
        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="#25D366" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        <span className="hidden sm:inline">WhatsApp</span>
      </button>

      {/* Email */}
      <button
        onClick={handleEmailShare}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#F7F7F7] border border-black/[0.06] rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] text-[#6A6A6A] hover:text-black shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:border-black/[0.1]"
        title="Share via Email"
      >
        <Mail size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span className="hidden sm:inline">Email</span>
      </button>

      {/* LinkedIn */}
      <button
        onClick={handleLinkedInShare}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#F7F7F7] border border-black/[0.06] rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] text-[#6A6A6A] hover:text-black shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:border-black/[0.1]"
        title="Share on LinkedIn"
      >
        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="#0A66C2" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        <span className="hidden sm:inline">LinkedIn</span>
      </button>

      {/* Facebook */}
      <button
        onClick={handleFacebookShare}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#F7F7F7] border border-black/[0.06] rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] text-[#6A6A6A] hover:text-black shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:border-black/[0.1]"
        title="Share on Facebook"
      >
        <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="#1877F2" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
        <span className="hidden sm:inline">Facebook</span>
      </button>

      {/* Copy Link */}
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white hover:bg-[#F7F7F7] border border-black/[0.06] rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] text-[#6A6A6A] hover:text-black shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)] hover:border-black/[0.1]"
        title="Copy Link"
      >
        {copied ? (
          <>
            <Check size={16} className="sm:w-[18px] sm:h-[18px] text-[#18A36F]" />
            <span className="hidden sm:inline text-[#18A36F]">Copied!</span>
          </>
        ) : (
          <>
            <Link2 size={16} className="sm:w-[18px] sm:h-[18px]" />
            <span className="hidden sm:inline">Copy Link</span>
          </>
        )}
      </button>

      {/* Download PDF */}
      <button
        onClick={handleDownloadPDF}
        className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_4px_rgba(0,91,255,0.2)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_4px_8px_rgba(0,91,255,0.3)] hover:translate-y-[-1px]"
        title="Download PDF"
      >
        <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
        <span className="hidden sm:inline">Download PDF</span>
        <span className="sm:hidden">PDF</span>
      </button>
    </div>
  );

  if (variant === 'cta') {
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#005BFF] to-[#18A36F] rounded-2xl opacity-10 blur-xl"></div>
        <div className="relative bg-white border border-black/[0.06] rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.06)] overflow-hidden">
          <div className="px-6 sm:px-10 py-8 sm:py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-[#005BFF]/10 to-[#18A36F]/10 mb-6">
              <Share2 className="text-[#005BFF]" size={28} />
            </div>
            
            <h3 className="text-black text-[24px] sm:text-[28px] font-medium mb-3 tracking-tight">
              Share Your AI Wealth Report
            </h3>
            <p className="text-[#6A6A6A] text-[15px] sm:text-[17px] mb-8 max-w-lg mx-auto">
              Help your friends discover the financial power of their homes.
            </p>

            <div className="flex flex-col items-center gap-4">
              <ShareButtons />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop/Tablet Share Bar */}
      <div className="bg-white border border-black/[0.06] rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.04)] px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <h3 className="text-black text-[14px] sm:text-[15px] font-medium whitespace-nowrap">
            Share This Report
          </h3>
          <div className="flex-1">
            <ShareButtons />
          </div>
        </div>
        <p className="text-[#6A6A6A] text-[12px] mt-3">
          Sharing helps more homeowners understand the real financial power of their property.
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-black/[0.06] to-transparent"></div>

      {/* Mobile FAB (Floating Action Button) */}
      <div className="fixed bottom-6 left-6 z-40 lg:hidden">
        <button
          onClick={() => setShowMobileModal(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#005BFF] to-[#0066FF] text-white shadow-[0_8px_24px_rgba(0,91,255,0.4)] hover:shadow-[0_12px_32px_rgba(0,91,255,0.5)] hover:scale-105 transition-all duration-200 flex items-center justify-center"
          aria-label="Share Report"
        >
          <Share2 size={24} />
        </button>
      </div>

      {/* Mobile Share Modal */}
      {showMobileModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end lg:hidden">
          <div className="w-full bg-white rounded-t-3xl shadow-[0_-4px_24px_rgba(0,0,0,0.12)] animate-slide-up">
            <div className="px-6 py-5 border-b border-black/[0.06] flex items-center justify-between">
              <h3 className="text-black text-[17px] font-medium">Share Report</h3>
              <button
                onClick={() => setShowMobileModal(false)}
                className="w-8 h-8 rounded-full bg-[#F7F7F7] hover:bg-[#ECECEC] flex items-center justify-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="px-6 py-6">
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp */}
                <button
                  onClick={() => {
                    handleWhatsAppShare();
                    setShowMobileModal(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-[#F7F7F7] hover:bg-[#ECECEC] rounded-2xl transition-colors"
                >
                  <svg className="w-8 h-8" fill="#25D366" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  <span className="text-[13px] text-black">WhatsApp</span>
                </button>

                {/* Email */}
                <button
                  onClick={() => {
                    handleEmailShare();
                    setShowMobileModal(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-[#F7F7F7] hover:bg-[#ECECEC] rounded-2xl transition-colors"
                >
                  <Mail size={32} className="text-[#6A6A6A]" />
                  <span className="text-[13px] text-black">Email</span>
                </button>

                {/* LinkedIn */}
                <button
                  onClick={() => {
                    handleLinkedInShare();
                    setShowMobileModal(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-[#F7F7F7] hover:bg-[#ECECEC] rounded-2xl transition-colors"
                >
                  <svg className="w-8 h-8" fill="#0A66C2" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span className="text-[13px] text-black">LinkedIn</span>
                </button>

                {/* Facebook */}
                <button
                  onClick={() => {
                    handleFacebookShare();
                    setShowMobileModal(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-[#F7F7F7] hover:bg-[#ECECEC] rounded-2xl transition-colors"
                >
                  <svg className="w-8 h-8" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span className="text-[13px] text-black">Facebook</span>
                </button>

                {/* Copy Link */}
                <button
                  onClick={() => {
                    handleCopyLink();
                    setTimeout(() => setShowMobileModal(false), 1500);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-[#F7F7F7] hover:bg-[#ECECEC] rounded-2xl transition-colors"
                >
                  {copied ? (
                    <>
                      <Check size={32} className="text-[#18A36F]" />
                      <span className="text-[13px] text-[#18A36F]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Link2 size={32} className="text-[#6A6A6A]" />
                      <span className="text-[13px] text-black">Copy Link</span>
                    </>
                  )}
                </button>

                {/* Download PDF */}
                <button
                  onClick={() => {
                    handleDownloadPDF();
                    setShowMobileModal(false);
                  }}
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-[#005BFF] to-[#0047CC] rounded-2xl"
                >
                  <Download size={32} className="text-white" />
                  <span className="text-[13px] text-white font-medium">Download</span>
                </button>
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={() => setShowMobileModal(false)}
                className="w-full py-3 bg-[#F7F7F7] hover:bg-[#ECECEC] rounded-xl text-black text-[15px] font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}