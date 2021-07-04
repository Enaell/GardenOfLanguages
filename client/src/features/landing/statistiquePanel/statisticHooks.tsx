import { Ball, BallParams, MetricName } from './types';
import { useEffect, useMemo, useState } from 'react';
import { statBallSize, ballIntersections, isOnFreePlace, getGap, shapePadding, shuffleArray, plusOrMinus } from './utils';
import { LanguageType } from '../../../app/types/language';

const panelWidth = 600;
const panelHeight = 480;


function addPadding(ball: Ball, padding: { left: number, top: number }) {
  return {
    ...ball,
    center: {
      x: ball.center.x + padding.left,
      y: ball.center.y + padding.top
    },
    pos: {
      left: ball.pos.left + padding.left,
      top: ball.pos.top + padding.top
    }
  };
}

function computeBalls(initialBalls: Ball[], balls: { value: number;  title: MetricName; color: string;}[]){

  let computedBalls = [...initialBalls]

  balls.forEach((ball, index) => {
    const bRadius =  statBallSize(ball.title, ball.value) / 2;

    const bPotentialCenter = ballIntersections({
      x: computedBalls[index].pos.left + computedBalls[index].radius,
      y: computedBalls[index].pos.top + computedBalls[index].radius,
      radius: bRadius + computedBalls[index].radius
    },
    {
      x: computedBalls[index + 1].pos.left + computedBalls[index + 1].radius,
      y: computedBalls[index + 1].pos.top + computedBalls[index + 1].radius,
      radius: bRadius + computedBalls[index + 1].radius
    });

    const bCenter = isOnFreePlace({...bPotentialCenter[0], radius: bRadius }, computedBalls) ? bPotentialCenter[0]: bPotentialCenter[1];
  
    computedBalls = [...computedBalls, {
      size: bRadius * 2,
      radius: bRadius,
      center: {...bCenter},
      pos: {
        left: bCenter.x - bRadius,
        top: bCenter.y - bRadius,
      },
      gap: getGap(10, 25),
      title: ball.title,
      value: ball.value,
      color: ball.color
    }];
  });

  return computedBalls;
}

function generateBalls(balls?: { value: number;  title: MetricName; color: string;}[]) {
  if (!balls)
    return [];

  const shuffledBalls = shuffleArray(balls);

  const b1Radius = statBallSize(shuffledBalls[0].title, shuffledBalls[0].value) /2;
  const firstBall: Ball = {
    size: b1Radius * 2,
    radius: b1Radius,
    pos: {
      left: 0,
      top: 0
    },
    center: {
      x: b1Radius,
      y: b1Radius,
    },
    gap: {
      ...getGap(0, 0)
    },
    title: shuffledBalls[0].title,
    value: shuffledBalls[0].value,
    color: shuffledBalls[0].color
  };

  const b2Radius = statBallSize(shuffledBalls[1].title, shuffledBalls[1].value) / 2;
  const b2CenterX = Math.random() * (firstBall.radius + b2Radius) * plusOrMinus();
  const b2CenterY = Math.sqrt(Math.pow(b1Radius + b2Radius, 2) - Math.pow(b2CenterX, 2)) * plusOrMinus();

  const secondBall: Ball = { 
    size: b2Radius * 2,
    radius: b2Radius,
    center: {
      x: firstBall.center.x + b2CenterX,
      y: firstBall.center.y + b2CenterY
    },
    pos: {
      left: firstBall.center.x + b2CenterX - b2Radius,
      top: firstBall.center.y + b2CenterY - b2Radius
    },
    gap: getGap(10, 25),
    title: shuffledBalls[1].title,
    value: shuffledBalls[1].value,
    color: shuffledBalls[1].color
  }

  return computeBalls([firstBall, secondBall], shuffledBalls.slice(2));
}

export function useStatBalls(language: LanguageType) {

  useEffect(() => {
    const ApiBalls: BallParams = [
      {
        value: 558,
        title: 'wordNumber',
        color: '#1e42a78f'
      },
      {
        value: 3,
        title: 'cultureArticles',
        color: '#1e9aa78f'
      },
      {
        value: 2,
        title: 'learners',
        color: '#b423348f'
      },
      {
        value: 60,
        title: 'deckNumber',
        color: '#72a71e8f'
      },
      {
        value: 20,
        title: 'natives',
        color: '#a75d1e8f'
      },
    ];
    setComputedBalls(generateBalls(ApiBalls));

  }, []);

  const [computedBalls, setComputedBalls] = useState(generateBalls());
  const [shappedBalls, setShappedBalls] = useState([] as Ball[]);

  useMemo(() => {
    let padding = shapePadding(computedBalls, panelWidth, panelHeight);
    if (padding.left > 0) {
      console.log(padding);
      setShappedBalls(computedBalls.map(ball => addPadding(ball, padding)));
    } else {
      let symetricBalls = computedBalls.map(ball => {
        return {
          size: ball.size,
          radius: ball.radius,
          center: {
              x: ball.center.y,
              y: ball.center.x
          },
          pos: {
              top: ball.pos.left,
              left: ball.pos.top
          },
          gap: {
              left: ball.gap.top,
              top: ball.gap.left
          },
          title: ball.title,
          value: ball.value,
          color: ball.color
        }
      });
      padding = shapePadding(symetricBalls, panelWidth, panelHeight);
      setShappedBalls(symetricBalls.map(ball => addPadding(ball, padding)));
    };
  }, [computedBalls])

  return shappedBalls;
}
