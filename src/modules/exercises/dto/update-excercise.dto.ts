import { PartialType } from '@nestjs/mapped-types';
import { CreateExcerciseDto } from './create-excercise.dto';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { EXCERCISE_TYPE } from 'src/core/constants';
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
    example: EXCERCISE_TYPE.trial_learning,
    description: 'exercise type',
    enum: EXCERCISE_TYPE,
  })
  @IsNotEmpty()
  @IsEnum(EXCERCISE_TYPE)
  excercise_type: string;

  @ApiProperty({
    description: 'Author created',
    example: 'Meta author',
  })
  @IsString()
  author: Types.ObjectId;

  @ApiProperty({
    description: 'List question',
    example: [],
  })
  @ArrayNotEmpty()
  questions: Types.ObjectId[];
}
