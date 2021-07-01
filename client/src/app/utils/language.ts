import counterpart from 'counterpart';

import localeFr from '../locale/fr.json';
import localeEn from '../locale/en.json';
import localeCn from '../locale/cn.json';
import { LanguageType } from '../types/language';

export const languages: LanguageType[] = ['Fr', 'En', 'Cn', 'Es', 'Ko', 'Jp', 'Ge']

export const fullNameLanguages: {[key in LanguageType]: string} = {
  Fr: "Francais",
  Cn: "中文",
  En: "English",
  Es: "Español",
  Ge: "Deutsch",
  Ko: "한국어",
  Jp: "日本語",
};

export const inputLanguage: {[key in LanguageType]: boolean} = {
  Fr: true,
  Cn: true,
  En: true,
  Es: false,
  Ge: false,
  Ko: false,
  Jp: false
};

export const fileLanguage: {[key in LanguageType]: any} = {
  Fr: localeFr,
  Cn: localeCn,
  En: localeEn,
  Es: undefined,
  Ge: undefined,
  Ko: undefined,
  Jp: undefined,
}
