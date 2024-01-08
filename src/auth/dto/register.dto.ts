import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';
import {RoleEnum} from 'src/users/enum/role.enum';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  dob: string;

  role: RoleEnum;
}
