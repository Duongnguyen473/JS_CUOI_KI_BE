import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DepositPackageModel } from './models/deposit-package.model';
import { DepositPackageController } from './controllers/deposit-package.controller';
import { DepositPackageService } from './services/deposit-package.service';
import { DepositPackageRepository } from './repositories/deposit-package.repository';

@Module({
  imports: [SequelizeModule.forFeature([DepositPackageModel])],
  controllers: [DepositPackageController],
  providers: [DepositPackageService, DepositPackageRepository],
  exports: [DepositPackageService, DepositPackageRepository],
})
export class DepositPackageModule {}
