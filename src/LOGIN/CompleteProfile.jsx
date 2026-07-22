import { BarChart2, Building2, CheckSquare, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, FileText, House, Key, Map, Search, Target, TrendingUp, User, UserPen, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { motion } from "motion/react";
import AustinImg from '../assets/Austin.png'
import { completeProfileApi } from "../../Apicall";

const CompleteProfile = () => {

    const navigate = useNavigate()

  const [step, setStep] = useState(1);



  const [selectedBuyerType,setselectedBuyerType] = useState('')


 


 






    const UserType = [
        {
            icon:<House/>,
            head:'Homeowner',
            desc:'I own a property'
        },
        {
            icon:<BarChart2/>,
            head:'Investor',
            desc:'I invest in real estate'
        },
        {
            icon:<Key/>,
            head:'First-Time Buyer',
            desc:`I'm planning to buy my first property`
        },
        {
            icon:<User/>,
            head:'Agent',
            desc:'I help clients buy or sell properties'
        },
        {
            icon:<Building2/>,
            head:'Property Manager',
            desc:'I manage properties'
        },
    ]
    const achieveType = [
        {
            icon:<TrendingUp/>,
            head:'Build Wealth',
            desc:'Grow my long-term wealth',
            bg:'#F1F9F3',
            text:'#026D1D'
        },
        {
            icon:<FileText/>,
            head:'Analyze Properties',
            desc:'Get AI insights on properties',
            bg:'#F0F9F2',
            text:'#05851E'
        },
        {
            icon:<Target/>,
            head:'Find Opportunities',
            desc:`Discover high-potential deals`,
             bg:'#FEF6EF',
            text:'#FF880E'
        },
        {
            icon:<User/>,
            head:'Generate Passive Income',
            desc:'Earn rental income',
             bg:'#F6F2FD',
            text:'#8B56DF'
        },
        {
            icon:<Building2/>,
            head:'Buy My Next Property',
            desc:'Find and buy my next home',
             bg:'#F1F8FD',
            text:'#0F79FE'
        },
    ]


  const [achievementType,setachievementType] = useState([])
const toggleItem = (item) => {
  setachievementType((prev) =>
    prev.includes(item)
      ? prev.filter((i) => i !== item)
      : [...prev, item]
  );
};


const [market,setmarket] = useState('Austin,TX')
   const [searchParams] = useSearchParams();

   const uuid = searchParams.get("uuid");


   const [completing,setcompleting] = useState(false)



const handleCompleteProfile = async () => {
    setcompleting(true)
  try {
    const payload = {
      auth_user_id: uuid,
      buyer_type: selectedBuyerType,
      market_city: market,
      achievement_type: achievementType,
    };





    const response = await completeProfileApi(payload);

    if (response.success) {
      console.log(response.message);
      setStep(4)
    }
  } catch (error) {
    console.error(error.message);
  }
  finally{
    setcompleting(false)
    
  }
};

  return (
    <div className="flex flex-col items-center gap-8 font-[Inter] p-6 max-w-4xl w-full mx-auto justify-between h-[100vh]">
      {/* -------------------------------------------------------Step1----------------------------------------------------------------------------- */}
    
    
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center gap-8 w-full">
           

             <div className="flex flex-col gap-6 w-full items-start">
             

              <div className=" flex flex-col items-start gap-2">
            <h1 className="text-[32px] font-extrabold text-[#111827]">Lets Get You Started</h1>
              {/* <h1 className="text-[24px] font-semibold text-[#111827]"> What Best <span className="text-[#047F2C]">describes</span> You</h1> */}

               <p className="text-[17px] text-[#6B7280]"> What Best <span className="text-[#047F2C]">Describes</span> You.</p>

                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 1 of 3
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}
            <div className="flex flex-col gap-3 w-full items-start">
            {
                UserType.map((item,i)=>{
                    return(
                         <div 
                         key={i}

                         onClick={()=>{setselectedBuyerType(item.head)}}
                         className="p-4 rounded-[12px] border border-[#E5E7EB] flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <div className="h-[56px] w-14 rounded-[12px] bg-[#EBF5EE] flex items-center justify-center text-[#047F2C]">

                                {item.icon}
                            
                        </div>
                        <div>
                            <h1 className="text-[#111827] font-bold text-[18px]">
                                {item.head}

                            </h1>
                            <p className="text-[#6B7280] text-[15px]">
                               {item.desc}
                            </p>
                        </div>
                    </div>

                    <div className="w-6 h-6 border-[2px] border-[#D1D5DB] rounded-full flex items-center justify-center">

                      {selectedBuyerType === item.head &&
                        <div className="w-3 h-3 rounded-full bg-[green] "></div>}

                    </div>

             </div>
                    )
                })
            }
              
            </div>
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => {
                setStep(2);
              }}
              disabled={selectedBuyerType === ''}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px] disabled:opacity-60"
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
     
     
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center  h-full gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(1);
                }}
              />

              <div className=" flex flex-col items-start gap-2">
              <h1 className="text-[32px] font-extrabold text-[#111827] text-left"> What are you looking to <span className="text-[#047F2C]">Achieve ?</span></h1>

               <p className="text-[17px] text-[#6B7280]">Select All that Apply</p>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 2 of 3
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}
            <div className="flex flex-col gap-3 w-full items-start">
            {
                achieveType.map((item,i)=>{
                    return(
                         <div 
                         key={i}
                       onClick={()=>{
                        toggleItem(item.head)
                       }}
                         className="p-4 rounded-[12px] border border-[#E5E7EB] flex items-center justify-between w-full">
                    <div className="flex items-center gap-4">
                        <div className={`h-[56px] w-14 rounded-[12px] bg-[#EBF5EE] flex items-center justify-center`}
                        style={{backgroundColor:item.bg,color:item.text}}
                        >

                                {item.icon}
                            
                        </div>
                        <div>
                            <h1 className="text-[#111827] font-bold text-[18px]">
                                {item.head}

                            </h1>
                            <p className="text-[#6B7280] text-[15px]">
                               {item.desc}
                            </p>
                        </div>
                    </div>

                    <div className="w-6 h-6 border-[2px] border-[#D1D5DB] rounded-full flex items-center justify-center">
                                {achievementType.includes(item.head) && <div className='w-3 h-3 bg-[green] rounded-full'></div>}
                    </div>

             </div>
                    )
                })
            }
              
            </div>
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => {
                setStep(3);
              }}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
             Continue
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-8 w-full justify-between">
          <div className="flex flex-col items-center  h-full gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(2);
                }}
              />

              <div className=" flex flex-col items-start gap-2">
              <h1 className="text-[32px] font-extrabold text-[#111827] text-left">Which  <span className="text-[#047F2C]">Market</span> are you Interested In?</h1>

               <p className="text-[17px] text-[#6B7280] text-left">We'll show insights and opportunities in your preferred market.</p>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 3 of 3
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}

            <div className="w-full relative ">
                <Search className="absolute top-[50%] translate-y-[-50%]  left-4" color="#9CA3AF"/>
                <input type="text"  
                placeholder="Search city, state or region"
                className="py-4 rounded-[14px] border border-[#E5E7EB] w-full placeholder:text-[#9CA3AF] text-[15px] outline-[green] pl-[50px] pr-[20px]"/>
            </div>
            <div className="flex flex-col gap-3 w-full items-start">
                    <h1 className="font-semibold text-[16px] text-[#000933]">Popular Markets</h1>

                    <div className="w-full">
                        <div className="py-3 text-[15px] font-semibold text-[#000933] flex items-center justify-between w-full border-b border-[#E5E7EB]">
                            
                           <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-[12px] overflow-hidden">
                                <img src={AustinImg} alt="" />
                            </div>
                            <h1>Austin,TX</h1>
                           </div>
                           

                            <ChevronRight color="#9CA3AF"/>

                        </div>
                        {/* ------------------------------------------------------------------------- */}
                        <div className="py-3 text-[15px] font-semibold text-[#000933] flex items-center justify-between w-full border-b border-[#E5E7EB]">
                            
                           <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-[12px] overflow-hidden">
                                <img src={AustinImg} alt="" />
                            </div>
                            <h1>Dallas,TX</h1>
                           </div>
                           

                            <ChevronRight color="#9CA3AF"/>

                        </div>
                        {/* ------------------------------------------------------------------------- */}
                        <div className="py-3 text-[15px] font-semibold text-[#000933] flex items-center justify-between w-full border-b border-[#E5E7EB]">
                            
                           <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-[12px] overflow-hidden">
                                <img src={AustinImg} alt="" />
                            </div>
                            <h1>Miami,FL</h1>
                           </div>
                           

                            <ChevronRight color="#9CA3AF"/>

                        </div>
                        {/* ------------------------------------------------------------------------- */}
                        <div className="py-3 text-[15px] font-semibold text-[#000933] flex items-center justify-between w-full border-b border-[#E5E7EB]">
                            
                           <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-[12px] overflow-hidden">
                                <img src={AustinImg} alt="" />
                            </div>
                            <h1>Los Angeles,CA</h1>
                           </div>
                           

                            <ChevronRight color="#9CA3AF"/>

                        </div>
                        {/* ------------------------------------------------------------------------- */}
                        <div className="py-3 text-[15px] font-semibold text-[#000933] flex items-center justify-between w-full border-b border-[#E5E7EB]">
                            
                           <div className="flex items-center gap-4">
                             <div className="h-14 w-14 rounded-[12px] overflow-hidden">
                                <img src={AustinImg} alt="" />
                            </div>
                            <h1>Phoenix,AZ</h1>
                           </div>
                           

                            <ChevronRight color="#9CA3AF"/>

                        </div>
                        {/* ------------------------------------------------------------------------- */}
                    </div>
              
            </div>
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-2 w-full">
            <button
              onClick={() => {
               
                handleCompleteProfile()
              }}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
            {completing?'Completing...' :'Complete Profile'}
            </button>
           
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 4 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center justify-center h-full gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-center justify-center">
                <CircleCheck size={100} strokeWidth={0.5} color='green'/>

              <div className="font-bold text-[#111827] text-[30px] flex flex-col items-center justify-center gap-2">
                <h1>You're All Set</h1>
              
                <p className="text-[16px] font-normal  text-[#6B7280] text-center">
                 Welcome to LIAM. Your AI real estate advisor is ready to help.
                </p>
              </div>
            </div>


            <div className="text-[#111827] text-[16px] font-normal flex flex-col gap-5 mt-5">
                <div className="flex items-center gap-4">
                    <CheckSquare size={16} color='#22C55E'/>
                    <h1>Ask anything about real estate</h1>
                    
                </div>
                <div className="flex items-center gap-4">
                    <Zap size={16} color='#22C55E'/>
                    <h1>Get AI-powered insights</h1>
                    
                    
                </div>
                <div className="flex items-center gap-4">
                    <Map size={16} color='#22C55E'/>
                    <h1>Track properties and markets</h1>
                    
                </div>
            </div>

          
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => {
                navigate('/AskLIAM/Home')
              }}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
            Go to LIAM
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteProfile;
