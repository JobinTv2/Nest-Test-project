import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  async getHello() {
    const response = await axios(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    return response.data;
  }
}
