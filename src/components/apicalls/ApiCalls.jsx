import axios from "axios";
import OpenAI from "openai";
import { getFirestore,addDoc,collection, getDocs, serverTimestamp } from "firebase/firestore";
import { db } from "../../Utils/firebase";

const openai = new OpenAI({
  apiKey:
    "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",
  dangerouslyAllowBrowser: true,
});

function computeCagr(data){
    const firstYearClose = data?.[0]?.close
    const secondYearClose =data?.[12]?.close
    const thirdYearClose = data?.[36]?.close
    const fourthYearClose = data?.[60]?.close

    console.log(firstYearClose,secondYearClose,thirdYearClose,fourthYearClose)

    const cagr1 = ((firstYearClose - secondYearClose) / firstYearClose) * 100;
    console.log(cagr1)

    const cagr3 = ((firstYearClose - thirdYearClose) / firstYearClose) * 100;
    console.log(cagr3)
    const cagr5 = ((firstYearClose - fourthYearClose) / firstYearClose) * 100;
    console.log(cagr5)


    return {
        cagr1,cagr3,cagr5
    }


}


export const gettimeSeriesData = async(zpid) => {
    try {
         const [SandP, Bonds, Bitcoin, House] = await Promise.all([
      axios.get(
        "https://api.twelvedata.com/time_series?apikey=9d3b914c31d5414b94858399343c5cfa&interval=1month&country=US&format=JSON&start_date=2020-01-01 02:57:00&end_date=2025-12-02 02:57:00&symbol=SPY"
      ),
      axios.get(
        "https://api.twelvedata.com/time_series?apikey=9d3b914c31d5414b94858399343c5cfa&interval=1month&country=US&format=JSON&start_date=2020-01-01 02:57:00&end_date=2025-12-02 02:57:00&symbol=BND"
      ),
      axios.get(
        "https://api.twelvedata.com/time_series?apikey=9d3b914c31d5414b94858399343c5cfa&interval=1month&country=US&format=JSON&start_date=2020-01-01 02:57:00&end_date=2025-12-02 02:57:00&symbol=BTC/USD"
      ),
      axios.get(
        `https://zhomes-realty-us.p.rapidapi.com/properties/zestimate-history?zpid=${zpid}`,
        {
          headers: {
            "X-RapidAPI-Key":
              "69953a3276msh1fffb8e07d13516p11031ejsnfd55185a907e",
            "X-RapidAPI-Host": "zhomes-realty-us.p.rapidapi.com",
          },
        }
      ),
    ]);

    console.log(House)
    console.log(SandP)

  


const response1 = computeCagr(SandP?.data?.values);
const response2 = computeCagr(Bonds?.data?.values);
const response3 = computeCagr(Bitcoin?.data?.values);

console.log(response1.cagr1,response1.cagr3,response1.cagr5);
console.log(response2.cagr1,response2.cagr3,response2.cagr5);
console.log(response3.cagr1,response3.cagr3,response3.cagr5);




    const firstYearClose = House?.data?.data?.homeValueChartData?.[0]?.points?.reverse()?.[0]?.value
    const secondYearClose =House?.data?.data?.homeValueChartData?.[0]?.points?.[12]?.value
    const thirdYearClose = House?.data?.data?.homeValueChartData?.[0]?.points?.[36]?.value
    const fourthYearClose = House?.data?.data?.homeValueChartData?.[0]?.points?.[60]?.value
    const fifthYearClose = House?.data?.data?.homeValueChartData?.[0]?.points?.[72]?.value

    console.log(firstYearClose,secondYearClose,thirdYearClose,fourthYearClose)

    

    const cagr1 = ((firstYearClose - secondYearClose) / firstYearClose) * 100;
    console.log(cagr1)

    const cagr3 = ((firstYearClose - thirdYearClose) / firstYearClose) * 100;
    console.log(cagr3)
    const cagr5 = ((Math.pow((firstYearClose / fifthYearClose),0.2)) - 1 )*100   ;
    console.log(cagr5)

    


    return {
        SandP: [response1.cagr5],
        Bonds: [response2.cagr5],
        Bitcoin: [response3.cagr5],
        HousePoints: [cagr1,cagr3,cagr5],
        HousePrices:House?.data?.data?.homeValueChartData?.[0]?.points

    }
    } catch (error) {
        console.log(error)
        return error;
    }
}

