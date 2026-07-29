import React,{useState,useEffect} from "react";
import LIAMNavbar from "./LIAMNavbar";
import { ArrowRight, BookOpenCheck, ChartBar, ChevronRight, DollarSign, Hammer, House, HousePlus, Lightbulb, ScrollText, Search, Sparkles, TrendingUp } from "lucide-react";
import { IoPulse } from "react-icons/io5";
import { useNavigate, useSearchParams } from "react-router";
import LIAMLOGO from '../assets/LIAMLOGO.png'
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { supabase } from "../Utils/Supabase";




const Typewriter = ({ text, speed = 70, onComplete }) => {
  const [display, setDisplay] = useState("");


  

  useEffect(() => {
    let i = 0;

    const timer = setInterval(() => {
      setDisplay(text.slice(0, i + 1));
      i++;

      if (i === text.length) {
        clearInterval(timer);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(timer);
  }, []);

  return (
    <h1 className="text-[36px] sm:text-[41px] font-bold tracking-tight leading-tight whitespace-pre">
      {display}
      <span className="animate-pulse">|</span>
    </h1>
  );
};


const LiamHomepage = () => {




  const [showContent, setShowContent] = useState(false);

    




  const examples = [
    {
      text: "Find Investment Opportunities",
      desc: "Discover properties with strong upside potential.",
      icon: <Search  size={22} strokeWidth={2.75}/>,
    },
    {
      text: "Find Flip Opportunities",
      desc: "Discover fixer-uppers, TLC homes, and value-add properties.",
      icon: <HousePlus size={22} strokeWidth={2.75}/>,
    },
    {
      text: "Analyze Any Property",
      desc: "Get LIAM’s valuation, equity, risk, and upside analysis",
      icon: <ScrollText  size={18} strokeWidth={2.75}/>,
    },
  ];

  const navigate = useNavigate()

  useEffect(() => {
  const fetchUser = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        navigate("/AskLIAM/LoginHome");
        return;
      }

      const user = session.user;

     

      // Store auth user
      localStorage.setItem("user", JSON.stringify(user));

      

    
    } catch (err) {
      console.error(err);
    }
  };

  fetchUser();
}, [navigate]);

  const [selected,setSelected] = useState(null)

  const [inputText,setInputText] = useState('')


  
  
  return (
    <div className=" bg-[#FDFDFD] h-[85vh]">
     

      <div className="flex flex-col items-center justify-between gap-[20px] min-h-[80vh] px-5  py-3 mt-5">
        <div className='flex flex-col gap-4 mt-5'>
         <Typewriter
    text="Hello, I'm LIAM 👋"
    onComplete={() => setShowContent(true)}
/>

         <div className='flex flex-col gap-[8px]'>
           <AnimatePresence>
{showContent && (
<motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="flex flex-col gap-2"
>
    <p className="text-[20px] leading-snug text-[#4B5563]">
        What do you have in mind today?
    </p>

    <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-[12px] text-[#0a0a0a] w-[90%] "
    >
        I can help you build a roadmap, find opportunities,
        analyze markets, and guide you to smarter real estate decisions.
    </motion.p>
</motion.div>
)}
</AnimatePresence>
         </div>
        </div>
      

        <div className='flex flex-col gap-8'>

          

        <div className='flex flex-col gap-2'>
 <div className='text-[15px] font-bold flex items-center gap-2'>
          <Sparkles color='#22C55E'/>
          Try Asking Me</div>



          <div 
          
          className='flex items-center gap-3'>
            <div
            onClick={()=>{
              navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "create_roadmap",
  },
});
            }}
            className='bg-[#FFFFFF] border-[1px] border-[#F3F4F6] shadow-sm shadow-[#00000008] rounded-[20px] p-[16px] flex flex-col gap-3 text-[13px] font-medium text-[#000000] w-fit'>

                  <div className='bg-[#22C55E15] rounded-[14px] p-3 w-fit '>
                        <BookOpenCheck color='#22C55E'/>
                  </div>

                  Create my roadmap

            </div>
            <div 
             onClick={()=>{
            navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "find_investment_opportunities",
  },
});
            }}
            className='bg-[#FFFFFF] border-[1px] border-[#F3F4F6] shadow-sm shadow-[#00000008] rounded-[20px] p-[16px] flex flex-col gap-3 text-[13px] font-medium text-[#000000] w-fit'>

                  <div className='bg-[#3B82F615] rounded-[14px] p-3 w-fit '>
                        <HousePlus color='#3B82F6'/>
                  </div>

                  Find investment opportunities

            </div>
            <div 
               onClick={()=>{
            navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "find_fixer_upper_deals",
  },
});
            }}
            className='bg-[#FFFFFF] border-[1px] border-[#F3F4F6] shadow-sm shadow-[#00000008] rounded-[20px] p-[16px] flex flex-col gap-3 text-[13px] font-medium text-[#000000] w-fit'>

                  <div className='bg-[#F9731615] rounded-[14px] p-3 w-fit '>
                        <Hammer color='#F97316'/>
                  </div>

                 Find fixer-upper deals

            </div>
          </div>
        </div>

