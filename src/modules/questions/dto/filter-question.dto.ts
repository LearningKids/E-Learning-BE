import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
import { SUBJECT_ENTITY } from 'src/core/constants';
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
    enum: SUBJECT_ENTITY,
    required: false,
    name: 'subject',
  })
  subject: SUBJECT_ENTITY;

  @IsOptional()
  @ApiProperty({
    type: Boolean,
    required: false,
    name: 'personal',
  })
  personal: boolean;
}
