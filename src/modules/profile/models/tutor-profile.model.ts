import { StrObjectId } from '@/common/constants/base.constant';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { Model } from 'sequelize-typescript';

export class TutorProfileModel extends Model implements BaseEntity {
  @StrObjectId()
  _id: string;
  user_id: string;
  education_lever:string;
  major:string;
  experience_year:number;
  certificate:string;
  intro:string;
  teaching_subject: string;
}
