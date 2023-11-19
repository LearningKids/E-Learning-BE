import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IMAGESUP_TYPE } from 'src/core/constants';

export class CreateImagesupDto {
  @ApiProperty({
    description: 'image name',
    example: 'apple',
  })
  @IsNotEmpty()
  @IsString()
  imagesup_name: string;

  @ApiProperty({
    description: 'image type',
    enum: IMAGESUP_TYPE,
    enumName: 'ImagesupTypeEnum',
    example: IMAGESUP_TYPE.fruit,
  })
  @IsOptional()
  imagesup_type: number;

  @ApiProperty({
    description: 'image',
    example: '',
  })
  @IsString()
  imagesup: string;
}
