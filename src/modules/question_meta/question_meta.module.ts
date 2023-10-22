import { Module } from '@nestjs/common';
import { QuestionMetaService } from './question_meta.service';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import {
  QuestionMeta,
  QuestionMetaSchema,
} from './entities/question_meta.entity';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: QuestionMeta.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = QuestionMetaSchema;
          return schema;
        },
      },
    ]),
  ],
  providers: [QuestionMetaService],
  exports: [QuestionMetaService],
})
export class QuestionMetaModule {}
