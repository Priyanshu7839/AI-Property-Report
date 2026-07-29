import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useState } from "react";
import { supabase } from "../Utils/Supabase";
import { useNavigate } from "react-router";



function AnimatedHomeIcon({
  width = 50,
  height = 35,
  color = "#1CAE3E",
  onComplete,
}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete?.();
    }, 1400); // Same as the pathLength animation duration

    return () => clearTimeout(timer);
  }, [onComplete]);

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





export default function SplashScreen({
  onFinish,
}) {
  const [showLogo, setShowLogo] = useState(false);
  const navigate = useNavigate()

const [animationFinished, setAnimationFinished] = useState(false);
const [loginChecked, setLoginChecked] = useState(false);
const [loggedIn, setLoggedIn] = useState(false);
const [homeAnimationFinished,setHomeAnimationFinished] = useState(false)
  const handleAnimationComplete = () => {
  setAnimationFinished(true);
};


   const fetchUser = async (uuid) => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) return;

        const response = await getCurrentUser(uuid);

        if (response.success) {
          localStorage.setItem("user", JSON.stringify(user));
          console.log(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    

 useEffect(() => {
  const getLoggedInUser = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        setLoginChecked(true);
        return;
      }

      
      await fetchUser(session.user.id);
      setLoggedIn(true);

      setLoginChecked(true);
    } catch (error) {
      console.error(error);
      setLoginChecked(true);
    }
  };

  getLoggedInUser();
}, []);

  useEffect(() => {
  if (!loginChecked || !animationFinished || !homeAnimationFinished) return;

  if (loggedIn) {
    navigate("/AskLIAM/Home");
  } else {
    navigate("/AskLIAM/LoginHome");
  }
}, [loginChecked, animationFinished, loggedIn,homeAnimationFinished]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLogo(true);
    }, 1450);

    const finish = setTimeout(() => {
      onFinish?.();
    }, 3600);

    return () => {
      clearTimeout(timer);
      clearTimeout(finish);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-white flex items-center justify-center">
      <AnimatePresence>
        {!showLogo && (
          <motion.div
          onAnimationComplete={handleAnimationComplete}
            className="absolute rounded-full bg-[#1CAE3E]"
            initial={{
              width: "250vmax",
              height: "250vmax",
            }}
            animate={{
              width: 24,
              height: 24,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              width: {
                duration: 1.25,
                ease: [0.65, 0, 0.35, 1],
              },
              height: {
                duration: 1.25,
                ease: [0.65, 0, 0.35, 1],
              },
              scale: {
                duration: 0.2,
              },
              opacity: {
                duration: 0.15,
              },
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogo && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              duration: 0.25,
            }}
          >
            <AnimatedHomeIcon
  width={130}
  height={120}
  color="#1CAE3E"
  onComplete={() => setHomeAnimationFinished(true)}
/>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}