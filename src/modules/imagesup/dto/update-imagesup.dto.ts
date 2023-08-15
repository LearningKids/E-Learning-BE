import { PartialType } from '@nestjs/mapped-types';
import { CreateImagesupDto } from './create-imagesup.dto';
import { ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { IMAGESUP_TYPE } from 'src/core/constants';

export class UpdateImagesupDto extends PartialType(
  OmitType(CreateImagesupDto, [] as const),
) {
  @ApiPropertyOptional({
    description: 'image name',
    example: 'apple',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imagesup_name: string;

  @ApiPropertyOptional({
    description: 'image type',
    enum: IMAGESUP_TYPE,
    enumName: 'ImagesupTypeEnum',
    example: IMAGESUP_TYPE.fruit,
  })
  @IsOptional()
  imagesup_type: string;

  @ApiPropertyOptional({
    description: 'image',
    example: '',
  })
  @IsString()
  @IsNotEmpty()
  imagesup: string;
}
