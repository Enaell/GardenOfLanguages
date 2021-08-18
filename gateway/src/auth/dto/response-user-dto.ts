export class ResponseUserDTO {
  readonly username: string;
  readonly role: string;
  readonly name: string;
  readonly password: string;
  readonly language: string;
  readonly targetLanguage: string;
  readonly levels: {
    readonly language: string;
    readonly level: number;
  }[];
  readonly userboard: {};
  readonly createAt: Date;
}