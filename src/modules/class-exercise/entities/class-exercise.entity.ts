import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { EXCERCISE_TYPE_ENTITY } from 'src/core/constants';

@Schema({ versionKey: false, timestamps: true })
export class ClassExercise extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    type: Number,
    ref: 'Exercise',
    required: true,
  })
  exercises_class: number;
  @Prop({
    required: true,
    default: EXCERCISE_TYPE_ENTITY.trial_learning,
    enum: EXCERCISE_TYPE_ENTITY,
  })
  exercise_type: EXCERCISE_TYPE_ENTITY;

  @Prop({
    type: [
      {
        type: Number,
        ref: 'Class',
        required: true,
      },
    ],
  })
  class_id: number;

  @Prop({
    type: Date,
    required: true,
  })
  due_date: Date;

  @Prop({
    type: String,
    required: true,
  })
  guid: string;

  @Prop({
    type: Date,
    required: true,
  })
  lesson_date: string;
  @Prop({
    type: Number,
    required: true,
  })
  pass_score: number;
}

export type ClassExerciseDocument = ClassExercise & Document;
export const ClassExerciseSchema = SchemaFactory.createForClass(ClassExercise);

ClassExerciseSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

ClassExerciseSchema.plugin(panigate);
