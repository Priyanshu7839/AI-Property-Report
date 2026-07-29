import React, { useState, useRef, useEffect } from "react";

import { Doughnut } from "react-chartjs-2";
import { motion, AnimatePresence } from "motion/react";

import {
  Plus,
  MessageSquare,
  Star,
  BarChart2,
  Send,
  Paperclip,
  Mic,
  Home,
  Building2,
  Layers,
  HelpCircle,
  TrendingUp,
  Wrench,
  Clock,
  Shield,
  MapPin,
  Search,
  Bookmark,
  Menu,
  DollarSign,
  Activity,
  Zap,
  ChevronRight,
  X,
  SlidersHorizontal,
  User,
  RefreshCw,
  Check,
  ArrowUp,
  Heart,
  Info,
  ShieldCheck,
  Mail,
  Phone,
  Sun,
  Moon,
  CheckCircle,
  Armchair,
  Heater,
  CircleParking,
  Car,
  Warehouse,
  House,
  Sprout,
  BanknoteArrowUp,
  Rocket,
  AlertCircle,
  Blocks,
  Tag,
  SmilePlus,
  UsersRound,
  Map as MapIcon ,
  Bell,
  Settings,
  ArrowRight,
  Crown,
  ChevronDown,
  Landmark,
  Banknote,
  Network,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { IoPulse } from "react-icons/io5";
import LIAMNavbar from "./LIAMNavbar";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  Tooltip as Tooltip2,
} from "chart.js";
import {
  FetchPortfolioSavedUserReports,
  gettimeSeriesData,
} from "../components/apicalls/ApiCalls";
import { AppreciationChart } from "../components/AppreciationChart";
import { useLocation, useSearchParams } from "react-router";
import { chatStart, getDailyBriefing, saveUserChat } from "../../Apicall";
import LIAMLOGO from "../assets/LIAMLOGO.png";

// ─── Types ────────────────────────────────────────────────────────────────────

type MsgType =
  | "text"
  | "options"
  | "results"
  | "typing"
  | "input"
  | "details"
  | "report"
  | "fixer";

interface Option {
  id: string;
  label: string;
  sub?: string;
  icon?: React.ReactNode;
}

interface Msg {
  id: string;
  role: "assistant" | "user";
  content: string;
  timestamp: string;
  type: MsgType;
  options?: Option[];
  stepNum?: number;
}

