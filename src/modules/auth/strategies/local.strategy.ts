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
      throw new NotFoundException('Tài khoản không tồn tại');
    }
    if (checkAccount.deleted_at != null) {
      throw new HttpException(
        'Tài khoản không hoạt động',
        HttpStatus.FORBIDDEN,
      );
    }
    if (checkAccount.isBlock) {
      throw new HttpException('Tài khoản bị khoá', HttpStatus.FORBIDDEN);
    }
    if (!checkAccount.isVerify) {
      throw new HttpException('Tài khoản chưa xác thực', HttpStatus.FORBIDDEN);
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
