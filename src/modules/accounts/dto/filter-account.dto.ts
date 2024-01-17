import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
enum ROLE {
  teacher = 'TEACHER',
  student = 'STUDENT',
}
export class FilterAccountDto extends PaginationDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    name: 'email',
    required: false,
  })
  email: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    name: 'fullname',
    required: false,
  })
  fullname: string;

  @ApiPropertyOptional({
    enum: ROLE,
  })
  @IsOptional()
  @IsEnum(ROLE)
  role?: ROLE;
}
