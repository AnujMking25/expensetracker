import { createSlice } from "@reduxjs/toolkit";

const loginState =!! localStorage.getItem('token');
const initialAuthState={
    isAuthLoggedIn:loginState
}

const AuthSlice=createSlice({
name:'authentication',
initialState:initialAuthState,
reducers:{
    login(state,action){
        console.log("login action",action.payload);
        state.isAuthLoggedIn=action.payload;
       
    },
    logout(state){
       
        localStorage.removeItem('token')
         state.isAuthLoggedIn=false
  
    }
}
    
})
export const authAction=AuthSlice.actions;
export default AuthSlice.reducer