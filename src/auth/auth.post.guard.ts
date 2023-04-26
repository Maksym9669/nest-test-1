import { UserRole } from 'src/common/enums/user.role';
import { PostsService } from 'src/posts/posts.service';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class PostAuthGuard implements CanActivate {
  constructor(private readonly postsService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { role } = request.user;
    const { postId, userId } = request.params;

    const post = await this.postsService.getPost(postId, userId);
    const postOwnerId = post?.userId;

    return postOwnerId == userId || role == UserRole.ADMIN;
  }
}
