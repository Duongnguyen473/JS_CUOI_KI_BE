import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { StudentProfileRepository } from './repositories/student-profile.repository';
import { TutorProfileRepository } from './repositories/tutor-profile.repository';
import { TutorProfileModel } from './models/tutor-profile.model';
import { StudentProfileModel } from './models/stutent-profile.model';
import { UsersModule } from '../user/user.module';
@Module({
  imports: [
    SequelizeModule.forFeature([TutorProfileModel, StudentProfileModel]),
    UsersModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService, TutorProfileRepository, StudentProfileRepository],
  exports: [ProfileService, TutorProfileRepository, StudentProfileRepository],
})
export class ProfileModule {}
