import { Repository } from 'typeorm';
import { PostDTO } from './dto/post.dto';
import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async createPost(userId: number, postDto: PostDTO) {
    const user = this.postRepository.create({ userId, ...postDto });

    return this.postRepository.save(user);
  }

  async getPost(postId: number, userId: number) {
    return this.postRepository.findOne({
      where: { id: postId, userId },
    });
  }

  async updatePost(postId: number, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.findOne({ where: { id: postId } });

    const updaatedPost = await this.postRepository.save({
      ...post,
      ...updatePostDto,
    });

    return updaatedPost;
  }

  async removePost(postId: number) {
    return this.postRepository.delete(postId);
  }

  async getPostsByUser(userId: number) {
    const qb = this.postRepository
      .createQueryBuilder('post')
      .where('post.user_id = :userId', {
        userId,
      })
      .orderBy('post.id', 'DESC');
    const posts = await qb.getMany();

    return posts;
  }
}
