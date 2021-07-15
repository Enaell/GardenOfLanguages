export type Blocks = {
  name: string,
  lg: BlockDimensions,
  md: BlockDimensions,
  sm: BlockDimensions,
  xs: BlockDimensions
}[]

type BlockDimensions = {
  x: number,
  y: number,
  w: number,
  h: number
}

export type RequestUserboard = {
  [key:string]: {
    lg: BlockDimensions,
    md: BlockDimensions,
    sm: BlockDimensions,
    xs: BlockDimensions
  }
}