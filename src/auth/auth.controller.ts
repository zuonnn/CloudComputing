import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto, @Res() res: Response): Promise<any> {
    const response = await this.authService.register(registerDto);
    return res.status(HttpStatus.CREATED).json(response);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto, @Res() res: Response): Promise<any> {
    const user = await this.authService.login(loginDto, res);
    return res.status(HttpStatus.OK).json({ user });
  }

  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      res.clearCookie('access_token', {
        path: '/',
      }).clearCookie('refresh_token', {
        path: '/',
      })
      return res.status(HttpStatus.OK).send();
    } catch (error) {
      throw new HttpException(
        'Logout failed ' + error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post('refresh-token')
  async refreshToken(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.refreshTokens(req, res);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: error.message });
    }
  }
}
