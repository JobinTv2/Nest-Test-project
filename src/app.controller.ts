import { Controller, Get } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/common/cache';
import { UseInterceptors } from '@nestjs/common/decorators';
import { AppService } from './app.service';
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
}
