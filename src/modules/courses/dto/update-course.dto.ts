import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDto } from './create-course.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { COURSE_TYPE_ENTITY } from 'src/core/constants';

export class UpdateCourseDto extends PartialType(
  OmitType(CreateCourseDto, [] as const),
) {
  @ApiProperty({ example: 'Tên khóa học', description: 'Tên khóa học' })
  @IsNotEmpty()
  @IsString()
  course_name: string;

  @ApiProperty({ example: 'Mô tả khóa học', description: 'Mô tả khóa học' })
  @IsNotEmpty()
  @IsString()
  course_description: string;

  @ApiProperty({
    example: COURSE_TYPE_ENTITY.charged,
    description: 'Loại khóa học',
    enum: COURSE_TYPE_ENTITY,
  })
  @IsNotEmpty()
  @IsEnum(COURSE_TYPE_ENTITY)
  course_type: string;

  @ApiProperty({ example: 10, description: 'Số lượng bài học' })
  @IsNotEmpty()
  @IsNumber()
  number_lessons: number;

  @ApiProperty({
    example: [2],
    description: 'Nội dung bài học',
    type: [Number],
  })
  @IsNotEmpty()
  @ArrayNotEmpty()
  content_lesson: number[];
}
