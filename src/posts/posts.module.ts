import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, User]),
    forwardRef(() => AuthModule),
  ],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
