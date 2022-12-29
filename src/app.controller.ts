import { Controller, Get, UseFilters, UseInterceptors } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/common/cache';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { AppService } from './app.service';
import { HttpExceptionFilter } from './filters/execption.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @CacheKey('cache-test-route')
  @CacheTTL(15)
  getHello() {
    return this.appService.getHello();
  }

  @Get('test/middleware')
  getHi() {
    return this.appService.getHello();
  }

  @Get('test/excludes')
  get() {
    return this.appService.getHello();
  }

  @Get('test/interceptor')
  @UseInterceptors(new LoggingInterceptor())
  testInterceptor() {
    return this.appService.getHello();
  }

  @Get('test/exceptionfilter')
  @UseFilters(new HttpExceptionFilter())
  testExceptionFilter() {
    throw new ForbiddenException('Forbidden custom message');
  }
}
