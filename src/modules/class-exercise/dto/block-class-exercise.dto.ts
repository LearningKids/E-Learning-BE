import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class BlockExerciseClassDto {
  @IsOptional()
  @ApiProperty({
    type: 'boolean',
    description: 'Block exercise/unLock',
    required: false,
  })
  isBlock: boolean;
}
