import {
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '@/modules/user/entities/user.entity';
import { ClassMode, ClassStatus } from '../common/constant';
import { UserModel } from '@/modules/user/models/user.model';
import { BaseEntity } from '@/common/interfaces/base-entity.interface';
import { StrObjectId } from '@/common/constants/base.constant';

export class Class implements BaseEntity {
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
