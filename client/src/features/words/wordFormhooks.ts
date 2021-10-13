import { useState, useMemo, useEffect } from 'react';
import { useAppSelector } from '../../app/redux/hooks';
import { userState } from '../../app/redux/userSlice';
import { TranslationType, VisibilityType, WordType } from '../../app/types/word';

function checkWordError(
  key: 'name' | 'internationalName' | 'level' | 'translations' | 'subject' | 'visibility',
  value: string | string[] | [] | TranslationType[] |  number | boolean | VisibilityType | undefined
  ) {
  switch (key) {
    case 'subject':
      return !(value !== '');
    case 'level': 
      return !(value || value === 0);
    case 'translations':
      let translationsError = true;
      const translations  = value as TranslationType[] | undefined;
      translations && translations.forEach(translation => {
        if (translation.name) translationsError = false;
      });
      return translationsError;
    default: 
      return !value
  }
}

export function useWordForm(word: WordType | undefined, create: boolean) {

  const { role, username, language, targetLanguage } = useAppSelector(userState);

  const [newWord, setNewWord] = useState(word ? {...word} : undefined);

  const [wordErrors, setWordError] = useState({name: false, internationalName: false, level: false, translations: false, subject: false, visibility: false})

  const [onModify, setOnModify] = useState(create)

  const [isOwner, setIsOwner] = useState(role === 'Admin' || role === 'Moderator' || word?.owner === username)
  const [isAdmin, setIsAdmin] = useState(role === 'Admin' || role === 'Moderator')

  useEffect(()=> {
    setIsOwner(role === 'Admin' || role === 'Moderator' || word?.owner === username);
    setIsAdmin(role === 'Admin' || role === 'Moderator');
  }, [role, username])


  function updateWord(wordUpdated: WordType) {
    setNewWord({...wordUpdated});
    setWordError({
      name: checkWordError('name' , wordUpdated.name),
      internationalName: checkWordError('internationalName', wordUpdated.internationalName),
      level: checkWordError('level', wordUpdated.level),
      translations: checkWordError('translations', wordUpdated.translations),
      subject: checkWordError('subject', wordUpdated.subject),
      visibility: checkWordError('visibility', wordUpdated.visibility)
    })
  }

  function cancelModification() {
    setNewWord(word || {
      language: targetLanguage,
      name:'',
      internationalName: '',
      level: 0,
      translations: [],
      subject: []
    });
    setWordError({name: false, internationalName: false, level: false, translations: false, subject: false, visibility: false})
    setOnModify(false);
  }

  useMemo(()=> {
    console.log('useMemo word and create')
    if (word != null) {
      setNewWord({...word});
      setWordError({name: false, internationalName: false, level: true, translations: false, subject: false, visibility: false});
      setOnModify(create)
    }
  }, [word, create]);


  return { newWord, wordErrors, onModify, isAdmin, isOwner, language, targetLanguage, updateWord, cancelModification, setOnModify }
}