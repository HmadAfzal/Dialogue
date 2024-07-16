import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface UserState {
  user: {
    id:string,
    username:string,
    fullName:string,
    profilePic:string
  } | null; 
}


const initialState: UserState = {
  user: {
    id:'',
    username:'',
    fullName:'',
    profilePic:''
  } ||null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeUser: (state, action: PayloadAction<any>) => { 
      state.user = action.payload;
    },

    removeUser:(state)=>{
        state.user=null
    }
  },
});

export const { initializeUser, removeUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
