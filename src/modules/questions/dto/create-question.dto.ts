import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { QUESTION_TYPE_ENTITY, SUBJECT_ENTITY } from 'src/core/constants';

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

export class QuestionMetaDTO {
  @ApiProperty({
    example: '',
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

export class CreateQuestionDto {
  @ApiProperty({ example: 'So sanh', description: 'The name of the question.' })
  @IsString()
  question_name: string;

  @ApiProperty({
    enum: SUBJECT_ENTITY,
    default: SUBJECT_ENTITY.Math,
    description: 'The type of the question.',
    example: SUBJECT_ENTITY.Math,
  })
  @IsEnum(SUBJECT_ENTITY)
  subject: number;

  @ApiProperty({
    enum: QUESTION_TYPE_ENTITY,
    default: QUESTION_TYPE_ENTITY.completion,
    description: 'The type of the question.',
    example: QUESTION_TYPE_ENTITY.completion,
  })
  @IsEnum(QUESTION_TYPE_ENTITY)
  question_type: number;

  @ApiProperty({ example: 'Description', description: 'Question description' })
  @IsString()
  question_description: string;

  @ApiProperty({
    type: () => [QuestionMetaDTO],
    default: [],
    example: [
      {
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
  @Type(() => QuestionMetaDTO)
  question_meta: QuestionMetaDTO[];
}
