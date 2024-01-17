import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import paginationQuery from 'src/pagination';
import { FilterAccountDto } from './dto/filter-account.dto';
import queryFilters from 'src/pagination/filters';
import { AuthService } from '../auth/auth.service';
import { EmailService } from '../mail/mail.service';
import methodBase from 'src/helpers/methodBase';
import baseException from 'src/helpers/baseException';
import baseRoles from 'src/helpers/baseRole';

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
    const getRole = baseRoles.find((role) => role.roleName === pagination.role);
    const dataFilters = {
      ...pagination,
      role: [
        getRole?.id,
        getRole?.roleName === baseRoles[1].roleName && getRole?.id - 1,
      ],
    };
    const filters = queryFilters(getRole ? dataFilters : pagination);
    const accounts = await this.accountModel.paginate(filters, options);
    return accounts;
  }
  //! detail
  async findOne(_id: number): Promise<Account> {
    try {
      const account = await methodBase.findOneByCondition(
        { _id },
        this.accountModel,
      );
      if (!account) {
        baseException.NotFound(`account ${_id}`);
      }
      return account;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! update
  async update(
    _id: number,
    updateAccountDto: UpdateAccountDto,
  ): Promise<Account> {
    try {
      const accountUpdate = await methodBase.findOneUpdate(
        { _id },
        this.accountModel,
        updateAccountDto,
      );
      if (!accountUpdate) {
        baseException.NotFound(_id);
      }
      return accountUpdate;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! block
  async blockAccount(_id: number): Promise<Account> {
    try {
      const account = await methodBase.findOneByCondition(
        { _id },
        this.accountModel,
      );
      console.log({ account });

      if (!account) {
        baseException.NotFound(_id);
      }
      const accountBlock = await methodBase.findOneUpdate(
        { _id },
        this.accountModel,
        { isBlock: !account.isBlock },
      );
      return accountBlock;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! remove
  async remove(_id: string) {
    try {
      const accountRemove = await methodBase.remove({ _id }, this.accountModel);
      if (!accountRemove) {
        baseException.NotFound(_id);
      }
      throw new HttpException('Delete Success', HttpStatus.OK);
    } catch (error) {
      baseException.HttpException(error);
    }
  }

  //! change password
  async changePassword(password: string, newpassword: string, email: string) {
    try {
      const account = await methodBase.findOneByCondition(
        { email },
        this.accountModel,
        ['+password'],
      );
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
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! upload avatar
  async uploadAvatar(email: string, avatar: string) {
    try {
      const account = await methodBase.findOneUpdate(
        { email },
        this.accountModel,
        { avatar: avatar },
      );
      if (!account) {
        baseException.NotFound(email);
      }
      return account;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
  //! Find Account by Email
  async getAccountByEmail(email: string): Promise<Account> {
    try {
      const account = await methodBase.findOneByCondition(
        { email },
        this.accountModel,
      );
      if (!account) {
        baseException.NotFound(email);
      }
      return account;
    } catch (error) {
      baseException.HttpException(error);
    }
  }
}
