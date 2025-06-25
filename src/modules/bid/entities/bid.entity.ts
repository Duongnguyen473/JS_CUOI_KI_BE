import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from "@/common/constants/base.constant";
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { BidStatus } from '../common/constant';

export class Bid implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsString()
  class_id: string;
  @IsString()
  student_id: string;
  @IsNumber()
  bid_price: number;
  @IsOptional()
  message?: string;
  @IsString()
  address?: string;
  @IsEnum(BidStatus)
  status: BidStatus;
}
