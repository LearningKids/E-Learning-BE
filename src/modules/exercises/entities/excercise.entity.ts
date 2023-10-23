import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { EXCERCISE_TYPE_ENTITY } from 'src/core/constants';
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
    enum: EXCERCISE_TYPE_ENTITY,
    default: EXCERCISE_TYPE_ENTITY.trial_learning,
  })
  excercise_type: string;

  @Prop({
    type: Number,
    ref: 'Account',
  })
  author: number;

  @Prop({
    type: [
      {
        type: Number,
        ref: 'Question',
      },
    ],
  })
  questions: number[];
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
