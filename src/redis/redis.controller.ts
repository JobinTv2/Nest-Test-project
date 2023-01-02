import { Controller, Get, CacheKey, CacheTTL, Param } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}
  @Get('/:id')
  @CacheKey('cache-test-route')
  @CacheTTL(15)
  getHello(@Param() query: { id: string }) {
    return this.redisService.getTodos(query.id);
  }
}
