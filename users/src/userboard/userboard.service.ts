import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { blocksToUserboard, userboardToBlocks } from 'src/formatter';
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
      const newBlocks = userboardToBlocks(updates);
      const updatedBlocks = await this.userboardModel.findOneAndUpdate({username}, {blocks: newBlocks}, {new: true});
      const userboard = blocksToUserboard(updatedBlocks.blocks);
      Logger.log('userboard updated');
      return userboard;
    } catch (e) {
      Logger.log(e);
      throw e;
    }
  }
}
