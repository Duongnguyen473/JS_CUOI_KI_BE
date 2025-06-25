import { ClassMode, ClassStatus } from '../common/constant';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { StrObjectId } from '@/common/constants/base.constant';
import { IsEnum, IsNumber, IsString, Max, Min } from 'class-validator';
import { Is } from 'sequelize-typescript';

export class Class implements BaseEntity {
  @StrObjectId()
  _id: string;
  @IsString()
  tutor_id?: string;

  @IsString()
  title: string;

  @IsString()
  subject: string;

  @IsString()
  grade: string;

  @IsEnum(ClassMode)
  mode: ClassMode;

  @IsString()
  location: string;

  @IsNumber()
  @Min(1)
  @Max(20)
  max_student: number;

  @IsString()
  description: string;

  @IsNumber()
  @Min(0)
  price_min: number;

  @IsNumber()
  @Min(0)
  price_max: number;

  @IsEnum(ClassStatus)
  status: ClassStatus;

  @IsString()
  schedule: string;
}
