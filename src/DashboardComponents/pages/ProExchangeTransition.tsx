import { useState, useEffect } from 'react';
import { Save, FileText, ArrowRight, Mail, Building2, DollarSign, Shield, Calendar, Check, ChevronRight, Home, TrendingUp, Sparkles, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useSearchParams } from 'react-router';
import PexIcon from '../../assets/PexIcon.svg'


export function ProExchangeTransition() {
  const [screen, setScreen] = useState<'report' | 'transition-save' | 'transition-full' | 'auth' | 'dashboard' | 'full-report-input'>('report');
  const [transitionPath, setTransitionPath] = useState<'save' | 'full' | null>(null);
 
 
 

 
const [searchParams] = useSearchParams()
useEffect(()=>{
    
const path = searchParams.get('path')

setTransitionPath(path)
setScreen('transition-' + path as any);

},[])



  // SCREEN 2: Premium Transition Modal - Mobile Responsive
  const TransitionModal = () => {
    const isSaveFlow = transitionPath === 'save';
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6"
      >
        {/* Premium blurred background */}
        <motion.div
          initial={{ backdropFilter: 'blur(0px)', opacity: 0 }}
          animate={{ backdropFilter: 'blur(24px) saturate(180%)', opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(0,91,255,0.03) 0%, rgba(0,0,0,0.08) 100%)',
          }}
        />

        {/* Animated particles - fewer on mobile */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-br from-[#005BFF] to-[#18A36F] rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * window.innerHeight],
                opacity: [0, 0.6, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2 
              }}
            />
          ))}
        </div>

        {/* Ultra Premium Glass Modal - Mobile Optimized */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-[700px] w-full z-10"
        >
          {/* Outer glow */}
          <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-[#005BFF]/20 via-[#8B5CF6]/20 to-[#18A36F]/20 rounded-[32px] sm:rounded-[40px] lg:rounded-[48px] blur-2xl sm:blur-3xl opacity-60"></div>
          
          {/* Multi-layer glassmorphic card */}
          <div className="relative">
            {/* Border layer with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.6] via-white/[0.3] to-white/[0.6] rounded-[30px] sm:rounded-[38px] lg:rounded-[44px] p-[2px]">
              <div className="w-full h-full bg-gradient-to-br from-white/95 via-white/85 to-white/95 rounded-[28px] sm:rounded-[36px] lg:rounded-[42px]"></div>
            </div>
            
            {/* Content */}
            <div className="relative backdrop-blur-3xl rounded-[30px] sm:rounded-[38px] lg:rounded-[44px] p-8 sm:p-12 lg:p-16 shadow-[0_40px_120px_rgba(0,0,0,0.2)]">
              
              {/* Animated color transition bar */}
              <div className="relative h-1.5 sm:h-2 rounded-full mb-8 sm:mb-10 lg:mb-12 overflow-hidden bg-gradient-to-r from-[#F5F5F5] to-[#E5E5E5]">
                <motion.div
                  initial={{ width: '100%', x: '0%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 3, ease: 'easeInOut' }}
                  className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-[#1a1a1a] via-[#0a0a0a] to-[#000000] rounded-full shadow-lg"
                />
              </div>

              {/* Main Content */}
              <div className="text-center ">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-6 sm:mb-8"
                >
                  <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2 rounded-full bg-gradient-to-r from-[#0A0A0A] to-[#161718] border border-black/[0.06] ">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-[#F0B100] to-[#F0B100] animate-pulse"></div>
                    <span className="text-[11px] sm:text-[13px] font-medium text-[#F0B100] tracking-wide">TRANSITION IN PROGRESS</span>
                  </div>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-[24px] sm:text-[30px] lg:text-[38px] tracking-[-0.03em] font-[500] mb-2 sm:mb-3 lg:mb-3 leading-tight bg-gradient-to-br from-black via-[#1A1A1A] to-black bg-clip-text text-transparent px-2 capitalize"
                >
                  {isSaveFlow ? (
                    <h1 className='flex items-center justify-center flex-col'>
                        Save your report to your   dashboard
                        {/* <span className=' flex w-fit items-center justify-center gap-1'> <img src={PexIcon} alt=""  className='mt-1 w-5 h-5 sm:w-7 sm:h-7'/> ProExchange </span>  */}
                        
                    </h1>
                  ) : 'Unlock the full intelligence for this asset'}
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="text-[#6A6A6A] text-[14px] sm:text-[16px] lg:text-[17px] leading-relaxed mb-6 sm:mb-0 max-w-md mx-auto px-2 capitalize"
                >
                  {isSaveFlow 
                    ? 'Access it anytime, track changes, and build your asset profile.' 
                    : "We'll ask a few additional details to generate a comprehensive report inside ProExchange."}
                </motion.p>

                {/* ProExchange branding */}

              <div className='flex flex-col  items-center justify-center relative'>
                   <div className="text-black tracking-tight font-medium relative inline-flex items-baseline mb-6 text-[1.25em]">
            <span
            >AIPropertyReport</span>
            <span
              className="text-[#0285FF]"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                transform: "rotate(-4deg)",
                fontSize: "1.25em",
                opacity: 0.92,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginLeft: "1px",
                textShadow: "0.5px 0.5px 0 #0285FF, -0.3px 0.3px 0 #0285FF",
              }}
            >
              .com
            </span>
            {/* Hand-drawn underline */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "-2px",
                bottom: "-4px",
                width: "calc(100% + 4px)",
                height: "8px",
              }}
              viewBox="0 0 300 8"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 4 Q 75 5, 150 4 T 298 4"
                fill="none"
                stroke="#0285FF"
                strokeWidth="2.5"
                opacity="0.88"
                strokeLinecap="round"
              />
            </svg>
          </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.6 }}
                  className="flex items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 "
                >
                  <span className="text-[#9CA3AF] text-[13px] sm:text-[18px]">Powered by</span>
                  <div className="flex items-center gap-2 ">
                    {/* <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-black" /> */}
                    <img src={PexIcon} alt=""  className='h-8 w-8 mt-1'/>
                    <span className="font-[500] text-[14px] sm:text-[25px] bg-gradient-to-r from-black to-[#1A1A1A] bg-clip-text text-transparent">ProExchange</span>
                  </div>
                </motion.div>
              </div>

                {/* Premium CTA Button */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  whileTap={{ scale: 0.98 }}
                 
                  className="group relative w-full overflow-hidden rounded-xl sm:rounded-2xl active:scale-[0.98]"
                >
                  {/* Animated gradient background */}
                  <div className="absolute inset-0 bg-black"></div>
                  
                  {/* Button content */}
                  <div
                 onClick={()=>{

                    if(transitionPath === 'save')
                    {
                        window.location.href = 'https://proexchange.ai/Login'
                    }
                    else{
                        window.location.href = 'https://proexchange.ai/'
                    }
                    
                 }}
                  className="relative py-4 sm:py-5 px-8 sm:px-10 text-white text-[15px] sm:text-[17px] font-medium flex items-center justify-center gap-2 sm:gap-3 shadow-[0_0_40px_rgba(0,91,255,0.4)] group-hover:shadow-[0_0_60px_rgba(0,91,255,0.6)] transition-shadow">
                    Continue to ProExchange
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>

                {/* Reassuring microcopy */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="flex items-center justify-center gap-2 text-[#9CA3AF] text-[12px] sm:text-[14px] mt-4 sm:mt-6"
                >
                  {isSaveFlow ? (
                    <>
                      <Lock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>No payment required • Free forever</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>Takes ~2 minutes • Fully guided</span>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
        `}</style>
      </motion.div>
    );
  };

 

  return (
    <AnimatePresence mode="wait">
      
      {(screen === 'transition-save' || screen === 'transition-full') && <TransitionModal key="transition" />}
      
    </AnimatePresence>
  );
}
