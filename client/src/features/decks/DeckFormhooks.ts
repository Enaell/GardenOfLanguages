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

export function usedeckFormFields(deck?: DeckType)
{

  const [fields, setFields] = useState({ 
    name: deck?.name || '',
    subject: deck?.subject || [],
    level: deck?.level || 0,
    rank: deck?.rank || 0,
    validated: deck?.validated || false,
    visibility: deck?.visibility || "owner" as VisibilityType,
    comments: deck?.comments || ''
   });
  const [errors, setErrors] = useState({
    name: !deck?.name,
    subject: !deck?.subject,
    level: !(deck?.level || deck?.level === 0),
    rank: !(deck?.rank || deck?.rank === 0),
    visibility: !deck?.visibility 
  });
  const [canSave, setCanSave] = useState(false);
  const [checkError, setCheckError] = useState(false);

  useEffect(()=> {
    setFields({ 
      name: deck?.name || '',
      subject: deck?.subject || [],
      level: deck?.level || 0,
      rank: deck?.rank || 0,
      validated: deck?.validated || true,
      visibility: deck?.visibility || "owner" as VisibilityType,
      comments: deck?.comments || ''
     })
  }, [deck]);

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
