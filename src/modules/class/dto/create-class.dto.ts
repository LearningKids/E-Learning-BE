import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { NumberSchemaDefinition, Types } from 'mongoose';
import { CLASS_STATUS, CLASS_TYPES } from 'src/core/constants';

export class CreateClassDto {
  @ApiProperty({ example: 'Toán luyện đề', description: 'Tên lớp học' })
  @IsNotEmpty()
  @IsString()
  class_name: string;

  @ApiProperty({ example: '', description: 'Ảnh lớp học' })
  @IsNotEmpty()
  class_image: string;

  @ApiProperty({
    description: 'Teacher id',
    example: 2,
  })
  @IsNumber()
  teacher: number;

  @ApiProperty({
    description: 'start date',
    example: '2023-09-01',
  })
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: 'end date',
    example: '2023-11-01',
  })
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({
    description: 'class status',
    example: CLASS_STATUS.prepare,
    enum: CLASS_STATUS,
  })
  @IsNotEmpty()
  @IsEnum(CLASS_STATUS)
  class_status: string;

  @ApiProperty({
    description: 'class types',
    example: CLASS_TYPES.offline,
    enum: CLASS_TYPES,
  })
  @IsNotEmpty()
  @IsEnum(CLASS_TYPES)
  class_type: string;

  @ApiProperty({
    description: 'Room learn',
    example: 'Room 1',
  })
  @IsNotEmpty()
  @IsString()
  room: string;

  @ApiProperty({
    description: 'List students join',
    example: [4],
  })
  @IsArray()
  students: number[];

  @ApiProperty({
    description: 'course id',
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  course: number;
}
