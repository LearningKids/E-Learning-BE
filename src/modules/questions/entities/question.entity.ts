import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { QUESTION_TYPE } from 'src/core/constants';
import { Types } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

@Schema({ versionKey: false, timestamps: true })
export class Question extends BaseEntity {
  @Prop({ type: Number, unique: true })
  id: number;

  @Prop({
    required: true,
    enum: QUESTION_TYPE,
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
        question_meta: [
          {
            value: String,
            image_sup: {
              type: Types.ObjectId,
              ref: 'Imagesup',
            },
          },
        ],
        answer_correct: [
          {
            value: String,
            image_sup: {
              type: Types.ObjectId,
              ref: 'Imagesup',
            },
          },
        ],
        answer_system: [
          {
            value: String,
            image_sup: {
              type: Types.ObjectId,
              ref: 'Imagesup',
            },
          },
        ],
        answer_check: [
          {
            value: String,
            image_sup: {
              type: Types.ObjectId,
              ref: 'Imagesup',
            },
          },
        ],
      },
    ],
    default: [],
  })
  question_sup: {
    question_meta: [
      {
        value: string;
        image_sup: Types.ObjectId;
      },
    ];
    answer_correct: [
      {
        value: string;
        image_sup: Types.ObjectId;
      },
    ];
    answer_system: [
      {
        value: string;
        image_sup: Types.ObjectId;
      },
    ];
    answer_check: [
      {
        value: string;
        image_sup: Types.ObjectId;
      },
    ];
  }[];
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
  field: 'id',
  startAt: 1,
} as AutoIncrementIDOptions);

QuestionSchema.plugin(panigate);
