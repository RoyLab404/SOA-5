import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST localhost:3000/
  // Để đăng nhập như mô tả: Url: localhost:****/
  @Post()
  login(@Body() body: Record<string, any>) {
    const { userName, password } = body;
    if (!userName || !password) {
      throw new UnauthorizedException('Thiếu userName hoặc password');
    }
    return this.authService.login(userName, password);
  }

  // GET localhost:3000/auth
  // Xây dựng API xác thực token localhost:****/auth
  @Get('auth')
  verifyToken(@Headers('authorization') authHeader: string) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Thiếu token hoặc sai định dạng');
    }
    const token = authHeader.split(' ')[1];
    return this.authService.verifyToken(token);
  }
}
