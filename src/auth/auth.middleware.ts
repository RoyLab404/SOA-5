import {
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Không tìm thấy token xác thực (Yêu cầu Authorization: Bearer <token>)');
    }

    const authUrl = this.config.get<string>('AUTH_URL') || 'http://localhost:3000';

    try {
      // Thử xác thực với Auth Service qua GET /auth hoặc POST /auth
      let resData;
      try {
        const response = await firstValueFrom(
          this.http.get(`${authUrl}/auth`, {
            headers: { Authorization: authHeader },
          }),
        );
        resData = response.data;
      } catch (getErr: any) {
        if (getErr?.response?.status === 404 || getErr?.response?.status === 405) {
          const postResponse = await firstValueFrom(
            this.http.post(
              `${authUrl}/auth`,
              {},
              { headers: { Authorization: authHeader } },
            ),
          );
          resData = postResponse.data;
        } else {
          throw getErr;
        }
      }

      (req as any).user = resData?.payload ?? resData;
      next();
    } catch (e: any) {
      if (e?.response?.status === 401) {
        throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
      }
      throw new ServiceUnavailableException(
        'Không thể kết nối đến dịch vụ xác thực (Auth Service trên cổng 3000)',
      );
    }
  }
}
