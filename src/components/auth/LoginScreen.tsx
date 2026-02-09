import React, { useState } from 'react';
import { AuthCard } from './AuthCard';
import { InputField } from './InputField';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { ChevronDown, Shield } from 'lucide-react';
import { toast } from 'sonner';
import { Label } from '../ui/label';
import { useNavigate } from 'react-router';

interface LoginScreenProps {
  onForgotPassword: () => void;
  onRequestInvite: () => void;
}

export function LoginScreen({  onForgotPassword, onRequestInvite }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const RolesRoutes = [
    {
      name:'Super Admin',
      to:'/SuperAdmin'
    },
    {
      name:'Finance',
      to:'/FinanceAdmin/dashboard'
    },
    {
      name:'Tax Advisor',
      to:'/TaxAdmin/dashboard'
    },
    {
      name:'Insurance Partner',
      to:'/InsuranceAdmin'
    },
    {
      name:'Lead Manager',
      to:'/LeadAdmin'
    },
    {
      name:'Mortgage',
      to:'/MortgageAdmin/dashboard'
    },
    {
      name:'RealEstate Admin',
      to:'/RealEstateAdmin/dashboard'
    },
  ]

  const [Role,setRole] = useState(RolesRoutes?.[0]?.name)
  const [RoleRoutes,setRoleRoutes] = useState(RolesRoutes?.[0]?.to)
  const [ShowRolesBox,setShowRolesBox] = useState(false);
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
   
    if(email === ''  && password === '') {
    toast.error('Please Enter an Email And Password')
      return;

    }
    if(email !== '' && password === '') {
      toast.error('Please Enter Your Password')
      return;

    }
    if(email ==='' && password !==''){
      toast.error('Please Enter an Email')
      return;
    }
    if(email !== 'clark@aipropertyreport.com' && password !== 'Clark@1234'){
      toast.error('Please Check Your Email and Password')
      return;
    }

    if(email === 'clark@aipropertyreport.com' && password !== 'Clark@1234'){
      toast.error('Please Check Your Password')
      return;
    }
    if(email !=='clark@aipropertyreport.com' && password === 'Clark@1234'){
      toast.error('Please Check Your Email')
      return;
    }
    if(email === 'clark@aipropertyreport.com' && password === 'Clark@1234'){
      toast.success(`Logged In as ${Role}`)
    navigate(RoleRoutes)
    }



    
   
  
   
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left side - Login form */}
        <div className="flex items-center justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <h1 className="text-[28px] font-semibold text-gray-900 tracking-tight mb-2">
                Sign In to AIPropertyReport
              </h1>
              <p className="text-[15px] text-gray-600">
                Access Your Workspace Securely.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <InputField
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                placeholder="you@company.com"
                required
              />

              <InputField
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                placeholder="Enter your password"
                required
              />

              <div className='space-y-1.5'>
                 <Label className="text-[13px] font-semibold text-gray-700">
                         Role
                         <span className="text-red-500 ml-0.5">*</span>
                </Label>

                <div
                onClick={()=>{setShowRolesBox(!ShowRolesBox)}}
                className = {`w-full border border-[#cfcfd7] py-2 px-3 rounded-md bg-[#f3f3f5] transition-[color,box-shadow] text-base cursor-pointer text-[#0285FF]  md:text-sm flex items-center justify-between relative ${ShowRolesBox&&'border-b-0 rounded-b-none '}`}>

                  {Role}
                 
                  <ChevronDown size={14}/>

                  <div 
                  style={{scrollbarWidth:'none'}}
                  className={`absolute left-[-1px] top-full w-[calc(100%+2px)]  border-t-0 rounded-md bg-[#f3f3f5] border-[#cfcfd7]  text-base md:text-sm  transition-[height] ${ShowRolesBox ?'h-[110px] px-3 py-2 border rounded-t-none overflow-y-scroll':'h-0 p-0 overflow-hidden'}`}>

                    {
                      RolesRoutes?.map((item,i)=>{
                          return(


                            <h1
                            onClick={()=>{setRole(item.name)
                              setRoleRoutes(item.to)
                            }}
                            key={i} className={`py-2 border-b border-[#cfcfd7] text-[12px] hover:text-[#0285FF]`}>{item.name}</h1>
                          )
                      })
                    }

                  </div>


                </div>
        

              </div>



              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-[13px] text-gray-400 hover:text-[#0285FF] font-semibold transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-11 bg-gray-400 hover:bg-[#0285FF] text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Signing in...' : 'Continue'}
              </Button>


              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={onRequestInvite}
                  className="text-[13px] text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Need access? <span className="font-semibold text-gray-400 hover:text-[#0285FF]">Request invite</span>
                </button>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                  <Shield className="w-3.5 h-3.5 text-gray-400" />
                  <span>Secure access • Encrypted sessions • Audit logging</span>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right side - Brand trust panel */}
        <div className="hidden lg:flex items-center justify-start border-l border-gray-100 pl-16">
          <div className="space-y-10 max-w-md">
            <div className="text-black tracking-tight font-medium relative inline-flex items-baseline text-[2em]">
            <span
            >AIPropertyReport</span>
            <span
              className="text-[#0285FF]"
              style={{
                fontFamily: "Comic Sans MS, cursive",
                transform: "rotate(-4deg)",
                fontSize: "1.125em",
                opacity: 0.92,
                fontWeight: 600,
                letterSpacing: "0.5px",
                marginLeft: "1px",
                textShadow: "0.5px 0.5px 0 #0285FF, -0.3px 0.3px 0 #0285FF",
              }}
            >
              .com
            </span>
            {/* Hand-drawn underline */}
            <svg
              className="absolute pointer-events-none"
              style={{
                left: "-2px",
                bottom: "-4px",
                width: "calc(100% + 4px)",
                height: "8px",
              }}
              viewBox="0 0 300 8"
              preserveAspectRatio="none"
            >
              <path
                d="M 2 4 Q 75 5, 150 4 T 298 4"
                fill="none"
                stroke="#0285FF"
                strokeWidth="2.5"
                opacity="0.88"
                strokeLinecap="round"
              />
            </svg>
          </div>
            <div>
              <h2 className="text-[32px] font-semibold text-gray-900 tracking-tight mb-3 leading-tight capitalize">
                Institutional partner access
              </h2>
              <p className="text-[15px] text-gray-600 leading-relaxed capitalize">
               Private workspace for licensed advisors and assigned mandates
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-[#0285FF]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-[15px] capitalize">Secure access</h3>
                  <p className="text-sm text-gray-600 leading-relaxed capitalize">Authenticated sessions with role-based permissions</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#0285FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-[15px] capitalize">Assignment visibility</h3>
                  <p className="text-sm text-gray-600 leading-relaxed capitalize">View allocated leads, client status, and routing history</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#0285FF]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1.5 text-[15px] capitalize">Performance overview</h3>
                  <p className="text-sm text-gray-600 leading-relaxed capitalize">Monitor activity, conversions, and engagement metrics</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}