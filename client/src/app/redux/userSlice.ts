import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import counterpart from 'counterpart';
import { stat } from "fs";
import { LanguageType } from "../types/language";
import { UserType, UserboardType } from "../types/user";
import { RootState } from "./store";

const defaultUserboard: UserboardType = {
  news: { 
    lg: { x: 8, y: 0, w: 4, h: 4 },
    md: { x: 0, y: 0, w: 4, h: 4 },
    sm: { x: 0, y: 0, w: 4, h: 4 },
    xs: { x: 0, y: 0, w: 4, h: 4 }
  },
  fastExercice: {
    lg: { x: 0, y: 2, w: 8, h: 2 },
    md: { x: 5, y: 0, w: 6, h: 2 },
    sm: { x: 3, y: 0, w: 3, h: 4 },
    xs: { x: 3, y: 0, w: 3, h: 4 }
  },
  culture: {
    lg: { x: 0, y: 0, w: 5, h: 2 },
    md: { x: 0, y: 2, w: 3, h: 2 },
    sm: { x: 0, y: 2, w: 3, h: 2 },
    xs: { x: 0, y: 2, w: 3, h: 2 }
  },
  wordOfTheDay: {
    lg: { x: 5, y: 0, w: 3, h: 2 },
    md: { x: 0, y: 2, w: 3, h: 2 },
    sm: { x: 0, y: 2, w: 3, h: 2 },
    xs: { x: 0, y: 1, w: 3, h: 2 }
  }
};

const initialState: UserType = {
  userboard: defaultUserboard,
  username: 'Visitor',
  language: 'Fr',
  targetLanguage: 'Cn'
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) => { state = initialState; },
    login: (state, action: PayloadAction<UserType>) => {
      console.log('REDUX - LOGIN ACTION')
      console.log(action.payload)
      //  state = { ...state, ...action.payload };
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.language = action.payload.language;
      state.targetLanguage = action.payload.targetLanguage;
      state.levels = action.payload.levels;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.token = action.payload.token;
      state.userboard = action.payload.userboard;
    },
    connectAsVisitor: (state, action: PayloadAction<{language: LanguageType, targetLanguage: LanguageType}>) => {
      counterpart.setLocale(action.payload.language)
      state.role = 'Visitor';
      state.language = action.payload.language;
      state.targetLanguage = action.payload.targetLanguage;
    },
    updateUserboard: (state, action: PayloadAction<UserboardType>) => {
      state.userboard = action.payload;
    },
    setLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.language = action.payload;
    },
    setTargetLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.targetLanguage = action.payload;
    },
  }
});

export const { logout, login, connectAsVisitor, updateUserboard, setLanguage, setTargetLanguage } = userSlice.actions;

export const userState = (state: RootState) => state.user;

export default userSlice.reducer;