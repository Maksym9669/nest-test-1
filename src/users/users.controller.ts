import { UserDTO } from './dto/user.dto';
import { UsersService } from './users.service';
import { MESSAGES } from 'src/common/constants';
import { PostDTO } from 'src/posts/dto/post.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PostsService } from 'src/posts/posts.service';
import { UserAuthGuard } from 'src/auth/auth.user.guard';
import { PostAuthGuard } from 'src/auth/auth.post.guard';
import { UpdatePostDto } from 'src/posts/dto/update-post.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
    private readonly postsService: PostsService,
  ) {}

  @Post()
  createUser(@Body() userDto: UserDTO) {
    return this.usersService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard)
  @Get()
  async findAllUsers() {
    return this.usersService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard)
  @Get(':userId')
  async findOneUser(@Param('userId') userId: string) {
    const user = await this.usersService.findOneUser(+userId);

    if (!user)
      throw new NotFoundException(MESSAGES.RECORD_NOT_FOUND('User', userId));

    return user;
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard)
  @Patch(':userId')
  async updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.usersService.findOneUser(+userId);

    if (!user)
      throw new NotFoundException(MESSAGES.RECORD_NOT_FOUND('User', userId));

    Object.keys(updateUserDto).forEach((key) => {
      user[key] = updateUserDto[key];
    });

    return this.usersService.updateUser(+userId, user);
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard)
  @Delete(':userId')
  async removeUser(@Param('userId') userId: string, @Req() req: any) {
    const removed = await this.usersService.removeUser(+userId);

    if (req.user.id == userId)
      this.authService.revokeToken(req.headers.authorization);

    return removed;
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard)
  @Get(':userId/posts')
  async getPostsByUser(@Param('userId') userId: string) {
    return this.postsService.getPostsByUser(+userId);
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard, PostAuthGuard)
  @Get(':userId/posts/:postId')
  async getPost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
  ) {
    const post = await this.postsService.getPost(+postId, +userId);

    if (!post)
      throw new NotFoundException(MESSAGES.RECORD_NOT_FOUND('Post', postId));

    return post;
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard, PostAuthGuard)
  @Post(':userId/posts')
  async addPost(@Param('userId') userId: string, @Body() postDto: PostDTO) {
    return this.postsService.createPost(+userId, postDto);
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard, PostAuthGuard)
  @Delete(':userId/posts/:postId')
  async removePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
    @Req() req: any,
  ) {
    const removed = await this.postsService.removePost(+postId);

    return removed;
  }

  @UseGuards(JwtAuthGuard, UserAuthGuard, PostAuthGuard)
  @Patch(':userId/posts/:postId')
  async updatePost(
    @Param('userId') userId: string,
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    const post = await this.postsService.getPost(+postId, +userId);

    if (!post)
      throw new NotFoundException(MESSAGES.RECORD_NOT_FOUND('Post', postId));

    const updatedPost = await this.postsService.updatePost(
      +postId,
      updatePostDto,
    );

    return updatedPost;
  }
}
