import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class CompleteScheduleDto {
  @ApiProperty({ example: true, description: ' status day lessson' })
  @IsNotEmpty()
  @IsBoolean()
  isComplete: number;
}
