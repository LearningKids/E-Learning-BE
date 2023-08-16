import { Module } from '@nestjs/common';
import { ExcercisesService } from './excercises.service';
import { ExcercisesController } from './excercises.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Excercise, ExcerciseSchema } from './entities/excercise.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Excercise.name,
        inject: [getConnectionToken()],
        useFactory: (): ModelDefinition['schema'] => {
          const schema = ExcerciseSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ExcercisesController],
  providers: [ExcercisesService],
})
export class ExcercisesModule {}
