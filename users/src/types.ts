export type Blocks = {
  name: string,
  lg: BlockDimensions,
  md: BlockDimensions,
  sm: BlockDimensions,
  xs: BlockDimensions
}[]

export type BlockDimensions = {
  x: number,
  y: number,
  w: number,
  h: number
}

export type Userboard = {[key: string]: {[key:string]: BlockDimensions}}