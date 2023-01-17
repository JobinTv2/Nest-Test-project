import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppTestDataCreatedEvent } from 'src/events/app-test-data-created.event';

@Injectable()
export class AppTestDataCreatedEventListener {
  @OnEvent('testdata.created')
  handleEvent(event: AppTestDataCreatedEvent) {
    console.log(event, 'event');
  }
}
