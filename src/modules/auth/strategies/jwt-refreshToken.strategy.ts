import { Request } from 'express';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { IToken } from 'src/interfaces/Token.interface';

@Injectable()
export class JwtRefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'refreshToken',
) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.refreshToken}`,
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload?: IToken) {
    return await this.authService.refreshTokenMatchWithAccount(
      payload.email,
      request.headers.authorization.split('Bearer ')[1],
    );
  }
}
