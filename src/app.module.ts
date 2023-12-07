import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from './configs/configuaration.config';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsModule } from './modules/accounts/accounts.module';
import { AuthModule } from './modules/auth/auth.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { join } from 'path';
import { ImagesupModule } from './modules/imagesup/imagesup.module';
import { UploadModule } from './modules/upload/upload.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ExcercisesModule } from './modules/exercises/excercises.module';
import { ClassModule } from './modules/class/class.module';
import { TypeModule } from './modules/type/type.module';
import { QuestionMetaModule } from './modules/question_meta/question_meta.module';
import { ClassExerciseModule } from './modules/class-exercise/class-exercise.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV == 'development' ? '.env.dev' : '.env',
      load: [database_config],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URI'),
        dbName: configService.get<string>('DATABASE_NAME'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    }),
    AuthModule,
    AccountsModule,
    LessonsModule,
    QuestionsModule,
    ExcercisesModule,
    CoursesModule,
    ClassModule,
    ClassExerciseModule,
    ImagesupModule,
    UploadModule,
    TypeModule,
    QuestionMetaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
