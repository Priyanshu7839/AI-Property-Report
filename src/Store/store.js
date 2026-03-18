import {configureStore} from '@reduxjs/toolkit'
import UserDetailsSliceReducer from './UserDetailsSlice'

export const Store = configureStore({
    reducer:{
            UserDetails:UserDetailsSliceReducer
    }
})