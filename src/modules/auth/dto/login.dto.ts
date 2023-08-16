import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
export class LoginDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    default: null,
  })
  identifier: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  password: string;
}
