import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "../../users/schemas/user.schema";
import { Comment } from "../../comments/schemas/comment.schema";

export class CreateCommentDto {
    @IsNotEmpty()
    @IsString()
    text:string

    @IsNotEmpty()
    @IsNumber()
    likes: number

    @IsNotEmpty()
    @IsString()
    userId:string

    parentId: null|string
}
