import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formatUserboard } from 'src/formatter';
import { Userboard, UserboardDocument } from 'src/schemas/userboard.schema';
import { ResponseUserboardDTO } from './dto/response-userboard.dto';
import { UpdateUserboardDTO } from './dto/update-userboard.dto';

@Injectable()
export class UserboardService {
  constructor(
    @InjectModel(Userboard.name)
    private readonly userboardModel: Model<UserboardDocument>,
  ) {}

  async updateUserboard(updateUserboard: {username: string, updates: UpdateUserboardDTO}): Promise<ResponseUserboardDTO> {
    try {
      const { username, updates } = updateUserboard;
      const updatedUserboard = await this.userboardModel.findOneAndUpdate({username}, updates);
      const userboard = formatUserboard(updatedUserboard.blocks);
      Logger.log('userboard updated');
      return userboard;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
