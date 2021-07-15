import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from "@nestjs/microservices";
import { JwtModule } from '@nestjs/jwt';
import constants from 'src/auth/constants';


@Module({
  imports: [ClientsModule.register([{
    name: 'USER_CLIENT',
    transport: Transport.TCP,
    options: {
      host: 'users',
      port: 4010,
    }
  }]),JwtModule.register({
    secret: constants.jwtSecret,
    signOptions: { expiresIn: '2h' }
  })],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
