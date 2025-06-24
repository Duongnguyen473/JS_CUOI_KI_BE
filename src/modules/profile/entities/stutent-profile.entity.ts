import { Table, Column, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { BaseEntity } from '@Base/base.entity';
import { EntityTable } from '@/common/constants/entity.constant';
@Table({
  tableName: EntityTable.STUDENT_PROFILE,
  indexes: []
})
export class StudentProfile extends BaseEntity {
  user_id: string;
}
