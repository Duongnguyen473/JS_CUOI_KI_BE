import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { User } from '../entities/user.entity';
import { UsersRepository } from '../repositories/user.repository';
import { ApiError } from '../../../common/exceptions/api-error';
import { UpdateUserProfileDto } from '../dto/update-user-profile.dto';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';
import { AuthUser } from '@/common/interfaces/auth-user.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService extends BaseService<User> {
  constructor(private readonly usersRepository: UsersRepository) {
    super(usersRepository);
  }
  async updateUserProfile(user: AuthUser, updateUserDto: UpdateUserProfileDto) {
    const userUpdate = await this.usersRepository.updateOne(updateUserDto, {
      where: { _id: user.id },
    });
    if (!userUpdate) {
      throw ApiError.NotFound('User not found');
    }
    return userUpdate;
  }

  async updatePassword(
    userId: string,
    updateUserPasswordDto: UpdateUserPasswordDto,
  ) {
    const { old_password, new_password } = updateUserPasswordDto;
    const user = await this.usersRepository.getOne({
      where: { _id: userId },
      attributes: ['_id', 'password'],
    });
    const isOldPasswordValid = await bcrypt.compare(
      old_password,
      user.password,
    );
    if (!isOldPasswordValid) {
      throw ApiError.BadRequest('Old password is incorrect');
    }
    const hashedPassword = await bcrypt.hash(new_password, 10);
    const result = await this.usersRepository.updateOne(
      { password: hashedPassword },
      { where: { _id: userId } },
    );
    if (!result) {
      throw ApiError.InternalServerError('Failed to update password');
    }
    return { updated: true };
  }
  async updateUserAvatar(userId: string, avatar: string) {
    const result = await this.usersRepository.updateOne(
      { avatar },
      { where: { _id: userId } },
    );

    return result;
  }
}
