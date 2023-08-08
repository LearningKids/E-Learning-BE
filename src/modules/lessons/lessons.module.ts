import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './entities/lesson.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
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
