import { Inject, Injectable, Logger, RequestTimeoutException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { timeout, catchError } from 'rxjs/operators';
import { TimeoutError, throwError } from 'rxjs';


@Injectable()
export class DictionaryService {
  constructor(
    @Inject('DICTIONARY_CLIENT')
    private readonly client: ClientProxy
  ) {}

  async createWord(createWordDTO): Promise<any> {
    try {
      const word = await this.client.send({role: 'word', cmd: 'create'}, createWordDTO).pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();
      return word;
    } catch (e) {
      Logger.error(e)
      throw e;
    }
  }

  async createDeck(createDeckDTO): Promise<any> {
    try {
      const word = await this.client.send({role: 'deck', cmd: 'create'}, createDeckDTO).pipe(
        timeout(5000), 
        catchError(err => {
        if (err instanceof TimeoutError) {
          return throwError(new RequestTimeoutException());
        }
        return throwError(err);
      }),)
      .toPromise();
      return word;
    } catch (e) {
      Logger.error(e)
      throw e;
    }
  }
}
