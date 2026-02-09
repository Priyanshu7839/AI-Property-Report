import {
  ArrowLeft,
  Home,
  TrendingUp,
  DollarSign,
  Shield,
  PieChart,
  MapPin,
  Check,
  ArrowUpRight,
  AlertCircle,
  ChevronRight,
  Clock,
  Sparkles,
  Phone,
  Calendar,
  MessageCircle,
  Target,
  LineChart,
  Wallet,
  Award,
  Star,
  Zap,
  TrendingDown,
  Users,
  Bitcoin,
  Building2,
  BarChart3,
  Landmark,
  FileText,
  Briefcase,
  BadgeDollarSign,
  CircleDollarSign,
  Coins,
  TrendingUpDown,
  Scale,
  FileCheck,
  Info,
  ChartPie,
  Sprout,
  BanknoteArrowUp,
  Rocket,
  House,
  Blocks,
  X,
  Lock,
  Activity,
  ShieldCheck,
  Layers,
} from "lucide-react";

import {
  PieChart as RePieChart,
  Pie as Repie,
  Cell,
  ResponsiveContainer,
  Tooltip as ReTooltip,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { motion, AnimatePresence } from "motion/react";

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calculator } from "lucide-react";
import { ChatbotModal } from "./ChatbotModal";
import { ShareReport } from "./ShareReport";
import { useSearchParams, useNavigate, useLocation } from "react-router";
import axios from "axios";
import {
  gettimeSeriesData,
  openaiapicall,
  GeneratePdf,
  UploadToFirebase,
  UploadEmailToFirebase,
} from "./apicalls/ApiCalls";
import { InfoTooltip } from "./InfoTooltip";
import { TimelineVisualization } from "./TimelineVisualization";
import { StrategyCustomizer } from "./StrategyCustomizer";
import Frame from "../assets/Frame.png";
import Frame1 from "../assets/Frame1.png";
import CustomTab from "./ui/CustomTab";
import { Label } from "./ui/label";
import {
  Tooltip as TooltipFig,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Slider } from "./ui/slider";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import Bullseye from "../assets/Bullseye.png";
import { trackEvent } from "../GoogleAnalytics/Analytics";
import { toast } from "sonner";

type StrategyType = "Baseline" | "Basic" | "Popular" | "High" | "Custom";

interface Allocation {
  sp500: number;
  bonds: number;
  crypto: number;
  cash: number;
}

// Colors for assets like S&P,Bonds,Crypto,Cash

const COLORS = {
  sp500: "#2A69DB",
  bonds: "#6DBFD5",
  crypto: "#F7C34C",
  cash: "#3C998F",
};

//SVG for assets like S&P,Bonds,Crypto,Cash
const assetsSvg = {
  sp500: (
    <svg
      width="17"
      height="17"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.8346 4.27637L7.8763 9.2347L4.95964 6.31803L1.16797 10.1097"
        stroke="#2A69DB"
        stroke-width="1.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.33203 4.27637H12.832V7.77637"
        stroke="#2A69DB"
        stroke-width="1.16667"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),

  bonds: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.5 17.838C19.5305 17.6867 20.2627 17.3941 20.8284 16.8284C22 15.6569 22 13.7712 22 10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H10C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10C2 13.7712 2 15.6569 3.17157 16.8284C3.97975 17.6366 5.1277 17.8873 7 17.965"
        stroke="#6DBFD5"
        stroke-width="1.5"
        stroke-linecap="round"
      />
      <path
        d="M17 7H7"
        stroke="#6DBFD5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14.5 14.5C14.5 15.8807 13.3807 17 12 17C10.6193 17 9.5 15.8807 9.5 14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5Z"
        stroke="#6DBFD5"
        stroke-width="1.5"
      />
      <path
        d="M9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L15.25 20L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471"
        stroke="#6DBFD5"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  crypto: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#FF6F00"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-bitcoin-icon lucide-bitcoin"
    >
      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
    </svg>
  ),
  cash: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#3C998F"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="lucide lucide-dollar-sign-icon lucide-dollar-sign"
    >
      <line x1="12" x2="12" y1="2" y2="22" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  ),
};



