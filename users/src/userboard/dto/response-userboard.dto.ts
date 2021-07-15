import { BlockDimensions } from "src/types";

export class ResponseUserboardDTO {
  readonly [key:string]: {
    lg: BlockDimensions,
    md: BlockDimensions,
    sm: BlockDimensions,
    xs: BlockDimensions
  }
}