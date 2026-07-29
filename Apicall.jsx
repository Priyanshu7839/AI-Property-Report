import axios from "axios";


const api =axios.create({
    // baseURL:'http://localhost:8002'
    baseURL:'https://aipropertybackend.onrender.com'
})

export const createProperty = async (user_id, propertyType, propertyData) => {

  console.log(user_id)
    try {
        const response = await api.post(
            `/properties/add/${user_id}/${encodeURIComponent(propertyType)}`,
            propertyData
        );

       

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong.",
            }
        );
    }
};
export const chatStart = async ({ conversations, intent }) => {
  console.log(conversations)
  const response = await api.post("/chat/start", {
    conversations,
    intent,
  });

  return response;
};


export const completeProfileApi = async (payload) => {
  try {
    const response = await api.post(
      `/auth/complete-profile`,
      payload
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong.",
      }
    );
  }
};

export const getCurrentUser = async (auth_user_id) => {
  try {
    const response = await api.get(
      `auth/current-user/${auth_user_id}`
    );

    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        success: false,
        message: "Something went wrong.",
      }
    );
  }
};

export const getProperty = async (user_id, propertyType) => {
    try {
        const response = await api.get(
            `/properties/fetch/${user_id}/${encodeURIComponent(propertyType)}`
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong.",
            }
        );
    }
};


export const updateListingTypes = async (
    propertyType,
    property_id,
    listingTypes
) => {

 
    try {
        const response = await api.post(
            `/properties/update/${encodeURIComponent(propertyType)}/${property_id}/listing-types`,
            {
                listingTypes,
            }
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong.",
            }
        );
    }
};


export const getDailyBriefing = async () => {
 try {
        const response = await api.get(
            `/properties/getBriefing`
        );

        return response.data;
    } catch (error) {
        throw (
            error.response?.data || {
                success: false,
                message: "Something went wrong.",
            }
        );
    }
}




export const saveUserChat = async (body) => {
  return api.post("/properties/saveUserChat", body, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
}


export const getAIRoadmapTitle = async (user_uuid) => {
  return api.post("/properties/get-ai-roadmap-title", {
    user_uuid,
  });
};