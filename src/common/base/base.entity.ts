import {
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  Validate,
} from 'sequelize-typescript';
import { IsOptional, IsNotEmpty, IsUUID, IsDate, IsBoolean } from 'class-validator';

export abstract class BaseEntity extends Model {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    validate: {
      isUUID: 4,
    }
  })
  @IsUUID(4)
  @IsNotEmpty()
  declare id: string;

  @CreatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    }
  })
  @IsDate()
  @IsNotEmpty()
  declare createdAt: Date;

  @UpdatedAt
  @Column({
    type: DataType.DATE,
    allowNull: false,
    validate: {
      isDate: true,
    }
  })
  @IsDate()
  @IsNotEmpty()
  declare updatedAt: Date;

  @DeletedAt
  @Column({
    type: DataType.DATE,
    allowNull: true,
    validate: {
      isDate: true,
    }
  })
  @IsOptional()
  @IsDate()
  declare deletedAt?: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
    allowNull: false,
    validate: {
      isIn: [[true, false]],
    }
  })
  @IsBoolean()
  @IsNotEmpty()
  declare isActive: boolean;

}
