import {
  Module,
  // CacheInterceptor,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
// import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppTestDataCreatedEventListener } from './listeners/app-test-data-created.listener';
import { ValidateAuthTokenMiddleware } from './middleware/validateAuthToken.middleware';
import { RedisModule } from './redis/redis.module';
@Module({
  imports: [
    RedisModule.register({ host: 'localhost', port: 6379 }, 50),
    EventEmitterModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AppTestDataCreatedEventListener,
    // { provide: APP_INTERCEPTOR, useClass: CacheInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateAuthTokenMiddleware).forRoutes(AppController);
  }
}

// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(TestMiddleware)
//       .exclude({
//         path: 'test/excludes',
//         method: RequestMethod.GET,
//       })
//       .forRoutes({
//         path: '*',
//         method: RequestMethod.ALL,
//       });
//   }
// }

// 1. includes
// consumer.apply(TestMiddleware).forRoutes({
//   path: 'test/middleware',
//   method: RequestMethod.GET,
// });

// 2. Entire app controller
// consumer.apply(TestMiddleware).forRoutes(AppController);