const EmailGateScreen = ({ setScreen }) => {
  const [Email, setEmail] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleEmailSubmit = async () => {
    if (Email === "") {
      toast.error("Please Enter An Email");
      return;
    }
    setUploading(true);
    try {
      const result = await UploadEmailToFirebase(Email);
      setScreen(5);
    } catch (error) {
      toast.error("Upload failed");
    }
    setUploading(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="min-h-screen bg-gradient-to-br from-white/60 via-[#FAFBFC]/60 to-[#F5F8FF]/60 flex items-center justify-center px-4 sm:px-6 py-12 fixed z-[99] w-full backdrop-blur-sm "
    >
      <div className="max-w-2xl w-[500px] relative">
        <div
          onClick={() => setScreen(3)}
          className="absolute top-6 right-10 text-[16px] text-[#0b85ff]  cursor-pointer border-b border-[#0b85ff]"
        >
          Skip
        </div>

        <div className="bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0b85ff]/10 to-[##0b855ff]/5 flex items-center justify-center mx-auto mb-3">
              {/* <Lock className="w-6 h-6 text-[#18A36F]" /> */}

              <img src={Bullseye} />
            </div>

            <h2 className="text-[20px] sm:text-[24px] tracking-[-0.03em] font-[500] mb-2 capitalize">
              To generate a more accurate estimate
            </h2>
            <p className="text-[#6A6A6A] text-[12px] leading-relaxed mb-8 capitalize">
              We'll save your report and refine the numbers. No spam.
            </p>
          </div>

          <div className="mb-6">
            <label className="text-[14px] font-medium mb-3 block">
              Email address
            </label>
            <input
              type="email"
              value={Email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="you@example.com"
              className="w-full px-3 py-2 bg-[#FAFBFC] border border-black/[0.1] rounded-md focus:outline-none focus:border-[#0b85ff] focus:ring-2 focus:ring-[#0b85ff]/50 transition-all text-[16px]"
            />
          </div>

          <button
            onClick={() => {
              handleEmailSubmit();
            }}
            className="w-full py-2 bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white rounded-md font-medium text-[14px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group mb-4"
          >
            Get My Detailed Estimate
            {uploading ? (
              "..."
            ) : (
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            )}
          </button>

          <p className="text-[12px] text-gray-500 capitalize text-center">
            By continuing, you agree to receive updates about your property
            analysis.
          </p>
        </div>

        {/* <button
          onClick={() => setScreen(3)}
          className="mt-6 text-[#6A6A6A] hover:text-black text-[14px] transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button> */}
      </div>
    </motion.div>
  );
};

const EmailFlowCloseScreen = ({ setScreen }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="min-h-screen bg-gradient-to-br from-white/60 via-[#FAFBFC]/60 to-[#F5F8FF]/60 flex items-center justify-center px-4 sm:px-6 py-12 fixed z-[99] w-full backdrop-blur-sm "
  >
    <div className="max-w-2xl w-[500px] relative">
      <div className="bg-white border border-black/[0.08] rounded-3xl p-8 sm:p-12 shadow-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0b85ff]/10 to-[##0b855ff]/5 flex items-center justify-center mx-auto mb-3">
            {/* <Lock className="w-6 h-6 text-[#18A36F]" /> */}

            <img src={Bullseye} />
          </div>

          <h2 className="text-[20px] sm:text-[24px] tracking-[-0.03em] font-[500] mb-2 capitalize">
            Your Detailed Report Is Being Prepared
          </h2>
          <p className="text-[#6A6A6A] text-[12px] leading-relaxed mb-2 capitalize">
            A Property advisor is now refining your report based on your home
            and financial profile. You will recieve you personalised report
            shortly, and out of our advisor may reach out to you to walk you
            through your best options.
          </p>
        </div>

        <button
          onClick={() => {
            setScreen(2);
          }}
          className="w-full py-2 bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white rounded-md font-medium text-[14px] shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group mb-4"
        >
          Continue To Report
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* <button
          onClick={() => setScreen(3)}
          className="mt-6 text-[#6A6A6A] hover:text-black text-[14px] transition-colors flex items-center gap-2 mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button> */}
    </div>
  </motion.div>
);

const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    whileHover={{ y: -4, shadow: "0 20px 40px -12px rgba(0,0,0,0.1)" }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className={`bg-white rounded-xl border border-black/[0.04] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] p-4 md:p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "gray" | "orange";
}) => {
  const styles = {
    blue: "bg-[#005BFF]/10 text-[#005BFF]",
    green: "bg-[#18A36F]/10 text-[#18A36F]",
    gray: "bg-gray-100 text-gray-600",
    orange: "bg-orange-500/10 text-orange-600",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[color]}`}
    >
      {children}
    </span>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const portfolio = payload[0].value;
    const baseline = payload[1].value;
    const gain = portfolio - baseline;

    return (
      <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.12)] min-w-[200px]">
        <div className="text-xs text-[#6A6A6A] font-bold uppercase mb-2">
          {label}
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#005BFF]" />
              <span className="text-sm font-bold text-black">Strategy</span>
            </div>
            <span className="text-sm font-bold text-black">
              ${portfolio.toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-gray-300" />
              <span className="text-sm font-bold text-[#6A6A6A]">Baseline</span>
            </div>
            <span className="text-sm font-bold text-[#6A6A6A]">
              ${baseline.toLocaleString()}
            </span>
          </div>

          {gain > 0 && (
            <div className="pt-2 border-t border-gray-100 flex justify-between items-center">
              <span className="text-xs font-bold text-[#18A36F] uppercase">
                Net Benefit
              </span>
              <span className="text-sm font-bold text-[#18A36F]">
                +${gain.toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const CountUp = ({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = { value: 0 };
    // We animate from 0 to value over 1.5 seconds
    const duration = 1.5;
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const update = (currentTime: number) => {
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutQuart)
      const ease = 1 - Math.pow(1 - progress, 4);

      const current = start + (end - start) * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [value]);

  return (
    <span>
      {prefix}
      {displayValue.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })}
      {suffix}
    </span>
  );
};

export function ReportPage({
  propertyType,
  onBack,
  onShowMethodology,
}: ReportPageProps) {

  // /*----------------------------Chat bot Funtion-----------------------------------------------------
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [chatbotMode, setChatbotMode] = useState<
    | "general"
    | "schedule-call"
    | "advisor"
    | "strategy-session"
    | "apply-strategy"
  >("general");

  const openChatbot = (mode: typeof chatbotMode, strategyName?: string) => {
    setChatbotMode(mode);
    setIsChatbotOpen(true);
  };

  // /*-----------------------------------------------------------------------------------------------------


  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const address = searchParams.get("address");

  const state = useLocation();

  const [similarHomes, setSimilarHomes] = useState([]); //Similar House In the Area
  const [HomesData, setHomesData] = useState([]); //Contains all the data from zillow api

  const ReportNavButtons = [
    {
      name: "Summary",
    },
    {
      name: "Equity/Growth Comparison",
    },
    {
      name: "Buy/Sell/Hold Intelligence",
    },
    {
      name: "Finance-Taxes-Insurance-By LIAM",
    },
  ]; //This array contains the names for the Buttons on top like summary etc

  const [selectedButton, setSelectedButton] = useState(
    ReportNavButtons?.[0]?.name,
  );  //this changes the button selected at time that is summary ...

  const [PortfolioOptions, setPortfolioOptions] = useState([
    {
      value: "Baseline",
      Risk: "No Risk",
      TotalReturnsBeforeTax:0,
       projectAnnualReturn: 0,
      totalassetsvalueinfiveYears: 0,
      netgaininpercent: 0,
      netgainvalue: 0,
       capitalGainsTaxPaid:0,
       textColor: "text-[#000]",
      borderColor: "border-[#cfcfd7]",
      gradientBg: "bg-black/10",
      icon2: <House size={14} />,
      color: "gray",
    },

    {
      value: "Basic",
      Risk: "Low Risk",
       projectAnnualReturn: 0,
      totalassetsvalueinfiveYears: 0,
      netgaininpercent: 0,
      netgainvalue: 0,
       capitalGainsTaxPaid:0,
      color: "blue",
      borderColor: "border-[#005BFF]/20",
      bgColor: "bg-[#005BFF]",
      textColor: "text-[#005BFF]",
      gradientBg: "bg-[#005BFF]/10",
      icon: <Shield size={10} />,
      icon2: <Sprout size={14} />,
    },
    {
      value: "Popular",
      Risk: "Medium Risk",
      projectAnnualReturn: 0,
      totalassetsvalueinfiveYears: 0,
      netgaininpercent: 0,
      netgainvalue: 0,
       capitalGainsTaxPaid:0,
      color: "green",
      borderColor: "border-[#18A36F]/20",
      bgColor: "bg-[#18a36f]",
      textColor: "text-[#18a36f]",
      gradientBg: "bg-[#18a36f]/10",
      icon: <Shield size={10} />,
      icon2: <BanknoteArrowUp size={14} />,
    },
    {
      value: "High",
      Risk: "High Risk",
       projectAnnualReturn: 0,
      totalassetsvalueinfiveYears: 0,
      netgaininpercent: 0,
      netgainvalue: 0,
       capitalGainsTaxPaid:0,
      color: "orange",
      borderColor: "border-orange-200",
      bgColor: "bg-orange-500",
      textColor: "text-orange-600",
      gradientBg: "bg-orange-500/10",
      icon: <AlertCircle size={10} />,
      icon2: <Rocket size={14} />,
    },
    {
      value: "Custom",
      Risk: "High Risk",
      projectAnnualReturn: 0,
      totalassetsvalueinfiveYears: 0,
      netgaininpercent: 0,
      netgainvalue: 0,
      capitalGainsTaxPaid:0,
      color: "gray",
      borderColor: "border-[#cfcfd7]",
      bgColor: "bg-white",
      textColor: "text-black",
      gradientBg: "bg-black/10",
      icon: <AlertCircle size={10} />,
      icon2: <Blocks size={14} />,
    },
  ]); //this contains the portfolio option that is show e.g. basic , mostpopular,high growth

  const [selectedPortfolio, setSelectedPortfolio] = useState(
    PortfolioOptions?.[1],
  ); //this contains the selected portfolio at the time from portfolio options


  useEffect(() => {
    if (PortfolioOptions?.length > 1) {
      setSelectedPortfolio(PortfolioOptions[1]);
    }
  }, [PortfolioOptions]); //this useEffect is important as it sets portfol 

  const [activeButton, setActiveButton] = useState("Basic");

  useEffect(() => {
    if (state.state !== null) setHomesData(state?.state?.data?.data);

    const fetchHouseData = async () => {
      try {
        const response = await axios.get(
          `https://zhomes-realty-us.p.rapidapi.com/properties/search-address?address=${address}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "69953a3276msh1fffb8e07d13516p11031ejsnfd55185a907e",
              "X-RapidAPI-Host": "zhomes-realty-us.p.rapidapi.com",
            },
          },
        );
        if (response.data.message === "Successful") {
          // console.log(response.data.data)
          setHomesData(response.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (state.state === undefined || state.state === null) {
      fetchHouseData();
    }
  }, [state]); //This useEffect is set to fetch the house data 

  useEffect(() => {
    const fetchSimilarHomes = async () => {
      try {
        const response = await axios.get(
          `https://zhomes-realty-us.p.rapidapi.com/properties/similar-homes?zpid=${HomesData?.zpid}`,
          {
            headers: {
              "X-RapidAPI-Key":
                "69953a3276msh1fffb8e07d13516p11031ejsnfd55185a907e",
              "X-RapidAPI-Host": "zhomes-realty-us.p.rapidapi.com",
            },
          },
        );

        // console.log(response.data.data?.[0])
        setSimilarHomes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (HomesData?.zpid !== null && HomesData?.zpid !== undefined) {
      fetchSimilarHomes();
    }
  }, [state, HomesData.zpid]);  //this fetches similar homes in the area

  

  

  const [AnnualGrowth, setAnnualGrowth] = useState({
  });
  

  
  const housePrice = parseInt(HomesData?.price);

  const [HousePrices, setHousePrices] = useState([]); //prices for the similar homes in the area

  useEffect(() => {
    const getTimeSeries = async () => {
      const { SandP, Bonds, Bitcoin, HousePoints, HousePrices } =
        await gettimeSeriesData(HomesData?.zpid);
      setHousePrices(HousePrices);

      setAnnualGrowth({
        sp500: parseFloat(Number(SandP) / 5).toFixed(1),
        bonds: parseFloat(Number(Bonds) / 5).toFixed(1),
        crypto: parseFloat(Number(Bitcoin) / 5).toFixed(1),
        cash:2,
        house:parseFloat(Number(HousePoints?.[2])).toFixed(1)
      });

    
    };

    if (HomesData?.zpid !== null && HomesData?.zpid !== undefined) {
      getTimeSeries();
    }
  }, [HomesData?.zpid]);

 

  const [aiResponse, setAiResponse] = useState([]);

  const GeneratePDF = async () => {
    try {
      const response = await GeneratePdf(address);
      // console.log(response)
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const openAiCall = async () => {
      try {
        const response = await openaiapicall(
          similarHomes,
          HousePrices,
          HomesData?.description,
          state?.state?.data?.data?.zestimate,
        );
      
        setAiResponse(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (HousePrices?.length > 0 && similarHomes?.length > 0) {
      openAiCall();
    }
  }, [HousePrices, similarHomes]);
  
  const [screen, setScreen] = useState(0);

  


  

  //To show annual return of each assets
 
  const [isBreakdownOpen, setIsBreakdownOpen] = useState(false);

 

  // Allocation Percent state changeable for sliders
  const [customAllocation, setCustomAllocation] = useState<Allocation>({
    sp500: 40,
    bonds: 30,
    crypto: 20,
    cash: 10,
  });


  //For custom sliders allocation 
  const [equities, setEquities] = useState(36);
  const [bonds, setBonds] = useState(39);
  const [cash, setCash] = useState(15);
  const [crypto, setCrypto] = useState(10);

  useEffect(() => {
    setCustomAllocation({
      sp500: equities,
      bonds: bonds,
      crypto: crypto,
      cash: cash,
    });
  }, [equities, bonds, cash, crypto]);

  const getAllocation = (strategy: StrategyType): Allocation => {
    switch (strategy) {
      case "Baseline":
        return { sp500: 0, bonds: 0, crypto: 0, cash: 0 }; 
      case "Basic":
        return { sp500: 36, bonds: 39, crypto: 10, cash: 15 };
      case "Popular":
        return { sp500: 49, bonds: 21, crypto: 20, cash: 10 };
      case "High":
        return { sp500: 56, bonds: 10, crypto: 29, cash: 5 };
      case "Custom":
        return customAllocation;
      default:
        return { sp500: 36, bonds: 39, crypto: 15, cash: 10 };
    }
  };

  const currentAllocation = getAllocation(selectedPortfolio?.value);
 

  // For doughnut Chart /*//////////////////////////////////////////////////////////////////////////////*/

  ChartJS.register(ArcElement, Legend, Tooltip);

  const data = {
    labels: ["S&P 500", "Bonds", "Crypto", "Cash"],
    datasets: [
      {
        label: "Invested%",
        data: [getAllocation('Popular').sp500, getAllocation('Popular').bonds, getAllocation('Popular').crypto, getAllocation('Popular').cash], // MUST be numbers
        backgroundColor: ["#2A69DB", "#6DBFD5", "#F7C34C", "#3C998F"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // 👈 hides top labels
      },
      tooltip: {
        enabled: false,
      },
    },
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////*/

  const handleEquitiesChange = (value: number[]) => {
    const newEquities = value[0];
    const remaining = 100 - newEquities;
    const otherTotal = bonds + cash + crypto;
    if (otherTotal === 0) {
      setBonds(remaining);
    } else {
      const factor = remaining / otherTotal;
      setBonds(Math.round(bonds * factor));
      setCash(Math.round(cash * factor));
      setCrypto(Math.round(crypto * factor));
    }
    setEquities(newEquities);
  };

  const handleBondsChange = (value: number[]) => {
    const newBonds = value[0];
    const remaining = 100 - newBonds;
    const otherTotal = equities + cash + crypto;
    if (otherTotal === 0) {
      setEquities(remaining);
    } else {
      const factor = remaining / otherTotal;
      setEquities(Math.round(equities * factor));
      setCash(Math.round(cash * factor));
      setCrypto(Math.round(crypto * factor));
    }
    setBonds(newBonds);
  };

  const handleCashChange = (value: number[]) => {
    const newCash = value[0];
    const remaining = 100 - newCash;
    const otherTotal = equities + bonds + crypto;
    if (otherTotal === 0) {
      setEquities(remaining);
    } else {
      const factor = remaining / otherTotal;
      setEquities(Math.round(equities * factor));
      setBonds(Math.round(bonds * factor));
      setCrypto(Math.round(crypto * factor));
    }
    setCash(newCash);
  };

  const handleCryptoChange = (value: number[]) => {
    const newCrypto = Math.min(value[0], 100); // Cap at 20%
    const remaining = 100 - newCrypto;
    const otherTotal = equities + bonds + cash;
    if (otherTotal === 0) {
      setEquities(remaining);
    } else {
      const factor = remaining / otherTotal;
      setEquities(Math.round(equities * factor));
      setBonds(Math.round(bonds * factor));
      setCash(Math.round(cash * factor));
    }
    setCrypto(newCrypto);
  };

  const customTabFunctions = [
    {
      value: equities,
      function: handleEquitiesChange,
    },
    {
      value: bonds,
      function: handleBondsChange,
    },
    {
      value: crypto,
      function: handleCryptoChange,
    },
    {
      value: cash,
      function: handleCashChange,
    },
  ];

 

  const CalculateReturns= (strategy)=> {
          const ReinvestHouseAmount = 0.3375 * housePrice //considering 60% margin and 8.75% heloc paid for 5 years
          

          const SandPAmount = ReinvestHouseAmount * (getAllocation(strategy).sp500 / 100)
          const bondsAmount = ReinvestHouseAmount * (getAllocation(strategy).bonds / 100)
          const cashAmount = ReinvestHouseAmount * (getAllocation(strategy).cash / 100)
          const cryptoAmount = ReinvestHouseAmount * (getAllocation(strategy).crypto / 100)
         

           const SandPReturn = SandPAmount * Math.pow(1 + (AnnualGrowth.sp500/100),5) - SandPAmount
           const BondsReturn = bondsAmount * Math.pow(1 + (AnnualGrowth.bonds/100),5) - bondsAmount
           const CashReturn = cashAmount * Math.pow(1.02 , 5) - cashAmount
           const CryptoReturn = cryptoAmount * Math.pow(1 + (AnnualGrowth.crypto/100),5) - cryptoAmount
           const HouseReturn = housePrice * Math.pow(1.02,5) - housePrice

           const TotalReturns = Number(SandPReturn) +  Number(BondsReturn) +  Number(CashReturn) +  Number(CryptoReturn) +  Number(HouseReturn);

           const CapitalGainsTax =( Number(SandPReturn) +  Number(BondsReturn) +  Number(CashReturn) +  Number(CryptoReturn)) * 0.15 //Assuming 15% capital gains Tax

           const TotalReturnsAfterTaxOptimized = TotalReturns - CapitalGainsTax
           const TotalReturnsAfterTaxNotOptimized = HouseReturn

           const NetGainFromOptimization = TotalReturnsAfterTaxOptimized - TotalReturnsAfterTaxNotOptimized
          

           const FiveYearsReturnPercent = (TotalReturnsAfterTaxOptimized/housePrice)*100 //net gain percent in 5 years 

           return {
            TotalRetrunBeforeTax:TotalReturns,
            CapitalGainsTax:CapitalGainsTax,
            TotalReturnsAfterTaxOptimized:TotalReturnsAfterTaxOptimized,
            TotalReturnsAfterTaxNotOptimized:TotalReturnsAfterTaxNotOptimized,
            NetGainFromOptimization:NetGainFromOptimization,
            FiveYearsReturnPercent:FiveYearsReturnPercent


           }
  }

   useEffect(() => {
   
    console.log(CalculateReturns('Popular'))
    console.log(CalculateReturns('Basic'))
    console.log(CalculateReturns('High'))
    console.log(CalculateReturns('Baseline'))
   
    
    setPortfolioOptions((prev) =>
      prev.map((item, i) =>
        i === 0
          ? {
              ...item,
              projectAnnualReturn: parseInt((CalculateReturns('Baseline').TotalReturnsAfterTaxNotOptimized)/5).toFixed(1),
              totalassetsvalueinfiveYears: parseInt(Number(CalculateReturns('Baseline').TotalReturnsAfterTaxNotOptimized) + housePrice).toFixed(1),
              netgaininpercent: 0,
              netgainvalue: 0,
               capitalGainsTaxPaid:0,
               TotalReturnsBeforeTax:0
            }
          :

        i === 1
          ? {
              ...item,
              projectAnnualReturn: parseInt((CalculateReturns('Basic').TotalReturnsAfterTaxOptimized)/5).toFixed(1),
              totalassetsvalueinfiveYears: parseInt(Number(CalculateReturns('Basic').TotalReturnsAfterTaxOptimized) + housePrice).toFixed(1),
              netgainvalue: parseInt(CalculateReturns('Basic').NetGainFromOptimization).toFixed(1),
              netgaininpercent: parseInt(CalculateReturns('Basic').FiveYearsReturnPercent).toFixed(1),
              TotalReturnsBeforeTax:parseInt(CalculateReturns('Basic').TotalRetrunBeforeTax).toFixed(1),
               capitalGainsTaxPaid:parseInt(CalculateReturns('Basic').CapitalGainsTax).toFixed(1),

            }
          : i === 2
            ? {
                ...item,
                ...item,
              projectAnnualReturn: parseInt((CalculateReturns('Popular').TotalReturnsAfterTaxOptimized)/5).toFixed(1),
              totalassetsvalueinfiveYears: parseInt(Number(CalculateReturns('Popular').TotalReturnsAfterTaxOptimized) + housePrice).toFixed(1),
              netgainvalue: parseInt(CalculateReturns('Popular').NetGainFromOptimization).toFixed(1),
              netgaininpercent: parseInt(CalculateReturns('Popular').FiveYearsReturnPercent).toFixed(1),
              TotalReturnsBeforeTax:parseInt(CalculateReturns('Popular').TotalRetrunBeforeTax).toFixed(1),
               capitalGainsTaxPaid:parseInt(CalculateReturns('Popular').CapitalGainsTax).toFixed(1),


              }
            : i === 3
              ? {
                  ...item,
              projectAnnualReturn: parseInt((CalculateReturns('High').TotalReturnsAfterTaxOptimized)/5).toFixed(1),
              totalassetsvalueinfiveYears: parseInt(Number(CalculateReturns('High').TotalReturnsAfterTaxOptimized) + housePrice).toFixed(1),
              netgainvalue: parseInt(CalculateReturns('High').NetGainFromOptimization).toFixed(1),
              netgaininpercent: parseInt(CalculateReturns('High').FiveYearsReturnPercent).toFixed(1),
              TotalReturnsBeforeTax:parseInt(CalculateReturns('High').TotalRetrunBeforeTax).toFixed(1),
               capitalGainsTaxPaid:parseInt(CalculateReturns('High').CapitalGainsTax).toFixed(1),


                }
               
              : item,
      ),
    );
  }, [AnnualGrowth]);

  // Calculator

  const [Margin, setMargin] = useState(60);  //This is the Margin Amount we take from the house price
  const handleMarginChange = (value) => {
    setMargin(value[0]);
  }; // this works in the margin change slider at cutom tab

  const [HELOCRate,setHELOCRate] = useState('8.75')

  const [reinvestAmount, SetReinvestAmount] = useState({
    EquityLineOfCredit: "",
    HELOCInterestPaid: "",
    AmtToReinvest: "",
  });

  useEffect(() => {
    const EquityLine = parseFloat(housePrice * (Margin / 100)).toFixed(2);
    const HELOCInterestPaid = parseFloat(
      EquityLine * (HELOCRate / 100) * 5,
    ).toFixed(2);
    const AmountReinvest = parseFloat(EquityLine - HELOCInterestPaid).toFixed(
      2,
    );

    SetReinvestAmount({
      ...reinvestAmount,
      EquityLineOfCredit: EquityLine,
      HELOCInterestPaid: HELOCInterestPaid,
      AmtToReinvest: AmountReinvest,
    });
  }, [HELOCRate, Margin, housePrice]);
 

  const [ReturnsAssets,setReturnsInAssets] = useState({
    TotalReturns:'',
    GainsTax:'',
    ReturnAfterTax:'',
    ValueOptimized:'',
    ValueNotOptimized:'',
    NetGainAfterOptimization:'',
    NetGainAfterOptimizationpercent:'',
    PortfolioGain:''
  });


  useEffect(()=>{
    const SandPAmount = reinvestAmount.AmtToReinvest * (equities / 100)
    const bondsAmount = reinvestAmount.AmtToReinvest * (bonds / 100)
    const cashAmount = reinvestAmount.AmtToReinvest * (cash / 100)
    const cryptoAmount = reinvestAmount.AmtToReinvest * (crypto / 100)


    const SandPReturn = SandPAmount * Math.pow(1 + (AnnualGrowth.sp500/100),5) - SandPAmount
    const BondsReturn = bondsAmount * Math.pow(1 + (AnnualGrowth.bonds/100),5) - bondsAmount
    const CashReturn = cashAmount * Math.pow(1.02 , 5) - cashAmount
    const CryptoReturn = cryptoAmount * Math.pow(1 + (AnnualGrowth.crypto/100),5) - cryptoAmount
    const HouseReturn = housePrice * Math.pow(1.02,5) - housePrice
   

    const TotalReturnAmount = SandPReturn + BondsReturn + CryptoReturn + CashReturn + HouseReturn
    const GainsTaxAmount =  (SandPReturn + BondsReturn + CryptoReturn + CashReturn) * (0.15)
    const GainsAfterTaxAmount = TotalReturnAmount - GainsTaxAmount;
    const ValueOptimizedAmount = housePrice + GainsAfterTaxAmount
    const ValueNotOptimizedAmount  = housePrice + HouseReturn 
    const NetGainAfterOptimizationAmount = ValueOptimizedAmount - ValueNotOptimizedAmount
    const NetGainAfterOptimizationpercent =(Math.pow( (ValueOptimizedAmount / housePrice), 0.2) - 1 ) * 100
    const PortfolioGain = SandPReturn + BondsReturn + CryptoReturn + CashReturn

    setReturnsInAssets({...ReturnsAssets,
      TotalReturns:parseFloat(TotalReturnAmount).toFixed(1),
      GainsTax:parseFloat(GainsTaxAmount).toFixed(1),
      ReturnAfterTax:parseFloat(GainsAfterTaxAmount).toFixed(1),
      ValueOptimized:parseFloat(ValueOptimizedAmount).toFixed(1),
      ValueNotOptimized:parseFloat(ValueNotOptimizedAmount).toFixed(1),
      NetGainAfterOptimization:parseFloat(NetGainAfterOptimizationAmount).toFixed(1),
      NetGainAfterOptimizationpercent:parseFloat(NetGainAfterOptimizationpercent).toFixed(1),
      PortfolioGain: parseFloat(PortfolioGain).toFixed(1)
    
    })
  },[reinvestAmount,equities,bonds,cash,crypto,AnnualGrowth])

  const projectionData = [
  { year: 2024, Portfolio: 120000, Baseline: 100000 },
  { year: 2025, Portfolio: 135000, Baseline: 102000 },
  { year: 2026, Portfolio: 152000, Baseline: 104040 },
  { year: 2027, Portfolio: 170000, Baseline: 106121 },
  { year: 2028, Portfolio: 189000, Baseline: 108243 },
];

  //  useEffect(()=>{
  //   setTimeout(()=>{
  //     setScreen(4)
  //   },10000)

  //      trackEvent("Report Generated", {
  //         location: "Report Page",
  //       })
  // },[])


 

  
   

  return (
    <div className="min-h-screen bg-[#FAFBFC] relative">
    
      {/* ----------------------------- */}

      <AnimatePresence mode="wait">
        {screen === 4 && <EmailGateScreen key="email" setScreen={setScreen} />}
        {screen === 5 && (
          <EmailFlowCloseScreen key="close" setScreen={setScreen} />
        )}
      </AnimatePresence>

      {/* ----------------------------- */}

      {/* Mesh Gradient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,91,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_80%,rgba(24,163,111,0.06)_0%,transparent_50%),radial-gradient(circle_at_50%_50%,rgba(0,91,255,0.04)_0%,transparent_50%)]"></div>
      </div>

      {/* Floating dots pattern */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      {/* ====================================================================
           SECTION 1 — HEADER WITH PROPERTY IMAGE
           ==================================================================== */}
      <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
        <ImageWithFallback
          src={HomesData?.photoUrlsHighRes?.[0]?.url}
          alt="Property"
          className="w-full h-full object-cover"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>

        {/* Logo & Timestamp */}
        <div className="absolute top-0 left-0 right-0 px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Button
            onClick={() => {
              navigate(-1);
            }}
            variant="ghost"
            className="flex items-center gap-2 text-white hover:text-white hover:bg-white/20 transition-colors text-[14px] sm:text-[15px] backdrop-blur-sm"
          >
            <ArrowLeft size={18} />
            <span className="hidden sm:inline">Back</span>
          </Button>
          <div className="text-white text-[11px] sm:text-[12px] backdrop-blur-sm bg-black/20 px-3 py-1.5 rounded-full">
            Report Generated:{" "}
            {new Date().toLocaleDateString("en-us", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>

        {/* Overlay Text */}
        <div className="absolute bottom-8 left-4 sm:left-6 lg:left-8 right-4 text-white">
          <h1 className="text-white text-[32px] sm:text-[42px] lg:text-[52px] font-medium tracking-tight mb-2 capitalize">
            {address}
          </h1>
          <p className="text-[16px] sm:text-[20px] text-white/90 mb-2 capitalize">
            See your property's true financial power.
          </p>
        </div>
      </div>

      {/* Property Address */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl relative">
        <div className="flex flex-col gap-[.5rem]">
          <p className="text-[12px] text-[#6a6a6a]">
            {aiResponse?.propertyDescription?.description}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 relative flex flex-col gap-[1rem]">
        <div
          className={`flex items-center gap-5 px-3 sm:px-3 py-2 sm:py-2 bg-white hover:bg-[#F7F7F7] border border-black/[0.06] rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] text-[#6A6A6A]  shadow-[0_2px_4px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.04)]] overflow-x-scroll`}
          style={{ scrollbarWidth: "none" }}
        >
          {ReportNavButtons?.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() => {
                  setSelectedButton(item.name);
                }}
                className={`
                  ${
                    state?.state?.data?.data?.zestimate === null &&
                    item.name === "Buy/Sell/Hold Intelligence" &&
                    "hidden"
                  }
                  ${
                    item.name === selectedButton
                      ? "bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white rounded-md py-1.5 sm:py-1 px-2 sm:px-3 transition-all duration-[300]"
                      : "border-r pr-4 border-[#6A6A6A]"
                  } whitespace-nowrap`}
              >
                {item.name}
              </button>
            );
          })}
        </div>

        {selectedButton === "Summary" && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-black tracking-tight mb-2">
                  Executive Summary
                </h1>
                <p className="text-sm md:text-base text-[#6A6A6A] font-medium">
                  Your personalised property intelligence report
                </p>
              </div>
            </div>

            {/* Top Row Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-2">
              {/* Current Value Card */}
              <Card className="flex flex-col justify-between h-full w-full relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#005BFF]/10 to-transparent rounded-bl-[100px] -mr-8 -mt-8" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Home size={18} className="text-[#005BFF]" />
                    <span className="text-xs font-bold text-[#6A6A6A] uppercase tracking-wider">
                      Current Value
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-[#0b85ff] tracking-tighter mb-1">
                    <CountUp value={HomesData?.price} prefix="$" />
                  </div>
                  {state?.state?.data?.data?.zestimate !== null && (
                    <div className="flex items-center gap-2 text-sm">
                      {(AnnualGrowth?.house / 5)?.toFixed(2) > 0 && (
                        <span className="bg-green-50 text-[#18A36F] px-2 py-0.5 rounded font-bold text-xs flex items-center gap-1">
                          <TrendingUp size={12} /> +$
                          {Math.abs(AnnualGrowth?.house / 5)?.toFixed(2)}
                        </span>
                      )}
                      {(AnnualGrowth?.house / 5)?.toFixed(2) < 0 && (
                        <span className="bg-red-50 text-[red] px-2 py-0.5 rounded font-bold text-xs flex items-center gap-1">
                          <TrendingDown size={12} /> -
                          {Math.abs((AnnualGrowth?.house / 5)?.toFixed(2))}%
                        </span>
                      )}
                      <span className="text-[#6A6A6A]">
                        YoY{" "}
                        {`${(AnnualGrowth?.house / 5)?.toFixed(2) > 0 ? "Appreciation" : "Depreciation"}  `}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-6 pt-6 border-t border-dashed border-gray-200">
                  {state?.state?.data?.data?.zestimate !== null && (
                    <div className="flex justify-between text-sm">
                      <span className="text-[#6A6A6A]">
                        1-Year
                        {(AnnualGrowth?.house / 5)?.toFixed(2) > 0
                          ? " Gain"
                          : " Loss"}
                      </span>
                      <span className="font-bold">
                        {(AnnualGrowth?.house / 5)?.toFixed(2) > 0 ? "+" : "-"}$
                        {parseInt(
                          Math.abs(housePrice * (AnnualGrowth?.house / 5)) / 100,
                        ).toLocaleString("en-us")}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-[#6A6A6A]">Unlockable Equity</span>
                    <span className="font-bold text-[#005BFF]">
                      <CountUp value={housePrice * 0.5} prefix="$" />
                    </span>
                  </div>
                </div>
              </Card>

              {/* Total Opportunity Card */}
              <Card className="flex w-full flex-col justify-between h-full relative overflow-hidden ring-1 ring-[#18A36F]/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#18A36F]/10 to-transparent rounded-bl-[100px] -mr-8 -mt-8" />
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <Activity size={18} className="text-[#18A36F]" />
                    <span className="text-xs font-bold text-[#18A36F] uppercase tracking-wider">
                      Total Opportunity
                    </span>
                  </div>
                  <div className="text-4xl font-bold text-[#18A36F] tracking-tighter mb-1">
                    <CountUp
                      value={PortfolioOptions?.filter((item)=>item.value === 'Popular')?.[0].TotalReturnsBeforeTax}
                      prefix="+$"
                    />
                  </div>
                  <p className="text-xs text-[#6A6A6A] mt-2 leading-relaxed max-w-[80%]">
                    Total 5-year value across all optimisation strategies.
                    <span className="block mt-1 text-[10px] opacity-70">
                      (Before Taxes & Capital Cost)
                    </span>
                  </p>
                </div>
                <div className="mt-6">
                  <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-[#18A36F] h-full rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-[#6A6A6A] mt-2 font-bold uppercase tracking-wider">
                    <span>Potential Realized</span>
                    <span>75%</span>
                  </div>
                </div>
              </Card>

              {/* Recommendation Card */}
              <Card className="flex flex-col h-full bg-[#0A2540] text-white">
                <div className="flex items-start justify-between mb-4 ">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Layers size={18} className="text-[#005BFF]" />
                      <span className="text-xs font-bold text-[#005BFF] uppercase tracking-wider">
                        Our Recommendation
                      </span>
                    </div>
                    {/* <h3 className="text-lg text-black font-bold">Deployment Strategy</h3> */}
                  </div>
                  <Badge color="blue">Top Pick</Badge>
                </div>

                <div className="flex-1 flex flex-col items-center justify-between gap-4 ">
                <div className = 'flex items-center  w-full'>
                    <div
                    className="w-[60%]  h-[120px] relative "
                    style={{ minHeight: "96px", minWidth: "96px" }}
                  >
                    {/* <Pie data={data} options={options}/> */}
                    <Doughnut data={data} options={options} />
                  </div>
                  <div>
                       <div className="w-full flex flex-col justify-center space-y-1 ">
                    {[
                      {
                        name: "S&P 500",
                        value: `${getAllocation('Popular').sp500}%`,
                        return: `${AnnualGrowth?.sp500}%`,
                        color: "#2A69DB",
                        bgcolor: "#2A69DB33",
                        code: (
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8346 4.27637L7.8763 9.2347L4.95964 6.31803L1.16797 10.1097"
                              stroke="#2A69DB"
                              stroke-width="1.16667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.33203 4.27637H12.832V7.77637"
                              stroke="#2A69DB"
                              stroke-width="1.16667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Bonds",
                        value: `${getAllocation('Popular').bonds}%`,
                        return: `${AnnualGrowth?.bonds}%`,
                        color: "#6DBFD5",
                        bgcolor: "#6DBFD533",
                        code: (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.5 17.838C19.5305 17.6867 20.2627 17.3941 20.8284 16.8284C22 15.6569 22 13.7712 22 10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H10C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10C2 13.7712 2 15.6569 3.17157 16.8284C3.97975 17.6366 5.1277 17.8873 7 17.965"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M17 7H7"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.5 14.5C14.5 15.8807 13.3807 17 12 17C10.6193 17 9.5 15.8807 9.5 14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5Z"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                            />
                            <path
                              d="M9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L15.25 20L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Crypto",
                        value: `${getAllocation('Popular').crypto}%`,
                        return: `${AnnualGrowth?.crypto}%`,
                        color: "#F7C34C",
                        bgcolor: "#F7C34C33",
                        code: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FF6F00"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-bitcoin-icon lucide-bitcoin"
                          >
                            <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
                          </svg>
                        ),
                      },
                      {
                        name: "Cash",
                        value: `${getAllocation('Popular').cash}%`,
                        return: `${AnnualGrowth?.cash}%`,
                        color: "#3C998F",
                        bgcolor: "#3C998F33",
                        code: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3C998F"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-dollar-sign-icon lucide-dollar-sign"
                          >
                            <line x1="12" x2="12" y1="2" y2="22" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        ),
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-center justify-between gap-4  w-full  cursor-default"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className='h-[8px] rounded-md w-[20px] bg-[red]' style = {{backgroundColor:item.color}}>  

                          </div>
                        
                          <div>
                            <div className="font-medium text-[12px] text-black">
                              {item.name}
                            </div>
                            {/* <div className="text-[10px] text-[#6A6A6A] font-medium">Target Allocation</div> */}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-8">
                          <div className="text-right">
                            <div className="font-medium text-[13px] text-black tracking-tight">
                              {item.value}
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    ))}
                  </div>
                  </div>
                </div>
                  <div>
                    <div className="text-xs text-gray-400">
                      <span className="text-sm font-bold tracking-tight">
                        ~{PortfolioOptions?.filter((item)=>item.value === 'Popular')?.[0].netgaininpercent}%{" "}
                      </span>
                      More growth potential with
                      <span className="text-sm font-bold text-[#18A36F] tracking-tight">
                        {" "}
                        ~{(PortfolioOptions?.filter((item)=>item.value === 'Popular')?.[0].netgaininpercent)/5}%{" "}
                      </span>
                      <span className="text-xs text-gray-400">
                        Annual returns
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex flex-col lg:flex-row items-stretch gap-2 ">
              <div className="max-[1100px]:w-[100%] w-[50%] flex flex-col gap-2 justify-between ">
                {/* Property Details */}
                <div className="grid grid-cols-2 gap-2.5 sm:gap-3 ">
                  <div className="p-1.5 sm:px-3 sm:py-2 rounded-lg bg-gradient-to-br from-[#FAFBFC] to-white border border-black/[0.06]">
                    <div className="text-[#6A6A6A] text-[10px] sm:text-[11px] mb-1">
                      Square Feet
                    </div>
                    <div className="text-black text-[14px] sm:text-[16px] font-medium">
                      {state.state?.data?.data?.resoFacts?.pricePerSquareFoot}
                      /sq.ft
                    </div>
                  </div>
                  <div className="p-1.5 sm:px-3 sm:py-2 rounded-lg bg-gradient-to-br from-[#FAFBFC] to-white border border-black/[0.06]">
                    <div className="text-[#6A6A6A] text-[10px] sm:text-[11px] mb-1">
                      Year Built
                    </div>
                    <div className="text-black text-[14px] sm:text-[16px] font-medium">
                      {state.state?.data?.data?.resoFacts?.yearBuilt}
                    </div>
                  </div>
                </div>

                <div className="h-full flex flex-col justify-between gap-2 p-2 sm:p-5 bg-[white] rounded-xl">
                  <div className="px-6 py-3 border-b border-black/[0.06] bg-gradient-to-r from-[#FAFBFC] to-white">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-[#005BFF]/10">
                        <BarChart3 className="text-[#005BFF]" size={18} />
                      </div>
                      <h2 className="text-black text-[18px] sm:text-[20px] font-medium tracking-tight">
                        Price Per Square Foot Comparison
                      </h2>
                    </div>
                  </div>

                  <div className="space-y-3 flex flex-wrap max-[600px]:flex-col items-stretch justify-between">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-[#EFF6FF] border border-[#BEDBFF] hover:border-[#BEDBFF]/20 transition-all duration-200 group w-[49%] max-[600px]:w-full h-[92px]">
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col gap-1">
                          <p className="text-black text-[16px] font-medium">
                            {HomesData?.resoFacts?.pricePerSquareFoot}/sq.ft
                          </p>

                          <p className="text-black/80 text-[10px] font-medium">
                            Subject Property
                          </p>
                        </div>
                      </div>
                    </div>

                    {Array.isArray(similarHomes) &&
                      similarHomes?.slice(0, 3).map((comp, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#FAFBFC] to-white border border-black/[0.06] hover:border-[#005BFF]/20 transition-all duration-200 group w-[49%] max-[600px]:w-full h-[92px]"
                        >
                          <div className="flex items-center justify-between  w-full gap-3">
                            <div className="flex flex-col gap-1">
                              <p className="text-black text-[16px] font-medium">
                                {parseInt(comp.price / comp.livingArea)}/sq.ft
                              </p>

                              <p className="text-black/80 text-[10px] ">
                                {comp.address.streetAddress +
                                  ", " +
                                  comp.address.city +
                                  ", " +
                                  comp.address.state +
                                  ", " +
                                  comp.address.zipcode}
                              </p>
                            </div>

                            <div
                              className={`p-2 rounded-lg  transition-colors ${
                                idx === 0 && "bg-[#07A28733] text-[#07A287]"
                              } ${idx === 1 && "bg-[#F93F631A] text-[#F93F63]"} ${
                                idx === 2 && "bg-[#005BFF33] text-[#005BFF]"
                              } `}
                            >
                              <MapPin size={14} />
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              {/* <div className="max-[1100px]:w-[100%] w-[50%] flex flex-col gap-2">
            

              <div className="flex flex-col gap-2 bg-[white] h-full  border-2 border-[#fff]/30 rounded-xl">
                <div className="flex flex-col  gap-6 items-stretch justify-center h-full ">
                 
             
                 <div>
                 
        

                   <div className="h-full relative p-4 sm:p-5   text-white flex flex-col gap-[8px]">
                
                  <div className="text-black/80 text-[11px] uppercase tracking-wide flex items-center gap-4 justify-between">
                    Our Recommendation
                   
                <div 
                onClick={()=>{setparallelEnginesPopup(!parallelEnginesPopup)}}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md  text-[11px] font-medium  border border-[#18A36F]/20  bg-gradient-to-r from-[#18A36F]/10 to-[#18A36F]/5 text-[#18A36F] cursor-pointer ">
                  
                  <span>How LIAM Calculates this ?</span>

                </div>
             
                  </div>
                  <div className="text-black text-[20px] sm:text-[24px] font-semibold">
                  Deployment Strategy
                  </div>
                  <div className="text-black/90 text-[10px] sm:text-[10px] capitalize flex flex-col gap-[12px]">
                   <p>
                    ~ {parseFloat(growth?.highGrowth)?.toFixed(2)}% more growth potential with ~ {parseFloat(growth?.highGrowth / 5) ?.toFixed(2)}% annual returns
                   </p>
                   <p className='font-medium text-black/60 text-[16px] '>
                    Investing in
                   </p>
                  

              

                   <div className=' flex items-center justify-center w-full gap-2 '>
                   <div className = 'w-[50%] h-full  flex flex-1 items-center justify-center  '>
                     <Pie data={data} options={options}/>
                   </div>
                  

                      <div className="flex-1 flex flex-col justify-between space-y-3 h-full">
                     {[
                        { name: 'S&P 500', value: '49%', return: '9.03%', color: COLORS.sp500, code: 'VOO' },
                        { name: 'Bonds', value: '21%', return: '-3.81%', color: COLORS.bonds, code: 'TLT' },
                        { name: 'Crypto', value: '29%', return: '13.37%', color: COLORS.crypto, code: 'BTC' },
                        { name: 'Cash', value: '5%', return: '2.00%', color: COLORS.cash, code: 'USD' },
                     ].map((item, i) => (
                        <div key={i} className="group flex items-center justify-between p-3 md:py-2 md:px-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005BFF]/20 transition-all cursor-default">
                           <div className="flex items-center gap-3 md:gap-4">
                              <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[10px] font-bold shadow-sm shrink-0" style={{ backgroundColor: item.color }}>
                                {item.code}
                              </div>
                              <div>
                                <div className="font-bold text-xs text-black  w-14">{item.name}</div>
                               
                              </div>
                           </div>
                            <div className="text-left w-6 ">
                                 <div className="font-bold text-[13px] text-black tracking-tight">{item.value}</div>
                              </div>
                           
                           <div className="flex items-center gap-3 md:gap-8">
                             
                              <div className="text-right w-16 md:w-13 ">
                                 <div className={`font-bold text-[10px] ${item.return.includes('-') ? 'text-red-500' : 'text-[#18A36F]'}`}>
                                    {item.return}
                                 </div>
                                 <div className="text-[8px] text-[#6A6A6A] uppercase font-bold">Ann. Rtn</div>
                              </div>
                           </div>
                        </div>
                     ))}
                  </div>
                    </div>
                      

                  </div>
                </div>
                 </div>
                </div>

               
              </div>

           
            </div> */}

              <div className="max-[1100px]:w-[100%] w-[50%] flex flex-col gap-2">
                <Card className="flex flex-col">
                  <div className="mb-6 flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-bold text-black flex items-center gap-2">
                        <PieChart size={18} className="text-[#005BFF]" />
                        Asset Allocation
                      </h3>
                      <div className="text-xs text-[#6A6A6A] font-medium mt-1">
                        Recommended split based on strategy
                      </div>
                    </div>
                    <button
                      onClick={() => {
                      setSelectedButton('Equity/Growth Comparison')
                    setActiveButton('Custom')
                    setSelectedPortfolio(PortfolioOptions[4])
                       
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-[#005BFF] hover:underline"
                    >
                      Edit Strategy
                    </button>
                  </div>

                  <div className="flex-1 flex flex-col justify-center space-y-3">
                    {[
                      {
                        name: "S&P 500",
                        value: `${getAllocation('Popular').sp500}%`,
                        return: `${AnnualGrowth?.sp500}%`,
                        color: "#2A69DB",
                        bgcolor: "#2A69DB33",
                        code: (
                          <svg
                            width="17"
                            height="17"
                            viewBox="0 0 14 14"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M12.8346 4.27637L7.8763 9.2347L4.95964 6.31803L1.16797 10.1097"
                              stroke="#2A69DB"
                              stroke-width="1.16667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M9.33203 4.27637H12.832V7.77637"
                              stroke="#2A69DB"
                              stroke-width="1.16667"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Bonds",
                        value: `${getAllocation('Popular').bonds}%`,
                        return: `${AnnualGrowth?.bonds}%`,
                        color: "#6DBFD5",
                        bgcolor: "#6DBFD533",
                        code: (
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.5 17.838C19.5305 17.6867 20.2627 17.3941 20.8284 16.8284C22 15.6569 22 13.7712 22 10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H10C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10C2 13.7712 2 15.6569 3.17157 16.8284C3.97975 17.6366 5.1277 17.8873 7 17.965"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                              stroke-linecap="round"
                            />
                            <path
                              d="M17 7H7"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                            <path
                              d="M14.5 14.5C14.5 15.8807 13.3807 17 12 17C10.6193 17 9.5 15.8807 9.5 14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5Z"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                            />
                            <path
                              d="M9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L15.25 20L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471"
                              stroke="#6DBFD5"
                              stroke-width="1.5"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            />
                          </svg>
                        ),
                      },
                      {
                        name: "Crypto",
                        value: `${getAllocation('Popular').crypto}%`,
                        return: `${AnnualGrowth?.crypto}%`,
                        color: "#F7C34C",
                        bgcolor: "#F7C34C33",
                        code: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#FF6F00"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-bitcoin-icon lucide-bitcoin"
                          >
                            <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727" />
                          </svg>
                        ),
                      },
                      {
                        name: "Cash",
                        value: `${getAllocation('Popular').cash}%`,
                        return: `${AnnualGrowth?.cash}%`,
                        color: "#3C998F",
                        bgcolor: "#3C998F33",
                        code: (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="17"
                            height="17"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#3C998F"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide lucide-dollar-sign-icon lucide-dollar-sign"
                          >
                            <line x1="12" x2="12" y1="2" y2="22" />
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                          </svg>
                        ),
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="group flex items-center justify-between p-3 md:p-3 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#005BFF]/20 transition-all cursor-default"
                      >
                        <div className="flex items-center gap-3 md:gap-4">
                          <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0 "
                            style={{ backgroundColor: item.bgcolor }}
                          >
                            {item.code}
                          </div>
                          <div>
                            <div className="font-bold text-sm text-black">
                              {item.name}
                            </div>
                            {/* <div className="text-[10px] text-[#6A6A6A] font-medium">Target Allocation</div> */}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-8">
                          <div className="text-right">
                            <div className="font-bold text-lg text-black tracking-tight">
                              {item.value}
                            </div>
                          </div>
                          <div className="text-right w-16 md:w-20">
                            <div
                              className={`font-bold text-sm ${item.return.includes("-") ? "text-red-500" : "text-[#18A36F]"}`}
                            >
                              {item.return}
                            </div>
                            <div className="text-[9px] text-[#6A6A6A] uppercase font-bold">
                              Ann. Rtn
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
            {/* Data Attribution */}

            <button
              onClick={onShowMethodology}
              className="w-full p-4 rounded-lg bg-gradient-to-br from-[white] to-white shadow-sm transition-all duration-200 group/method"
            >
              <div className="flex items-center justify-between h-full">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded bg-[#005BFF]/10">
                    <FileCheck className="text-[#005BFF]" size={24} />
                  </div>
                  <div className="text-left">
                    <div className="text-black text-[15px] font-medium">
                      How We Calculated This
                    </div>
                    <div className="text-[#6A6A6A] text-[10px]">
                      MLS Data • Public Records • AI Valuation Model
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className="text-[#005BFF] group-hover/method:translate-x-0.5 transition-transform"
                  size={16}
                />
              </div>
            </button>
          </div>
        )}

        {/* {selectedButton === "Equity/Growth Comparison" && (
        
             
                 <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto mb-8">
               <h2 className="text-3xl font-bold text-black mb-3">Equity Unlock Growth Comparison</h2>
               <p className="text-[#6A6A6A]">
                  How unlocking part of your home's equity compares to keeping it all in your property. 
                  Based on historical performance benchmarks.
               </p>
            </div>

          
            <div className="flex justify-center mb-8">
               <div className="inline-flex bg-gray-100 p-1 rounded-xl border border-gray-200">
                  {PortfolioOptions?.map((item,i) => (
                     <button
                        key={i}
                        onClick={() => {
                           setSelectedPortfolio(item);
                        setActiveButton(item.value);
                        }}
                        className={`px-6 py-2.5 rounded-[10px] text-sm font-bold capitalize transition-all ${
                         selectedPortfolio.value === item.value 
                              ? 'bg-white text-black shadow-sm ring-1 ring-black/[0.04]' 
                              : 'text-[#6A6A6A] hover:text-black'
                        }`}
                     >
                        {item.value}
                     </button>
                  ))}
               </div>
            </div>
            </div>
              {activeButton !== "Baseline" && activeButton !== 'Custom' ? (
                <div
                  className={`border rounded-b-lg pt-0 bg-white  ${selectedPortfolio?.borderColor}`}
                >
                  <div
                    className={`border-b flex flex-col md:flex-row items-center justify-between py-2 px-4 ${selectedPortfolio?.borderColor}`}
                  >
                    <div className='flex flex-col gap-1'>
                      <h3
                        className={` text-[14px] sm:text-[15px] font-medium text-black`}
                      >
                        Strategy Is Dynamic - Not Fixed
                      </h3>
<div className="text-[#6A6A6A] text-[10px] uppercase tracking-wide font-medium mb-2 capitalize">
                     Your allocation may changed based on market conditions,riskprofile,and our AI deployment Model
                    </div>
                    </div>
                    <div
                      className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium ${selectedPortfolio?.gradientBg} ${selectedPortfolio?.textColor}`}
                    >
                      {selectedPortfolio?.icon}
                      {selectedPortfolio?.Risk}
                    </div>
                  </div>

                  <div className="py-2 px-4 flex flex-col gap-2">
                    <div className=" flex items-center justify-between w-full ">
                      <h3
                        className={` text-[14px] sm:text-[15px] font-medium text-black`}
                      >
                        {selectedPortfolio?.name}
                      </h3>
                      <div
                        className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-medium ${selectedPortfolio?.gradientBg} ${selectedPortfolio?.textColor}`}
                      >
                        <span className="text-[16px] font-bold">
                          {selectedPortfolio?.annualReturn} %
                        </span>
                        Annual Return
                      </div>
                    </div>

                    <div className="text-[#6A6A6A] text-[10px] uppercase tracking-wide font-medium mb-2">
                      Portfolio Mix
                    </div>

   
                
                


                
                       <div className='flex flex-col sm:flex-row gap-2'>
                      <div className='flex items-center justify-center gap-2 w-full'>
                        <div className='w-full rounded-[6px] px-[6px] py-[10px] flex items-center justify-between border-[0.5px] border-[#3F4254] bg-gradient-to-br from-gray-200 to-[#FFFFFF] text-[#3F4254]'>
                            <div className='font-medium text-[12px] sm:text-[16px] flex items-center gap-2'>
                              <svg width="17" height="17" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.8346 4.27637L7.8763 9.2347L4.95964 6.31803L1.16797 10.1097" stroke="#3F4254" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M9.33203 4.27637H12.832V7.77637" stroke="#3F4254" stroke-width="1.16667" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                             <div className='flex flex-col gap-[2px]'>
                              S&P 500
                              <span className='font-medium text-[8px] sm:text-[12px]'>(Range ~40-50% )</span>
                             </div>
                            </div>
                            <div className='flex flex-col items-center '>
                              <p className='font-semibold text-[#18A36F] text-[14px] sm:text-[16px]'>{selectedPortfolio.SandP}</p>
                              <span className='font-medium text-[8px] sm:text-[12px]'>(~{AnnualGrowth?.SandP} % P.A.)</span>
                            </div>
                        </div>
                        <div className='w-full rounded-[6px] px-[6px] py-[10px] flex items-center justify-between border-[0.5px] border-[#3F4254] bg-gradient-to-br from-gray-200 to-[#FFFFFF] text-[#3F4254]'>
                          <div className='font-medium text-[12px] sm:text-[16px] flex items-center gap-2'>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5 17.838C19.5305 17.6867 20.2627 17.3941 20.8284 16.8284C22 15.6569 22 13.7712 22 10C22 6.22876 22 4.34315 20.8284 3.17157C19.6569 2 17.7712 2 14 2H10C6.22876 2 4.34315 2 3.17157 3.17157C2 4.34315 2 6.22876 2 10C2 13.7712 2 15.6569 3.17157 16.8284C3.97975 17.6366 5.1277 17.8873 7 17.965" stroke="#141B34" stroke-width="1.5" stroke-linecap="round"/>
<path d="M17 7H7" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.5 14.5C14.5 15.8807 13.3807 17 12 17C10.6193 17 9.5 15.8807 9.5 14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5Z" stroke="#141B34" stroke-width="1.5"/>
<path d="M9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L15.25 20L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471" stroke="#141B34" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>



                             

                              <div className='flex flex-col gap-[2px]'>
                              Bonds
                              <span className='font-medium text-[8px] sm:text-[12px]'>(Range ~10-50% )</span>
                             </div>
                            </div>
                            <div className='flex flex-col items-center '>
                              <p className='font-semibold text-[#18A36F] text-[14px] sm:text-[16px]'>{selectedPortfolio.bonds}</p>
                              <span className='font-medium text-[8px] sm:text-[12px]'>(~{AnnualGrowth?.Bonds} % P.A.)</span>
                            </div>
                        </div>
                      </div>
                      <div className='flex items-center justify-center gap-2 w-full'>
                         <div className='w-full rounded-[6px] px-[6px] py-[10px] flex items-center justify-between border-[0.5px] border-[#3F4254] bg-gradient-to-br from-gray-200 to-[#FFFFFF] text-[#3F4254]'>
                          <div className='font-medium text-[12px] sm:text-[16px] flex items-center gap-1'>
                             <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-bitcoin-icon lucide-bitcoin"><path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"/></svg>

                               <div className='flex flex-col gap-[2px]'>
                              Crypto
                              <span className='font-medium text-[8px] sm:text-[12px]'>(Range ~10-40% )</span>
                             </div>
                            </div>
                            <div className='flex flex-col items-center '>
                              <p className='font-semibold text-[#18A36F] text-[14px] sm:text-[16px]'>{selectedPortfolio.bitcoin}</p>
                              <span className='font-medium text-[8px] sm:text-[12px]'>(~{AnnualGrowth?.Bitcoin} % P.A.)</span>
                            </div>
                        </div>
                        <div className='w-full rounded-[6px] px-[6px] py-[10px] flex items-center justify-between border-[0.5px] border-[#3F4254] bg-gradient-to-br from-gray-200 to-[#FFFFFF] text-[#3F4254]'>
                          <div className='font-medium text-[12px] sm:text-[16px] flex items-center gap-1'>
                             <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-dollar-sign-icon lucide-dollar-sign"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>

                               <div className='flex flex-col gap-[2px]'>
                              Cash
                              <span className='font-medium text-[8px] sm:text-[12px]'>(Range ~5-15% )</span>
                             </div>
                            </div>
                            <div className='flex flex-col items-center '>
                              <p className='font-semibold text-[#18A36F] text-[14px] sm:text-[16px]'>{selectedPortfolio.cash}</p>
                              <span className='font-medium text-[8px] sm:text-[12px]'>(~2 % P.A.)</span>
                            </div>
                        </div>
                      </div>
                   </div>

                    <div className="flex items-stretch gap-2">
                      <div className="relative p-4 sm:p-5 rounded-xl bg-[#0157F2] border-2 border-[#005BFF]/20 w-full">
                        <div className="absolute top-3 right-5.5">
                          <Home className="text-[white]" size={16} />
                        </div>
                        <div className="text-white text-[11px] uppercase tracking-wide mb-2">
                          Total in 5 Years
                        </div>
                        <div className="text-white text-[24px] sm:text-[28px] font-medium mb-1 flex items-center justify-between">
                          {selectedPortfolio?.totalinfiveYears.toLocaleString(
                            "en-us"
                          )}

                          <span 
                           onClick={()=>{setparallelEnginesPopup(!parallelEnginesPopup)}}
                          className='max-sm:hidden'> <Calculator size={20} /></span>
                        </div>
                      </div>

                      <div className="relative p-4 sm:p-5 rounded-xl bg-[#18A36F] border-2 border-[#18A36F]/20 w-full">
                        <div className="absolute top-3 right-3">
                          <TrendingUp className="text-[#18A36F]" size={16} />
                        </div>
                        <div className="flex items-center gap-1.5 mb-2">
                          <div className="text-white text-[11px] uppercase tracking-wide flex justify-between w-full">
                            Your Gain
                            <span>+ {selectedPortfolio?.gaininpercent} %</span>
                          </div>
                        </div>
                        <div className="text-white text-[24px] sm:text-[28px] font-medium mb-1">
                          ${" "}
                          {selectedPortfolio?.gainvalue.toLocaleString("en-us")}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-4 rounded-xl bg-gradient-to-br from-[#005BFF]/5 to-white border border-[#005BFF]/20 flex items-center justify-between flex-col md:flex-row gap-2">
                      <div className="flex items-start gap-3 w-full md:w-[70%] ">
                        <div className="p-1.5 rounded-lg bg-[#005BFF]/10 flex-shrink-0">
                          <Info className="text-[#005BFF]" size={14} />
                        </div>
                        <div className='flex flex-col '>
                          <p className="text-black text-[14px] sm:text-[15px] font-medium mb-1">
                            What is "Equity Unlock"?
                          </p>
                          <p className="text-[#6A6A6A] text-[11px] leading-relaxed ">
                            Instead of keeping all your wealth locked in your
                            home (which grows at ~3-4% annually), you can access
                            some equity through a HELOC or refinance, then
                            invest it in diversified portfolios potentially
                            earning 6-10% returns. You keep your home while your
                            money works harder.
                          </p>
                        </div>
                      </div>
                      <Button
                onClick={() => {
                  window.scrollTo(0,0)    
                 setScreen(4)
                  setSelectedButton('Equity/Growth Comparison')
                }}
                className="  bg-gradient-to-r from-[#18A36F] to-[#18A36F] text-white px-6 py-4 rounded-xl text-[15px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Apply this Strategy 
                <ChevronRight size={18} />
              </Button>
                    </div>

                    
                  </div>
                </div>
              ) : activeButton !=='Baseline' && activeButton ==='Custom' ?
              (
                <div className="bg-white py-8 px-4 border border-[#cfcfd7] rounded-b-lg flex flex-col  gap-4">
                 <div className='flex flex-col gap-4 w-full'>
                   <div className='flex flex-col gap-4 w-full'>
                   <div className='flex items-center justify-between'>
                       <div className = 'flex flex-col gap-1'>
                       <h3
                        className={` text-[14px] sm:text-[15px] font-medium text-black`}
                      >
                        {selectedPortfolio?.name}
                      </h3>
  <div className="text-[#6A6A6A] text-[10px] uppercase tracking-wide font-medium ">
                     How much could you realistically access?
                      </div>
                    </div>

                     <div 
                onClick={()=>{setparallelEnginesPopup(!parallelEnginesPopup)}}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-md  text-[11px] font-medium  border border-[#18A36F]/20  bg-gradient-to-r from-[#18A36F]/10 to-[#18A36F]/5 text-[#18A36F] cursor-pointer ">
                  
                  <span>How LIAM Calculates this ?</span>

                </div>
                   </div>

                    <div className = 'flex flex-col gap-1 rounded-md py-[6px] px-[12px] border border-[#D1D5DC] w-full'>
                    
                        <div className='py-3 flex flex-col gap-3'>
            <div className="flex items-center justify-between ">
              <div className="flex items-center gap-2">
                <Label className="text-[12px] md:text-[14px]">Unlocked Equity</Label>
                <TooltipProvider>
                  <TooltipFig>
                    <TooltipTrigger>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">What Percent You Have Unlocked Of Your Property</p>
                    </TooltipContent>
                  </TooltipFig>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-gray-900">{Margin}%</span>
            </div>
            <Slider
              value={[Margin]}
              onValueChange={handleMarginChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

                    </div>

                    <div className='flex flex-col gap-[14px]'>
                       

                       
                        
                        <div className='w-full flex  gap-[14px]'>
                         
                            <div className = 'flex flex-col gap-1 rounded-md py-[6px] px-[12px] border border-[#D1D5DC] w-full'>
                      <p className = 'text-[12px] text-[#6A6A6A]'>
                       Prime Rate
                        
                      </p>
                      
                                          <input 
                                          value={DeductionRates.PrimeRates}
                                          onChange={(e)=>{setDeductionRates({...DeductionRates,PrimeRates:e.target.value})}}
                                          className='text-[16px] text-[#000000] font-semibold outline-none'/>


                    </div>
                    <div className = 'flex flex-col gap-1 rounded-md py-[6px] px-[12px] border border-[#D1D5DC] w-full'>
                      <p className = 'text-[12px] text-[#6A6A6A]'>
                        Spread to HELOC
                        
                      </p>
                      
                     <input
                      value={DeductionRates.SpreadtoHELOC}
                      onChange={(e)=>{setDeductionRates({...DeductionRates,SpreadtoHELOC:e.target.value})}}
                      className='text-[16px] text-[#000000] font-semibold outline-none'/>

                    </div>
                     <div className = 'flex flex-col gap-1 rounded-md py-[6px] px-[12px] border border-[#D1D5DC] w-full'>
                      <p className = 'text-[12px] text-[#6A6A6A]'>
                       HELOC Rate
                        
                      </p>
                      
                                          <p
                                          
                                          className='text-[16px] text-[#000000] font-semibold outline-none'>{DeductionRates.HELOCrate}</p>


                    </div>
                    
                        
                         

                        </div>
                    </div>
                  
                  </div>

                    <div className='border-[1px] rounded-md border-[#18A36F80] bg-gradient-to-br from-[#18A36F]/20 to-transparent w-full h-fit flex items-center justify-between'>
                      <div className='py-[8px] sm:py-[16px] px-[6px] sm:px-[16px] '>
                        <h1 className='text-[10px] sm:text-[13px] font-semibold'>Equity Line Of Credit</h1>
                        <div className='flex items-baseline gap-4'>
                          <h1 className='font-semibold text-[18px] sm:text-[24px] text-[#18A36F]'>$ {parseInt(reinvestAmount.EquityLineOfCredit).toLocaleString('en-us')}</h1> 
                        </div>
                      </div>
                      <div className='py-[8px] sm:py-[16px] px-[6px] sm:px-[16px] '>
                        <h1 className='text-[10px] sm:text-[13px]  text-[#000000CC]'>HELOC Interest Paid</h1>
                        <div className='flex items-baseline gap-4'>
                          <h1 className='font-semibold text-[18px] sm:text-[24px]'>$ {parseInt(reinvestAmount.HELOCInterestPaid).toLocaleString('en-us')}</h1> 
                        </div>
                      </div>
                      <div className='py-[8px] sm:py-[16px] px-[6px] sm:px-[16px] '>
                        <h1 className='text-[10px] sm:text-[13px]  text-[#000000CC]'>Reinvestment Amount</h1>
                        <div className='flex items-baseline gap-4'>
                          <h1 className='font-semibold text-[18px] sm:text-[24px]'>$ {parseInt(reinvestAmount.AmtToReinvest).toLocaleString('en-us')}</h1> 
                        </div>
                      </div>
                    

                    </div>
                 </div>

                 <div>
                         <div className='flex items-center justify-center '>
                          <CustomTab reinvestAmount={reinvestAmount.AmtToReinvest} annualGrowth = {AnnualGrowth} housePrice = {housePrice} />
                         </div>

                 </div>
                </div>
              ):
               (
                <div className="bg-white py-2 px-4 border border-[#cfcfd7] rounded-b-lg flex flex-col gap-4">
                  <div className="flex-col flex gap-1">
                    <div className="f flex  items-center justify-between ">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="p-1.5 sm:p-2 rounded-lg bg-[#6A6A6A]/10">
                          <Home className="text-[#6A6A6A]" size={16} />
                        </div>
                        <h3 className="text-black text-[14px] sm:text-[15px] font-medium">
                          Baseline
                        </h3>
                      </div>
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#6A6A6A]/10 text-[#6A6A6A] rounded-lg text-[10px] font-medium">
                        <Clock size={10} />
                        Do Nothing (Keep Equity in Home)
                      </div>
                    </div>
                    <p className="text-[#6A6A6A] text-[11px] leading-relaxed">
                      Your home{" "}
                      {growth?.baseGrowth > 0 ? "appreciates" : "depreciates"}{" "}
                      at typical {(growth?.baseGrowth / 5)?.toFixed(2)}%
                      annually, but your equity isn't actively invested.
                    </p>
                  </div>

                  <div className="flex items-center gap-10">
                    <div>
                      <div className="text-black text-[18px] sm:text-[20px] font-medium">
                        {(growth?.baseGrowth / 5)?.toFixed(2)}%
                      </div>
                      <div className="text-[#6A6A6A] text-[10px] sm:text-[11px] mb-1 sm:mb-1.5">
                        Annual Rate
                      </div>
                    </div>
                    <div>
                      <div className="text-black text-[18px] sm:text-[20px] font-medium">
                        ${parseInt((growth.baseGrowth / 100) * housePrice)}
                      </div>
                      <div className="text-[#6A6A6A] text-[10px] sm:text-[11px] mb-1 sm:mb-1.5">
                        5-Year Gain
                      </div>
                    </div>
                    <div className=" ">
                      <div className="text-black text-[20px] sm:text-[22px] font-medium">
                        $
                        {parseInt(
                          housePrice + (growth.baseGrowth / 100) * housePrice
                        )}
                      </div>
                      <div className="text-[#6A6A6A] text-[10px] sm:text-[11px] mb-1 sm:mb-1.5">
                        Total in 5 Years
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )} */}

        {selectedButton === "Equity/Growth Comparison" && (
          <div className="space-y-8">
            <div className="text-left mx-auto  w-full ">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-2.5">
                Equity Unlock Growth Comparison
              </h2>
              <p className="text-sm md:text-sm text-[#6A6A6A]">
                How unlocking part of your home's equity compares to keeping it
                all in your property. Based on historical performance
                benchmarks.
              </p>
            </div>

            {/* Strategy Selector */}
            <div className="flex justify-start mb-8 w-full overflow-hidden  ">
              <div className="inline-flex bg-gray-50 p-1 rounded-xl border border-gray-200 relative overflow-x-auto no-scrollbar max-w-full w-full">
                {PortfolioOptions?.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedPortfolio(item);
                      setActiveButton(item.value);
                    }}
                    className={`relative z-10 px-4 md:px-6 py-2 w-full rounded-[10px] text-sm font-bold capitalize transition-colors duration-200 whitespace-nowrap ${
                      activeButton === item.value
                        ? "text-[#005bff]"
                        : "text-[#6A6A6A] hover:text-black"
                    }`}
                  >
                    {activeButton === item.value && (
                      <motion.div
                        layoutId="activeStrategyBg2"
                        className="absolute inset-0 bg-white rounded-[10px] shadow-sm border border-black/[0.04]"
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        }}
                        style={{ zIndex: -1 }}
                      />
                    )}
                    {item.value}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            

              {/* Left Column: Visualization */}
              <div className="lg:col-span-8 space-y-6">
                {/* Chart Card */}
                <Card className="min-h-[400px] flex flex-col">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-black flex items-center gap-2">
                      <Activity size={18} className="text-[#005BFF]" />
                      Growth Projection (5 Years)
                    </h3>
                    <div className="flex gap-4 text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#005BFF]" />
                        <span className="capitalize">
                          {selectedPortfolio?.value === "Baseline"
                            ? "Baseline"
                            : selectedPortfolio?.value}{" "}
                          Strategy
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-300" />
                        <span>Baseline (Home Only)</span>
                      </div>
                    </div>
                  </div>

                  <div
                    className="w-full h-[300px]"
                    style={{ minHeight: "300px" }}
                  >
                    <ResponsiveContainer width="100%" height={300}>
                           <AreaChart data={projectionData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                              <defs>
                                 <linearGradient id="colorPortfolio" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#0A2540" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#0A2540" stopOpacity={0}/>
                                 </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                              <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6A6A6A' }} dy={10} />
                              <YAxis 
                                 axisLine={false} 
                                 tickLine={false} 
                                 tick={{ fontSize: 12, fill: '#6A6A6A' }} 
                                 tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
                              />
                              <Tooltip content={<CustomTooltip />} />
                              <Area 
                                 type="monotone" 
                                 dataKey="Portfolio" 
                                 stroke="#0A2540" 
                                 strokeWidth={3} 
                                 fillOpacity={1} 
                                 fill="url(#colorPortfolio)" 
                              />
                              <Area 
                                 type="monotone" 
                                 dataKey="Baseline" 
                                 stroke="#CBD5E0" 
                                 strokeWidth={2} 
                                 strokeDasharray="5 5"
                                 fill="transparent" 
                              />
                           </AreaChart>
                        </ResponsiveContainer>
                  </div>
                </Card>

                {/* Summary Stats Grid */}
                {/* <div className="grid grid-cols-3 gap-6">
                  <Card className="bg-[#0A2540] text-white">
                    <div
                      className={`text-xs  uppercase tracking-wider font-bold mb-1  ${selectedPortfolio?.textColor}`}
                    >
                      Total in 5 Years
                    </div>
                    <div
                      className={`text-2xl font-bold tracking-tight ${selectedPortfolio?.textColor}`}
                    >
                      {" "}
                      $
                    

                    {selectedPortfolio?.value !== 'Custom' ?Number(selectedPortfolio?.totalassetsvalueinfiveYears).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }): Number(Number(ReturnsAssets.ReturnAfterTax) + Number(housePrice)).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}


                    </div>
                  </Card>

                  <Card>
                    <div className="text-xs text-[#6A6A6A] uppercase tracking-wider font-bold mb-1">
                      Your Net Gain
                    </div>
                    <div className="text-2xl font-bold text-[#18A36F] tracking-tight flex items-center gap-2">
                      +$


            {selectedPortfolio?.value !== 'Custom'? Number(selectedPortfolio?.netgainvalue)?.toLocaleString("en-us"):Number(ReturnsAssets.NetGainAfterOptimization).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}
                      <span className="text-xs bg-green-50 text-[#18A36F] px-2 py-0.5 rounded-md border border-green-100">
                       
                         {selectedPortfolio?.value !== 'Custom' ?selectedPortfolio?.netgaininpercent?.toLocaleString("en-us"):parseInt(ReturnsAssets.NetGainAfterOptimizationpercent).toFixed(1)}
                         %
                      </span>
                    </div>
                  </Card>

                  <Card className="flex items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors group">
                    <div className="text-center">
                      <Info
                        size={24}
                        className="mx-auto mb-2 text-[#005BFF] group-hover:scale-110 transition-transform"
                      />
                      <div className="text-xs font-bold text-[#005BFF]">
                        What is Equity Unlock?
                      </div>
                    </div>
                  </Card>
                </div> */}


                   {/* Summary Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                     {/* 1. House Value (Yr 5) */}
                     <Card className="bg-white border border-[#E6ECF5] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-full -mr-2 -mt-2 pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                               <Home size={16} className="text-[#0A2540]" />
                               <div className="text-[10px] text-[#6A6A6A] uppercase tracking-wider font-bold">House Value (Yr 5)</div>
                            </div>
                            <div className="text-2xl font-bold tracking-tight text-[#0A2540] tabular-nums mb-1">
                             ${Number(ReturnsAssets.ValueNotOptimized).toLocaleString('en-us')}
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-100 text-[#6A6A6A] text-[10px] font-bold">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#6A6A6A]" />
                               Conservative 3.2% Growth
                            </div>
                        </div>
                     </Card>
                     
                     {/* 2. Portfolio Value (Yr 5) */}
                     <Card className="bg-[#005BFF] text-[#005bff] border border-blue-500 shadow-[0_8px_20px_-6px_rgba(0,91,255,0.4)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#005bff]/10 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                               <TrendingUp size={16} className="text-[#005bff]" />
                               <div className="text-[10px] text-[#005bff] uppercase tracking-wider font-bold opacity-90">Portfolio Value (Yr 5)</div>
                            </div>
                            <div className="text-2xl font-bold tracking-tight tabular-nums mb-1 text-[#005bff]">
                               ${Number(ReturnsAssets.PortfolioGain).toLocaleString('en-us')}
                            </div>
                            <div className="text-[11px] font-medium text-[#005bff] opacity-80">
                               From ${(selectedPortfolio?.value !== 'Baseline' && selectedPortfolio?.value !=='Custom')? Number(0.3375 * housePrice).toLocaleString("en-US") :selectedPortfolio?.value==='Custom'?Number(reinvestAmount.AmtToReinvest).toLocaleString("en-US"):'0'} equity unlocked
                            </div>
                        </div>
                     </Card>

                     {/* 3. Total Wealth Gain */}
                     <Card className="bg-[#F0FDF4] border border-[#DCFCE7] shadow-[0_4px_12px_-4px_rgba(24,163,111,0.1)] relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#18A36F]/10 rounded-full blur-xl pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                               <DollarSign size={16} className="text-[#18A36F]" />
                               <div className="text-[10px] text-[#166534] uppercase tracking-wider font-bold">Total Gain (5 Yr)</div>
                            </div>
                            <div className="text-2xl font-bold tracking-tight text-[#18A36F] tabular-nums mb-1">
                               +$ {Number(ReturnsAssets.TotalReturns).toLocaleString('en-us')}
                            </div>
                            <div className="text-[11px] font-medium text-[#166534] flex items-center gap-1">
                               Appreciation + Portfolio Profit
                            </div>
                        </div>
                     </Card>
                  </div>

                {/* Taxation & Capital Cost Breakdown Module */}
                <div className="mt-6 rounded-[16px] border border-white/50 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] overflow-hidden transition-all duration-300">
                  <button
                    onClick={() => setIsBreakdownOpen(!isBreakdownOpen)}
                    className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-white/60 transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isBreakdownOpen ? "bg-[#0A2540] text-white shadow-lg shadow-blue-500/30 scale-110" : "bg-white border border-gray-100 text-[#6A6A6A]   group-hover:scale-105"}`}
                      >
                        <ShieldCheck size={18} />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span
                          className={`text-sm font-bold transition-colors duration-300 ${isBreakdownOpen ? "text-[#0A2540]" : "text-[#0A2540] group-hover:text-black"}`}
                        >
                          Taxation & Capital Cost Breakdown
                        </span>
                        <span className="text-[10px] text-[#6A6A6A] font-medium mt-0.5 tracking-wide">
                          Transparent assumptions. No hidden math.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-wider transition-all duration-300 hidden sm:block ${isBreakdownOpen ? "opacity-0 -translate-x-2" : "opacity-0 group-hover:opacity-100 text-[#0A2540] translate-x-0"}`}
                      >
                        View Details
                      </span>
                      <motion.div
                        animate={{ rotate: isBreakdownOpen ? -90 : 90 }}
                        transition={{ duration: 0.1 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isBreakdownOpen ? "bg-[#0A2540]/10 text-[#0A2540]" : "text-[#6A6A6A] group-hover:bg-black group-hover:text-white"}`}
                      >
                        <ChevronRight size={16} />
                      </motion.div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isBreakdownOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="bg-white/60 rounded-xl border border-dashed border-gray-200 p-6 space-y-4 relative overflow-hidden">
                            {/* Receipt Texture/Effect */}
                            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-gray-100/50 to-transparent" />

                            <div className="flex justify-between items-center pb-2 border-b border-gray-200/50">
                              <h4 className="text-xs font-bold text-black uppercase tracking-wider">
                                Investment Breakdown
                              </h4>
                              <span className="text-[10px] text-[#6A6A6A] font-mono">
                                REC-84920
                              </span>
                            </div>

                            {/* 1. Equity Unlocked */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Equity Line Of Credit
                              </span>
                              <span className="font-medium text-black">
                                $ 
                                        {(selectedPortfolio?.value !== 'Baseline' && selectedPortfolio?.value !=='Custom')? Number(0.6 * housePrice).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }) :selectedPortfolio?.value==='Custom'?Number(reinvestAmount.EquityLineOfCredit).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }):'0'}

                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 2. Cost of Capital */}
                            <div className="space-y-2">
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-[#6A6A6A]">
                                  HELOC interest rate
                                </span>
                                <span className="font-medium text-black ">
                               
                                  {selectedPortfolio?.value !=='Custom'?'~8.75%':HELOCRate}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-[#6A6A6A]">
                                  HELOC interest paid (5 yrs)
                                </span>
                                <span className="font-medium text-red-500 ">
                                  -$
                                  
                                        {(selectedPortfolio?.value !== 'Baseline' && selectedPortfolio?.value !=='Custom')? Number(0.2625 * housePrice).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }):selectedPortfolio?.value==='Custom'?Number(reinvestAmount.HELOCInterestPaid)?.toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }):'0'}

                                  
                                </span>
                              </div>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 3. Investable Amount */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Net Investable capital
                              </span>
                              <span className="font-medium text-black ">
                                $
                                  {(selectedPortfolio?.value !== 'Baseline' && selectedPortfolio?.value !=='Custom')? Number(0.3375 * housePrice).toLocaleString("en-US") :selectedPortfolio?.value==='Custom'?Number(reinvestAmount.AmtToReinvest).toLocaleString("en-US"):'0'}

                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 4. Growth Assumptions */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Projected portfolio return
                              </span>
                              <span className="font-medium text-[#005BFF] ">
                               
                                
                         {selectedPortfolio?.value !== 'Custom' ?Number((selectedPortfolio?.netgaininpercent)/5).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })?.toLocaleString("en-us"):Number(ReturnsAssets.NetGainAfterOptimizationpercent).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}% p.a.

                                
                 
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 5. Taxation */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Capital gains tax (15%)
                              </span>
                              <span className="font-medium text-red-500">
                                -$
                              

                                   
                         {selectedPortfolio?.value !== 'Custom' ? Number(selectedPortfolio?.capitalGainsTaxPaid).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }):Number(ReturnsAssets.GainsTax).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}% p.a.
                              </span>
                            </div>
                            <div className="w-full h-px bg-black/10" />

                            {/* 6. FINAL LINE */}
                            <div className="flex justify-between items-center pt-2">
                              <span className="text-sm font-bold text-black">
                                Profit after tax
                              </span>
                              <div className="text-right">
                                <span className="block text-xl font-medium text-[#18A36F] tracking-tight glow-text-green">
                                  $
                                



 {selectedPortfolio?.value !== 'Custom' ?Number(selectedPortfolio.totalassetsvalueinfiveYears - housePrice).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }):Number(Number(ReturnsAssets.ReturnAfterTax) + Number(housePrice)).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })} p.a.

                                
    

                                </span>
                                <span className="text-[9px] text-[#6A6A6A] uppercase font-bold tracking-wider">
                                  Clean Profit
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 text-center">
                            <p className="text-[10px] text-[#6A6A6A] max-w-[80%] mx-auto">
                              Estimates based on historical benchmarks. Actual
                              returns and tax obligations vary based on your
                              jurisdiction and market conditions.
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="bg-blue-50 p-6 rounded-[20px] border border-blue-100 flex gap-4">
                  <div className="min-w-[40px] h-10 rounded-full bg-[#005BFF] flex items-center justify-center text-white shadow-md">
                    <Info size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#0A2540] mb-1">
                      What is "Equity Unlock"?
                    </h4>
                    <p className="text-sm text-[#4A5568] leading-relaxed">
                      Instead of keeping all your wealth locked in your home
                      (which grows at ~3-4% annually), you can access some
                      equity through a HELOC or refinance, then invest it in
                      diversified portfolios potentially earning 6-10% returns.
                      You keep your home while your money works harder.
                    </p>
                  </div>
                </div>
              </div>
                {/* Right Column: Strategy Inputs */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="h-full border-[#005BFF]/20 ring-4 ring-[#005BFF]/5">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      {/* <Badge color={selectedPortfolio?.color}>{selectedPortfolio?.value}</Badge> */}
                      <Badge color={selectedPortfolio?.color}>
                        {selectedPortfolio?.Risk}
                      </Badge>
                    </div>
                    <h3 className="text-2xl font-bold text-black capitalize">
                      {selectedPortfolio?.value} Portfolio
                    </h3>

                    <p className="text-xs text-[#6A6A6A] mt-2 leading-relaxed font-medium text-black">
                      {activeButton === "Baseline"
                        ? "Do Nothing (Keep Equity At Home)"
                        : "Strategy Is Dynamic - Not Fixed"}
                    </p>
                    <p className="text-xs text-[#6A6A6A] mt-1 leading-relaxed">
                      {activeButton === "Baseline"
                        ? `Your home ${parseInt(AnnualGrowth?.house)?.toFixed(2) > 0 ? "appreciates" : "depreciates"} at typical  ${parseInt(AnnualGrowth?.house)?.toFixed(1)} %    annually, If your equity isn't actively invested.`
                        : `Your allocation may changed based on market conditions, risk profile, and our AI deployment Model.`}
                    </p>
                  </div>

                  <div className="p-4 bg-[#F8F9FB] rounded-xl border border-gray-200 mb-6">
                    <div className="text-center">
                      <div
                        className={
                          "text-xs text-[#6A6A6A] uppercase tracking-wider font-bold mb-1"
                        }
                      >
                        Projected Annual Return
                      </div>
                      <div
                        className={`text-3xl font-bold tracking-tight ${selectedPortfolio?.textColor}`}
                      >
                        ${" "}
                        


                        {selectedPortfolio?.value !== 'Custom' ?Number(selectedPortfolio?.projectAnnualReturn).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }):Number((ReturnsAssets?.ReturnAfterTax)/5).toLocaleString("en-US", {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      })}
                        

                      
                      </div>
                    </div>
                  </div>

                  {/* Allocation Display / Sliders */}
                  <div className="space-y-5">
                    <div className="flex items-center justify-between text-xs font-bold text-[#6A6A6A] uppercase tracking-wider border-b border-gray-100 pb-2">
                      <span>Asset Class</span>
                      <span>Allocation</span>
                    </div>

                    {Object.entries(currentAllocation).map(
                      ([key, value], i) => (
                        <div key={key}>
                          <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-sm shrink-0 "
                                style={{
                                  backgroundColor: `${COLORS[key as keyof typeof COLORS]}33`,
                                }}
                              >
                                {assetsSvg[key as keyof typeof assetsSvg]}
                              </div>
                              <span className="text-sm font-bold text-black capitalize">
                                {key === "sp500" ? "S&P 500" : key}
                              </span>
                            </div>
                            <span className="text-sm font-bold">{value}%</span>
                          </div>

                          {selectedPortfolio?.value === "Custom" ? (
                            <Slider
                              value={[customTabFunctions[i].value]}
                              onValueChange={customTabFunctions[i].function}
                              max={100}
                              step={1}
                              className="w-full"
                              classNameRange={`#0a2540`}
                            />
                          ) : (
                            <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${value}%` }}
                                transition={{ duration: 0.5 }}
                                className="h-full rounded-full"
                                style={{
                                  backgroundColor:
                                    '#0A2540',
                                }}
                              />
                            </div>
                          )}

                          <div className="text-right mt-1">
                            <span
                              className={`text-[10px] font-bold ${AnnualGrowth[key as keyof typeof AnnualGrowth] >= 0 ? "text-[#18A36F]" : "text-red-500"}`}
                            >
                              {AnnualGrowth[key]}% P.A.
                            </span>
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <button
                  onclick={()=>{setScreen(4)}}
                  className="w-full mt-8 py-4 bg-gradient-to-r from-[#18A36F] to-[#18A36F] text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#005BFF] transition-all flex items-center justify-center gap-2 group">
                    Apply This Strategy
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Card>
              </div>
            </div>
          </div>
        )}
        {selectedButton === "Buy/Sell/Hold Intelligence" && (
          <div className="flex gap-2 flex-col">
            {/* ====================================================================
             SECTION 8 — BUY / SELL / HOLD SCORE
             ==================================================================== */}
            <section className="bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)]">
              <div className="px-6 py-5 border-b border-black/[0.06] bg-gradient-to-r from-[#FAFBFC] to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#005BFF]/10">
                    <Target className="text-[#005BFF]" size={18} />
                  </div>
                  <h2 className="text-black text-[18px] sm:text-[20px] font-medium tracking-tight w-full flex items-center justify-between">
                    Buy / Sell / Hold Intelligence
                    <Button
                      onClick={() => {
                        window.scrollTo(0, 0);
                        setScreen(4);
                        setSelectedButton("Equity/Growth Comparison");
                      }}
                      className="bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white px-8 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 w-full lg:w-auto flex items-center justify-center gap-2"
                    >
                      Connect To Expert Agent
                      <ChevronRight size={18} />
                    </Button>
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                  {[
                    {
                      title: "BUY Score",
                      score: aiResponse?.buyScore,
                      color: "#18A36F",
                      desc: aiResponse?.buyScoreReason,
                    },
                    {
                      title: "HOLD Score",
                      score: aiResponse?.holdScore,
                      color: "#005BFF",
                      desc: aiResponse?.holdScoreReason,
                    },
                    {
                      title: "SELL Score",
                      score: aiResponse?.sellScore,
                      color: "#6A6A6A",
                      desc: aiResponse?.sellScoreReason,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="relative group">
                      <div
                        className="absolute -inset-0.5 rounded-xl opacity-0 group-hover:opacity-100 blur transition-all duration-300"
                        style={{
                          background: `linear-gradient(to br, ${item.color}20, transparent)`,
                        }}
                      ></div>
                      <div
                        className="relative p-6 rounded-xl bg-gradient-to-br from-[#FAFBFC] to-white border-l-4 transition-all duration-200"
                        style={{ borderLeftColor: item.color }}
                      >
                        <div className="flex items-center justify-between mb-0 sm:mb-3">
                          <h3 className="text-black text-[16px]  font-medium">
                            {item.title}
                          </h3>
                          <span
                            className="text-[24px] sm:text-[28px] font-medium"
                            style={{ color: item.color }}
                          >
                            {item.score}
                          </span>
                        </div>
                        <p className="text-[#6A6A6A] text-[12px] sm:text-[13px] leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ====================================================================
             SECTION 9 — NEGOTIATION INTELLIGENCE
             ==================================================================== */}
            <section className="bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)]">
              <div className="px-6 py-5 border-b border-black/[0.06] bg-gradient-to-r from-[#FAFBFC] to-white">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#005BFF]/10">
                    <MessageCircle className="text-[#005BFF]" size={18} />
                  </div>
                  <h2 className="text-black text-[18px] sm:text-[20px] font-medium tracking-tight">
                    Negotiation Strategy & Price Guidance
                  </h2>
                </div>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Opening Offer Range",
                      value: `$ ${aiResponse?.offerStrategy?.expectedBuyingRange?.min?.toLocaleString(
                        "en-us",
                      )} – $ ${aiResponse?.offerStrategy?.expectedBuyingRange?.max?.toLocaleString(
                        "en-us",
                      )}`,
                    },
                    {
                      label: "Maximum Offer",
                      value: `$ ${aiResponse?.offerStrategy?.maximumOffer?.toLocaleString(
                        "en-us",
                      )}`,
                      highlight: true,
                    },
                    {
                      label: "Recommended List Price",
                      value: `$ ${aiResponse?.sellingStrategy?.recommendedListPrice?.toLocaleString(
                        "en-us",
                      )}`,
                    },
                    {
                      label: "Expected Sale Range",
                      value: `$ ${aiResponse?.sellingStrategy?.expectedSellingRange?.min?.toLocaleString(
                        "en-us",
                      )} – $ ${aiResponse?.sellingStrategy?.expectedSellingRange?.max?.toLocaleString(
                        "en-us",
                      )}`,
                      highlight: true,
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-5 rounded-xl ${
                        item.highlight
                          ? "bg-gradient-to-br from-[#F8FAFF] to-white border-2 border-[#005BFF]/30"
                          : "bg-[#FAFBFC]"
                      } border border-black/[0.06]`}
                    >
                      <p className="text-[#6A6A6A] text-[11px] mb-2 uppercase tracking-wide font-medium">
                        {item.label}
                      </p>
                      <p
                        className={`${
                          item.highlight ? "text-[#005BFF]" : "text-black"
                        } text-[18px] sm:text-[20px] font-medium`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-5 border-t border-black/[0.06]">
                  <h3 className="text-black text-[15px] font-medium mb-4 flex items-center gap-2">
                    <Target size={16} className="text-[#005BFF]" />
                    Key Negotiation Points - Buying
                  </h3>
                  <ul className="space-y-3 text-[12px] sm:text-[13px] text-[#6A6A6A]">
                    {aiResponse?.negotiationPoints?.forBuyer?.map(
                      (point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-[#FAFBFC] hover:bg-[#F8FAFF] transition-colors"
                        >
                          <span className="text-[#005BFF] mt-0.5 flex-shrink-0">
                            •
                          </span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div className="pt-5 border-t border-black/[0.06]">
                  <h3 className="text-black text-[15px] font-medium mb-4 flex items-center gap-2">
                    <Target size={16} className="text-[#005BFF]" />
                    Key Negotiation Points - Selling
                  </h3>
                  <ul className="space-y-3 text-[12px] sm:text-[13px] text-[#6A6A6A]">
                    {aiResponse?.negotiationPoints?.forSeller?.map(
                      (point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-lg bg-[#FAFBFC] hover:bg-[#F8FAFF] transition-colors"
                        >
                          <span className="text-[#005BFF] mt-0.5 flex-shrink-0">
                            •
                          </span>
                          <span className="flex-1">{point}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              </div>
            </section>
          </div>
        )}

        {selectedButton === "Finance-Taxes-Insurance-By LIAM" && (
          //   {/* ====================================================================
          // NEGOTIATION TOOLS
          // ==================================================================== */}
          <section className="bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_2px_4px_rgba(0,0,0,0.02),0_12px_24px_rgba(0,0,0,0.04)]">
            <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-black/[0.06] bg-gradient-to-r from-[#FAFBFC] to-white">
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <div className="p-2 rounded-lg bg-[#005BFF]/10">
                  <Scale className="text-[#005BFF]" size={18} />
                </div>
                <h2 className="text-black text-[18px] sm:text-[20px] font-medium tracking-tight">
                  Finance-Taxes-Insurance-By LIAM{" "}
                  <span className="text-[#0b85ff] text-[14px] sm:text-[16px]">
                    -Coming Soon !
                  </span>
                </h2>
              </div>
              <p className="text-[#6A6A6A] text-[12px] sm:text-[13px] capitalize">
                Data-driven optimization insights for mortgage, insurance, and
                refinancing and taxes.
              </p>
            </div>

            <div className="p-4 sm:p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Mortgage Rate Negotiation */}
                <div className="p-5 rounded-xl border-2 border-[#005BFF]/20 bg-gradient-to-br from-[#005BFF]/5 to-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Landmark className="text-[#005BFF]" size={18} />
                    <h3 className="text-black text-[15px] font-medium">
                      Refinance Opportunity
                    </h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Current Market Rate
                      </span>
                      <span className="text-black text-[15px] font-medium  relative">
                        <div className="w-full h-full   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                        6.75%
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Your Potential Rate
                      </span>
                      <span className="text-[#18A36F] text-[15px] font-medium relative">
                        <div className="w-full h-full   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                        6.25%
                      </span>
                    </div>
                    <div className="pt-2 border-t border-black/[0.06]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6A6A6A] text-[12px]">
                          Potential Savings
                        </span>
                        <span className="text-[#18A36F] text-[16px] font-medium relative">
                          $420/mo
                          <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFF]">
                    <p className="text-[#005BFF] text-[11px]">
                      <span className="font-medium">Negotiation Tip:</span> Your
                      800+ credit score gives you strong leverage for rate
                      reduction.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setScreen(4);
                      setSelectedButton("Equity/Growth Comparison");
                    }}
                    className="bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white px-8 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 w-full"
                  >
                    Connect To Refinancing Expert
                    <ChevronRight size={18} />
                  </Button>
                </div>

                {/* Property Tax Appeal */}
                <div className="p-5 rounded-xl border-2 border-[#005BFF]/20 bg-gradient-to-br from-[#005BFF]/5 to-white">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="text-[#005BFF]" size={18} />
                    <h3 className="text-black text-[15px] font-medium">
                      Tax Assessment Review
                    </h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Current Assessment
                      </span>
                      <span className="text-black text-[15px] font-medium relative">
                        $1,050,000
                        <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Neighborhood Avg
                      </span>
                      <span className="text-[#18A36F] text-[15px] font-medium relative">
                        $975,000
                        <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-black/[0.06]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6A6A6A] text-[12px]">
                          Appeal Potential
                        </span>
                        <span className="text-[#18A36F] text-[16px] font-medium relative">
                          $850/yr
                          <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFF]">
                    <p className="text-[#005BFF] text-[11px]">
                      <span className="font-medium">Negotiation Tip:</span> 7%
                      over-assessment detected. Strong appeal case based on
                      comparable properties.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setScreen(4);
                      setSelectedButton("Equity/Growth Comparison");
                    }}
                    className="bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white px-8 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 w-full"
                  >
                    Connect To Tax Expert
                    <ChevronRight size={18} />
                  </Button>
                </div>

                {/* HELOC Rate */}
                <div className="p-5 rounded-xl border-2 border-[#005BFF]/20 bg-gradient-to-br from-[#005BFF]/5 to-white">
                  <div className="flex items-center gap-2 mb-3">
                    <BadgeDollarSign className="text-[#005BFF]" size={18} />
                    <h3 className="text-black text-[15px] font-medium">
                      HELOC Comparison
                    </h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Market Average
                      </span>
                      <span className="text-black text-[15px] font-medium relative">
                        9.25%
                        <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Best Available
                      </span>
                      <span className="text-[#18A36F] text-[15px] font-medium relative">
                        8.50%
                        <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-black/[0.06]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6A6A6A] text-[12px]">
                          On $100K Line
                        </span>
                        <span className="text-[#18A36F] text-[16px] font-medium relative">
                          Save $750/yr
                          <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFF]">
                    <p className="text-[#005BFF] text-[11px]">
                      <span className="font-medium">Negotiation Tip:</span>{" "}
                      Multiple lenders competing in your area. Use offers to
                      negotiate better terms.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setScreen(4);
                      setSelectedButton("Equity/Growth Comparison");
                    }}
                    className="bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white px-8 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 w-full"
                  >
                    Connect To HELOC Expert
                    <ChevronRight size={18} />
                  </Button>
                </div>

                {/* Insurance Quote */}
                <div className="p-5 rounded-xl border-2 border-[#005BFF]/20 bg-gradient-to-br from-[#005BFF]/5 to-white">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="text-[#005BFF]" size={18} />
                    <h3 className="text-black text-[15px] font-medium">
                      Insurance Shopping
                    </h3>
                  </div>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Current Premium
                      </span>
                      <span className="text-black text-[15px] font-medium relative">
                        $2,400/yr
                        <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[#6A6A6A] text-[12px]">
                        Competitive Quote
                      </span>
                      <span className="text-[#18A36F] text-[15px] font-medium relative">
                        $1,850/yr
                        <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                      </span>
                    </div>
                    <div className="pt-2 border-t border-black/[0.06]">
                      <div className="flex justify-between items-center">
                        <span className="text-[#6A6A6A] text-[12px]">
                          Annual Savings
                        </span>
                        <span className="text-[#18A36F] text-[16px] font-medium relative">
                          $550/yr
                          <div className="w-full h-full top-0   rounded-md p-1 absolute bg-white/10 backdrop-blur-[2px]"></div>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#F8FAFF]">
                    <p className="text-[#005BFF] text-[11px]">
                      <span className="font-medium">Negotiation Tip:</span>{" "}
                      Leverage competitor quotes to renegotiate current policy
                      or switch providers.
                    </p>
                  </div>
                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setScreen(4);
                      setSelectedButton("Equity/Growth Comparison");
                    }}
                    className="bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] text-white px-8 py-2 rounded-xl text-[14px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2 w-full"
                  >
                    Connect To Insurance Expert
                    <ChevronRight size={18} />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="w-full bg-white rounded-2xl overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,91,255,0.08),0_24px_48px_rgba(0,0,0,0.04)] px-[33px] py-[12px] flex flex-col gap-[1rem]">
          {/* <svg
            width="58"
            height="58"
            viewBox="0 0 58 58"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.5"
              y="0.5"
              width="57"
              height="57"
              rx="8.65139"
              fill="#0056EE"
              fill-opacity="0.2"
            />
            <rect
              x="0.5"
              y="0.5"
              width="57"
              height="57"
              rx="8.65139"
              fill="#EFF6FF"
            />
            <rect
              x="0.5"
              y="0.5"
              width="57"
              height="57"
              rx="8.65139"
              stroke="#BEDBFF"
            />
            <path
              d="M26.7127 24.0425V20.9921C26.7127 18.485 26.7127 17.2315 26.0202 16.3877C25.8935 16.2333 25.7519 16.0916 25.5974 15.9649C24.7537 15.2725 23.5001 15.2725 20.9931 15.2725C18.486 15.2725 17.2324 15.2725 16.3887 15.9649C16.2343 16.0916 16.0926 16.2333 15.9659 16.3877C15.2734 17.2315 15.2734 18.485 15.2734 20.9921V24.0425C15.2734 26.5496 15.2734 27.8031 15.9659 28.6469C16.0926 28.8014 16.2343 28.943 16.3887 29.0697C17.2324 29.7622 18.486 29.7622 20.9931 29.7622C23.5001 29.7622 24.7537 29.7622 25.5974 29.0697C25.7519 28.943 25.8935 28.8014 26.0202 28.6469C26.7127 27.8031 26.7127 26.5496 26.7127 24.0425Z"
              stroke="black"
              stroke-width="2.28785"
              stroke-linejoin="round"
            />
            <path
              d="M22.5183 34.3379H19.4678C18.4035 34.3379 17.8714 34.3379 17.4384 34.4692C16.4635 34.765 15.7005 35.5279 15.4048 36.5028C15.2734 36.9358 15.2734 37.468 15.2734 38.5323C15.2734 39.5966 15.2734 40.1287 15.4048 40.5617C15.7005 41.5367 16.4635 42.2996 17.4384 42.5953C17.8714 42.7267 18.4035 42.7267 19.4678 42.7267H22.5183C23.5826 42.7267 24.1147 42.7267 24.5477 42.5953C25.5226 42.2996 26.2856 41.5367 26.5813 40.5617C26.7127 40.1287 26.7127 39.5966 26.7127 38.5323C26.7127 37.468 26.7127 36.9358 26.5813 36.5028C26.2856 35.5279 25.5226 34.765 24.5477 34.4692C24.1147 34.3379 23.5826 34.3379 22.5183 34.3379Z"
              stroke="black"
              stroke-width="2.28785"
              stroke-linejoin="round"
            />
            <path
              d="M42.7283 37.0074V33.9569C42.7283 31.4499 42.7283 30.1963 42.0358 29.3526C41.9091 29.198 41.7676 29.0565 41.613 28.9298C40.7693 28.2373 39.5157 28.2373 37.0087 28.2373C34.5017 28.2373 33.2481 28.2373 32.4043 28.9298C32.2498 29.0565 32.1083 29.198 31.9815 29.3526C31.2891 30.1963 31.2891 31.4499 31.2891 33.9569V37.0074C31.2891 39.5144 31.2891 40.768 31.9815 41.6118C32.1083 41.7663 32.2498 41.9078 32.4043 42.0345C33.2481 42.727 34.5017 42.727 37.0087 42.727C39.5157 42.727 40.7693 42.727 41.613 42.0345C41.7676 41.9078 41.9091 41.7663 42.0358 41.6118C42.7283 40.768 42.7283 39.5144 42.7283 37.0074Z"
              stroke="black"
              stroke-width="2.28785"
              stroke-linejoin="round"
            />
            <path
              d="M38.5339 15.2725H35.4834C34.4191 15.2725 33.887 15.2725 33.454 15.4038C32.479 15.6996 31.7161 16.4625 31.4204 17.4374C31.2891 17.8704 31.2891 18.4026 31.2891 19.4668C31.2891 20.5311 31.2891 21.0633 31.4204 21.4963C31.7161 22.4712 32.479 23.2341 33.454 23.5299C33.887 23.6612 34.4191 23.6612 35.4834 23.6612H38.5339C39.5982 23.6612 40.1304 23.6612 40.5634 23.5299C41.5383 23.2341 42.3012 22.4712 42.597 21.4963C42.7283 21.0633 42.7283 20.5311 42.7283 19.4668C42.7283 18.4026 42.7283 17.8704 42.597 17.4374C42.3012 16.4625 41.5383 15.6996 40.5634 15.4038C40.1304 15.2725 39.5982 15.2725 38.5339 15.2725Z"
              stroke="black"
              stroke-width="2.28785"
              stroke-linejoin="round"
            />
          </svg> */}

          {/* <div className="flex flex-col gap-[.5rem]">
            <h1 className="text-[18px] text-[#101828] font-semibold">
              Real Estate Control Center
            </h1>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2  text-[12px] text-[#4A5565]">
              <span>✓ Manage your entire real estate portfolio</span>
              <span>✓ Compare properties and monitor cash flow</span>
              <span>✓ Utilize advanced tools like tenant management</span>
            </div>
          </div> */}

          {/* <div className="w-full flex items-center justify-end ">
            <button
             onClick={() => {navigate('redirect?path=save')}}
              className="flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white rounded-xl transition-all duration-200 text-[13px] sm:text-[14px] font-medium shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_4px_rgba(0,91,255,0.2)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.2)_inset,0_4px_8px_rgba(0,91,255,0.3)] hover:translate-y-[-1px]"
            >
              Save Report
            </button>
          </div> */}

          {/* ====================================================================
             SECTION 12 — FOOTER
             ==================================================================== */}
          <div className="bg-white rounded-2xl  space-y-6 ">
            <div>
              <h3 className="text-black text-[15px] font-medium mb-3">
                Methodology
              </h3>
              {onShowMethodology && (
                <button
                  onClick={onShowMethodology}
                  className="text-[#005BFF] hover:text-[#0047CC] text-[13px] font-medium transition-colors mb-3 flex items-center gap-1"
                >
                  View Full Methodology
                  <ChevronRight size={14} />
                </button>
              )}
              <p className="text-[#6A6A6A] text-[13px] leading-relaxed">
                This report uses a hedonic regression model analyzing 47
                comparable properties within 0.5 miles, supplemented by
                CoreLogic valuation models and public tax assessment data.
                Market trends are derived from 12-month rolling averages.
                Investment returns assume standard market conditions and
                historical performance patterns.
              </p>
            </div>

            <div className="border-t border-black/[0.04] pt-6">
              <h3 className="text-black text-[15px] font-medium mb-4 flex items-center gap-2">
                <AlertCircle className="text-[#005BFF]" size={16} />
                Important Disclaimers
              </h3>
              <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#F8FAFF] to-white border-2 border-[#005BFF]/20 mb-4">
                <p className="text-black text-[14px] font-medium mb-2 flex items-center gap-2">
                  <Shield className="text-[#005BFF]" size={16} />
                  This is NOT Financial Advice
                </p>
                <p className="text-[#6A6A6A] text-[12px] leading-relaxed mb-3">
                  AIPropertyReport.com provides educational information and data
                  analysis only. We are not licensed financial advisors,
                  investment advisors, or tax professionals. All investment
                  projections are hypothetical and based on historical data—past
                  performance does not guarantee future results. Consult with
                  qualified professionals before making any financial decisions.
                </p>
                <div className="pt-3 border-t border-black/[0.06]">
                  <p className="text-[#6A6A6A] text-[11px]">
                    <span className="font-medium text-black">
                      Data Privacy:
                    </span>{" "}
                    AIPropertyReport.com is not designed for collecting
                    personally identifiable information (PII) or securing
                    sensitive personal data. Do not input confidential financial
                    information.
                  </p>
                </div>
              </div>
              <ul className="text-[#6A6A6A] text-[12px] leading-relaxed space-y-2">
                {[
                  "Property valuations are estimates and may differ from actual market values or formal appraisals.",
                  "Investment return projections are hypothetical illustrations based on historical market benchmarks.",
                  "Market conditions are subject to change and may significantly impact actual results.",
                  "Insurance savings estimates are indicative only—actual savings depend on your specific policy and provider.",
                  "Tax implications vary by individual circumstance—consult a tax professional.",
                  "Refinancing and HELOC rates shown are market averages and may not reflect your actual qualification rates.",
                ].map((disclaimer, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#005BFF] mt-1 flex-shrink-0">•</span>
                    <span>{disclaimer}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-black/[0.04] pt-6">
              <p className="text-[#6A6A6A] text-[11px] mb-2">
                © 2026 AIPropertyReport.com • Report generated:{" "}
                {new Date().toLocaleString("en-us", {
                  dateStyle: "long",
                })}{" "}
                • Valid for 30 days
              </p>
              <p className="text-[#6A6A6A] text-[11px]">
                For refinance & insurance optimisation, upgrade to the PRO
                Report.
              </p>
            </div>
          </div>
        </div>

        <div className="items-stretch flex justify-center gap-2 max-[1100px]:flex-col">
          <div className="max-[1100px]:w-[100%] w-[100%] flex flex-col gap-[8px] rounded-[6px] bg-white">
            <div className="py-[12px] px-[22px] flex flex-col justify-between h-full  gap-[16px]  rounded-md">
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center w-[25%]">
                  <img src={Frame} alt="" className="w-[70%]" />
                </div>
                {/* <div className='flex items-start justify-end w-[50%]'>
                 <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  text-[11px] font-medium mb-2 border border-[#005bff]/20  bg-gradient-to-r from-[#005bff]/10 to-[#005bff]/5 text-[#005bff] w-fit">
              <Sparkles size={12} />
              <span>Limited Time: Free Consultation</span>
            </div>
               </div> */}

                <div className="w-[50%] flex flex-col  gap-3 ml-4 ">
                  <div className="flex-1">
                    <h3 className="text-[20px] sm:text-[22px] font-medium tracking-tight mb-2">
                      Unlock ${(housePrice * 0.5)?.toLocaleString("en-us")} With
                      Expert Guidance
                    </h3>
                    <p className="text-[#6a6a6a] text-[14px] leading-relaxed max-w-2xl">
                      Talk to our certified financial advisors who've helped
                      homeowners unlocks hidden equity.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6 w-full">
                    {[
                      "Complete refinance analysis",
                      "Insurance savings calculator",
                      "HELOC strategy & rates",
                      "Personalized Strategy",
                    ].map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 text-[13px] text-[#6A6A6A]"
                      >
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#005bff]/10 flex items-center justify-center">
                          <Check className="text-[#005bff]" size={12} />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center w-[25%]">
                  <img
                    src={Frame1}
                    alt=""
                    className="w-[70%] transform -scale-x-100"
                  />
                </div>
              </div>

              <Button
                onClick={() => {
                  window.scrollTo(0, 0);
                  setActiveButton("Custom");
                  setSelectedButton("Equity/Growth Comparison");
                }}
                className="w-full  bg-gradient-to-b from-[#005BFF] to-[#0047CC] hover:from-[#0052E6] hover:to-[#003DB8] text-white px-6 py-4 rounded-xl text-[15px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Connect With Expert
                <ChevronRight size={18} />
              </Button>

              <div className="flex items-center justify-center gap-4  text-[11px] text-[#6a6a6a]">
                <div className="flex items-center gap-1.5">
                  <Star
                    className="text-yellow-300"
                    size={14}
                    fill="currentColor"
                  />
                  <span>4.9/5 Rating</span>
                </div>
                <div className="w-px h-4 bg-white/30"></div>
                <div className="flex items-center gap-1.5">
                  <Users size={14} />
                  <span>2,340+ Homeowners Helped</span>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="max-[1100px]:w-[100%] w-[50%] flex flex-col justify-between gap-[8px] p-[12px] rounded-[6px] bg-white">
            <div className="w-full flex items-start">
              <div className="w-[50%]">
                <img src={Frame1} className="w-[75%]" />
              </div>
              <div className="w-[50%] flex items-start justify-end  ">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full  text-[11px] font-medium mb-2 border border-[#18A36F]/20  bg-gradient-to-r from-[#18A36F]/10 to-[#18A36F]/5 text-[#18A36F]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#18A36F] animate-pulse"></div>
                  <span>PRO Features</span>
                </div>
              </div>
            </div>

            <div>
              <div className="flex-1">
                <h2 className="text-black text-[20px] sm:text-[22px] font-medium tracking-tight mb-2 capitalize">
                  Need full refinance & insurance optimisation?
                </h2>
                <p className="text-[#6A6A6A] text-[14px] mb-4">
                  Get deeper insights with advanced analysis and personalised
                  recommendations.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
                {[
                  "Complete refinance analysis",
                  "Insurance savings calculator",
                  "HELOC strategy & rates",
                  "Exact equity calculation",
                ].map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 text-[13px] text-[#6A6A6A]"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#18A36F]/10 flex items-center justify-center">
                      <Check className="text-[#18A36F]" size={12} />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  window.scrollTo(0,0)
                  setActiveButton('Custom')
                  setSelectedButton('Equity/Growth Comparison')
                }}
                className="w-full  bg-gradient-to-r from-[#18A36F] to-[#18A36F] text-white px-6 py-4 rounded-xl text-[15px] font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Get Custom Report
                <ChevronRight size={18} />
              </Button>
              <p className="text-[#6A6A6A] text-[11px] text-center mt-3">
                ✓ Instant access • ✓ Lifetime updates
              </p>
            </div>
          </div> */}
        </div>
      </div>

      {/* ====================================================================
           FLOATING CTA BUTTON (STICKY)
           ==================================================================== */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsChatbotOpen(true)}
          className="bg-gradient-to-r from-[#005BFF] to-[#0066FF] hover:from-[#0047CC] hover:to-[#0052E0] text-white px-6 py-4 rounded-full text-[15px] font-medium transition-all duration-200 shadow-[0_8px_24px_rgba(0,91,255,0.4)] hover:shadow-[0_12px_32px_rgba(0,91,255,0.5)] hover:scale-105 flex items-center gap-2"
        >
          <Phone size={18} />
          Ask LIAM
          <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
        </Button>
      </div>

      {/* Chatbot Modal */}
      <ChatbotModal
        isOpen={isChatbotOpen}
        onClose={() => setIsChatbotOpen(false)}
        propertyAddress={address}
        mode={chatbotMode}
      />
    </div>
  );
}
