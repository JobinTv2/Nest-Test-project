import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached-test-item', { test: 'Test data' });
    await this.cacheManager.del('cached-test-item');
    const cachedItem = await this.cacheManager.get('cached-test-item');
    console.log(cachedItem, 'cachedItem');
    return 'Hello World!';
  }
}
