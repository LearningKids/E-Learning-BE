import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { QUESTION_TYPE } from 'src/core/constants';
import { Types } from 'mongoose';

class QuestionMetaDto {
  @ApiProperty({
    example: 'Meta value',
    description: 'The value of the question meta.',
  })
  @IsString()
  value: string;

  @ApiProperty({
    example: 'Meta image',
    description: 'The image of the question meta.',
  })
  @IsString()
  image_sup: Types.ObjectId;
}

class AnswerDto {
  @ApiProperty({
    example: 'Answer value',
    description: 'The value of the answer.',
  })
  @IsString()
  value: string;

  @ApiProperty({
    example: 'Answer image',
    description: 'The image of the answer.',
  })
  @IsString()
  image_sup: Types.ObjectId;
}

class QuestionSupDto {
  @ApiProperty({ type: () => [QuestionMetaDto] })
  @ValidateNested({ each: true })
  @Type(() => QuestionMetaDto)
  question_meta: QuestionMetaDto[];

  @ApiProperty({ type: () => [AnswerDto] })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answer_correct: AnswerDto[];

  @ApiProperty({ type: () => [AnswerDto] })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answer_system: AnswerDto[];

  @ApiProperty({ type: () => [AnswerDto] })
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answer_check: AnswerDto[];
}

export class CreateQuestionDto {
  @ApiProperty({ example: 'So sanh', description: 'The name of the question.' })
  @IsString()
  @IsNotEmpty()
  question_name: string;

  @ApiProperty({
    enum: QUESTION_TYPE,
    default: QUESTION_TYPE.compare,
    description: 'The type of the question.',
  })
  @IsEnum(QUESTION_TYPE)
  question_type: string;

  @ApiProperty({
    type: () => [QuestionSupDto],
    default: [],
    example: [
      {
        question_meta: [
          {
            value: 'Meta value',
            image_sup: 'Meta image',
          },
        ],
        answer_correct: [
          {
            value: 'Correct answer',
            image_sup: 'Correct image',
          },
        ],
        answer_system: [
          {
            value: 'System answer',
            image_sup: 'System image',
          },
        ],
        answer_check: [
          {
            value: 'Check answer',
            image_sup: 'Check image',
          },
        ],
      },
    ],
    description: 'The supplementary information for the question.',
  })
  @ValidateNested({ each: true })
  @Type(() => QuestionSupDto)
  question_sup: QuestionSupDto[];
}
