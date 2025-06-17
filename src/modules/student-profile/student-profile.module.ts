import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StudentProfile } from './entities/student-profile.entity';
import { StudentProfileController } from './controllers/student-profile.controller';
import { StudentProfileService } from './services/student-profile.service';
import { StudentProfileRepository } from './repositories/student-profile.repository';

@Module({
  imports: [SequelizeModule.forFeature([StudentProfile])],
  controllers: [StudentProfileController],
  providers: [StudentProfileService, StudentProfileRepository],
  exports: [StudentProfileService, StudentProfileRepository],
})
export class StudentProfileModule {}
