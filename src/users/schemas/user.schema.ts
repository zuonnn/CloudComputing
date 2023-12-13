import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../enum/role.enum';
import { Transform } from 'class-transformer';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Transform(({ value }) => value.toString())
    _id: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    email: string;

    @Prop()
    dob: Date;

    @Prop()
    name: string;
    
    @Prop({default: Role.User})
    roles: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);