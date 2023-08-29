import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateAccountDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    default: null,
  })
  email: string;

  @IsNotEmpty()
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
  fullname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  phonenumber: string;

  @IsNotEmpty()
  date_of_birth: string;

  @IsNotEmpty()
  @IsNumber()
  gender: number;

  @IsNotEmpty()
  role: number;
}
