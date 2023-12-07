import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EXCERCISE_TYPE_ENTITY, SUBJECT_ENTITY } from 'src/core/constants';

export class CreateExcerciseDto {
  @ApiProperty({
    example: 'Exercise name',
    description: 'exercise name',
  })
  @IsNotEmpty()
  @IsString()
  exercise_name: string;

  @ApiProperty({
    example: SUBJECT_ENTITY.Math,
    description: 'exercise type',
    enum: SUBJECT_ENTITY,
  })
  @IsNotEmpty()
  @IsEnum(SUBJECT_ENTITY)
  excercise_subject: number;

  @ApiProperty({
    description: 'List question',
    example: [1, 2, 3],
  })
  @ArrayNotEmpty()
  questions: number[];
}
