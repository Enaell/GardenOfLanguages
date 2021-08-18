import React from 'react';
import { Route, Switch as RouterSwitch } from 'react-router-dom'
import { UserPage } from './UserPage'
// import DictionaryPage from './dictionaryPage'
import { RouteNotfound } from './RouteNotfound';
import { LandingPage } from './LandingPage';
import { useAppSelector } from '../redux/hooks';
import { userState } from '../redux/userSlice';
import { Fade } from '@material-ui/core';


export const Routes = () => {

  const { role: isLogged} = useAppSelector(userState)

  console.log(isLogged);

  return (
    <>
      { isLogged ?
      <div style={{marginTop:'100px', width:'100%', minHeight: 'calc(100vh - 150px)'}}>
        <Fade timeout={2000} in={isLogged !== undefined}>
          <RouterSwitch>
            <Route exact path="/" component={UserPage}/>
            {/* <Route path="/dictionary" component={DictionaryPage}/> */}
            <Route component={RouteNotfound} />
          </RouterSwitch>
        </Fade>
      </div>
      : <LandingPage />}
    </>
  )
}