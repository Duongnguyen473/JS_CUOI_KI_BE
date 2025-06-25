import { Gender, UserRoles } from '../common/constant';
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { BaseEntity } from '@Common/interfaces/base-entity.interface';
import { StrObjectId } from '@Common/constants/base.constant';

export class User implements BaseEntity {
  @StrObjectId()
  _id: string;

  @IsString()
  @MinLength(2)
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  @MaxLength(11)
  phone: string;

  @MinLength(8)
  password: string;

  @IsDate()
  @IsOptional()
  birthday?: Date;

  @IsOptional()
  avatar?: string;

  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  // 
  @IsOptional()
  provinceId?: string;
  @IsOptional()
  districtId?: string;
  @IsOptional()
  wardId?: string;
  @IsOptional()
  address?: string;

}
