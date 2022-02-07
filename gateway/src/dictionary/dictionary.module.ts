import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';
import constants from 'src/auth/constants';
import { DictionaryController } from './dictionary.controller';
import { DictionaryService } from './dictionary.service';

@Module({
  imports: [ClientsModule.register([{
    name: 'DICTIONARY_CLIENT',
    transport: Transport.TCP,
    options: {
      host: 'dictionary',
      port: 4020,
    }
  }]),JwtModule.register({
    secret: constants.jwtSecret,
    signOptions: { expiresIn: '2h' }
  })],

  controllers: [DictionaryController],
  providers: [DictionaryService]
})
export class DictionaryModule {}
