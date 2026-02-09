import { useState, useEffect } from 'react';
import { Calculator, TrendingUp, AlertCircle } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { Slider } from '../../components/ui/slider';

import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Legend);
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../components/ui/tooltip';

interface PropertyData {
  estimatedValue: {
    low: number;
    high: number;
  };
  currentEquity: {
    low: number;
    high: number;
  };
}


export default function CustomTab({reinvestAmount,annualGrowth,housePrice}) {

 


    const propertyData = {
        estimatedValue:{
            low:'12000',
            high:'14000'
        },
        currentEquity:{
            low:'160000',
            high:'200000'
        }
    }

  // Form state
  const [mortgageBalance, setMortgageBalance] = useState('850000');
  const [mortgageType, setMortgageType] = useState('30-fixed');
  const [mortgageRate, setMortgageRate] = useState('3.5');
  const [insurancePremium, setInsurancePremium] = useState('2400');
  const [creditBand, setCreditBand] = useState('excellent');
  const [propertyCondition, setPropertyCondition] = useState('good');

  // Allocation state (must total 100)
  const [equities, setEquities] = useState(60);
  const [bonds, setBonds] = useState(30);
  const [cash, setCash] = useState(10);
  const [crypto, setCrypto] = useState(0);

  // Ensure allocations total 100%
  const normalizeAllocations = (
    newEquities: number,
    newBonds: number,
    newCash: number,
    newCrypto: number
  ) => {
    const total = newEquities + newBonds + newCash + newCrypto;
    if (total === 100) {
      setEquities(newEquities);
      setBonds(newBonds);
      setCash(newCash);
      setCrypto(newCrypto);
    } else if (total !== 0) {
      // Normalize to 100
      const factor = 100 / total;
      setEquities(Math.round(newEquities * factor));
      setBonds(Math.round(newBonds * factor));
      setCash(Math.round(newCash * factor));
      setCrypto(Math.round(newCrypto * factor));
    }
  };

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
    const newCrypto = Math.min(value[0], 20); // Cap at 20%
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

  // Calculate accessible equity
  const avgValue = (propertyData.estimatedValue.low + propertyData.estimatedValue.high) / 2;
  const balance = parseFloat(mortgageBalance) || 0;
  const ltv = 0.8; // 80% LTV limit
  const maxLoan = avgValue * ltv;
  const accessibleEquity = Math.max(0, maxLoan - balance);

  // Estimate rates based on credit band
  let helocRate = 7.5;
  let refiRate = 6.5;
  if (creditBand === 'excellent') {
    helocRate = 6.5;
    refiRate = 5.5;
  } else if (creditBand === 'good') {
    helocRate = 7.0;
    refiRate = 6.0;
  } else if (creditBand === 'fair') {
    helocRate = 8.5;
    refiRate = 7.5;
  } else if (creditBand === 'poor') {
    helocRate = 9.5;
    refiRate = 8.5;
  }






 
 


  // Determine risk level
  const getRiskLevel = () => {
    if (crypto > 10 || equities > 70) return { level: 'High', color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-200' };
    if (equities > 40) return { level: 'Medium', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200' };
  };

  const risk = getRiskLevel();

  const allocation = [
    { name: 'Equities', value: equities, color: '#3B82F6' },
    { name: 'Bonds', value: bonds, color: '#60A5FA' },
    { name: 'Cash', value: cash, color: '#93C5FD' },
    { name: 'Crypto', value: crypto, color: '#F59E0B' }
  ].filter(item => item.value > 0);


  const [scenario,setscenario] = useState('Growth')


  useEffect(()=>{
    if(scenario === 'Cash Preservation'){
     setEquities(36)
     setBonds(39)
     setCrypto(15)
     setCash(10)
    }
    if(scenario ==='Growth'){
 setEquities(49)
     setBonds(21)
     setCrypto(20)
     setCash(10)
    }
    if(scenario === 'High Growth'){
     setEquities(56)
     setBonds(10)
     setCrypto(29)
     setCash(5)
    }
  },[scenario])

  ///Calculator

  const [AmountInvestInAssets,setAmountInvestedInAssets] = useState({
    SandP:'',
    Bonds:'',
    Crypto:'',
    Cash:''
  });

  useEffect(()=>{
    const SandPAmount = reinvestAmount * (equities / 100)
    const bondsAmount = reinvestAmount * (bonds / 100)
    const cashAmount = reinvestAmount * (cash / 100)
    const cryptoAmount = reinvestAmount * (crypto / 100)
    

    setAmountInvestedInAssets({...AmountInvestInAssets,SandP:SandPAmount,Bonds:bondsAmount,Crypto:cryptoAmount,Cash:cashAmount})
  },[equities,bonds,cash,crypto,reinvestAmount])

  const [ReturnsAssets,setReturnsInAssets] = useState({
    SandP:'',
    Bonds:'',
    Crypto:'',
    Cash:'',
    House:'',
    TotalReturns:'',
    GainsTax:'',
    ReturnAfterTax:'',
    ValueOptimized:'',
    ValueNotOptimized:'',
    NetGainAfterOptimization:'',
    NetGainAfterOptimizationpercent:''
  });


  useEffect(()=>{
    const SandPReturn = AmountInvestInAssets.SandP * Math.pow(1 + (annualGrowth.SandP/100),5) - AmountInvestInAssets.SandP
    const BondsReturn = AmountInvestInAssets.Bonds * Math.pow(1 + (annualGrowth.Bonds/100),5) - AmountInvestInAssets.Bonds
    const CryptoReturn = AmountInvestInAssets.Crypto * Math.pow(1 + (annualGrowth.Bitcoin/100),5) - AmountInvestInAssets.Crypto
    const CashReturn = AmountInvestInAssets.Cash * Math.pow(1.02 , 5) - AmountInvestInAssets.Cash
    const HouseReturn = housePrice * Math.pow(1.02,5) - housePrice
   

    const TotalReturnAmount = SandPReturn + BondsReturn + CryptoReturn + CashReturn + HouseReturn
    const GainsTaxAmount =  (SandPReturn + BondsReturn + CryptoReturn + CashReturn) * (15/100)
    const GainsAfterTaxAmount = TotalReturnAmount - GainsTaxAmount;
    const ValueOptimizedAmount = housePrice + GainsAfterTaxAmount
    const ValueNotOptimizedAmount  = housePrice + HouseReturn
    const NetGainAfterOptimizationAmount = ValueOptimizedAmount - ValueNotOptimizedAmount
    const NetGainAfterOptimizationpercent =(Math.pow( (ValueOptimizedAmount / housePrice), 0.2) - 1 ) * 100

    setReturnsInAssets({...ReturnsAssets,
      SandP:parseFloat(SandPReturn).toFixed(2),
      Bonds:BondsReturn,
      Crypto:CryptoReturn,
      Cash:CashReturn,
      House:HouseReturn,
      TotalReturns:parseFloat(TotalReturnAmount).toFixed(2),
      GainsTax:parseFloat(GainsTaxAmount).toFixed(2),
      ReturnAfterTax:parseFloat(GainsAfterTaxAmount).toFixed(2),
      ValueOptimized:parseFloat(ValueOptimizedAmount).toFixed(2),
      ValueNotOptimized:parseFloat(ValueNotOptimizedAmount).toFixed(2),
      NetGainAfterOptimization:parseFloat(NetGainAfterOptimizationAmount).toFixed(2),
      NetGainAfterOptimizationpercent:parseFloat(NetGainAfterOptimizationpercent).toFixed(2)
    
    })
  },[AmountInvestInAssets,annualGrowth])

  

  
 


   

  return (
    <div className="space-y-8 w-full">
    

      {/* SECTION 2 - ALLOCATION SIMULATOR */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-8">
        <h2 className="text-xl md:text-2xl text-gray-900 mb-6 capitalize font-semibold flex items-center justify-between flex-col md:flex-row">
          If you accessed this equity, how would you allocate it?
         

          <div className='font-medium flex items-center gap-4 justify-between'>
          

          <div className='flex items-center justify-center gap-4 px-2 py-1 border border-[#cfcfd7] rounded-md' >
                {
                  ['Cash Preservation','Growth','High Growth'].map((item,i)=>{
                    return(
                      <div key={i} 
                      onClick={()=>{setscenario(item)}}
                      className={`flex items-center justify-center gap-2  text-[13px] 
                      ${scenario===item ? 'text-[#005bff] font-medium':'font-normal'}
                      `}>

                        <span className={`h-4 w-4 border  rounded-full flex items-center justify-center ${scenario===item ? 'bg-[#005bff]  border-[#005bff] text-[#005bff]':'border-[#cfcfd7]'}`}>
                         {scenario===item && <span className='h-1.5 w-1.5 bg-[#fff] rounded-full'></span>}
                        </span>
                        {item}

                      </div>
                    )
                  })
                }
          </div>
        </div>
        </h2>

       

        {/* Allocation Bar */}
        <div className="mb-6">
        
     
          <div className="flex  w-full h-16  overflow-hidden mb-2 rounded-md">
            {allocation.map((item) => (
              <div
                key={item.name}
                style={{ width: `${item.value}%`, backgroundColor: item.color }}
                className="flex flex-col items-center justify-center text-white text-xs md:text-sm font-medium transition-all duration-300"
              >
                <span className="text-[1.25rem] font-semibold">{item.value}%</span>
                <span className="hidden sm:inline text-xs uppercase">{item.name}</span>
              </div>

              
            ))}

       
          </div>
         
        </div>

         <div className='mb-6 w-full flex items-center justify-end'>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg  ${risk.bg} ${risk.border} border`}>
            <span className="text-xs font-medium text-gray-700">Risk Level:</span>
            <span className={`text-xs font-medium ${risk.color}`}>{risk.level}</span>
          </div>
         </div>

         

        {/* Sliders */}
        <div className="space-y-6 mb-8">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm md:text-base">S&P</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Assumes ~{parseFloat(annualGrowth.SandP).toFixed(2)}% long-term average</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-gray-900">{equities}%</span>
            </div>
            <Slider
              value={[equities]}
              onValueChange={handleEquitiesChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm md:text-base">Bonds</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Assumes ~{annualGrowth.Bonds}% long-term average</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-gray-900">{bonds}%</span>
            </div>
            <Slider
              value={[bonds]}
              onValueChange={handleBondsChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm md:text-base">Cash</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Assumes ~1-2%</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-gray-900">{cash}%</span>
            </div>
            <Slider
              value={[cash]}
              onValueChange={handleCashChange}
              max={100}
              step={1}
              className="w-full"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Label className="text-sm md:text-base">Crypto / High-risk</Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <AlertCircle className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-sm">Assumes ~{parseFloat(annualGrowth.Bitcoin).toFixed(2)}% Annually</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <span className="text-sm font-medium text-gray-900">{crypto}%</span>
            </div>
            <Slider
              value={[crypto]}
              onValueChange={handleCryptoChange}
              max={20}
              step={1}
              className="w-full"
            />
          </div>

          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-xs text-gray-600">
              Total allocation: <strong>{equities + bonds + cash + crypto}%</strong>
              {equities + bonds + cash + crypto !== 100 && (
                <span className="text-amber-600 ml-2">(Adjusting to 100%)</span>
              )}
            </p>
          </div>
        </div>

        {/* Live Results Panel */}
        <div className="border-t border-gray-200 pt-6">
          {/* <h3 className="text-base md:text-lg font-medium text-gray-900 mb-4">Live Results</h3> */}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
             {/* <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Returns from Assets </p>
              <p className="text-2xl md:text-3xl text-gray-900">
                ${ReturnsAssets.TotalReturns}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Including House Growth
              </p>
            </div>
          

            <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Capital Gains Tax Rate</p>
              <p className="text-2xl md:text-3xl text-red-600">
                15%
              </p>
              <p className="text-xs text-gray-500 mt-1">
              Except on House Growth
              </p>
            </div> */}
            {/* <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Return After Tax</p>
              <p className="text-2xl md:text-3xl text-gray-900">
                ${ReturnsAssets.ReturnAfterTax}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                15% Capital tax
              </p>
            </div> */}

            {/* <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Capital Gains Tax</p>
              <p className="text-2xl md:text-3xl text-red-600">
                ${ReturnsAssets.GainsTax}
              </p>
              <p className="text-xs text-gray-500 mt-1">
               Deducted from Returns
              </p>
            </div> */}

             

            
            {/* <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Returns (5 Years)</p>
              <p className="text-2xl md:text-3xl text-gray-900 flex items-baseline gap-2">
                ${ReturnsAssets.ValueOptimized}
                 <p className="text-sm font-medium text-[#005bff] mt-1">
               (Optimized)
              </p>
              </p>
             
            </div>
            <div className="bg-gray-50 p-4 md:p-5 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Total Returns (5 Years)</p>
              <p className="text-2xl md:text-3xl text-gray-900 flex items-baseline gap-2">
                                ${ReturnsAssets.ValueNotOptimized}
                                   <p className="text-sm font-medium text-red-500 mt-1">
                (Not Optimized)
              </p>

              </p>
           
            </div> */}

           
          </div>

        <div className='flex flex-col  gap-4 mb-4'>
                     <h1 className="text-base md:text-lg font-medium text-gray-900 mb-2">Strategy Comparison</h1>

          <div className='flex w-full gap-4 items-center justify-between'>
             <div className='flex flex-col gap-1 w-full'>
                        <div className='flex items-center justify-between'>
                           <p className="text-sm text-gray-600 mb-1">Optimized Returns (5 Years)</p>
 <span className=' text-[24px] text-green-600 font-medium   py-1 px-2'>
              ${parseInt(ReturnsAssets.ValueOptimized).toLocaleString('en-us')}
             </span>
           
                      </div>

           
             <div className='w-full h-[26px] rounded-sm bg-green-600 py-1 text-[12px] text-right px-2 text-white' ></div>
           </div>
           <div className='flex flex-col gap-1 w-full'>
                      <div className='flex items-center justify-between'>
                           <p className="text-sm text-gray-600 mb-1">Not Optimized Returns (5 Years)</p>
 <span className=' text-[24px] text-[#0b85ff] font-medium  py-1 px-2'>
              ${parseInt(ReturnsAssets.ValueNotOptimized).toLocaleString('en-us')}
             </span>
           
                      </div>
             <div className='w-full h-[26px]  rounded-sm bg-gray-200  relative' >

              <div className={` h-full bg-[#0b85ff] absolute left-0 top-0 rounded-sm text-right `}
              style={{width:`${(parseInt(ReturnsAssets.ValueNotOptimized)/parseInt(ReturnsAssets.ValueOptimized))*100}%`}}
              >
                    
              </div>
             </div>
           </div>
          </div>
           
        </div>

          <div className={`p-4 md:p-5 rounded-lg border-2 ${ReturnsAssets.NetGainAfterOptimization >= 0 ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className={`w-5 h-5 ${ReturnsAssets.NetGainAfterOptimization >= 0 ? 'text-green-600' : 'text-amber-600'}`} />
              <p className={`text-sm font-medium ${ReturnsAssets.NetGainAfterOptimization >= 0 ? 'text-green-900' : 'text-amber-900'}`}>
                Net Gain / Loss After Financing
              </p>
            </div>
            <p className={`text-3xl md:text-4xl font-medium ${ReturnsAssets.NetGainAfterOptimization >= 0 ? 'text-green-600' : 'text-amber-600'}`}>
              {ReturnsAssets.NetGainAfterOptimization >= 0 ? '+' : ''}${parseInt(ReturnsAssets.NetGainAfterOptimization).toLocaleString('en-us')} ({ReturnsAssets.NetGainAfterOptimizationpercent}%)
            </p>
            <p className="text-xs text-gray-600 mt-2">
              LIAM projection based on long-term historical averages.
            </p>
          </div>
        </div>
      </div>

      {/* SECTION 3 - STRATEGY ACTION */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-8">
        <div className="bg-gray-50 p-4 md:p-6 rounded-lg mb-6">
          <p className="text-sm md:text-base text-gray-700">
            This strategy uses approximately <strong className="text-gray-900">${(accessibleEquity / 1000).toFixed(0)}k</strong> of 
            home equity with a <strong className={risk.color}>{risk.level.toLowerCase()} risk</strong> profile.
          </p>
        </div>

        <div className="text-center">
          <Button size="lg" className="gap-2 px-6 md:px-8 w-full sm:w-auto">
            <Calculator className="w-5 h-5" />
            Apply this strategy & speak to a specialist
          </Button>
          <p className="text-sm text-gray-600 mt-3">
            A licensed professional can help you evaluate whether this makes sense for you.
          </p>
        </div>
      </div>
    </div>
  );
}