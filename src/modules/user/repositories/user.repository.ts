import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../common/base/base.repository';
import { User } from '../entities/user.entity';
import { UserModel } from '../models/user.model';

@Injectable()
export class UsersRepository extends BaseRepository<User> {
  constructor() {
    super(UserModel);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.getOne({ where: { email } });
  }

  async findActiveUsers(): Promise<User[]> {
    return this.getMany({ where: { isActive: true } });
  }
}
