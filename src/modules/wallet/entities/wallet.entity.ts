import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from "@/common/constants/base.constant";
import { IsString, Min } from 'class-validator';
import { User } from '@/modules/user/entities/user.entity';

export class Wallet implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsString()
  user_id: string; 
  user: User;

  @IsString()
  @Min(0)
  balance: number;

}
