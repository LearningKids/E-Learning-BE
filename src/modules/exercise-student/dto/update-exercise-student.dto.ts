import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateExerciseStudentDto {
  @ApiProperty({
    description: 'classExercise',
    example: 21,
  })
  @IsNumber()
  classExercise: number;

  @ApiProperty({
    description: 'student',
    example: 33,
  })
  @IsNumber()
  student: number;

  @ApiProperty({
    description: 'class',
    example: 29,
  })
  @IsNumber()
  class: number;

  @ApiProperty({
    description: 'answers',
    example: {
      '7_10_0': '5',
      '7_10_1': '7',
      '7_11_0': '6',
      '7_11_1': '10',
      '8_12_0': '<',
      '8_13_0': '<',
      '8_14_0': '=',
      '9_15_0': '7',
      '9_16_0': '2',
      '10_17': '9',
      '10_18': '12',
    },
  })
  @IsNotEmpty()
  answers: any;
}
