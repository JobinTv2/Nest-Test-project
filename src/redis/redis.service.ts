import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import axios from 'axios';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async getTodos(id) {
    const data = await this.getOrSetCache(`todos:${id}`, async () => {
      const response = await axios({
        url: `https://jsonplaceholder.typicode.com/todos/${id}`,
        headers: {
          'accept-encoding': '*',
        },
      });
      return response.data;
    });
    return data;
  }

  async getOrSetCache(key, cb) {
    const data = await this.cacheManager.get(key);
    if (data) return data;

    const newData = await cb();
    await this.cacheManager.set(key, newData);
    return newData;
  }
}
