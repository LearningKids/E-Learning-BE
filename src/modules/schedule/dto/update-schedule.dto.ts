import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateScheduleDto {
  @ApiProperty({
    description: 'date',
    example: '2023-12-31T17:00:00.000Z',
  })
  @IsNotEmpty()
  date: Date;

  @ApiProperty({
    description: 'start time',
    example: '2023-12-28T08:01:00.596Z',
  })
  @IsNotEmpty()
  start_time: Date;

  @ApiProperty({
    description: 'end time',
    example: '2023-12-28T09:00:00.652Z',
  })
  @IsNotEmpty()
  end_time: string;

  @ApiProperty({ example: 'Record', description: 'record' })
  @IsString()
  link_record: string;

  @ApiProperty({ example: 'Slide', description: 'Secord' })
  @IsString()
  link_slide: string;

  @ApiProperty({ example: 'Note', description: 'note' })
  @IsString()
  note: string;

  @ApiProperty({ example: 'Content', description: 'content' })
  @IsString()
  content: string;
}
