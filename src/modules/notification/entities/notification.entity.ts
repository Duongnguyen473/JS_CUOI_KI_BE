import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from "@/common/constants/base.constant";
import { IsString } from 'class-validator';
import { NotificationType } from '../common/constant';

export class Notification implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsString()
  user_id: string;
  @IsString()
  type: NotificationType;
  @IsString()
  title: string;
  @IsString()
  content: string; 
  is_read: boolean;
}
