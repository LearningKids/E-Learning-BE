import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './entities/lesson.entity';

import mongoose from 'mongoose';
import { ExcercisesModule } from '../exercises/excercises.module';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Lesson.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = LessonSchema;
          return schema;
        },
      },
    ]),
    ExcercisesModule,
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
  exports: [LessonsService],
})
export class LessonsModule {}
