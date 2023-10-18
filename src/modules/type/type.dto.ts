import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum Types {
  Question = 'question',
  ImageSup = 'image',
}

export class GetTypeDto {
  @ApiPropertyOptional({
    enum: Types,
    default: Types.Question,
  })
  @IsOptional()
  @IsEnum(Types)
  type?: Types;
}
