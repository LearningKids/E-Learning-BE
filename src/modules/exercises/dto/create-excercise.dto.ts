import { Types } from 'mongoose';
import { IsNotEmpty, IsString, ArrayNotEmpty, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EXCERCISE_TYPE } from 'src/core/constants';

export class CreateExcerciseDto {
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
