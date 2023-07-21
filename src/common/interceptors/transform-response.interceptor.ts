import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * @implements {NestInterceptor<T, any>}
 * @return { Observable<any> }
 * Transform response to an Observable
 * */
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) =>
        instanceToPlain({
          status: true,
          ordered: data,
          timestamp: new Date().toISOString(),
        }),
      ),
    );
  }
}
