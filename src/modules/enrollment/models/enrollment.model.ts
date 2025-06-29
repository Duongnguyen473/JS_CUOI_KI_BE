import { Table, Model, Column, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Enrollment } from "../entities/enrollment.entity";
import { EntityTable } from '@Common/constants/entity.constant';
import { StrObjectId } from "@Common/constants/base.constant";
import { Class } from '@/modules/class/entities/class.entity';
import { User } from '@/modules/user/entities/user.entity';
import { EnrollmentStatus } from '../common/constant';
import { ClassModel } from '@/modules/class/models/class.model';
import { UserModel } from '@/modules/user/models/user.model';
import { Bid } from '@/modules/bid/entities/bid.entity';
import { BidModel } from '@/modules/bid/models/bid.model';

@Table({
  tableName: EntityTable.ENROLLMENT,
})
export class EnrollmentModel extends Model implements Enrollment {
  @Column
  @ForeignKey(() => ClassModel)
  class_id: string;
  @BelongsTo(() => ClassModel, {
    foreignKey: 'class_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  class?: Class;
  @Column
  @ForeignKey(() => UserModel)
  student_id: string;
  @BelongsTo(() => UserModel, {
    foreignKey: 'student_id',
    targetKey: '_id',
    onDelete: 'CASCADE',
  })
  student?: User;
  @Column
  @ForeignKey(() => BidModel)
  bid_id: string;
  @BelongsTo(() => BidModel, {
    foreignKey: 'bid_id',
    targetKey: '_id',
  })
  bid?: Bid;
  // 
  @Column({
    defaultValue: EnrollmentStatus.STUDYING,
  })
  status: EnrollmentStatus;
  @Column
  completed_at?: Date;
  @StrObjectId()
  _id: string;
}
