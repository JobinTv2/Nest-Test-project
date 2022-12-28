import { Controller, Get } from '@nestjs/common';
import { CacheKey, CacheTTL } from '@nestjs/common/cache';
import { AppService } from './app.service';

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
}
