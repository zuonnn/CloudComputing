import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { LoginDto } from 'src/auth/dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) { }

  public async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    try {
      const createdUser = await this.usersService.create({
        ...registerDto,
        password: hashedPassword,
      });
      const token = this.jwtService.sign({ id: createdUser._id });

      return { token };
    } catch (error) {
      if (error.code === 11000) {
        throw new HttpException('Username is already taken', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  public async login(loginDto: LoginDto): Promise<{ token: string }> {
    try {
      const user = await this.usersService.getByUsername(loginDto.username);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      await this.verifyPassword(loginDto.password, user.password);

      const token = this.jwtService.sign({ id: user._id });
      return { token };
    } catch (error) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }

  private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(plainTextPassword, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    }
  }
}
