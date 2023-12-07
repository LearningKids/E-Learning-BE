import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { EXCERCISE_TYPE_ENTITY, SUBJECT_ENTITY } from 'src/core/constants';
import { CreateExcerciseDto } from './create-excercise.dto';

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
    example: SUBJECT_ENTITY.Math,
    description: 'exercise type',
    enum: SUBJECT_ENTITY,
  })
  @IsNotEmpty()
  @IsEnum(SUBJECT_ENTITY)
  excercise_subject: number;

  @ApiProperty({
    description: 'List question',
    example: [4, 5],
  })
  @ArrayNotEmpty()
  questions: number[];
}