<div className='flex flex-col gap-2 '>
  
        <div className='text-[15px] font-bold flex items-center gap-2'>
          <Lightbulb color='#22C55E'/>
          Popular questions</div>
        <div className='bg-[#ffffff] border-[#F3F4F6] border-[1px] shadow-sm shadow-[#00000008] rounded-[20px]'>
                      <div 
                          onClick={()=>{
          navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "assess_buy_timing",
  },
});
            }}
                      className='flex items-center justify-between gap-[12px] p-[16px] text-[14px] text-[#000000] font-medium border-b border-[#f3f4f6]'>
                                <div className='flex items-center gap-[12px]'>
                                   <ChartBar color='#22C55E'/>
                                 <p>Is now a good time to buy real estate?</p>
                                </div>
                                 <ChevronRight color='#9CA3AF' size={20}/>
                      </div>
                      <div
                                  onClick={()=>{
        navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "rank_rental_markets",
  },
});
            }}
                      className='flex items-center justify-between gap-[12px] p-[16px] text-[14px] text-[#000000] font-medium border-b border-[#f3f4f6]'>

                        <div className='flex items-center gap-[12px]'>
                           <House color='#8B5CF6' />
                                 <p>What are the best rental markets in the US?</p>
                        </div>
                                
                                 <ChevronRight color='#9CA3AF' size={20}/>
                      </div>
                      <div 
                            onClick={()=>{
      navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "build_passive_income_plan",
  },
});
            }}
                      className='flex items-center justify-between gap-[12px] p-[16px] text-[14px] text-[#000000] font-medium border-b border-[#f3f4f6]'>
                        <div className='flex items-center gap-[12px]'>
                           <DollarSign color='#F97316' />
                                 <p>How can I build $10k/month in passive income?</p>
                        </div>
                                
                                 <ChevronRight color='#9CA3AF' size={20}/>
                      </div>
        </div>
</div>


          <div className="relative w-full ">
          <input

               
            type="text"
            value={inputText}
            onChange={(e)=>{setInputText(e.target.value)}}
            placeholder="Ask LIAM Anything..."
            className="pl-4 pr-15 py-4 border-[0.5px] border-black/30 rounded-full w-full shadow-md outline-none placeholder:text-sm"
          />

          <div
             onClick={()=>{
      navigate("/AskLIAM/LIAMConversation", {
  state: {
    intent: "normal",
    input:inputText
  },
});
            }}
          className="p-2 w-fit bg-black rounded-full absolute right-2 top-[50%] translate-y-[-50%] hover:scale-[1.15] transition-all duration-150">
            <ArrowRight color="#1fae3e" />
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default LiamHomepage;
