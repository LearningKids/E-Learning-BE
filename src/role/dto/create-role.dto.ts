import { IsNotEmpty } from 'class-validator';
export class CreateRoleDto {
  @IsNotEmpty()
  role_type: number;
  @IsNotEmpty()
  role_name: string;
}
