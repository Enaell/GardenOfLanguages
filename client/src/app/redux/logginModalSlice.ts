import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


const initialState: { open: boolean; tab: 'visitor' | 'register' | 'auth' } = {
  open: false,
  tab: 'visitor'
};

export const landingSlice = createSlice({
  name: 'logginModal',
  initialState,
  reducers: {
    changeTab: (state, action: PayloadAction<'visitor' | 'register' | 'auth'>) => {
      state.tab = action.payload;
    },
    toggleModal: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    }
  }
});

export const { changeTab, toggleModal } = landingSlice.actions;

export const logginModalState = (state: RootState) => state.logginModal;

export default landingSlice.reducer;