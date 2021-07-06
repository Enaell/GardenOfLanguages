import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../../features/counter/counterSlice';
import userReducer from '../redux/userSlice';
import landingReducer from '../redux/landingSlice'
import connectionReducer from './connectionSlice';
import snackbarReducer from './snackbarSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    landing: landingReducer,
    connection: connectionReducer,
    snackbar: snackbarReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
