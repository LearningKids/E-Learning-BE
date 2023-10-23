import { PartialType } from '@nestjs/mapped-types';
import { CreateExcerciseDto } from './create-excercise.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EXCERCISE_TYPE_ENTITY } from 'src/core/constants';
import { Types } from 'mongoose';

export class UpdateExcerciseDto extends PartialType(
  OmitType(CreateExcerciseDto, [] as const),
) {
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
    example: 2,
  })
  @IsNumber()
  author: number;

  @ApiProperty({
    description: 'List question',
    example: [4, 5],
  })
  @ArrayNotEmpty()
  questions: number[];
}
