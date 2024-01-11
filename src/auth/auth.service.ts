import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenPayload } from './guards/token-payload.interface';

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
      
      const accessToken = this.generateAccessToken({ id: user._id, role: user.role });
      const refreshToken = this.generateRefreshToken({ id: user._id, role: user.role });

      res.cookie('access_token', accessToken, {
        maxAge: 1000 * 3600,
      });

      res.cookie('refresh_token', refreshToken, {
        maxAge: 1000 * 3600 * 24,
      });

      return user;
    } catch (error) {
      throw new HttpException('Login failed ' + error, HttpStatus.UNAUTHORIZED);
    }
  }

  private generateAccessToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  private generateRefreshToken(payload: TokenPayload) {
    return this.jwtService.sign(payload, { expiresIn: '1d' });
  }

  public async refreshTokens(req: Request, res: Response) {
    try {
      const refreshToken = req.cookies['refresh_token'];

      if (!refreshToken) {
        throw new HttpException('No refresh token found', HttpStatus.UNAUTHORIZED);
      }

      const decoded = this.jwtService.verify(refreshToken);
      if (!decoded) {
        throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
      }

      const user = await this.usersService.getById(decoded.id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
      }

      const accessTokenPayload: TokenPayload = { id: user._id, role: user.role };
      const newAccessToken = this.generateAccessToken(accessTokenPayload);

      res.cookie('access_token', newAccessToken, {
        maxAge: 1000 * 3600,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      throw new HttpException('Token refresh failed ' + error, HttpStatus.UNAUTHORIZED);
    }
  }

}
