import { createSlice } from "@reduxjs/toolkit";

const loginState =!! localStorage.getItem('token');
const localStorageEmail=localStorage.getItem('email')

const initialAuthState={
    isAuthLoggedIn:loginState,
    emailIs:localStorageEmail
}

const AuthSlice=createSlice({
name:'authentication',
initialState:initialAuthState,
reducers:{
    login(state,action){
        state.isAuthLoggedIn=action.payload.isLoggedIn;
        state.emailIs=action.payload.emailIs
    },
    logout(state){
        localStorage.removeItem('token')
        localStorage.removeItem('email')
         state.isAuthLoggedIn=false 
         state.emailIs=''
    },
    
}
})
export const authAction=AuthSlice.actions;
export default AuthSlice.reducer