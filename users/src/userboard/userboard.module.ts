import { Module } from '@nestjs/common';
import { UserboardService } from './userboard.service';
import { UserboardController } from './userboard.controller';
import { Userboard, UserboardSchema } from 'src/schemas/userboard.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Userboard.name, schema: UserboardSchema}]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'gateway',
        port: 4020
      }
    }])
  ],
  providers: [UserboardService],
  controllers: [UserboardController]
})
export class UserboardModule {}