export const openaiapicall = async (similarHomes,HousePrices,HouseDescription,zes) => {

console.log(similarHomes,HousePrices)
 

    

  if(zes !== null) {
      const prompt = `You are a real-estate evaluation engine.  
Your ONLY job is to take the user’s numeric arrays and RETURN VALID JSON.  
Never output explanations, notes, warnings, or text outside JSON.  
NEVER fabricate or assume values not supported by the provided arrays.  
If any value cannot be computed due to missing or insufficient data, return null for that field.

=========================================
            RAW DATA (USER INPUT)
=========================================
SIMILAR_HOMES = ${JSON.stringify(similarHomes)}
PRICE_HISTORY = ${JSON.stringify(HousePrices)}
house_description = ${JSON.stringify(HouseDescription)}

=========================================
            WHAT TO COMPUTE
=========================================

1. buyScore (0–100)  
   - Based entirely on whether the current asking price is below, equal to, or above the average price of similar homes, and the trend in price_history.
   -tell a reason for your score

2. sellScore (0–100)  
   - Based on increasing price trend, how much higher the current price is compared to similar homes, and current market momentum.
   -tell a reason for your score


3. holdScore (0–100)  
   - Based on long-term trend stability in price_history and low deviation compared to SIMILAR_HOMES.
   -tell a reason for your score


4. negotiationPoints:  
   {
     "forBuyer": [array of specific leverage points based ONLY on input data],
     "forSeller": [array of selling highlights based ONLY on input data]
   }
     -should be atleast 5 points each.

5. offerStrategy:  
   {
      "expectedBuyingRange": { "min": number or null, "max": number or null }  
     "maximumOffer": number or null  
   }
   - Based on SIMILAR_HOMES average and latest PRICE_HISTORY value.  
   - NEVER guess any value missing from the arrays.

6. sellingStrategy:  
   {
     "recommendedListPrice": number or null,  
     "expectedSellingRange": { "min": number or null, "max": number or null }
   }
   - Based on SIMILAR_HOMES average and latest PRICE_HISTORY value only.
7. propertyDescription:
   {
     "description": string or null,
     "features": [string or empty array],
     "amenities": [string or empty array]
   }
   - Based on house_description write a description of the property that has a human touch not that Ai feel and contain the description in maximum three lines

=========================================
     FINAL OUTPUT FORMAT (STRICT JSON)
=========================================

{
  "buyScore": number or null,
  "buyScoreReason": string or null,
  "sellScoreReason": string or null,
  "holdScoreReason": string or null,
  "sellScore": number or null,
  "holdScore": number or null,
  "negotiationPoints": {
    "forBuyer": [strings or empty array],
    "forSeller": [strings or empty array]
  },
  "offerStrategy": {
    "expectedBuyingRange": {
      "min": number or null,
      "max": number or null
    }
    "maximumOffer": number or null
  },
  "sellingStrategy": {
    "recommendedListPrice": number or null,
    "expectedSellingRange": {
      "min": number or null,
      "max": number or null
    }
  },
  "propertyDescription": {
    "description": string or null,
    "features": [string or empty array],
    "amenities": [string or empty array]
  }
}

ONLY return JSON. No text outside the JSON.
return only in types mentioned in json strusture do not change the format or anything in the provided output structure.
`

       try {
        
         const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
        });


        const airesponse = JSON.parse(response.choices[0].message.content);
        console.log(airesponse)

        return airesponse;
       } catch (error) {
        
        console.log(error)
       }
      
  }
  else{
     const prompt = `You are a real-estate evaluation engine.  
Your ONLY job is to take the user’s numeric arrays and RETURN VALID JSON.  
Never output explanations, notes, warnings, or text outside JSON.  
NEVER fabricate or assume values not supported by the provided arrays.  
If any value cannot be computed due to missing or insufficient data, return null for that field.

=========================================
            RAW DATA (USER INPUT)
=========================================
SIMILAR_HOMES = ${JSON.stringify(similarHomes)}
house_description = ${JSON.stringify(HouseDescription)}

=========================================
            WHAT TO COMPUTE
=========================================




5. 
7. propertyDescription:
   {
     "description": string or null,
     "features": [string or empty array],
     "amenities": [string or empty array]
   }
   - Based on house_description write a description of the property that has a human touch not that Ai feel and contain the description in maximum three lines

=========================================
     FINAL OUTPUT FORMAT (STRICT JSON)
=========================================

{
 
  "propertyDescription": {
    "description": string or null,
    "features": [string or empty array],
    "amenities": [string or empty array]
  }
}

ONLY return JSON. No text outside the JSON.
return only in types mentioned in json strusture do not change the format or anything in the provided output structure.
`

       try {
        
         const response = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
        });


        const airesponse = JSON.parse(response.choices[0].message.content);
        console.log(airesponse)

        return airesponse;
       } catch (error) {
        
        console.log(error)
       }
  }
  
};



export const GeneratePdf = async(address)=> {
  try {
    const response = await axios.get(`https://autotrends-backend.onrender.com/aiproperty/getpdf?address=${address}}`,{
       responseType: "blob"
    }).then(res => {
  const file = new Blob([res.data], { type: "application/pdf" });
  const fileURL = URL.createObjectURL(file);

  // download
  const link = document.createElement("a");
  link.href = fileURL;
  link.download = "report.pdf";
  link.click();
});

    return response;
  } catch (error) {
    console.log(error)
    return error;
  }
}


export const UploadToFirebase = async(address,bool)=> {

  const response = await axios.get(`https://ipinfo.io/json?token=ca79f9c3688c44`)
  console.log(response.data)
  const userIp = response.data
  try {
    

  const upload = await addDoc(collection(db, "reports"), {
   ipAddress:userIp,
   address:address,
   createdAt: new Date(),
   generated:bool
  });
 
  return upload
  } catch (error) {
    console.log(error)
    return error
  }
}


export const UploadEmailToFirebase = async(email) => {
  try {
    const upload = await addDoc(collection(db,"emails"),{
      email:email,
       createdAt: serverTimestamp(),
    })

    return upload.id
  } catch (error) {
    console.log(error)
    return error
  }
}


export const GetReports = async()=>{
  try {
    const reports = await getDocs(collection(db,"reports"))
      const reportArray = []


    reports.forEach((doc)=>{
reportArray.push({
    id: doc.id,
    ...doc.data(),
    created_at: new Date(doc.data().createdAt.seconds * 1000).toLocaleDateString('en-In',{month:'long',day:'numeric',year:'numeric'})
  });
    })
    
    return reportArray
  } catch (error) {
    console.log(error)
    return error
  }
}


