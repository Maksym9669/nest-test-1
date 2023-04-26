import { UserRole } from 'src/common/enums/user.role';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class UserAuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { role, id } = request.user;
    const userId = request.params.userId;

    return id == userId || role == UserRole.ADMIN;
  }
}
