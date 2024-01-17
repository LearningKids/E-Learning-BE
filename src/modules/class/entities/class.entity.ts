import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { CLASS_STATUS, CLASS_TYPES } from 'src/core/constants';
import checkForDuplicateField from 'src/middlewares/checkDuplicate/checkDuplicate.middleware';

export type learning_day_type = {
  day_of_week: string;
  start_time: string;
  end_time: string;
};

export type notification_type = {
  title: string;
  content: string;
};
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
    default: 'public/class/BackgroundClass.jpeg',
    type: String,
  })
  class_image: string;

  @Prop({
    type: [
      {
        type: Number,
        ref: 'Account',
      },
    ],
  })
  teachers: number[];

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
    default: CLASS_TYPES.online,
  })
  class_type: string;

  @Prop({
    type: String,
  })
  room: string;

  @Prop({
    type: Number,
    ref: 'Course',
    required: true,
  })
  course: number;

  @Prop({
    type: Array<learning_day_type>,
    required: true,
  })
  learning_day: learning_day_type[];
  @Prop({
    type: Number,
    required: true,
  })
  number_sessions: number;
  @Prop({
    type: Array<notification_type>,
    required: false,
    default: [],
  })
  notification: notification_type[];
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
