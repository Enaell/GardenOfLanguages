import React from 'react';
import { Column, Row } from '../../common/Flexbox';
import { Theme, makeStyles, AppBar, Tabs, Tab } from '@material-ui/core';
import { LanguageType } from '../../common/types';
import { languages } from '../../common/utils';

import { TabPanel } from './TabPanel';


function a11yProps(language: LanguageType) {
  return {
    id: `scrollable-auto-tab-${language}`,
    'aria-controls': `scrollable-auto-tabpanel-${language}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
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
  tabsTitle: {
    width: '100px',
    paddingRight: '66px',
    fontWeight: 'bolder'
  },
  appBar: {
    position: "absolute",
    backgroundColor: '#FFFFFF9E',
    zIndex: 3, 
    width: '100px',
    height: '480px'
  },
}));

export const StatisticsPanel = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <div className={classes.background} style={{backgroundImage: `url(${getPicture(languages[value])})`}} /> */}
      <Row className={classes.root}>
        <AppBar className={classes.appBar} position="static" color="default">
          <Tabs
            orientation='vertical'
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            {languages.map(language => <Tab className={classes.tabsTitle} key={language} label={language} {...a11yProps(language)} />)}          
          </Tabs>
        </AppBar>
        <div style={{background: 'transparent', width: '1200px', height: '500px'}}>
        {languages.map((language, index) => (
            <TabPanel key={language} language={language} value={value} index={index} />
        ))}
        </div>
      </Row>
    </>
  );
}
