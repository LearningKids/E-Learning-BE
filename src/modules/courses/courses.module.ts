import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Course, CourseSchema } from './entities/course.entity';
import { LessonsModule } from '../lessons/lessons.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Course.name,
        inject: [getConnectionToken()],
        useFactory: (): ModelDefinition['schema'] => {
          const schema = CourseSchema;
          return schema;
        },
      },
    ]),
    LessonsModule,
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
