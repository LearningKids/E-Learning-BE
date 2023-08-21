import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ArrayNotEmpty,
  IsEnum,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { COURSE_TYPE } from 'src/core/constants';
import { Types } from 'mongoose';

export class CreateCourseDto {
  @ApiProperty({ example: 'Tên khóa học', description: 'Tên khóa học' })
  @IsNotEmpty()
  @IsString()
  course_name: string;

  @ApiProperty({ example: 'Mô tả khóa học', description: 'Mô tả khóa học' })
  @IsNotEmpty()
  @IsString()
  course_description: string;

  @ApiProperty({
    example: COURSE_TYPE.charged,
    description: 'Loại khóa học',
    enum: COURSE_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(COURSE_TYPE)
  course_type: string;

  @ApiProperty({ example: 10, description: 'Số lượng bài học' })
  @IsNotEmpty()
  @IsNumber()
  number_lessons: number;

  @ApiProperty({
    example: ['615a6e8a1e4bbf001f2a5a4c', '615a6e8a1e4bbf001f2a5a4d'],
    description: 'Nội dung bài học',
    type: [String],
  })
  @IsNotEmpty()
  @ArrayNotEmpty()
  content_lesson: Types.ObjectId[];
}
