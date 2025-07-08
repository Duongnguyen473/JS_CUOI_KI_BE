import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from "@/common/constants/base.constant";
import { WalletTransactionStatus, WalletTransactionType } from '../common/constant';
import { IsEnum, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { PayosPaymentInfo } from '../common/interface';

export class WalletTransaction implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsString()
  wallet_id: string;
  @IsEnum(WalletTransactionType)
  type: WalletTransactionType;
  @IsNumber()
  amount: number;
  @IsString()
  description: string;
  @IsEnum(WalletTransactionStatus)
  status: WalletTransactionStatus;
  // payment_method: string;
  @IsOptional()
  external_transaction_id?: number;
  @IsObject()
  @IsOptional()
  payment_info?: PayosPaymentInfo;
}
