import { createSlice } from "@reduxjs/toolkit";

const savedUser = localStorage.getItem("userDetails");
const initialState = savedUser
  ? JSON.parse(savedUser)
  : {
      name: '',
     email:'',
      loggedIn: false,
      uid:''
    };

    const UserDetailsSlice = createSlice({
    name:'UserDetails',
    initialState,
    reducers:{
        setUserDetails: (state, action) => {
            const { name, uid, loggedIn,email } = action.payload;
            state.name = name;
            state.loggedIn = loggedIn;
            state.uid = uid
            state.email = email

            localStorage.setItem(
                "userDetails",
                JSON.stringify({
                  name,
                  loggedIn,
                  uid,
                  email
                })
              );
        }

        
    }
})

export const {setUserDetails} = UserDetailsSlice.actions
export default UserDetailsSlice.reducer;