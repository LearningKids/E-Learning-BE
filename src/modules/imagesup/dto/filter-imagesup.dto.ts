import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
export class FilterImagesuptDto extends PaginationDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    required: false,
    name: 'imagesup_name',
  })
  imagesup_name: string;
}
