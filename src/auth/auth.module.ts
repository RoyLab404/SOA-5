import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { AuthService } from './auth.service.js';
import { AuthMiddleware } from './auth.middleware.js';

@Module({
  imports: [
    JwtModule.register({
      secret: 'secret-key-12345', // Chuỗi bí mật dùng để sign token (trong thực tế nên dùng biến môi trường)
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware],
  exports: [JwtModule, AuthMiddleware], // Export để AppModule có thể sử dụng
})
export class AuthModule {}
