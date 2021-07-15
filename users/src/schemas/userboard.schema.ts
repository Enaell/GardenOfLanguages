import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Blocks } from 'src/types';

export type UserboardDocument = Userboard & Document;

@Schema()
export class Userboard {
  @Prop({default: [
    {
      lg : {
          x : 5,
          y : 0,
          w : 6,
          h : 3
      },
      md : {
          x : 5,
          y : 0,
          w : 6,
          h : 2
      },
      sm : {
          x : 3,
          y : 0,
          w : 3,
          h : 4
      },
      xs : {
          x : 3,
          y : 0,
          w : 3,
          h : 4
      },
      name : "fastExercice",
    },
    {
      lg : {
          x : 0,
          y : 0,
          w : 3,
          h : 2
      },
      md : {
          x : 0,
          y : 0,
          w : 3,
          h : 2
      },
      sm : {
          x : 0,
          y : 0,
          w : 2,
          h : 2
      },
      xs : {
          x : 0,
          y : 0,
          w : 1,
          h : 1
      },
      name : "news",
    },
    {
      lg : {
          x : 0,
          y : 2,
          w : 3,
          h : 2
      },
      md : {
          x : 0,
          y : 2,
          w : 3,
          h : 2
      },
      sm : {
          x : 0,
          y : 2,
          w : 3,
          h : 2
      },
      xs : {
          x : 0,
          y : 1,
          w : 3,
          h : 2
      },
      name : "wordOfTheDay",
    }
  ]})
  blocks: Blocks;

  @Prop({ required: true, unique: true})
  username: string;

  @Prop({ default: Date.now })
  createAt: Date;
}

export const UserboardSchema = SchemaFactory.createForClass(Userboard);
