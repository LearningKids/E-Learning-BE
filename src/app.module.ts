import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from './configs/configuaration.config';
import { MongooseModule } from '@nestjs/mongoose';
import { RoleModule } from './role/role.module';
// import { CheckExists } from './middlewares/checkExists/checkExists.middleware';
import { AccountsModule } from './accounts/accounts.module';
import routes from './routes/index.route';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
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
    RoleModule,
    AccountsModule,
  ],
  controllers: [],
  providers: [],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(CheckExists).forRoutes(`${routes.role}`);
//   }
// }
export class AppModule {}
