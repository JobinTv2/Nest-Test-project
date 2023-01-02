import { Module, CacheModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import * as redisStrore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      store: redisStrore,
      socket: { host: 'localhost', port: 6379 },
      ttl: 15,
    }),
    RedisModule,
  ],
  providers: [RedisService],
  controllers: [RedisController],
})
export class RedisModule {}
