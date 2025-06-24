import { Table, Column, DataType, Max } from 'sequelize-typescript';
import { BaseEntity } from '../../../common/base/base.entity';
import { UserRoles, UserStatus } from '../common/constant';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { EntityTable } from '@/common/constants/entity.constant';

@Table({
  tableName: EntityTable.USER,
})
export class User extends BaseEntity {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @IsString()
  @MinLength(2)
  fullname: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(11)
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @MinLength(8)
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  avatar: string;
  @Column({
    type: DataType.ENUM(...Object.values(UserStatus)),
    defaultValue: UserStatus.ACTIVE,
  })
  status: UserStatus;
  @Column({
    type: DataType.ENUM(...Object.values(UserRoles)),
  })
  @IsNotEmpty()
  @IsEnum(UserRoles)
  role: UserRoles;

  @Column({
  })
  testNameAlo:string;
}
