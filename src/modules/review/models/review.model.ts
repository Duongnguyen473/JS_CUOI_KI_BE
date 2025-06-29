import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Review } from '../entities/review.entity';
import { EntityTable } from '@Common/constants/entity.constant';
import { StrObjectId } from '@Common/constants/base.constant';
import { User } from '@/modules/user/entities/user.entity';
import { UserModel } from '@/modules/user/models/user.model';

@Table({
  tableName: EntityTable.REVIEW,
})
export class ReviewModel extends Model implements Review {
  @Column
  enrollment_id: string;
  @Column
  @ForeignKey(() => UserModel)
  reviewer_id: string;
  @BelongsTo(() => UserModel, {
    foreignKey: 'reviewer_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  reviewer?: User;
  @Column
  @ForeignKey(() => UserModel)
  class_id: string;
  @BelongsTo(() => UserModel, {
    foreignKey: 'class_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  class?: User;
  @Column
  rating: number;
  @Column
  comment: string;
  @StrObjectId()
  _id: string;
}
