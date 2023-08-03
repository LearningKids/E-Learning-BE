import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';
export class BlockAccountDto {
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    default: true,
  })
  isBlock: boolean;
}
