import { Model, Table } from 'sequelize-typescript';
import { EntityTable } from '@/common/constants/entity.constant';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { StrObjectId } from '@/common/constants/base.constant';
@Table({
  tableName: EntityTable.STUDENT_PROFILE,
  indexes: []
})
export class StudentProfileModel extends Model implements BaseEntity {
  @StrObjectId()
  _id:string;
  user_id: string;
}
