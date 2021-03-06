import { Controller, Post, UseGuards, Request, Logger, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JWtAuthGuard } from 'src/guards/jwt-auth.guard ';
import { AuthUser } from './decorators/user.decorator';
import { SigninDTO } from './dto/create-user.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() res) {
    Logger.log('before Login')
    const user = await this.authService.login(req.user);
    return res.status(HttpStatus.OK).json({message: "User logged", statusCode: 200, user})
  }
  
  @Post('/signin')
  async signin(@Res() res, @Body() createUserDTO: SigninDTO) {
      const user = await this.authService.signin(createUserDTO);
      // const loggedUser = await this.authService.login(user)
      return res.status(HttpStatus.OK).json({
          message: "User has been created successfully",
          user
      })
  }
}