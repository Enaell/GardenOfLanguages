import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { UserboardModule } from './userboard/userboard.module';

@Module({
  imports: 
    [MongooseModule.forRoot('mongodb://mongo-users:27017', { useNewUrlParser: true }), UserModule, UserboardModule],
})
export class AppModule { }