import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  MaxLength,
} from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @ApiProperty({
    type: String,
    default: null,
  })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @ApiProperty({
    type: String,
    default: null,
  })
  password: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  phonenumber: string;

  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    type: String,
    default: null,
  })
  firstname: string;

  @IsNotEmpty()
  @MaxLength(20)
  @ApiProperty({
    type: String,
    default: null,
  })
  lastname: string;

  @ApiProperty({
    type: Number,
    default: 4,
  })
  role: number;
}
