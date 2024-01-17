import { PartialType } from '@nestjs/mapped-types';
import { CreateClassExerciseDto } from './create-class-exercise.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { EXCERCISE_TYPE_ENTITY } from 'src/core/constants';

export class UpdateClassExerciseDto extends PartialType(
  OmitType(CreateClassExerciseDto, [] as const),
) {
  @ApiProperty({ example: 1, description: 'Bài tập' })
  @IsNotEmpty()
  @IsNumber()
  exercises_class: number;

  @ApiProperty({
    description: 'exercise type',
    example: EXCERCISE_TYPE_ENTITY.homework,
    enum: EXCERCISE_TYPE_ENTITY,
  })
  @IsNotEmpty()
  @IsEnum(EXCERCISE_TYPE_ENTITY)
  exercise_type: EXCERCISE_TYPE_ENTITY;

  @ApiProperty({
    description: 'Ngày nộp',
    example: '2023-09-01',
  })
  @IsNotEmpty()
  due_date: string;

  @ApiProperty({ example: 'Guid', description: 'Hướng dẫn' })
  @IsOptional()
  guid: string;

  @ApiProperty({
    description: 'Bài tập cho ngày',
    example: '2023-09-01',
  })
  @IsNotEmpty()
  lesson_date: Date;

  @ApiProperty({ example: 0, description: 'Điểm cần để vượt qua' })
  @IsOptional()
  @IsNumber()
  pass_score: number;
}
