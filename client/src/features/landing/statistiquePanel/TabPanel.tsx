import React from 'react';
import { Row } from '../../common/Flexbox';
import { LanguageType } from '../../common/types';
import { StatBalls } from './StatBalls';
import { CountryPict } from './CountryPict';

type TabPanelProps = {
  language: LanguageType;
  index: any;
  value: any;
}

export const TabPanel = ({ language, value, index }: TabPanelProps) => {

  return (
    <div
      style={{position: 'absolute'}}
      role="tabpanel"
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
    >
      <Row width='100%'>
        <CountryPict language={language} isVisible={value === index}/>
        <StatBalls language={language} isVisible={value === index}/>
      </Row>
    </div>
  );
}
