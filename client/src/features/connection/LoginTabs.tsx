import React from 'react';
import translate from 'counterpart';
import { Tabs } from '@material-ui/core';
import { Column, Row } from '../common/Flexbox';
import { useAppDispatch, useAppSelector } from '../../app/redux/hooks';
import { changeTab, connectionState, modalTabs } from '../../app/redux/connectionSlice';
import { Tab } from '@material-ui/core';
import { LogAsVisitorForm } from './LogAsVisitorForm';
import { RegisterForm } from './RegisterForm';
import { AuthForm } from './AuthForm';
import { useEffect } from 'react';

const TabsWrapper = ({ orientation, style, children }: {
  orientation?: 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  children: React.ReactNode;
}) => (
<>
  {orientation === 'horizontal' 
  ? <Column  vertical={'space-between'} style={style}> {children} </Column>
  : <Row horizontal='space-between' style={{ paddingTop: '15px', ...style}}> {children} </Row>
}
</>)

const connectionTypes : modalTabs[] = [ "visitor", "register", "auth" ];

export const LoginTabs = ({
  orientation = 'horizontal',
  visitorOption = false,
  style,
}: {
  orientation?: 'vertical' | 'horizontal';
  visitorOption?: boolean; 
  style?: React.CSSProperties,
}) => {

  const dispatch = useAppDispatch();
  const { tab } = useAppSelector(connectionState)
  
  return (
    <TabsWrapper style={style} orientation={orientation}>
      <Tabs
        orientation={orientation}
        value={visitorOption ? connectionTypes.indexOf(tab): connectionTypes.indexOf(tab) - 1}
        onChange={(_event, newTab: number) => {
          dispatch(changeTab(connectionTypes[newTab + (visitorOption ? 0 : 1)]))
        }}
        indicatorColor='primary'
        textColor='primary'
        centered
        style={orientation === 'vertical' ? {padding: '15px 0'}: {}}
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
