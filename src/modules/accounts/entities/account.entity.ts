import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, ObjectId } from 'mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';

export enum GENDER {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}
@Schema({ versionKey: false, timestamps: true })
export class Account extends BaseEntity {
  @Prop()
  @Prop({
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
  })
  email: string;

  @Prop({ required: true, trim: true, minlength: 3, maxlength: 20 })
  firstname: string;

  @Prop({ required: true, trim: true, minlength: 3, maxlength: 20 })
  lastname: string;

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

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: false })
  isBlock: boolean;
}
export type AccountDocument = HydratedDocument<Account>;

export const AccountSchema = SchemaFactory.createForClass(Account);
