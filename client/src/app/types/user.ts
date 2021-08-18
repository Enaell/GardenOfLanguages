import { LanguageType } from "./language";


export enum ModuleNames {
  NEWS = 'news',
  EXERCICE = 'fastExercice',
  WORD =  'wordOfTheDay',
  MANGA = 'manga',
  CULTURE = 'culture',
}

export type ModuleNamesType = keyof typeof ModuleNames

enum BreakPoints {
  LG = 'lg',
  MD = 'md',
  SM = 'sm',
  XS = 'xs'
}

type UserModulePos = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export type userModule = {
  [key in BreakPoints]: UserModulePos;
}

export type UserboardType = {
//    [key in ModuleNames]?: userModule;
  [key: string]: userModule;

};

export type RoleType = 'Admin' | 'Customer' | 'Moderator' | 'Visitor';


export interface UserType {
  _id?: string,
  token?: string,
  userboard?: UserboardType,
  email?: string,
  username: string,
  name?:string
  role?: RoleType,
  language: LanguageType,
  targetLanguage: LanguageType,
  password?: string,
  levels?: {language: LanguageType, rank: number}[],
  createAt? : Date,
}