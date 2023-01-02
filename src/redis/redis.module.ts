import { Module, CacheModule, DynamicModule } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisController } from './redis.controller';
import * as redisStrore from 'cache-manager-redis-store';
import { DEFAULT_TTL, REDIS_HOST, REDIS_PORT } from 'src/constants';

const DEFAULT_PORT = REDIS_PORT;
const DEFAULT_HOST = REDIS_HOST;
@Module({})
export class RedisModule {
  static register(options, ttl): DynamicModule {
    const storOptions = Object.assign(
      {
        host: DEFAULT_HOST,
        port: DEFAULT_PORT,
      },
      options,
    );

    return {
      module: RedisModule,
      imports: [
        CacheModule.register({
          store: redisStrore,
          socket: storOptions,
          ttl: ttl || DEFAULT_TTL,
        }),
      ],
      providers: [RedisService],
      controllers: [RedisController],
    };
  }
}
