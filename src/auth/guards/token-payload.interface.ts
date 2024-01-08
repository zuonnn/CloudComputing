import { RoleEnum } from "src/users/enum/role.enum";

export interface TokenPayload {
    user_id: string;
    user_role: RoleEnum;
}