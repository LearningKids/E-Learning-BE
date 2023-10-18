import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { EXCERCISE_TYPE } from 'src/core/constants';
import { BadRequestException } from '@nestjs/common';

@Schema({ versionKey: false, timestamps: true })
export class Exercise extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    unique: true,
    required: true,
    type: String,
  })
  exercise_name: string;

  @Prop({
    required: true,
    enum: EXCERCISE_TYPE,
    default: EXCERCISE_TYPE.trial_learning,
  })
  excercise_type: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Account',
  })
  author: Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Question',
      },
    ],
  })
  questions: Types.ObjectId[];
}
export type ExcerciseDocument = Exercise & Document;
export const ExcerciseSchema = SchemaFactory.createForClass(Exercise);

ExcerciseSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    const [fieldName, value] = Object.entries(error.keyValue)[0];
    throw new BadRequestException(`Duplicate ${[fieldName]} : ${value}`);
  } else {
    next();
  }
});
ExcerciseSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

ExcerciseSchema.plugin(panigate);
