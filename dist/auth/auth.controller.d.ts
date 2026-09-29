import { AuthService } from './auth.service.js';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): {
        message: string;
        token: string;
    };
    checkAuth(req: any): {
        message: string;
        user: any;
    };
}
