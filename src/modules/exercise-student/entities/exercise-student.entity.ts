import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { status_exercise_student } from 'src/core/constants';

export interface IAnswerMeta {
  answer: string;
  score: number;
  question: number;
  question_meta: number;
  index: number;
}

@Schema({ versionKey: false, timestamps: true })
export class ExerciseStudent extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    type: Number,
    ref: 'ClassExercise',
    required: true,
  })
  classExercise: number;

  @Prop({
    type: Number,
    ref: 'Account',
    required: true,
  })
  student: number;

  @Prop({
    type: String,
    default: '',
  })
  score: string;

  @Prop({
    type: String,
    default: '',
  })
  percent_score: string;

  @Prop({
    enum: status_exercise_student,
    default: status_exercise_student.cando,
  })
  status: status_exercise_student;

  @Prop({
    type: [
      {
        type: Number,
        ref: 'Question',
      },
    ],
  })
  questions: number[];

  @Prop({
    type: Array<IAnswerMeta>,
    default: [],
  })
  answer_meta: IAnswerMeta[];
}

export type ExerciseStudentDocument = ExerciseStudent & Document;
export const ExerciseStudentSchema =
  SchemaFactory.createForClass(ExerciseStudent);

ExerciseStudentSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

ExerciseStudentSchema.plugin(panigate);
