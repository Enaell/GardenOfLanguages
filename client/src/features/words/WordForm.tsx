import React from 'react';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
import { useWordForm } from './wordFormhooks' 
import { WordType } from '../../app/types/word';
import { Column, Row } from '../common/Flexbox';
import { LanguageType } from '../../app/types/language';
import { WordCard } from './wordCard';
import { TranslationList } from './translations';
const height= {
  maxHeight: 'calc(100vh - 285px)',
  paddingLeft: '2px',
  paddingRight: '5px',
  overflowY: 'auto',
  overflowX: 'hidden'
}

type WordErrorsType = {
    name: boolean;
    internationalName: boolean;
    level: boolean;
    translations: boolean;
    subject: boolean;
    visibility: boolean;
}

function getPrimaryFontSize(charactersNumber: number, language: LanguageType){
  if (charactersNumber < 3 || (language !== 'Cn' && charactersNumber < 5))
    return "h1";
  if (charactersNumber < 5 || (language !== 'Cn' && charactersNumber < 9))
    return "h2";
  if ( charactersNumber < 6 || (language !== 'Cn' && charactersNumber < 11))
    return "h3";
  if (charactersNumber < 8 || (language !== 'Cn' && charactersNumber < 15))
    return "h4";
  return "h5";
}

function canSave(wordErrors: WordErrorsType){
  return !Object.values(wordErrors).some(wordError=> wordError === true)
}

export const WordForm = ({
  create=false,
  word=undefined,
  onSave
}: {
  create?: boolean,
  word?: WordType,
  onSave: (word: WordType) => void
}) => 
{

  const { newWord, wordErrors, onModify, isAdmin, isOwner, language, targetLanguage, updateWord, cancelModification, setOnModify } = useWordForm(word, create)

  return (
  <Row style={{width: '100%', margin: '20px'}}>
    <Column>
      <WordCard
        isAdmin={isAdmin}
        modify={onModify}
        style={{width:"300px", ...height}}
        word={newWord}
        wordErrors={wordErrors}
        setWord={(w: WordType) => {updateWord(w)}}
        variant={(newWord?.name && getPrimaryFontSize(newWord.name.length, targetLanguage)) || undefined}
        align={'center'}
        wordDetailAlign={'center'}
        targetLanguage={targetLanguage}
      /> 
    </Column>
    <TranslationList 
      setWordTranslations={(newTranslations) => newWord && updateWord({...newWord, translations: [...newTranslations]})} 
      modify={onModify} 
      style={{width: '100%', marginLeft: '20px', ...height}}
      translations={newWord?.translations}
      language={language}
      error={wordErrors.translations}
    />
    {(isAdmin || isOwner || create) && <>
      {!onModify ?
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();
            setOnModify(true);
          }}
        >
          <CreateOutlinedIcon />
        </IconButton>
        : <Column> 
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();
            cancelModification();
          }}
        >
          <CloseIcon />
        </IconButton>
        <IconButton style={{height: '50px'}}
          onClick={e => {
            e.preventDefault();
            if (canSave(wordErrors) && newWord !== undefined) {
              onSave(newWord);
              setOnModify(false);
            }
          }}
        >
          <SaveAltIcon />
        </IconButton>
      </Column>
      }
    </>}
  </Row>)
}
