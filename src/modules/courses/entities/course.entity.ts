import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';
import { Types } from 'mongoose';
import {
  AutoIncrementID,
  AutoIncrementIDOptions,
} from '@typegoose/auto-increment';
import { COURSE_TYPE } from 'src/core/constants';
import { BadRequestException } from '@nestjs/common';

@Schema({ versionKey: false, timestamps: true })
export class Course extends BaseEntity {
  @Prop({ type: Number, unique: true })
  id: number;

  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  course_name: string;

  @Prop({
    required: true,
    trim: true,
    minlength: 5,
  })
  course_description: string;

  @Prop({
    required: true,
    enum: COURSE_TYPE,
    default: COURSE_TYPE.charged,
  })
  course_type: string;

  @Prop({
    type: Number,
    required: true,
  })
  number_lessons: number;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'Lesson',
      },
    ],
  })
  content_lesson: Types.ObjectId[];
}
export type CourseDocument = Course & Document;

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.pre<CourseDocument>('save', async function () {
  if (this.content_lesson.length !== this.number_lessons) {
    throw new BadRequestException(
      'Số lượng bài học không khớp với số lượng nội dung bài học',
    );
  }
});
CourseSchema.plugin(AutoIncrementID, {
  field: 'id',
  startAt: 1,
} as AutoIncrementIDOptions);

CourseSchema.plugin(panigate);
