import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.secondary.main,
    maxWidth: '1200px',
    marginTop: '60px',
    zIndex: 2
  },
  background: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    filter: 'blur(20px)',
    backgroundSize: '100% 100%'
  },
  loader: {
    display: 'inline-block',
    position: 'relative',
    width: '64px',
    height: '10px',
    '& div': {
      position: 'absolute',
      width: '11px',
      height: '11px',
      borderRadius: '50%',
      background: 'rgba(0, 0, 0, 0.87)',
      animationTimingFunction: 'cubic-bezier(0, 1, 1, 0)',
      '&:nth-child(1)': {
        left: '6px',
        animation: '$loader1 0.6s infinite',
      },
      '&:nth-child(2)': {
        left: '6px',
        animation: '$loader2 0.6s infinite',
      },
      '&:nth-child(3)': {
        left: '26px',
        animation: '$loader2 0.6s infinite',
      },
      '&:nth-child(4)': {
        left: '45px',
        animation: '$loader3 0.6s infinite',
      },
    },
  },
  '@keyframes loader1': {
    '0%': {
      transform: 'scale(0)'
    },
    '100%': {
      transform: 'scale(1)'
    }  
  },
  '@keyframes loader2': {
    '0%': {
      transform: 'translate(0, 0)'
    },
    '100%': {
      transform: 'translate(19px, 0)'
    }
  },
  '@keyframes loader3': {
    '0%': {
      transform: 'scale(1)'
    },
    '100%': {
      transform: 'scale(0)'
    }
  },
}));

export const LoaderInline = ({ className, dotStyle }: any) => {

  const classes = useStyles();

  return (
    <div className={`${classes.loader} ${className}`}>
      <div style={dotStyle} />
      <div style={dotStyle} />
      <div style={dotStyle} />
      <div style={dotStyle} />
    </div>
  )
};