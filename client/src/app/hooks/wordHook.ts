import { useState, useEffect, useMemo } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { dictionaryApi } from '../apiClient/dictionaryApi';
import { userState } from '../redux/userSlice';
import { WordType } from '../types/word';
import { cleanTranslations } from '../utils/dictionary';
import { opensnackbar } from '../redux/snackbarSlice';

export function useWords() {

  const { token, targetLanguage  } = useAppSelector(userState);
    
  const dispatch = useAppDispatch();

  const [words, setWords] = useState([] as WordType[]);
  
  useEffect(() => {
    dictionaryApi.getAllWords(targetLanguage, token).then((wordList: WordType[]) => {setWords(wordList)});
  }, [token, targetLanguage]);
  
  useMemo(() => {
    words.sort((a, b) => a.internationalName > b.internationalName ? 1 : -1)
  }, [words]);

  function addWord(newWord: WordType) {
    const cleanWord = cleanTranslations(newWord);
    setWords([...words, cleanWord]);
    return cleanWord;
  }

  async function createWord(newWord:WordType) {
    const cleanWord = cleanTranslations(newWord);
    setWords([...words, cleanWord]);
    if (token) {
      const res = await dictionaryApi.updateWord(cleanWord, token); 
      if (res.success)
        return res.message as WordType
      dispatch(opensnackbar('error', res.message as string)) 
    }
    return cleanWord;
  };

  async function updateWord(newWord: WordType){
    const cleanWord = cleanTranslations(newWord);
    setWords(words.map(word => ( word.id === cleanWord.id ? cleanWord : word)));
    if(token) {
      const res = await dictionaryApi.updateWord(cleanWord, token); 
      if (res.success)
        return res.message
      dispatch(opensnackbar('error', res.message as string))
    }
    return cleanWord;
  };

  return {
    words,
    createWord,
    updateWord,
    addWord,
  }

}


