import React from 'react';
import { InformationPanel } from './informationPanel/InformationPanel';
import { TeamPanel } from './teamPanel/TeamPanel';
import { ContactPanel } from './contactPanel/ContactPanel';
import { Typography, Theme, makeStyles } from '@material-ui/core';
import translate from 'counterpart';
import { Column } from '../common/Flexbox';
import { useSelector } from 'react-redux';
import { StatisticsPanel } from './statistiquePanel/StatisticsPanel';

function sectionColor(sectionName: string, theme: Theme) {
  switch (sectionName) {
    case 'contact': 
      return {
        background: 'backgroundPrimary' as 'backgroundPrimary' | 'backgroundSecondary',
        color: 'textSecondary' as 'textSecondary' | 'textPrimary'
      };
    default:
      return {
        background: 'backgroundSecondary' as 'backgroundPrimary' | 'backgroundSecondary',
        color: 'textPrimary' as 'textSecondary' | 'textPrimary'
      }
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  backgroundPrimary: {
    backgroundColor: theme.palette.primary.main,
    padding: '50px 0 50px 0',
    margin: '30px 0 0 0'
  },
  backgroundSecondary: {
    backgroundColor: 'inherit',
    padding: '50px 0 50px 0'
  },
  textSecondary: {
    zIndex: 2,
    color: theme.palette.secondary.main,
    textTransform: 'capitalize',
    margin: '20px 0 20px 0',
    '&:after': {
      display:'block',
      content: '""',
      borderBottom: `solid 3px ${theme.palette.secondary.main}`,  
    },
  },
  textPrimary: {
    zIndex: 2,
    color: theme.palette.primary.main,
    textTransform: 'capitalize',
    margin: '20px 0 20px 0',
    '&:after': {
      display:'block',
      content: '""',
      borderBottom: `solid 3px ${theme.palette.primary.main}`,  
    },
  }
}));

const Section = ({sectionName}: {sectionName: string}) => {
  switch (sectionName) {
    case 'information':
      return <InformationPanel />
    case 'stat':
      return <StatisticsPanel />
    case 'team':
      return <TeamPanel />
    case 'contact':
      return <ContactPanel />
    default:
      return <div />
  }
}

export const SectionPaper = ({ sectionName }: { 
  sectionName: string,
}) => {

  const theme = useSelector((state: any) => state.theme);

  const classes = useStyles();

  const bgColor = sectionColor(sectionName, theme).background;
  const textColor = sectionColor(sectionName, theme).color;

  return (
    <Column className={classes[bgColor]} width='100%' horizontal='center' >
      <Typography className={classes[textColor]} variant="h3"  >
        {translate(`landingPage.sections.${sectionName}`)}
      </Typography>
      <Section sectionName={sectionName}/>
    </Column>
  )
};