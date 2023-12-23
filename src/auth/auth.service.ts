import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    public async register(registrationData: RegisterDto) {
        try {
            const user = await this.usersService.create(registrationData);
            return {
                message: 'User registered successfully',
                username: user.username,
                name: user.name,
            };
        } catch (error) {
            // if (error?.response?.data?.message) {
            //     throw new HttpException(error.response.data.message, HttpStatus.BAD_REQUEST);
            // } else {
            //     throw new HttpException('Failed to register user', HttpStatus.INTERNAL_SERVER_ERROR);
            // }
            return error;
        }
    }

    public async login(loginDto: LoginDto): Promise<{ token: string }> {
        try {
            const user = await this.usersService.getByUsername(loginDto.username);
            if (!user) {
                throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
            }
            await this.verifyPassword(loginDto.password, user.password);
            const token = this.jwtService.sign({ id: user._id, role: user.role });
            return {token};
        } catch (error) {
            throw error;
        }
    }

    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
        try {
            const isPasswordMatching = await bcrypt.compare(
                plainTextPassword,
                hashedPassword
            );
            if (!isPasswordMatching) {
                throw new HttpException('Wrong password', HttpStatus.BAD_REQUEST);
            }
        } catch (error) {
            throw error;
        }
    }

}
