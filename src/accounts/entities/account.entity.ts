import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from 'src/role/entities/role.entity';
import { BaseEntity } from 'src/shared/base/base.entity';
export type AccountDocument = HydratedDocument<Account>;

export enum GENDER {
  Male = 'MALE',
  Female = 'FEMALE',
  Other = 'OTHER',
}
@Schema({ versionKey: false, timestamps: true })
export class Account extends BaseEntity {
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
    maxlength: 30,
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
  })
  gender: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: Role.name,
  })
  role: Role;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
