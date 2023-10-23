import { Types } from 'mongoose';
import {
  IsNotEmpty,
  IsString,
  ArrayNotEmpty,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EXCERCISE_TYPE_ENTITY } from 'src/core/constants';

export class CreateExcerciseDto {
  @ApiProperty({
    example: 'Exercise name',
    description: 'exercise name',
  })
  @IsNotEmpty()
  @IsString()
  exercise_name: string;

  @ApiProperty({
    example: EXCERCISE_TYPE_ENTITY.trial_learning,
    description: 'exercise type',
    enum: EXCERCISE_TYPE_ENTITY,
  })
  @IsNotEmpty()
  @IsEnum(EXCERCISE_TYPE_ENTITY)
  excercise_type: string;

  @ApiProperty({
    description: 'Author created',
    example: 1,
  })
  @IsNumber()
  author: number;

  @ApiProperty({
    description: 'List question',
    example: [1, 2, 3],
  })
  @ArrayNotEmpty()
  questions: number[];
}
