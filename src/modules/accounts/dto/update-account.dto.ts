import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAccountDto } from './create-account.dto';

export class UpdateAccountDto extends PartialType(
  OmitType(CreateAccountDto, ['email'] as const),
) {
  email?: string;
  password?: string;
  gender?: number;
  fullname?: string;
  phonenumber?: string;
  role?: number;
  date_of_birth?: string;
}
