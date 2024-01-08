import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from 'src/users/enum/role.enum';

export const ROLE_KEY = 'roles';
export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLE_KEY, roles);
