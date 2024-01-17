import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { CLASS_STATUS, CLASS_TYPES } from 'src/core/constants';
import { learning_day_type } from '../entities/class.entity';

export class CreateClassDto {
  @ApiProperty({ example: 'Toán luyện đề', description: 'Tên lớp học' })
  @IsNotEmpty()
  @IsString()
  class_name: string;

  @ApiProperty({ example: '', description: 'Ảnh lớp học' })
  @IsOptional()
  class_image: string;

  @ApiProperty({
    description: 'List teachers join',
    example: [1, 2],
  })
  @IsArray()
  teachers: number[];

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
    description: 'class types',
    example: CLASS_TYPES.offline,
    enum: CLASS_TYPES,
  })
  // @IsNotEmpty()
  // @IsEnum(CLASS_TYPES)
  // class_type: string;
  @ApiProperty({
    description: 'Room learn',
    example: 'Room 1',
  })
  @IsOptional()
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

  @ApiProperty({
    description: 'number_sessions',
    example: 10,
  })
  @IsNumber()
  @IsNotEmpty()
  number_sessions: number;

  @ApiProperty({
    description: 'learning_day',
    example: [
      {
        day_of_week: 'Thứ 2',
        start_time: '20:00',
        end_time: '22:00',
      },
    ],
  })
  @IsArray()
  learning_day: learning_day_type[];

  @ApiProperty({
    description: 'class status',
    example: CLASS_STATUS.prepare,
    enum: CLASS_STATUS,
  })
  @IsNotEmpty()
  @IsEnum(CLASS_STATUS)
  class_status: string;
}
