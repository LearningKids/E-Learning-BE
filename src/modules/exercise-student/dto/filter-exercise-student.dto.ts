import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional } from 'class-validator';
import { PaginationDto } from 'src/pagination/dto/index.dto';
import { status_exercise_student } from 'src/core/constants';
import { Type } from 'class-transformer';
export class FilterExerciseStudentClassDto extends PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    enum: status_exercise_student,
    name: 'status',
    required: false,
  })
  status: status_exercise_student;
}
