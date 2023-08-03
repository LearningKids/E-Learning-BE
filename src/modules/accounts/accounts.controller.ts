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
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { CreateAccountDto } from './dto/create-account.dto';
import { GENDER } from './entities/account.entity';
import { BlockAccountDto } from './dto/block-account.dto';
import { RolesGuard } from '../auth/guards/role.guard';
import { Roles, accessRole } from 'src/decorators/roles.decorators';
import { Public } from 'src/decorators/auth.decorators';

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
          firstname: 'Cuong',
          lastname: 'Nguyen',
          phonenumber: '0962458201',
          password: 'Cuong1912!',
          gender: `${GENDER.Male}`,
          date_of_birth: '1990-07-15',
          role: 1,
        } as CreateAccountDto,
      },
    },
  })
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }
  //! get all
  @Get()
  @Roles(accessRole.accessAdmin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAccessTokenGuard)
  findAll() {
    return this.accountsService.findAll();
  }
  //! get detail
  @Get(':id')
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
          firstname: 'Cuong',
          lastname: 'Nguyen',
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
  @Put(':id/block')
  blockAccount(@Param('id') id: string, @Body() isBlock: BlockAccountDto) {
    return this.accountsService.blockAccount(id, isBlock);
  }
  //! delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
