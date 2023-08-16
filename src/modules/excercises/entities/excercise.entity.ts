import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { EXCERCISE_TYPE } from 'src/core/constants';

@Schema({ versionKey: false, timestamps: true })
export class Excercise extends BaseEntity {
  @Prop({ type: Number, unique: true })
  id: number;

  @Prop({
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
export type ExcerciseDocument = Excercise & Document;
export const ExcerciseSchema = SchemaFactory.createForClass(Excercise);

ExcerciseSchema.plugin(AutoIncrementID, {
  field: 'id',
  startAt: 1,
} as AutoIncrementIDOptions);

ExcerciseSchema.plugin(panigate);
