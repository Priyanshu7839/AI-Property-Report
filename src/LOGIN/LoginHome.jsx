import React from 'react'
import LoginHomeImg from '../assets/LoginHomeImg.png'
import { useNavigate } from 'react-router'
import GoogleLogo from '../assets/GoogleLogo.png'
import AppleLogo from '../assets/AppleLogo.png'
import { ArrowUp, ChartPie, House, Map, TrendingUp } from 'lucide-react'
import { supabase } from '../Utils/Supabase.js'
import LIAMIcon from '../assets/LIAMIcon.png'
import { GoogleSignIn } from '@capawesome/capacitor-google-sign-in'

const LoginHome = () => {
    const navigate = useNavigate()
 const signInWithGoogle = async () => {
  try {
    if (Capacitor.isNativePlatform()) {
      // Android & iOS
      const result = await GoogleSignIn.signIn();

      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: result.idToken,
      });

      if (error) throw error;

      const user = data.user;

      const { data: profile, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      localStorage.setItem("user", JSON.stringify(user));

      if (profile) {
        navigate(`/AskLIAM/Home?uuid=${user.id}`);
      } else {
        navigate(`/AskLIAM/Complete-Profile?uuid=${user.id}`);
      }
    } else {
      // Web
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
      });

      if (error) throw error;
    }
  } catch (err) {
    console.error(err);
  }
};
    

// const signInWithGoogle = async () => {
//   const {data, error } = await supabase.auth.signInWithOAuth({
//     provider: "Google",
//   });




  
//   if (error) {
//     console.error(error);
//   }
// };

const signInWithApple = async () => {
  const {data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
  });



  if (error) {
    console.error(error);
  }
};
  return (
    <div className='max-w-[400px] mx-auto h-[100vh] flex flex-col items-center justify-center gap-10'>
   
       

         <div className='flex flex-col items-center w-full px-6 justify-center gap-[24px]'>
                
                <p className='flex text-[46px]  font-bold leading-8 tracking-[0.15em]  w-[160px] flex items-center justify-center'>
                            <img src={LIAMIcon} alt=""  className='w-[60%]'/>
               
                           </p>
                <p className='text-[#1A1A1A] text-center text-[30px] font-bold '>Your AI Real Estate Assistant <span className='text-[#1fae3e]'> In Your Pocket.</span></p>
                <p className='text-[#666666] text-[15px] text-center'>Analyze properties, find opportunities, build wealth and make smarter decisions.</p>
         </div>

         {/* ===================================================================================================================================== */}

       <div className='w-full flex items-center justify-center relative'>
          <img src={LoginHomeImg} alt="" className='w-[80%]'/>


        {/* <div className="shadow-[#0000001a] shadow-md p-3 flex flex-col items-center gap-[6px] rounded-[12px]  absolute bg-white w-[180px] -bottom-6 right-[50%] translate-x-[50%]"  >

            <House color='#22C55E'/>
            <h1 className='text-[#666666] text-[11px]'>Property Value</h1>
            <p className='text-[#1A1A1A] font-bold text-[14px]'>$750,000</p>
        </div> */}
        <div className="shadow-[#0000001a] shadow-md p-3 flex flex-col items-center gap-[3px] rounded-[12px] w-fit absolute bg-white  -bottom-2 left-5"  >

           <div className='rounded-[10px] p-2 bg-[#22C55E1a]'>
             <Map color='#22C55E' size={16}/>
           </div>
            <h1 className='text-[#666666] text-[9px]'>Portfolio Roadmap</h1>
            <h1 className='text-[#1A1A1A] font-bold text-[13px]'>Three Actions Available</h1>
            {/* <p className='text-[#666666] text-[9px] '>Personalized Growth Plan</p> */}
        </div>

        <div className="shadow-[#0000001a] shadow-md p-3 flex flex-col items-center gap-[3px] rounded-[12px] w-[120px] absolute bg-white  -top-6 right-5"  >

         
             <div className='rounded-[10px] p-2 bg-[#22C55E1a]'>
              <TrendingUp color='#22C55E' size={16}/>
           </div>
            <h1 className='text-[#666666] text-[9px]'>Property Value</h1>
            <p className='text-[#1A1A1A] font-bold text-[13px] '>$750,000</p>
            <h1 className='text-[#666666] text-[9px] text-center'>Estimated Market Value</h1>
        </div>
     
       </div>
         {/* ===================================================================================================================================== */}
      
       <div className='p-6 h-[30%] flex flex-col items-center justify-center gap-4 w-full'>
        
       <button 
         onClick={signInWithApple}
       className="px-5 py-3 bg-[#ffffff] font-semibold text-[16px] text-[#111827] w-full rounded-[12px] border border-[#E5E7EB] shadow-sm flex items-center justify-center gap-2">
        <img src={AppleLogo} alt="" className='w-[50px]' />
        Continue With Apple
      </button>
      {/* ------------------------------------------------------------------------------------------------------------- */}
       <button 
         onClick={signInWithGoogle}
       className="px-5 py-3 bg-[#ffffff] font-semibold text-[16px] text-[#111827] w-full rounded-[12px] border border-[#E5E7EB] shadow-sm flex items-center justify-center gap-2">
        <img src={GoogleLogo} alt="" className='w-[25px]' />
        Continue With Google
      </button>
      {/* ------------------------------------------------------------------------------------------------------------- */}


      <div className="text-[#9CA3AF] text-[12px] flex items-center gap-3 w-full">
        <div className="w-full h-[1px] bg-[#E5E7EB]" ></div>
        OR
        <div className="w-full h-[1px] bg-[#E5E7EB]" />
      </div>

      {/* ------------------------------------------------------------------------------------------------------------- */}



         <button 
         onClick={()=>{
                navigate('/AskLIAM/SignIn')
              }}
       className="px-5 py-3 bg-[green] font-semibold text-[16px] text-[white] w-full rounded-[12px] border border-[#E5E7EB] shadow-sm">
       Continue With Email
          </button>

      {/* ------------------------------------------------------------------------------------------------------------- */}



          <div className="text-[14px] text-[#6B7280]">
        Don't have an account?{" "}
        <span className="font-semibold text-[#22C55E]"
         onClick={()=>{
                navigate('/AskLIAM/Signup')
              }}
        >Sign up</span>
      </div>
      {/* ------------------------------------------------------------------------------------------------------------- */}


      <div className='text-[#666666] text-[13px]'>
        Secure, private and trusted by thousands
      </div>

      {/* ------------------------------------------------------------------------------------------------------------- */}


       </div>

    </div>
  )
}

export default LoginHome