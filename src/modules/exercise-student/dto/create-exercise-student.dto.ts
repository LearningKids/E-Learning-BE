import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';

export class CreateExerciseStudentDto {
  @ApiProperty({
    description: 'idClass',
    example: 17,
  })
  @IsNumber()
  idClass: number;

  @ApiProperty({
    description: 'class exercise id',
    example: 8,
  })
  @IsNumber()
  classExercise: number;
}
