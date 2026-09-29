import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

// Dữ liệu giả lập theo bảng User trong Phụ lục
const users = [
  {
    IdUser: 1,
    UserName: 'admin',
    Password: '21232f297a57a5a743894a0e4a801fc3', // MD5 của 'admin'
    Token: '',
  },
];

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  login(userName: string, passwordHash: string) {
    const user = users.find(
      (u) => u.UserName === userName && u.Password === passwordHash,
    );

    if (user) {
      const payload = { userName: user.UserName, sub: user.IdUser };
      const token = this.jwtService.sign(payload);
      
      // Lưu token vào "database"
      user.Token = token;
      
      return token;
    }
    return null;
  }
}
