import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class RefreshTokenDto {
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  refreshToken: string;
}
