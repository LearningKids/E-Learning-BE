import { IsString, IsEnum, IsArray } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SUBJECT_ENTITY, LESSON_TYPE_ENTITY } from 'src/core/constants';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Tên bài học',
    example: 'Bài học 1',
  })
  @IsString()
  lesson_name: string;

  // @ApiProperty({
  //   description: 'Loại bài học',
  //   enum: LESSON_TYPE_ENTITY,
  //   default: LESSON_TYPE_ENTITY.default_lesson,
  // })
  // @IsEnum(LESSON_TYPE_ENTITY)
  // lesson_type: string;

  @ApiProperty({
    description: 'Danh sách môn học',
    isArray: true,
    enum: SUBJECT_ENTITY,
    default: [SUBJECT_ENTITY.Math],
  })
  @IsEnum(SUBJECT_ENTITY, { each: true })
  subjects: SUBJECT_ENTITY[];

  @ApiProperty({
    description: 'Slider',
    example: 'Nội dung slider',
  })
  @IsString()
  slider: string;

  // @ApiProperty({
  //   description: 'Exercises',
  //   example: [1, 2],
  // })
  // @IsArray()
  // exercises: number[];
}
