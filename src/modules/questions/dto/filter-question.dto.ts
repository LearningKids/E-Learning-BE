import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
export class FilterQuestiontDto extends PaginationDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    name: 'question_name',
  })
  question_name: string;

  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    name: 'personal',
  })
  personal: boolean;
}
