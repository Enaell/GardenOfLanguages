import React, { useState } from 'react';
import { Column, Row } from '../common/Flexbox';
import TextField from '@material-ui/core/TextField';
import translate from 'counterpart';
import { Button } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { userApi } from '../../app/apiClient/userApi';
import { login } from '../../app/redux/userSlice';
import { LoadingButton } from '../common/Buttons';
import { toggleModal } from '../../app/redux/connectionSlice';
import { opensnackbar } from '../../app/redux/snackbarSlice';

type RegisterFormProps = { 
  isModal?: boolean;
}

export const AuthForm = ({ isModal = false }: RegisterFormProps) => {
  const dispatch = useAppDispatch();  


  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  async function onAuth() {
    const pError =  !password;
    const eError = !(email && email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i));

    setPasswordError(pError);
    setEmailError(eError);

    if (!(eError || pError))
    {
        try {
          const loggedUser = await userApi.auth(email, password);
          if (loggedUser.success)
            dispatch(login(loggedUser.message.user));
          else {
            console.log('=================');
            console.log(loggedUser);
            dispatch(opensnackbar('error', 'coucou'));
          }
        } catch (e) {
        }
    } 
  }

  return(
    <Column vertical={'space-between'} horizontal={'center'} style={{minWidth: '75%', paddingBottom: '10px'}}>
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
      <Row>
        {isModal && <Button onClick={() => dispatch(toggleModal(false))} color="primary">
          Cancel
        </Button>}
        <LoadingButton className='whiteButton' variant='outlined' type='submit' onClick={() => onAuth()}> {translate('connection.signin')}</LoadingButton>
      </Row>
  </Column>);
}