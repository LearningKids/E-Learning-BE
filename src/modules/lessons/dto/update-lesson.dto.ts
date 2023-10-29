import { OmitType } from '@nestjs/mapped-types';
import { CreateLessonDto } from './create-lesson.dto';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsArray, IsEnum, IsOptional, IsString } from 'class-validator';
import { LESSON_TYPE_ENTITY, SUBJECT_ENTITY } from 'src/core/constants';

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
    enum: LESSON_TYPE_ENTITY,
    default: LESSON_TYPE_ENTITY.default_lesson,
  })
  @IsOptional()
  @IsEnum(LESSON_TYPE_ENTITY)
  lesson_type?: string;

  @ApiPropertyOptional({
    description: 'Danh sách môn học',
    isArray: true,
    enum: SUBJECT_ENTITY,
    default: [SUBJECT_ENTITY.Math],
  })
  @IsOptional()
  @IsEnum(SUBJECT_ENTITY, { each: true })
  subjects?: SUBJECT_ENTITY[];

  @ApiPropertyOptional({
    description: 'Slider',
    example: 'Nội dung slider',
  })
  @IsOptional()
  @IsString()
  slider?: string;

  @ApiPropertyOptional({
    description: 'Exercises',
    example: [1, 2],
  })
  exercises?: number[];
}
