import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
  Put,
  Query,
  HttpCode,
  Req,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiBearerAuth, ApiBody, ApiQuery } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { CreateAccountDto } from './dto/create-account.dto';
import { GENDER } from './entities/account.entity';
import { BlockAccountDto } from './dto/block-account.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { Public } from 'src/decorators/auth.decorators';
import { FilterAccountDto } from './dto/filter-account.dto';
import { ResponseMessage } from 'src/decorators/response.decorators';

@Controller(`${routes.account}`)
@ApiTags(`${routes.account}`)
@ApiBearerAuth()
@UseGuards(JwtAccessTokenGuard)
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}
  //! post
  @Post()
  @ApiBody({
    type: CreateAccountDto,
    examples: {
      account_1: {
        value: {
          email: 'cntt1912@gmail.com',
          fullname: 'Nguyen Cuong',
          phonenumber: '0962458201',
          password: 'Cuong1912!',
          gender: `${GENDER.Male}`,
          date_of_birth: '1990-07-15',
          role: 1,
        } as CreateAccountDto,
      },
    },
  })
  @Roles(accessRole.accessAdmin)
  @UseGuards(RolesGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }
  //! get all
  @Get()
  @Roles(accessRole.accessAdmin)
  @UseGuards(RolesGuard)
  findAll(@Query() filter: FilterAccountDto) {
    return this.accountsService.findAll(filter);
  }
  //! get detail
  @Get(':id')
  @ResponseMessage('Succesfully')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(id);
  }
  //! update
  @Patch(':id')
  @ApiBody({
    type: CreateAccountDto,
    examples: {
      account_1: {
        value: {
          fullname: 'Nguyen Cuong',
          phonenumber: '0962458201',
          password: 'Cuong1912!',
          gender: `${GENDER.Male}`,
          date_of_birth: '1990-07-15',
          role: 1,
        } as UpdateAccountDto,
      },
    },
  })
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(id, updateAccountDto);
  }
  //! block
  @ApiBody({
    type: BlockAccountDto,
    examples: {
      block: {
        value: {
          isBlock: true,
        } as BlockAccountDto,
      },
      unBlock: {
        value: {
          isBlock: false,
        } as BlockAccountDto,
      },
    },
  })
  @Put(`:id/${routes.block}`)
  blockAccount(@Param('id') id: string, @Body() isBlock: BlockAccountDto) {
    return this.accountsService.blockAccount(id, isBlock);
  }
  //! delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(id);
  }
  //! forgot password
  @HttpCode(200)
  @Public()
  @Post(routes.forgotPassword)
  @ApiQuery({ name: 'email', required: true, type: String })
  forgotPassword(@Query('email') email: string) {
    return this.accountsService.forgotPassword(email);
  }
  //! change password
  @Put(routes.changePassword)
  @ApiQuery({ name: 'password', required: true, type: String })
  @ApiQuery({ name: 'newpassword', required: true, type: String })
  changePassword(
    @Query('password') password: string,
    @Query('newpassword') newpassword: string,
    @Req() request: any,
  ) {
    return this.accountsService.changePassword(
      password,
      newpassword,
      request.user.account?.email,
    );
  }
}
