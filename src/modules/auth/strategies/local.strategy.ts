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
    super({ usernameField: 'email' }); // Mặc định là username, đổi sang email
  }

  async validate(email: string, password: string) {
    const checkAccount = await this.authService.getAccountByEmail(email);
    if (!checkAccount) {
      throw new NotFoundException('Email not found');
    }
    if (checkAccount.deleted_at != null) {
      throw new HttpException('Account is not active', HttpStatus.OK);
    }
    if (checkAccount.isBlock) {
      throw new HttpException('Account was block', HttpStatus.OK);
    }
    const account = await this.authService.validateAccount(email, password);
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
