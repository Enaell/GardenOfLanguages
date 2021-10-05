import { TranslationType, WordType } from "../types/word";

export function cleanTranslations(word: WordType): WordType{
  return {
    ...word,
    translations: word.translations.filter(t=> t && t.name).map(translation => ({
      ...translation,
      sentences: translation.sentences.filter(sentence => sentence.sentence && sentence.translatedSentence)
    }))
  }
}

export function translationsToString(translations: TranslationType[]) {
  let s = '';
  translations.forEach((translation, i, translations) => {
    if (Object.is(translations.length - 1, i))
      s += translation.name;
    else
      s += (translation.name + ', ');
  })
  return s;
}