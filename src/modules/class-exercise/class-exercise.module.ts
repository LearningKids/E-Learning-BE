import { Module, forwardRef } from '@nestjs/common';
import { ClassExerciseService } from './class-exercise.service';
import { ClassExerciseController } from './class-exercise.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import {
  ClassExercise,
  ClassExerciseSchema,
} from './entities/class-exercise.entity';
import { ClassModule } from '../class/class.module';
import { ExcercisesModule } from '../exercises/excercises.module';
import {
  ExerciseStudent,
  ExerciseStudentSchema,
} from '../exercise-student/entities/exercise-student.entity';

@Module({
  imports: [
    forwardRef(() => ClassModule),
    forwardRef(() => ExcercisesModule),

    MongooseModule.forFeatureAsync([
      {
        name: ClassExercise.name,
        inject: [getConnectionToken()],
        useFactory: (): ModelDefinition['schema'] => {
          const schema = ClassExerciseSchema;
          return schema;
        },
      },
      {
        name: ExerciseStudent.name,
        inject: [getConnectionToken()],
        useFactory: (): ModelDefinition['schema'] => {
          const schema = ExerciseStudentSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ClassExerciseController],
  providers: [ClassExerciseService],
  exports: [ClassExerciseService],
})
export class ClassExerciseModule {}
