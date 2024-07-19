import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { headers } = req;
    if (headers['x-role'] == 'user' || headers['x-role'] == 'admin') {
      next();
    } else {
      throw new UnauthorizedException();
    }
  }
}
