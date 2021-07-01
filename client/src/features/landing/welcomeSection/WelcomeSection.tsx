import React from 'react';
import { Column, Row } from '../../common/Flexbox';
import { Typography } from '@material-ui/core';
import { welcomeSection, backgroundImg, connectionDiv } from './styles.d';

import translate from 'counterpart';
import { LoginTabs } from '../../connection/LoginTabs';
import { IntroductionColumn } from './IntroductionColumn';

type WelcomeSectionType = {
  position?: 'absolute' | 'relative'
}

export const WelcomeSection = ({ 
  position = 'relative'
} : WelcomeSectionType) => {
  return (
    <Column horizontal='start' vertical={'center'} className='welcomeSection' style={{ ...welcomeSection, position: position}}>
      <div style={backgroundImg}/>
      <Column horizontal='end' width='45%'>
        <Column horizontal={'start'} style={ connectionDiv }>
          <Typography color="primary" variant='h3' noWrap>
            {translate('application-name')}
          </Typography>
          <form style={{width: '100%', height: '100%', paddingTop: '20px'}}>
            <Row width='100%' height='100%' vertical={'center'}>
              <Column height='100%' width='100%' vertical={'space-around'}>
                <IntroductionColumn />
                <LoginTabs
                  visitorOption
                  orientation='vertical'
                  style={{marginLeft: '-20px'}}
                />
              </Column>
            </Row>
          </form>
        </Column>
      </Column>
    </Column>
  );
}
