import { Injectable, UnauthorizedException, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Khởi tạo một user mặc định để test nếu bảng chưa có dữ liệu
    const count = await this.userRepository.count();
    if (count === 0) {
      const defaultUser = this.userRepository.create({
        UserName: 'admin',
        Password: 'admin', // Giả sử nhận chuỗi giả lập admin
      });
      await this.userRepository.save(defaultUser);
      console.log('Đã tạo user mặc định: admin / admin');
    }
  }

  async login(userName: string, passwordBase64OrMd5: string) {
    let decodedPassword = passwordBase64OrMd5;
    try {
        decodedPassword = Buffer.from(passwordBase64OrMd5, 'base64').toString('utf-8');
    } catch(e) {}
    
    // Tìm user trong Database SQLite
    const user = await this.userRepository.findOne({
      where: [
        { UserName: userName, Password: passwordBase64OrMd5 },
        { UserName: userName, Password: decodedPassword }
      ]
    });

    if (!user) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }

    // Sinh JWT
    const payload = { sub: user.IdUser, username: user.UserName };
    const accessToken = await this.jwtService.signAsync(payload);

    // Lưu lại token vào bảng người dùng theo như Phụ lục thiết kế
    user.Token = accessToken;
    await this.userRepository.save(user);

    return {
      message: 'Đăng nhập thành công',
      access_token: accessToken,
    };
  }

  async verifyToken(token: string) {
      try {
          const payload = await this.jwtService.verifyAsync(token);
          return { message: 'Token hợp lệ', payload };
      } catch (e) {
          throw new UnauthorizedException('Token không hợp lệ');
      }
  }
}
