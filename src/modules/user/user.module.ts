import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/user.service';
import { UserRepository } from './repositories/user.repository';
import { UserModel } from './models/user.model';
import { ReviewModel } from '../review/models/review.model';
import { ClassModel } from '../class/models/class.model';

@Module({
  imports: [SequelizeModule.forFeature([UserModel, ReviewModel, ClassModel])],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [UsersService, UserRepository],
})
export class UsersModule {}
