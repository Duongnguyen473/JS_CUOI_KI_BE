import { Table, Model, Column } from 'sequelize-typescript';
import { DepositPackage } from "../entities/deposit-package.entity";
import { EntityTable } from '@Common/constants/entity.constant';
import { StrObjectId } from "@Common/constants/base.constant";

@Table({
  tableName: EntityTable.DEPOSIT_PACKAGE,
})
export class DepositPackageModel extends Model implements DepositPackage {
  @Column
  amount: number;
  @Column
  promotion: number;
  @StrObjectId()
  _id: string;
}
