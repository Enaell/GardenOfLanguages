import React, { useState } from 'react';
import translate from 'counterpart';
import Tabs from '@material-ui/core/Tabs';
import { Column, Row } from '../common/Flexbox';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { changeTab, logginModalState } from '../../app/redux/logginModalSlice';
import { Tab } from '@material-ui/core';
import { LogAsVisitorForm } from './LogAsVisitorForm';
import { RegisterForm } from './RegisterForm';
import { AuthForm } from './AuthForm';
import { useEffect } from 'react';

const TabsWrapper = ({ orientation, style, children }: {
  orientation: 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
<>
  {orientation === 'horizontal' 
  ? <Column  vertical={'space-between'} style={style}> {children} </Column>
  : <Row horizontal='space-between' style={{ paddingTop: '15px', ...style}}> {children} </Row>
}
</>)

export const LoginTabs = ({
  orientation,
  visitorOption,
  style,
}: {
  orientation: 'vertical' | 'horizontal';
  visitorOption?: boolean; 
  style: React.CSSProperties,
}) => {

  const dispatch = useAppDispatch();
  const tab = useAppSelector(logginModalState).tab
  
  useEffect(() => {
    if (visitorOption)
      dispatch(changeTab('visitor'));
    else
      dispatch(changeTab('register'))
  }, [])

  return (
    <TabsWrapper orientation={orientation}>
      <Tabs
        orientation={orientation}
        value={tab}
        onChange={(newTab: any) => dispatch(changeTab(newTab))}
        indicatorColor='primary'
        textColor='primary'
        centered
        style={orientation === 'vertical' ? {paddingTop: '15px'}: {}}
      >
        {visitorOption && <Tab label= {translate('connection.discover')}/>}
        <Tab label={translate('connection.signin')}/>
        <Tab label={translate('connection.login')}/>
      </Tabs>
      <Column vertical='space-around' style={{width: orientation === 'vertical' ? 'calc(100% - 160px)': 'inherit', padding: '0 20px'}}>
        {tab === 'visitor' && <LogAsVisitorForm />}
        {tab === 'register' && <RegisterForm />}
        {tab === 'auth' && <AuthForm />}  
      </Column>
    </TabsWrapper>
  )
}
