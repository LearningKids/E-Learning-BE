import { Module, forwardRef } from '@nestjs/common';
import { ScoreService } from './score.service';
import { ScoreController } from './score.controller';
import { ClassExerciseModule } from '../class-exercise/class-exercise.module';
import { ExerciseStudentModule } from '../exercise-student/exercise-student.module';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import {
  ClassExercise,
  ClassExerciseSchema,
} from '../class-exercise/entities/class-exercise.entity';
import mongoose from 'mongoose';
import {
  ExerciseStudent,
  ExerciseStudentSchema,
} from '../exercise-student/entities/exercise-student.entity';

@Module({
  imports: [
    forwardRef(() => ClassExerciseModule),
    forwardRef(() => ExerciseStudentModule),
    MongooseModule.forFeatureAsync([
      {
        name: ClassExercise.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = ClassExerciseSchema;
          return schema;
        },
      },
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
  controllers: [ScoreController],
  providers: [ScoreService],
})
export class ScoreModule {}
