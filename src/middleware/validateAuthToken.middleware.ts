import { NestMiddleware, UnauthorizedException } from '@nestjs/common';

export class ValidateAuthTokenMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    const { authorization } = req.headers;
    if (!authorization) throw new UnauthorizedException('Provide token');
    next();
  }
}
