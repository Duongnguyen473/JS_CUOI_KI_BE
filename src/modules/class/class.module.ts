import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';
import { ClassRepository } from './repositories/class.repository';
import { ClassModel } from './models/class.model';

@Module({
  imports: [SequelizeModule.forFeature([ClassModel])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
  exports: [ClassService, ClassRepository],
})
export class ClassModule {}
