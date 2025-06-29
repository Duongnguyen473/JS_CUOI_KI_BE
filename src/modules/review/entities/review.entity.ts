import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from "@/common/constants/base.constant";
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { User } from '@/modules/user/entities/user.entity';
import { ApiHideProperty } from '@nestjs/swagger';

export class Review implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsString()
  enrollment_id: string;
  @IsString()
  reviewer_id: string;
  @ApiHideProperty()
  reviewer?: User;
  @IsString()
  class_id: string;
  @IsNumber()
  @Min(1)
  @Min(5)
  rating: number;
  @IsNotEmpty()
  comment: string;
}
