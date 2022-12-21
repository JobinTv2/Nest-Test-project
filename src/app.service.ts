import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getHello() {
    await this.cacheManager.set('cached-test-item', { test: 'Test data' });
    const response = await axios(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    await this.cacheManager.set('todo-cache', response.data);
    const todo = await this.cacheManager.get('todo-cache');
    console.log(todo, 'cached todo');
    // await this.cacheManager.del('cached-test-item');
    const cachedItem = await this.cacheManager.get('cached-test-item');
    // console.log(cachedItem, 'cachedItem');
    return response.data;
  }
}
