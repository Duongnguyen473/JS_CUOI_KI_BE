import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { Notification } from '../entities/notification.entity';
import { EntityTable } from '@Common/constants/entity.constant';
import { StrObjectId } from '@Common/constants/base.constant';
import { NotificationType } from '../common/constant';

@Table({
  tableName: EntityTable.NOTIFICATION,
})
export class NotificationModel extends Model implements Notification {
  @Column
  user_id: string;
  @Column({
    type: DataType.ENUM(...Object.values(NotificationType)),
  })
  type: NotificationType;
  @Column
  title: string;
  @Column
  content: string;
  @Column({
    defaultValue: false,
  })
  is_read: boolean;
  @StrObjectId()
  _id: string;
}
