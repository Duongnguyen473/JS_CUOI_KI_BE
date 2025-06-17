import { Table, Column, DataType } from 'sequelize-typescript';
import { BaseEntity } from '../../../common/base/base.entity';
import { UserRoles } from '../common/constant';
import { IsString } from 'class-validator'

@Table({
  tableName: 'users',
  paranoid: true,
})
export class User extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ENUM('ADMIN', 'USER'),
    defaultValue: UserRoles.USER,
  })
  role: UserRoles;
}
