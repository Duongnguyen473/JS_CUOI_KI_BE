import {
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { IsNotEmpty, IsUUID, IsDate, IsBoolean } from 'class-validator';

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
  declare _id?: string;

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
  declare createdAt?: Date;

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
  declare updatedAt?: Date;
}
