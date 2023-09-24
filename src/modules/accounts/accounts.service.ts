import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { BlockAccountDto } from './dto/block-account.dto';
import paginationQuery from 'src/pagination';
import { FilterAccountDto } from './dto/filter-account.dto';
import queryFilters from 'src/pagination/filters';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../mail/mail.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: PaginateModel<Account>,
    private authService: AuthService,
    private emailService: EmailService,
  ) {}
  //! create
  async create(createAccountDto: CreateAccountDto) {
    const hashPassword = await this.authService.hashFunc(
      createAccountDto.password,
    );
    createAccountDto.password = hashPassword;
    const createdAccount = new this.accountModel(createAccountDto);
    return createdAccount.save();
  }
  //! all
  async findAll(pagination: FilterAccountDto) {
    const options = paginationQuery(pagination.page, pagination.page_size);
    const filters = queryFilters(pagination);
    const accounts = await this.accountModel.paginate(filters, options);
    return accounts;
  }
  //! detail
  async findOne(id: number): Promise<Account> {
    try {
      const account = await this.accountModel.findOne({ id }).exec();
      return account;
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
  }
  //! update
  async update(
    id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    try {
      const account = await this.accountModel.findOne({ id }).exec();
      if (!account) {
        throw new NotFoundException(`${id} not Found`);
      }
      const accountUpdate = await this.accountModel
        .findOneAndUpdate({ id: id }, updateAccountDto, { new: true })
        .exec();
      return accountUpdate;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //! block
  async blockAccount(id: number) {
    try {
      const account = await this.accountModel.findOne({ id }).exec();
      if (!account) {
        throw new NotFoundException(`${id} not Found`);
      }
      const accountBlock = await this.accountModel
        .findOneAndUpdate(
          { id: id },
          { isBlock: !account.isBlock },
          { new: true },
        )
        .exec();
      return accountBlock;
    } catch (error) {
      throw new HttpException(`Error`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  //! remove
  async remove(id: string) {
    const account = await this.accountModel.findOne({ id }).exec();
    if (!account) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.accountModel
      .findOneAndUpdate({ id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }

  //! change password
  async changePassword(password: string, newpassword: string, email: string) {
    const account = await this.accountModel
      .findOne({ email })
      .select('+password')
      .exec();
    const checkPassword = await this.authService.generateFunc(
      password,
      account.password,
    );
    if (!checkPassword) {
      throw new BadRequestException('Password incorect');
    }
    const passwordCover = await this.authService.hashFunc(newpassword);
    await this.accountModel.findOneAndUpdate(
      { email },
      { password: passwordCover, refreshToken: null },
    );
    throw new HttpException('Change password success', HttpStatus.OK);
  }
  //! upload avatar
  async uploadAvatar(email: string, avatar: string) {
    const account = await this.accountModel.findOneAndUpdate(
      { email },
      { avatar: avatar },
      { new: true },
    );
    return account;
  }
  //! Find Account by Email
  async getAccountByEmail(email: string): Promise<Account> {
    const account = await this.accountModel.findOne({ email }).exec();
    if (!account) {
      throw new NotFoundException(`${email} not found`);
    }
    return account;
  }
}
