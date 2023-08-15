import { Module } from '@nestjs/common';
import { ImagesupService } from './imagesup.service';
import { ImagesupController } from './imagesup.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Imagesup, ImagesupSchema } from './entities/imagesup.entity';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Imagesup.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = ImagesupSchema;
          return schema;
        },
      },
    ]),
  ],
  controllers: [ImagesupController],
  providers: [ImagesupService],
})
export class ImagesupModule {}
