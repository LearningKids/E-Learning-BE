import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(
  OmitType(CreateAccountDto, ['email', 'phonenumber', 'password'] as const),
) {
  email?: string;
  gender?: number;
  password?: string;
  fullname?: string;
  phonenumber?: string;
  role?: number;
  date_of_birth?: string;
}
