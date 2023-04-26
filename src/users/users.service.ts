import { Repository } from 'typeorm';
import { UserDTO } from './dto/user.dto';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(userDto: UserDTO) {
    const user = this.userRepository.create({ ...userDto });

    return this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.userRepository.find({
      select: {
        id: true,
        role: true,
        firstname: true,
        lastname: true,
        username: true,
      },
    });
  }

  async findOneUser(id: number) {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        role: true,
        firstname: true,
        lastname: true,
        username: true,
      },
    });
  }

  async findOneUserByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    const updatedUser = await this.userRepository.save({
      ...user,
      ...updateUserDto,
    });

    const { password, ...userData } = updatedUser;

    return userData;
  }

  async removeUser(id: number) {
    return this.userRepository.delete(id);
  }
}
