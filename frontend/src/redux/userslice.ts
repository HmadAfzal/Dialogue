import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

export interface UserState {
  user: {
    id?:String,
    username?:String,
    fullname?:String,
    password?:String
  } | null; 
}

const initialState: UserState = {
  user: {} ||null,
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
