import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { PaginationDto } from 'src/pagination/dto/index.dto';
export class FilterNotificationDto extends PaginationDto {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    type: String,
    name: 'class_name',
    required: false,
  })
  class_name: string;

  // @IsOptional()
  // @Type(() => String)
  // @IsString()
  // @ApiProperty({
  //   type: String,
  //   name: 'teacher.fullname',
  //   required: false,
  // })
  // 'teacher.fullname': string;
}
