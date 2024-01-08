import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async register(registrationData: RegisterDto) {
    try {
      const user = await this.usersService.create(registrationData);
      return {
        message: `User ${registrationData.username} registered successfully`,
      };
    } catch (error) {
      throw new HttpException('Registration failed ' + error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(loginDto: LoginDto, res: Response) {
    try {
      const user = await this.usersService.getByUsername(loginDto.username);
      if (!user) {
        throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
      }

      const isPasswordMatching = await bcrypt.compare(loginDto.password, user.password);
      if (!isPasswordMatching) {
        throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
      }

      const payload = { id: user._id, role: user.role };
      const token = this.jwtService.sign(payload);
      
      res.cookie('authentication', token, {
        maxAge: 1000* 3600,
      })

      return user;
    } catch (error) {
      throw new HttpException('Login failed ' + error, HttpStatus.UNAUTHORIZED);
    }
  }
}

