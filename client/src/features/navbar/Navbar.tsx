import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Button, makeStyles, Theme } from '@material-ui/core';
import translate from 'counterpart';
import { Row } from '../common/Flexbox';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { userState } from '../../app/redux/userSlice';
import { landingState, scrollToSection } from '../../app/redux/landingSlice';
import { sections } from '../../app/routes/LandingPage';
import { NavButton } from '../common/Buttons';
import { changeTab, modalTabs, toggleModal } from '../../app/redux/connectionSlice';
import { LoginModal } from '../connection/LoginModal';
import { UserBar } from './Usebar';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    zIndex: 9999,
    width: '100%',
  },
  grow: {
    flex: 1
  },
  grow3: {
    flex:3
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  homeButton:{
    textTransform: 'none',
  }
}));

export const Navbar = () => {

  const handleSideMenuClick = () => {}

  const { token } = useAppSelector(userState);
  const { discover } = useAppSelector(landingState)

  const dispatch = useAppDispatch()

  const classes = useStyles();

  const history = useHistory()

  const handleOnMainPageRedirectionClick = () => {
    history.push('/');
  }

  function openModal(tab: modalTabs) {
    dispatch(changeTab(tab))
    dispatch(toggleModal(true))
  } 

   return(
    <div className={classes.root}>
      <AppBar elevation={(token || discover )? 4: 0} position='fixed' color={ (token || discover) ? 'primary' : 'transparent'}>
        <Toolbar>
          <Row width='100%' vertical='center' horizontal='space-between'>
            <Row  className={classes.grow}>
              {token &&
              <IconButton onClick={handleSideMenuClick} className={classes.menuButton} color="primary" aria-label="Open drawer">
                <MenuIcon />
              </IconButton>}
              <Button className={classes.homeButton} onClick={handleOnMainPageRedirectionClick}>
                <Typography color={ (token || discover) ? 'secondary' : 'primary'}  variant="h6" noWrap>
                  {translate('application-name')}
                </Typography>
              </Button>
            </Row>
            {discover ? <Row horizontal='center' className={classes.grow}>
              { sections.map(section => 
                <NavButton onClick={() =>  dispatch(scrollToSection(section))} key={section}>
                  {translate(`landingPage.sections.${section}`)} 
                </NavButton>)}
            </Row>
            : <Row className={classes.grow}>
            </Row>}
            <Row horizontal='end' className={classes.grow}>
              {token ? <UserBar/>
              : <>
                  <Button color='primary' onClick={() => openModal('register')}>
                    <Typography variant='body2' color={ discover ? 'secondary' : 'primary'} noWrap>
                      {translate('connection.signin')}
                    </Typography>
                  </Button>
                  <Button color="primary" onClick={() => openModal('auth')}>
                    <Typography variant='body2' color={ discover ? 'secondary' : 'primary'} noWrap>
                      {translate('connection.login')}
                    </Typography>
                  </Button>
                  <LoginModal/>
                </>
              }
            </Row>
          </Row>
        </Toolbar>
      </AppBar>
    </div>
  );
}

