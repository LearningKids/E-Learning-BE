import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { IsEmail } from 'class-validator';
export enum GENDER {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}
@Schema({ versionKey: false, timestamps: true })
export class Account extends BaseEntity {
  @IsEmail({}, { message: 'Email is invalid' })
  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Prop({ required: true, trim: true, minlength: 5, maxlength: 150 })
  fullname: string;

  @Prop({
    required: true,
    select: false,
    trim: true,
    minlength: 6,
    match: /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
  })
  password: string;

  @Prop({ required: true, match: /^([+]\d{2})?\d{10}$/ })
  phonenumber: string;

  @Prop({
    default:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
  })
  avatar: string;

  @Prop()
  date_of_birth: Date;

  @Prop({
    enum: GENDER,
    default: GENDER.Other,
  })
  gender: string;
  @Prop({
    default: null,
    select: false,
  })
  refreshToken: string;
  @Prop({
    default: 4,
  })
  role: number;

  @Prop({ default: false })
  isVerify: boolean;

  @Prop({ default: false })
  isBlock: boolean;
}
export type AccountDocument = HydratedDocument<Account>;

export const AccountSchema = SchemaFactory.createForClass(Account);
AccountSchema.plugin(panigate);
