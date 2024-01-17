import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import checkForDuplicateField from 'src/middlewares/checkDuplicate/checkDuplicate.middleware';

export type schedule_type = {
  date: string;
  start_time: string;
  end_time: string;
  link_record: string;
  link_slide: string;
  note: string;
  day: number;
  isComplete: boolean;
  attendance: {
    student: {
      type: number;
      ref: 'Account';
    };
    status: 'joined' | 'off' | 'off_leave' | '';
  }[];
};

@Schema({ versionKey: false, timestamps: true })
export class Schedule extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    type: Number,
    ref: 'Class',
    required: true,
    unique: true,
  })
  class_schedule: number;

  @Prop({
    type: Array<schedule_type>,
  })
  schedule: schedule_type[];
}
export type ScheduleDocument = Schedule & Document;
export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
ScheduleSchema.post('save', checkForDuplicateField);
ScheduleSchema.post('findOneAndUpdate', checkForDuplicateField);

ScheduleSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

ScheduleSchema.plugin(panigate);
