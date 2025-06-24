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

  async getUserProfile(id: string) {
    const user = await this.usersRepository.findById(id);
    
  }
  // Get User Profile 
  async getTutorProfile(id: string) {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw ApiError.NotFound('User not found');
    }
    
    return user;
  }
  private async updateTutorProfile(id: string, updateUserDto: UpdateUserDto) {}
  private async updateStudentProfile(id: string, updateUserDto: UpdateUserDto) {}
  async updateUserProfile(id: string, updateUserDto: UpdateUserDto) {}



}
