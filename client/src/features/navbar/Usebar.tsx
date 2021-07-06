import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Badge from '@material-ui/core/Badge';
import { getLogMenu, getLogMobileMenu } from './LogMenu'
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { logout, userState } from '../../app/redux/userSlice';
import { makeStyles, Theme } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export const UserBar = () => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);;
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);;
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const user = useAppSelector(userState);
  const dispatch = useAppDispatch();

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }
  
  function handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setMobileMoreAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
    setMobileMoreAnchorEl(null);
  }
    
  function handleLogout(event: React.MouseEvent<HTMLElement>){
    handleMenuClose();
    dispatch(logout())
  }

  const LogMenu = getLogMenu(anchorEl, isMenuOpen, handleMenuClose, handleLogout);

  const LogMobileMenu = getLogMobileMenu(mobileMoreAnchorEl, isMobileMenuOpen, handleProfileMenuOpen, handleMenuClose, user);
  
  const classes = useStyles();

  return (
    <div>
      <div className={classes.sectionDesktop}>
        {false &&
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
        }
        {false &&  
          <IconButton color="inherit">
            <Badge badgeContent={17} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          }
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : undefined}
          aria-haspopup="true"
          onClick={handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        {LogMenu}
      </div>
      <div className={classes.sectionMobile}>
        <IconButton aria-haspopup="true" onClick={handleMobileMenuOpen} color="inherit">
          <MoreIcon />
        </IconButton>
          {LogMobileMenu}
      </div>
    </div>
  )}