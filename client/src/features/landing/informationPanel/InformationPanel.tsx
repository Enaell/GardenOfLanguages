import React from 'react';
import { FeatureCard } from './FeatureCard';
import { Row } from '../../common/Flexbox';

const featNames = ['exercice', 'deck', 'news', 'culture', 'discuss', 'share']


export const InformationPanel = () => {
  return (
      <Row wrap horizontal='space-around' style={{maxWidth: '1200px', paddingTop: '40px'}}>
        {featNames.map(fn => {return (<FeatureCard key={fn} name={fn}/>)})}
      </Row>
  );
}