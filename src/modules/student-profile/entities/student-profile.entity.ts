import { Table, Column, DataType, BeforeCreate, BeforeUpdate } from 'sequelize-typescript';
import { BaseEntity } from '@Base/base.entity';
@Table({
  tableName: 'student_profile', // snake_case for database
  paranoid: true,
  indexes: []
})
export class StudentProfile extends BaseEntity {
  
}
