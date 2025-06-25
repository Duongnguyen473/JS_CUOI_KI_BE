import { StrObjectId } from '@/common/constants/base.constant';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator/types/decorator/decorators';
import { EducationLever, ExperienceYear } from '../common/constant';

export class TutorProfile implements BaseEntity {
  @StrObjectId()
  _id: string;

  @IsString()
  user_id: string;

  @IsEnum(EducationLever)
  education_lever: EducationLever;

  @IsString()
  major:string;

  @IsEnum(ExperienceYear)
  experience_year: ExperienceYear;

  @IsOptional()
  certificate?:string[];

  @IsString()
  intro:string;

  @IsString()
  teaching_subject: string[];

  @IsOptional()
  @IsBoolean()
  is_verified?: boolean;
  
}
