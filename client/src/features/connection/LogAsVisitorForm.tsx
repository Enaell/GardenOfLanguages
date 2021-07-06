import React, { useEffect } from 'react';
import { Row } from '../common/Flexbox';
import translate from 'counterpart';
import { InputLabel, FormControl, Select, MenuItem, Button } from '@material-ui/core';
import { LanguageType } from '../../app/types/language';
import { fullNameLanguages, inputLanguage, languages } from '../../app/utils/language';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { userState } from '../../app/redux/userSlice';
import { toggleModal } from '../../app/redux/connectionSlice';
import { LoadingButton } from '../common/Buttons';
import { discover } from '../../app/redux/landingSlice';
import { connectAsVisitor } from '../../app/redux/userSlice';

type LogAsVisitorFormProps = { 
  isModal?: boolean;
}

export const LogAsVisitorForm = ({ isModal = false }: LogAsVisitorFormProps) => {

  const { language: userLanguage, targetLanguage: userTargetLanguage } = useAppSelector(userState);

  const dispatch = useAppDispatch();  

  const [language, setLanguage] = useState(userLanguage);
  const [languageError, setLanguageError] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState(userTargetLanguage);
  const [targetLanguageError, setTargetLanguageError] = useState(false);


  function onConnectAsVisitor() {
    const lError = !language;
    const tlError = !targetLanguage;

    setLanguageError(!lError)
    setTargetLanguageError(!tlError);

    if (!lError && !tlError)
      dispatch(connectAsVisitor({language, targetLanguage}))
  }

  return (
    <>
      <Row style={{width: '100%'}} horizontal={'space-between'}>
        <FormControl error={languageError} style={{width: '45%'}}>
          <InputLabel>{translate('landingPage.language')}</InputLabel>
          <Select
            style={{ width: '100%', minWidth: '120px'}}
            labelId="selectLanguage"
            value={language}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              translate.setLocale(event.target.value as string);
              setLanguage(event.target.value as LanguageType)
            }}
          >
            {languages.filter(key => inputLanguage[key])
            .map(key => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl error={targetLanguageError} style={{width: '45%'}}>
          <InputLabel>{translate('landingPage.targetLanguage')}</InputLabel>
          <Select
            style={{ width: '100%', minWidth: '120px'}}
            labelId="selectTargetLanguage"
            value={targetLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => setTargetLanguage(event.target.value as LanguageType)}
          >
            {languages.map((key) => <MenuItem key={key} value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
        </FormControl>
      </Row>
      <Row style={{padding: '20px 0'}}>
        {isModal && <Button onClick={() => dispatch(toggleModal(false))} color="primary">
              Cancel
        </Button>}
        <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={onConnectAsVisitor}> {translate('connection.visitor')}</LoadingButton>
        {!isModal && <LoadingButton className='darkButton' onClick={ () => dispatch(discover())}>{translate('connection.moreDetails')}</LoadingButton>}
      </Row>
    </>
  )
}