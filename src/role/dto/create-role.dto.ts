import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  @ApiProperty({
    type: Number,
    default: null,
  })
  role_type: number;

  @IsNotEmpty()
  @ApiProperty({
    type: String,
    default: null,
  })
  role_name: string;
}
