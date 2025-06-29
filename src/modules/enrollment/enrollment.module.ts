import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { EnrollmentModel } from './models/enrollment.model';
import { EnrollmentController } from './controllers/enrollment.controller';
import { EnrollmentService } from './services/enrollment.service';
import { EnrollmentRepository } from './repositories/enrollment.repository';

@Module({
  imports: [SequelizeModule.forFeature([EnrollmentModel])],
  controllers: [EnrollmentController],
  providers: [EnrollmentService, EnrollmentRepository],
  exports: [EnrollmentService, EnrollmentRepository],
})
export class EnrollmentModule {}
