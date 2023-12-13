import { HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}
  async getByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (user) {
      return user;
    }
    throw new HttpException('User with this username does not exist', HttpStatus.NOT_FOUND);
  }
 
  async create(userData: CreateUserDto): Promise<User> {
    const {username} = userData;
    const existingUser = await this.userModel.findOne({username});
    if (existingUser) {
      throw new HttpException('Username already exists', HttpStatus.BAD_REQUEST);
    }
    const newUser = new this.userModel(userData);
    try {
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      throw new HttpException('Failed to create user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
