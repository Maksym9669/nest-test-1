import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private authService: AuthService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization;

    if (token && !this.authService.isTokenRevoked(token)) {
      return super.canActivate(context);
    }
    throw new UnauthorizedException();
  }
}
