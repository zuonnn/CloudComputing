import { IsString, IsOptional, IsNotEmpty, MinLength } from 'class-validator';
import {Role} from '../enum/role.enum';

export class CreateUserDto {
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

  @IsOptional()
  role: Role;

}
