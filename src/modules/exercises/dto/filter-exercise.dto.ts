import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
export class FilterExerciseDto extends PaginationDto {
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
    type: Boolean,
    required: false,
    name: 'personal',
  })
  personal: boolean;
}
