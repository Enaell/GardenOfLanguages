import React, { useState } from 'react';
import { Button, makeStyles, Theme, Typography } from '@material-ui/core';
import { LoaderInline } from './Loaders';

const useStyles = makeStyles((theme: Theme) => ({
  navButton:  {
    cursor: 'pointer',
    color: 'white',
    width: '100px',
    margin: '0 10px 0 10px',
    textTransform: 'capitalize',
    '&:after': {
      display:'block',
      content: '""',
      borderBottom: 'solid 3px white',  
      transform: 'scaleX(0)',
      transition: 'transform 250ms ease-in-out',
    },
    '&:hover:after': {transform: 'scaleX(1)' }
  },
  whiteButton: {
    borderRadius: '50px',
    backgroundColor: 'white',
    color: theme.palette.primary.main,
    borderColor: theme.palette.primary.main,
    textTransform: 'none'
  },
  darkButton: {
    borderRadius: '5px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    borderColor: theme.palette.primary.main,
    textTransform: 'uppercase',
    '&:hover': {
      color: theme.palette.primary.contrastText,
      backgroundColor: '#41a61d9a',
      borderColor: theme.palette.secondary.light,
    }
  }
}));

export const LoadingButton = ({ 
  children,
  className,
  variant,
  type,
  onClick,
  style
}: {
  children: any,
  className: 'whiteButton' | 'darkButton', 
  variant?: "text" | "outlined" | "contained",
  type?: "button" | "reset" | "submit",
  onClick: (() => Promise<void>) | (() => void),
  style?: any
}) => {

  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button 
      onClick={async e => { 
        e.preventDefault();
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
      }} 
      variant={variant} 
      type={type}
      className={classes[className]}
      style={{ 
        ...style 
      }}
    >
      <>
        { isLoading ?
          <LoaderInline /> 
          : children
        }
      </>
    </Button>
  )
}

export const NavButton = ({children, onClick, ...props}:{onClick: () => void, children: React.ReactNode}) => {
  
  const classes = useStyles();
  
  return (
    <div className={classes.navButton}>
      <Typography align='center' onClick={onClick} variant='body1' {...props}>
          {children}
      </Typography>
    </div>
  )
}