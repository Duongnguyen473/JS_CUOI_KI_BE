import { Injectable } from '@nestjs/common';
import { BaseService } from '@Base/base.service';
import { Wallet } from '../entities/wallet.entity';
import { WalletRepository } from '../repositories/wallet.repository';
import { UserRepository } from '@/modules/user/repositories/user.repository';
import { ApiError } from '@/common/exceptions/api-error';
import { Op } from 'sequelize';
import { PageableDto } from '@/common/dto/pageable.dto';
import { QueryOption } from '@/common/pipe/query-option.interface';
import { WalletTransaction } from '../entities/wallet-transaction.entity';
import { WalletTransactionService } from './wallet-transaction.service';
import {
  DEPOSIT_PACKAGE,
  PayosStatus,
  WalletTransactionDescription,
  WalletTransactionStatus,
  WalletTransactionType,
} from '../common/constant';
import { PayosService } from './payos.service';
import { Sequelize } from 'sequelize-typescript';
import { PayosPaymentInfo } from '../common/interface';
import { DepositPackageRepository } from '@/modules/deposit-package/repositories/deposit-package.repository';
import { DepositPackage } from '@/modules/deposit-package/entities/deposit-package.entity';

@Injectable()
export class WalletService extends BaseService<Wallet> {
  constructor(
    private readonly walletRepository: WalletRepository,
    private readonly walletTransactionService: WalletTransactionService,
    private readonly userRepository: UserRepository,
    private readonly depositPackageRepository: DepositPackageRepository,
    private readonly payosService: PayosService,
    private readonly sequelize: Sequelize,
  ) {
    super(walletRepository);
    // Initialize wallet for user
    this.initWallet();
  }
  async initWallet(): Promise<void> {
    console.log('Init Wallet');
    const exsitingWallets = await this.walletRepository.getMany({
      attributes: ['user_id'],
    });
    const users = await this.userRepository.getMany({
      where: {
        _id: { [Op.notIn]: exsitingWallets.map((wallet) => wallet.user_id) },
      },
      attributes: ['_id'],
    });

    this.walletRepository.insertMany(
      users.map((user) => ({
        user_id: user._id,
      })),
    );
  }
  async createWallet(userId: string): Promise<void> {
    await this.walletRepository.create({
      user_id: userId,
      balance: 0,
    });
  }
  async getBalance(userId: string): Promise<number> {
    const wallet = await this.walletRepository.getOne({
      where: { user_id: userId },
      attributes: ['balance'],
    });
    if (!wallet) {
      throw ApiError.NotFound('Wallet not found');
    }
    return wallet.balance;
  }
  async getWalletTransactions(
    userId: string,
    query: QueryOption,
  ): Promise<PageableDto<WalletTransaction | any>> {
    const wallet = await this.walletRepository.getOne({
      where: { user_id: userId },
      attributes: ['_id'],
    });
    const walletTransaction =
      await this.walletTransactionService.getWalletTransactions(
        wallet._id,
        query,
      );
    return walletTransaction;
  }
  // user deposit money
  async deposit(userId: string, packageId: string): Promise<WalletTransaction> {
    const depositPackage = await this.getInfoPackage(packageId);
    if (!depositPackage) {
      throw ApiError.NotFound('Deposit package not found');
    }
    const lastPendingTransaction = await this.getLastPendingTransaction(userId);
    if (lastPendingTransaction) {
      throw ApiError.Conflict('You already have a pending deposit transaction');
    }
    const { amount, promotion } = depositPackage
    const wallet = await this.walletRepository.getOne({
      where: { user_id: userId },
      attributes: ['_id'],
    });
    const payos = await this.payosService.createPayment(amount);

    const walletTransaction =
      await this.walletTransactionService.createTransactionDeposit(
        wallet._id,
        WalletTransactionType.DEPOSIT,
        amount + promotion,
        WalletTransactionDescription.DEPOSIT,
        payos.orderCode,
        payos as PayosPaymentInfo,
      );
    return walletTransaction;
  }
  // get last deposit transaction pending(Trường hợp người dùng đã deposit nhưng chưa verify)
  async getLastPendingTransaction(userId: string): Promise<WalletTransaction> {
    const wallet = await this.walletRepository.getOne({
      where: { user_id: userId },
      attributes: ['_id'],
    });
    const walletTransaction = await this.walletTransactionService.getOne({
      where: {
        wallet_id: wallet._id,
        type: WalletTransactionType.DEPOSIT,
        status: WalletTransactionStatus.PENDING,
      },
    });
    return walletTransaction;
  }
  async getDepositInfo(userId: string): Promise<any> {
    const lastPendingTransaction = await this.getLastPendingTransaction(userId);
    if (!lastPendingTransaction) {
      throw ApiError.NotFound('No pending deposit transaction found');
    }
    // If the transaction is not pending, return the
    return lastPendingTransaction.payment_info as PayosPaymentInfo;
  }
  // Check payment status and update wallet balance
  async verifyDeposit(userId: string): Promise<Wallet | any> {
    const lastPendingTransaction = await this.getLastPendingTransaction(userId);
    if (!lastPendingTransaction) {
      throw ApiError.NotFound('No pending deposit transaction found');
    }
    const transaction = await this.sequelize.transaction();
    try {
      // Get payment status from Payos
      const paymentStatus = await this.payosService.getPaymentStatus(
        lastPendingTransaction.external_transaction_id,
      );
      if (paymentStatus.status !== PayosStatus.PAID) {
        throw ApiError.BadRequest('Payment is not successful');
      }
      // Update transaction status
      await this.walletTransactionService.updateOne(
        { status: WalletTransactionStatus.SUCCESS },
        {
          where: {
            external_transaction_id:
              lastPendingTransaction.external_transaction_id,
          },
          transaction,
        },
      );
      // Update wallet balance
      const wallet = await this.walletRepository.incrementBalance(
        lastPendingTransaction.wallet_id,
        lastPendingTransaction.amount,
        transaction,
      );
      if (!wallet) {
        throw ApiError.InternalServerError('Failed to update wallet balance');
      }
      await transaction.commit();
      return wallet;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  async cancelDeposit(userId: string): Promise<boolean> {
    const lastPendingTransaction = await this.getLastPendingTransaction(userId);
    if (!lastPendingTransaction) {
      throw ApiError.NotFound('No pending deposit transaction found');
    }

    const transaction = await this.sequelize.transaction();
    try {
      // Check payment status from Payos
      const paymentStatus = await this.payosService.getPaymentStatus(
        lastPendingTransaction.external_transaction_id,
      );
      if (paymentStatus.status !== PayosStatus.PENDING) {
        throw ApiError.BadRequest('Payment is not pending');
      }
      // Cancel the payment on Payos
      const cancelResult = await this.payosService.cancelPayment(
        lastPendingTransaction.external_transaction_id,
      );
      if (!cancelResult) {
        throw ApiError.InternalServerError('Failed to cancel payment');
      }
      // Update transaction status to cancelled
      await this.walletTransactionService.updateOne(
        { status: WalletTransactionStatus.CANCELLED },
        {
          where: { _id: lastPendingTransaction._id },
          transaction,
        },
      );
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
  // FUNCTION
  private async getInfoPackage(packageId: string): Promise<DepositPackage> {
    return this.depositPackageRepository.getOne({
      where: { _id: packageId },
      attributes: ['amount', 'promotion'],
    });
  }
}
