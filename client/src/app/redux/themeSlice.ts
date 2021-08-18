import { Palette } from "@material-ui/core/styles/createPalette";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import theme from "../theme";
import { RootState } from "./store";

const initialState = theme;

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setPalette: (state, action: PayloadAction<Palette>) => {
      state.palette = action.payload;
    }
  }
});

export const { setPalette } = themeSlice.actions;

export const themeState = (state: RootState) => state.connection;

export default themeSlice.reducer;