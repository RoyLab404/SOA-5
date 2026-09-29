var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
const users = [
    {
        IdUser: 1,
        UserName: 'admin',
        Password: '21232f297a57a5a743894a0e4a801fc3',
        Token: '',
    },
];
let AuthService = class AuthService {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    login(userName, passwordHash) {
        const user = users.find((u) => u.UserName === userName && u.Password === passwordHash);
        if (user) {
            const payload = { userName: user.UserName, sub: user.IdUser };
            const token = this.jwtService.sign(payload);
            user.Token = token;
            return token;
        }
        return null;
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map