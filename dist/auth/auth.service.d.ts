import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './user.entity.js';
export declare class AuthService implements OnModuleInit {
    private jwtService;
    private userRepository;
    constructor(jwtService: JwtService, userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    login(userName: string, passwordBase64OrMd5: string): Promise<{
        message: string;
        access_token: string;
    }>;
    verifyToken(token: string): Promise<{
        message: string;
        payload: any;
    }>;
}
