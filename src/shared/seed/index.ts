import { seeder } from 'nestjs-seeder';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Account,
  AccountSchema,
} from '../../modules/accounts/entities/account.entity';
import { AccountsSeed } from '../../modules/accounts/seed/account.seed';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { database_config } from 'src/configs/configuaration.config';

seeder({
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
    MongooseModule.forFeature([{ name: Account.name, schema: AccountSchema }]),
  ],
}).run([AccountsSeed]);
