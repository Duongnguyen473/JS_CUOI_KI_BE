import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { EntityTable } from '@/common/constants/entity.constant';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { StrObjectId } from '@/common/constants/base.constant';
import { UserModel } from '@/modules/user/models/user.model';
@Table({
  tableName: EntityTable.STUDENT_PROFILE,
  indexes: []
})
export class StudentProfileModel extends Model implements BaseEntity {
  @StrObjectId()
  _id:string;

  @ForeignKey(() => UserModel)
  user_id: string;

  @BelongsTo(() => UserModel, {
    foreignKey: 'user_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  user: UserModel;
  
  @Column
  school?:string;
  
  @Column
  grade?: number
}
