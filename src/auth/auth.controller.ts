import { Controller, Post, Body, Get, Req, UnauthorizedException, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // API Đăng nhập
  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() body: any) {
    const { userName, password } = body;
    const token = this.authService.login(userName, password);
    if (!token) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    return {
      message: 'Đăng nhập thành công',
      token,
    };
  }

  // API xác thực token
  @Get('auth')
  checkAuth(@Req() req: any) {
    return {
      message: 'Xác thực token thành công',
      user: req['user'], // Được gán từ middleware
    };
  }
}
