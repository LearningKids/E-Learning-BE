import { Module, forwardRef } from '@nestjs/common';
import { ExerciseStudentService } from './exercise-student.service';
import { ExerciseStudentController } from './exercise-student.controller';
import { AccountsModule } from '../accounts/accounts.module';
import {
  ExerciseStudent,
  ExerciseStudentSchema,
} from './entities/exercise-student.entity';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ClassExerciseModule } from '../class-exercise/class-exercise.module';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [
    forwardRef(() => ClassModule),
    forwardRef(() => ClassExerciseModule),
    MongooseModule.forFeatureAsync([
      {
        name: ExerciseStudent.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = ExerciseStudentSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ExerciseStudentController],
  providers: [ExerciseStudentService],
  exports: [ExerciseStudentService],
})
export class ExerciseStudentModule {}
