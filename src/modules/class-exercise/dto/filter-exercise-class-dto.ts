import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
import { EXCERCISE_TYPE_ENTITY } from 'src/core/constants';
export class FilterExerciseClassDto extends PaginationDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    name: 'exercise_name',
    required: false,
  })
  exercise_name: string;

  @IsOptional()
  @ApiProperty({
    enum: EXCERCISE_TYPE_ENTITY,
    name: 'exercise_type',
    required: false,
  })
  exercise_type: EXCERCISE_TYPE_ENTITY;
}
