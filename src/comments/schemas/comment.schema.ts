import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({
    timestamps: true,
})
export class Comment {
    @Prop()
    text: string;

    @Prop()
    likes: number;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User | null

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' })
    parentId: Comment | null
}

export const CommentSchema = SchemaFactory.createForClass(Comment);