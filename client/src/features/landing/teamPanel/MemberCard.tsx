import React, { useState } from 'react'
import { Column, Row } from '../../common/Flexbox'
import { Card, Typography, CardContent, CardMedia, IconButton } from '@material-ui/core'
import { RiFacebookFill, RiWechatFill, RiInstagramFill, RiLinkedinFill, RiMailFill } from "react-icons/ri";
import translate from 'counterpart';

const SocialIcons = ({name, size}: {name: string, size: string}) => {
  
  switch (name) {
    case translate('landingPage.teamMember.aurelien.name'):
      return (
        <>
          <IconButton><RiLinkedinFill size={size} color='blue'/></IconButton>
          <IconButton><RiMailFill size={size} color='lightblue' /></IconButton>
        </>
      )
    default: // case translate('landingPage.teamMember.lulu.name'):
      return (
        <>
          <IconButton><RiFacebookFill size={size} color='blue' /></IconButton>
          <IconButton><RiInstagramFill size={size} color='purple'/></IconButton>
          <IconButton><RiWechatFill size={size} color='green'/></IconButton>
        </> 
      )
  }
}

export const MemberCard = ({ image, name, description }: { image: string, name: string, description: string }) => {
  const [onHover, setOnHover] = useState(false);
  return (
    <Card
      onMouseOver={() => {setOnHover(true)}} 
      onMouseLeave={()=>{setOnHover(false)}}
      elevation={onHover ? 5 : 1}
      style={{width: '300px', paddingTop: '170px', marginTop: '150px'}}
    >
      <CardMedia style={{height: '300px', width: '304px', borderRadius: '50%', position: 'absolute', margin:'-320px 0 0 -2px', boxShadow:'0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)' }} image={image} />
      <Row 
        horizontal='center'
        style={{
          height: '300px',
          width: '304px',
          borderRadius: '50%',
          position: 'absolute',
          margin:'-320px 0 0 -2px',
          backgroundColor: onHover ? '#00000000': '#00000014',
          transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms'
        }}
        >
          {onHover && 
          <Row
            width='100%'
            horizontal='center'
            style={{position: 'absolute', bottom: '-50px', marginTop:'100px'}}
          ><SocialIcons size={'30px'} name={name} />
        </Row>}
      </Row>
      <CardContent>
        <Column>
          <Typography gutterBottom variant='h6' align='center'>{name}</Typography>
          <Typography variant='body1' align='justify'>{description}</Typography>
        </Column>
      </CardContent>
    </Card>
  )
}