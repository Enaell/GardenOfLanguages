import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
  imports: [AuthModule, UsersModule, DictionaryModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
