import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { WalletTransactionModel } from '../models/wallet-transaction.model';
import { WalletTransaction } from '../entities/wallet-transaction.entity';
@Injectable()
export class WalletTransactionRepository extends BaseRepository<WalletTransaction> {
  constructor() {
    super(WalletTransactionModel);
  }

}
