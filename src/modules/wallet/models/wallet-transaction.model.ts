import { Table, Model, Column, DataType, ForeignKey } from 'sequelize-typescript';
import { EntityTable } from '@Common/constants/entity.constant';
import { StrObjectId } from '@Common/constants/base.constant';
import { WalletTransaction } from '../entities/wallet-transaction.entity';
import {
  WalletTransactionType,
  WalletTransactionStatus,
} from '../common/constant';
import { WalletModel } from './wallet.model';
import { PayosPaymentInfo } from '../common/interface';

@Table({
  tableName: EntityTable.WALLET_TRANSACTION,
})
export class WalletTransactionModel extends Model implements WalletTransaction {
  @Column
  @ForeignKey(() => WalletModel)
  wallet_id: string;
  @Column({
    type: DataType.ENUM(...Object.values(WalletTransactionType)),
  })
  type: WalletTransactionType;
  @Column
  amount: number;
  @Column
  description: string;
  @Column({
    type: DataType.ENUM(...Object.values(WalletTransactionStatus)),
    defaultValue: WalletTransactionStatus.PENDING,
  })
  status: WalletTransactionStatus;
  @Column({
    type: DataType.BIGINT,
    allowNull: true,
    unique: true,
  })
  external_transaction_id: number;
  @Column({
    type: DataType.JSON,
    allowNull: true,
  })
  payment_info: PayosPaymentInfo;

  @StrObjectId()
  _id: string;
}
