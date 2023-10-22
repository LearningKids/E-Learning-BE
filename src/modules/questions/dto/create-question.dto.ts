import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QUESTION_TYPE_ENTITY } from 'src/core/constants';

export class AnswerDTO {
  @IsArray()
  answers: {
    answer: string;
    score: number;
  };

  @IsOptional()
  @IsString()
  image_sup?: string;
}
export class AnswerSystemDTO {
  @IsArray()
  answers: [string];

  @IsOptional()
  @IsString()
  image_sup?: string;
}
export class QuestionMetaDTO {
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

  @ApiProperty({
    example: {},
    description: 'The answer system of the question meta.',
  })
  @ValidateNested()
  @Type(() => AnswerSystemDTO)
  answer_system: AnswerSystemDTO;
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'So sanh', description: 'The name of the question.' })
  @IsString()
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
          answers: [
            { answer: '4', score: 1 },
            { answer: '6', score: 1 },
          ],
          image_sup: 'Correct image',
        },
        answer_system: {
          answers: ['7', '8'],
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
