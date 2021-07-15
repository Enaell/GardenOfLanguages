import { Blocks, RequestUserboard } from "src/types"

export class UpdateUserDTO {
  readonly username: string;
  readonly password?: string;
  readonly name?: string;
  readonly email?: string;
  readonly language?: string;
  readonly targetLanguage?: string;
  readonly levels?: {language: string, level: number}[];
  readonly userboard?: RequestUserboard;
}