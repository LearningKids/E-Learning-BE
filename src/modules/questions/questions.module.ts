import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import mongoose from 'mongoose';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Question, QuestionSchema } from './entities/question.entity';
import { QuestionMetaModule } from '../question_meta/question_meta.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Question.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = QuestionSchema;
          return schema;
        },
      },
    ]),
    QuestionMetaModule,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService],
})
export class QuestionsModule {}
