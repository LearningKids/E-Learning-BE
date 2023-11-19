import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';

@Schema({ versionKey: false, timestamps: true })
export class QuestionMeta extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({ type: String, required: true })
  question: string;

  @Prop({ type: String, required: false, default: null })
  image_sup: string;

  @Prop({
    type: {
      answers: [
        {
          answer: String,
          score: Number,
        },
      ],
      image_sup: {
        type: String,
        required: false,
        default: null,
      },
    },
  })
  answer_correct: {
    answer: [
      {
        answer: string;
        score: number;
      },
    ];
    image_sup: string;
  };
}

export type QuestionMetaDocument = QuestionMeta & Document;
export const QuestionMetaSchema = SchemaFactory.createForClass(QuestionMeta);

QuestionMetaSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);
