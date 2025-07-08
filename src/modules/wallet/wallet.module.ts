import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { WalletModel } from './models/wallet.model';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { WalletRepository } from './repositories/wallet.repository';
import { UsersModule } from '../user/user.module';
import { WalletTransactionRepository } from './repositories/wallet-transaction.repository';
import { WalletTransactionModel } from './models/wallet-transaction.model';
import { WalletTransactionService } from './services/wallet-transaction.service';
import { PayosService } from './services/payos.service';

@Module({
  imports: [
    SequelizeModule.forFeature([WalletModel, WalletTransactionModel]),
    UsersModule,
  ],
  controllers: [WalletController],
  providers: [WalletService, WalletTransactionService, PayosService , WalletRepository, WalletTransactionRepository],
  exports: [WalletService, WalletTransactionService, WalletRepository, WalletTransactionRepository],
})
export class WalletModule {}
