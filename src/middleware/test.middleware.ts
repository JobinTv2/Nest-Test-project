import { NestMiddleware } from '@nestjs/common';

export class TestMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: (error?: any) => void) {
    console.log('Request hit the test middleware');
    next();
  }
}
