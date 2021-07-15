import { Color } from "@material-ui/lab/Alert";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";


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
    },
    closeSnackbar: (state) => {
      state.open = false;
    }
  }
});

export const { closeSnackbar, openSnackbar } = connectionSlice.actions;


export const isSnackbarOpen = (state: RootState) => state.snackbar.open;

export const opensnackbar = (severity: Color, message: string): AppThunk => (
  dispatch, getState
) => {
  dispatch(openSnackbar({ severity, message }))
  setTimeout(() => {
    if(isSnackbarOpen(getState()))
      dispatch(closeSnackbar())}, 5000);
}

export const snackbarState = (state: RootState) => state.snackbar;

export default connectionSlice.reducer;