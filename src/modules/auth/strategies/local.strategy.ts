import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import {
  HttpStatus,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'identifier' }); // Mặc định là username, đổi sang email
  }

  async validate(identifier: string, password: string) {
    const checkAccount = await this.authService.getAccountByEmailorPhone(
      identifier,
    );
    if (!checkAccount) {
      throw new NotFoundException('Account not found');
    }
    if (checkAccount.deleted_at != null) {
      throw new HttpException('Account is not active', HttpStatus.OK);
    }
    if (checkAccount.isBlock) {
      throw new HttpException('Account was block', HttpStatus.OK);
    }
    if (!checkAccount.isVerify) {
      throw new HttpException('Account unauthenticated', HttpStatus.OK);
    }
    const account = await this.authService.validateAccount(
      identifier,
      password,
    );
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
