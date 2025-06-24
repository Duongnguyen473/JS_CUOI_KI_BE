import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Class } from './entities/class.entity';
import { ClassController } from './controllers/class.controller';
import { ClassService } from './services/class.service';
import { ClassRepository } from './repositories/class.repository';

@Module({
  imports: [SequelizeModule.forFeature([Class])],
  controllers: [ClassController],
  providers: [ClassService, ClassRepository],
  exports: [ClassService, ClassRepository],
})
export class ClassModule {}
