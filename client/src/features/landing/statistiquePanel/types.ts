import { MetricName } from "../../common/types"

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