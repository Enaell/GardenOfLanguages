export type Circle = {
  x: number;
  y: number;
  radius: number;
}

export type Ball = {
  size: number;
  radius: number;
  center: {
    x: number,
    y: number
  }
  pos: {
    top: number;
    left: number;
  }
  gap: {
    left: number;
    top: number;
  };
  title: MetricName;
  value: number;
  color: string;
}

export type MetricName = 'wordNumber' | 'deckNumber' | 'natives' | 'learners' | 'cultureArticles';

export type BallParams = {
  value: number;
  title: MetricName,
  color: string
}[]