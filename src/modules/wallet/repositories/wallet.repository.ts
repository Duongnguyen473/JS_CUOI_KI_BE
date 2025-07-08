import { Injectable } from '@nestjs/common';
import { BaseRepository } from '@Base/base.repository';
import { Wallet } from '../entities/wallet.entity';
import { WalletModel } from '../models/wallet.model';
@Injectable()
export class WalletRepository extends BaseRepository<Wallet> {
  constructor() {
    super(WalletModel);
  }
  async incrementBalance(
    walletId: string,
    amount: number,
    transaction: any = undefined,
  ): Promise<boolean> {
    const wallet = await this.getOne({ where: { _id: walletId } });

    const res = await this.updateOne(
      {
        balance: wallet.balance + amount,
      },
      {
        where: { _id: walletId },
        transaction,
      },
    );
    if (!res) {
      return false;
    }
    return true;
  }
  async decrementBalance(
    walletId: string,
    amount: number,
    // transaction: any = null,
  ): Promise<Wallet | any> {
    const wallet = await this.getOne({ where: { _id: walletId } });

    await this.updateOne(
      {
        balance: wallet.balance - amount,
      },
      {
        where: { _id: walletId },
      },
    );
  }
}
