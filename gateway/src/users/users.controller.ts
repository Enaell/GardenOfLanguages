import { Body, Controller, Get, HttpStatus, Logger, Param, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { AuthUser } from 'src/auth/decorators/user.decorator';
import { JWtAuthGuard } from 'src/guards/jwt-auth.guard ';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
  ){}

  @Post('/')
  async createUser(@Res() res, @Body() createUserDTO: CreateUserDTO) {
      const user = await this.usersService.createUser(createUserDTO);
      return res.status(HttpStatus.OK).json({
          message: "User has been created successfully",
          user
      })
  }

  @UseGuards(JWtAuthGuard)
  @Get('/:username')
  async getUser(
    @Res() res,
    @Param('username') username: string,
    @AuthUser() authUser
  ) {
    Logger.log(authUser) // Must update to handle roles in user microservice
    const user = await this.usersService.getUser(username);
    return res.status(HttpStatus.OK).json(user)
  }

  @UseGuards(JWtAuthGuard)
  @Patch('/:username')
  async updateUser(
    @Res() res,
    @AuthUser() authUser,
    @Body() body: UpdateUserDTO
  ) {
    const user = await this.usersService.updateUser(authUser.username, body);
    return res.status(HttpStatus.OK).json(user);
  }
}
