import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOne(id: string): Promise<User | null> {
    try {
      return await this.userModel.findById(id);
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      const existingUser = await this.userModel.findById(id);

      if (!existingUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      existingUser.set(updateUserDto);
      return existingUser.save();
    } catch (error) {
      return error;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      const deletedUser = await this.userModel.findByIdAndDelete(id);
  
      if (!deletedUser) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
