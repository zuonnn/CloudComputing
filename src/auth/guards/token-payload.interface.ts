import { RoleEnum } from "src/users/enum/role.enum";

export interface TokenPayload {
    id: string;
    role: RoleEnum;
}