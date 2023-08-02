import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Post,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import routes from 'src/routes/index.route';
import { JwtAccessTokenGuard } from '../auth/guards/jwt.guard';
import { CreateAccountDto } from './dto/create-account.dto';
import { GENDER } from './entities/account.entity';

@Controller(`${routes.account}`)
@ApiTags(`${routes.account}`)
@ApiBearerAuth()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

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
  @UseGuards(JwtAccessTokenGuard)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountsService.create(createAccountDto);
  }

  @Get()
  @UseGuards(JwtAccessTokenGuard)
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }
}
