import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import {
  ModelDefinition,
  MongooseModule,
  getConnectionToken,
} from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { EmailExistsMiddleware } from 'src/middlewares/checkExists/checkEmailExists.middleware';
import routes from 'src/routes/index.route';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../mail/mail.module';
import mongoose from 'mongoose';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Account.name,
        inject: [getConnectionToken()],
        useFactory: (
          connection: mongoose.Connection,
        ): ModelDefinition['schema'] => {
          const schema = AccountSchema;
          return schema;
        },
      },
    ]),
    AuthModule,
    EmailModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsModule, AccountsService],
})
export class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmailExistsMiddleware)
      .forRoutes({ path: `${routes.account}`, method: RequestMethod.POST });
  }
}
