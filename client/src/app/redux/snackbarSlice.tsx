import { Color } from "@material-ui/lab/Alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";


const initialState: { open: boolean; severity: Color, message?: string } = {
  open: false,
  severity: 'success'
};

export const connectionSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    openSnackbar: (state, action: PayloadAction< { severity: Color, message: string } >) => {
      state.severity = action.payload.severity;
      state.message = action.payload.message;
      state.open = true;
      setTimeout(() => {state.open = false}, 5000);
    },
    closeSnackbar: (state) => {
      state.open = false;
    }
  }
});

export const { openSnackbar, closeSnackbar } = connectionSlice.actions;

export const snackbarState = (state: RootState) => state.snackbar;

export default connectionSlice.reducer;