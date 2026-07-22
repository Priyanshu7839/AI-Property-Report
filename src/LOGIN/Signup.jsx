import { BarChart2, Building2, CheckSquare, ChevronDown, ChevronLeft, ChevronRight, CircleCheck, FileText, House, Key, Map, Search, Target, TrendingUp, User, UserPen, Zap } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import AustinImg from '../assets/Austin.png'

const Signup = () => {

    const navigate = useNavigate()

  const [step, setStep] = useState(1);

  const [strength, setStrength] = useState(0);


  const BuyerType = [
    {
        icon:<Building2/>,
        head:'Real Estate Investor',
        desc:'I invest in properties'
    },
    {
        icon:<House/>,
        head:'Homebuyer',
        desc: `I'm looking to buy`
    },
    {
        icon:<User/>,
        head:'Agent / Broker',
        desc:'I work in real estate'
    },
    {
        icon:<UserPen/>,
        head:'Others',
        desc:'Something else'
    },

  ]
  const [selectedBuyerType,setselectedBuyerType] = useState('')
  const [name,setName] = useState('')

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [password2,setPassword2] = useState('')
  const [selectedCountry,setSelectedCountry] = useState('United States')

  const getPasswordStrength = (password) => {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

  return score; // 0 - 4
};



const [showCountries,setShowCountries] = useState(false)

const countries = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Colombia",
  "Comoros",
  "Congo",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Cyprus",
  "Czech Republic",
  "Democratic Republic of the Congo",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Greece",
  "Grenada",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Kuwait",
  "Kyrgyzstan",
  "Laos",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Mauritania",
  "Mauritius",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "North Korea",
  "North Macedonia",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Poland",
  "Portugal",
  "Qatar",
  "Romania",
  "Russia",
  "Rwanda",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Korea",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Sweden",
  "Switzerland",
  "Syria",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Vatican City",
  "Venezuela",
  "Vietnam",
  "Yemen",
  "Zambia",
  "Zimbabwe"
];


    useEffect(()=>{
        setStrength(getPasswordStrength(password))
    },[password])



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


  return (
    <div className="flex flex-col items-center gap-8 font-[Inter] p-6 max-w-4xl w-full mx-auto justify-between h-[100vh]">
      {/* -------------------------------------------------------Step1----------------------------------------------------------------------------- */}
      {step === 1 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
              onClick={()=>{
                navigate('/')
              }}
              />

              <div className="font-bold text-[#111827] text-[30px] flex flex-col gap-2">
                <h1>Create Account</h1>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 1 of 7
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}
            <div className="flex flex-col gap-5 w-full items-start">
              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[#111827] text-[14px] font-semibold"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  onChange={(e)=>{setName(e.target.value)}}
                  value={name}
                  className="border border-[#E5E7EB] outline-[green] rounded-[12px] bg-[#F9FAFB] placeholder:text-[#9CA3AF] text-[16px] px-4 py-3 w-full"
                />
              </div>
              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[#111827] text-[14px] font-semibold"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  onChange={(e)=>{setEmail(e.target.value)}}
                  value={email}
                  className="border border-[#E5E7EB] rounded-[12px] outline-[green] bg-[#F9FAFB] placeholder:text-[#9CA3AF] text-[16px] px-4 py-3 w-full"
                />
              </div>
            
            </div>
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => {
                setStep(2);
              }}
              disabled={email === '' || name === ''}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px] disabled:opacity-60 "
            >
              Continue
            </button>

            <div className="text-[14px] text-[#6B7280]">
             Already have an account?{" "}
              <span 
              onClick={()=>{
                navigate('/AskLIAM/SignIn')
              }}
              className="font-semibold text-[#22C55E]">Sign In</span>
            </div>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 2 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(1);
                }}
              />

              <div className="font-bold text-[#111827] text-[30px] flex flex-col gap-2">
                <h1>Create Account</h1>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 2 of 7
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}
            <div className="flex flex-col gap-5 w-full items-start">
              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[#111827] text-[14px] font-semibold"
                >
                  Password
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  className="border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB] placeholder:text-[#9CA3AF] text-[16px] px-4 py-3 w-full outline-[green]"
                />
              </div>

              <div className="flex flex-col gap-2 items-start w-full">
                <p className="font-semibold text-[13px] text-[#6B7280]">
                  Password strength
                </p>

                <div className="w-full flex items-center gap-1">
                  {Array(4)
                    .fill()
                    .map((_, i) => {
                      return (
                        <div
                          key={i}
                          className={`w-full h-[6px] rounded-[3px]  
                                bg-[#E5E7EB]
                                `}

                                
                        >
{i+1 <= strength &&
                                                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{
                                                    duration: 0.4,
                                                    ease: "easeInOut",
                                                }}
                                                className="h-full bg-[#22C55E] rounded-[3px]"
                                                />}
                        </div>
                      );
                    })}
                </div>

                <p className="text-[#6B7280] text-[12px] font-normal">
                  Use 8+ characters with a mix of letters, numbers & symbols.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[#111827] text-[14px] font-semibold "
                >
                  Confirm Password
                </label>
                <input
                  type="text"
                  value={password2}
                  onChange={(e)=>{setPassword2(e.target.value)}}
                  placeholder="Confirm Your Password"
                  className="border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB] placeholder:text-[#9CA3AF] text-[16px] px-4 py-3 w-full outline-[green]"
                />
              </div>
            </div>
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => {
                setStep(3);
              }}

              disabled={password === '' || password !== password2 || strength<4}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px] disabled:opacity-60 "
            >
              Continue
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 3 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(2);
                }}
              />

              {/* <div className="font-bold text-[#111827] text-[30px] flex flex-col gap-2">
                <h1>Create Account</h1>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 3 of 4
                </p>
                <p className="text-[16px] font-normal  text-[#6B7280]">
                  What best describes you?
                </p>
              </div> */}
            </div>

             <div className="flex flex-col gap-6 w-full items-start">
             

              <div className=" flex flex-col items-start gap-2">
              <h1 className="text-[32px] font-extrabold text-[#111827]"> What Best <span className="text-[#047F2C]">Describes</span> You</h1>

               <p className="text-[17px] text-[#6B7280]">This helps us personalize your experience.</p>

                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 3 of 7
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
                setStep(4);
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
      {step === 4 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center  h-full gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(3);
                }}
              />

              <div className="font-bold text-[#111827] text-[30px] flex flex-col gap-2">
                <h1>Create Account</h1>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 4 of 4
                </p>
                <p className="text-[16px] font-normal  text-[#6B7280]">
                  Where are you primarily investing?
                </p>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------ */}
            <div className="flex flex-col gap-5 w-full items-start">
              <div className="flex flex-col items-start gap-2 w-full">
                <label
                  htmlFor=""
                  className="text-[#111827] text-[14px] font-semibold"
                >
                  Country
                </label>
                <div
                 onClick={()=>{setShowCountries(!showCountries)}}
                  className="border border-[#E5E7EB] rounded-[12px] bg-[#F9FAFB] text-[#111827] text-[16px] px-4 py-3 w-full flex items-center justify-between relative"
                >
{selectedCountry}

                  <ChevronDown />


                  {
                    showCountries && 
                    <div 
                    
                    className="w-full h-[400px] w-full absolute top-full left-0 bg-[#F9FAFB] px-4 py-3 overflow-scroll">
                        {
                            countries?.map((item,i)=>{
                                return(
                                    <h1
                                    onClick={()=>{
                                        setSelectedCountry(item)
                                        setShowCountries(false)}}
                                    className="hover:bg-black/10 py-3">{item}</h1>
                                )
                            })
                        }
                    </div>
                  }
                </div>
              </div>
              
            </div>
          </div>
          {/* --------------------------------------------------------------------------------------- */}

          <div className="flex flex-col items-center gap-5 w-full">
            <button
              onClick={() => {
                setStep(5);
              }}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
             Create Account
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
   
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 5 && (
        <div className="flex flex-col items-center gap-8 w-full h-full justify-between">
          <div className="flex flex-col items-center  h-full gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(5);
                }}
              />

              <div className=" flex flex-col items-start gap-2">
              <h1 className="text-[32px] font-extrabold text-[#111827] text-left"> What are you looking to <span className="text-[#047F2C]">Achieve ?</span></h1>

               <p className="text-[17px] text-[#6B7280]">Select All that Apply</p>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 5 of 4
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

                    <div className="w-6 h-6 border-[2px] border-[#D1D5DB] rounded-full">

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
                setStep(7);
              }}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
             Continue
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 7 && (
        <div className="flex flex-col items-center gap-8 w-full justify-between">
          <div className="flex flex-col items-center  h-full gap-8 w-full">
            <div className="flex flex-col gap-6 w-full items-start">
              <ChevronLeft
                onClick={() => {
                  setStep(6);
                }}
              />

              <div className=" flex flex-col items-start gap-2">
              <h1 className="text-[32px] font-extrabold text-[#111827] text-left">Which  <span className="text-[#047F2C]">Market</span> are you Interested In?</h1>

               <p className="text-[17px] text-[#6B7280] text-left">We'll show insights and opportunities in your preferred market.</p>
                <p className="text-[14px] font-semibold  text-[#6B7280]">
                  Step 7 of 4
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
                setStep(8);
              }}
              className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[#FFFFFF] w-full rounded-[12px]"
            >
             Continue
            </button>
            <button
              onClick={() => {
                setStep(8);
              }}
              className="px-5 py-3 border border-[green] font-semibold text-[16px] text-[green] w-full rounded-[12px]"
            >
             Skip for Now
            </button>
          </div>
        </div>
      )}
      {/* ----------------------------------------------------------step2-------------------------------------------------------------------------- */}
      {step === 8 && (
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

export default Signup;
