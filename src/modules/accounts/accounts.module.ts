import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { AccountsController } from './accounts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Account, AccountSchema } from './entities/account.entity';
import { EmailExistsMiddleware } from 'src/middlewares/checkExists/checkEmailExists.middleware';
import routes from 'src/routes/index.route';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
    AuthModule,
    EmailModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService],
  exports: [AccountsModule],
})
export class AccountsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(EmailExistsMiddleware)
      .forRoutes({ path: `${routes.account}`, method: RequestMethod.POST });
  }
}
