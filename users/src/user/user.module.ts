import { Module } from '@nestjs/common';
import { User, UserSchema } from '../schemas/users.schema';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { Userboard, UserboardSchema } from 'src/schemas/userboard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: UserSchema},
      {name: Userboard.name, schema: UserboardSchema}
    ]),
    ClientsModule.register([{
      name: 'AUTH_CLIENT',
      transport: Transport.TCP,
      options: {
        host: 'gateway',
        port: 4020
      }
    }])
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}