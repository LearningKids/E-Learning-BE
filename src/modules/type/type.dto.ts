import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { SUBJECT } from './dataType';

export enum Types {
  Question = 'question',
  ImageSup = 'image',
  Exercise = 'exercise',
  Subject = 'subject',
  Lesson = 'lesson',
  Course = 'course',
  Class = 'class',
  Class_Status = 'class_status',
}
enum Subject {
  math = 'math',
  english = 'english',
}

export class GetTypeDto {
  @ApiPropertyOptional({
    enum: Types,
    default: Types.Question,
  })
  @IsOptional()
  @IsEnum(Types)
  type?: Types;

  @ApiPropertyOptional({
    enum: Subject,
  })
  @IsOptional()
  @IsEnum(Subject)
  subject?: Subject;
}
