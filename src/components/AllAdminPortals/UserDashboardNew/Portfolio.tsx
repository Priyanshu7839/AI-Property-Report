import React, { useState, useEffect } from "react";
import { Card, Button, Badge } from "../../../components/ui/Components";
import {
  PieChart,
  Pie as pies,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as Tooltips,
} from "recharts";
import { scenarios } from "./mockData";
import {
  Check,
  Shield,
  Zap,
  TrendingUp,
  AlertTriangle,
  House,
  Sprout,
  BanknoteArrowUp,
  AlertCircle,
  Blocks,
  Rocket,
  Activity,
  Home,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  ArrowUpRight,
} from "lucide-react";
import { useLocation, useNavigate, useSearchParams } from "react-router";
import axios from "axios";
import {
  GeneratePdf,
  gettimeSeriesData,
  openaiapicall,
} from "../../apicalls/ApiCalls";
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { GrowthChart } from "../../GrowthCharts";
import Equity from "../../../assets/Equity.png";
import { trackEvent } from "../../../GoogleAnalytics/Analytics";
import { Slider } from "../../ui/slider";

const allocationData = [
  { name: "Real Estate", value: 100, color: "#111111" },
  { name: "S&P 500", value: 0, color: "#5B616E" },
  { name: "Bonds", value: 0, color: "#9CA3AF" },
  { name: "Cash", value: 0, color: "#E6E8EC" },
  { name: "Crypto", value: 0, color: "#F87171" },
];

