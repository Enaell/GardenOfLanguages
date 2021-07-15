export class ResponseLoggingUserDTO {
  readonly user :{  
    readonly username: string;
    readonly password?: string;
    readonly name: string;
    readonly language: string;
    readonly targetLanguage: string;
    readonly levels: {
      language: string;
      level: number;
    }[];
    readonly userboard: {};
    readonly createAt: Date;
  };
  readonly password: string;
}