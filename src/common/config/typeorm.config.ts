import { ConfigService } from '@nestjs/config';
import { Post } from 'src/posts/entities/post.entity';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../../users/entities/user.entity';

export const getTypeOrmConfig = async (
  configService: ConfigService,
): Promise<TypeOrmModuleOptions> => {
  return {
    type: 'postgres',
    host: configService.get<string>('POSTGRES_HOST'),
    port: configService.get<number>('POSTGRES_PORT'),
    username: configService.get<string>('POSTGRES_USER'),
    password: configService.get<string>('POSTGRES_PASSWORD'),
    database: configService.get<string>('POSTGRES_DATABASE'),
    entities: [User, Post],
    synchronize: true,
  };
};
