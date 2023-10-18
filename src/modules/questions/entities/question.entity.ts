import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { QUESTION_TYPE_ENTITY } from 'src/core/constants';
import { BadRequestException } from '@nestjs/common';

@Schema({ versionKey: false, timestamps: true })
export class Question extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    required: true,
    enum: QUESTION_TYPE_ENTITY,
  })
  question_type: string;

  @Prop({
    required: true,
    type: String,
  })
  question_name: string;

  @Prop({
    type: [
      {
        id_meta: {
          type: Number,
          unique: true,
        },
        question: [String],
        image_sup: {
          type: String,
          required: false,
          default: null,
        },
        answer_correct: {
          answer: [String],
          image_sup: {
            type: String,
            required: false,
            default: null,
          },
        },
        answer_system: {
          answer: [String],
          image_sup: {
            type: String,
            required: false,
            default: null,
          },
        },
      },
    ],
    default: [],
  })
  question_meta: [
    {
      id_meta: number;
      question: [string];
      image_sup?: string;
      answer_correct: {
        answer: string[];
        image_sup: string;
      };
      answer_system: {
        answer: string[];
        image_sup: string;
      };
    },
  ];
}

export type QuestionDocument = Question & Document;
export const QuestionSchema = SchemaFactory.createForClass(Question);

QuestionSchema.post('save', function (error, doc, next) {
  if (error.code === 11000) {
    const [fieldName, value] = Object.entries(error.keyValue)[0];
    throw new BadRequestException(`Duplicate ${[fieldName]} : ${value}`);
  } else {
    next();
  }
});
QuestionSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);

QuestionSchema.plugin(panigate);
