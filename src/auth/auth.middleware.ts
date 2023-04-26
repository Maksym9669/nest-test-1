import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.user) {
      req.userId = req.user.id;
      req.username = req.user.username;
    }
    next();
  }
}
