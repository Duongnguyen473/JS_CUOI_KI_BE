import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';
import { ClassRepository } from './repositories/class.repository';
import { ClassModel } from './models/class.model';
import { BidModule } from '../bid/bid.module';
import { EnrollmentModule } from '../enrollment/enrollment.module';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([ClassModel]), BidModule, EnrollmentModule, UsersModule],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
  exports: [ClassService, ClassRepository],
})
export class ClassModule {}
