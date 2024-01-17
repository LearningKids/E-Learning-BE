import { Module } from '@nestjs/common';
import { ClassService } from './class.service';
import { ClassController } from './class.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Class, ClassSchema } from './entities/class.entity';
import { AccountsModule } from '../accounts/accounts.module';
import mongoose from 'mongoose';
import { CoursesModule } from '../courses/courses.module';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Class.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = ClassSchema;
          return schema;
        },
      },
    ]),
    AccountsModule,
    CoursesModule,
  ],
  controllers: [ClassController],
  providers: [ClassService],
  exports: [ClassService],
})
export class ClassModule {}
