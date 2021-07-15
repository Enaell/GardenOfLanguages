import { Controller, UseGuards, Get, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthGuard } from '../guards/auth.guard';
import { FindUserDTO } from './dto/find-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { ResponseUserDTO } from './dto/response-user-dto';

@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @MessagePattern({ role: 'user', cmd: 'get' })
  getUser(data: FindUserDTO): Promise<ResponseUserDTO> {
    Logger.log('Try get user');
    Logger.log(data)
    return this.userService.findOne(data.email);
  }

  @MessagePattern({ role: 'user', cmd: 'create' })
  async createUser(data: CreateUserDTO): Promise<ResponseUserDTO> {
    Logger.log('Try create user');
    Logger.log(data)
    const user = await this.userService.createUser(data);
    return user;
  }

  @MessagePattern({ role: 'user', cmd: 'update' })
  async updateUser(data: { username: string, updates: UpdateUserDTO}): Promise<ResponseUserDTO> {
    Logger.log('Try update user');
    Logger.log(data)
    const user = await this.userService.updateUser(data);
    return user;
  }

  @UseGuards(AuthGuard)
  @Get('greet') 
  async greet(): Promise<string> {
    return 'Greetings authenticated user';
  }
}