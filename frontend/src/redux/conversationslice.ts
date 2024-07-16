import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { ConversationType } from "../Schema/conversationType";

export interface ConversationState {
  conversation: ConversationType | null;
}

const initialState: ConversationState = {
  conversation: null,
};

export const conversationSlice = createSlice({
  name: "conversation",
  initialState,
  reducers: {
    selectConversation: (state, action: PayloadAction<ConversationType>) => {
      state.conversation = action.payload;
    },
removeConversation:(state)=>{
  state.conversation=null
}

  },
});

export const { selectConversation, removeConversation } = conversationSlice.actions;

export const getConversation = (state: RootState) => state.conversation.conversation;

export default conversationSlice.reducer;
