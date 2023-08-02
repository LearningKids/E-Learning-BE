import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { RegisterDto } from '../auth/dto/register.dto';
import { LoginDto } from '../auth/dto/login.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import baseRoles from 'src/helpers/baseRole';
import {
  generateFunc,
  hashFunc,
} from 'src/middlewares/bcrypt/bcrypt.middleware';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const hashPassword = await hashFunc(createAccountDto.password);
    createAccountDto.password = hashPassword;
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
  //! Find Account by Email
  async getAccountByEmail(email: string): Promise<Account> {
    const account = await this.accountModel.findOne({ email });
    if (!account) {
      throw new HttpException(`${email} not found `, HttpStatus.NOT_FOUND);
    }
    return account;
  }
}
