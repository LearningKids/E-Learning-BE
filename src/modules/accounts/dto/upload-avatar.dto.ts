import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class UploadAvatarDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'avatar upload',
    example: '',
  })
  avatar: string;
}