interface Property {
  id: string;
  address: string;
  city: string;
  type: string;
  price: string;
  roi: number;
  capRate: number;
  cashFlow: number;
  marketScore: number;
  riskScore: number;
  img: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const CONVERSATIONS = [
  {
    id: "1",
    title: "Residential Investment Search",
    time: "2h ago",
    active: true,
  },
  { id: "2", title: "Multifamily Properties Dallas", time: "Yesterday" },
  { id: "3", title: "Commercial Austin", time: "2d ago" },
  { id: "4", title: "Budget Under $5M", time: "3d ago" },
  { id: "5", title: "Top Markets 2026", time: "1w ago" },
];

const SAVED_REPORTS = [
  { id: "1", title: "Q2 Dallas Analysis", date: "Jun 15" },
  { id: "2", title: "Austin Growth Report", date: "Jun 10" },
  { id: "3", title: "Miami Opportunity Brief", date: "Jun 1" },
];

const FAVORITES = [
  { id: "1", title: "Riverside Portfolio TX" },
  { id: "2", title: "Nashville Multifamily" },
];

const STEPS = [
  {
    stepNum: 1,
    question: "What do you have in mind?",
    type: "input",
    placeholder: "Enter property address...",
  },
  {
    stepNum: 2,
    question: "What type of property are you interested in?",
    type: "options",
    options: [
      { id: "singleFamily", label: "Houses", icon: <Home size={18} /> },
      { id: "townhome", label: "Townhomes", icon: <Building2 size={18} /> },
      { id: "multiFamily", label: "Multi-family", icon: <Layers size={18} /> },
      { id: "condo", label: "Condos/Co-op", icon: <Layers size={18} /> },
    ],
  },
  {
    stepNum: 3,
    question: "What's your budget range?",
    type: "options",
    options: [
      { id: "Under $500K", label: "Under $500K" },
      { id: "$500K – $1M", label: "$500K – $1M" },
      { id: "$1M – $5M", label: "$1M – $5M" },
      { id: "$5M – $10M", label: "$5M – $10M" },
      { id: "Over $10M", label: "Over $10M" },
      { id: "Not Sure", label: "Not Sure" },
    ],
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function nowTime() {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function uid() {
  return Math.random().toString(36).slice(2);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function TypingText({ text, speed, onComplete }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;

    setDisplayed("");

    const interval = setInterval(() => {
      index++;

      setDisplayed(text.slice(0, index));

      if (index >= text.length) {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {displayed.split("\n").map((line, i) => (
        <p
          key={i}
          className={`text-sm text-black font-medium leading-relaxed ${
            i > 0 && line === "" ? "mt-2" : i > 0 ? "mt-1" : ""
          }`}
        >
          {line || "\u00A0"}
        </p>
      ))}
    </>
  );
}

function AnimatedHomeIcon({
  width = 20,
  height = 15,
  color = "#1CAE3E",
}: {
  width?: number;
  height?: number;
  color?: string;
}) {
  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 1162 1073"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.path
        d="M764.5 1042.83V616.167C764.5 602.022 758.047 588.456 746.56 578.454C735.074 568.452 719.495 562.833 703.25 562.833H458.25C442.005 562.833 426.426 568.452 414.94 578.454C403.453 588.456 397 602.022 397 616.167V1042.83M29.5 456.192C29.4957 440.676 33.3792 425.346 40.8795 411.27C48.3798 397.195 59.3164 384.715 72.9263 374.699L501.676 54.6989C523.787 38.4274 551.801 29.5 580.75 29.5C609.699 29.5 637.713 38.4274 659.824 54.6989L1088.57 374.699C1102.18 384.715 1113.12 397.195 1120.62 411.27C1128.12 425.346 1132 440.676 1132 456.192V936.192C1132 964.482 1119.09 991.613 1096.12 1011.62C1073.15 1031.62 1041.99 1042.86 1009.5 1042.86H152C119.511 1042.86 88.3526 1031.62 65.3794 1011.62C42.4062 991.613 29.5 964.482 29.5 936.192V456.192Z"
        fill="none"
        stroke={color}
        strokeWidth={59}
        strokeLinecap="round"
        initial={{
          pathLength: 0,
          strokeDasharray: "250 2200",
          strokeDashoffset: 0,
        }}
        animate={{
          pathLength: 1,
          strokeDashoffset: -2200,
        }}
        transition={{
          pathLength: {
            duration: 1.4,
            ease: "easeInOut",
          },
          strokeDashoffset: {
            duration: 2.8,
            ease: "linear",
            repeat: Infinity,
          },
        }}
      />
    </motion.svg>
  );
}

function TypingDots() {
  return (
    <div className="flex items-center px-4 py-3">
      <motion.div
        className="w-2 h-2 rounded-full bg-[#1fae3e]"
        animate={{
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: [0.4, 0, 0.2, 1],
        }}
      />
    </div>
  );
}
function ScoreBar({
  value,
  max = 10,
  color,
}: {
  value: number;
  max?: number;
  color: string;
}) {
  return (
    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

function PropertyCard({ property, index, handlePropertySelect }) {
  const [saved, setSaved] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className=" "
      onClick={() => {
        handlePropertySelect(property);
      }}
      className="border-[0.5px] border-[#cfcfd7] rounded-3xl shadow-sm shadow-black/10 p-3"
    >
      <div className="relative h-54 bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-2">
        <img
          src={property?.property?.media?.allPropertyPhotos?.highResolution[0]}
          alt={"xdcdfdfd"}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <div className="absolute top-3 left-3 bg-black  backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-white">
          # {index + 1} Match
        </div>
        <button
          onClick={() => setSaved(!saved)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all ${saved ? "bg-[#4CAF50] text-white" : "bg-white/90 text-gray-600 hover:bg-white"}`}
        >
          <Heart size={14} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className=" text-[#18181B] border-[0.5px] border-[#cfcfd7] mb-5 px-5 py-3 rounded-2xl flex  gap-2 items-center justify-between">
        <div className="flex flex-col gap-2 items-start justify-between ">
          <p className="font-semibold text-xl leading-tight">
            {property?.property?.address?.streetAddress}
          </p>
          <p className="text-md text-[#71717A] flex items-center gap-1">
            <MapPin size={16} /> {property?.property?.address?.city}
          </p>

          <div className="flex items-center gap-2">
            <div className="text-[#71717A] text-xs font-medium border-[1px] border-[#e4e4e7] py-[2px] px-2 rounded-md">
              Bedrooms {property?.property?.bedrooms}
            </div>
            <div className="text-[#71717A] text-xs font-medium border-[1px] border-[#e4e4e7] py-[2px] px-2 rounded-md">
              Built In {property?.property?.yearBuilt}
            </div>
          </div>
        </div>

        <div className="p-4 text-[#1fae3e] flex flex-col items-center justify-center  bg-[#10B9811A] rounded-xl">
          <p className="text-[10px] text-black font-bold ">LIAM SCORE</p>
          <h1 className="text-[28px] font-extrabold leading-tight ">93</h1>
          <p className="text-[10px] font-bold ">Excellent</p>
        </div>
      </div>

      <div className="px-5 py-3 bg-black text-[#1fae3e] rounded-2xl flex gap-2 items-center justify-between">
        <h1 className="flex items-center justify-center flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
          <p className="text-gray-100 text-sm">Price</p>
          <p className="font-bold">
            ${Number(property?.property?.price?.value).toLocaleString("en-us")}
          </p>
        </h1>
        <h1 className="flex items-center justify-center flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
          <p className="text-gray-100 text-sm">Price/Sq.Ft.</p>
          <p className="font-bold capitalize">
            $
            {Number(
              property?.property?.price?.pricePerSquareFoot,
            ).toLocaleString("en-us")}
          </p>
        </h1>
        <h1 className="flex items-center justify-center flex-col  w-full">
          <p className="text-gray-100 text-sm">Est. Rent</p>
          <p className="font-bold capitalize">
            $
            {Number(
              property?.property?.estimates?.rentZestimate,
            ).toLocaleString("en-us")}
          </p>
        </h1>
      </div>
    </motion.div>
  );
}

function OptionCards({
  options,
  locked,
  selected,
  onSelect,
  stepNum,
}: {
  options: Option[];
  locked: boolean;
  selected?: string;
  onSelect: (opt: Option) => void;
  stepNum?: number;
}) {
  const isWide = stepNum === 1 || stepNum === 5;
  return (
    <div
      className={`grid gap-2 ml-10 w-[65%] mt-3 ${isWide ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-3"}`}
    >
      {options?.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <motion.button
            key={opt.id}
            whileHover={!locked ? { scale: 1.02 } : {}}
            whileTap={!locked ? { scale: 0.98 } : {}}
            onClick={() => !locked && onSelect(opt)}
            className={`
              flex items-start gap-3 p-3 rounded-xl border text-left transition-all duration-200
              ${
                locked
                  ? isSelected
                    ? "border-[#000] bg-[#000] cursor-default"
                    : "border-gray-100 bg-gray-50/50 opacity-50 cursor-not-allowed"
                  : "border-gray-200 bg-white hover:border-[#1fae3e] hover:shadow-sm cursor-pointer"
              }
            `}
          >
            {opt.icon && (
              <span
                className={`mt-0.5 flex-shrink-0 ${isSelected ? "text-[#1fae3e]" : "text-gray-500"}`}
              >
                {opt.icon}
              </span>
            )}
            <div className="min-w-0">
              <p
                className={`text-sm font-semibold leading-tight ${isSelected ? "text-[#1fae3e]" : "text-gray-800"}`}
              >
                {opt.label}
              </p>
              {opt.sub && (
                <p className="text-xs text-gray-400 mt-0.5 leading-snug">
                  {opt.sub}
                </p>
              )}
            </div>
            {isSelected && (
              <div className="ml-auto flex-shrink-0 w-4 h-4 rounded-full bg-[#1fae3e] flex items-center justify-center">
                <Check size={10} className="text-white" />
              </div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}

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
    className={`bg-white rounded-xl border border-black/[0.08] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] p-4 md:p-6 ${className}`}
  >
    {children}
  </motion.div>
);

const Badge = ({
  children,
  color = "blue",
}: {
  children: React.ReactNode;
  color?: "blue" | "green" | "gray" | "orange" | "red" | "yellow";
}) => {
  const styles = {
    blue: "bg-[#005BFF]/10 text-[#005BFF]",
    green: "bg-[#18A36F]/10 text-[#18A36F]",
    gray: "bg-gray-100 text-gray-600",
    orange: "bg-orange-500/10 text-orange-600",
    red: "bg-red-100 text-red-600",
    yellow: "bg-yellow-50 text-yellow-500",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[color]}`}
    >
      {children}
    </span>
  );
};

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function LIAMConversation() {
  const location_state = useLocation();

  const intent = location_state.state?.intent;
  const input = location_state.state?.input;
 

  // let INITIAL_MSGS = [];

  //   if (intent === "find_investment_opportunities") {
  //     INITIAL_MSGS = [
  //       // {
  //       //   id: "welcome",
  //       //   role: "assistant",
  //       //   content:
  //       //     "Hi, I'm LIAM.\n\nI use the Liquidity Investment Analysis Model to identify high-quality real estate investment opportunities.\n\nLet's start by understanding your investment criteria.",
  //       //   timestamp: nowTime(),
  //       //   type: "text",
  //       // },
  //       {
  //         id: "step1-q",
  //         role: "assistant",
  //         content: "Enter Property Address",
  //         timestamp: nowTime(),
  //         type: "input",
  //         stepNum: 1,
  //       },
  //     ];
  //   }
  //   else if(intent === 'find_fixer_upper_deals'){
  //  INITIAL_MSGS = [
  //       // {
  //       //   id: "welcome",
  //       //   role: "assistant",
  //       //   content:
  //       //     "Hi, I'm LIAM.\n\nI use the Liquidity Investment Analysis Model to identify high-quality real estate investment opportunities.\n\nLet's start by understanding your investment criteria.",
  //       //   timestamp: nowTime(),
  //       //   type: "text",
  //       // },
  //       {
  //         id: "step1-q",
  //         role: "assistant",
  //         content: 'Please enter a location to see available flipper properties',
  //         timestamp: nowTime(),
  //         type: "input",
  //         stepNum: 1,
  //       },
  //     ];
  //   }

  //   else {
  //     INITIAL_MSGS = [
  //       // {
  //       //   id: "welcome",
  //       //   role: "assistant",
  //       //   content:
  //       //     "Hi, I'm LIAM.\n\nI use the Liquidity Investment Analysis Model to identify high-quality real estate investment opportunities.\n\nLet's start by understanding your investment criteria.",
  //       //   timestamp: nowTime(),
  //       //   type: "text",
  //       // },
  //       {
  //         id: "step1-q",
  //         role: "assistant",
  //         content: STEPS[0].question,
  //         timestamp: nowTime(),
  //         type: "input",
  //         stepNum: 1,
  //       },
  //     ];
  //   }

  const [messages, setMessages] = useState<Msg[]>("");

  const [currentStep, setCurrentStep] = useState(1);
  const [answeredSteps, setAnsweredSteps] = useState<Set<number>>(new Set());
  const [selections, setSelections] = useState<Record<number, string>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeConv, setActiveConv] = useState("1");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const [properties, setproperties] = useState([]);

  const [homesData, setHomesData] = useState([]);

  const [selectedProperty, setSelectedProperty] = useState(null);


  const handleSaveRoadmap = async (chat,isRoadmap,title) => {
  try {
    const payload = {
      roadmap_completed: true,
      context: {
        goal: "Buy Rental Property",
        budget: 500000,
        timeline: "12 months",
        location: "Dallas, TX",
      },
    };

    const { data } = await saveUserChat(
      {
      roadmap_completed: isRoadmap,
      context: chat,
      user_uuid:'23319d59-47f4-4f16-88b7-459e5e7c542a',
      title:title
    }
    );
    

    console.log("Saved:", data);
  } catch (err) {
    console.error(err);
  }
};

  const fetchPropertiesDetails = async (zpid) => {
    try {
      const response = await axios.get(
        `https://zhomes-realty-us.p.rapidapi.com/properties/details?zpid=${zpid}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "a48bfbafb3msh42b1f23858b4dd2p127af3jsne5dc6836da5a",
            "X-RapidAPI-Host": "zhomes-realty-us.p.rapidapi.com",
          },
        },
      );
      if (response.data.message === "Successful") {
        setHomesData(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchByAddress = async (address) => {
    try {
      const response = await axios.get(
        `https://zhomes-realty-us.p.rapidapi.com/properties/search-address?address=${address}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "a48bfbafb3msh42b1f23858b4dd2p127af3jsne5dc6836da5a",
            "X-RapidAPI-Host": "zhomes-realty-us.p.rapidapi.com",
          },
        },
      );
      if (response.data.message === "Successful") {
        await fetchPropertiesDetails(response?.data?.data?.zpid);
      }
    } catch (error) {
      console.log(error);
    }
  };

  async function fetchProperties(location) {
    console.log(location);
    try {
      setIsTyping(true);

      const options = {
        method: "POST",
        url: "https://zhomes-realty-us.p.rapidapi.com/v2/properties/search-for-sale",
        headers: {
          "x-rapidapi-key":
            "a48bfbafb3msh42b1f23858b4dd2p127af3jsne5dc6836da5a",
          "x-rapidapi-host": "zhomes-realty-us.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        data: {
          location: location, // Address entered by user
        },
      };

      const response = await axios.request(options);

      let properties = response.data.data ?? [];

      properties.splice(6);
      // -----------------------
      // Property Type Filter
      // -----------------------

      properties = properties.filter((item: any) => {
        const type = item.property?.propertyType;

        return selections[2]?.includes(type);
      });

      // -----------------------
      // Budget Filter
      // -----------------------

      properties = properties.filter((item: any) => {
        const price = item.property?.price?.value ?? 0;

        switch (selections[3]) {
          case "Under $500K":
            return price < 500000;

          case "$500K – $1M":
            return price >= 500000 && price <= 1000000;

          case "$1M – $5M":
            return price >= 1000000 && price <= 5000000;

          case "$5M – $10M":
            return price >= 5000000 && price <= 10000000;

          case "Over $10M":
            return price > 10000000;

          case "Not Sure":
          default:
            return true;
        }
      });

      setproperties(properties);

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          type: "text",
          timestamp: nowTime(),
          content: `I found ${properties.length} matching properties based on your criteria.`,
        },
        {
          id: uid(),
          role: "assistant",
          type: "results",
          timestamp: nowTime(),
          content: "__RESULTS__",
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          type: "text",
          timestamp: nowTime(),
          content: "Sorry, I couldn't retrieve property listings.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  const [FlipperProperties, setFlipperProperties] = useState([]);

  async function fetchFlipperProperties() {
    try {
      setIsTyping(true);

      const options = {
        method: "GET",
        url: "https://zhomes-realty-us.p.rapidapi.com/properties/search",
        headers: {
          "x-rapidapi-key":
            "a48bfbafb3msh42b1f23858b4dd2p127af3jsne5dc6836da5a",
          "x-rapidapi-host": "zhomes-realty-us.p.rapidapi.com",
          "Content-Type": "application/json",
        },
        params: {
          location: selections[1],
          priceType: "listPrice",
          keywords: "fixerupper or TLC",
        },
      };

      const response = await axios.request(options);

      console.log(response);

      let properties = response.data.data ?? [];

      properties.splice(6);
      // -----------------------
      // Property Type Filter
      // -----------------------

      properties = properties.filter((item: any) => {
        const type = item?.propertyType;

        return selections[2]?.includes(type);
      });

      // -----------------------
      // Budget Filter
      // -----------------------

      properties = properties.filter((item: any) => {
        const price = item?.price?.value ?? 0;

        switch (selections[3]) {
          case "Under $500K":
            return price < 500000;

          case "$500K – $1M":
            return price >= 500000 && price <= 1000000;

          case "$1M – $5M":
            return price >= 1000000 && price <= 5000000;

          case "$5M – $10M":
            return price >= 5000000 && price <= 10000000;

          case "Over $10M":
            return price > 10000000;

          case "Not Sure":
          default:
            return true;
        }
      });

      setFlipperProperties(properties);

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          type: "text",
          timestamp: nowTime(),
          content: `I found ${properties.length} matching properties that are flippable and profitable.`,
        },
        {
          id: uid(),
          role: "assistant",
          type: "fixer",
          timestamp: nowTime(),
          content: "__RESULTS__",
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          type: "text",
          timestamp: nowTime(),
          content: "Sorry, I couldn't retrieve property listings.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }

  async function handlePropertySelect(property) {
    await fetchPropertiesDetails(property?.property?.zpid);

    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "assistant",
        type: "text",
        timestamp: nowTime(),
        content: `I have Generated the detailed view of the House`,
      },
      {
        id: uid(),
        role: "assistant",
        type: "details",
        timestamp: nowTime(),
        content: "__RESULTS__",
      },
    ]);
  }

  const [ReportStep, setReportStep] = useState(1);

  async function handleReportGenerate() {
    if (ReportStep === 1) {
      getTimeSeries();
      setMessages((prev) => [
        ...prev,
        {
          id: uid(),
          role: "assistant",
          type: "text",
          timestamp: nowTime(),
          content: `Now we are going to dig deeper in the Property.`,
        },
        {
          id: uid(),
          role: "assistant",
          type: "text",
          timestamp: nowTime(),
          content: `Here is the Detailed Estimate of Your Property.`,
        },
        {
          id: uid(),
          role: "assistant",
          type: "report",
          timestamp: nowTime(),
          content: "__RESULTS__",
        },
      ]);

      if (ReportStep === 2) {
        setMessages((prev) => [
          ...prev,
          {
            id: uid(),
            role: "assistant",
            type: "text",
            timestamp: nowTime(),
            content: `Not all equity should be touched. Here's is The amount that can be safely deployed`,
          },

          {
            id: uid(),
            role: "assistant",
            type: "report",
            timestamp: nowTime(),
            content: "__RESULTS__",
          },
          {
            id: uid(),
            role: "assistant",
            type: "text",
            timestamp: nowTime(),
            content: `This is the amount you can confidently put to work`,
          },
        ]);
      }
    }
  }

  function handleInformationSubmit() {
    setMessages((prev) => [
      ...prev,
      {
        id: uid(),
        role: "assistant",
        type: "text",
        timestamp: nowTime(),
        content: `You're all set.`,
      },
      {
        id: uid(),
        role: "assistant",
        type: "text",
        timestamp: nowTime(),
        content: `I've shared your information with the designated team.`,
      },
      {
        id: uid(),
        role: "assistant",
        type: "text",
        timestamp: nowTime(),
        content: `In the meantime, I'm still here to help. We can review properties, analyze documents, explore financing options, or answer any real estate questions you have.`,
      },
      {
        id: uid(),
        role: "assistant",
        type: "text",
        timestamp: nowTime(),
        content: `What’s next on your mind?`,
      },
    ]);
  }

  function handleOptionSelect(opt: Option, stepNum: number) {
    if (answeredSteps.has(stepNum)) return;

    setAnsweredSteps((prev) => new Set([...prev, stepNum]));
    setSelections((prev) => ({ ...prev, [stepNum]: opt.id }));

    const userMsg: Msg = {
      id: uid(),
      role: "user",
      content: opt.label,
      timestamp: nowTime(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(async () => {
      setIsTyping(false);
      const nextStep = stepNum + 1;

      if (nextStep <= STEPS.length) {
        const stepData = STEPS[nextStep - 1];
        const aiMsg: Msg = {
          id: uid(),
          role: "assistant",
          content: stepData.question,
          timestamp: nowTime(),
          type: "options",
          options: stepData.options,
          stepNum: nextStep,
        };
        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStep(nextStep);
      } else {
        setCurrentStep(STEPS.length + 1);

        if (intent === "find_fixer_upper_deals") {
          await fetchFlipperProperties();
        } else {
          await fetchProperties(location);
        }
      }
    }, 1400);
  }

  type OpenAIMessage = {
    role: "system" | "user" | "assistant";
    content: {
      type: "input_text" | "output_text";
      text: string;
    }[];
  };

  const SYSTEM_PROMPT = "...";

  const [conversation, setConversation] = useState<OpenAIMessage[]>([
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: "Hello",
        },
      ],
    },
  ]);

  const [briefing, setBriefing] = useState(null);

  useEffect(() => {
    const initialChat = async () => {
      let ai = "";
      setIsTyping(true);
      const conversations =
  input !== undefined
    ? [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: input,
            },
          ],
        },
      ]
    : conversation;

    console.log(conversations)
      try {
        const response = await chatStart({
          conversations,
          intent,
        });
        console.log(response);

        ai = JSON.parse(response.data.msg);

        setIsTyping(false);

        
        // UI message
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: ai.message,
            type: "text",
            timestamp: nowTime(),
          },
        ]);

        // Conversation history
        setConversation((prev) => [
          ...prev,
          {
            role: "assistant",
            content: [
              {
                type: "output_text",
                text: JSON.stringify(ai),
              },
            ],
          },
        ]);
      } catch (err) {
        console.error(err);
      }
    };
  



      const getBriefing = async() =>{

        setIsTyping(true);
        const brief = await getDailyBriefing()

        setBriefing(brief?.briefing)

        

            

          setMessages((prev) => [
            ...prev,
            {
              id: Date.now().toString(),
              role: "assistant",
              timestamp: nowTime(),
              type: "Briefing",
              content: briefing,
            },
          ]);

           setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            content: brief?.message,
            type: "text",
            timestamp: nowTime(),
          },
        ]);

      setIsTyping(false);

      }


