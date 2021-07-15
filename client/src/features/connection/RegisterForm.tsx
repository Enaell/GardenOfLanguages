import React, { useState } from 'react';
import { Column, Row } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@material-ui/core';
import { fullNameLanguages, inputLanguage, languages } from '../../app/utils/language';
import { LanguageType } from '../../app/types/language';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { userApi } from '../../app/apiClient/userApi';
import { login, userState } from '../../app/redux/userSlice';
import { LoadingButton } from '../common/Buttons';
import { toggleModal } from '../../app/redux/connectionSlice';
import { opensnackbar } from '../../app/redux/snackbarSlice';

type RegisterFormProps = { 
  isModal?: boolean;
}

export const RegisterForm = ({ isModal = false }: RegisterFormProps) => {

  const { language: userLanguage, targetLanguage: userTargetLanguage } = useAppSelector(userState);

  const dispatch = useAppDispatch();  


  const [language, setLanguage] = useState(userLanguage);
  const [languageError, setLanguageError] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState(userTargetLanguage);
  const [targetLanguageError, setTargetLanguageError] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  async function onRegister() {
    const usError = !username;
    const pError =  !password;
    const eError = !(email && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));
    const lError = !language;
    const tlError = !targetLanguage;

    setUsernameError(usError);
    setPasswordError(pError);
    setEmailError(eError);
    setTargetLanguageError(tlError);
    setLanguageError(lError);

    if (!(usError || pError || eError || tlError || lError))
    {
      try {
        const loggedUser = await userApi.register({username, email, password, language, targetLanguage});
        if (loggedUser.success)
          dispatch(login(loggedUser.message.user));
        else {
          dispatch(opensnackbar('error', translate('connetion.snackbar.registerError')));
        }
      } catch(e) {
        dispatch(opensnackbar('error', translate('connetion.snackbar.registerError')));
      }
    } 
  }

  
  return(
    <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%', paddingBottom: '10px'}}>
      <TextField
        error = {usernameError}
        helperText = {usernameError ? translate('connection.usernameError') : null}       
        required
        margin="dense"
        id="name"
        label={translate('connection.username')}
        type="text"
        onChange={e => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        error = {emailError}
        helperText = {emailError ? translate('connection.emailError') : null} 
        required
        margin="dense"
        id="email"
        label={translate('connection.email')}
        type="email"
        onChange={e => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        error = {passwordError}
        helperText = {passwordError ? translate('connection.passwordError') : null}
        required
        margin="dense"
        id="password"
        label={translate('connection.password')}
        type="password"
        onChange={e => setPassword(e.target.value)}
        fullWidth
      />
      <Row style={{width: '100%'}} horizontal={'space-between'}>
        <FormControl error={languageError} style={{width: '45%'}}>
          <InputLabel>{translate('landingPage.language')}</InputLabel>
          <Select
            style={{ width: '100%', minWidth: '120px'}}
            labelId="selectLanguage"
            value={language}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              translate.setLocale(event.target.value as LanguageType);
              setLanguage(event.target.value as LanguageType)
            }}
          >
            {languages.filter(key => inputLanguage[key])
            .map((key) => <MenuItem key={key} value={key}>{ fullNameLanguages[key] }</MenuItem>)}
          </Select>
        </FormControl>
        <FormControl error={targetLanguageError} style={{width: '45%'}}>
          <InputLabel>{translate('landingPage.targetLanguage')}</InputLabel>
          <Select
            style={{ width: '100%', minWidth: '120px'}}
            labelId="selectTargetLanguage"
            value={targetLanguage}
            onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
              setTargetLanguage(event.target.value as LanguageType)
            }}
          >
            {languages.map((key) => <MenuItem key={key} value={key}>{ translate(`language.${key}`) }</MenuItem>)}
          </Select>
        </FormControl>
      </Row>
      <Row style={{padding: '20px 0'}}>
        {isModal && <Button onClick={() => dispatch(toggleModal(false))} color="primary">
          Cancel
        </Button>}
        <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={() => onRegister()}> {translate('connection.signin')}</LoadingButton>
      </Row>
  </Column>);
}