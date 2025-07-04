import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProfileController } from './controllers/profile.controller';
import { ProfileService } from './services/profile.service';
import { StudentProfileRepository } from './repositories/student-profile.repository';
import { TutorProfileRepository } from './repositories/tutor-profile.repository';
import { TutorProfileModel } from './models/tutor-profile.model';
import { StudentProfileModel } from './models/stutent-profile.model';
@Module({
  imports: [SequelizeModule.forFeature([TutorProfileModel, StudentProfileModel])],
  controllers: [ProfileController],
  providers: [ProfileService, TutorProfileRepository, StudentProfileRepository],
  exports: [ProfileService],
})
export class ProfileModule {}
