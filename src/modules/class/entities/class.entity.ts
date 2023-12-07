import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { CLASS_STATUS, CLASS_TYPES } from 'src/core/constants';
import { BadRequestException } from '@nestjs/common';
import checkForDuplicateField from 'src/middlewares/checkDuplicate/checkDuplicate.middleware';

@Schema({ versionKey: false, timestamps: true })
export class Class extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  class_name: string;

  @Prop({
    required: true,
    type: String,
  })
  class_image: string;

  @Prop({
    type: Number,
    ref: 'Account',
    required: true,
  })
  teacher: number;

  @Prop({
    type: Date,
    required: true,
    default: Date.now(),
  })
  start_date: Date;

  @Prop({
    type: Date,
    required: true,
  })
  end_date: Date;

  @Prop({
    required: true,
    enum: CLASS_STATUS,
    default: CLASS_STATUS.prepare,
  })
  class_status: string;

  @Prop({
    required: true,
    enum: CLASS_TYPES,
    default: CLASS_TYPES.offline,
  })
  class_type: string;

  @Prop({
    required: true,
    type: String,
  })
  room: string;

  @Prop({
    type: [
      {
        type: Number,
        ref: 'Account',
      },
    ],
  })
  students: number[];

  @Prop({
    type: Number,
    ref: 'Course',
    required: true,
  })
  course: number;
}

export type ClassDocument = Class & Document;
export const ClassSchema = SchemaFactory.createForClass(Class);

ClassSchema.post('save', checkForDuplicateField);
ClassSchema.post('findOneAndUpdate', checkForDuplicateField);

ClassSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

ClassSchema.plugin(panigate);
