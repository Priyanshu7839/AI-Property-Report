import React, { useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import {
  ArrowRight, ArrowLeft, Building2, Home, KeyRound, ShieldCheck, Users, BriefcaseBusiness,
  Sparkles, Check, Search, MapPin, Mail, LockKeyhole, Phone, UserRound, Loader2,
  FileText, WalletCards, Wrench, BarChart3, Landmark, Upload, CheckCircle2, Layers,
   Menu, X
} from 'lucide-react'

const cn = (...classes) => classes.filter(Boolean).join(' ')

const userTypes = [
  { id:'homeowner', title:'Homeowner', icon:Home, text:'I own my home and want to understand value, equity, insurance, and refinance options.' },
  { id:'small', title:'Small Property Owner', icon:Building2, text:'I own 1–3 rental units or apartments.' },
  { id:'investor', title:'Independent Investor', icon:BarChart3, text:'I own 4–20 properties and want better portfolio visibility.' },
  { id:'operator', title:'Portfolio Operator', icon:Users, text:'I manage 20–100 properties with tenants, rent, leases, and maintenance.' },
  { id:'enterprise', title:'Institutional / Enterprise', icon:Layers, text:'I manage 100+ properties, commercial assets, or investor capital.' },
  { id:'advisor', title:'Advisor / Partner', icon:BriefcaseBusiness, text:'I am a mortgage, insurance, tax, or real estate advisor.' },
]

const goals = [
  ['Understand my property value', Home],
  ['Unlock equity / refinance', Landmark],
  ['Reduce insurance cost', ShieldCheck],
  ['Track rent and tenants', WalletCards],
  ['Organize leases and documents', FileText],
  ['Manage maintenance', Wrench],
  ['Generate investor reports', BarChart3],
  ['Analyze commercial assets', Building2],
]

const countOptions = ['1','2–3','4–10','11–25','26–100','100+']

export const HouseAddition=()=>{
  const [step,setStep] = useState(0)
  const [selectedType,setSelectedType] = useState('')
  const [selectedGoals,setSelectedGoals] = useState([])
  const [propertyCount,setPropertyCount] = useState('')
  const [address,setAddress] = useState('')
  const total = 8

  const progress = Math.round(((step+1)/total)*100)
  const goNext = () => setStep(s => Math.min(total-1, s+1))
  const goBack = () => setStep(s => Math.max(0, s-1))

  const context = {step,setStep,selectedType,setSelectedType,selectedGoals,setSelectedGoals,propertyCount,setPropertyCount,address,setAddress,goNext,goBack,total,progress}

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <TopChrome step={step} progress={progress}/>
        <main className="flex flex-1 items-center justify-center py-5 sm:py-8">
          <div className="grid w-full max-w-[1180px] grid-cols-1 overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-soft lg:min-h-[720px] lg:grid-cols-[1fr_420px]">
            <section className="order-2 flex flex-col p-5 sm:p-8 lg:order-1 lg:p-10">
              <div className="mb-7 flex items-center justify-between">
                <button onClick={goBack} className={cn("inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50", step===0 && "invisible")}>
                  <ArrowLeft size={16}/> Back
                </button>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">Step {step+1} of {total}</span>
              </div>
              <div className="flex flex-1 items-center">
                <StepRenderer {...context}/>
              </div>
            </section>
            <aside className="order-1 bg-[#071018] p-5 text-white sm:p-7 lg:order-2 lg:p-8">
              <InsightPanel step={step} selectedType={selectedType} selectedGoals={selectedGoals} propertyCount={propertyCount}/>
            </aside>
          </div>
        </main>
      </div>
    </div>
  )
}

function TopChrome({step,progress}){
  return (
    <header className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 shadow-card sm:px-5">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-2xl bg-ink text-white"><Home size={21}/></div>
        <div>
          <div className="text-sm font-bold tracking-tight sm:text-base">AIPropertyReport</div>
          <div className="hidden text-xs text-slate-500 sm:block">Property Intelligence Onboarding</div>
        </div>
      </div>
      <div className="hidden w-[280px] items-center gap-3 sm:flex">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-aip transition-all duration-500" style={{width:`${progress}%`}}/>
        </div>
        <span className="text-xs font-semibold text-slate-500">{progress}%</span>
      </div>
      <button className="rounded-full border border-slate-200 p-2 sm:hidden"><Menu size={18}/></button>
    </header>
  )
}

function StepRenderer(props){
  const screens = [
    <Welcome {...props}/>,
    <UserType {...props}/>,
    <GoalSelection {...props}/>,
    <PropertyCount {...props}/>,
    <AddProperty {...props}/>,
    <CreateAccount {...props}/>,
    <LiamSetup {...props}/>,
    <PersonalizedLanding {...props}/>,
  ]
  return <div className="w-full">{screens[props.step]}</div>
}

