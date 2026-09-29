var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
let TokenMiddleware = class TokenMiddleware {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new UnauthorizedException('Token is missing or invalid format');
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: 'my-secret-key-for-jwt-2026',
            });
            req.user = payload;
            next();
        }
        catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
};
TokenMiddleware = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], TokenMiddleware);
export { TokenMiddleware };
//# sourceMappingURL=token.middleware.js.map