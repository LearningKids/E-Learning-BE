import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { learning_day_type } from 'src/modules/class/entities/class.entity';

export class CreateScheduleDto {
  @ApiProperty({ example: 1, description: 'Id Class' })
  @IsNotEmpty()
  @IsNumber()
  class_schedule: number;

  @ApiProperty({
    description: 'start date',
    example: '2023-12-31T17:00:00.000+00:00',
  })
  @IsNotEmpty()
  start_date: Date;

  @ApiProperty({
    description: 'end date',
    example: '2024-01-14T17:00:00.000+00:00',
  })
  @IsNotEmpty()
  end_date: Date;

  @ApiProperty({
    description: 'learning_day',
    example: [
      {
        day_of_week: '1',
        start_time: '2023-12-28T08:01:00.596Z',
        end_time: '2023-12-28T09:00:00.652Z',
      },
      {
        day_of_week: '3',
        start_time: '2023-12-28T10:00:00.639Z',
        end_time: '2023-12-28T11:00:00.542Z',
      },
    ],
  })
  @IsArray()
  learing_day: learning_day_type[];
}