function StepTitle({eyebrow,title,subtitle}){
  return (
    <div>
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-aipSoft px-3 py-1 text-xs font-bold text-aip">
        <Sparkles size={14}/>{eyebrow}
      </div>
      <h1 className="max-w-3xl text-[34px] font-semibold leading-[0.98] tracking-[-0.055em] text-slate-950 sm:text-[48px] lg:text-[58px]">{title}</h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">{subtitle}</p>
    </div>
  )
}

function Welcome({goNext}){
  return (
    <div>
      <StepTitle eyebrow="LIAM onboarding" title="Let’s build your property intelligence profile." subtitle="Tell us what you own so LIAM can personalize your dashboard, reports, and recommendations."/>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <button onClick={goNext} className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-sm font-bold text-white transition hover:bg-slate-800">
          Get Started <ArrowRight size={18}/>
        </button>
        <button className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 px-6 text-sm font-bold text-slate-700 hover:bg-slate-50">
          Watch Demo
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {[
          ['Reports','AI property reports in seconds',FileText],
          ['Equity','Unlockable equity and refinance signals',Landmark],
          ['Operations','Tenants, leases, documents and tasks',Users]
        ].map(([h,t,Icon])=>(
          <div key={h} className="rounded-2xl border border-slate-200 bg-white p-4">
            <Icon className="text-aip" size={20}/>
            <div className="mt-3 text-sm font-bold">{h}</div>
            <div className="mt-1 text-xs leading-5 text-slate-500">{t}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UserType({selectedType,setSelectedType,goNext}){
  return (
    <div>
      <StepTitle eyebrow="Profile" title="What are you trying to manage?" subtitle="Choose the closest fit. This helps LIAM unlock the right dashboard experience first."/>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {userTypes.map(({id,title,text,icon:Icon})=>(
          <button key={id} onClick={()=>setSelectedType(id)} className={cn("group rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 hover:shadow-card", selectedType===id ? "border-aip bg-aipSoft" : "border-slate-200 bg-white")}>
            <div className="flex gap-4">
              <div className={cn("grid h-12 w-12 flex-none place-items-center rounded-2xl", selectedType===id ? "bg-aip text-white" : "bg-slate-100 text-slate-700")}>
                <Icon size={22}/>
              </div>
              <div>
                <div className="font-bold text-slate-950">{title}</div>
                <p className="mt-1 text-sm leading-6 text-slate-600">{text}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <FooterButton disabled={!selectedType} onClick={goNext}/>
    </div>
  )
}

function GoalSelection({selectedGoals,setSelectedGoals,goNext}){
  const toggle = (g) => setSelectedGoals(prev => prev.includes(g) ? prev.filter(x=>x!==g) : [...prev,g])
  return (
    <div>
      <StepTitle eyebrow="Personalization" title="What do you want LIAM to help with first?" subtitle="Select all that apply. LIAM will prioritize your dashboard, reports and recommendations based on this."/>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {goals.map(([g,Icon])=>(
          <button key={g} onClick={()=>toggle(g)} className={cn("flex items-center gap-4 rounded-2xl border p-4 text-left transition hover:bg-slate-50", selectedGoals.includes(g) ? "border-aip bg-aipSoft" : "border-slate-200 bg-white")}>
            <div className={cn("grid h-11 w-11 place-items-center rounded-2xl", selectedGoals.includes(g) ? "bg-aip text-white" : "bg-slate-100 text-slate-700")}><Icon size={20}/></div>
            <span className="flex-1 text-sm font-bold sm:text-base">{g}</span>
            <span className={cn("grid h-6 w-6 place-items-center rounded-full border", selectedGoals.includes(g) ? "border-aip bg-aip text-white" : "border-slate-300")}><Check size={14}/></span>
          </button>
        ))}
      </div>
      <FooterButton disabled={!selectedGoals.length} onClick={goNext}/>
    </div>
  )
}

function PropertyCount({propertyCount,setPropertyCount,goNext}){
  return (
    <div>
      <StepTitle eyebrow="Portfolio size" title="How many properties do you own or manage?" subtitle="This helps us set up the right dashboard, reports and subscription recommendation."/>
      <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {countOptions.map(opt=>(
          <button key={opt} onClick={()=>setPropertyCount(opt)} className={cn("rounded-3xl border p-7 text-center transition hover:-translate-y-0.5 hover:shadow-card", propertyCount===opt ? "border-aip bg-aipSoft" : "border-slate-200 bg-white")}>
            <div className="text-3xl font-semibold tracking-tight">{opt}</div>
            <div className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Properties</div>
          </button>
        ))}
      </div>
      <FooterButton disabled={!propertyCount} onClick={goNext}/>
    </div>
  )
}

function AddProperty({address,setAddress,goNext}){
  return (
    <div>
      <StepTitle eyebrow="First asset" title="Add your first property." subtitle="Enter any residential or commercial address. You can skip and add this later from your dashboard."/>
      <div className="mt-9 rounded-3xl border border-slate-200 bg-white p-4 shadow-card sm:p-6">
        <label className="text-sm font-bold">Property address</label>
        <div className="mt-3 flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4">
          <Search size={19} className="text-slate-500"/>
          <input value={address} onChange={e=>setAddress(e.target.value)} className="w-full bg-transparent text-sm outline-none" placeholder="Enter any residential or commercial address"/>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {['89 Ede, San Jose','Miami Duplex, FL','Austin Warehouse, TX'].map(a=>(
            <button key={a} onClick={()=>setAddress(a)} className="rounded-2xl border border-slate-200 p-4 text-left text-sm font-semibold hover:bg-slate-50">
              <MapPin size={16} className="mb-2 text-aip"/>{a}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button onClick={goNext} className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-sm font-bold text-white">Continue <ArrowRight size={18}/></button>
        <button onClick={goNext} className="inline-flex h-14 items-center justify-center rounded-2xl border border-slate-200 px-6 text-sm font-bold text-slate-700">I’ll do this later</button>
      </div>
    </div>
  )
}

function CreateAccount({goNext}){
  return (
    <div>
      <StepTitle eyebrow="Account" title="Create your account." subtitle="Save your profile so LIAM can continue building your property command center."/>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input icon={UserRound} label="Name" placeholder="Your name"/>
        <Input icon={Mail} label="Email" placeholder="you@email.com"/>
        <Input icon={LockKeyhole} label="Password" placeholder="Create password" type="password"/>
        <Input icon={Phone} label="Phone optional" placeholder="+1 phone number"/>
      </div>
      <div className="mt-7 flex flex-col gap-3 sm:flex-row">
        <button onClick={goNext} className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-sm font-bold text-white">Create Account <ArrowRight size={18}/></button>
        <button className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl border border-slate-200 px-6 text-sm font-bold text-slate-700"><Chrome size={18}/> Continue with Google</button>
      </div>
    </div>
  )
}

function Input({icon:Icon,label,placeholder,type='text'}){
  return <label className="block">
    <span className="text-sm font-bold">{label}</span>
    <div className="mt-2 flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
      <Icon size={18} className="text-slate-500"/>
      <input type={type} className="w-full bg-transparent text-sm outline-none" placeholder={placeholder}/>
    </div>
  </label>
}

function LiamSetup({goNext}){
  const items = ['Creating your profile','Setting dashboard type','Preparing report engine','Activating document vault','Personalizing recommendations']
  return (
    <div className="text-center">
      <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-aipSoft text-aip"><Loader2 className="animate-spin" size={38}/></div>
      <h1 className="mx-auto mt-7 max-w-2xl text-[34px] font-semibold leading-none tracking-[-0.05em] sm:text-[48px]">LIAM is building your property command center.</h1>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600">This only takes a moment. LIAM is turning your answers into a personalized product experience.</p>
      <div className="mx-auto mt-8 max-w-md space-y-3 text-left">
        {items.map((item,i)=>(
          <div key={item} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className={cn("grid h-8 w-8 place-items-center rounded-full", i<3 ? "bg-aip text-white" : "bg-slate-100 text-slate-500")}>{i<3 ? <Check size={16}/> : <Loader2 className="animate-spin" size={15}/>}</div>
            <span className="text-sm font-bold">{item}</span>
          </div>
        ))}
      </div>
      <button onClick={goNext} className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-sm font-bold text-white">Continue <ArrowRight size={18}/></button>
    </div>
  )
}

function PersonalizedLanding({selectedType}){
  const nextSteps = useMemo(()=>{
    if(selectedType==='homeowner') return [['Generate property report',FileText],['Check equity',Landmark],['Review insurance',ShieldCheck],['Ask LIAM',Sparkles]]
    if(selectedType==='small') return [['Add tenant',Users],['Upload lease',FileText],['Track rent',WalletCards],['Ask LIAM',Sparkles]]
    if(selectedType==='operator' || selectedType==='enterprise') return [['Invite manager',UserRound],['Add properties',Building2],['Upload documents',Upload],['Review portfolio health',BarChart3]]
    if(selectedType==='advisor') return [['View leads',Users],['Open reports',FileText],['Client pipeline',BriefcaseBusiness],['Advisor settings',KeyRound]]
    return [['Add property',Building2],['Generate report',FileText],['Build portfolio',BarChart3],['Ask LIAM',Sparkles]]
  },[selectedType])
  return (
    <div>
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-aip text-white sm:mx-0"><CheckCircle2 size={34}/></div>
      <h1 className="mt-7 max-w-3xl text-[34px] font-semibold leading-none tracking-[-0.055em] sm:text-[54px]">Your property command center is ready.</h1>
      <p className="mt-5 max-w-2xl text-[15px] leading-7 text-slate-600">LIAM personalized your experience based on what you’re trying to manage. Start with the actions below.</p>
      <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {nextSteps.map(([t,Icon])=>(
          <button key={t} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-card transition hover:-translate-y-0.5">
            <span className="flex items-center gap-4"><span className="grid h-12 w-12 place-items-center rounded-2xl bg-aipSoft text-aip"><Icon size={21}/></span><span className="font-bold">{t}</span></span>
            <ArrowRight size={18}/>
          </button>
        ))}
      </div>
      <button className="mt-8 inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-ink px-6 text-sm font-bold text-white">Enter Dashboard <ArrowRight size={18}/></button>
    </div>
  )
}

function FooterButton({disabled,onClick}){
  return <div className="mt-8 flex justify-end">
    <button disabled={disabled} onClick={onClick} className={cn("inline-flex h-14 items-center justify-center gap-2 rounded-2xl px-6 text-sm font-bold transition", disabled ? "cursor-not-allowed bg-slate-100 text-slate-400" : "bg-ink text-white hover:bg-slate-800")}>Continue <ArrowRight size={18}/></button>
  </div>
}

function InsightPanel({step,selectedType,selectedGoals,propertyCount}){
  const card = [
    ['Profile setup','LIAM uses this flow to decide which dashboard, reports and alerts to unlock first.'],
    ['User type','We avoid asking “role.” Instead we ask what you’re trying to manage.'],
    ['Goals','Your selected goals become LIAM’s first recommendation engine.'],
    ['Portfolio size','Property count maps cleanly to pricing and product depth.'],
    ['Property input','Address enables the first report, valuation, equity and insurance scan.'],
    ['Account','The account saves profile, lead intent, address, and product route.'],
    ['LIAM setup','This turns onboarding answers into an active command center.'],
    ['Ready','The user lands in a personalized product, not a blank dashboard.'],
  ][step]
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-bold"><Sparkles className="text-emerald-400" size={18}/> LIAM Setup</div>
        <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-300">Live</span>
      </div>
      <div className="rounded-[24px] border border-white/10 bg-white/[0.06] p-5">
        <div className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-300">{card[0]}</div>
        <p className="mt-4 text-[28px] font-semibold leading-tight tracking-[-0.05em]">{card[1]}</p>
      </div>
      <div className="mt-5 rounded-[24px] bg-white p-5 text-slate-950">
        <div className="font-bold">Profile Signals</div>
        <div className="mt-5 space-y-4 text-sm">
          <Signal label="Type" value={selectedType || 'Not selected'}/>
          <Signal label="Goals" value={selectedGoals.length ? `${selectedGoals.length} selected` : 'Not selected'}/>
          <Signal label="Properties" value={propertyCount || 'Not selected'}/>
          <Signal label="Product route" value={routeLabel(selectedType)}/>
        </div>
      </div>
      <div className="mt-auto hidden rounded-[24px] border border-white/10 bg-white/[0.05] p-5 lg:block">
        <div className="text-sm font-bold">Clean UX rules</div>
        <ul className="mt-4 space-y-3 text-sm text-slate-300">
          <li>• Mobile-first quiz layout</li>
          <li>• Large tappable cards</li>
          <li>• No boring account form first</li>
          <li>• LIAM explains value throughout</li>
        </ul>
      </div>
    </div>
  )
}

function Signal({label,value}){
  return <div className="flex items-center justify-between border-b border-slate-100 pb-3 last:border-0">
    <span className="text-slate-500">{label}</span>
    <span className="max-w-[180px] truncate text-right font-bold">{value}</span>
  </div>
}

function routeLabel(t){
  if(t==='homeowner') return 'Homeowner dashboard'
  if(t==='small') return 'Landlord dashboard'
  if(t==='investor') return 'Investor dashboard'
  if(t==='operator') return 'Operator dashboard'
  if(t==='enterprise') return 'Enterprise dashboard'
  if(t==='advisor') return 'Advisor pipeline'
  return 'Pending'
}


