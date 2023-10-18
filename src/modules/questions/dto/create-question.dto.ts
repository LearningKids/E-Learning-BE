import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QUESTION_TYPE_ENTITY } from 'src/core/constants';
import { Types } from 'mongoose';

class AnswerDTO {
  @IsArray()
  @IsString({ each: true })
  answer: string[];

  image_sup: string;
}
class QuestionMetaDTO {
  @ApiProperty({
    example: [],
    description: 'The question.',
  })
  @IsArray()
  @IsString({ each: true })
  question: [];

  @ApiProperty({
    example: 'Meta image',
    description: 'The image of the question if have.',
  })
  image_sup?: string;

  @ApiProperty({
    example: {},
    description: 'The answer correct of the question meta.',
  })
  @ValidateNested()
  @Type(() => AnswerDTO)
  answer_correct: AnswerDTO;

  @ApiProperty({
    example: [],
    description: 'The answer system of the question meta.',
  })
  @ValidateNested()
  @Type(() => AnswerDTO)
  answer_system: AnswerDTO;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'So sanh', description: 'The name of the question.' })
  @IsString()
  @IsNotEmpty()
  question_name: string;

  @ApiProperty({
    enum: QUESTION_TYPE_ENTITY,
    default: QUESTION_TYPE_ENTITY.compare,
    description: 'The type of the question.',
  })
  @IsEnum(QUESTION_TYPE_ENTITY)
  question_type: string;

  @ApiProperty({
    type: () => [QuestionMetaDTO],
    default: [],
    example: [
      {
        question: ['1', '2', '3', '[]', '5', '[]'],
        image_sup: 'Meta image',
        answer_correct: {
          answer: ['4', '6'],
          image_sup: 'Correct image',
        },
        answer_system: {
          answer: ['6', '7', '4', '5'],
          image_sup: 'System image',
        },
      },
    ],
    description: 'The supplementary information for the question.',
  })
  @ValidateNested({ each: true })
  @Type(() => QuestionMetaDTO)
  question_meta: QuestionMetaDTO[];
}
