import { User } from './entities/user.entity';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PostsModule } from 'src/posts/posts.module';
import { Post } from 'src/posts/entities/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Post]),
    forwardRef(() => AuthModule),
    PostsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
