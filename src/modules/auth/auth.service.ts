import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { Account } from 'src/modules/accounts/entities/account.entity';
import baseRoles from 'src/helpers/baseRole';
import { JwtService } from '@nestjs/jwt';
import { IToken } from 'src/interfaces/Token.interface';
import { MailService } from '../mail/mail.service';
import { roleNames } from 'src/core/constants';
@Injectable()
export class AuthService {
  saltOrRounds = 10;
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<Account> {
    try {
      const roleStudent_Trial = baseRoles.find(
        (role) => (role.roleName = roleNames.student_trial),
      );
      const hashPassword = await this.hashFunc(registerDto.password);
      registerDto.password = hashPassword;
      registerDto.role = roleStudent_Trial.id;
      const createdAccount = new this.accountModel(registerDto);
      this.mailService.sendUserConfirmation(createdAccount.email, '123');
      return createdAccount.save();
    } catch (error) {
      console.log(error);
    }
  }
  async login(account: Account) {
    const payload: IToken = {
      email: account.email,
      role: account.role,
    };
    const accessToken = this.generateAccessToken(payload);
    const refreshToken = this.generateRefreshToken(payload);
    const tokenHash = await this.hashFunc(refreshToken);
    const accountLogin = await this.accountModel.findOneAndUpdate(
      { email: account.email },
      { refreshToken: tokenHash },
      { new: true },
    );
    return {
      accountLogin,
      accessToken,
      refreshToken,
    };
  }
  async getAccountByEmail(email: string) {
    return await this.accountModel.findOne({ email });
  }

  async validateAccount(email: string, password: string) {
    const account = await this.accountModel
      .findOne({ email })
      .select('+password');
    if (account && (await this.generateFunc(password, account.password))) {
      return account;
    }
    return null;
  }

  //! get AccessToken When expried
  async getAccessToken(refreshToken: string) {
    try {
      const decoded = await this.jwtService.verify(refreshToken, {
        secret: process.env.refreshToken,
      });
      const checkRefreshToken = await this.refreshTokenMatchWithAccount(
        decoded.email,
        refreshToken,
      );
      if (checkRefreshToken) {
        const accessToken = this.generateAccessToken({
          email: checkRefreshToken.email,
          role: checkRefreshToken.role,
        });
        return { accessToken: accessToken };
      }
    } catch (error) {
      throw new HttpException('RefreshToken incorrect', HttpStatus.BAD_REQUEST);
    }
  }
  //! Check_refreshToken
  async refreshTokenMatchWithAccount(email: string, refreshToken: string) {
    const account = await this.accountModel
      .findOne({ email })
      .select('+refreshToken');
    if (!account) {
      throw new UnauthorizedException();
    }
    await this.generateFunc(refreshToken, account.refreshToken);
    return account;
  }
  //! accessToken
  generateAccessToken(payload: IToken) {
    return this.jwtService.sign(payload, {
      secret: `${process.env.accessToken}`,
      expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });
  }
  //! refreshToken
  generateRefreshToken(payload: IToken) {
    return this.jwtService.sign(payload, {
      secret: `${process.env.refreshToken}`,
      expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
    });
  }
  // //! hash data
  async hashFunc(data: string): Promise<string> {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(data, saltOrRounds);
    return hash;
  }
  //! compare data
  async generateFunc(dataInput: string, dataStore: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(dataInput, dataStore);
    if (!isMatch) {
      throw new HttpException('Password incorrect', HttpStatus.BAD_REQUEST);
    }
    return isMatch;
  }
}