    if(intent !== 'daily_briefing')
       {initialChat();}

     


      if(intent === 'daily_briefing'){
      getBriefing()
        
      }
  }, []);

  const [location, setlocation] = useState();

  const [roadmap, setRoadmap] = useState(null);

  async function handleInputSelect(value: string, stepNum: number) {
    let ai;

    const input = value.trim();
    if (!input) return;

    const nextConversation = [
      ...conversation,
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: input,
          },
        ],
      },
    ];

    setConversation(nextConversation);

    const userMsg1: Msg = {
      id: uid(),
      role: "user",
      content: input,
      timestamp: nowTime(),
      type: "text",
    };

    setMessages((prev) => [...prev, userMsg1]);
    setInputValue("");
    setIsTyping(true);
    try {
      const response = await chatStart({
        conversations: nextConversation,
        intent,
      });
      console.log(response);

      ai = JSON.parse(response.data.msg);
      console.log(ai.location);
      console.log(ai?.completed);
      setIsTyping(false);

      if (intent === "create_roadmap" && ai?.completed) {
        setRoadmap(ai);

        setMessages((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            role: "assistant",
            timestamp: nowTime(),
            type: "Roadmap",
            content: roadmap,
          },
        ]);
      }


      await handleSaveRoadmap(messages,true,ai?.roadmap?.title)

      // UI message
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content: ai.message,
          type: "text",
          timestamp: nowTime(),
        },
      ]);

      // Conversation history
      setConversation((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [
            {
              type: "output_text",
              text: JSON.stringify(ai),
            },
          ],
        },
      ]);
    } catch (err) {
      console.error(err);
    }

    if (ai.location === null || ai.location === undefined) return;

    console.log(ai.location);

    setlocation(ai.location);

    if (answeredSteps.has(stepNum)) return;

    console.log("hello");

    // Save answer
    setAnsweredSteps((prev) => new Set([...prev, stepNum]));

    setSelections((prev) => ({
      ...prev,
      [stepNum]: input,
    }));

    setIsTyping(true);

    setTimeout(async () => {
      // -------------------------
      // REPORT MODE
      // -------------------------
      // if (intent === "find_investment_opportunities") {
      //   await fetchByAddress(ai.location);

      //   setIsTyping(false);
      //   setCurrentStep(STEPS.length + 1);

      //   setMessages((prev) => [
      //     ...prev,
      //     {
      //       id: uid(),
      //       role: "assistant",
      //       timestamp: nowTime(),
      //       type: "text",
      //       content: "Here's the detailed analysis of your property.",
      //     },
      //     {
      //       id: uid(),
      //       role: "assistant",
      //       timestamp: nowTime(),
      //       type: "details",
      //       content: "__DETAILS__",
      //     },
      //   ]);

      //   return;
      // }

      // -------------------------
      // NORMAL CHAT FLOW
      // -------------------------
      setIsTyping(false);

      const nextStep = stepNum + 1;

      if (nextStep <= STEPS.length) {
        const stepData = STEPS[nextStep - 1];

        const aiMsg: Msg = {
          id: uid(),
          role: "assistant",
          content: stepData.question,
          timestamp: nowTime(),
          type: stepData.type,
          options: stepData.options,
          stepNum: nextStep,
        };

        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStep(nextStep);
      } else {
        setCurrentStep(STEPS.length + 1);

        if (intent === "find_fixer_upper_deals") {
          await fetchFlipperProperties();
        } else {
          await fetchProperties(ai.location);

          setCurrentStep(1);
          setAnsweredSteps(new Set());
          setSelections({});
          setShowResults(false);
          console.log("hell");
        }
      }
    }, 1400);
  }

  function handleReset() {
    // setMessages(INITIAL_MSGS);
    setCurrentStep(1);
    setAnsweredSteps(new Set());
    setSelections({});
    setIsTyping(false);
    setShowResults(false);
  }

  const selectionLabels: Record<number, string> = {
    1: "Property Type",
    2: "Budget",
    3: "Goal",
    4: "Location",
    5: "Risk",
  };

  const roiMonthly = [
    { month: "M1", val: +(1000).toFixed(1) },
    { month: "M3", val: +(2000).toFixed(1) },
    { month: "M6", val: +(3000).toFixed(1) },
    { month: "Y1", val: 4000 },
    { month: "Y2", val: +(5000).toFixed(1) },
    { month: "Y3", val: +(6000).toFixed(1) },
  ];

  const data = [
    { name: "Remaning", value: 40 },
    { name: "Used", value: 60 },
  ];
  const colors = ["#424141", "#008000"];

  // -------------------------------------------Report Data ------------------------------------------------------------------------//

  const housePrice = parseInt(homesData?.price);

  const [HousePrices, setHousePrices] = useState([]);

  const [AnnualGrowth, setAnnualGrowth] = useState({});

  const getTimeSeries = async () => {
    const { SandP, Bonds, Bitcoin, HouseRate, HousePrices } =
      await gettimeSeriesData(homesData);

    setHousePrices(HousePrices);

    let houseGrowthModified = 0;

    if (HouseRate > 5) houseGrowthModified = 5;
    else if (HouseRate < -2) houseGrowthModified = -2;
    else houseGrowthModified = HouseRate;

    setAnnualGrowth({
      sp500: parseInt(Number(SandP)),
      bonds: parseInt(Number(Bonds)),
      crypto: parseInt(Number(Bitcoin)),
      cash: 2,
      house: Number(HouseRate),
      conservativeHouseGrowth: houseGrowthModified,
    });
  };

  const [HouseGrowthData, setHouseGrowthData] = useState([]);

  useEffect(() => {
    if (!HousePrices?.length) return;

    const now = new Date();

    // Build lookup map
    const priceMap = new Map();

    HousePrices.forEach((item) => {
      const d = new Date(item?.x);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
      priceMap.set(key, Number(item?.y));
    });

    // fallback finder (search previous months if exact month missing)
    const getClosePrice = (yearOffset) => {
      let year = now.getFullYear() - yearOffset;
      let month = now.getMonth() + 1;

      while (year >= 1900) {
        const key = `${year}-${String(month).padStart(2, "0")}`;

        if (priceMap.has(key)) {
          return priceMap.get(key);
        }

        month--;

        if (month === 0) {
          month = 12;
          year--;
        }
      }

      return null;
    };

    // limit growth rate
    let houseGrowthModified = AnnualGrowth.house;
    if (AnnualGrowth.house > 5) houseGrowthModified = 5;
    if (AnnualGrowth.house < -2) houseGrowthModified = -2;

    const basePrice = getClosePrice(0);

    if (!basePrice) return;

    const result = [];

    // past 5 years
    for (let i = 3; i > 0; i--) {
      result.push({
        year: now.getFullYear() - i,
        value: getClosePrice(i),
      });
    }

    // current year
    result.push({
      year: now.getFullYear(),
      value: basePrice,
      projected: true,
    });

    // future projections
    for (let i = 1; i <= 3; i++) {
      result.push({
        year: now.getFullYear() + i,
        value: basePrice * (1 + houseGrowthModified / 100) ** i,
        projected: true,
        fontSize: "11px",
      });
    }

    setHouseGrowthData(result);
    console.log(result);
  }, [HousePrices, AnnualGrowth.house]);

  const [PortfolioOptions, setPortfolioOptions] = useState([
    {
      value: "Baseline",
      Risk: "No Risk",
      ReturnsFromHouse: "",
      portfoliopercentReturn: "",
      PortfolioReturns: "",
      profitAfterTax: "",
      EstimatedHousePrice: "",
      CapitalGainsTax: "",
      PortfolioReturnsBeforeTax: "",
      textColor: "text-[#000]",
      borderColor: "border-[#cfcfd7]",
      gradientBg: "bg-black/10",
      icon2: <House size={14} />,
      color: "gray",
    },

    {
      value: "LIAM Basic",
      Risk: "Cash Preservation",
      ReturnsFromHouse: "",
      portfoliopercentReturn: "",
      PortfolioReturns: "",
      profitAfterTax: "",
      EstimatedHousePrice: "",
      CapitalGainsTax: "",
      PortfolioReturnsBeforeTax: "",
      color: "blue",
      borderColor: "border-[#005BFF]/20",
      bgColor: "bg-[#005BFF]",
      textColor: "text-[#005BFF]",
      gradientBg: "bg-[#005BFF]/10",
      icon: <Shield size={10} />,
      icon2: <Sprout size={14} />,
    },
    {
      value: "LIAM Plus",
      Risk: "Medium Growth",
      ReturnsFromHouse: "",
      portfoliopercentReturn: "",
      PortfolioReturns: "",
      profitAfterTax: "",
      EstimatedHousePrice: "",
      CapitalGainsTax: "",
      PortfolioReturnsBeforeTax: "",
      color: "green",
      borderColor: "border-[#18A36F]/20",
      bgColor: "bg-[#18a36f]",
      textColor: "text-[#18a36f]",
      gradientBg: "bg-[#18a36f]/10",
      icon: <Shield size={10} />,
      icon2: <BanknoteArrowUp size={14} />,
    },
    {
      value: "LIAM Pro",
      Risk: "High Growth",
      ReturnsFromHouse: "",
      portfoliopercentReturn: "",
      PortfolioReturns: "",
      profitAfterTax: "",
      EstimatedHousePrice: "",
      CapitalGainsTax: "",
      PortfolioReturnsBeforeTax: "",
      color: "yellow",
      borderColor: "border-orange-200",
      bgColor: "bg-yellow-300",
      textColor: "text-yellow-400",
      gradientBg: "bg-yellow-400/10",
      icon: <AlertCircle size={10} />,
      icon2: <Rocket size={14} />,
    },
    {
      value: "Custom",
      Risk: "High Risk",
      ReturnsFromHouse: "",
      portfoliopercentReturn: "",
      PortfolioReturns: "",
      profitAfterTax: "",
      EstimatedHousePrice: "",
      CapitalGainsTax: "",
      PortfolioReturnsBeforeTax: "",

      color: "gray",
      borderColor: "border-[#cfcfd7]",
      bgColor: "bg-white",
      textColor: "text-black",
      gradientBg: "bg-black/10",
      icon: <AlertCircle size={10} />,
      icon2: <Blocks size={14} />,
    },
  ]);

  const getAllocation = (strategy) => {
    switch (strategy) {
      case "Baseline":
        return { sp500: 0, bonds: 0, crypto: 0, cash: 0 };
      case "LIAM Basic":
        return { sp500: 36, bonds: 39, crypto: 10, cash: 15 };
      case "LIAM Plus":
        return { sp500: 49, bonds: 21, crypto: 20, cash: 10 };
      case "LIAM Pro":
        return { sp500: 56, bonds: 10, crypto: 29, cash: 5 };
      default:
        return { sp500: 36, bonds: 39, crypto: 15, cash: 10 };
    }
  };

  const CalculateReturns = (strategy) => {
    const ReinvestHouseAmount = 0.3375 * housePrice; //considering 60% margin and 8.75% heloc paid for 5 years

    const SandPAmount =
      ReinvestHouseAmount * (getAllocation(strategy).sp500 / 100);
    const bondsAmount =
      ReinvestHouseAmount * (getAllocation(strategy).bonds / 100);
    const cashAmount =
      ReinvestHouseAmount * (getAllocation(strategy).cash / 100);
    const cryptoAmount =
      ReinvestHouseAmount * (getAllocation(strategy).crypto / 100);

    const SandPReturn =
      SandPAmount * Math.pow(1 + AnnualGrowth.sp500 / 100, 5) - SandPAmount;
    const BondsReturn =
      bondsAmount * Math.pow(1 + AnnualGrowth.bonds / 100, 5) - bondsAmount;
    const CashReturn = cashAmount * Math.pow(1.02, 5) - cashAmount;
    const CryptoReturn =
      cryptoAmount * Math.pow(1 + AnnualGrowth.crypto / 100, 5) - cryptoAmount;
    const HouseReturn =
      housePrice * Math.pow(1 + AnnualGrowth.conservativeHouseGrowth / 100, 5) -
      housePrice;

    const TotalReturns =
      Number(SandPReturn) +
      Number(BondsReturn) +
      Number(CashReturn) +
      Number(CryptoReturn); // Returns From Portfolio

    const CapitalGainsTax = TotalReturns * 0.15; //Assuming 15% capital gains Tax

    const ReturnsFromHouse = HouseReturn; // By how much the house have grown

    const portfoliopercentReturn =
      (getAllocation(strategy).sp500 / 100) * AnnualGrowth.sp500 +
      (getAllocation(strategy).bonds / 100) * AnnualGrowth.bonds +
      (getAllocation(strategy).crypto / 100) * AnnualGrowth.crypto +
      (getAllocation(strategy).cash / 100) * AnnualGrowth.cash; //weighted return of the portfolio

    const PortfolioReturns = TotalReturns - CapitalGainsTax;

    const profitAfterTax = PortfolioReturns + HouseReturn;

    const EstimatedHousePrice = HouseReturn + housePrice;

    const PortfolioReturnsBeforeTax = TotalReturns;
    return {
      ReturnsFromHouse: ReturnsFromHouse,
      portfoliopercentReturn: portfoliopercentReturn * 5,
      PortfolioReturns: PortfolioReturns,
      profitAfterTax: profitAfterTax, //total gain
      EstimatedHousePrice: EstimatedHousePrice,
      CapitalGainsTax: CapitalGainsTax,
      PortfolioReturnsBeforeTax: PortfolioReturnsBeforeTax,
    };
  };

  useEffect(() => {
    setPortfolioOptions((prev) =>
      prev.map((item, i) =>
        i === 0
          ? {
              ...item,
              ReturnsFromHouse: parseInt(
                CalculateReturns("Baseline").ReturnsFromHouse,
              ),
              portfoliopercentReturn: 0,
              PortfolioReturns: 0,
              profitAfterTax: parseInt(
                CalculateReturns("Baseline").ReturnsFromHouse,
              ),
              EstimatedHousePrice: parseInt(
                CalculateReturns("Baseline").EstimatedHousePrice,
              ),
              CapitalGainsTax: 0,
              PortfolioReturnsBeforeTax: 0,
            }
          : i === 1
            ? {
                ...item,
                ReturnsFromHouse: parseInt(
                  CalculateReturns("LIAM Basic").ReturnsFromHouse,
                ),
                portfoliopercentReturn: parseInt(
                  CalculateReturns("LIAM Basic").portfoliopercentReturn,
                ),
                PortfolioReturns: parseInt(
                  CalculateReturns("LIAM Basic").PortfolioReturns,
                ),
                profitAfterTax: parseInt(
                  CalculateReturns("LIAM Basic").profitAfterTax,
                ),
                EstimatedHousePrice: parseInt(
                  CalculateReturns("LIAM Basic").EstimatedHousePrice,
                ),
                CapitalGainsTax: parseInt(
                  CalculateReturns("LIAM Basic").CapitalGainsTax,
                ),
                PortfolioReturnsBeforeTax: parseInt(
                  CalculateReturns("LIAM Basic").PortfolioReturnsBeforeTax,
                ),
              }
            : i === 2
              ? {
                  ...item,
                  ReturnsFromHouse: parseInt(
                    CalculateReturns("LIAM Plus").ReturnsFromHouse,
                  ),
                  portfoliopercentReturn: parseInt(
                    CalculateReturns("LIAM Plus").portfoliopercentReturn,
                  ),
                  PortfolioReturns: parseInt(
                    CalculateReturns("LIAM Plus").PortfolioReturns,
                  ),
                  profitAfterTax: parseInt(
                    CalculateReturns("LIAM Plus").profitAfterTax,
                  ),
                  EstimatedHousePrice: parseInt(
                    CalculateReturns("LIAM Plus").EstimatedHousePrice,
                  ),
                  CapitalGainsTax: parseInt(
                    CalculateReturns("LIAM Plus").CapitalGainsTax,
                  ),
                  PortfolioReturnsBeforeTax: parseInt(
                    CalculateReturns("LIAM Plus").PortfolioReturnsBeforeTax,
                  ),
                }
              : i === 3
                ? {
                    ...item,
                    ReturnsFromHouse: parseInt(
                      CalculateReturns("LIAM Pro").ReturnsFromHouse,
                    ),
                    portfoliopercentReturn: parseInt(
                      CalculateReturns("LIAM Pro").portfoliopercentReturn,
                    ),
                    PortfolioReturns: parseInt(
                      CalculateReturns("LIAM Pro").PortfolioReturns,
                    ),
                    profitAfterTax: parseInt(
                      CalculateReturns("LIAM Pro").profitAfterTax,
                    ),
                    EstimatedHousePrice: parseInt(
                      CalculateReturns("LIAM Pro").EstimatedHousePrice,
                    ),
                    CapitalGainsTax: parseInt(
                      CalculateReturns("LIAM Pro").CapitalGainsTax,
                    ),
                    PortfolioReturnsBeforeTax: parseInt(
                      CalculateReturns("LIAM Pro").PortfolioReturnsBeforeTax,
                    ),
                  }
                : item,
      ),
    );
  }, [AnnualGrowth]);

  const [selectedPortfolio, setSelectedPortfolio] = useState({});

  ChartJS.register(ArcElement, Legend, Tooltip2);

  const data1 = {
    labels: ["S&P 500", "Bonds", "Crypto", "Cash"],
    datasets: [
      {
        label: "Invested%",
        data: [
          getAllocation(selectedPortfolio?.value).sp500,
          getAllocation(selectedPortfolio?.value).bonds,
          getAllocation(selectedPortfolio?.value).crypto,
          getAllocation(selectedPortfolio?.value).cash,
        ], // MUST be numbers
        backgroundColor: ["#10B981", "#F97316", "#A855F7", "#4F46E5"],
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

  // -------------------------------------------------------------------------------------------------------------------------------//

  return (
    <div className="h-[83vh]  flex overflow-hidden bg-[#0B0F14] font-[Geist]">
      {/* ── Left Sidebar ──────────────────────────────────────────────────── */}

      {/* ── Center Chat Panel ──────────────────────────────────────────────── */}
      <main
        className={`flex-1 flex flex-col min-w-0  ${sidebarOpen ? "bg-[#fafafa]/40" : "bg-[#fafafa]"}`}
      >
        {/* Chat header */}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-5 scrollbar-hidden">
          <div className="max-w-3xl mx-auto space-y-5">
            {messages?.length !== 0 &&
              messages?.map((msg) => {
                if (msg.role === "assistant" && msg.type === "results") {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4">
                      {properties?.map((p, i) => (
                        <PropertyCard
                          handlePropertySelect={handlePropertySelect}
                          key={p.id}
                          property={p}
                          index={i}
                        />
                      ))}
                    </div>
                  );
                }

                if (msg.role === "assistant" && msg.type === "Briefing") {
                  return (
                    <div
                      key={msg.id}
                      className="border-[0.5px] border-[#cfcfd7] rounded-3xl shadow-sm shadow-black/10 p-3"
                    >
                      {briefing && (
                        <div className="space-y-6">
                          {/* Header */}
                          <div className="text-center">
                            <h1 className="text-3xl font-bold text-[#1fae3e]">
                              {briefing.title}
                            </h1>

                            <p className="mt-2 text-sm text-gray-500">
                              {briefing.date}
                            </p>
                          </div>

                          {/* Sections */}
                          {briefing.sections.map((section, index) => {
                            const isSummary =
                              section.title.toLowerCase() ===
                              "executive summary";

                            return (
                              <div
                                key={index}
                                className={
                                  isSummary
                                    ? "rounded-3xl border-2 border-[#1fae3e] bg-[#ecfdf3] p-5"
                                    : "border-[0.5px] border-[#cfcfd7] rounded-3xl shadow-sm shadow-black/10 p-5 bg-white"
                                }
                              >
                                <h2 className="text-xl font-semibold text-[#1fae3e] mb-4">
                                  {section.title}
                                </h2>

                                <div className="text-black whitespace-pre-wrap leading-7">
                                  {section.content}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                }
                if (msg.role === "assistant" && msg.type === "details") {
                  return (
                    <div
                      key={msg.id}
                      className="border-[0.5px] border-[#cfcfd7] rounded-3xl shadow-sm shadow-black/10 p-3"
                    >
                      <div className="relative h-54 bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-2">
                        <img
                          src={homesData?.photoUrlsHighRes?.[0]?.url}
                          alt={"xdcdfdfd"}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute top-3 left-3 bg-black  backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                          # {1} Match
                        </div>
                        <button
                          // onClick={() => setSaved(!saved)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all  text-white" `}
                        >
                          <Heart size={14} fill="none" />
                        </button>
                      </div>

                      <div className=" text-[#18181B] border-[0.5px] border-[#cfcfd7] mb-5 px-5 py-3 rounded-2xl flex  gap-2 items-center justify-between">
                        <div className="flex flex-col gap-2 items-start justify-between ">
                          <p className="font-semibold text-xl leading-tight">
                            {/* {selectedProperty?.address.street} */}39 Brandis Ave
                          </p>
                          <p className="text-md text-[#71717A] flex items-center gap-1">
                            <MapPin size={16} />{" "}
                            {/* {selectedProperty?.address.city} */}
                            Staten Island
                          </p>

                          <div className="flex items-center gap-2">
                            <div className="text-[#71717A] text-xs font-medium border-[1px] border-[#e4e4e7] py-[2px] px-2 rounded-md">
                              {homesData?.resoFacts?.homeType}
                            </div>
                            <div className="text-[#71717A] text-xs font-medium border-[1px] border-[#e4e4e7] py-[2px] px-2 rounded-md">
                              Built In {homesData?.resoFacts?.yearBuilt}
                            </div>
                          </div>
                        </div>

                        <div className="p-4 text-[#1fae3e] flex flex-col items-center justify-center  bg-[#10B9811A] rounded-xl">
                          <p className="text-[10px] text-black font-bold ">
                            LIAM SCORE
                          </p>
                          <h1 className="text-[28px] font-extrabold leading-tight ">
                            93
                          </h1>
                          <p className="text-[10px] font-bold ">Excellent</p>
                        </div>
                      </div>

                      <div className="px-5 py-3 bg-black text-[#1fae3e] rounded-2xl flex gap-2 items-center justify-between mb-5">
                        <h1 className="flex items-center justify-center flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
                          <p className="text-gray-100 text-sm">Price</p>
                          <p className="font-bold">
                            ${Number(homesData?.price).toLocaleString("en-us")}
                          </p>
                        </h1>
                        <h1 className="flex items-center justify-center flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
                          <p className="text-gray-100 text-sm">Price/Sq.Ft.</p>
                          <p className="font-bold capitalize">
                            $
                            {Number(
                              homesData?.resoFacts?.pricePerSquareFoot,
                            ).toLocaleString("en-us")}
                          </p>
                        </h1>
                        <h1 className="flex items-center justify-center flex-col  w-full">
                          <p className="text-gray-100 text-sm">Est. Rent</p>
                          <p className="font-bold capitalize">
                            {/* {selectedProperty?.rentZestimate
                              ? ` $
            ${Number(selectedProperty?.rentZestimate).toLocaleString("en-us")}`
                              : "0"} */}
                              $2,006 per month
                          </p>
                        </h1>
                      </div>

                      <div className="px-5 py-3 bg-[#10b9810a]  text-[#1fae3e] rounded-2xl grid grid-cols-3 gap-2 items-center justify-between mb-5">
                        <div className="flex flex-col items-center gap-[2px]">
                          <div className="p-3 bg-[#1fae3e] rounded-full text-[#fff]">
                            <Building2 size={16} />
                          </div>

                          <p className="text-[10px] text-[#15803D]">HOA Fee</p>

                          <h1 className="text-[#111827] text-[13px] font-bold">
                            $ 
                            {/* {homesData?.hoaFee} */}
                            300 / mo
                          </h1>
                        </div>
                        <div className="flex flex-col items-center gap-[2px]">
                          <div className="p-3 bg-[#1fae3e] rounded-full text-[#fff]">
                            <Armchair size={16} />
                          </div>

                          <p className="text-[10px] text-[#15803D]">
                            Furnished
                          </p>

                          <h1 className="text-[#111827] text-[13px] font-bold">
                            {homesData?.resoFacts?.furnished ? "Yes" : "No"}
                          </h1>
                        </div>

                        <div className="flex flex-col items-center gap-[2px]">
                          <div
                            div
                            className="p-3 bg-[#1fae3e] rounded-full text-[#fff]"
                          >
                            <Warehouse size={16} />
                          </div>

                          <p className="text-[10px] text-[#15803D]">
                            Garage Attached
                          </p>

                          <h1 className="text-[#111827] text-[13px] font-bold">
                            {homesData?.resoFacts?.hasAttachedGarage
                              ? "Yes"
                              : "NO"}
                          </h1>
                        </div>
                        <div className="flex flex-col items-center gap-[2px]">
                          <div className="p-3 bg-[#1fae3e] rounded-full text-[#fff]">
                            <CircleParking size={16} />
                          </div>
                          <p className="text-[10px] text-[#15803D]">
                            Open Parking
                          </p>

                          <h1 className="text-[#111827] text-[13px] font-bold">
                            {homesData?.resoFacts?.hasOpenParking
                              ? "Yes"
                              : "NO"}
                          </h1>
                        </div>
                        <div className="flex flex-col items-center gap-[2px]">
                          <div
                            div
                            className="p-3 bg-[#1fae3e] rounded-full text-[#fff]"
                          >
                            <Heater size={16} />
                          </div>

                          <p className="text-[10px] text-[#15803D]">Heating</p>

                          <h1 className="text-[#111827] text-[13px] font-bold">
                            {homesData?.resoFacts?.heating?.length > 0
                              ? homesData?.resoFacts?.heating?.[0]
                              : "NO"}
                          </h1>
                        </div>
                        <div className="flex flex-col items-center gap-[2px]">
                          <div className="p-3 bg-[#1fae3e] rounded-full text-[#fff]">
                            <Car size={16} />
                          </div>

                          <p className="text-[10px] text-[#15803D]">
                            Parking Features
                          </p>

                          <h1 className="text-[#111827] text-[13px] font-bold whitespace-nowrap">
                            {homesData?.resoFacts?.parkingFeatures?.length > 0
                              ? homesData?.resoFacts?.parkingFeatures?.[0]
                              : "NO"}
                          </h1>
                        </div>
                      </div>

                      <div className="flex flex-col gap-[12px]">
                        <div
                          onClick={() => {
                            handleReportGenerate();
                            setReportStep(1);
                          }}
                          className="p-3 text-white bg-[green] font-bold rounded-xl text-center cursor-pointer"
                        >
                          Generate AI Property Report
                        </div>

                        <div
                          onClick={() => {
                            setReportStep(3);
                          }}
                          className="p-3 bg-[#000] text-[#ffffff] font-bold rounded-xl text-center cursor-pointer"
                        >
                          Contact Agent
                        </div>
                      </div>
                    </div>
                  );
                }
                if (msg.role === "assistant" && msg.type === "Roadmap") {
                  return (
                    <div
                      key={msg.id}
                      className="border-[0.5px] border-[#cfcfd7] rounded-3xl shadow-sm shadow-black/10 p-5"
                    >
                      {/* Title */}
                      <h1 className="text-xl font-semibold text-[#1fae3e]">
                        {roadmap?.roadmap?.title}
                      </h1>

                      {/* Objective */}
                      <div className="mt-4">
                        <h2 className="font-semibold text-[#1fae3e]">
                          Objective
                        </h2>
                        <p className="text-sm text-[#4B5563] mt-1">
                          {roadmap?.roadmap?.objective}
                        </p>
                      </div>

                      {/* Assumptions */}
                      {roadmap?.roadmap?.assumptions?.length > 0 && (
                        <div className="mt-4">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Assumptions
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.assumptions?.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-[#4B5563]"
                                >
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Constraints */}
                      {roadmap?.roadmap?.constraints?.length > 0 && (
                        <div className="mt-4">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Constraints
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.constraints?.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-[#4B5563]"
                                >
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Phases */}
                      {roadmap?.roadmap?.phases?.length > 0 && (
                        <div className="mt-6">
                          <h2 className="text-lg font-semibold text-[#1fae3e]">
                            Your Roadmap
                          </h2>

                          <div className="mt-3 space-y-4">
                            {roadmap?.roadmap?.phases?.map((phase, index) => (
                              <div
                                key={index}
                                className="border border-[#E5E7EB] rounded-2xl p-4"
                              >
                                <div className="flex items-start justify-between gap-3">
                                  <h3 className="font-semibold text-[#111827]">
                                    {phase?.phase}
                                  </h3>

                                  {phase.timeline && (
                                    <span className="text-xs bg-[#F3F4F6] text-[#6B7280] px-2 py-1 rounded-full shrink-0">
                                      {phase.timeline}
                                    </span>
                                  )}
                                </div>

                                {/* Phase Objective */}
                                {phase?.objective && (
                                  <p className="text-sm text-[#4B5563] mt-2">
                                    {phase.objective}
                                  </p>
                                )}

                                {/* Actions */}
                                {phase?.actions?.length > 0 && (
                                  <div className="mt-3">
                                    <h4 className="text-sm font-semibold text-[#1fae3e]">
                                      Actions
                                    </h4>

                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                      {phase.actions?.map((action, i) => (
                                        <li
                                          key={i}
                                          className="text-sm text-[#4B5563]"
                                        >
                                          {action}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}

                                {/* Milestones */}
                                {phase.milestones?.length > 0 && (
                                  <div className="mt-3">
                                    <h4 className="text-sm font-semibold text-[#1fae3e]">
                                      Milestones
                                    </h4>

                                    <ul className="list-disc pl-5 mt-1 space-y-1">
                                      {phase.milestones.map((milestone, i) => (
                                        <li
                                          key={i}
                                          className="text-sm text-[#4B5563]"
                                        >
                                          {milestone}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Financing Preparation */}
                      {roadmap?.roadmap?.financing_preparation?.length > 0 && (
                        <div className="mt-5">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Financing Preparation
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.financing_preparation.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-[#4B5563]"
                                >
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Acquisition Criteria */}
                      {roadmap?.roadmap?.acquisition_criteria?.length > 0 && (
                        <div className="mt-5">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Acquisition Criteria
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.acquisition_criteria.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-[#4B5563]"
                                >
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Risk Controls */}
                      {roadmap?.roadmap?.risk_controls?.length > 0 && (
                        <div className="mt-5">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Risk Controls
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.risk_controls.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-[#4B5563]"
                                >
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}

                      {/* Metrics */}
                      {roadmap?.roadmap?.metrics?.length > 0 && (
                        <div className="mt-5">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Success Metrics
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.metrics.map((item, index) => (
                              <li
                                key={index}
                                className="text-sm text-[#4B5563]"
                              >
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* First Three Actions */}
                      {roadmap?.roadmap?.first_three_actions?.length > 0 && (
                        <div className="mt-5">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Your Next 3 Actions
                          </h2>

                          <div className="mt-3 space-y-2">
                            {roadmap?.roadmap?.first_three_actions.map(
                              (action, index) => (
                                <div
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <div className="w-6 h-6 rounded-full bg-[#DCFCE7] text-[#2D8A21] flex items-center justify-center shrink-0 text-xs font-semibold">
                                    {index + 1}
                                  </div>

                                  <p className="text-sm text-[#4B5563] pt-[2px]">
                                    {action}
                                  </p>
                                </div>
                              ),
                            )}
                          </div>
                        </div>
                      )}

                      {/* Live Data Requirements */}
                      {roadmap?.roadmap?.live_data_requirements?.length > 0 && (
                        <div className="mt-5">
                          <h2 className="font-semibold text-[#1fae3e]">
                            Live Data Required
                          </h2>

                          <ul className="list-disc pl-5 mt-2 space-y-1">
                            {roadmap?.roadmap?.live_data_requirements.map(
                              (item, index) => (
                                <li
                                  key={index}
                                  className="text-sm text-[#4B5563]"
                                >
                                  {item}
                                </li>
                              ),
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                }

                if (msg.role === "assistant" && msg.type === "fixer") {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4">
                      {FlipperProperties?.map((property, i) => {
                        return (
                          <div className="border-[0.5px] border-[#cfcfd7] rounded-3xl shadow-sm shadow-black/10 p-3">
                            <div className="relative h-54 bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden mb-2">
                              <img
                                src={
                                  property?.media?.propertyPhotoLinks
                                    ?.highResolutionLink
                                }
                                alt={property?.address?.streetAddress}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                              <div className="absolute top-3 left-3 bg-black  backdrop-blur-sm text-xs font-semibold px-2.5 py-1 rounded-full text-white">
                                # {i + 1} Match
                              </div>
                              <button
                                // onClick={() => setSaved(!saved)}
                                className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all  text-white" `}
                              >
                                <Heart size={14} fill="none" />
                              </button>
                            </div>

                            <div className=" text-[#18181B] border-[0.5px] border-[#cfcfd7] mb-5 px-5 py-3 rounded-2xl flex  gap-2 items-center justify-between">
                              <div className="flex flex-col gap-2 items-start justify-between w-full ">
                                <div className="flex flex-col gap-1">
                                  <p className="font-semibold text-xl leading-tight">
                                    {property?.address?.streetAddress}
                                  </p>
                                  <p className="text-md text-[#71717A] flex items-center gap-1">
                                    {property?.address?.city +
                                      ", " +
                                      property?.address?.state}
                                  </p>
                                </div>
                                {/* ---------------------------------------------------------------------------------------------- */}

                                <div className="flex items-center justify-between gap-2  w-full">
                                  <div className="text-[#71717A] text-[13px] font-medium capitalize">
                                    {property?.propertyType}
                                  </div>
                                  <div className="w-[1px] h-[10px] bg-[#71717A]"></div>
                                  <div className="text-[#71717A] text-[13px] font-medium">
                                    Built In {property?.yearBuilt}
                                  </div>
                                </div>
                                {/* ---------------------------------------------------------------------------------------------- */}

                                <div className="flex items-center justify-between gap-2">
                                  <div className="py-[6px] px-[10px] border-[1px] border-[#E5E7EB] bg-[#F9FAFB] rounded-full font-[600] text-[#4B5563] text-[13px]">
                                    {property?.bedrooms} Beds
                                  </div>
                                  <div className="py-[6px] px-[10px] border-[1px] border-[#E5E7EB] bg-[#F9FAFB] rounded-full font-[600] text-[#4B5563] text-[13px]">
                                    {property?.bathrooms} Baths
                                  </div>
                                  <div className="py-[6px] px-[10px] border-[1px] border-[#E5E7EB] bg-[#F9FAFB] rounded-full font-[600] text-[#4B5563] text-[13px]">
                                    {property?.lotSizeWithUnit?.lotSize} Sq.Ft.
                                  </div>
                                </div>

                                {/* ---------------------------------------------------------------------------------------------- */}
                              </div>
                            </div>

                            <div className="bg-gradient-to-b from-[#0B0B0B] to-[#0F0F0F] rounded-[20px] border-[1px] border-[#1F2937] shadow-md shadow-[#00000033] p-[24px] flex flex-col gap-[20px] mb-5">
                              <div className="flex flex-col gap-[4px]">
                                <h1 className="text-[12px] text-[#A1A1AA] font-bold">
                                  Opportunity Highlights
                                </h1>
                                <h1 className="text-[#E5E7EB] text-[14px] font-[600]">
                                  Estimated performance snapshot
                                </h1>

                                <div className="bg-[#D1FAE5] border-[1px] border-[#216B30] text-[#216B30] text-[11px] rounded-full px-[10px] py-[6px] font-[800] w-fit">
                                  Strong Opportunity
                                </div>
                              </div>

                              <div className="border-[1px] border-[#1F2937] p-[16px] flex flex-col gap-[10px] rounded-[16px]">
                                <h1 className="text-[#fff] font-[700] text-[12px] uppercase">
                                  Potential Profit
                                </h1>

                                <h1 className="text-[#3BCF63] font-[900] text-[32px]">
                                  $105,000
                                </h1>

                                <p className="text-[#fff] text-[13px]">
                                  Est. Profit
                                </p>
                              </div>

                              <div className="border-[1px] border-[#1F2937] p-[16px] flex flex-col gap-[10px] rounded-[16px]">
                                <h1 className="text-[#fff] font-[700] text-[12px] uppercase">
                                  Expected ROI
                                </h1>

                                <h1 className="text-[#3BCF63] font-[900] text-[32px]">
                                  24.7%
                                </h1>

                                <p className="text-[#fff] text-[13px]">
                                  On Cash Invested
                                </p>
                              </div>
                            </div>

                            <div className="flex items-stretch justify-between gap-[12px] mb-5">
                              <div className="p-[16px] border-1 border-[#E5E7EB] bg-[#FFFFFF] flex flex-col justify-between gap-[12px] rounded-[16px]">
                                <div className="bg-[#0596691A] rounded-[8px] p-3 w-fit">
                                  <Tag color="#059669" />
                                </div>

                                <h3 className="text-[#4B5563] text-[12px]">
                                  Purchase Price
                                </h3>

                                <h1 className="text-[#111827] font-[800] text-[15px]">
                                  ${property?.price?.value}
                                </h1>

                                <p className="text-[#4B5563] text-[12px]">
                                  Below market value
                                </p>

                                <div className="bg-[#D1FAE5] py-[4px] px-[8px] font-bold rounded-[6px] text-[#059669] text-[11px]">
                                  Good Deal
                                </div>
                              </div>
                              {/* ----------------------------------------------------------------------------------------------------------- */}
                              <div className="p-[16px] border-1 border-[#E5E7EB] bg-[#FFFFFF] flex flex-col justify-between gap-[12px] rounded-[16px]">
                                <div className="bg-[#D977061A] rounded-[8px]  p-3 w-fit">
                                  <Wrench color="#D97706" />
                                </div>

                                <h3 className="text-[#4B5563] text-[12px]">
                                  Est. Renovation
                                </h3>

                                <h1 className="text-[#111827] font-[800] text-[15px]">
                                  ${property?.price?.value * 0.6}
                                </h1>

                                <p className="text-[#4B5563] text-[12px]">
                                  Cosmetic updates
                                </p>

                                <div className="bg-[#FEF3C7] py-[4px] px-[8px] font-bold rounded-[6px] text-[#D97706] text-[11px]">
                                  Quick Project
                                </div>
                              </div>
                              {/* ----------------------------------------------------------------------------------------------------------- */}
                              <div className="p-[16px] border-1 border-[#E5E7EB] bg-[#FFFFFF] flex flex-col justify-between gap-[12px] rounded-[16px]">
                                <div className="bg-[#3B82F61A] rounded-[8px]  p-3 w-fit">
                                  <TrendingUp color="#3B82F6" />
                                </div>

                                <h3 className="text-[#4B5563] text-[12px]">
                                  After Repair Value
                                </h3>

                                <h1 className="text-[#111827] font-[800] text-[15px]">
                                  $
                                  {Number(property?.price?.value) +
                                    Number(property?.price?.value * 0.6)}
                                </h1>

                                <p className="text-[#4B5563] text-[12px]">
                                  Strong comps
                                </p>

                                <div className="bg-[#3B82F61A] py-[4px] font-bold px-[8px] rounded-[6px] text-[#3B82F6] text-[11px]">
                                  High ARV
                                </div>
                              </div>
                              {/* ----------------------------------------------------------------------------------------------------------- */}
                            </div>

                            <div className="p-4 bg-white rounded-xl flex flex-col gap-[12px] mb-5">
                              <ul className="text-[#111827] font-[700] text-[13px] uppercase">
                                Why LIAM likes this
                              </ul>

                              <span className="text-[#4B5563] text-[14px] flex items-center gap-2">
                                {" "}
                                <CheckCircle color="green" size={16} /> Below
                                market pricing
                              </span>
                              <span className="text-[#4B5563] text-[14px] flex items-center gap-2">
                                {" "}
                                <CheckCircle color="green" size={16} /> Cosmetic
                                renovation - low risk
                              </span>
                              <span className="text-[#4B5563] text-[14px] flex items-center gap-2">
                                {" "}
                                <CheckCircle color="green" size={16} /> Strong
                                buyer demand in area
                              </span>
                              <span className="text-[#4B5563] text-[14px] flex items-center gap-2">
                                {" "}
                                <CheckCircle color="green" size={16} /> High
                                resale value potential
                              </span>
                            </div>

                            <div className="flex flex-col gap-[12px]">
                              <div
                                onClick={() => {}}
                                className="p-3 text-white bg-[green] font-bold rounded-xl text-center  flex items-center gap-2 justify-center"
                              >
                                <SmilePlus />
                                Get Detailed Flip Plan
                              </div>

                              <div
                                onClick={() => {
                                  setReportStep(7);
                                  handleReportGenerate();
                                }}
                                className="p-3 bg-[#000] text-[#ffffff] font-bold rounded-xl text-center flex items-center gap-2 justify-center"
                              >
                                <UsersRound />
                                Request Agent Introduction
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 1
                ) {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4 ">
                      <div className="px-4 py-4 bg-[#1a1a1a] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-sm font-medium text-white">
                            Current Home Value
                          </h1>

                          <h1 className="text-[42px] font-bold text-[#1db954]">
                            {" "}
                            $ {Number(homesData?.price).toLocaleString("en-us")}
                          </h1>
                        </div>

                        <div>
                          <ResponsiveContainer width="100%" height={160}>
                            <AreaChart
                              data={HouseGrowthData}
                              margin={{
                                top: 4,
                                right: 4,
                                left: -20,
                                bottom: 0,
                              }}
                            >
                              <defs>
                                <linearGradient
                                  id="detailRoi"
                                  x1="0"
                                  y1="0"
                                  x2="0"
                                  y2="1"
                                >
                                  <stop
                                    offset="5%"
                                    stopColor="#4CAF50"
                                    stopOpacity={0.2}
                                  />
                                  <stop
                                    offset="95%"
                                    stopColor="#4CAF50"
                                    stopOpacity={0}
                                  />
                                </linearGradient>
                              </defs>
                              <XAxis
                                dataKey="year"
                                tick={{ fontSize: 11, fill: "#ffffff" }}
                                axisLine={false}
                                tickLine={false}
                              />
                              <Tooltip
                                contentStyle={{
                                  fontSize: 12,
                                  background: "#fff",
                                  border: "1px solid #e5e7eb",
                                  borderRadius: 10,
                                }}
                                formatter={(v: number) => [
                                  `${Number(v / 1000000).toFixed(2)}M`,
                                  "Price",
                                ]}
                              />
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke="#4CAF50"
                                strokeWidth={2.5}
                                fill="url(#detailRoi)"
                                dot={{ fill: "#4CAF50", r: 3, strokeWidth: 0 }}
                                label={{
                                  position: "top",
                                  fill: "#ffffff",
                                  fontSize: 12,
                                  formatter: (value: number) =>
                                    `${Number(value / 1000000).toFixed(2)}M`,
                                }}
                              />
                            </AreaChart>
                          </ResponsiveContainer>

                          {/* <AppreciationChart
                          HousePrices={HousePrices}
                          growthRate={AnnualGrowth.house}
                        /> */}
                        </div>

                        <p className="text-white mt-5 text-xs">
                          Updated : {nowTime()}
                        </p>
                      </div>

                      <div className="p-3 text-sm text-gray-600 bg-[#F9FAFB] rounded-xl ">
                        Based On Recent Sales and current Market Conditions
                      </div>

                      <div
                        onClick={() => {
                          setReportStep(2);
                        }}
                        className="p-3 text-white bg-[green] font-bold rounded-xl text-center"
                      >
                        Continue
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 2
                ) {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4 ">
                      <div className="px-4 py-4 bg-[#1a1a1a] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-sm font-medium text-white">
                            Safe Deployable Equity
                          </h1>

                          <h1 className="text-[42px] font-bold text-[#1db954]">
                            {" "}
                            ${" "}
                            {Number(homesData?.price * 0.6).toLocaleString(
                              "en-us",
                            )}
                          </h1>
                        </div>

                        <div className="my-3 flex items-center justify-between gap-2">
                          <div className="flex flex-col gap-5 text-white/80 text-sm">
                            <h1 className="flex items-center gap-2">
                              <div className="rounded-full p-1 bg-[#1db954] w-fit">
                                <Check
                                  className="text-white"
                                  size={12}
                                  strokeWidth={4}
                                />
                              </div>
                              Safety Buffer
                            </h1>
                            <h1 className="flex items-center gap-2">
                              <div className="rounded-full p-1 bg-[#1db954] w-fit">
                                <Check
                                  className="text-white"
                                  size={12}
                                  strokeWidth={4}
                                />
                              </div>
                              Market Protection
                            </h1>
                            <h1 className="flex items-center gap-2">
                              <div className="rounded-full p-1 bg-[#1db954] w-fit">
                                <Check
                                  className="text-white"
                                  size={12}
                                  strokeWidth={4}
                                />
                              </div>
                              Refinance Flexibility
                            </h1>
                            <h1 className="flex items-center gap-2">
                              <div className="rounded-full p-1 bg-[#1db954] w-fit">
                                <Check
                                  className="text-white"
                                  size={12}
                                  strokeWidth={4}
                                />
                              </div>
                              Emergency Reserve
                            </h1>
                          </div>

                          <div className="w-[150px] h-[150px] flex items-center justify-center relative ">
                            <h1 className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-white font-bold">
                              60%
                            </h1>
                            <ResponsiveContainer>
                              <PieChart>
                                <Pie
                                  data={data}
                                  dataKey="value"
                                  innerRadius={46}
                                  outerRadius={70}
                                  paddingAngle={2}
                                >
                                  {data.map((entry, index) => (
                                    <Cell
                                      key={index}
                                      fill={colors[index % colors.length]}
                                    />
                                  ))}
                                </Pie>
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <p className="text-white text-xs">
                          Updated : {nowTime()}
                        </p>
                      </div>

                      <div className="p-3 text-sm text-gray-600 bg-[#F9FAFB] rounded-xl shadow-md">
                        Based On Recent Sales and current Market Conditions
                      </div>

                      <div
                        onClick={() => {
                          setReportStep(3);
                        }}
                        className="p-3 text-white bg-[green] font-bold rounded-xl text-center"
                      >
                        Check Deployment Strategy
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 3
                ) {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4 ">
                      <div className="px-4 py-4 bg-[#1a1a1a] rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                        <div className="flex flex-col gap-2">
                          <h1 className="text-sm font-medium text-white">
                            Projected 5-Year Growth
                          </h1>
                        </div>

                        <div className="my-3 flex items-center justify-between gap-2">
                          <div className="flex flex-col gap-5 text-white/80 text-sm  w-full">
                            <h1 className="flex flex-col items-start w-full  gap-2">
                              <p className="w-full flex items-center justify-between">
                                Home Only
                                <h1 className="text-white text-xl font-bold">
                                  {PortfolioOptions?.[0]?.value !== "Custom" &&
                                  PortfolioOptions?.[0]?.profitAfterTax < 0
                                    ? "-"
                                    : "+"}
                                  $
                                  {Math.abs(
                                    Number(
                                      PortfolioOptions?.[0]?.profitAfterTax,
                                    ),
                                  ).toLocaleString("en-us")}
                                </h1>
                              </p>

                              <div className="w-full h-2 rounded-full bg-[#252D35]">
                                <div className="w-[50%] h-full bg-[#816EC3] rounded-full"></div>
                              </div>
                            </h1>

                            <h1 className="flex flex-col items-start w-full  gap-2">
                              <p className="w-full flex items-center justify-between">
                                LIAM Basic
                                <h1 className="text-white text-xl font-bold">
                                  {PortfolioOptions?.[1]?.value !== "Custom" &&
                                  PortfolioOptions?.[1]?.profitAfterTax < 0
                                    ? "-"
                                    : "+"}
                                  $
                                  {Math.abs(
                                    Number(
                                      PortfolioOptions?.[1]?.profitAfterTax,
                                    ),
                                  ).toLocaleString("en-us")}
                                </h1>
                              </p>
                              <div className="w-full h-2 rounded-full bg-[#252D35]">
                                <div className="w-[60%] h-full bg-[#3778CC] rounded-full"></div>
                              </div>
                            </h1>

                            <h1 className="flex flex-col items-start w-full  gap-2">
                              <p className="w-full flex items-center justify-between">
                                LIAM Plus
                                <h1 className="text-white text-xl font-bold">
                                  {PortfolioOptions?.[2]?.value !== "Custom" &&
                                  PortfolioOptions?.[2]?.profitAfterTax < 0
                                    ? "-"
                                    : "+"}
                                  $
                                  {Math.abs(
                                    Number(
                                      PortfolioOptions?.[2]?.profitAfterTax,
                                    ),
                                  ).toLocaleString("en-us")}
                                </h1>
                              </p>

                              <div className="w-full h-2 rounded-full bg-[#252D35]">
                                <div className="w-[70%] h-full bg-[#479F2D] rounded-full"></div>
                              </div>
                            </h1>

                            <h1 className="flex flex-col items-start w-full  gap-2">
                              <p className="w-full flex items-center justify-between">
                                LIAM Pro
                                <h1 className="text-white text-xl font-bold">
                                  {PortfolioOptions?.[3]?.value !== "Custom" &&
                                  PortfolioOptions?.[3]?.profitAfterTax < 0
                                    ? "-"
                                    : "+"}
                                  $
                                  {Math.abs(
                                    Number(
                                      PortfolioOptions?.[3]?.profitAfterTax,
                                    ),
                                  ).toLocaleString("en-us")}
                                </h1>
                              </p>

                              <div className="w-full h-2 rounded-full bg-[#252D35]">
                                <div className="w-[80%] h-full bg-[#ECC561] rounded-full"></div>
                              </div>
                            </h1>
                          </div>
                        </div>

                        <p className="text-white text-xs">
                          Updated : {nowTime()}
                        </p>
                      </div>

                      <div className="p-3 text-sm text-gray-600 bg-[#F9FAFB] rounded-xl shadow-md">
                        Based On Recent Sales and current Market Conditions
                      </div>

                      <div
                        onClick={() => {
                          setReportStep(4);
                        }}
                        className="p-3 text-white bg-[green] font-bold rounded-xl text-center"
                      >
                        Select Deployment Strategy
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 4
                ) {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4 ">
                      <div className="flex flex-col gap-3 ">
                        <h1 className="text-sm font-medium text-[#6B7280]">
                          Here are 3 strategies based on your goals and risk
                          profile.
                        </h1>

                        {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}

                        <div
                          onClick={() => {
                            setReportStep(5);
                            setSelectedPortfolio(PortfolioOptions?.[1]);
                          }}
                          className="p-[20px] border border-[#E2E8F0] rounded-[20px] flex items-start justify-between gap-7"
                        >
                          <div className="bg-[#4F46E51A] rounded-[10px] p-3">
                            <Shield className="text-[#4F46E5]" />
                          </div>

                          <div className="flex flex-col gap-[4px] w-full">
                            <h1 className="text-[#4F46E5] text-[16px] font-[700]">
                              LIAM Basic
                            </h1>
                            <p className="text-[13px] text-[#6B7280]">
                              Conservative
                            </p>

                            <h1 className="text-[#111111] text-[18px] font-bold">
                              {PortfolioOptions?.[1]?.value !== "Custom" &&
                              PortfolioOptions?.[1]?.profitAfterTax < 0
                                ? "-"
                                : "+"}
                              $
                              {Math.abs(
                                Number(PortfolioOptions?.[1]?.profitAfterTax),
                              ).toLocaleString("en-us")}
                            </h1>

                            <p className="text-[#6B7280] text-[12px]">
                              5 Year Potential
                            </p>
                          </div>
                        </div>
                        {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}

                        <div
                          onClick={() => {
                            setReportStep(5);
                            setSelectedPortfolio(PortfolioOptions?.[2]);
                          }}
                          className="p-[20px] border border-[#E2E8F0] rounded-[20px] flex items-start justify-between gap-7"
                        >
                          <div className="bg-[#00A35C1A] rounded-[10px] p-3">
                            <Star className="text-[#00A35C]" />
                          </div>

                          <div className="flex flex-col gap-[4px] w-full">
                            <h1 className="text-[#00A35C] text-[16px] font-bold flex items-center gap-2">
                              LIAM Plus
                              <span className="bg-[#00A35C1A] py-[2px] px-[8px] rounded-[4px] text-[10px] text-[#00A35C]">
                                Recommended
                              </span>
                            </h1>
                            <p className="text-[13px] text-[#6B7280]">
                              Balanced
                            </p>

                            <h1 className="text-[#111111] text-[18px] font-bold">
                              {PortfolioOptions?.[2]?.value !== "Custom" &&
                              PortfolioOptions?.[2]?.profitAfterTax < 0
                                ? "-"
                                : "+"}
                              $
                              {Math.abs(
                                Number(PortfolioOptions?.[2]?.profitAfterTax),
                              ).toLocaleString("en-us")}
                            </h1>

                            <p className="text-[#6B7280] text-[12px]">
                              5 Year Potential
                            </p>
                          </div>
                        </div>

                        {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
                        <div
                          onClick={() => {
                            setReportStep(5);
                            setSelectedPortfolio(PortfolioOptions?.[3]);
                          }}
                          className="p-[20px] border border-[#E2E8F0] rounded-[20px] flex items-start justify-between gap-7"
                        >
                          <div className="bg-[#F973161A] rounded-[10px] p-3">
                            <TrendingUp className="text-[#F97316]" />
                          </div>

                          <div className="flex flex-col gap-[4px] w-full">
                            <h1 className="text-[#F97316] text-[16px] font-bold">
                              LIAM Pro
                            </h1>
                            <p className="text-[13px] text-[#6B7280]">
                              Aggressive
                            </p>

                            <h1 className="text-[#111111] text-[18px] font-bold">
                              {PortfolioOptions?.[3]?.value !== "Custom" &&
                              PortfolioOptions?.[3]?.profitAfterTax < 0
                                ? "-"
                                : "+"}
                              $
                              {Math.abs(
                                Number(PortfolioOptions?.[3]?.profitAfterTax),
                              ).toLocaleString("en-us")}
                            </h1>

                            <p className="text-[#6B7280] text-[12px]">
                              5 Year Potential
                            </p>
                          </div>
                        </div>

                        {/* -------------------------------------------------------------------------------------------------------------------------------------------- */}
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 5
                ) {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4 ">
                      <div className="flex flex-col gap-6 ">
                        <h1 className="text-sm font-medium text-[#6B7280]">
                          Here's how {selectedPortfolio?.value} strategy
                          allocates your investment.
                        </h1>

                        <div className="px-5 py-3 bg-black text-[#1fae3e] rounded-2xl flex gap-2 items-center justify-between">
                          <h1 className="flex items-center justify-center gap-2 flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
                            <div className="flex flex-col items-center">
                              <p className="text-white text-sm">House Value</p>
                              <p className="text-xs text-white">
                                (After 5 Years)
                              </p>
                            </div>
                            <p className="font-bold">
                              $
                              {Number(
                                selectedPortfolio?.EstimatedHousePrice,
                              ).toLocaleString("en-us")}
                            </p>
                          </h1>
                          {/* ------------------------------------------------------------ */}

                          <h1 className="flex items-center justify-center gap-2 flex-col border-r-[0.5px] border-[#cfcfd7] w-full">
                            <div className="flex flex-col items-center">
                              <p className="text-white text-sm">
                                Portfolio Returns
                              </p>
                              <p className="text-xs text-white">
                                (After 5 Years)
                              </p>
                            </div>
                            <p className="font-bold">
                              $
                              {Number(
                                selectedPortfolio?.PortfolioReturns,
                              ).toLocaleString("en-us")}
                            </p>
                          </h1>
                          {/* ------------------------------------------------------------ */}
                          <h1 className="flex items-center justify-center gap-2 flex-col  w-full">
                            <div className="flex flex-col items-center">
                              <p className="text-white text-sm">Total Gain</p>
                              <p className="text-xs text-white">
                                (After 5 Years)
                              </p>
                            </div>
                            <p className="font-bold">
                              {selectedPortfolio?.value !== "Custom" &&
                                selectedPortfolio?.profitAfterTax < 0 &&
                                "-"}
                              $
                              {Math.abs(
                                Number(selectedPortfolio?.profitAfterTax),
                              ).toLocaleString("en-us")}
                            </p>
                          </h1>
                        </div>

                        <Card className="flex flex-col h-full bg-[#0A2540] text-white">
                          <div className="flex items-start justify-between mb-4 ">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Layers size={18} className="text-[#000]" />
                                <span className="text-xs font-bold text-[#000] uppercase tracking-wider">
                                  Our Recommendation
                                </span>
                              </div>
                              {/* <h3 className="text-lg text-black font-bold">Deployment Strategy</h3> */}
                            </div>
                            <Badge color="green">Top Pick</Badge>
                          </div>

                          <div className="flex-1 flex flex-col items-center justify-between gap-4 ">
                            <div className="flex items-center  w-full">
                              <div
                                className="w-[60%]  h-[120px] relative "
                                style={{ minHeight: "96px", minWidth: "96px" }}
                              >
                                {/* <Pie data={data} options={options}/> */}
                                <Doughnut data={data1} options={options} />
                              </div>
                              <div>
                                <div className="w-full flex flex-col justify-center space-y-1 ">
                                  {[
                                    {
                                      name: "S&P 500",
                                      value: `${getAllocation(selectedPortfolio?.value).sp500}%`,
                                      return: `${AnnualGrowth?.sp500}%`,
                                      color: "#10B981",
                                      bgcolor: "#10B98133",
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
                                      value: `${getAllocation(selectedPortfolio?.value).bonds}%`,
                                      return: `${AnnualGrowth?.bonds}%`,
                                      color: "#4F46E5",
                                      bgcolor: "#4F46E533",
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
                                      value: `${getAllocation(selectedPortfolio?.value).crypto}%`,
                                      return: `${AnnualGrowth?.crypto}%`,
                                      color: "#A855F7",
                                      bgcolor: "#A855F733",
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
                                      value: `${getAllocation(selectedPortfolio?.value).cash}%`,
                                      return: `${AnnualGrowth?.cash}%`,
                                      color: "#F97316",
                                      bgcolor: "#F9731633",
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
                                          <line
                                            x1="12"
                                            x2="12"
                                            y1="2"
                                            y2="22"
                                          />
                                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                                        </svg>
                                      ),
                                    },
                                  ]?.map((item, i) => {
                                    return (
                                      <div
                                        key={i}
                                        className="group flex items-center justify-between gap-4  w-full  cursor-default"
                                      >
                                        <div className="flex items-center gap-3 md:gap-4">
                                          <div
                                            className="h-[8px] rounded-md w-[20px] "
                                            style={{
                                              backgroundColor: item.color,
                                            }}
                                          ></div>

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
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-[#18a36f] flex items-center gap-2 p-2 rounded-md shadow-sm shadow-[#18a36f]/20 capitalize bg-[#18a36f]/20 group/card1 relative">
                                <Info size={14} className="cursor-pointer" />
                                <div className="bg-gray-300 text-black py-4 px-4 absolute w-[300px] bottom-full rounded-xl opacity-0 group-hover/card1:opacity-100 text-xs">
                                  ~
                                  {parseInt(
                                    selectedPortfolio?.portfoliopercentReturn /
                                      5,
                                  )}
                                  % is the Annual Returns in the LIAM Plus
                                  Portfolio option with a total of ~
                                  {selectedPortfolio?.portfoliopercentReturn}%{" "}
                                  growth in 5 years.
                                </div>
                                <span className="text-sm font-bold tracking-tight">
                                  ~
                                  {parseInt(
                                    selectedPortfolio?.portfoliopercentReturn /
                                      5,
                                  )}
                                  %{" "}
                                </span>
                                More Annual growth with
                                <span className="text-sm font-bold text-[#18A36F]  tracking-tight">
                                  {" "}
                                  ~{selectedPortfolio?.portfoliopercentReturn}
                                  %{" "}
                                </span>
                                <span className="text-xs">5Y returns</span>
                              </div>
                            </div>
                          </div>
                        </Card>

                        <div
                          onClick={() => {
                            setReportStep(6);
                          }}
                          className="p-3 text-white bg-[green] font-bold rounded-xl text-center"
                        >
                          Understand HELOC Breakdown
                        </div>
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 6
                ) {
                  return (
                    <div key={msg.id} className="grid grid-cols-1 gap-4 ">
                      <div className="mt-6 rounded-[16px] border border-white/50 bg-white/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.05)] overflow-hidden transition-all duration-300">
                        <button className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-white/60 transition-all duration-300 group">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/30 bg-[#0A2540] text-white  scale-110"`}
                            >
                              <ShieldCheck size={18} />
                            </div>
                            <div className="flex flex-col items-start text-left">
                              <span
                                className={`text-sm font-bold transition-colors duration-300  "text-[#0A2540]" group-hover:text-black"}`}
                              >
                                HELOC Reinvestment Breakdown
                              </span>
                              <span className="text-[10px] text-[#6A6A6A] font-medium mt-0.5 tracking-wide">
                                Transparent assumptions. No hidden math.
                              </span>
                            </div>
                          </div>
                        </button>

                        <AnimatePresence>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.3,
                              ease: [0.22, 1, 0.36, 1],
                            }}
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

                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a]">
                                    Current House Value
                                  </span>
                                  <span className="font-medium text-black">
                                    ${" "}
                                    {Number(housePrice).toLocaleString("en-us")}
                                  </span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />

                                {/* 1. Equity Unlocked */}
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a] w-[60%]">
                                    Equity Line Of Credit (60% of Current House
                                    Value)
                                  </span>
                                  <span className="font-medium text-black">
                                    $
                                    {Number(0.6 * housePrice).toLocaleString(
                                      "en-US",
                                      {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                      },
                                    )}
                                  </span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />

                                {/* 2. Cost of Capital */}
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#1a1a1a]">
                                      HELOC Interest Rate
                                    </span>
                                    <span className="font-medium text-black ">
                                      ~8.75%
                                    </span>
                                  </div>
                                  <div className="flex justify-between items-center text-sm">
                                    <span className="text-[#1a1a1a]">
                                      HELOC Interest Paid (5 yrs)
                                    </span>
                                    <span className="font-medium text-red-500 ">
                                      -$
                                      {Number(
                                        0.2625 * housePrice,
                                      ).toLocaleString("en-US", {
                                        minimumFractionDigits: 1,
                                        maximumFractionDigits: 1,
                                      })}
                                    </span>
                                  </div>
                                </div>
                                <div className="w-full h-px bg-gray-100" />

                                {/* 3. Investable Amount */}
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a]">
                                    Net Investable Capital
                                  </span>
                                  <span className="font-medium text-black ">
                                    $
                                    {Number(0.3375 * housePrice).toLocaleString(
                                      "en-US",
                                    )}
                                  </span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />

                                {/* 3. Investable Amount */}
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a] w-[60%]">
                                    House Appreciation Amount (5yrs) by{" "}
                                    <span className="font-bold text-[#000]">
                                      LIAM
                                    </span>
                                  </span>
                                  <span className="font-medium text-black ">
                                    {selectedPortfolio?.ReturnsFromHouse < 0 &&
                                      "-"}
                                    $
                                    {Math.abs(
                                      Number(
                                        selectedPortfolio?.ReturnsFromHouse,
                                      ),
                                    ).toLocaleString("en-us")}
                                  </span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />

                                {/* 4. Growth Assumptions */}
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a]">
                                    Estimated Portfolio Return (5yr)(%)
                                  </span>
                                  <span className="font-medium text-[#005BFF] ">
                                    {selectedPortfolio?.portfoliopercentReturn}%
                                  </span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a]">
                                    Estimated Portfolio Return (5yr)
                                  </span>
                                  <span className="font-medium text-[#005BFF] ">
                                    $
                                    {Number(
                                      selectedPortfolio?.PortfolioReturnsBeforeTax,
                                    ).toLocaleString("en-us")}
                                  </span>
                                </div>
                                <div className="w-full h-px bg-gray-100" />

                                {/* 5. Taxation */}
                                <div className="flex justify-between items-center text-sm">
                                  <span className="text-[#1a1a1a]">
                                    Capital Gains Tax (15%)
                                  </span>
                                  <span className="font-medium text-red-500">
                                    -${" "}
                                    {Number(
                                      selectedPortfolio?.CapitalGainsTax,
                                    ).toLocaleString("en-us")}
                                  </span>
                                </div>
                                <div className="w-full h-px bg-black/10" />

                                {/* 6. FINAL LINE */}
                                <div className="flex justify-between items-center pt-2">
                                  <span className="text-sm font-bold text-black">
                                    Profit after tax
                                  </span>
                                  <div className="text-right">
                                    <span className="block text-xl font-bold text-[#18A36F] tracking-tight glow-text-green">
                                      $
                                      {Number(
                                        selectedPortfolio?.profitAfterTax,
                                      ).toLocaleString("en-us")}
                                    </span>
                                    <span className="text-[9px] text-[#6A6A6A] uppercase font-bold tracking-wider">
                                      Clean Profit
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-4 text-center">
                                <p className="text-[10px] text-[#6A6A6A] max-w-[80%] mx-auto">
                                  Estimates based on historical benchmarks.
                                  Actual returns and tax obligations vary based
                                  on your jurisdiction and market conditions.
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        <div
                          onClick={() => {
                            setReportStep(7);
                          }}
                          className="p-3 text-white bg-[green] font-bold rounded-xl text-center"
                        >
                          I Would Like Help Implementing This
                        </div>
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 7
                ) {
                  return (
                    <div key={msg.id} className=" flex flex-col gap-[24px]">
                      <h1 className="text-[#1A1C1E] text-[18px] font-bold">
                        To help you further, please provide the following
                        information.
                      </h1>

                      <div className="flex flex-col gap-[12px]">
                        <h1 className="text-[14px] text-[#1A1C1E] font-[600]">
                          Preferred Contact Method
                        </h1>

                        <div className="flex items-center justify-between gap-[8px]">
                          <div className="p-[12px] flex flex-col gap-[8px] items-center justify-center border-[#E5E7EB] border w-full rounded-[12px]">
                            <Phone className="text-[#6B7280]" />

                            <h1 className="text-[12px] text-[#1A1C1E] font-[600]">
                              Phone Call
                            </h1>
                          </div>
                          {/* ------------------------------------------------- */}
                          <div className="p-[12px] flex flex-col gap-[8px] items-center justify-center border-[#E5E7EB] border w-full rounded-[12px]">
                            <Mail className="text-[#6B7280]" />

                            <h1 className="text-[12px] text-[#1A1C1E] font-[600]">
                              Email
                            </h1>
                          </div>
                          {/* ------------------------------------------------- */}

                          <div className="p-[12px] flex flex-col gap-[8px] items-center justify-center border-[#E5E7EB] border w-full rounded-[12px]">
                            <MessageSquare className="text-[#6B7280]" />

                            <h1 className="text-[12px] text-[#1A1C1E] font-[600]">
                              Text Message
                            </h1>
                          </div>

                          {/* ------------------------------------------------- */}
                        </div>
                      </div>

                      <div className="flex flex-col gap-[12px]">
                        <h1 className="text-[14px] text-[#1A1C1E] font-[600]">
                          Best Time To Reach You
                        </h1>

                        <div className="flex items-center justify-between gap-[8px]">
                          <div className="p-[12px] flex flex-col gap-[8px] items-center justify-center border-[#E5E7EB] border w-full rounded-[12px]">
                            <Sun className="text-[#6B7280]" />

                            <h1 className="text-[12px] text-[#1A1C1E] font-[600] flex flex-col gap-[2px]">
                              Morning
                              <p className="text-[#6B7280] text-[10px] font-normal">
                                8AM–12PM
                              </p>
                            </h1>
                          </div>
                          {/* ------------------------------------------------- */}
                          <div className="p-[12px] flex flex-col gap-[8px] items-center justify-center border-[#E5E7EB] border w-full rounded-[12px]">
                            <Sun className="text-[#6B7280]" />

                            <h1 className="text-[12px] text-[#1A1C1E] font-[600] flex flex-col gap-[2px]">
                              Afternoon
                              <p className="text-[#6B7280] text-[10px] font-normal">
                                12PM–5PM
                              </p>
                            </h1>
                          </div>
                          {/* ------------------------------------------------- */}

                          <div className="p-[12px] flex flex-col gap-[8px] items-center justify-center border-[#E5E7EB] border w-full rounded-[12px]">
                            <Moon className="text-[#6B7280]" />

                            <h1 className="text-[12px] text-[#1A1C1E] font-[600] flex flex-col gap-[2px]">
                              Evening
                              <p className="text-[#6B7280] text-[10px] font-normal">
                                5PM–8PM
                              </p>
                            </h1>
                          </div>

                          {/* ------------------------------------------------- */}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 p-[16px] rounded-[12px] bg-[#00A35C1A]">
                        <ShieldCheck size={32} className="text-[#00A35C]" />
                        <div className="flex flex-col gap-[2px]">
                          <h1 className="text-[13px] text-[#00A35C] font-extrabold">
                            Your Information Is Secure
                          </h1>
                          <p className="text-[#6B7280] text-[12px] ">
                            We respect your privacy and will only use this info
                            for advisor consultation.
                          </p>
                        </div>
                      </div>
                      <div
                        onClick={() => {
                          setReportStep(8);

                          handleInformationSubmit();
                        }}
                        className="p-3 text-white bg-[green] font-bold rounded-xl text-center"
                      >
                        Submit Information
                      </div>
                    </div>
                  );
                }

                if (
                  msg.role === "assistant" &&
                  msg.type === "report" &&
                  ReportStep === 8
                ) {
                  return (
                    <div
                      key={msg.id}
                      className=" flex flex-col gap-[24px] items-center justify-center"
                    >
                      <div className="rounded-full bg-[#E8F5E9] p-4 w-fit">
                        <CheckCircle color="#00A35C" />
                      </div>

                      <div className="flex flex-col gap-[12px] items-center justify-center w-full">
                        <h1 className="text-[#1A1A1A] text-[24px] font-[700] text-center">
                          Your Request Has Been Submitted!
                        </h1>

                        <p className="text-[#666666] font-medium text-[15px] text-center w-full">
                          Thank you! Our team is now reviewing your property
                          profile and selected opportunities.
                        </p>
                      </div>

                      <div className="bg-[#E8F5E9] p-[16px] rounded-[12px] text-[#00A35C] text-[14px] font-semibold flex items-center justify-center gap-[12px] ">
                        <Clock />
                        Expected response time: Within 1 Business Day
                      </div>
                    </div>
                  );
                }

                if (msg.role === "assistant") {
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-3 flex-col items-start"
                    >
                      <div className="flex items-center gap-1">
                        <div className="w-8 h-8 rounded-xl bg-[#0B0F14] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-[#1fae3e] text-xs font-bold">
                            <AnimatedHomeIcon />
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className=" rounded-2xl  px-4  max-w-2xl">
                            <TypingText text={msg.content} speed={0.0001} />
                          </div>
                        </div>
                      </div>
                      {msg.type === "options" && (
                        <OptionCards
                          options={msg.options}
                          locked={answeredSteps.has(msg.stepNum!)}
                          selected={selections[msg.stepNum!]}
                          onSelect={(opt) =>
                            handleOptionSelect(opt, msg.stepNum!)
                          }
                          stepNum={msg.stepNum}
                        />
                      )}
                      <p className="text-[10px] text-black mt-1.5 px-1">
                        {msg.timestamp}
                      </p>
                    </motion.div>
                  );
                }

                // User message
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-end"
                  >
                    <div>
                      <div className="bg-[green] text-white px-4 py-2.5 rounded-2xl max-w-sm">
                        <p className="text-sm leading-relaxed font-medium">
                          {msg.content}
                        </p>
                      </div>
                      <p className="text-[10px] text-gray-300 mt-1.5 px-1 text-right">
                        {msg.timestamp}
                      </p>
                    </div>
                  </motion.div>
                );
              })}

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-[#0B0F14] flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4CAF50] text-xs font-bold">
                    <AnimatedHomeIcon />
                  </span>
                </div>
                <div className="rounded-2xl rounded-tl-sm">
                  <TypingDots />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Chat Input */}
        <div
          className={`px-4 py-4 border-t border-gray-100  flex-shrink-0 ${sidebarOpen ? "bg-[#fafafa]/40" : "bg-[#fafafa]"}`}
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 focus-within:border-[#4CAF50] focus-within:ring-2 focus-within:ring-[#4CAF50]/10 transition-all">
              <button className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
                {/* <Paperclip size={18} /> */}
              </button>
              <input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const activeStep = STEPS[currentStep - 1];
                    handleInputSelect(inputValue, currentStep);

                    // if (activeStep?.type === "input") {
                    // } else {
                    //   handleSend();
                    // }
                  }
                }}
                placeholder="Ask LIAM anything..."
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-300 outline-none"
              />
              {/* <button className="text-gray-300 hover:text-gray-500 transition-colors flex-shrink-0">
                <Mic size={18} />
              </button> */}
              <button
                onClick={() => {
                  const activeStep = STEPS[currentStep - 1];

                  handleInputSelect(inputValue, currentStep);
                }}
                disabled={!inputValue.trim()}
                className="w-8 h-8 rounded-xl bg-black hover:bg-[#000000] disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center transition-colors shrink-0"
              >
                <ArrowUp size={14} className="text-[#1fae3e]" />
              </button>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-2 capitalize">
              LIAM is AI and can make mistakes. Please double-check responses.
            </p>
          </div>
        </div>
      </main>

      <style>{`
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
