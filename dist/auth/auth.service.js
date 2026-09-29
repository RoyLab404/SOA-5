var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
let AuthService = class AuthService {
    jwtService;
    userRepository;
    constructor(jwtService, userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }
    async onModuleInit() {
        const count = await this.userRepository.count();
        if (count === 0) {
            const defaultUser = this.userRepository.create({
                UserName: 'admin',
                Password: 'admin',
            });
            await this.userRepository.save(defaultUser);
            console.log('Đã tạo user mặc định: admin / admin');
        }
    }
    async login(userName, passwordBase64OrMd5) {
        let decodedPassword = passwordBase64OrMd5;
        try {
            decodedPassword = Buffer.from(passwordBase64OrMd5, 'base64').toString('utf-8');
        }
        catch (e) { }
        const user = await this.userRepository.findOne({
            where: [
                { UserName: userName, Password: passwordBase64OrMd5 },
                { UserName: userName, Password: decodedPassword }
            ]
        });
        if (!user) {
            throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
        }
        const payload = { sub: user.IdUser, username: user.UserName };
        const accessToken = await this.jwtService.signAsync(payload);
        user.Token = accessToken;
        await this.userRepository.save(user);
        return {
            message: 'Đăng nhập thành công',
            access_token: accessToken,
        };
    }
    async verifyToken(token) {
        try {
            const payload = await this.jwtService.verifyAsync(token);
            return { message: 'Token hợp lệ', payload };
        }
        catch (e) {
            throw new UnauthorizedException('Token không hợp lệ');
        }
    }
};
AuthService = __decorate([
    Injectable(),
    __param(1, InjectRepository(User)),
    __metadata("design:paramtypes", [JwtService,
        Repository])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map