import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { HydratedDocument } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { IMAGESUP_TYPE } from 'src/core/constants';
import { BadRequestException } from '@nestjs/common';
import checkForDuplicateField from 'src/middlewares/checkDuplicate/checkDuplicate.middleware';

@Schema({ versionKey: false, timestamps: true })
export class Imagesup extends BaseEntity {
  @Prop({ type: Number, unique: true })
  _id: number;

  @Prop({
    required: true,
    unique: true,
    trim: true,
    type: String,
  })
  imagesup_name: string;

  @Prop({
    required: true,
    enum: IMAGESUP_TYPE,
    default: IMAGESUP_TYPE.other,
  })
  imagesup_type: number;

  @Prop({
    required: true,
    trim: true,
    type: String,
  })
  imagesup: string;
}
export type ImagesupDocument = HydratedDocument<Imagesup>;
export const ImagesupSchema = SchemaFactory.createForClass(Imagesup);

ImagesupSchema.post('save', checkForDuplicateField);
ImagesupSchema.post('findOneAndUpdate', checkForDuplicateField);

ImagesupSchema.plugin(AutoIncrementID, {
  field: '_id',
  startAt: 1,
} as AutoIncrementIDOptions);
ImagesupSchema.plugin(panigate);
