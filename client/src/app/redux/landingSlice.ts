import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


const initialState: {discover: number; section?: string} = {
  discover: 0,
};

export const landingSlice = createSlice({
  name: 'landing',
  initialState,
  reducers: {
    discover: (state) => {
      state.discover += 1;
    },
    scrollToSection: (state, action: PayloadAction<string>) => {
      state.discover += 1;
      state.section = action.payload;
    }
  }
});

export const { discover, scrollToSection } = landingSlice.actions;

export const landingState = (state: RootState) => state.landing;

export default landingSlice.reducer;