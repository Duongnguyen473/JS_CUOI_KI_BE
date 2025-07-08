import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrollmentModel } from './models/enrollment.model';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentRepository } from './repositories/enrollment.repository';
import { ProfileModule } from '../profile/profile.module';
import { ClassModule } from '../class/class.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [
    SequelizeModule.forFeature([EnrollmentModel]),
    ProfileModule,
    UsersModule,
    forwardRef(() => ClassModule),
  ],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EnrollmentRepository],
  exports: [EnrollmentService, EnrollmentRepository],
})
export class EnrollmentModule {}
