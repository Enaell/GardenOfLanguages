import React from 'react';
import { Row } from '../../common/Flexbox';
import { MemberCard } from './MemberCard';

import translate from 'counterpart';

import totoroPict from './ressources/totoro.jpg';
import kikiPict from './ressources/kiki.png';

const lptm = 'landingPage.teamMember';

export const TeamPanel = () => {
  return (
    <Row wrap horizontal='space-around' width='100%' style={{maxWidth: '1200px', paddingTop: '60px'}} >
      <MemberCard image={totoroPict} name={translate(`${lptm}.aurelien.name`)} description={translate(`${lptm}.aurelien.description`)} />
      <MemberCard image={kikiPict} name={translate(`${lptm}.lulu.name`)} description={translate(`${lptm}.lulu.description`)} />
    </Row>
  )
} 