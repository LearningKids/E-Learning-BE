import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { Account } from 'src/modules/accounts/entities/account.entity';

@Injectable()
export class EmailExistsMiddleware implements NestMiddleware {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async use(req: Request, res: Response, next: () => void) {
    const email = req.body.email;
    const checkEmail = await this.accountModel.findOne({ email: email });

    if (checkEmail) {
      throw new HttpException(`Email ${email} already `, HttpStatus.FORBIDDEN);
    }
    next();
  }
}
