import { MetricName } from "../../common/types";
import { plusOrMinus } from "../../common/utils";
import { Ball, Circle } from "./types";

const ballMaxSize = 250;
const ballMinSize = 100;

export function ballIntersections(c1: Circle,c2: Circle) // c = [abscisse,ordonnée,rayon]
{
    if (c1.y === c2.y) // Pythagore
    {
        const distance = Math.abs(c1.x - c2.x);
        const x = (Math.pow(c2.radius, 2)-Math.pow(distance,2)-Math.pow(c1.radius, 2))/(-2 * distance);
        const y = Math.sqrt(Math.pow(c2.radius,2)-Math.pow(distance - x, 2));
        return [{x, y}, {x, y: - y}]
    }

    const a = (Math.pow(c2.x, 2) + Math.pow(c2.y, 2) - Math.pow(c2.radius, 2) - Math.pow(c1.x, 2) - Math.pow(c1.y, 2) + Math.pow(c1.radius,2)) / (2 * (c2.y - c1.y));
    const d = (c2.x - c1.x) / (c2.y - c1.y);
    const A = Math.pow(d, 2) + 1;
    const B = -2 * c1.x + 2 * c1.y * d - 2 * a * d;
    const C = Math.pow(c1.x, 2) + Math.pow(c1.y, 2) - 2 * c1.y * a + Math.pow(a,2) - Math.pow(c1.radius,2);
    const delta = Math.pow(B, 2) - 4 * A * C;
    const x1 = (Math.sqrt(delta) - B) / (2 * A);
    const x2 = (-Math.sqrt(delta) - B) / (2 * A);
    const y1 = a - ((Math.sqrt(delta) -B) / ( 2 * A )) * d;
    const y2 = a - ((-Math.sqrt(delta) -B) / (2 * A)) * d;
    
    return [{x: x1, y: y1}, {x: x2, y: y2}]; // coordonnées des deux points d'intersection [abscisse,ordonnée] (nb : seront identiques si les cercles ne se touchent qu'en un seul point)
}

export function isOnFreePlace(newCircle: Circle, circles: Ball[]) {
  return !circles.some(circle => Math.pow(newCircle.x - circle.center.x, 2) + Math.pow(newCircle.y - circle.center.y, 2) < Math.pow(circle.radius, 2) 
  || Math.pow(circle.center.x - newCircle.x, 2) + Math.pow(circle.center.y - newCircle.y, 2) < Math.pow(newCircle.radius, 2) );
}

export function statBallSize(title: MetricName, value: number) {
  const maxRatio = {
    wordNumber: 500,
    deckNumber: 100,
    natives: 10,
    learners: 5,
    cultureArticles: 5,
  }
  const ratio = Math.min(value / maxRatio[title], 1);

  const size = ballMaxSize * ratio;

  return size > ballMinSize ? size : ballMinSize;
};

export function shapePadding(balls: Ball[], width: number, height: number){

  const border = balls.reduce((acc, ball) => {
    const min = {
      x: acc.min.x < ball.pos.left ? acc.min.x : ball.pos.left,
      y: acc.min.y < ball.pos.top ? acc.min.y : ball.pos.top
    };
    const max = {
      x: acc.max.x > (ball.pos.left + ball.size) ? acc.max.x : ball.pos.left + ball.size,
      y: acc.max.y > (ball.pos.top + ball.size) ? acc.max.y : ball.pos.top + ball.size
    }
    return {min, max};
  }, {min: {x: 0, y: 0}, max: {x: 0, y: 0}});

  return {
    left: (width - (border.max.x - border.min.x)) / 2 - border.min.x,
    top: (height - (border.max.y - border.min.y)) / 2 - border.min.y
  }
};

export function getGap( minGap: number, maxGap: number){
  if (maxGap < minGap)
    maxGap = minGap;
  const radius = maxGap > minGap ? Math.random() * (maxGap - minGap) + minGap : minGap
  const x =  Math.random()  * radius * plusOrMinus();
  const y = Math.sqrt(radius * radius - x * x) * plusOrMinus();

  return {left : x, top: y}
}