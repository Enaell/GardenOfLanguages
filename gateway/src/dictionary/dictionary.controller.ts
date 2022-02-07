import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';

@Controller('dictionary')
export class DictionaryController {
  constructor(
    private readonly usersService: DictionaryService,
  ){}

  @Post('/words')
  async createWord(@Res() res, @Body() createUserDTO: CreateDeckDTO) {
      const user = await this.usersService.createDeck(createUserDTO);
      return res.status(HttpStatus.OK).json({
          message: "User has been created successfully",
          user
      })
  }

  @Post('/decks')
  async createDeck(@Res() res, @Body() createDeckDTO: CreateDeckDTO) {
      const user = await this.usersService.createDeck(createDeckDTO);
      return res.status(HttpStatus.OK).json({
          message: "User has been created successfully",
          user
      })
  }

}
