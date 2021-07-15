import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UpdateUserDTO } from './dto/update-user.dto';
import { RequestUserboard } from 'src/types';


@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_CLIENT')
    private readonly client: ClientProxy) {}

  async createUser(createUserDTO: CreateUserDTO): Promise<any> {
    try {
      Logger.log('try create user')
      Logger.log(createUserDTO)
      const user = await this.client.send(
        {role: 'user', cmd: 'create'}, 
        {...createUserDTO, name: createUserDTO.username, levels: [
          {"language": createUserDTO.language, "rank": 6},
          {"language": createUserDTO.targetLanguage, "rank": 1}
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
      
      Logger.log(user);
      return user;
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  async getUser(username: string) {
    try {
      const user = await this.client.send({role: 'user', cmd: 'get'}, {username})
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();

      Logger.log(user);
      return user
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }

  private async sendUpdateUser(
    username: string,
    updates : {
      password: string;
      name: string;
      email: string;
      language: string;
      targetLanguage: string;
      levels: {
          language: string;
          level: number;
      }[];
      username: string;
  }) {
    if (updates)
      return await this.client.send({role: 'user', cmd: 'update'}, {username, updates})
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      })).toPromise()
    return undefined;
  };

  private async sendUpdateUserboard(username: string, updates: RequestUserboard) {
    if (updates) 
      return await this.client.send({role: 'userboard', cmd: 'update'}, { username, updates })
      .pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      })).toPromise()
    return undefined;
  }

  async updateUser(username: string, userUpdates: UpdateUserDTO) {
    const  { password, name, email, language, targetLanguage, levels } = userUpdates;
    const user = { password, name, email, language, targetLanguage, levels, username };
    const { userboard } = userUpdates


    try {
      const [resUser, resUserboard] = await Promise.all([
        await this.sendUpdateUser(username, user),
        await this.sendUpdateUserboard(username, userboard)
      ]);

      Logger.log('============ Send update ===============');
      Logger.log(resUser);
      Logger.log(resUserboard);
      return resUser
    } catch(e) {
      Logger.log(e);
      throw e;
    }
  }
}
