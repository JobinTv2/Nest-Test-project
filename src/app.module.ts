import { Module, CacheModule, CacheInterceptor } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStrore from 'cache-manager-redis-store';
@Module({
  imports: [
    CacheModule.register({
      store: redisStrore,
      socket: { host: 'localhost', port: 6379 },
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule {}
