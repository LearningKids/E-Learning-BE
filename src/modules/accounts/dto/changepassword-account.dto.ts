import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class ChangePasswordDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'current password',
    example: '',
  })
  password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'new password',
    example: '',
  })
  newpassword: string;
}
