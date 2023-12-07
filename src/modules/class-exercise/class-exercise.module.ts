import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: ClassExercise.name,
        inject: [getConnectionToken()],
        useFactory: (): ModelDefinition['schema'] => {
          const schema = ClassExerciseSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ClassExerciseController],
  providers: [ClassExerciseService],
})
export class ClassExerciseModule {}
