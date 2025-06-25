import { User } from '@/modules/user/entities/user.entity';
import { ClassMode, ClassStatus } from '../common/constant';
import { Class } from '../entities/class.entity';
import { StrObjectId } from '@/common/constants/base.constant';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from '@/modules/user/models/user.model';
import { EntityTable } from '@/common/constants/entity.constant';

@Table({
  tableName: EntityTable.CLASS,
  indexes: [],
})
export class ClassModel extends Model implements Class {
  @StrObjectId()
  _id: string;
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ForeignKey(() => UserModel)
  tutor_id: string;

  @BelongsTo(() => UserModel, {
    foreignKey: 'tutor_id',
    targetKey: '_id',
  })
  tutor: User;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subject: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  grade: string;
  @Column({
    type: DataType.ENUM(...Object.values(ClassMode)),
    allowNull: false,
  })
  mode: ClassMode;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  location: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  max_student: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price_min: number;
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price_max: number;
  @Column({
    type: DataType.ENUM(...Object.values(ClassStatus)),
    allowNull: false,
    defaultValue: ClassStatus.OPEN,
  })
  status: ClassStatus;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  schedule: string;
}
