import { Table, Column, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { BaseEntity } from '@Base/base.entity';
import { EntityTable } from '@/common/constants/entity.constant';
@Table({
  tableName: EntityTable.TUTOR_PROFILE,
  indexes: []
})
export class TutorProfile extends BaseEntity {
  user_id: string;
  education_lever:string;
  major:string;
  experience_year:number;
  certificate:string;
  intro:string;
  teaching_subject: string;
}
