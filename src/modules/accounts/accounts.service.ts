import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { hashFunc } from 'src/middlewares/bcrypt/bcrypt.middleware';
import { BlockAccountDto } from './dto/block-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<Account>,
  ) {}
  //! create
  async create(createAccountDto: CreateAccountDto) {
    const hashPassword = await hashFunc(createAccountDto.password);
    createAccountDto.password = hashPassword;
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }
  //! all
  async findAll(): Promise<Account[]> {
    const accounts = await this.accountModel.find().exec();
    return accounts;
  }
  //! detail
  async findOne(id: string): Promise<Account> {
    try {
      const account = await this.accountModel.findById(id);
      return account;
    } catch (error) {}
  }
  //! update
  async update(
    id: string,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    try {
      const account = await this.accountModel.findById(id);
      if (!account) {
        throw new NotFoundException(`${id} not Found`);
      }
      const accountUpdate = await this.accountModel
        .findOneAndUpdate({ _id: id }, updateAccountDto, { new: true })
        .exec();
      return accountUpdate;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //! block
  async blockAccount(id: string, dataBlock: BlockAccountDto) {
    try {
      const account = await this.accountModel.findById(id).exec();
      if (!account) {
        throw new NotFoundException(`${id} not Found`);
      }

      const accountBlock = await this.accountModel
        .findOneAndUpdate(
          { _id: id },
          { isBlock: dataBlock.isBlock },
          { new: true },
        )
        .exec();
      return accountBlock;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //! remove
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
