import { Injectable, Inject, Logger, RequestTimeoutException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDTO } from './create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy,
    private readonly jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    Logger.log(email)
    Logger.log(password)
    try {
      const loggingInfo = await this.client.send({ role: 'user', cmd: 'loggin' }, { email })
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        Logger.log('===================================')
        Logger.log(err);
        return throwError(err);
      }),)
      .toPromise();

      Logger.log(loggingInfo);
      Logger.log(password);
      const allowed  = await compare(password, loggingInfo?.password)
      return allowed ? loggingInfo.user : null;
      
    } catch(e) {
      Logger.log('-----------------------------------')
      Logger.log(e);
      throw e;
    }
  }
  
  async validateToken(jwt: string) {
    return this.jwtService.verify(jwt);
  }

  async signin(createUser: CreateUserDTO): Promise<any> {
    try {
      Logger.log('try create user')
      Logger.log(createUser)
      const user = await this.client.send(
        {role: 'user', cmd: 'create'}, 
        {...createUser, name: createUser.username, levels: [
          {"language": createUser.language, "rank": 6},
          {"language": createUser.targetLanguage, "rank": 1}
        ]})
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();
      
      const loggedUser = await this.login(user);

      Logger.log('Logged User: ');
      Logger.log(loggedUser);
      return loggedUser;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async login(user) {
    // const payload = { user };
    Logger.log('AUTH login : return user with jwt Token')
    Logger.log(user);
    return {
      ...user,
      token: this.jwtService.sign(user)
    };
  }
}