export function Portfolio() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

 

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
  ); //this changes the button selected at time that is summary ...

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
  ]); //this contains the portfolio option that is show e.g. basic , mostpopular,high growth

  const [selectedPortfolio, setSelectedPortfolio] = useState(
    PortfolioOptions?.[1],
  ); //this contains the selected portfolio at the time from portfolio options

  useEffect(() => {
    if (PortfolioOptions?.length > 1) {
      setSelectedPortfolio(PortfolioOptions[1]);
    }
  }, [PortfolioOptions]); //this useEffect is important as it sets portfol

  const [activeButton, setActiveButton] = useState("LIAM Basic");

  const address = '89 Ede San jose'

  useEffect(() => {
    if (state.state !== null) setHomesData(state?.state?.data?.data);

    const fetchHouseData = async () => {
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
                "a48bfbafb3msh42b1f23858b4dd2p127af3jsne5dc6836da5a",
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
  }, [state, HomesData.zpid]); //this fetches similar homes in the area

  const [AnnualGrowth, setAnnualGrowth] = useState({});

  const housePrice = parseInt(HomesData?.price);

  const [HousePrices, setHousePrices] = useState([]); //House Prices sent to the openai api to fetch negiotiation intelligence

  useEffect(() => {
    const getTimeSeries = async () => {
      const { SandP, Bonds, Bitcoin, HouseRate, HousePrices } =
        await gettimeSeriesData(HomesData);
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
      case "LIAM Basic":
        return { sp500: 36, bonds: 39, crypto: 10, cash: 15 };
      case "LIAM Plus":
        return { sp500: 49, bonds: 21, crypto: 20, cash: 10 };
      case "LIAM Pro":
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
        data: [
          getAllocation("LIAM Plus").sp500,
          getAllocation("LIAM Plus").bonds,
          getAllocation("LIAM Plus").crypto,
          getAllocation("LIAM Plus").cash,
        ], // MUST be numbers
        backgroundColor: ["#000000", "#666666", "#333333", "#E3E3E3"],
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

  const CalculateReturns = (strategy: StrategyType) => {
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
    console.log(CalculateReturns("LIAM Plus"));
    console.log(CalculateReturns("LIAM Basic"));
    console.log(CalculateReturns("LIAM Pro"));
    console.log(CalculateReturns("Baseline"));

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

  // Calculator

  const [Margin, setMargin] = useState(60); //This is the Margin Amount we take from the house price
  const handleMarginChange = (value) => {
    setMargin(value[0]);
  }; // this works in the margin change slider at cutom tab

  const [HELOCRate, setHELOCRate] = useState("8.75");

  const [reinvestAmount, SetReinvestAmount] = useState({
    EquityLineOfCredit: "",
    HELOCInterestPaid: "",
    AmtToReinvest: "",
  });

  useEffect(() => {
    const EquityLine = parseInt(housePrice * (Margin / 100)).toFixed(2);
    const HELOCInterestPaid = parseInt(
      EquityLine * (HELOCRate / 100) * 5,
    ).toFixed(2);
    const AmountReinvest = parseInt(EquityLine - HELOCInterestPaid).toFixed(2);

    SetReinvestAmount({
      ...reinvestAmount,
      EquityLineOfCredit: EquityLine,
      HELOCInterestPaid: HELOCInterestPaid,
      AmtToReinvest: AmountReinvest,
    });
  }, [HELOCRate, Margin, housePrice]);

  const [ReturnsAssets, setReturnsInAssets] = useState({
    ReturnsFromHouse: "",
    portfoliopercentReturn: "",
    PortfolioReturns: "",
    profitAfterTax: "",
    EstimatedHousePrice: "",
    CapitalGainsTax: "",
    PortfolioReturnsBeforeTax: "",
  });

  const [datachart, setdataChart] = useState([
    { year: "2026", strategy: 100000, baseline: 100000 },
    { year: "2027", strategy: 112000, baseline: 105000 },
    { year: "2028", strategy: 128000, baseline: 111000 },
    { year: "2029", strategy: 145000, baseline: 118000 },
    { year: "2030", strategy: 168000, baseline: 126000 },
    { year: "2031", strategy: 195000, baseline: 135000 },
  ]);

  useEffect(() => {
    const SandPAmount = reinvestAmount.AmtToReinvest * (equities / 100);
    const bondsAmount = reinvestAmount.AmtToReinvest * (bonds / 100);
    const cashAmount = reinvestAmount.AmtToReinvest * (cash / 100);
    const cryptoAmount = reinvestAmount.AmtToReinvest * (crypto / 100);

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
      (equities / 100) * AnnualGrowth.sp500 +
      (bonds / 100) * AnnualGrowth.bonds +
      (crypto / 100) * AnnualGrowth.crypto +
      (cash / 100) * AnnualGrowth.cash; //weighted return of the portfolio

    const PortfolioReturns = TotalReturns - CapitalGainsTax;

    const profitAfterTax = PortfolioReturns + HouseReturn;

    const EstimatedHousePrice = HouseReturn + housePrice;

    const PortfolioReturnsBeforeTax = TotalReturns;

    setReturnsInAssets({
      ...ReturnsAssets,
      ReturnsFromHouse: parseInt(ReturnsFromHouse),
      portfoliopercentReturn: parseInt(portfoliopercentReturn * 5),
      PortfolioReturns: parseInt(PortfolioReturns),
      profitAfterTax: parseInt(profitAfterTax),
      EstimatedHousePrice: parseInt(EstimatedHousePrice),
      CapitalGainsTax: parseInt(CapitalGainsTax),
      PortfolioReturnsBeforeTax: parseInt(PortfolioReturnsBeforeTax),
    });
  }, [reinvestAmount, equities, bonds, cash, crypto, AnnualGrowth]);

  const projectionData = [
    { year: 2024, Portfolio: 120000, Baseline: 100000 },
    { year: 2025, Portfolio: 135000, Baseline: 102000 },
    { year: 2026, Portfolio: 152000, Baseline: 104040 },
    { year: 2027, Portfolio: 170000, Baseline: 106121 },
    { year: 2028, Portfolio: 189000, Baseline: 108243 },
  ];

  useEffect(() => {
    if (!UserDetails.loggedIn) {
      setTimeout(() => {
        setScreen(4);
      }, 10000);
    }

    trackEvent("Report Generated", {
      location: "Report Page",
    });
  }, []);

  const [isAppreciationOpen, setIsAppreciationOpen] = useState(false);

  const generateHouseAppreciationData = () => {
    const data = [];
    const baselineRate = 0.032; // 3.2% Historical Avg
    const aiProjectedRate = 0.055; // 5.5% AI Model

    for (let year = 0; year <= 5; year++) {
      data.push({
        year: `Year ${year}`,
        Historical: Math.round(10000 * Math.pow(1 + baselineRate, year)),
        Projected: Math.round(100000 * Math.pow(1 + aiProjectedRate, year)),
      });
    }
    return data;
  };

  const houseData = generateHouseAppreciationData();
  const currentHouseValue = houseData[0].Projected;
  const futureHouseValue = houseData[5].Projected;
  const houseAppreciationGain = futureHouseValue - currentHouseValue;

  useEffect(() => {
    console.log(CalculateReturns(selectedPortfolio.value).PortfolioReturns / 5);
    setdataChart([
      { year: "2026", strategy: 0, baseline: 0 },
      {
        year: "2027",
        strategy: parseInt(
          CalculateReturns(selectedPortfolio.value).PortfolioReturns / 5,
        ),
        baseline: parseInt(CalculateReturns("Baseline").ReturnsFromHouse / 5),
      },
      {
        year: "2028",
        strategy: parseInt(
          (CalculateReturns(selectedPortfolio.value).PortfolioReturns / 5) * 2,
        ),
        baseline: parseInt(
          (CalculateReturns("Baseline").ReturnsFromHouse / 5) * 2,
        ),
      },
      {
        year: "2029",
        strategy: parseInt(
          (CalculateReturns(selectedPortfolio.value).PortfolioReturns / 5) * 3,
        ),
        baseline: parseInt(
          (CalculateReturns("Baseline").ReturnsFromHouse / 5) * 3,
        ),
      },
      {
        year: "2030",
        strategy: parseInt(
          (CalculateReturns(selectedPortfolio.value).PortfolioReturns / 5) * 4,
        ),
        baseline: parseInt(
          (CalculateReturns("Baseline").ReturnsFromHouse / 5) * 4,
        ),
      },
      {
        year: "2031",
        strategy: parseInt(
          CalculateReturns(selectedPortfolio.value).PortfolioReturns,
        ),
        baseline: parseInt(CalculateReturns("Baseline").ReturnsFromHouse),
      },
    ]);
  }, [selectedPortfolio.value]);
  useEffect(() => {
    setdataChart([
      { year: "2026", strategy: 0, baseline: 0 },
      {
        year: "2027",
        strategy: parseInt(ReturnsAssets.PortfolioReturns / 5),
        baseline: parseInt(ReturnsAssets.ReturnsFromHouse / 5),
      },
      {
        year: "2028",
        strategy: parseInt((ReturnsAssets.PortfolioReturns / 5) * 2),
        baseline: parseInt((ReturnsAssets.ReturnsFromHouse / 5) * 2),
      },
      {
        year: "2029",
        strategy: parseInt((ReturnsAssets.PortfolioReturns / 5) * 3),
        baseline: parseInt((ReturnsAssets.ReturnsFromHouse / 5) * 3),
      },
      {
        year: "2030",
        strategy: parseInt((ReturnsAssets.PortfolioReturns / 5) * 4),
        baseline: parseInt((ReturnsAssets.ReturnsFromHouse / 5) * 4),
      },
      {
        year: "2031",
        strategy: parseInt(ReturnsAssets.PortfolioReturns),
        baseline: parseInt(ReturnsAssets.ReturnsFromHouse),
      },
    ]);
  }, [ReturnsAssets]);

  const UserDetails = useSelector((state) => state.UserDetails);

  const [savingReport, setSavingReport] = useState(false);
  const redirect = searchParams.get("redirect");

  const saveReports = async () => {
    setSavingReport(true);
    try {
      const result = await SaveReportsToFirebase(
        UserDetails.uid,
        housePrice,
        PortfolioOptions?.[2].profitAfterTax,
        address,
        0.3375 * housePrice,
        AnnualGrowth.house,
      );

      toast.success("Report Saved");
      navigate("/userDashboard");
    } catch (error) {
      toast.error("Failed To Save Report");
      console.log(error);
    }
    setSavingReport(false);
  };

  useEffect(() => {
    if (UserDetails.loggedIn && redirect) {
      saveReports();
    }
  }, [UserDetails.loggedIn]);

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
          stroke="#fff"
          stroke-width="1.5"
          stroke-linecap="round"
        />
        <path
          d="M17 7H7"
          stroke="#fff"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M14.5 14.5C14.5 15.8807 13.3807 17 12 17C10.6193 17 9.5 15.8807 9.5 14.5C9.5 13.1193 10.6193 12 12 12C13.3807 12 14.5 13.1193 14.5 14.5Z"
          stroke="#fff"
          stroke-width="1.5"
        />
        <path
          d="M9.5 14.5C9.5 18.5659 11.2222 20.8706 12 22L13.5 19L15.25 20L17 21C16.2653 20.2888 15.5058 18.0471 15.5058 18.0471"
          stroke="#fff"
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
        stroke="#fff"
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
        stroke="#fff"
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

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
          Wealth Builder
        </h1>
        <p className="text-[#5B616E] mt-1">
          Model different allocation strategies and assess risk impact.
        </p>
      </div>

      <div className="flex flex-row md:flex-col gap-8">
        <div className='flex flex-col md:flex-row items-center justify-between'>
          <div className="lg:col-span-2 space-y-8">
          {/* Allocation Section */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-[#111111]">
                Current Allocation
              </h3>
              <Button variant="outline" size="sm">
                Rebalance
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="h-64 w-full relative min-w-0">
                <ResponsiveContainer
                  width="100%"
                  height="100%"
                  minWidth={0}
                  debounce={1}
                >
                  <PieChart>
                    <pies
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                          stroke="none"
                        />
                      ))}
                    </pies>
                    <Tooltips />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-3xl font-bold text-[#111111]">
                    8.4%
                  </span>
                  <span className="text-xs text-[#5B616E] font-medium">
                    Proj. Yield
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {allocationData.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm font-medium text-[#111111]">
                        {item.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${item.value}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                      <span className="text-sm text-[#5B616E] w-8 text-right">
                        {item.value}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>

          {/* Scenarios Comparison */}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 bg-[#111111] text-white border-none">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold">Risk Meter</h3>
              <Shield size={20} className="text-emerald-400" />
            </div>

            <div className="relative w-full h-32 flex items-end justify-center mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simple Gauge Visual */}
                <svg
                  viewBox="0 0 100 50"
                  className="w-full h-full overflow-visible"
                >
                  <path
                    d="M 10 50 A 40 40 0 0 1 90 50"
                    fill="none"
                    stroke="#333"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 50 A 40 40 0 0 1 46 10"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="text-center z-10 mb-2">
                <div className="text-2xl font-bold">Low-Med</div>
                <div className="text-xs text-gray-400">Score: 35/100</div>
              </div>
            </div>

            <p className="text-sm text-gray-300 mb-4">
              Your portfolio is currently conservative with a strong bias
              towards secured real assets.
            </p>

            <Button
              variant="outline"
              className="w-full border-gray-700 text-white hover:bg-gray-800 hover:text-white"
            >
              Optimize Risk
            </Button>
          </Card>
        </div>
        </div>

          <div className="space-y-8 w-full ">
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
                {PortfolioOptions?.map((item, i) => {

                  const [prefix, tier] = item.value.split(" ");
                  return(
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedPortfolio(item);
                      setActiveButton(item.value);
                    }}
                    className={`relative z-10 px-4 md:px-6 py-2 w-full rounded-[10px] text-sm font-bold capitalize transition-colors duration-200 whitespace-nowrap ${
                      activeButton === item.value
                        ? "text-[#000]"
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
                  {prefix} <span className={`italic ${item.textColor}`}>{tier}</span>
                  </button>
                )
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            

              {/* Left Column: Visualization */}
              <div className="lg:col-span-8 space-y-6">
                {/* Chart Card */}
                <Card className="min-h-[500px] flex flex-col p-4">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="font-bold text-black flex items-center gap-2">
                      <Activity size={18} className="text-[#000]" />
                      Growth Projection (5 Years)
                    </h3>
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 text-xs font-bold">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-[#000]" />
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

                  <GrowthChart data = {datachart}/>
                </Card>

           

                   {/* Summary Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                     {/* 1. House Value (Yr 5) */}
                     <Card className="bg-white  p-4 border border-[#E6ECF5] shadow-[0_4px_12px_-4px_rgba(0,0,0,0.05)] relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-gray-50 rounded-bl-full -mr-2 -mt-2 pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                               <Home size={16} className="text-[#0A2540]" />
                               <div className="text-[10px] text-[#6A6A6A] uppercase tracking-wider font-bold">Estimated House Value (Yr 5)</div>
                            </div>
                            <div className="text-2xl font-bold tracking-tight text-[#0A2540] tabular-nums mb-1">
                           

                                 ${selectedPortfolio?.value !== 'Custom'?Number(selectedPortfolio?.EstimatedHousePrice).toLocaleString('en-us'):Number(ReturnsAssets?.EstimatedHousePrice).toLocaleString('en-us')}
                            </div>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-gray-100 text-[#6A6A6A] text-[10px] font-bold">
                               <span className="w-1.5 h-1.5 rounded-full bg-[#6A6A6A]" />
                               Conservative {parseInt(AnnualGrowth?.conservativeHouseGrowth)}% Growth
                            </div>
                        </div>
                     </Card>
                     
                     {/* 2. Portfolio Value (Yr 5) */}
                     <Card className="bg-gradient-to-b  p-4 from-[#0A0A0A] to-[#161718] text-[#fff] shadow-[0_8px_20px_-6px_rgba(0,91,255,0.4)] relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-24 h-24 bg-[#fff]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                               <TrendingUp size={16} className="text-[#fff]" />
                               <div className="text-[10px] text-[#fff] uppercase tracking-wider font-bold opacity-90">Estimated Portfolio Returns (Yr 5)</div>
                            </div>
                            <div className="text-2xl font-bold tracking-tight tabular-nums mb-1 text-[#fff]">
                               ${selectedPortfolio?.value !== 'Custom'?Number(selectedPortfolio?.PortfolioReturns).toLocaleString('en-us'):Number(ReturnsAssets?.PortfolioReturns).toLocaleString('en-us')}
                            </div>
                            <div className="text-[11px] font-medium text-[#fff] opacity-80">
                               From ${(selectedPortfolio?.value !== 'Baseline' && selectedPortfolio?.value !=='Custom')? Number(0.3375 * housePrice).toLocaleString("en-US") :selectedPortfolio?.value==='Custom'?Number(reinvestAmount.AmtToReinvest).toLocaleString("en-US"):'0'} equity unlocked
                            </div>
                        </div>
                     </Card>

                     {/* 3. Total Wealth Gain */}
                     <Card className="bg-[#F0FDF4]  p-4 border border-[#DCFCE7] shadow-[0_4px_12px_-4px_rgba(24,163,111,0.1)] relative overflow-hidden">
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#18A36F]/10 rounded-full blur-xl pointer-events-none" />
                        <div className="relative z-10">
                            <div className="flex items-center gap-2 mb-2">
                               <DollarSign size={16} className="text-[#18A36F]" />
                               <div className="text-[10px] text-[#166534] uppercase tracking-wider font-bold">Total Gain (5 Yr)</div>
                            </div>
                            <div className="text-2xl font-bold tracking-tight text-[#18A36F] tabular-nums mb-1">
                            {
                              ((selectedPortfolio?.value !== 'Custom' && selectedPortfolio?.profitAfterTax < 0) ||(selectedPortfolio?.value === 'Custom' && ReturnsAssets?.profitAfterTax < 0))&&'-'
                             }

                                ${selectedPortfolio?.value !== 'Custom'?Math.abs(Number(selectedPortfolio?.profitAfterTax)).toLocaleString('en-us'):Math.abs(Number(ReturnsAssets?.profitAfterTax)).toLocaleString('en-us')}
                            </div>
                            <div className="text-[11px] font-medium text-[#166534] flex items-center gap-1">
                               Appreciation {selectedPortfolio.value === 'Baseline' ?'':'+ Portfolio Profit'}
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
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/30 ${isBreakdownOpen ? "bg-[#0A2540] text-white  scale-110" : "bg-gradient-to-b from-[#0A0A0A] to-[#161718] from-100% text-[#fff]   group-hover:scale-105"}`}
                      >
                        <ShieldCheck size={18} />
                      </div>
                      <div className="flex flex-col items-start text-left">
                        <span
                          className={`text-sm font-bold transition-colors duration-300 ${isBreakdownOpen ? "text-[#0A2540]" : "text-[#0A2540] group-hover:text-black"}`}
                        >
                          HELOC Reinvestment Breakdown
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

                             <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Current House Value
                              </span>
                              <span className="font-medium text-black">
                                $ {Number(housePrice).toLocaleString('en-us')}
                                      

                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 1. Equity Unlocked */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Equity Line Of Credit (60% of Current House Value)
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
                                  HELOC Interest Rate
                                </span>
                                <span className="font-medium text-black ">
                               
                                  {selectedPortfolio?.value !=='Custom'?'~8.75%':HELOCRate}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-sm">
                                <span className="text-[#6A6A6A]">
                                  HELOC Interest Paid (5 yrs)
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
                                Net Investable Capital
                              </span>
                              <span className="font-medium text-black ">
                                $
                                  {(selectedPortfolio?.value !== 'Baseline' && selectedPortfolio?.value !=='Custom')? Number(0.3375 * housePrice).toLocaleString("en-US") :selectedPortfolio?.value==='Custom'?Number(reinvestAmount.AmtToReinvest).toLocaleString("en-US"):'0'}

                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                             {/* 3. Investable Amount */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                               House Appreciation Amount (5yrs) by <span className='font-bold text-[#000]'>LIAM</span>
                              </span>
                              <span className="font-medium text-black ">
                              
                              {(selectedPortfolio?.ReturnsFromHouse < 0 || ReturnsAssets?.ReturnsFromHouse < 0 )&& '-'}
                                $
                                  {selectedPortfolio?.value !== 'Custom'?Math.abs(Number(selectedPortfolio?.ReturnsFromHouse)).toLocaleString('en-us'):Math.abs(Number(ReturnsAssets?.ReturnsFromHouse)).toLocaleString('en-us')}

                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 4. Growth Assumptions */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Estimated Portfolio Return (5yr)(%)
                              </span>
                              <span className="font-medium text-[#005BFF] ">
                               
                                
                        {selectedPortfolio?.value !== 'Custom'?selectedPortfolio?.portfoliopercentReturn:ReturnsAssets?.portfoliopercentReturn}%

                                
                 
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Estimated Portfolio Return (5yr) 
                              </span>
                              <span className="font-medium text-[#005BFF] ">
                               
                                
                        ${selectedPortfolio?.value !== 'Custom'?Number(selectedPortfolio?.PortfolioReturnsBeforeTax).toLocaleString('en-us'):Number(ReturnsAssets?.PortfolioReturnsBeforeTax).toLocaleString('en-us')}

                                
                 
                              </span>
                            </div>
                            <div className="w-full h-px bg-gray-100" />

                            {/* 5. Taxation */}
                            <div className="flex justify-between items-center text-sm">
                              <span className="text-[#6A6A6A]">
                                Capital Gains Tax (15%)
                              </span>
                              <span className="font-medium text-red-500">
                                -$
                              

                                   
                         {selectedPortfolio?.value !== 'Custom'?Number(selectedPortfolio?.CapitalGainsTax).toLocaleString('en-us'):Number(ReturnsAssets?.CapitalGainsTax).toLocaleString('en-us')}
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
                                  
                                



  ${selectedPortfolio?.value !== 'Custom'?Number(selectedPortfolio?.profitAfterTax).toLocaleString('en-us'):Number(ReturnsAssets?.profitAfterTax).toLocaleString('en-us')}

                                
    

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


                      {/* -House Appreciation Graph */}

                 <div className="mt-6 rounded-[16px] border border-[#E6ECF5] bg-white shadow-[0_8px_32px_-8px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-300">
                    <button 
                      onClick={() => setIsAppreciationOpen(!isAppreciationOpen)}
                      className="w-full flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-all duration-300 group"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/30 ${isAppreciationOpen ? 'bg-[#000] text-white shadow-lg  scale-110' : 'bg-black text-[#000] group-hover:bg-black group-hover:text-white group-hover:scale-105'}`}>
                           <div className="flex -space-x-1">
                              <Home size={14} color={'#fff'} />
                              <TrendingUp size={14} color={'#fff'} className="-mt-1" />
                           </div>
                        </div>
                        <div className="flex flex-col items-start text-left">
                          <span className="text-sm font-bold text-[#0A2540] group-hover:text-black transition-colors">
                             House Value & Appreciation Projection
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isAppreciationOpen ? 90 : 0 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 260, damping: 20 }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${isAppreciationOpen ? 'bg-[#000]/10 text-[#000]' : 'text-[#000] group-hover:bg-black group-hover:text-white'}`}
                      >
                         <ChevronRight size={16} />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {isAppreciationOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        >
                          <div className="px-6 pb-6 pt-2 space-y-6">
                             
                             {/* Section 1: Chart */}
                             <AppreciationChart HousePrices={HousePrices} growthRate={AnnualGrowth.house}/>
                             <div className= 'text-[12px] text-[#000] px-8 flex flex-col gap-4  p-4 sm:p-5 rounded-xl bg-gradient-to-br from-[#000]/5 to-[#000]/10 border-2 border-[#000]/60'>
                             <h1 className='font-bold text-[14px]'>How LIAM Estimates House Appreciation (LIAM - Liquidity Investment Analysis Model)</h1>





<div className='capitalize'>
Projections generated by Liam our proprietary AI property intelligence model using multi-factor analysis across historical sales data, regional growth cycles, macro rate environments, and volatility filters.

</div>


<div className='capitalize'>
 
The model applies normalization and risk controls to reduce distortion from short-term spikes or crashes, producing a stability-adjusted 5-year projection range rather than  <span className='font-bold'>a speculative forecast.</span>
</div>



                             </div>
                             {/* Section 2: Summary Cards */}
                         

                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

               
              </div>
                {/* Right Column: Strategy Inputs */}
              <div className="lg:col-span-4 space-y-6">
                <Card className="h-full border-[#0A2540]/20 ring-4 ring-[#0A2540]/5  p-4">
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
                        ? `Your home ${parseInt(AnnualGrowth?.house)?.toFixed(2) > 0 ? "appreciates" : "depreciates"} at typical  ${parseInt(AnnualGrowth?.house)} %    annually, If your equity isn't actively invested.`
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
                        className={`text-3xl font-bold tracking-tight text-[#0A2540]`}
                      >
                      
                         {
                              ((selectedPortfolio?.value !== 'Custom' && selectedPortfolio?.profitAfterTax < 0) ||(selectedPortfolio?.value === 'Custom' && ReturnsAssets?.profitAfterTax < 0))&&'-'
                             }


                         ${selectedPortfolio?.value !== 'Custom'?Math.abs(parseInt(selectedPortfolio?.profitAfterTax/5)):Math.abs(parseInt(ReturnsAssets?.profitAfterTax/5))}
                        

                      
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
                                className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-md shadow-black/60 shrink-0 "
                                style={{
                                  backgroundColor: `#000`,
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
                              className={`text-[10px] font-bold px-2.5 py-1 rounded-sm  ${AnnualGrowth[key as keyof typeof AnnualGrowth] >= 0 ? "text-[#18A36F] bg-[#18a36f]/10" : "text-red-500 bg-red-100"}`}
                            >
                              {AnnualGrowth[key]}% P.A.
                            </span>
                            
                          </div>
                        </div>
                      ),
                    )}
                  </div>

                  <button
                 onClick={()=>{
                  setScreen(4)
                 }}
                  className="w-full mt-8 py-4 bg-gradient-to-b from-[#0A0A0A] to-[#161718]  text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 hover:bg-[#005BFF] transition-all flex items-center justify-center gap-2 group">
                    Apply This Strategy
                    <ArrowUpRight
                      size={18}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </button>
                </Card>
              </div>
            </div>

             {/* What is Equity Unlock */}

                <div className="bg-gradient-to-b from-[#0A0A0A] to-[#161718] p-6 rounded-[20px] border border-blue-100 flex items-center gap-4">
                    <img
                    src={Equity}
                    alt=""
                    className="w-[10%] "
                  />
                  {/* <div className="min-w-[40px] h-10 rounded-full bg-[#000] flex items-center justify-center text-[#ffd400] shadow-md]">
                    <Info size={24} />
                  </div> */}
                  <div>
                    <h4 className="font-bold text-white mb-1">
                      What is "Equity Unlock"?
                    </h4>
                    <p className="text-sm text-[#fff]/60 leading-relaxed">
                      Instead of keeping all your wealth locked in your home
                      (which grows at ~3-4% annually), you can access some
                      equity through a HELOC or refinance, then invest it in
                      diversified portfolios potentially earning 6-10% returns.
                      You keep your home while your money works harder.
                    </p>
                  </div>
                   
                </div>
          </div>
      </div>
    </div>
  );
}
