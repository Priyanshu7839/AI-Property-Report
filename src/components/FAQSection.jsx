import { Plus } from "lucide-react";
import React,{useState,useEffect} from "react";
import FaqSectionImg1 from '../assets/FaqSectionImg1.png'
import FaqSectionImg2 from '../assets/FaqSectionImg2.jpeg'


const FAQSection = () => {
  const qna = [
    {
      ques: "What is “Do Nothing Equity”?",
      ans:'Do Nothing Equity is a baseline scenario that models outcomes if you keep your home equity untouched. It helps you compare projected property growth, inflation impact, and opportunity cost against alternative equity deployment strategies.'
    },
    {
      ques: "What is Unlock Equity — LIAM Basic?",
      ans:'LIAM Basic models a conservative equity unlock strategy designed for capital efficiency and liquidity preservation. It evaluates structured borrowing and allocation with lower volatility targets and controlled exposure.'
    },
    {
      ques: "What is LIAM Plus Portfolio?",
      ans:'LIAM Plus is a balanced strategy model that combines diversified market exposure with measured growth assets. It increases projected return potential while maintaining defined risk bands through portfolio mix optimization.'
    },
    {
      ques: "What is LIAM Pro Strategy?",
      ans:'LIAM Pro is a growth-oriented modeled allocation designed for higher return targets. It includes broader market and alternative asset exposure with higher volatility tolerance and AI-optimized allocation weighting.'
    },
    {
      ques: `What is Equity Capacity?`,
      ans:'Equity Capacity is the estimated usable portion of your home equity after modeled loan-to-value thresholds, market buffers, and capital safety margins are applied.'
    },
    // {
    //     ques:'What is Scenario Comparison?',
    //     ans:'Scenario Comparison shows projected outcomes across multiple strategy paths — including hold, conservative deploy, balanced deploy, and growth deploy — under standardized modeling assumptions.'
    // }
  ];


  const [showans,setShowAns] = useState(0)

  
  

  return (
    <div className="max-w-9xl flex items-center justify-center  mb-10 ">
      <div className="w-[90%] bg-[#FFFFFF4D] shadow-sm shadow-[#99A1AF40] sm:w-[80%] py-10  backdrop-blur-[50px] drop-shadow-[0px_4px_50px_12px_#99A1AF40] p-[45px] flex flex-col gap-6 rounded-xl border border-[#E5E7EB]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="sm:text-[30px] text-[16px] text-[#000000] font-bold">
            Frequently Asked Questions
          </h1>
          <p className="sm:text-[16px] text-[12px] text-[#4A5565]">
            Can't find the answer you're looking for? Feel free to contact our
            support team.
          </p>
        </div>

        <div className="flex items-stretch justify-between gap-5 h-full flex-col sm:flex-row">
          <div className="sm:w-[50%] w-full  flex flex-col gap-2">
            <img src={FaqSectionImg2} alt="" className="object-cover  sm:h-[214px] w-full h-[166px] rounded-md" />
            <div className="w-full h-full flex gap-2">
              <div className="w-full h-full   rounded-lg overflow-hidden">
                <img src={FaqSectionImg1} alt="" className="object-cover sm:h-[216px] w-full h-[165.16px]" />
              </div>

              <div className="w-full   rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-4 flex flex-col items-start justify-center">
                <h1 className="font-black sm:text-[35.97px] text-[27.5px] text-[#1A1A1A]">
                  5000+
                </h1>
                <h1 className="text-[#1A1A1A] sm:text-[14px] text-[10.7px] font-bold">
                  House Owners
                </h1>
                <p className="font-medium sm:text-[10px] text-[7.65px] text-[#1A1A1A]">
                  Unlocked The True Potential Of Their Properties With Us.
                </p>

                <div className="w-full flex justify-end ">
                  <svg
                    width="33"
                    height="33"
                    viewBox="0 0 33 33"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31.7591"
                      height="31.7591"
                      rx="15.8796"
                      fill="white"
                    />
                    <rect
                      x="0.5"
                      y="0.5"
                      width="31.7591"
                      height="31.7591"
                      rx="15.8796"
                      stroke="black"
                    />
                    <g clip-path="url(#clip0_52_575)">
                      <path
                        d="M12.0156 15.6085H19.7305L16.7763 12.7955C16.6217 12.6482 16.6157 12.4035 16.763 12.2488C16.9102 12.0944 17.1549 12.0882 17.3098 12.2355L20.6836 15.4482C20.8295 15.5943 20.9102 15.7884 20.9102 15.9951C20.9102 16.2015 20.8295 16.3958 20.6768 16.5483L17.3096 19.7544C17.2348 19.8257 17.1389 19.8611 17.043 19.8611C16.9409 19.8611 16.8388 19.8209 16.7628 19.7411C16.6155 19.5865 16.6215 19.3419 16.7762 19.1946L19.7427 16.3817H12.0156C11.8022 16.3817 11.6289 16.2085 11.6289 15.9951C11.6289 15.7817 11.8022 15.6085 12.0156 15.6085Z"
                        fill="#1A1A1A"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_52_575">
                        <rect
                          width="9.63504"
                          height="8.24759"
                          fill="white"
                          transform="translate(11.4531 11.8711)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div className="sm:w-[50%] w-full  flex flex-col  gap-4 justify-center">
            {qna.map((qna, i) => {
              return (
                <div
                  key={i}
                  onClick={()=>{
                   i===showans ? setShowAns(-1) : setShowAns(i)
                  }}
                  className={`sm:text-[14px] text-[12px] font-bold  flex items-center justify-between border  drop-shadow-[0px_0.5px_2px_0px_#19213D1A] p-5 rounded-lg  flex-col gap-3 cursor-pointer
                    ${showans===i ? 'bg-[#000000] text-white':'border-[#E5E7EB] bg-[#FFFFFF33] text-[#000000]'}
                    `}
                >
                  <div className='flex items-center w-full justify-between'>
                    {qna.ques}
                 <span className={` ${showans===i&&'rotate-45'}`}> <Plus size={15} /></span>
                  </div>
                {i===showans &&
                  <span className='text-[12px] font-normal'>
                    {qna.ans}
                  </span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQSection;
