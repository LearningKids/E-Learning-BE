import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Connection, Model } from 'mongoose';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { Account } from 'src/modules/accounts/entities/account.entity';
import baseRoles from 'src/helpers/baseRole';
import { JwtService } from '@nestjs/jwt';
import { IToken } from 'src/interfaces/Token.interface';
import { EmailService } from '../mail/mail.service';
import { roleNames } from 'src/core/constants';
import { v4 as uuidv4 } from 'uuid';
import baseException from 'src/helpers/baseException';

@Injectable()
export class AuthService {
  saltOrRounds = 10;
  subjectMail = 'Mail verify account from E-Learning-Kids';
  subjectMailForgot = 'E-Learning-Kids send New Password to you';
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
    @InjectConnection() private connection: Connection,
    private jwtService: JwtService,
    private mailService: EmailService,
  ) {}
  //! register
  async register(
    registerDto: RegisterDto,
    proxyHost: string,
  ): Promise<Account> {
    try {
      const roleStudent_Trial = baseRoles.find(
        (role) => role.roleName === roleNames.student_trial,
      );
      const hashPassword = await this.hashFunc(registerDto.password);
      registerDto.password = hashPassword;
      registerDto.role = roleStudent_Trial.id;
      const createdAccount = new this.accountModel(registerDto);
      const accountSuccess = await createdAccount.save();
      const token = this.generateAccessToken({ email: registerDto.email });
      const uri = `${proxyHost}?token=${token}`;
      this.mailService.sendEmail(
        registerDto.email,
        this.subjectMail,
        `You have to click link below to verify account: ${uri}`,
      );
      return accountSuccess;
    } catch (error) {
      throw error;
    }
  }
  //! login
  async login(account: Account) {
    const role = baseRoles.find((role) => role.id === account.role);
    const payload: IToken = {
      email: account.email,
      role: role.roleName,
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
  //! login with email
  async loginWithEmail() {
    return 'login with email';
  }
  //! verify account
  async verifyAccount(email: string, proxyHost: string) {
    const account = await this.getAccountByEmail(email);
    if (!account) {
      baseException.NotFound(email);
    }
    const token = this.generateAccessToken({ email });
    const uri = `${proxyHost}?token=${token}`;
    this.mailService.sendEmail(
      email,
      this.subjectMail,
      `You have to click link below to verify account: ${uri}`,
    );
    return 'Email send to you';
  }
  //! confirm verify
  async confirmVerify(email: string) {
    try {
      const decoded = await this.jwtService.verify(email, {
        secret: process.env.accessToken,
      });
      const account = await this.accountModel.findOneAndUpdate(
        { email: decoded.email },
        { isVerify: true },
        { new: true },
      );
      return 'account verify success';
    } catch (error) {
      throw new HttpException({ data: error }, HttpStatus.BAD_REQUEST);
    }
  }

  //! forgot password
  async forgotPassword(email: string) {
    try {
      const UUID: string = uuidv4();
      const passwordUser = UUID.split('-')[0];
      const newPassword = await this.hashFunc(passwordUser);
      await this.getAccountByEmail(email);
      const accountDetail = await this.accountModel.findOne({ email });
      if (!accountDetail) {
        baseException.NotFound(email);
      }
      await this.accountModel.findOneAndUpdate(
        { email },
        { password: newPassword, refreshToken: null },
      );
      this.mailService.sendEmail(email, this.subjectMailForgot, passwordUser);
      throw new HttpException(
        'Send mail forgot password success',
        HttpStatus.OK,
      );
    } catch (error) {
      throw error;
    }
  }

  //! getByEmail
  async getAccountByEmail(email: string): Promise<Account> {
    return await this.accountModel.findOne({ email }).exec();
  }
  //! get by email or phone
  async getAccountByEmailorPhone(identifier: string): Promise<Account> {
    return await this.accountModel
      .findOne()
      .or([{ email: identifier }, { phonenumber: identifier }])
      .exec();
  }

  //! check password
  async validateAccount(
    identifier: string,
    password: string,
  ): Promise<Account> {
    const account = await this.accountModel
      .findOne()
      .or([{ email: identifier }, { phonenumber: identifier }])
      .select('+password');
    if (account && (await this.generateFunc(password, account.password))) {
      return account;
    } else {
      throw new HttpException('Password incorect', HttpStatus.BAD_REQUEST);
    }
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
          role: 'checkRefreshToken.role',
        });
        return { accessToken: accessToken };
      }
    } catch (error) {
      throw new HttpException('RefreshToken incorrect', HttpStatus.BAD_REQUEST);
    }
  }
  //! Check_refreshToken
  async refreshTokenMatchWithAccount(
    email: string,
    refreshToken: string,
  ): Promise<Account> {
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
  generateAccessToken(payload: IToken | any) {
    return this.jwtService.sign(payload, {
      secret: `${process.env.accessToken}`,
      // expiresIn: `${process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME}s`,
    });
  }
  //! refreshToken
  generateRefreshToken(payload: IToken) {
    return this.jwtService.sign(payload, {
      secret: `${process.env.refreshToken}`,
      // expiresIn: `${process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME}s`,
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
    return isMatch;
  }
}
