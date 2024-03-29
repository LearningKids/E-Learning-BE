import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { QUESTION_TYPE_ENTITY, SUBJECT_ENTITY } from 'src/core/constants';

@Schema({ versionKey: false, timestamps: true })
export class Question extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    required: true,
    type: Number,
    enum: SUBJECT_ENTITY,
    default: SUBJECT_ENTITY.Math,
  })
  subject: SUBJECT_ENTITY;

  @Prop({
    required: true,
    enum: QUESTION_TYPE_ENTITY,
    default: QUESTION_TYPE_ENTITY.completion,
  })
  question_type: number;

  @Prop({
    required: true,
    type: String,
  })
  question_name: string;

  @Prop({
    type: String,
  })
  question_description: string;
  @Prop({
    type: Number,
    ref: 'Account',
    required: true,
  })
  author: number;

  @Prop({
    type: [
      {
        type: Number,
        ref: 'QuestionMeta',
        required: true,
      },
    ],
  })
  question_meta: number[];
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);

// QuestionSchema.post('save', function (error, doc, next) {
//   if (error.code === 11000) {
//     const [fieldName, value] = Object.entries(error.keyValue)[0];
//     throw new BadRequestException(`Duplicate ${[fieldName]} : ${value}`);
//   } else {
//     next();
//   }
// });
QuestionSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

QuestionSchema.plugin(panigate);
