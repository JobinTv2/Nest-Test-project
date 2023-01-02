import { Injectable, PipeTransform, Logger } from '@nestjs/common';

@Injectable()
export class TransformPipe implements PipeTransform {
  private readonly logger = new Logger(TransformPipe.name);
  transform(value: any) {
    this.logger.log('Pipes');
    return {
      createdAt: new Date(),
      ...value,
    };
  }
}
