import {
  Body,
  Controller,
  Get,
  Query,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import routes from 'src/routes/index.route';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/modules/auth/dto/login.dto';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { RefreshTokenDto } from './dto/refreshToken.dto';
import { Public } from 'src/decorators/auth.decorators';

@ApiTags(`Auth/Login/Register`)
@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  //! Register
  @Post(`${routes.register}`)
  @ApiOperation({
    summary: 'Create a new Account_Trial',
    description: `
      * People can register account with only role STUDENT_TRIAL`,
  })
  @ApiBody({
    type: RegisterDto,
    examples: {
      account_1: {
        value: {
          email: 'cntt1912@gmail.com',
          fullname: 'NguyenCuong',
          phonenumber: '0962458201',
          password: 'Cuong1912!',
        } as RegisterDto,
      },
    },
  })
  register(@Request() req, @Body() registerDto: RegisterDto) {
    const proxyHost = `${req.protocol}://${req.get('host')}/${
      routes.confirmVerify
    }`;
    return this.authService.register(registerDto, proxyHost);
  }

  //! login
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post(`${routes.login}`)
  @ApiOperation({
    summary: 'Login Account',
    description: `
      * Login account with Email and Password`,
  })
  @ApiBody({
    type: LoginDto,
    examples: {
      account_1: {
        value: {
          identifier: 'cuongng1912@gmail.com',
          password: 'Cuong1912!',
        } as LoginDto,
      },
    },
  })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  //! login with email
  @HttpCode(200)
  @Post(`${routes.loginGoogle}`)
  async loginWithEmail() {
    return this.loginWithEmail();
  }

  //! verify account
  @HttpCode(200)
  @Post(routes.verify)
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  async verify(@Request() req, @Body() verifyDto: { email: string }) {
    const proxyHost = `${req.protocol}://${req.get('host')}/${
      routes.confirmVerify
    }`;
    return this.authService.verifyAccount(verifyDto?.email, proxyHost);
  }
  //! confirm verify
  @Get(`${routes.confirmVerify}`)
  async confirmVerify(@Query('token') token: string) {
    return this.authService.confirmVerify(token);
  }

  //! refreshToken
  @HttpCode(200)
  @Post(routes.refreshtoken)
  @ApiBody({ schema: { properties: { refreshToken: { type: 'string' } } } })
  async refreshAccessToken(@Body() refreshTokenDto: RefreshTokenDto) {
    const { refreshToken } = refreshTokenDto;
    return this.authService.getAccessToken(refreshToken);
  }
  //! forgot password
  @HttpCode(200)
  @Public()
  @Post(routes.forgotPassword)
  @ApiBody({ schema: { properties: { email: { type: 'string' } } } })
  forgotPassword(@Body() body: { email: string }) {
    return this.authService.forgotPassword(body.email.toLocaleLowerCase());
  }
}
