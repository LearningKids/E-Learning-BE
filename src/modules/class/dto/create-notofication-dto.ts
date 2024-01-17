import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationClassDTO {
  @ApiProperty({ example: 1, description: 'id CLass' })
  @IsNotEmpty()
  @IsNumber()
  idClass: number;

  @ApiProperty({ example: 'Title Notify', description: 'Notify 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Content Notify', description: 'Content 1' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
