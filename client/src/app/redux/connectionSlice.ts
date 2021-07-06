import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export type modalTabs = 'visitor' | 'register' | 'auth';

const initialState: { open: boolean; tab: modalTabs } = {
  open: false,
  tab: 'visitor'
};

export const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<modalTabs>) => {
      state.tab = action.payload;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    }
  }
});

export const { changeTab, toggleModal } = connectionSlice.actions;

export const connectionState = (state: RootState) => state.connection;

export default connectionSlice.reducer;