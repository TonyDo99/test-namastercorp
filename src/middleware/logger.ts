import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

/**
 * @implements { NestMiddleware }
 * Logger provides logging functionality for Nest middle handlers
 * */
@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  private logger = new Logger();

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;

    response.on('finish', () => {
      const msg = `${ip} ${method} ${originalUrl}`;
      this.logger.log(msg);
    });

    next();
  }
}
