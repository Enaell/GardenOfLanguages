import { LanguageType } from "./language"

export type DeckType= {
  id?: string,
  owner?: string,
  name: string,
  words : {[key: string]: WordType},
  language: LanguageType,
  targetLanguage: LanguageType,
  subject: string[],
  level: number,
  rank: number,
  comments?: string,
  validated?: boolean, //(this field is to differenciate cards validated by admin from others)
  visibility?: VisibilityType, //(rank of visibility wanted by the card owner) ---------- two last fields shown in case of owner wants to know on their lists
}

export type WordType= {
  id?: string,
  owner?: string,
  name: string,
  internationalName: string,
  language: LanguageType,
  subject: string[],
  level: number,
  translations: TranslationType[],
  comments?: string,
  validated?: boolean, //(this field is to differenciate cards validated by admin from others)
  visibility?: VisibilityType, //(rank of visibility wanted by the card owner)  ---------- two last fields shown in case of owner wants to know on their lists
}

export type TranslationType = {
  name: string,
  internationalName: string,
  language: LanguageType,
  sentences: SentencesType[],
  rank: number,
  comments?: string,
}

export type VisibilityType = 'visitor' | 'loggedin' | 'owner' ;

export type SentencesType = {
  sentence: string,
  translatedSentence: string
}