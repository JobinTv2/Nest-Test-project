import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import axios from 'axios';
import { AppTestDataCreatedEvent } from './events/app-test-data-created.event';
@Injectable()
export class AppService {
  constructor(private eventEmitter: EventEmitter2) {}
  async getHello() {
    const response = await axios(
      'https://jsonplaceholder.typicode.com/todos/1',
    );

    return response.data;
  }

  testEventEmitter() {
    const createdTestDataEvent = new AppTestDataCreatedEvent();
    createdTestDataEvent.name = 'Test event';
    createdTestDataEvent.description = 'Test data description';
    this.eventEmitter.emit('testdata.created', createdTestDataEvent);
    return { response: 'Event emitter triggered' };
  }
}
