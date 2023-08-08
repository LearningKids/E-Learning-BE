import { OmitType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { LESSON_TYPE, SUBJECT } from 'src/core/constants';

export class UpdateLessonDto extends PartialType(
  OmitType(CreateLessonDto, [] as const),
) {
  @ApiPropertyOptional({
    description: 'Tên bài học',
    example: 'Bài học 1',
  })
  @IsOptional()
  @IsString()
  lesson_name?: string;

  @ApiPropertyOptional({
    description: 'Loại bài học',
    enum: LESSON_TYPE,
    default: LESSON_TYPE.default_lesson,
  })
  @IsOptional()
  @IsEnum(LESSON_TYPE)
  lesson_type?: string;

  @ApiPropertyOptional({
    description: 'Danh sách môn học',
    isArray: true,
    enum: SUBJECT,
    default: [SUBJECT.Math],
  })
  @IsOptional()
  @IsEnum(SUBJECT, { each: true })
  subjects?: SUBJECT[];

  @ApiPropertyOptional({
    description: 'Slider',
    example: 'Nội dung slider',
  })
  @IsOptional()
  @IsString()
  slider?: string;

  @ApiPropertyOptional({
    description: 'Exercises',
    example: 'Nội dung bài tập',
  })
  @IsOptional()
  @IsString()
  exercises?: string;

  @ApiPropertyOptional({
    description: 'Homework',
    example: 'Nội dung bài tập về nhà',
  })
  @IsOptional()
  @IsString()
  homework?: string;
}
