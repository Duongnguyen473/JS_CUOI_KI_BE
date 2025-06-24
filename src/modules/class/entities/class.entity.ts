import {
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { BaseEntity } from '@Base/base.entity';
import { EntityTable } from '@/common/constants/entity.constant';
import { User } from '@/modules/user/entities/user.entity';
import { ClassMode, ClassStatus } from '../common/constant';

@Table({
  tableName: EntityTable.CLASS,
  indexes: [],
})
export class Class extends BaseEntity {
  @Column({
    type: DataType.UUID,
    allowNull: false,
  })
  @ForeignKey(() => User)
  tutor_id: string;

  @BelongsTo(() => User, {
    foreignKey: 'tutor_id',
    targetKey: 'id',
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
  })
  status: ClassStatus;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  schedule: string;
}
