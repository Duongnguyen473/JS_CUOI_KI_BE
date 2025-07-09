import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from '@/common/constants/base.constant';
import { IsNumber, Min } from 'class-validator';

export class DepositPackage implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsNumber()
  @Min(0)
  amount: number;
  @IsNumber()
  @Min(0)
  promotion: number;
  // name: string;
}
