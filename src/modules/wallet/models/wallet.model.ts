import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Wallet } from "../entities/wallet.entity";
import { EntityTable } from '@Common/constants/entity.constant';
import { StrObjectId } from "@Common/constants/base.constant";
import { User } from '@/modules/user/entities/user.entity';
import { UserModel } from '@/modules/user/models/user.model';

@Table({
  tableName: EntityTable.WALLET,
})
export class WalletModel extends Model implements Wallet {
  @Column
  @ForeignKey(() => UserModel)
  user_id: string;
  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  user: User;
  @Column({
    defaultValue: 0,
    validate: {
      isDecimal: true,
      min: 0,
    },
  })
  balance: number;
  @StrObjectId()
  _id: string;
}
