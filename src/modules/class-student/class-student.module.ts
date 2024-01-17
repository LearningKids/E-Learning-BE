import { Module } from '@nestjs/common';
import { ClassStudentService } from './class-student.service';
import { ClassStudentController } from './class-student.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Class, ClassSchema } from '../class/entities/class.entity';
import mongoose from 'mongoose';
import { AccountsModule } from '../accounts/accounts.module';
import { CoursesModule } from '../courses/courses.module';

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
  controllers: [ClassStudentController],
  providers: [ClassStudentService],
})
export class ClassStudentModule {}
