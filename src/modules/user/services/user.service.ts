import { Injectable } from '@nestjs/common';
import { BaseService } from '../../../common/base/base.service';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { ApiError } from '../../../common/exceptions/api-error';

@Injectable()
export class UsersService extends BaseService<User> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
      throw ApiError.Conflict('Email already exists');
    }
    return this.create(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    if (!user) {
      throw ApiError.NotFound('User not found');
    }

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.findByEmail(updateUserDto.email);
      if (existingUser) {
        throw ApiError.Conflict('Email already exists');
      }
    }

    const updatedUser = await this.update(id, updateUserDto);
    if (!updatedUser) {
      throw ApiError.InternalServerError('Failed to update user');
    }

    return updatedUser;
  }

  async removeUser(id: string): Promise<boolean> {
    const user = await this.findById(id);
    if (!user) {
      throw ApiError.NotFound('User not found');
    }

    return this.remove(id);
  }

  async findById(id: string): Promise<User | null> {
    return super.findById(id);
  }
}
