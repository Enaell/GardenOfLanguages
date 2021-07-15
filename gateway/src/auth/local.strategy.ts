import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<any> {
    Logger.log(email);
    const user = await this.authService.validateUser(email, password);
    if(!user) {
      Logger.log('-----------------')
      throw new UnauthorizedException();
    }

    return user;
  }
}