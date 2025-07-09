import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { ApiError } from '@/common/exceptions/api-error';
import { PageableDto } from '@/common/dto/pageable.dto';
import { QueryOption } from '@/common/pipe/query-option.interface';
import { WalletTransactionRepository } from '../repositories/wallet-transaction.repository';
import { WalletTransaction } from '../entities/wallet-transaction.entity';
import { WalletTransactionType } from '../common/constant';
import { PayosPaymentInfo } from '../common/interface';

@Injectable()
export class WalletTransactionService extends BaseService<WalletTransaction> {
  constructor(
    private readonly walletTransactionRepository: WalletTransactionRepository,
    // private readonly walletRepository: WalletTransactionRepository,
  ) {
    super(walletTransactionRepository);
  }
  async getWalletTransactions(
    walletId: string,
    query: QueryOption,
  ): Promise<PageableDto<WalletTransaction>> {
    const walletTransaction = await this.walletTransactionRepository.getPage(
      {
        where: { wallet_id: walletId },
        attributes: ['_id', 'wallet_id', 'amount', 'type', 'status', 'description', 'createdAt'],
      },
      {
        ...query,
        order: [['createdAt', 'DESC']],
      },
    );
    if (!walletTransaction) {
      throw ApiError.NotFound('Wallet not found');
    }
    return walletTransaction;
  }
  async createTransactionDeposit(
    walletId: string,
    type: WalletTransactionType,
    amount: number,
    description: string,
    externalTransactionId: number,
    paymentInfo: PayosPaymentInfo,
  ): Promise<WalletTransaction | any> {
    const transactionData = {
      wallet_id: walletId,
      type,
      amount,
      description,
      external_transaction_id: externalTransactionId,
      payment_info: paymentInfo,
    };
    const transaction =
      await this.walletTransactionRepository.create(transactionData);
    if (!transaction) {
      throw ApiError.InternalServerError('Failed to create transaction');
    }
    return transaction;
  }
}
