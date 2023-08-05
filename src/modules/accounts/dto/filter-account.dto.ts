import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
export class FilterAccountDto extends PaginationDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
  })
  email: string;

  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
  })
  fullname: string;
}
