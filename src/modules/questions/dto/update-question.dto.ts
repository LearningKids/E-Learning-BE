import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QUESTION_TYPE_ENTITY } from 'src/core/constants';
import { AnswerDTO, CreateQuestionDto } from './create-question.dto';

export class UpdateQuestionMetaDTO {
  @ApiProperty({ example: '1', description: 'Id Question meta.' })
  @IsOptional()
  @IsNumber()
  id?: number;

  @ApiProperty({
    example: [],
    description: 'The question.',
  })
  @IsString()
  question: string;

  @ApiProperty({
    example: 'Meta image',
    description: 'The image of the question if have.',
  })
  @IsOptional()
  @IsString()
  image_sup?: string;

  @ApiProperty({
    example: {},
    description: 'The answer correct of the question meta.',
  })
  @ValidateNested()
  @Type(() => AnswerDTO)
  answer_correct: AnswerDTO;
}

export class UpdateQuestionDto extends PartialType(
  OmitType(CreateQuestionDto, [] as const),
) {
  @ApiProperty({ example: 'So sanh', description: 'The name of the question.' })
  @IsString()
  question_name: string;

  @ApiProperty({
    enum: QUESTION_TYPE_ENTITY,
    default: QUESTION_TYPE_ENTITY.compare,
    description: 'The type of the question.',
  })
  @IsEnum(QUESTION_TYPE_ENTITY)
  question_type: number;

  @ApiProperty({ example: 'Description', description: 'Question description' })
  @IsString()
  question_description: string;

  @ApiProperty({
    type: () => [UpdateQuestionMetaDTO],
    default: [],
    example: [
      {
        id: 1,
        question: '1 2 3 4 [] 5 [] 6',
        image_sup: 'Meta image',
        answer_correct: {
          answers: [
            { answer: '4', score: 1 },
            { answer: '6', score: 1 },
          ],
          image_sup: '',
        },
      },
    ],
    description: 'The supplementary information for the question.',
  })
  @ValidateNested({ each: true })
  @Type(() => UpdateQuestionMetaDTO)
  question_meta: UpdateQuestionMetaDTO[];
}
