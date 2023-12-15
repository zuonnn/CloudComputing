import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import {Role} from './enum/role.enum';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async getByUsername(username: string): Promise<User> {
        try {
            const user = await this.userModel.findOne({ username });
            if (!user) {
                throw new HttpException('User with this username does not exist', HttpStatus.NOT_FOUND);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    private async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10);
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        try {
            const userInDb = await this.userModel.findOne({ username: createUserDto.username });
            if (userInDb) {
                throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
            }

            if (createUserDto.role && !Object.values(Role).includes(createUserDto.role)) {
                throw new HttpException('Invalid role provided', HttpStatus.BAD_REQUEST);
            }

            const hashedPassword = await this.hashPassword(createUserDto.password);
            const newUser = new this.userModel({
                ...createUserDto,
                password: hashedPassword,
                role: createUserDto.role || Role.User,
            });

            return await newUser.save();
        } catch (error) {
            throw error;
        }
    }
}
