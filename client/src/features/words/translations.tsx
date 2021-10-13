import React from "react";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, FormControl, IconButton, List, ListItemText, TextField, Typography, withStyles } from "@material-ui/core";
import { DeleteOutline, ExpandMore, PlaylistAdd,  } from '@material-ui/icons';
import { SentencesType, TranslationType } from "../../app/types/word";
import { LanguageType } from "../../app/types/language";
import { Column, Row } from "../common/Flexbox";

export const TranslationList = ({
  translations= [],
  setWordTranslations= () => {},
  modify= false,
  language,
  error=false,
  style={}
}: {
  translations?: TranslationType[],
  setWordTranslations?: (newTranslations: TranslationType[]) => void,
  modify?: boolean,
  language: LanguageType,
  error: boolean,
  style?: any
}) => {

  return (
    <div style={{...style, border: error ?  'solid 1px red': 'none'}}>
    {translations.map((translation) => (
    <TranslationPanel 
      key={translation.rank}
      setWordTranslation={(newT) => {setWordTranslations([...translations.slice(0, translation.rank), {...translations[translation.rank], name: newT, sentences: translations[translation.rank].sentences? translations[translation.rank].sentences : []}, ...translations.slice(translation.rank + 1, translations.length)])}} 
      setTranslationSentence={(newS) => setWordTranslations([...translations.slice(0, translation.rank), {...translations[translation.rank], sentences: newS}, ...translations.slice(translation.rank + 1, translations.length)])  }
      deleteTranslation={() => setWordTranslations(translations.filter(t => t.rank !== translation.rank).map((t, index) => {return {...t, rank: index}}))}
      translation={translation} 
      modify={modify}/>
    ))}
    {modify &&
    <Button
      variant='outlined'
      style={{ marginTop: '10px'}}
      fullWidth
      onClick={e => {
        e.preventDefault();
        setWordTranslations([...translations, {name: '', internationalName: '', language, sentences: [], rank: translations ? translations.length: 0}])
      }}>
        <PlaylistAdd style={{padding: '5px'}}/>
    </Button>}
  </div>)
}

const TranslationPanel = ({
  setWordTranslation,
  setTranslationSentence,
  deleteTranslation,
  translation,
  modify
} : {
  setWordTranslation: (newTranslation: string) => void,
  setTranslationSentence: (newSentences: SentencesType[]) => void,
  deleteTranslation: () => void,
  translation: TranslationType,
  modify: boolean
}) => {
  
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
      {modify ? 
        <Row style={{width: '100%'}} vertical='center' horizontal='space-between'>
          <FormControl
            aria-label="Acknowledge"
            onClick={(event) => {event.stopPropagation()}}
            onFocus={(event) => event.stopPropagation()}
          >
            <CssTextField
              label={translation.name ? 'Tranduction': 'Nouvelle Traduction'}
              value={translation.name}
              onChange={(event) => {
                event.preventDefault();
                setWordTranslation(event.target.value);               
              }}
            />
          </FormControl>
          <div>
            <IconButton
              onClick={e => {
                e.stopPropagation();
                e.preventDefault();
                deleteTranslation();
              }}
            >
              <DeleteOutline />
            </IconButton> 
          </div>
        </Row>
        : <Typography>{translation.name}</Typography>
      }
      </AccordionSummary>
      <AccordionDetails style={{paddingTop: '0', paddingBottom: '0'}}>
        <List style={{paddingTop: '0', width: '100%', paddingLeft: '20px', paddingRight: '20px'}} >
          {translation.sentences.map((sentence, index) => (
          <div key={index}>
            <Divider/>
            <SentencePanel
              modify={modify}
              saveSentence={(newSentence) => 
                setTranslationSentence([
                  ...(translation.sentences).slice(0, index),
                  newSentence,
                  ...(translation.sentences).slice(index + 1, translation.sentences.length)
                ])}
              deleteSentence={() => setTranslationSentence([...translation.sentences.slice(0, index), ...translation.sentences.slice(index + 1, translation.sentences.length)]) }
              sentence={sentence} />
          </div>))}
            {modify &&
            <Column horizontal='center' style={{width: '100%'}}>
              <Divider style={{width: '100%'}}/>
              <Button
                variant={'text'}
                style={{ marginTop: '10px', width: '46px', minWidth: 0, borderRadius: '30px'}}
                onClick={e => {
                  e.preventDefault();
                  setTranslationSentence([...(translation.sentences), {sentence: '', translatedSentence: ''}])
                }}>
                  <PlaylistAdd style={{padding: '5px'}}/>
              </Button> 
          </Column>}
        </List >
      </AccordionDetails>
    </Accordion>
  )
}

const SentencePanel = ({
  modify,
  sentence,
  saveSentence,
  deleteSentence
}: {
  modify: boolean,
  sentence: SentencesType,
  saveSentence: (newSentences: SentencesType) => void,
  deleteSentence: () => void
}) => {
  return (
    <Row style={{width: '100%'}} horizontal='space-between' vertical='center'>
    {modify ? <>
      <Column style={{width: '100%'}} horizontal={'start'}>
        <CssTextField
          placeholder='Nouvelle phrase'
          fullWidth
          value={sentence.sentence}
          onChange={(event) => {
            saveSentence({sentence: event.target.value, translatedSentence: sentence.translatedSentence})
          }}
        />
        <CssTextField 
          placeholder='Traduction'
          inputProps={{ style: { opacity: '0.6', fontSize: 14}}}
          fullWidth
          value={sentence.translatedSentence}
          onChange={(event) => {
            saveSentence({sentence: sentence.sentence, translatedSentence: event.target.value})
          }}
        />
      </Column>
      <IconButton 
        style={{height:'48px'}}
        onClick={e => {
        e.preventDefault();
        deleteSentence();
      }}
      >
        <DeleteOutline />
      </IconButton>
    </>
    : <ListItemText primary={ sentence.sentence} secondary={ sentence.translatedSentence } />}
  </Row>  )
}

const CssTextField = withStyles({
  root: {
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
      borderBottomColor: '#949494'
    },
    '& .MuiInput-underline:before': {
      border: 0
    }
  },
})(TextField);