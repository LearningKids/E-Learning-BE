import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

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
  firstname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  lastname: string;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  phonenumber: string;

  @IsNotEmpty()
  date_of_birth: string;

  @IsNotEmpty()
  gender: string;

  @IsNotEmpty()
  role: number;
}
