import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    this.logger.log('Before request handle');

    const now = Date.now();
    return next
      .handle()
      .pipe(
        tap(() => this.logger.log(`Response time... ${Date.now() - now} MS`)),
      );
  }
}
