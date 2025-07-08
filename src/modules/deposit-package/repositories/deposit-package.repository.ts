import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { DepositPackage } from '../entities/deposit-package.entity';
import { DepositPackageModel } from '../models/deposit-package.model';
@Injectable()
export class DepositPackageRepository extends BaseRepository<DepositPackage> {
  constructor() {
    super(DepositPackageModel);
  }

}
