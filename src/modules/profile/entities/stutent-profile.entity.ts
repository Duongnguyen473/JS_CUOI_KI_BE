import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { StrObjectId } from '@/common/constants/base.constant';
import { IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';
export class StudentProfile implements BaseEntity {
  @StrObjectId()
  _id:string;
  @IsString()
  user_id: string;

  @IsOptional()
  school?:string;

  @IsNumber()
  @Min(1)
  @Max(12)
  @IsOptional()
  grade?: number
}
