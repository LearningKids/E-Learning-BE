import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { LESSON_TYPE, SUBJECT } from 'src/core/constants';
import { HydratedDocument } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { BadRequestException } from '@nestjs/common';

@Schema({ versionKey: false, timestamps: true })
export class Lesson extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    type: String,
  })
  lesson_name: string;

  @Prop({
    required: true,
    enum: LESSON_TYPE,
    default: LESSON_TYPE.default_lesson,
  })
  lesson_type: string;

  @Prop({
    type: [
      {
        required: true,
        type: String,
        enum: SUBJECT,
        default: [],
      },
    ],
  })
  subjects: SUBJECT[];

  @Prop({
    type: String,
    required: true,
  })
  slider: string;

  @Prop({
    type: String,
    required: true,
  })
  exercises: string;

  @Prop({
    type: String,
    required: true,
  })
  homework: string;
}
export type LessonDocument = HydratedDocument<Lesson>;

export const LessonSchema = SchemaFactory.createForClass(Lesson);

LessonSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    const [fieldName, value] = Object.entries(error.keyValue)[0];
    throw new BadRequestException(`Duplicate ${[fieldName]} : ${value}`);
  } else {
    next();
  }
});
LessonSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);
LessonSchema.plugin(panigate);
