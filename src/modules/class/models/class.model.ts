import { User } from '@/modules/user/entities/user.entity';
import { ClassMode, ClassStatus } from '../common/constant';
import { Class } from '../entities/class.entity';
import { StrObjectId } from '@/common/constants/base.constant';
import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { UserModel } from '@/modules/user/models/user.model';
import { EntityTable } from '@/common/constants/entity.constant';

@Table({
  tableName: EntityTable.CLASS,
  indexes: [],
})
export class ClassModel extends Model implements Class {
  @StrObjectId()
  _id: string;
  @ForeignKey(() => UserModel)
  tutor_id: string;
  @BelongsTo(() => UserModel, {
    foreignKey: 'tutor_id',
    targetKey: '_id',
  })
  tutor: User;
  @Column
  title: string;
  @Column
  subject: string;
  @Column
  grade: string;
  @Column
  mode: ClassMode;
  @Column
  location: string;
  @Column
  max_student: number;
  @Column
  description: string;
  @Column
  price_min: number;
  @Column
  price_max: number;
  @Column
  status: ClassStatus;
  @Column
  schedule: string;
}
