import React, { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { Column } from '../../common/Flexbox';
import { LanguageType } from '../../../app/types/language';
import { useStatBalls } from './statisticHooks';
import { Ball } from './types';

const StatBall = ({ ball, isVisible }: { ball: Ball, isVisible: boolean }) => {

  const [boxStyles, setBoxStyles] = useState({
    marginTop: `${(isVisible ? ball.pos.top : ball.center.y) + ball.gap.top}px`,
    marginLeft: `${(isVisible ? ball.pos.left : ball.center.x) + ball.gap.left}px`,
    width: `${isVisible ? ball.size: 0}px`,
    height: `${isVisible ? ball.size: 0}px`,
    transition: 'width 500ms ease-in-out, height 500ms ease-in-out, margin-top 500ms ease-in-out, margin-left 500ms ease-in-out',
    borderRadius: '50%',
    backgroundColor: ball.color,
    position: 'absolute' as 'absolute',
  })
  
  const [columnStyles, setColumnStyles] = useState({
    opacity: `${isVisible ? 1 : 0}`, transition: 'opacity 500ms ease-in-out'
  })

  useEffect(() => {
    setTimeout(() => {
      setColumnStyles({ opacity: `${isVisible ? 1 : 0}`, transition: 'opacity 300ms ease-in-out' });
      setBoxStyles({
        transition: 'width 500ms ease-in-out, height 500ms ease-in-out, margin-top 500ms ease-in-out, margin-left 500ms ease-in-out',
        borderRadius: '50%',
        backgroundColor: ball.color,
        position: 'absolute' as 'absolute',  
        marginTop: `${(isVisible ? ball.pos.top : ball.center.y) + ball.gap.top}px`,
        marginLeft: `${(isVisible ? ball.pos.left : ball.center.x) + ball.gap.left}px`,
        width: `${isVisible ? ball.size: 0}px`,
        height: `${isVisible ? ball.size: 0}px`,
      });
    }, isVisible ? 500 : 0);
  }, [ball, isVisible]);

  return (
    <Box style={boxStyles} >
      <Column
        width='100%'
        height='100%'
        horizontal='center'
        vertical='center'
        style={columnStyles}
      >
          { ball.title }
          { ball.value }
        </Column>
    </Box>
  )
};

export const StatBalls = ({language, isVisible}: {language: LanguageType, isVisible: boolean}) => {

  const balls = useStatBalls(language);

  const [styles, setStyles] = useState({ opacity: isVisible ? 1 : 0 });
  
  useEffect(() => {
    setTimeout(() => setStyles({ opacity: isVisible ? 1 : 0 }), 500)
  }, [isVisible])

  return (
    <Box style={styles} width={`600px`} height={`480px`}>
      {balls.map((ball) => (
        <StatBall
          key={ball.title}
          ball={ball}
          isVisible={isVisible}
        />
      ))}
    </Box>
  );
}