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
  ],
  controllers: [LessonsController],
  providers: [LessonsService],
})
export class LessonsModule {}
// export class LessonsModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(EmailExistsMiddleware)
//       .forRoutes({ path: `${routes.account}`, method: RequestMethod.POST });
//   }
// }
