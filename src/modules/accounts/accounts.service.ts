import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
  subjectMail = 'E-Learning-Kids send New Password to you';
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
  async remove(id: string) {
    const account = await this.accountModel.findById(id).exec();
    if (!account) {
      throw new NotFoundException(`${id} not Found`);
    }
    await this.accountModel
      .findOneAndUpdate({ _id: id }, { deleted_at: Date.now() })
      .exec();
    throw new HttpException('Delete sucess', HttpStatus.OK);
  }

  //! forgot password
  async forgotPassword(email: string) {
    const UUID: string = uuidv4();
    const passwordUser = UUID.split('-')[0];
    const newPassword = await this.authService.hashFunc(passwordUser);
    await this.getAccountByEmail(email);
    await this.accountModel.findOneAndUpdate(
      { email },
      { password: newPassword, refreshToken: null },
    );
    this.emailService.sendEmail(email, this.subjectMail, passwordUser);
    throw new HttpException('Send mail forgot password success', HttpStatus.OK);
  }
  //! change password
  async changePassword(password: string, newpassword: string, email: string) {
    const account = await this.accountModel
      .findOne({ email })
      .select('+password');
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
  //! Find Account by Email
  async getAccountByEmail(email: string): Promise<Account> {
    const account = await this.accountModel.findOne({ email });
    if (!account) {
      throw new NotFoundException(`${email} not found`);
    }
    return account;
  }
}
