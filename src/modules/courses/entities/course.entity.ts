import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseEntity } from 'src/shared/base/base.entity';
import * as panigate from 'mongoose-paginate-v2';

@Schema({ versionKey: false, timestamps: true })
export class Course extends BaseEntity {
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
  number_lessons: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
CourseSchema.plugin(panigate);
