import React from 'react';
import { Route, Switch as RouterSwitch } from 'react-router-dom'
// import { UserPage } from './userPage/UserPage'
// import DictionaryPage from './dictionaryPage'
import { RouteNotfound } from './RouteNotfound';
import { LandingPage } from './LandingPage';
import { useAppSelector } from '../redux/hooks';
import { userState } from '../redux/userSlice';


export const Routes = () => {

  const { role: isLogged} = useAppSelector(userState)

  return (
    <>
      { isLogged ?
      <div style={{marginTop:'100px', width:'100%', minHeight: 'calc(100vh - 150px)'}}>
        <RouterSwitch>
          {/* <Route exact path="/" component={UserPage}/> */}
          {/* <Route path="/dictionary" component={DictionaryPage}/> */}
          <Route component={RouteNotfound} />
        </RouterSwitch>
      </div>
      : <LandingPage />}
    </>
  )
}