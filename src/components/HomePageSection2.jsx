import React from 'react'
import Section2Img from '../assets/Section2Img.png'
import { BanknoteArrowUp, CircleCheckBig, HandCoins, TrendingUp } from 'lucide-react'

const HomePageSection2 = () => {


    const process = [
        {
            head:'AI Valuation & Equity Capacity',
            step:'Instant property valuation, usable equity range, and market-adjusted growth projection.'
        },
        {
            head:'Strategy Scenario Comparison',
            step:'Compare outcomes across: Do Nothing, Base Portfolio, Plus Portfolio, and Liam Pro Portfolio.'
        },
        {
            head:'Risk, Tax & Capital Impact — Modeled Upfront',
            step:'Projected returns, volatility bands, tax drag, and capital costs — transparently quantified before any decision.'
        },

    ]

    const feat = [
        {
            head:'CCPA Compliant',
            para:'100% data protection',
            svg:<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0013 25.6663C14.0013 25.6663 23.3346 20.9997 23.3346 13.9997V5.83301L14.0013 2.33301L4.66797 5.83301V13.9997C4.66797 20.9997 14.0013 25.6663 14.0013 25.6663Z" stroke="#00A63E" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 14.0003L12.8333 16.3337L17.5 11.667" stroke="#00A63E" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        },
        {
            head:'US Data Residency',
            para:'No data in third countries',
            svg:<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M23.332 2.33301H4.66536C3.3767 2.33301 2.33203 3.37768 2.33203 4.66634V9.33301C2.33203 10.6217 3.3767 11.6663 4.66536 11.6663H23.332C24.6207 11.6663 25.6654 10.6217 25.6654 9.33301V4.66634C25.6654 3.37768 24.6207 2.33301 23.332 2.33301Z" stroke="#155DFC" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M23.332 16.333H4.66536C3.3767 16.333 2.33203 17.3777 2.33203 18.6663V23.333C2.33203 24.6217 3.3767 25.6663 4.66536 25.6663H23.332C24.6207 25.6663 25.6654 24.6217 25.6654 23.333V18.6663C25.6654 17.3777 24.6207 16.333 23.332 16.333Z" stroke="#155DFC" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 7H7.01167" stroke="#155DFC" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 21H7.01167" stroke="#155DFC" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        },
        {
            head:'End-to-End Encryption',
            para:'Secure transmission',
            svg:<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M22.1667 12.833H5.83333C4.54467 12.833 3.5 13.8777 3.5 15.1663V23.333C3.5 24.6217 4.54467 25.6663 5.83333 25.6663H22.1667C23.4553 25.6663 24.5 24.6217 24.5 23.333V15.1663C24.5 13.8777 23.4553 12.833 22.1667 12.833Z" stroke="#4A5565" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8.16797 12.833V8.16634C8.16797 6.61924 8.78255 5.13551 9.87651 4.04155C10.9705 2.94759 12.4542 2.33301 14.0013 2.33301C15.5484 2.33301 17.0321 2.94759 18.1261 4.04155C19.2201 5.13551 19.8346 6.61924 19.8346 8.16634V12.833" stroke="#4A5565" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


        },
        {
            head:'SOC-2 aligned security controls',
            para:'Regular audits',
            svg:<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.0013 24.5L4.66797 19.25V8.75L14.0013 3.5L23.3346 8.75V19.25L14.0013 24.5Z" stroke="#155DFC" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M10.5 14.0003L12.8333 16.3337L17.5 11.667" stroke="#155DFC" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

        }
    ]


  return (
    <div className='max-w-9xl bg-white/60 pt-5 pb-10 flex flex-col gap-14 items-center justify-center  '>

            <div className='w-[100%] sm:w-[80%]    flex flex-col gap-8 xl:flex-row sm:gap-0 items-center justify-between md:px-2 px-3 sm:p-0'>
                <div className='w-full   xl:w-[50%] relative mb-10 sm:mb-30 '>
                    <img src={Section2Img} alt="" className='max-sm:w-[95%] md:w-[70%] xl:w-[85%] h-full'/>


                    <div className='max-sm:w-[171px] w-fit flex flex-col gap-1 md:gap-2 md:p-2 p-1 rounded-[6.32px] bg-white/50  border-[#E5E7EB] border backdrop-blur-[7.9px]  text-[#000] absolute z-[99] xl:top-10 xl:left-35 top-5 left-36'>
                            <div className='text-[6.39px] md:text-[9.49px] flex items-center  gap-4 md:gap-10 justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='p-1 rounded-sm bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center'>
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.5391 6.58691L11.9549 7.01164C12.8594 7.28302 13.3116 7.41871 13.5721 7.76874C13.8325 8.11877 13.8325 8.59099 13.8325 9.53529V14.4912" stroke="#fff" stroke-linejoin="round"/>
<path d="M5.26953 5.92773H7.24561M5.26953 8.56251H7.24561" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7.90284 14.4917V12.5156C7.90284 11.8946 7.90284 11.5841 7.70991 11.3912C7.51698 11.1982 7.20647 11.1982 6.58546 11.1982H5.92676C5.30574 11.1982 4.99523 11.1982 4.8023 11.3912C4.60938 11.5841 4.60938 11.8946 4.60938 12.5156V14.4917" stroke="#fff" stroke-linejoin="round"/>
<path d="M1.31641 14.4912H14.4903" stroke="#fff" stroke-linecap="round"/>
<path d="M1.97656 14.4913V4.4246C1.97656 2.77079 1.97656 1.94388 2.49771 1.53359C3.01886 1.12331 3.78627 1.34607 5.32109 1.79158L8.61455 2.74755C9.54074 3.0164 10.0039 3.15082 10.2717 3.51719C10.5396 3.88357 10.5396 4.38258 10.5396 5.38058V14.4913" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                                    </div>
                                    <h1 className='font-medium'>Property:</h1>
                                </div>
                                <h1 className='font-bold'>89, San Jose</h1>
                            </div>
                            <div className='h-[1px] w-full bg-[#000]/40'/>

                            <div className='text-[6.39px] md:text-[9.49px] flex items-center justify-between gap-4 md:gap-10'>
                                <div className='flex items-center gap-2'>
                                    <div className='p-1 rounded-sm bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center text-[15px] text-[#fff]'>
                                        $
                                    </div>
                                    <h1 className='font-medium'>Unlockable Equity:</h1>
                                </div>
                                <h1 className='font-bold text-[8.52px] md:text-[12.56px]'>$652000</h1>
                            </div>
                    </div>
                    {/* -------------------------------------------------------------------------------------- */}
                    {/* -------------------------------------------------------------------------------------- */}
                    <div className='max-sm:w-[171px] w-fit flex flex-col gap-1 md:gap-2 md:p-2 p-1 rounded-[6.32px] bg-white/50  border-[#E5E7EB] border backdrop-blur-[7.9px]  text-[#000] text-[6.39px] md:text-[9.49px] absolute z-[99] xl:top-35  xl:left-41 top-21 left-40 '>

                            <div className='flex items-center gap-4 md:gap-10 justify-between max-sm:hidden'>
                                <div className='flex items-center gap-2'>
                                     <div className='p-1 rounded-sm bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center'>
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" fill="#fff"><path d="M528 288.1C572.2 288.1 608 323.9 608 368.1L608 418.7C626.6 425.3 640 443.1 640 464L640 560C640 586.5 618.5 608 592 608L464 608C437.5 608 416 586.5 416 560L416 464C416 443.1 429.4 425.3 448 418.7L448 368.1C448 323.9 483.8 288.1 528 288.1zM268.6 70.5C280.8 61.2 298.3 61.8 309.8 72.5L494.8 244.3C440.2 259 400 308.8 400 368L400 392.4C380.4 410 368 435.5 368 463.9L368 559.9C368 565.4 368.5 570.8 369.3 576L144 576C108.7 576 80 547.3 80 512L80 336L64 336C50.8 336 39 327.9 34.2 315.7C29.4 303.5 32.6 289.5 42.2 280.6L266.2 72.6L268.6 70.6zM272 384C245.5 384 224 405.5 224 432L224 528L320 528L320 440.7C320 424.2 327 409.2 338.4 398.6C329.7 389.6 317.5 384 304 384L272 384zM528 336.1C510.3 336.1 496 350.4 496 368.1L496 416L560 416L560 368.1C560 350.4 545.7 336.1 528 336.1z"/></svg>

                                    </div>
                                    <div className='flex flex-col gap-1 items-start'>
                                         <h1 className='font-medium'>Do Nothing <span className='max-sm:hidden'>-Keep Equity Idle</span></h1>
                                         <h1 className='font-semibold text-gray-500'>Equity Remains Locked <span className='max-sm:hidden'>In Home.</span></h1>
                                    </div>
                                </div>
                                <div className='text-black  flex flex-col items-end gap-1'>
                                    <CircleCheckBig size={12}/>
                                    <span className='py-[3.2px] md:py-[4.74px] px-[6.39px] md:px-[9.49px] font-medium max-md:text-[5.33px] rounded-[3.16px] bg-gray-300 '>
                                       <span className='max-sm:hidden'>Property</span>  Market
                                    </span>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-[#000]/40 max-sm:hidden'/>
                              <div className='flex items-center gap-4 md:gap-10 justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='p-1 rounded-sm  bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center'>
                                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8346 4.27637L7.8763 9.2347L4.95964 6.31803L1.16797 10.1097"
                              stroke="#fff"
                              stroke-width="1.16667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.33203 4.27637H12.832V7.77637"
                              stroke="#fff"
                              stroke-width="1.16667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>

                                    </div>
                                    <div className='flex flex-col gap-1 items-start'>
                                         <h1 className='font-medium'>  <span className='max-sm:hidden'>Unlock Equity - </span>LIAM Basic</h1>
                                         <h1 className='font-semibold text-[#387bf8]'>Equity Unlocked<span className='max-sm:hidden'>Via Optimized Structure</span></h1>
                                    </div>
                                </div>
                                <div className='text-[#387bf8] flex flex-col items-end gap-1'>
                                    <CircleCheckBig size={12}/>
                                    <span className='py-[3.2px] md:py-[4.74px] px-[6.39px] md:px-[9.49px] font-medium max-md:text-[5.33px] rounded-[3.16px] bg-[#E8F1FE] whitespace-nowrap'>
                                  Cash Preservation
                                    </span>
                                </div>
                            </div>

                            <div className='h-[1px] w-full bg-[#000]/40'/>
 <div className='flex items-center gap-4 md:gap-10 justify-between'>
                                <div className='flex items-center gap-2'>
                                  <div className='p-1 rounded-sm bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center text-white'>
                                       <BanknoteArrowUp />

                                    </div>
                                    <div className='flex flex-col gap-1 items-start'>
                                         <h1 className='font-medium'> <span className='max-sm:hidden'>Equity Unlock - </span> Plus Portfolio</h1>
                                         <h1 className='font-semibold text-[#3BA263]'><span className='max-sm:hidden'>Add</span> Controlled Crypto Exposure</h1>
                                    </div>
                                </div>
                                <div className='text-[#3BA263] flex flex-col items-end gap-1'>
                                    <CircleCheckBig size={12}/>
                                    <span className='py-[3.2px] md:py-[4.74px] px-[6.39px] md:px-[9.49px] font-medium rounded-[3.16px] max-md:text-[5.33px] bg-[#E9FBF3] '>
                                        Balanced
                                    </span>
                                </div>
                            </div>
                            <div className='h-[1px] w-full bg-[#000]/40'/>
 <div className='flex items-center gap-4 md:gap-10 justify-between'>
                                <div className='flex items-center gap-2'>
                                    <div className='p-1 rounded-sm bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center text-white relative'>
                                       <div>
                                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.6377 10.8685C2.6377 11.9599 3.52243 12.8446 4.61378 12.8446C4.61378 13.7541 5.35105 14.4914 6.26052 14.4914C7.16998 14.4914 7.90725 13.7541 7.90725 12.8446C7.90725 13.7541 8.64453 14.4913 9.55399 14.4913C10.4634 14.4913 11.2007 13.754 11.2007 12.8446C12.2921 12.8446 13.1768 11.9598 13.1768 10.8685C13.1768 10.4939 13.0726 10.1436 12.8916 9.84519C13.8043 9.67057 14.4942 8.86802 14.4942 7.90435C14.4942 6.94061 13.8043 6.13807 12.8916 5.96347C13.0726 5.665 13.1768 5.31477 13.1768 4.9402C13.1768 3.84884 12.2921 2.96412 11.2007 2.96412C11.2007 2.05465 10.4634 1.31738 9.55399 1.31738C8.64453 1.31738 7.90725 2.05471 7.90725 2.96418C7.90725 2.05471 7.16998 1.31744 6.26052 1.31744C5.35105 1.31744 4.61378 2.05471 4.61378 2.96418C3.52243 2.96418 2.6377 3.8489 2.6377 4.94026C2.6377 5.31483 2.74192 5.66507 2.92294 5.96354C2.01014 6.13813 1.32031 6.94068 1.32031 7.90442C1.32031 8.86808 2.01014 9.67064 2.92294 9.84526C2.74192 10.1437 2.6377 10.4939 2.6377 10.8685Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.94141 9.55081L6.15465 5.91108C6.21684 5.72449 6.39146 5.59863 6.58814 5.59863C6.78483 5.59863 6.95945 5.72449 7.02163 5.91108L8.23488 9.55081M10.211 5.59863V9.55081M5.6001 8.23342H7.57618" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
                                       </div>
<TrendingUp  className='absolute top-0 right-1' size={10}/>
                                    </div>
                                    <div className='flex flex-col gap-1 items-start'>
                                         <h1 className='font-medium'>LIAM Pro <span className='max-sm:hidden'> - AI Growth Portfolio</span></h1>
                                         <h1 className='font-semibold text-[#FF6F00]'>AI Optimized Allocation</h1>
                                    </div>
                                </div>
                                <div className='text-[#FF6F00] flex flex-col items-end gap-1'>
                                    <CircleCheckBig size={12}/>
                                    <span className='py-[3.2px] md:py-[4.74px] px-[6.39px] md:px-[9.49px] rounded-[3.16px] max-md:text-[5.33px]  font-medium bg-[#FDF5EA] '>
                                       <span className='max-sm:hidden'>Return</span>Focused
                                    </span>
                                </div>
                            </div>


                    </div>
                    {/* -------------------------------------------------------------------------------------- */}
                    {/* -------------------------------------------------------------------------------------- */}
                      <div className='max-sm:w-[171px] w-fit flex items-start gap-2 md:p-2 p-1 rounded-[6.32px] bg-white/50 border-[#E5E7EB] border backdrop-blur-[7.9px]  text-[#000] text-[6.39px]  md:text-[9.49px] absolute xl:-top-5 xl:left-24 top-53 left-46'>
 <div className='p-1 rounded-sm bg-black shadow-sm shadow-black w-[20px] h-[20px] md:w-[29px] md:h-[29px] flex items-center justify-center'>
                                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.6377 10.8685C2.6377 11.9599 3.52243 12.8446 4.61378 12.8446C4.61378 13.7541 5.35105 14.4914 6.26052 14.4914C7.16998 14.4914 7.90725 13.7541 7.90725 12.8446C7.90725 13.7541 8.64453 14.4913 9.55399 14.4913C10.4634 14.4913 11.2007 13.754 11.2007 12.8446C12.2921 12.8446 13.1768 11.9598 13.1768 10.8685C13.1768 10.4939 13.0726 10.1436 12.8916 9.84519C13.8043 9.67057 14.4942 8.86802 14.4942 7.90435C14.4942 6.94061 13.8043 6.13807 12.8916 5.96347C13.0726 5.665 13.1768 5.31477 13.1768 4.9402C13.1768 3.84884 12.2921 2.96412 11.2007 2.96412C11.2007 2.05465 10.4634 1.31738 9.55399 1.31738C8.64453 1.31738 7.90725 2.05471 7.90725 2.96418C7.90725 2.05471 7.16998 1.31744 6.26052 1.31744C5.35105 1.31744 4.61378 2.05471 4.61378 2.96418C3.52243 2.96418 2.6377 3.8489 2.6377 4.94026C2.6377 5.31483 2.74192 5.66507 2.92294 5.96354C2.01014 6.13813 1.32031 6.94068 1.32031 7.90442C1.32031 8.86808 2.01014 9.67064 2.92294 9.84526C2.74192 10.1437 2.6377 10.4939 2.6377 10.8685Z" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4.94141 9.55081L6.15465 5.91108C6.21684 5.72449 6.39146 5.59863 6.58814 5.59863C6.78483 5.59863 6.95945 5.72449 7.02163 5.91108L8.23488 9.55081M10.211 5.59863V9.55081M5.6001 8.23342H7.57618" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"/>
</svg>


                                    </div>
                              <div className='flex flex-col gap-1'>
                                  <h1 className='font-medium'>
                                    Powered by LIAM-AI
                                </h1>
                                <p>
                                    Trained on: Public Records,MLS,CoreLogic
                                </p>
                              </div>
                                
                    </div>

                </div>

                <div className='w-full xl:w-[50%] flex flex-col gap-4 px-2'>
                  <div className='flex flex-col gap-2'>
                      <span className='text-[16px] text-[#000000]'>AI Property Intelligence</span>
                    <h1 className='font-bold sm:text-[30px] text-[16px] text-[#101828] capitalize'>
                        Turn Home Equity Into Structured Financial Insight
                    </h1>
                    <p className='text-[#000000] sm:text-[14px] text-[11px]'>AIPropertyReport analyzes your property value, accessible equity, and forward appreciation signals — then models data-driven strategy scenarios in one unified report.</p>
                  </div>

                  {
                    process.map((item)=>{
                        return(
                            <div key={item.head} className=' flex flex-col gap-1 bg-gradient-to-br from-white to-gray-200 backdrop-blur-[50px] border-[#E5E7EB] border p-3 rounded-lg'>
                                <h1 className='font-bold text-[14px] text-[#000000]'>{item.head}</h1>
                                <p className='sm:text-[12px] text-[11px] text-[#000000]'>{item.step}</p>
                            </div>
                        )
                    })
                  }


                </div>
            </div>

            <div className='w-[90%] sm:w-[80%] flex items-center justify-between gap-8 overflow-scroll' style={{scrollbarWidth:'none'}}>
                    {
                        feat.map((feat,i)=>{
                            return(
                                <div className=' flex items-center gap-2 shrink-0' key={i}>
                                    {feat.svg}
                                   <div className='flex flex-col items-center justify-center'>
                                     <h1 className='text-[#1E2939] text-[12px] sm:text-[14px] font-bold'>{feat.head}</h1>
                                    <p className='text-[10px] sm:text-[12px] text-[#6A7282]'>{feat.para}</p>
                                   </div>
                                </div>
                            )
                        })
                    }
            </div>
    </div>
  )
}

export default HomePageSection2