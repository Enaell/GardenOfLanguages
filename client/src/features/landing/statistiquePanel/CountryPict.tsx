import React from 'react';
import frPict from '../ressources/Fr.jpg';
import enPict from '../ressources/En.jpg';
import cnPict from '../ressources/Cn.jpg';
import { LanguageType } from '../../common/types';
import { Box, CardMedia, makeStyles, Theme } from '@material-ui/core';


function getPicture(language: LanguageType) {
  switch (language) {
    case 'Fr':
      return frPict;
    case 'Cn':
      return cnPict;
    case 'En':
      return enPict;
    default:
      return frPict;
  }
};

const useStyles = makeStyles((theme: Theme) => ({
  box: {
    backgroundColor: 'transparent',
  },
  pictCard: {
    height: '480px',
    width: '600px',
    transition: 'opacity 1000ms ease-in-out',
    opacity: 0
  },
  pictCardActive: {
    width: '600px',
    height: '480px',
    transition: 'opacity 1000ms ease-in-out',
    opacity: 1
  }
}));

export const CountryPict = ({language, isVisible}: {language: LanguageType, isVisible: boolean}) => {
  const classes = useStyles();

  return (
    <Box  className={classes.box}>
      <CardMedia className={isVisible ? classes.pictCardActive : classes.pictCard} image={getPicture(language)} />
    </Box>
  )
}