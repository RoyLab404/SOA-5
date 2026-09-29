import { AuthService } from './auth.service.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: Record<string, any>): Promise<{
        message: string;
        access_token: string;
    }>;
    verifyToken(authHeader: string): Promise<{
        message: string;
        payload: any;
    }>;
}
