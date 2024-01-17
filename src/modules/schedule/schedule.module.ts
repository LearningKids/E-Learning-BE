import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Schedule, ScheduleSchema } from './entities/schedule.entity';
import mongoose from 'mongoose';
import { ClassModule } from '../class/class.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Schedule.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = ScheduleSchema;
          return schema;
        },
      },
    ]),
    ClassModule,
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
  exports: [ScheduleService],
})
export class ScheduleModule {}
