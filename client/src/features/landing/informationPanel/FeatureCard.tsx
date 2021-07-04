import React, { useState } from 'react';
import { Card, Typography, CardContent } from '@material-ui/core';
import { Column } from '../../common/Flexbox';
import { classes } from './styles'
import theme from '../../../app/theme';

import LayersOutlinedIcon from '@material-ui/icons/LayersOutlined';
import CardTravelIcon from '@material-ui/icons/CardTravel';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import ForumIcon from '@material-ui/icons/Forum';
import ShareIcon from '@material-ui/icons/Share';
import translate from 'counterpart';

const styles = classes(theme);
const featCard = 'landingPage.featureCards';


const FeatureCardIcon = ({featureName, onHover}: {featureName: string, onHover: boolean}) => {
  switch(featureName) {
    case 'exercice':
      return <CardTravelIcon color= {onHover ? 'secondary' : 'primary'} style={{fontSize: '3.1875rem'}} />
    case 'deck':
      return <LayersOutlinedIcon color= {onHover ? 'secondary' : 'primary'} style={{fontSize: '3.1875rem'}} />
    case 'news':
      return <LibraryBooksIcon color= {onHover ? 'secondary' : 'primary'} style={{fontSize: '3.1875rem'}} />
      case 'culture':
      return <MenuBookIcon color= {onHover ? 'secondary' : 'primary'} style={{fontSize: '3.1875rem'}} />
    case 'discuss':
      return <ForumIcon color= {onHover ? 'secondary' : 'primary'} style={{fontSize: '3.1875rem'}} />
    default: // case 'share':
      return <ShareIcon color= {onHover ? 'secondary' : 'primary'} style={{fontSize: '3.1875rem'}} />
  }
} 


export const FeatureCard = ({name}: {name: string}) => {

  const [onHover, setOnHover] = useState(false);

  return (
    <Card
      onMouseOver={() => {setOnHover(true)}} 
      onMouseLeave={()=>{setOnHover(false)}}
      style={{ ...styles.fc, ...(onHover ? styles.fcHover : {}) }}
      variant='elevation'
    >
      <Column width='100%' horizontal='center'>
        <CardContent style={{width: '280px'}}>
          <Column horizontal='center'>
            <FeatureCardIcon featureName={name} onHover={onHover}/>
            <Typography 
              variant='h6' 
              color={ onHover ? 'secondary': 'textPrimary' }
              align='center'
              style={{marginTop: '15px'}}
            >
              { translate(`${featCard}.${name}.title`) }
            </Typography>
          </Column>
          <Column horizontal='center' style={{paddingTop: '20px'}}>
            <Typography color={ onHover ? 'secondary' : 'inherit'} variant='body2' align='justify' >{ translate(`${featCard}.${name}.text`) }</Typography>
          </Column>
        </CardContent>
      </Column>
    </Card>
  )
}