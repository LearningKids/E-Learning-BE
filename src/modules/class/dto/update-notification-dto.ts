import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateNotificationClassDTO } from './create-notofication-dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateNotificationDto extends PartialType(
  OmitType(CreateNotificationClassDTO, [] as const),
) {
  @ApiProperty({ example: 'Title Notify', description: 'Notify 1' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'Content Notify', description: 'Content 1' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
