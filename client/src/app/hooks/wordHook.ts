import { useState, useEffect, useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { dictionaryApi } from '../apiClient/dictionaryApi';
import { useAppSelector } from '../redux/hooks';
import { userState } from '../redux/userSlice';
import { DeckType, WordType } from '../types/word';
import { cleanTranslations } from '../utils/dictionary';

export function useWords() {

  const { token, language, targetLanguage  } = useAppSelector(userState);
  
  const history = useHistory();
  const { url } = useRouteMatch();
  
  const [words, setWords] = useState([] as WordType[]);
  
  useEffect(() => {
    dictionaryApi.getAllWords(targetLanguage, token).then((wordList: WordType[]) => {setWords(wordList)});
  }, [token, targetLanguage]);
  
  useMemo(() => {
    words.sort((a, b) => a.internationalName > b.internationalName ? 1 : -1)
  }, [words]);

  async function createWord(newWord:WordType) {
    if (!token)
      return {success: false, message: 'User not logged'};

      const cleanWord = cleanTranslations(newWord);

      setWords([...words, newWord]);
  
      await dictionaryApi.updateWord(cleanWord, token);
  }

  async function updateWord(newWord: WordType){
    if (!token)
      return {success: false, message: 'User not logged'};

    const cleanWord = cleanTranslations(newWord);

    setWords(words.map(word => ( word.id === cleanWord.id ? cleanWord : word)));

    await dictionaryApi.updateWord(cleanWord, token);

    return cleanWord; 
  };

  return {
    url,
    words,
    createWord,
    updateWord
  }

}


