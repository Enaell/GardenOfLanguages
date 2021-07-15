import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { LANGUAGES } from 'src/utils';
import { Userboard } from './userboard.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, default: LANGUAGES.Fr})
  language: string

  @Prop({ required: true, default: LANGUAGES.Fr})
  targetLanguage: string

  @Prop({ required: true, default: {language: LANGUAGES.Fr, level: 1}})
  levels: {language: string, level: number}[];


  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Userboard' })
  userboard: Userboard;

  @Prop({ default: Date.now })
  createAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
