import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from "@/common/constants/base.constant";
import { EnrollmentStatus } from '../common/constant';
import { IsEnum, IsString } from 'class-validator';
import { Class } from '@/modules/class/entities/class.entity';
import { User } from '@/modules/user/entities/user.entity';
import { Bid } from '@/modules/bid/entities/bid.entity';

export class Enrollment implements BaseEntity {
  @StrObjectId()
  _id: string;
  // 
  @IsString()
  class_id: string;
  class?: Class;
  // 
  @IsString()
  student_id: string;
  student?: User
  // 
  @IsString()
  bid_id: string;
  bid?: Bid;
  // 
  @IsEnum(EnrollmentStatus)
  status: EnrollmentStatus;
  
  completed_at?: Date;
}
