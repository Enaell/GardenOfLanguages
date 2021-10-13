import { useState, useMemo, useEffect } from 'react';
import { DeckType, VisibilityType } from '../../app/types/word';


function getErrorFromField(
    key: string,
    value: string | string[] | [] | number | boolean | VisibilityType
  ) {
  switch (key) {
    case 'subject':
      return !(value !== '');
    case 'rank':
      return !(value || value === 0);
    case 'level': 
      return !(value || value === 0);
    case 'comments': 
      return false;
    case 'validated':
      return false;
    default: 
      return !value
  }
}

export function useWordListFormFields(wordList?: DeckType)
{

  const [fields, setFields] = useState({ 
    name: wordList?.name || '',
    subject: wordList?.subject || [],
    level: wordList?.level || 0,
    rank: wordList?.rank || 0,
    validated: wordList?.validated || false,
    visibility: wordList?.visibility || "owner" as VisibilityType,
    comments: wordList?.comments || ''
   });
  const [errors, setErrors] = useState({
    name: !wordList?.name,
    subject: !wordList?.subject,
    level: !(wordList?.level || wordList?.level === 0),
    rank: !(wordList?.rank || wordList?.rank === 0),
    visibility: !wordList?.visibility 
  });
  const [canSave, setCanSave] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(()=> {
    setFields({ 
      name: wordList?.name || '',
      subject: wordList?.subject || [],
      level: wordList?.level || 0,
      rank: wordList?.rank || 0,
      validated: wordList?.validated || true,
      visibility: wordList?.visibility || "owner" as VisibilityType,
      comments: wordList?.comments || ''
     })
  }, [wordList]);

  useMemo(()=> {
    const findError = Object.keys(errors).find((error) => errors[error as 'name' | 'subject' | 'level' | 'rank' | 'visibility'])
    setCanSave(!findError);
  }, [errors])

  function updateFields(
    key: 'name' | 'subject' | 'level' | 'rank' | 'validated' | 'visibility' | 'comments', 
    value: string | string[] | number | boolean | VisibilityType
  ) {
    setFields({...fields, [key]: value});
    setErrors({...errors, [key]:  getErrorFromField(key, value)});
  }

  return {
    fields,
    errors,
    canSave,
    checkError,
    setCheckError,
    setFields: updateFields
  }
}
