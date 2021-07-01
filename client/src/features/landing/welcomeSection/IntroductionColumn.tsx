import React from 'react';
import { Column } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import translate from 'counterpart';

export const IntroductionColumn = () => {
  return (
    <Column width='100%'>
      <Typography variant="body2" color={'initial'}>{translate('landingPage.welcomeText1')}</Typography>
      <Typography style={{paddingTop:'10px'}} variant="body2" color={'initial'}>{translate('landingPage.welcomeText2')}</Typography>
    </Column>    
  )
}
