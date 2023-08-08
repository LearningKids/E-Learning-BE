import { IsString, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { SUBJECT, LESSON_TYPE } from 'src/core/constants';

export class CreateLessonDto {
  @ApiProperty({
    description: 'Tên bài học',
    example: 'Bài học 1',
  })
  @IsString()
  lesson_name: string;

  @ApiProperty({
    description: 'Loại bài học',
    enum: LESSON_TYPE,
    default: LESSON_TYPE.default_lesson,
  })
  @IsEnum(LESSON_TYPE)
  lesson_type: string;

  @ApiProperty({
    description: 'Danh sách môn học',
    isArray: true,
    enum: SUBJECT,
    default: [SUBJECT.Math],
  })
  @IsEnum(SUBJECT, { each: true })
  subjects: SUBJECT[];

  @ApiProperty({
    description: 'Slider',
    example: 'Nội dung slider',
  })
  @IsString()
  slider: string;

  @ApiProperty({
    description: 'Exercises',
    example: 'Nội dung bài tập',
  })
  @IsString()
  exercises: string;

  @ApiProperty({
    description: 'Homework',
    example: 'Nội dung bài tập về nhà',
  })
  @IsString()
  homework: string;
}
